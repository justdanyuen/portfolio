"use client";

import { useCallback, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import { withBasePath } from "@/lib/basePath";

type Photo = {
  src: string;
  alt: string;
  caption?: React.ReactNode;
  width?: number;
  height?: number;
};

const DEFAULT_ASPECT = 4 / 3;

// Target on-screen area (in rem^2) every photo occupies, so portrait
// and landscape photos feel equally "big" instead of portrait ones
// looking small just because they're narrow.
const TARGET_AREA = 1150;
const MIN_HEIGHT = 22;
const MAX_HEIGHT = 40;
const CAPTION_GAP = 1; // rem — desired gap between actual image bottom and caption

function getDisplaySize(aspect: number) {
  let height = Math.sqrt(TARGET_AREA / aspect);
  height = Math.min(Math.max(height, MIN_HEIGHT), MAX_HEIGHT);
  const width = height * aspect;
  return { width, height };
}

const SPRING = { type: "spring", stiffness: 260, damping: 32, mass: 0.9 } as const;

export default function PhotoCarousel({ photos }: { photos: Photo[] }) {
  const [index, setIndex] = useState(0);
  const count = photos.length;

  const goTo = useCallback(
    (i: number) => setIndex(((i % count) + count) % count),
    [count]
  );

  const prev = () => goTo(index - 1);
  const next = () => goTo(index + 1);

  const leftIndex = (index - 1 + count) % count;
  const rightIndex = (index + 1) % count;
  const current = photos[index];

  const aspect =
    current.width && current.height
      ? current.width / current.height
      : DEFAULT_ASPECT;

  const { width: displayWidth, height: displayHeight } = getDisplaySize(aspect);

  // Pulls the caption up closer to the actual image edge when the
  // image is shorter than the stage's max height, instead of leaving
  // a big fixed gap sized for the tallest possible photo.
  const captionMarginTop = CAPTION_GAP - (MAX_HEIGHT - displayHeight) / 2;

  return (
    <div className="w-full">
      {/* Fixed-height stage: nav buttons and peek thumbnails are pinned
          absolutely within it, so they never reflow when the center
          image resizes — only the center box itself animates. */}
      <div
        className="relative mx-auto flex items-center justify-center"
        style={{ height: `${MAX_HEIGHT}rem` }}
      >
        {/* Prev button */}
        <button
          type="button"
          onClick={prev}
          aria-label="Previous photo"
          className="absolute left-0 top-1/2 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-foreground shadow-md transition-opacity hover:bg-white sm:left-2"
        >
          &#8249;
        </button>

        {/* Left peek image — pinned, never reflows */}
        <button
          type="button"
          onClick={prev}
          aria-label={`Show ${photos[leftIndex].alt}`}
          className="absolute left-[8%] top-1/2 hidden aspect-[4/3] w-[20%] -translate-y-1/2 overflow-hidden opacity-50 transition-opacity hover:opacity-80 sm:block"
        >
          <Image
            src={withBasePath(photos[leftIndex].src)}
            alt={photos[leftIndex].alt}
            fill
            sizes="20vw"
            className="object-cover object-center"
          />
        </button>

        {/* Center image — the only thing that resizes */}
        <motion.div
          animate={{ width: `${displayWidth}rem`, height: `${displayHeight}rem` }}
          transition={SPRING}
          className="relative z-10 overflow-hidden"
          style={{ maxWidth: "72%" }}
        >
          <AnimatePresence mode="sync" initial={false}>
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.35, ease: "easeInOut" }}
              className="absolute inset-0"
            >
              <Image
                src={withBasePath(current.src)}
                alt={current.alt}
                fill
                priority
                sizes="60vw"
                className="object-contain object-center"
              />
            </motion.div>
          </AnimatePresence>
        </motion.div>

        {/* Right peek image — pinned, never reflows */}
        <button
          type="button"
          onClick={next}
          aria-label={`Show ${photos[rightIndex].alt}`}
          className="absolute right-[8%] top-1/2 hidden aspect-[4/3] w-[20%] -translate-y-1/2 overflow-hidden opacity-50 transition-opacity hover:opacity-80 sm:block"
        >
          <Image
            src={withBasePath(photos[rightIndex].src)}
            alt={photos[rightIndex].alt}
            fill
            sizes="20vw"
            className="object-cover object-center"
          />
        </button>

        {/* Next button */}
        <button
          type="button"
          onClick={next}
          aria-label="Next photo"
          className="absolute right-0 top-1/2 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-foreground shadow-md transition-opacity hover:bg-white sm:right-2"
        >
          &#8250;
        </button>
      </div>

      {/* Caption — distance from the image now tracks the image's
          actual displayed height, not the tallest-possible stage. */}
      <AnimatePresence mode="wait">
        {current.caption && (
          <motion.p
            key={`caption-${index}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            style={{ marginTop: `${captionMarginTop}rem` }}
            className="mx-auto max-w-xl text-center text-sm italic text-foreground/70"
          >
            {current.caption}
          </motion.p>
        )}
      </AnimatePresence>

      {/* Dot indicators */}
      <div className="mt-3 flex items-center justify-center gap-2">
        {photos.map((_, i) => (
          <button
            key={i}
            type="button"
            onClick={() => goTo(i)}
            aria-label={`Go to photo ${i + 1}`}
            className={`h-2 w-2 rounded-full transition-colors ${
              i === index ? "bg-foreground" : "bg-foreground/25"
            }`}
          />
        ))}
      </div>
    </div>
  );
}