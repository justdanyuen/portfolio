"use client";

import { useEffect, useRef, useState } from "react";
import { FaPause, FaPlay, FaVolumeDown, FaVolumeMute, FaVolumeUp } from "react-icons/fa";
import { withBasePath } from "@/lib/basePath";

// Fired when a demo starts, so any other demo on the page pauses
const PLAY_EVENT = "music:demo-play";

function formatTime(seconds: number) {
  if (!Number.isFinite(seconds)) return "0:00";
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${s.toString().padStart(2, "0")}`;
}

// Thin slider with a filled track. It sits absolutely inside a flex box so the
// browser's built-in range width can never push neighbouring items out of the
// pill.
function Slider({
  value,
  max,
  step,
  label,
  onChange,
  className = "",
}: {
  value: number;
  max: number;
  step: number;
  label: string;
  onChange: (value: number) => void;
  className?: string;
}) {
  const fill = max > 0 ? (value / max) * 100 : 0;
  return (
    <div className={`relative h-4 min-w-0 ${className}`}>
      <input
        type="range"
        min={0}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        aria-label={label}
        className="absolute inset-x-0 top-1/2 m-0 h-1 w-full -translate-y-1/2 cursor-pointer appearance-none rounded-full accent-[var(--color-music)]"
        style={{
          background: `linear-gradient(to right, var(--color-music) ${fill}%, color-mix(in srgb, var(--color-music) 20%, transparent) ${fill}%)`,
        }}
      />
    </div>
  );
}

// Compact play/pause control with a seekable progress bar and volume, for an
// arrangement's demo recording (files in public/audio/arrangements/)
export default function DemoPlayer({ src, title }: { src: string; title: string }) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);
  const [current, setCurrent] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [muted, setMuted] = useState(false);

  // Keep the <audio> element in step with the volume controls. (iOS Safari
  // ignores .volume, since the hardware buttons own it, but .muted works.)
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.volume = volume;
    audio.muted = muted;
  }, [volume, muted]);

  // The browser may read the file's length before React attaches its event
  // handlers (the <audio> is in the server-rendered HTML), so the
  // loadedmetadata event can be missed. Read it directly once mounted.
  useEffect(() => {
    const audio = audioRef.current;
    if (audio && audio.readyState >= 1 && Number.isFinite(audio.duration)) {
      setDuration(audio.duration);
    }
  }, []);

  // Pause when another demo starts
  useEffect(() => {
    const onOtherPlay = (e: Event) => {
      if ((e as CustomEvent).detail !== audioRef.current) audioRef.current?.pause();
    };
    window.addEventListener(PLAY_EVENT, onOtherPlay);
    return () => window.removeEventListener(PLAY_EVENT, onOtherPlay);
  }, []);

  const toggle = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (audio.paused) {
      window.dispatchEvent(new CustomEvent(PLAY_EVENT, { detail: audio }));
      void audio.play();
    } else {
      audio.pause();
    }
  };

  const silent = muted || volume === 0;
  const VolumeIcon = silent ? FaVolumeMute : volume < 0.5 ? FaVolumeDown : FaVolumeUp;

  return (
    <div className="flex w-full min-w-0 items-center gap-3 rounded-full border border-music/40 py-1 pl-1 pr-4 sm:w-[21rem] sm:shrink-0">
      <button
        type="button"
        onClick={toggle}
        aria-label={`${playing ? "Pause" : "Play"} demo of ${title}`}
        className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-music text-white transition-opacity hover:opacity-80"
      >
        {playing ? <FaPause className="text-xs" /> : <FaPlay className="ml-0.5 text-xs" />}
      </button>

      <Slider
        value={current}
        max={duration || 0}
        step={0.1}
        label={`Seek demo of ${title}`}
        onChange={(t) => {
          const audio = audioRef.current;
          if (audio) audio.currentTime = t;
        }}
        className="flex-1"
      />

      <span className="w-[4.75rem] shrink-0 whitespace-nowrap text-right text-xs tabular-nums text-foreground/60">
        {formatTime(current)} / {formatTime(duration)}
      </span>

      {/* Volume: one speaker icon. Click to mute/unmute; while the track is
          playing, hovering (or focusing) it pops up a vertical level slider.
          Touch devices just get mute, since phones use hardware volume. */}
      <div className="group/vol relative shrink-0">
        <button
          type="button"
          onClick={() => {
            if (silent) {
              setMuted(false);
              if (volume === 0) setVolume(1);
            } else {
              setMuted(true);
            }
          }}
          aria-label={`${silent ? "Unmute" : "Mute"} demo of ${title}`}
          className="flex h-6 w-6 items-center justify-center text-sm text-music transition-opacity hover:opacity-70"
        >
          <VolumeIcon />
        </button>

        {playing && (
          // pb-2 bridges the gap above the icon so the pointer can travel
          // from the icon to the slider without the popup closing
          <div className="pointer-events-none invisible absolute bottom-full left-1/2 z-20 -translate-x-1/2 pb-2 opacity-0 transition-opacity duration-150 group-focus-within/vol:pointer-events-auto group-focus-within/vol:visible group-focus-within/vol:opacity-100 group-hover/vol:pointer-events-auto group-hover/vol:visible group-hover/vol:opacity-100">
            <div className="relative h-28 w-9 rounded-full border border-music/30 bg-background shadow-lg">
              <input
                type="range"
                min={0}
                max={1}
                step={0.05}
                value={silent ? 0 : volume}
                onChange={(e) => {
                  const v = Number(e.target.value);
                  setVolume(v);
                  setMuted(v === 0);
                }}
                aria-label={`Volume for demo of ${title}`}
                className="absolute left-1/2 top-1/2 m-0 h-1 w-20 -translate-x-1/2 -translate-y-1/2 -rotate-90 cursor-pointer appearance-none rounded-full accent-[var(--color-music)]"
                style={{
                  background: `linear-gradient(to right, var(--color-music) ${(silent ? 0 : volume) * 100}%, color-mix(in srgb, var(--color-music) 20%, transparent) ${(silent ? 0 : volume) * 100}%)`,
                }}
              />
            </div>
          </div>
        )}
      </div>

      <audio
        ref={audioRef}
        src={withBasePath(src)}
        preload="metadata"
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        onEnded={() => {
          setPlaying(false);
          setCurrent(0);
        }}
        onTimeUpdate={(e) => setCurrent(e.currentTarget.currentTime)}
        onLoadedMetadata={(e) => setDuration(e.currentTarget.duration)}
        onDurationChange={(e) => {
          const d = e.currentTarget.duration;
          if (Number.isFinite(d)) setDuration(d);
        }}
      />
    </div>
  );
}
