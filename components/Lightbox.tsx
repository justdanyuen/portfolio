"use client";

import { useEffect, type ReactNode } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import { withBasePath } from "@/lib/basePath";

export type LightboxPhoto = {
  src: string;
  alt: string;
  caption?: ReactNode;
};

type LightboxProps = {
  photos: LightboxPhoto[];
  /** Index of the open photo, or null when closed */
  index: number | null;
  onChange: (index: number | null) => void;
  /** "photo": About-page style. "screenshot": rounded image, wider caption, "n / total" counter */
  variant?: "photo" | "screenshot";
};

// Full-screen viewer with prev/next, captions, and keyboard controls
// (Escape closes, arrow keys navigate). Always loads the full-size original.
export default function Lightbox({
  photos,
  index,
  onChange,
  variant = "photo",
}: LightboxProps) {
  const isScreenshot = variant === "screenshot";
  const noun = isScreenshot ? "screenshot" : "photo";

  useEffect(() => {
    if (index === null) return;
    const count = photos.length;

    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") onChange(null);
      if (e.key === "ArrowLeft") onChange((index! - 1 + count) % count);
      if (e.key === "ArrowRight") onChange((index! + 1) % count);
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [index, photos.length, onChange]);

  const step = (delta: number) => (e: React.MouseEvent) => {
    e.stopPropagation();
    if (index === null) return;
    onChange((index + delta + photos.length) % photos.length);
  };

  const photo = index === null ? null : photos[index];

  return (
    <AnimatePresence>
      {photo && index !== null && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-6"
          onClick={() => onChange(null)}
        >
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="flex max-h-[90vh] max-w-[90vw] flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={withBasePath(photo.src)}
              alt={photo.alt}
              width={isScreenshot ? 1920 : 1600}
              height={isScreenshot ? 1080 : 1600}
              className={`max-h-[75vh] w-auto max-w-[90vw] object-contain ${isScreenshot ? "rounded-lg" : ""}`}
            />

            {photo.caption && (
              <p
                className={
                  isScreenshot
                    ? "mt-5 max-w-2xl text-center text-sm leading-relaxed text-white/80 sm:text-base"
                    : "mt-4 text-center text-sm text-white/80"
                }
              >
                {photo.caption}
              </p>
            )}

            {isScreenshot && (
              <p className="mt-2 text-xs uppercase tracking-[0.2em] text-white/40">
                {index + 1} / {photos.length}
              </p>
            )}
          </motion.div>

          <button
            type="button"
            onClick={step(-1)}
            aria-label={`Previous ${noun}`}
            className="absolute left-4 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-3xl text-white transition-colors hover:bg-white/20 sm:left-8"
          >
            &#8249;
          </button>
          <button
            type="button"
            onClick={step(1)}
            aria-label={`Next ${noun}`}
            className="absolute right-4 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-3xl text-white transition-colors hover:bg-white/20 sm:right-8"
          >
            &#8250;
          </button>

          <button
            type="button"
            onClick={() => onChange(null)}
            aria-label="Close preview"
            className="absolute right-6 top-6 text-3xl text-white transition-opacity hover:opacity-60"
          >
            &times;
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
