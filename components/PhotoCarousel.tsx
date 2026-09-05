"use client";

import { useCallback, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import { withBasePath } from "@/lib/basePath";

type Photo = {
  src: string;
  alt: string;
  caption?: React.ReactNode;
};

export default function PhotoCarousel({ photos }: { photos: Photo[] }) {
  const [index, setIndex] = useState(0);
  const count = photos.length;

  // modulo that wraps negative numbers correctly, giving true looping
  const goTo = useCallback(
    (i: number) => setIndex(((i % count) + count) % count),
    [count]
  );

  const prev = () => goTo(index - 1);
  const next = () => goTo(index + 1);

  const leftIndex = (index - 1 + count) % count;
  const rightIndex = (index + 1) % count;

  return (
    <div className="w-full">
      <div className="relative flex items-center justify-center gap-4">
        {/* Prev button */}
        <button
          type="button"
          onClick={prev}
          aria-label="Previous photo"
          className="absolute left-0 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-foreground shadow-md transition-opacity hover:bg-white sm:left-2"
        >
          &#8249;
        </button>

        {/* Left peek image */}
        <button
          type="button"
          onClick={prev}
          aria-label={`Show ${photos[leftIndex].alt}`}
          className="relative hidden aspect-[3/4] w-[18%] flex-shrink-0 overflow-hidden opacity-50 transition-opacity hover:opacity-80 sm:block"
        >
          <Image
            src={withBasePath(photos[leftIndex].src)}
            alt={photos[leftIndex].alt}
            fill
            className="object-cover object-center"
          />
        </button>

        {/* Current (large) image */}
        <div className="relative aspect-[4/3] w-[75%] flex-shrink-0 overflow-hidden sm:w-[50%]">
          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="absolute inset-0"
            >
              <Image
                src={withBasePath(photos[index].src)}
                alt={photos[index].alt}
                fill
                priority
                className="object-cover object-center"
              />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Right peek image */}
        <button
          type="button"
          onClick={next}
          aria-label={`Show ${photos[rightIndex].alt}`}
          className="relative hidden aspect-[3/4] w-[18%] flex-shrink-0 overflow-hidden opacity-50 transition-opacity hover:opacity-80 sm:block"
        >
          <Image
            src={withBasePath(photos[rightIndex].src)}
            alt={photos[rightIndex].alt}
            fill
            className="object-cover object-center"
          />
        </button>

        {/* Next button */}
        <button
          type="button"
          onClick={next}
          aria-label="Next photo"
          className="absolute right-0 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-foreground shadow-md transition-opacity hover:bg-white sm:right-2"
        >
          &#8250;
        </button>
      </div>

      {/* Caption for the current photo */}
      {photos[index].caption && (
        <p className="mx-auto mt-4 max-w-xl text-center text-sm italic text-foreground/70">
          {photos[index].caption}
        </p>
      )}

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