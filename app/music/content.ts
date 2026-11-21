// ─────────────────────────────────────────────────────────────────────────────
// Music page content. Edit this file to fill in the page; the layout in
// page.tsx renders whatever is here, in this order:
//
//   1. Intro          – singing from a young age
//   2. Piano          – 10 years, with YouTube performance links
//   3. College        – Take It SLO: music director, recording/mixing, releases
//   4. Master's       – directing Viva Voce, linking to the SV2 thesis project
//   5. Arrangements   – published + in-progress works, and Instagram reels
//
// Photos:  put .webp files in public/images/music/, run `npm run thumbs`,
//          then reference them here as "/images/music/<file>.webp".
// Empty lists simply don't render (or show a "coming soon" box where noted).
// Search for "TODO" to find everything that still needs filling in.
// ─────────────────────────────────────────────────────────────────────────────

import type { LightboxPhoto } from "@/components/Lightbox";

export type ExternalLink = {
  label: string;
  url: string;
  /** Optional small text after the label, e.g. a year or venue */
  note?: string;
};

export type Release = {
  title: string;
  artist: string;
  url: string;
  /** Square cover art in public/images/music/releases/ */
  cover: string;
  /** Your roles on the release */
  roles: string[];
  year?: string;
};

export type Chapter = {
  /** Anchor id, used for the timeline links */
  id: string;
  /** Short label on the timeline rail, e.g. "Piano" */
  label: string;
  /** Years shown above the heading, e.g. "2012 – 2022" */
  years: string;
  heading: string;
  paragraphs: string[];
  /** Bulleted highlights under the text */
  highlights?: string[];
  /** Headline numbers (shown as a stat row) */
  stats?: { value: string; label: string }[];
  /** Album/single cards with cover art and your roles */
  releases?: { title: string; items: Release[] };
  /** Titled list of external links (performances, releases...) */
  links?: { title: string; items: ExternalLink[]; emptyText?: string };
  photos?: LightboxPhoto[];
};

export type Arrangement = {
  title: string;
  originalArtist: string;
  /** e.g. "SATB", "TTBB", "SSAA + VP" */
  voicing?: string;
  /** Co-arrangers, shown as "arr. with ..." */
  coArrangers?: string[];
  year?: string;
  /** For in-progress works, what stage it's at, e.g. "Drafting", "In rehearsal" */
  stage?: string;
  /** Demo recording in public/audio/arrangements/, e.g.
   *  "/audio/arrangements/merry-christmas-darling.mp3". Shows a play button. */
  demo?: string;
  links: ExternalLink[];
};

// ── 1. Intro ────────────────────────────────────────────────────────────────

export const intro = {
  label: "Beginnings",
  years: "", // TODO: e.g. "2005 –"
  // TODO: draft text, reword in your own voice
  paragraphs: [
    "My interest in music started very young, with singing. Long before I knew anything about arranging or production, I just loved to sing, and that love of the human voice has been the through-line of everything on this page.",
  ],
};

// ── 2–4. Chapters (no longer rendered on the Music page; kept as source
// material. Releases below still feed the Music page's "Selected releases")

