"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import Lightbox, { type LightboxPhoto } from "@/components/Lightbox";
import { thumbPath } from "@/lib/basePath";

type PhotoStripProps = {
  photos: LightboxPhoto[];
  /** Show hover arrows for scrolling the strip */
  arrows?: boolean;
};

// Horizontally scrolling row of square photo tiles. Tiles load the small
// thumbnails (npm run thumbs); clicking one opens the full-size original.
export default function PhotoStrip({ photos, arrows = false }: PhotoStripProps) {
  const stripRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState<number | null>(null);

  const scroll = (direction: "left" | "right") => {
    const el = stripRef.current;
    if (!el) return;
    const amount = el.clientWidth * 0.8;
    el.scrollBy({
      left: direction === "left" ? -amount : amount,
      behavior: "smooth",
    });
  };

  return (
    <>
      <div className="group/carousel relative">
        <div
          ref={stripRef}
          className="flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {photos.map((photo, index) => (
            <button
              key={photo.alt}
              type="button"
              onClick={() => setActive(index)}
              className="relative aspect-square w-[45%] flex-shrink-0 snap-start cursor-zoom-in overflow-hidden transition-opacity hover:opacity-90 sm:w-[23%]"
            >
              <Image
                src={thumbPath(photo.src)}
                alt={photo.alt}
                fill
                sizes="(max-width: 640px) 45vw, 23vw"
                className="object-cover object-center"
              />
            </button>
          ))}
        </div>

        {arrows && (
          <>
            <button
              type="button"
              onClick={() => scroll("left")}
              aria-label="Scroll gallery left"
              className="absolute left-2 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-foreground opacity-0 shadow-md transition-opacity duration-200 group-hover/carousel:opacity-100 hover:bg-white"
            >
              &#8249;
            </button>
            <button
              type="button"
              onClick={() => scroll("right")}
              aria-label="Scroll gallery right"
              className="absolute right-2 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-foreground opacity-0 shadow-md transition-opacity duration-200 group-hover/carousel:opacity-100 hover:bg-white"
            >
              &#8250;
            </button>
          </>
        )}
      </div>

      <Lightbox photos={photos} index={active} onChange={setActive} />
    </>
  );
}
