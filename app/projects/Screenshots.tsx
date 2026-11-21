"use client";

import { useState } from "react";
import Image from "next/image";
import Lightbox, { type LightboxPhoto } from "@/components/Lightbox";
import { withBasePath } from "@/lib/basePath";

// SV2 screenshots in a single row, spread edge to edge with even gaps
// (2 per row on phones); clicking one opens it in the lightbox
export default function Screenshots({ photos }: { photos: LightboxPhoto[] }) {
  const [active, setActive] = useState<number | null>(null);

  return (
    <>
      <div className="mt-6 grid grid-cols-2 gap-4 sm:flex sm:justify-between sm:gap-0 lg:mt-8">
        {photos.map((photo, index) => (
          <button
            key={photo.src}
            type="button"
            onClick={() => setActive(index)}
            className="group relative aspect-video cursor-zoom-in overflow-hidden rounded-xl bg-black/5 sm:w-[22.5%]"
          >
            <Image
              src={withBasePath(photo.src)}
              alt={photo.alt}
              fill
              sizes="(min-width: 640px) 23vw, 45vw"
              className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
            />

            <div className="pointer-events-none absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/10" />
          </button>
        ))}
      </div>

      <Lightbox
        photos={photos}
        index={active}
        onChange={setActive}
        variant="screenshot"
      />
    </>
  );
}