export const chapters: Chapter[] = [
  {
    id: "piano",
    label: "",
    years: "2011-2021", // TODO: replace with the actual years, e.g. "2010 – 2020"
    heading: "Piano",
    // TODO: draft text, add details (teachers, recitals, repertoire, what it taught you)
    paragraphs: [
      "From singing, I moved into piano, which I studied for ten years. Piano gave me the foundation in theory, reading, and harmony that I still lean on every time I sit down to arrange.",
    ],
    links: {
      title: "Performances",
      emptyText: "Performance videos coming soon",
      items: [
        { label: "Fantaisie-Impromptu", url: "https://youtu.be/7XJyWhoqJf8", note: "Chopin" },
        { label: "Clair de Lune", url: "https://youtu.be/2IJZ1LngdTE", note: "Debussy" },
        { label: "Pure Imagination", url: "https://youtu.be/8TF4Wv2rBnU", note: "Bricusse & Newley" },
      ],
    },
  },
  {
    id: "college",
    label: "",
    years: "Aug 2021 – June 2025",
    heading: "Take It SLO A Cappella",
    paragraphs: [
      "Coming into Cal Poly, I was a huge fan of the a cappella scene, but auditioning for a group that had been around for decades was daunting as a freshman with no group singing experience. It turned out to be one of the best decisions I made in college.",
      "I went on to become the group's music director, arranger, and producer: leading rehearsals, writing arrangements, and taking our music into the studio, where I helped record, edit, and mix our releases.",
    ],
    highlights: [
      "Music director from September 2022 to June 2025, leading bi-weekly rehearsals on tone, blend, dynamics, and articulation",
      "Arranged and produced original and adapted works for live and recorded settings",
      "Directed recording sessions and helped with tracking, vocal editing, and mixing",
      "Performed across the Central Coast and Los Angeles",
    ],
    stats: [
      { value: "150k+", label: "streams on our releases" },
      { value: "100k+", label: "followers on curated playlists featuring our music" },
    ],
    releases: {
      title: "Releases",
      items: [
        {
          title: "Undone",
          artist: "Take It SLO",
          url: "https://open.spotify.com/album/0jFUVSndXAwJE3mkDjCEUJ",
          cover: "/images/music/releases/undone.webp",
          roles: ["Arranger", "Recording engineer", "Mixing engineer"],
        },
        {
          title: "erase me",
          artist: "Take It SLO",
          url: "https://open.spotify.com/album/6NCQVfbNQqPTqugVzrMxQB",
          cover: "/images/music/releases/erase-me.webp",
          roles: ["Recording engineer", "Mixing engineer"],
        },
      ],
    },
    // TODO: add photos, e.g. { src: "/images/music/take-it-slo/group.webp", alt: "Take It SLO" }
    photos: [],
  },
  {
    id: "masters",
    label: "",
    years: "Aug 2025 – July 2026",
    heading: "Viva Voce, Berklee Valencia",
    paragraphs: [
      // TODO: draft text, confirm role and add details
      "During my master's at Berklee Valencia, I founded and directed Viva Voce, an a cappella group bringing together singers from around the world.",
      "The group's recordings became source material for my thesis project, SV2, a surround vocal spectrum visualizer built to make dense a cappella mixes easier to understand.",
    ],
    photos: [
      {
        src: "/images/berklee/acappella.webp",
        alt: "Viva Voce after a performance",
        caption: "Post-performance with Viva Voce at Berklee Valencia",
      },
    ],
  },
];

// Link from the master's chapter to the thesis write-up
// Releases outside the a cappella groups, shown after the chapter releases in
// the Music page's "Selected releases"
export const otherReleases: Release[] = [
  {
    title: "Summer Rain",
    artist: "zoerose, Justin Yuen",
    url: "https://open.spotify.com/track/1jgCBKF6M7QvrKssgzevbE",
    cover: "/images/music/releases/summer-rain.webp",
    roles: ["Artist", "Engineer"],
  },
  {
    title: "Eve",
    artist: "张骏宇",
    url: "https://open.spotify.com/track/1e2sviYpgA0RtioCmDFTNf",
    cover: "/images/music/releases/eve.webp",
    roles: ["Producer"],
  },
];

export const thesisLink = {
  href: "/projects",
  label: "See how SV2 uses this material",
};

// ── 5. Arrangements ─────────────────────────────────────────────────────────

// TODO: add published arrangements. Example:
// {
//   title: "<Song title>",
//   originalArtist: "<Artist>",
//   voicing: "SATB + VP",
//   year: "2024",
//   links: [
//     { label: "Sheet music", url: "https://..." },
//     { label: "Listen", url: "https://open.spotify.com/..." },
//   ],
// },
export const publishedArrangements: Arrangement[] = [
  {
    title: "Every Summertime",
    demo: "/audio/arrangements/every-summertime.m4a",
    originalArtist: "NIKI",
    voicing: "SATB divisi",
    coArrangers: ["Ryan Singer"],
    links: [
      {
        label: "Sheet Music Direct",
        url: "https://www.sheetmusicdirect.com/se/ID_No/2249763/Product.aspx",
      },
    ],
  },
  {
    title: "Moonshine",
    demo: "/audio/arrangements/moonshine.m4a",
    originalArtist: "Young Gun Silver Fox",
    voicing: "SATB divisi",
    coArrangers: ["Ryan Singer"],
    links: [
      {
        label: "Sheet Music Direct",
        url: "https://www.sheetmusicdirect.com/se/ID_No/2249766/Product.aspx",
      },
    ],
  },
];

