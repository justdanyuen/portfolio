import Marquee from "@/components/Marquee";
import type { PlaylistTrack } from "@/lib/spotify";

// Album covers from a playlist in an endless strip that scrolls slowly on its
// own and can be dragged to move faster (see components/Marquee).
export default function AlbumMarquee({ tracks }: { tracks: PlaylistTrack[] }) {
  return (
    <Marquee speed={30} className="mt-5 w-full max-w-2xl">
      {tracks.map((t) => (
        <div key={t.url} className="pr-3">
          <a
            href={t.url}
            target="_blank"
            rel="noopener noreferrer"
            draggable={false}
            title={`${t.title} · ${t.artist}`}
            className="block h-20 w-20 overflow-hidden rounded-md shadow-sm transition-transform duration-200 hover:scale-105"
          >
            {/* eslint-disable-next-line @next/next/no-img-element -- remote Spotify art in a static export */}
            <img
              src={t.cover}
              alt={`${t.title} by ${t.artist}`}
              width={80}
              height={80}
              loading="lazy"
              draggable={false}
              className="h-full w-full object-cover"
            />
          </a>
        </div>
      ))}
    </Marquee>
  );
}
