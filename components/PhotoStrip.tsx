"use client";

import { useState } from "react";
import Image from "next/image";
import Lightbox, { type LightboxPhoto } from "@/components/Lightbox";
import { thumbPath } from "@/lib/basePath";

type PhotoStripProps = {
  photos: LightboxPhoto[];
};

// Row of square photo tiles scrolling slowly in a seamless loop, like the
// album covers (components/AlbumMarquee): the row is rendered twice (or more
// for short galleries) and slides left by half its width (spacing is padding
// on each tile, not a gap, so the halves match exactly). Pauses on
// hover/focus; with "reduce motion" on it stays still and can be scrolled by
// hand. Tiles load the small thumbnails (npm run thumbs); clicking one opens
// the full-size original.
export default function PhotoStrip({ photos }: PhotoStripProps) {
  const [active, setActive] = useState<number | null>(null);

  // Short galleries repeat so each half of the loop has at least 8 tiles
  // (wider than any screen), otherwise a gap would scroll past
  const reps = Math.max(1, Math.ceil(8 / photos.length));
  const copies = reps * 2;

  // ~5s per tile keeps the speed steady however many photos there are
  const duration = `${photos.length * reps * 5}s`;

  return (
    <>
      <div
        className="group/marquee relative w-full overflow-hidden motion-reduce:overflow-x-auto"
        style={{
          maskImage:
            "linear-gradient(to right, transparent, black 6%, black 94%, transparent)",
          WebkitMaskImage:
            "linear-gradient(to right, transparent, black 6%, black 94%, transparent)",
        }}
      >
        <div
          className="flex w-max animate-[marquee_var(--marquee-duration)_linear_infinite] group-focus-within/marquee:[animation-play-state:paused] group-hover/marquee:[animation-play-state:paused] motion-reduce:animate-none"
          style={{ ["--marquee-duration" as string]: duration }}
        >
          {Array.from({ length: copies }, (_, copy) =>
            photos.map((photo, index) => (
              <div
                key={`${copy}-${photo.src}`}
                aria-hidden={copy > 0 || undefined}
                className="pr-4"
              >
                <button
                  type="button"
                  onClick={() => setActive(index)}
                  tabIndex={copy > 0 ? -1 : undefined}
                  aria-label={`Open photo: ${photo.alt}`}
                  className="relative block aspect-square w-40 cursor-pointer overflow-hidden transition-opacity hover:opacity-90 sm:w-52 lg:w-64"
                >
                  <Image
                    src={thumbPath(photo.src)}
                    alt={photo.alt}
                    fill
                    sizes="(min-width: 1024px) 256px, (min-width: 640px) 208px, 160px"
                    className="object-cover object-center"
                  />
                </button>
              </div>
            ))
          )}
        </div>
      </div>

      <Lightbox photos={photos} index={active} onChange={setActive} />
    </>
  );
}
