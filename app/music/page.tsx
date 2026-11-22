import Image from "next/image";
import * as motion from "motion/react-client";
import { FaInstagram, FaPlay, FaSpotify } from "react-icons/fa";
import { withBasePath } from "@/lib/basePath";
import DemoPlayer from "./DemoPlayer";
import { container, item } from "@/lib/motion";
import {
  chapters,
  otherReleases,
  inProgressArrangements,
  instagram,
  intro,
  publishedArrangements,
  type Arrangement,
  type Reel,
  type Release,
} from "./content";

// Server component: rendered to static HTML at build time. Content lives in
// ./content.ts. Only the demo players run as client code.

const bodyText = "text-lg leading-relaxed text-foreground/80 sm:text-xl";
// Fixed-width pill shared by the sheet music link and its "coming soon" tag
const actionSlot =
  "w-44 whitespace-nowrap rounded-md px-3 py-1 text-center text-xs font-medium";
const subheading =
  "text-base font-semibold uppercase tracking-[0.2em] text-music sm:text-lg";

// Dashed box shown while a list has no content yet
function ComingSoon({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-28 items-center justify-center rounded-xl border-2 border-dashed border-music/30 px-6 py-8 text-center text-base text-foreground/50">
      {children}
    </div>
  );
}

// Album cards: cover art, title, roles; opens the release on Spotify
function ReleaseGrid({ items }: { items: Release[] }) {
  return (
    <ul className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-4 sm:gap-6 lg:grid-cols-6">
      {items.map((r) => (
        <li key={r.url}>
          <a
            href={r.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group block"
          >
            <div className="relative aspect-square w-full overflow-hidden rounded-xl bg-black/10 shadow-md">
              <Image
                src={withBasePath(r.cover)}
                alt={`${r.title} cover art`}
                fill
                sizes="(min-width: 1024px) 15vw, (min-width: 640px) 22vw, 45vw"
                className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
              />
            </div>
            <div className="mt-3 flex items-center gap-2">
              <FaSpotify className="shrink-0 text-lg text-music" />
              <p className="font-sans text-base font-medium text-foreground transition-opacity group-hover:opacity-70 sm:text-lg">
                {r.title}
              </p>
            </div>
            <p className="text-sm text-foreground/60">
              {[r.artist, r.year].filter(Boolean).map((detail, i, arr) => (
                <span key={i}>
                  {i > 0 && " "}
                  <span className="whitespace-nowrap">
                    {detail}
                    {i < arr.length - 1 && " ·"}
                  </span>
                </span>
              ))}
            </p>
            <div className="mt-2 flex flex-wrap gap-1.5">
              {r.roles.map((role) => (
                <span
                  key={role}
                  className="whitespace-nowrap rounded-md border border-music/40 px-2 py-0.5 text-xs font-medium text-music"
                >
                  {role}
                </span>
              ))}
            </div>
          </a>
        </li>
      ))}
    </ul>
  );
}

// Vertical reel cards (9:16) that open the reel on Instagram
function ReelGrid({ items }: { items: Reel[] }) {
  return (
    // Phones: 2-up grid. Wider screens: one row spread edge to edge, with the
    // cards kept narrower so the extra width goes into the gaps between them
    <ul className="grid grid-cols-2 gap-4 sm:flex sm:justify-between sm:gap-6">
      {items.map((r) => (
        <li key={r.url} className="sm:w-[19%]">
          <a
            href={r.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group block"
          >
            <div className="relative aspect-[9/16] w-full overflow-hidden rounded-xl bg-gradient-to-br from-music via-music/80 to-[#5b3a20] shadow-md">
              {r.cover ? (
                <Image
                  src={withBasePath(r.cover)}
                  alt=""
                  fill
                  sizes="(min-width: 640px) 19vw, 45vw"
                  className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                />
              ) : (
                <FaInstagram className="absolute left-4 top-4 text-2xl text-white/80" />
              )}
              <div className="absolute inset-0 bg-black/10 transition-colors duration-300 group-hover:bg-black/25" />
              {/* With a cover, the play button sits in the corner so it never
                  covers the title text baked into the image */}
              <span
                className={`absolute flex items-center justify-center rounded-full bg-white/90 text-music shadow-lg transition-transform duration-300 group-hover:scale-110 ${
                  r.cover
                    ? "bottom-3 right-3 h-10 w-10"
                    : "left-1/2 top-1/2 h-14 w-14 -translate-x-1/2 -translate-y-1/2"
                }`}
              >
                <FaPlay className={r.cover ? "ml-0.5 text-sm" : "ml-1 text-lg"} />
              </span>
            </div>
            <p className="mt-3 font-sans text-base font-medium text-foreground transition-opacity group-hover:opacity-70">
              {r.title}
            </p>
          </a>
        </li>
      ))}
    </ul>
  );
}

function ArrangementList({
  items,
  inProgress = false,
}: {
  items: Arrangement[];
  inProgress?: boolean;
}) {
  return (
    <ul className="divide-y divide-music/20 border-y border-music/20">
      {items.map((a) => (
        <li
          key={`${a.title}-${a.originalArtist}`}
          className="flex flex-col gap-3 py-5 lg:flex-row lg:items-center lg:justify-between lg:gap-6"
        >
          <div className="min-w-0">
            <p className="font-sans text-lg font-semibold text-foreground sm:text-xl">
              {a.title}
            </p>
            <p className="text-sm text-foreground/60 sm:text-base">
              {/* each detail stays whole; lines only break between details */}
              {[
                `Originally by ${a.originalArtist}`,
                a.voicing,
                a.coArrangers?.length && `arr. with ${a.coArrangers.join(" & ")}`,
                a.year,
              ]
                .filter(Boolean)
                .map((detail, i, arr) => (
                  <span key={i}>
                    {i > 0 && " "}
                    <span className="whitespace-nowrap">
                      {detail}
                      {i < arr.length - 1 && " ·"}
                    </span>
                  </span>
                ))}
            </p>
          </div>
          {/* Player, then one fixed-width slot (sheet music link, or a
              "coming soon" tag) so every row's controls line up */}
          <div className="flex shrink-0 flex-wrap items-center gap-x-4 gap-y-2">
            {a.demo && <DemoPlayer src={a.demo} title={a.title} />}
            {inProgress && a.stage && (
              <span className="rounded-md border border-music/40 px-3 py-1 text-xs font-medium text-music">
                {a.stage}
              </span>
            )}
            {a.links.length > 0 ? (
              a.links.map((l) => (
                <a
                  key={l.url}
                  href={l.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${actionSlot} border border-music bg-music text-white transition-opacity hover:opacity-75`}
                >
                  {l.label} ↗
                </a>
              ))
            ) : (
              <span className={`${actionSlot} border border-music/40 text-music`}>
                Sheet music coming soon
              </span>
            )}
          </div>
        </li>
      ))}
    </ul>
  );
}

// Group releases (Take It SLO) first, then other productions
const selectedReleases = [
  ...chapters.flatMap((c) => c.releases?.items ?? []),
  ...otherReleases,
];

export default function MusicPage() {
  return (
    <div className="relative">
      {/* Subtle neutral band, pinned to viewport, matching the other pages */}
      <div className="pointer-events-none fixed inset-x-0 top-0 -z-10 h-screen bg-gradient-to-b from-[#B5B1A8] from-0% to-transparent to-70% opacity-60" />

      {/* 1. Intro: singing from a young age */}
      <motion.section
        variants={container}
        initial="hidden"
        animate="show"
        className="w-full px-6 pt-20 sm:px-10 lg:px-16 lg:pt-36"
      >
        <motion.h1
          variants={item}
          className="font-sans text-3xl font-bold text-foreground sm:text-4xl"
        >
          MUSIC / ARRANGEMENTS
        </motion.h1>

        {intro.paragraphs.map((p) => (
          <motion.p
            key={p}
            variants={item}
            className="mt-5 text-lg leading-relaxed text-foreground/80 sm:text-xl lg:mt-8 lg:text-2xl"
          >
            {p}
          </motion.p>
        ))}
      </motion.section>

      {/* 2. Arrangements */}
      <section
        id="arrangements"
        className="w-full scroll-mt-24 px-6 pb-24 pt-10 sm:px-10 lg:scroll-mt-36 lg:px-16 lg:pb-32 lg:pt-14"
      >
        <h2 className="font-sans text-2xl font-semibold text-foreground sm:text-3xl lg:text-4xl">
          Arrangements
        </h2>
        {/* <p className={`${bodyText} mt-5 max-w-4xl lg:mt-6`}>
          Arrangements I&apos;ve written for a cappella groups, from published
          works to pieces still on the desk.
        </p> */}

        <div className="mt-10 flex flex-col gap-12 lg:gap-16">
          <div>
            <h3 className={`${subheading} mb-4`}>Published</h3>
            {publishedArrangements.length > 0 ? (
              <ArrangementList items={publishedArrangements} />
            ) : (
              <ComingSoon>Published arrangement links coming soon</ComingSoon>
            )}
          </div>

          <div>
            <h3 className={`${subheading} mb-4`}>Demos in progress</h3>
            {inProgressArrangements.length > 0 ? (
              <ArrangementList items={inProgressArrangements} inProgress />
            ) : (
              <ComingSoon>Demos in progress coming soon</ComingSoon>
            )}
          </div>
        </div>

        {/* 3. Instagram shorts */}
        <div id="shorts" className="mt-16 scroll-mt-24 lg:mt-24 lg:scroll-mt-36">
          <div className="mb-4 flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
            <h3 className={subheading}>Instagram Reels</h3>
            {instagram.url && (
              <a
                href={instagram.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 border-b border-music pb-1 text-sm font-medium text-music transition-opacity hover:opacity-60"
              >
                <FaInstagram />
                {instagram.handle || "See all reels"} ↗
              </a>
            )}
          </div>
          <p className="mb-6 text-base text-foreground/70 sm:text-lg">
            {instagram.blurb}
          </p>
          {instagram.reels.length > 0 ? (
            <ReelGrid items={instagram.reels} />
          ) : (
            <ComingSoon>Instagram reels coming soon</ComingSoon>
          )}
        </div>

        {/* 4. Selected releases */}
        {selectedReleases.length > 0 && (
          <div id="releases" className="mt-16 scroll-mt-24 lg:mt-24 lg:scroll-mt-36">
            <h3 className={`${subheading} mb-4`}>Selected releases</h3>
            <ReleaseGrid items={selectedReleases} />
          </div>
        )}
      </section>
    </div>
  );
}