// Works in progress. `stage` shows as a tag (e.g. "Drafting", "In rehearsal",
// "Recording"). `links` can stay empty, or point to a demo/reel.
// TODO: replace these two filler entries with real works in progress
export const inProgressArrangements: Arrangement[] = [
  {
    title: "Everybody Wants To Rule The World", // TODO
    demo: "/audio/arrangements/WIP/everybody-wants-to-rule-the-world-MIDI.m4a",
    originalArtist: "Tears For Fears, inspired by Kerry Marsh", // TODO
    voicing: "SMAATBB + VP", // TODO
    links: [
    ],
  },
  {
    title: "Merry Christmas Darling", // TODO
    demo: "/audio/arrangements/WIP/merry-christmas-darling-MIDI.mp3",
    originalArtist: "The Carpenters", // TODO
    voicing: "SMATBB", // TODO
    links: [
    ],
  },
  {
    title: "Undone", // TODO
    demo: "/audio/arrangements/WIP/undone-MIDI.mp3",
    originalArtist: "Raquel Rodriguez", // TODO
    voicing: "SMATBB + VP", // TODO
    links: [],
  },
  {
    title: "New Love", // TODO
    demo: "/audio/arrangements/WIP/new-love-MIDI.mp3",
    originalArtist: "Victoria Monet", // TODO
    voicing: "SSAATTBB + VP", // TODO
    links: [
    ],
  },
  {
    title: "Do Not Disturb", // TODO
    demo: "/audio/arrangements/WIP/do-not-disturb-MIDI.mp3",
    originalArtist: "Mahalia", // TODO
    voicing: "SMAATBB + VP", // TODO
    links: [
    ],
  },
  {
    title: "SYNCOPATE", // TODO
    demo: "/audio/arrangements/WIP/syncopate-MIDI.mp3",
    originalArtist: "MICHELLE", // TODO
    voicing: "SMAATBB + VP", // TODO
    links: [
    ],
  },
    {
    title: "Human Heart", // TODO
    demo: "/audio/arrangements/WIP/human-heart-MIDI.mp3",
    originalArtist: "Coldplay & Jacob Collier", // TODO
    voicing: "SMATBB", // TODO
    links: [
    ],
  },

];

export type Reel = {
  url: string;
  /** Short label under the thumbnail */
  title: string;
  /**
   * Cover image (9:16), e.g. "/images/music/reels/reel-1.webp". Instagram blocks
   * automatic thumbnail fetching, so save a screenshot of the reel's cover frame
   * here. Without one, a styled placeholder card is shown (still clickable).
   */
  cover?: string;
};

export const instagram = {
  handle: "", // TODO: e.g. "@justdanyuen"
  url: "", // TODO: profile/reels page, e.g. "https://www.instagram.com/<handle>/reels/"
  blurb: "Short clips of a cappella arrangements, covers, and works in progress.",
  reels: [
    {
      url: "https://www.instagram.com/reel/DYhXKUjNprcNB7h2uRz7D5AZHFv7yw26yhKf1c0/",
      title: "Moonshine",
      cover: "/images/music/reels/moonshine.webp",
    },
    {
      url: "https://www.instagram.com/reel/DaDSyFnt-aQuivW_78rGGxF83gOzB3VcAVa55U0/",
      title: "Let It Be",
      cover: "/images/music/reels/let-it-be.webp",
    },
    {
      url: "https://www.instagram.com/reel/DZnV5r_tUrgI3mGpoNlkgQoXkwOr_WmSrC2hUA0/",
      title: "Human Nature",
      cover: "/images/music/reels/human-nature.webp",
    },
    {
      url: "https://www.instagram.com/reel/DZib0NxtkFb/",
      title: "At Sunrise",
      cover: "/images/music/reels/at-sunrise.webp",
    },
  ] as Reel[],
};
