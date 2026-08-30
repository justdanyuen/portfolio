"use client";

import { motion, type Variants } from "motion/react";

const container: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.15, delayChildren: 0.1 },
  },
};

const item: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
  },
};

const tech = [
  { name: "C++", url: "https://www.geeksforgeeks.org/cpp/c-plus-plus/" },
  { name: "JUCE", url: "https://juce.com/" },
  { name: "VST3", url: "https://steinbergmedia.github.io/vst3_dev_portal/pages/Technical+Documentation/API+Documentation/Index.html" },
  { name: "AU", url: "https://developer.apple.com/documentation/audiotoolbox/audio-unit-v3-plug-ins" },
  { name: "AAX", url: "https://developer.avid.com/aax/" },
];

export default function ProjectsPage() {
  return (
    <div className="relative">
      {/* Purple gradient band, fading down into the page background */}
      <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[800px] bg-gradient-to-b from-purple via-purple/50 to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[500px] bg-[radial-gradient(ellipse_60%_50%_at_50%_0%,theme(colors.purple)_0%,transparent_70%)] opacity-70" />

      <motion.section
        variants={container}
        initial="hidden"
        animate="show"
        className="w-full max-w-5xl px-6 pb-20 pt-36 sm:px-10 lg:px-16"
      >
      <motion.h1
        variants={item}
        className="font-sans text-3xl font-bold text-foreground sm:text-4xl"
      >
        PROJECTS
      </motion.h1>

      {/* Featured project */}
      <motion.div variants={item} className="mt-12">
        <div className="mb-4 flex items-center gap-3">
          <span className="h-2 w-2 rounded-full bg-purple" />
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-purple">
            Master's Thesis Project
          </p>
        </div>

        <h2 className="font-sans text-2xl font-semibold text-foreground">
          Surround Vocal Spectrum Visualizer - SV2
        </h2>

        <p className="mt-3 max-w-2xl text-base leading-relaxed text-foreground/80">
          A real-time audio visualizer plugin built in C++ with the JUCE
          framework, designed for use directly inside a DAW applications 
          Including Logic Pro X, Pro Tools, Cubase, and Reaper. Exported
          via VST3, AU, and AAX formats for full compatibility with major DAWs.
          
        </p>

        <p className="mt-3 max-w-2xl text-base leading-relaxed text-foreground/80">
          Steming from my passion for acappella - the composition of music 
          and audio centered around the human voice without any external
          instruments, most notably in choir and collegiate clubs - I wanted
          to create a new way to understand what is happening within a vocal mix.
          Through my education at Berklee Valencia I learned fundamental concepts
          in signal flow, audio processing, and surround sound mixing in Dolby Atmos.
        </p>
        {/* Tech tags */}
        <div className="mt-4 flex flex-wrap gap-2">
          {tech.map((t) => (
            <a
              key={t.name}
              href={t.url}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-md bg-purple px-3 py-1 text-xs font-medium text-white transition-opacity hover:opacity-75"
            >
              {t.name}
            </a>
          ))}
        </div>

        {/* Image placeholders */}
        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
          {[1, 2].map((n) => (
            <div
              key={n}
              className="flex aspect-video items-center justify-center rounded-xl border-2 border-dashed border-purple/40 bg-purple-light/10"
            >
              <p className="text-sm font-medium text-purple/70">
                Plugin screenshot {n}
              </p>
            </div>
          ))}
        </div>

        {/* Demo reel */}
        <div className="mt-6">
          <p className="mb-3 text-xs font-medium uppercase tracking-[0.2em] text-purple">
            Demo Reel
          </p>
          <div className="flex aspect-video w-full items-center justify-center rounded-xl border-2 border-dashed border-purple/40 bg-purple-light/10">
            <div className="text-center">
              <div className="mx-auto mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-purple">
                <svg
                  viewBox="0 0 24 24"
                  fill="white"
                  className="ml-0.5 h-5 w-5"
                >
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
              <p className="text-sm font-medium text-purple/70">
                Demo reel coming soon
              </p>
            </div>
          </div>
        </div>

        <a
          href="#"
          className="mt-6 inline-block border-b border-purple pb-1 text-sm font-medium uppercase tracking-[0.15em] text-purple transition-opacity hover:opacity-60"
        >
          View case study
        </a>
      </motion.div>
      </motion.section>
    </div>
  );
}