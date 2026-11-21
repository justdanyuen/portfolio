import type { PlaylistTrack } from "@/lib/spotify";

// Album covers from a playlist, scrolling slowly in a seamless loop. Pure CSS:
// the list is rendered twice and the track slides left by half its width
// (spacing is padding on each item, not a gap, so the halves match exactly).
// Pauses on hover/focus; with "reduce motion" on it stays still and can be
// scrolled by hand instead.
export default function AlbumMarquee({ tracks }: { tracks: PlaylistTrack[] }) {
  // ~3s per cover keeps the speed steady however long the playlist is
  const duration = `${Math.max(tracks.length, 6) * 3}s`;

  return (
    <div
      className="group/marquee relative mt-5 w-full max-w-2xl overflow-hidden motion-reduce:overflow-x-auto"
      style={{
        maskImage:
          "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
        WebkitMaskImage:
          "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
      }}
    >
      <ul
        className="flex w-max animate-[marquee_var(--marquee-duration)_linear_infinite] group-focus-within/marquee:[animation-play-state:paused] group-hover/marquee:[animation-play-state:paused] motion-reduce:animate-none"
        style={{ ["--marquee-duration" as string]: duration }}
      >
        {[0, 1].map((copy) =>
          tracks.map((t) => (
            <li key={`${copy}-${t.url}`} aria-hidden={copy === 1 || undefined} className="pr-3">
              <a
                href={t.url}
                target="_blank"
                rel="noopener noreferrer"
                tabIndex={copy === 1 ? -1 : undefined}
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
                  className="h-full w-full object-cover"
                />
              </a>
            </li>
          ))
        )}
      </ul>
    </div>
  );
}
