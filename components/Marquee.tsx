"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

type MarqueeProps = {
  /** One set of items. Give each item right padding (not a flex gap) so the
   *  repeated sets join seamlessly. */
  children: ReactNode;
  /** Auto-scroll speed in px per second */
  speed?: number;
  /** Width of the faded edges, as a % of the strip */
  fade?: number;
  className?: string;
};

// Momentum after a fling fades to ~5% per second
const FRICTION = 0.05;
// Fastest fling, px/s
const MAX_FLING = 4000;
// Pointer travel before a press counts as a drag rather than a click
const DRAG_THRESHOLD = 6;

// Endless horizontal strip that scrolls slowly on its own and can be dragged
// (mouse or touch) or swiped with a trackpad to move faster; a fling keeps
// coasting, then eases back to the normal pace. The set of items is repeated
// enough times to cover the strip, and the offset wraps by one set's width,
// so the loop is seamless. Auto-scroll pauses while hovered or focused, and
// is off with "reduce motion" (dragging still works).
export default function Marquee({
  children,
  speed = 40,
  fade = 8,
  className = "",
}: MarqueeProps) {
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const firstSetRef = useRef<HTMLDivElement>(null);
  const [copies, setCopies] = useState(2);

  // Animation state lives in a ref: it changes every frame and never needs
  // a re-render
  const state = useRef({
    offset: 0,
    setWidth: 0,
    velocity: 0, // extra px/s from a fling, decays to 0
    hovered: false,
    focused: false,
    reduced: false,
    pointerDown: false,
    dragging: false,
    dragged: false, // set by a drag, swallows the click that follows it
    pointerId: -1,
    startX: 0,
    lastX: 0,
    lastT: 0,
  });

  // Measure one set and render enough copies to always cover the strip
  useEffect(() => {
    const viewport = viewportRef.current;
    const set = firstSetRef.current;
    if (!viewport || !set) return;

    const measure = () => {
      const width = set.offsetWidth;
      state.current.setWidth = width;
      if (width > 0) {
        setCopies(Math.max(2, Math.ceil(viewport.offsetWidth / width) + 1));
      }
    };

    const observer = new ResizeObserver(measure);
    observer.observe(viewport);
    observer.observe(set);
    measure();
    return () => observer.disconnect();
  }, []);

  // Frame loop: auto-scroll + fling momentum, wrapped to one set's width
  useEffect(() => {
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updateReduced = () => (state.current.reduced = motionQuery.matches);
    updateReduced();
    motionQuery.addEventListener("change", updateReduced);

    let frame = 0;
    let previous = performance.now();

    const tick = (now: number) => {
      const s = state.current;
      const dt = Math.min((now - previous) / 1000, 0.1);
      previous = now;

      if (!s.dragging) {
        const auto = s.reduced || s.hovered || s.focused ? 0 : speed;
        s.offset += (auto + s.velocity) * dt;
        s.velocity *= Math.pow(FRICTION, dt);
        if (Math.abs(s.velocity) < 1) s.velocity = 0;
      }

      if (s.setWidth > 0) {
        s.offset = ((s.offset % s.setWidth) + s.setWidth) % s.setWidth;
      }
      if (trackRef.current) {
        trackRef.current.style.transform = `translate3d(${-s.offset}px, 0, 0)`;
      }
      frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(frame);
      motionQuery.removeEventListener("change", updateReduced);
    };
  }, [speed]);

  const endDrag = (e: React.PointerEvent, keepMomentum: boolean) => {
    const s = state.current;
    if (e.pointerId !== s.pointerId) return;
    s.pointerDown = false;
    if (!s.dragging) return;

    s.dragging = false;
    delete viewportRef.current?.dataset.dragging;
    // Held still before letting go: no fling
    if (!keepMomentum || e.timeStamp - s.lastT > 80) s.velocity = 0;
  };

  const mask = `linear-gradient(to right, transparent, black ${fade}%, black ${100 - fade}%, transparent)`;

  return (
    <div
      ref={viewportRef}
      className={`relative cursor-grab touch-pan-y select-none overflow-hidden data-[dragging]:cursor-grabbing [&[data-dragging]_*]:cursor-grabbing ${className}`}
      style={{ maskImage: mask, WebkitMaskImage: mask }}
      onPointerEnter={(e) => {
        if (e.pointerType === "mouse") state.current.hovered = true;
      }}
      onPointerLeave={() => (state.current.hovered = false)}
      onFocus={() => (state.current.focused = true)}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget)) state.current.focused = false;
      }}
      onPointerDown={(e) => {
        if (e.pointerType === "mouse" && e.button !== 0) return;
        const s = state.current;
        s.pointerDown = true;
        s.pointerId = e.pointerId;
        s.startX = s.lastX = e.clientX;
        s.lastT = e.timeStamp;
        s.dragged = false;
        s.velocity = 0; // grabbing stops a fling
      }}
      onPointerMove={(e) => {
        const s = state.current;
        if (!s.pointerDown || e.pointerId !== s.pointerId) return;

        if (!s.dragging) {
          if (Math.abs(e.clientX - s.startX) < DRAG_THRESHOLD) return;
          s.dragging = true;
          s.dragged = true;
          s.lastX = e.clientX;
          s.lastT = e.timeStamp;
          e.currentTarget.setPointerCapture(e.pointerId);
          e.currentTarget.dataset.dragging = "";
          return;
        }

        const dx = e.clientX - s.lastX;
        const dt = e.timeStamp - s.lastT;
        s.offset -= dx;
        if (dt > 0) {
          // Smoothed release speed, so one jittery event can't spike the fling
          const instant = (-dx / dt) * 1000;
          const v = s.velocity * 0.3 + instant * 0.7;
          s.velocity = Math.max(-MAX_FLING, Math.min(MAX_FLING, v));
        }
        s.lastX = e.clientX;
        s.lastT = e.timeStamp;
      }}
      onPointerUp={(e) => endDrag(e, true)}
      onPointerCancel={(e) => endDrag(e, false)}
      onClickCapture={(e) => {
        // A drag that ends on a photo or link shouldn't also open it
        if (state.current.dragged) {
          e.preventDefault();
          e.stopPropagation();
          state.current.dragged = false;
        }
      }}
      onWheel={(e) => {
        // Sideways trackpad swipes move the strip too
        if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) state.current.offset += e.deltaX;
      }}
      onDragStart={(e) => e.preventDefault()} // no native image/link drag ghost
    >
      <div ref={trackRef} className="flex w-max will-change-transform">
        {Array.from({ length: copies }, (_, copy) => (
          <div
            key={copy}
            ref={copy === 0 ? firstSetRef : undefined}
            className="flex shrink-0"
            // Repeats are decoration: hidden from screen readers, not tabbable
            aria-hidden={copy > 0 || undefined}
            inert={copy > 0 || undefined}
          >
            {children}
          </div>
        ))}
      </div>
    </div>
  );
}
