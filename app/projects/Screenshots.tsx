"use client";

import { useState } from "react";
import Image from "next/image";
import Lightbox, { type LightboxPhoto } from "@/components/Lightbox";
import { withBasePath } from "@/lib/basePath";

// SV2 screenshot grid; clicking a tile opens it in the lightbox
export default function Screenshots({ photos }: { photos: LightboxPhoto[] }) {
  const [active, setActive] = useState<number | null>(null);

  return (
    <>
      <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:sticky lg:top-36 lg:mt-5">
        {photos.map((photo, index) => (
          <button
            key={photo.src}
            type="button"
            onClick={() => setActive(index)}
            className="group relative aspect-video cursor-zoom-in overflow-hidden rounded-xl bg-black/5"
          >
            <Image
              src={withBasePath(photo.src)}
              alt={photo.alt}
              fill
              sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
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
