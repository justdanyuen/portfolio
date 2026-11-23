"use client";

import { useState } from "react";
import Image from "next/image";
import Lightbox, { type LightboxPhoto } from "@/components/Lightbox";
import Marquee from "@/components/Marquee";
import { thumbPath } from "@/lib/basePath";

type PhotoStripProps = {
  photos: LightboxPhoto[];
};

// Square photo tiles in an endless strip that scrolls slowly on its own and
// can be dragged to move faster (see components/Marquee). Tiles load the
// small thumbnails (npm run thumbs); clicking one opens the full-size original.
export default function PhotoStrip({ photos }: PhotoStripProps) {
  const [active, setActive] = useState<number | null>(null);

  return (
    <>
      <Marquee speed={45} fade={6} className="w-full">
        {photos.map((photo, index) => (
          <div key={photo.src} className="pr-4">
            <button
              type="button"
              onClick={() => setActive(index)}
              aria-label={`Open photo: ${photo.alt}`}
              className="relative block aspect-square w-40 cursor-pointer overflow-hidden transition-opacity hover:opacity-90 sm:w-52 lg:w-64"
            >
              <Image
                src={thumbPath(photo.src)}
                alt={photo.alt}
                fill
                draggable={false}
                sizes="(min-width: 1024px) 256px, (min-width: 640px) 208px, 160px"
                className="object-cover object-center"
              />
            </button>
          </div>
        ))}
      </Marquee>

      <Lightbox photos={photos} index={active} onChange={setActive} />
    </>
  );
}
