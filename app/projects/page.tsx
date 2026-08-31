"use client";

import { motion, type Variants } from "motion/react";
import { withBasePath } from "@/lib/basePath";
import Image from "next/image";

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
  {
    name: "VST3",
    url: "https://steinbergmedia.github.io/vst3_dev_portal/pages/Technical+Documentation/API+Documentation/Index.html",
  },
  {
    name: "AU",
    url: "https://developer.apple.com/documentation/audiotoolbox/audio-unit-v3-plug-ins",
  },
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
        className="w-full px-6 pb-20 pt-36 sm:px-10 lg:px-16"
      >
        <motion.h1
          variants={item}
          className="font-sans text-3xl font-bold text-foreground sm:text-4xl"
        >
          PROJECTS
        </motion.h1>

        {/* Featured project */}
        <motion.div
          variants={item}
          className="mx-auto mt-12 w-full max-w-5xl"
        >
          <div className="mb-4 flex items-center gap-3">
            <span className="h-2 w-2 rounded-full bg-purple" />
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-purple">
              Master&apos;s Thesis Project
            </p>
          </div>

          <h2 className="font-sans text-2xl font-semibold text-foreground">
            Surround Vocal Spectrum Visualizer - SV2
          </h2>

          <p className="mt-3 max-w-3xl text-base leading-relaxed text-foreground/80">
            A real-time audio visualizer plugin built in C++ with the JUCE
            framework, designed for use directly inside DAW applications
            including Logic Pro X, Pro Tools, Cubase, and Reaper. Exported via
            VST3, AU, and AAX formats for full compatibility with major DAWs.
          </p>

          <p className="mt-3 max-w-3xl text-base leading-relaxed text-foreground/80">
            Stemming from my passion for a cappella — the composition of music
            centered around the human voice without external instruments,
            particularly in choir and collegiate groups — I wanted to create a
            new way to understand what is happening within a vocal mix. Through
            my education at Berklee Valencia, I developed foundational skills in
            signal flow, audio processing, and surround sound mixing in Dolby
            Atmos.
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

          {/* Project images */}
          <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2">
            {[
              ["surroundfield.png", "SV2 surround field visualization"],
              ["frequency_spectrum.png", "SV2 frequency spectrum visualization"],
              ["routing.png", "SV2 routing setup"],
              ["solo_elements.png", "SV2 solo elements view"],
            ].map(([src, alt]) => (
              <div
                key={src}
                className="relative aspect-video overflow-hidden rounded-xl bg-black/5"
              >
                <Image
                  src={withBasePath(`/images/SV2/${src}`)}
                  alt={alt}
                  fill
                  className="object-contain"
                />
              </div>
            ))}
          </div>

          {/* Project pitch */}
          <div className="mt-12">
            <p className="mb-3 text-xs font-medium uppercase tracking-[0.2em] text-purple">
              Project Pitch
            </p>

            <video
              controls
              preload="metadata"
              className="aspect-video w-full rounded-xl object-cover"
            >
              <source
                src={withBasePath("/videos/SV2_pitch_web.mp4")}
                type="video/mp4"
              />
              Your browser does not support the video tag.
            </video>
          </div>

          {/* Demo reel */}
          <div className="mt-12">
            <p className="mb-3 text-xs font-medium uppercase tracking-[0.2em] text-purple">
              Demo Reel
            </p>

            <div className="aspect-video w-full overflow-hidden rounded-xl">
              <iframe
                className="h-full w-full"
                src="https://www.youtube.com/embed/p0LQWIascj0"
                title="SV2 Demo Reel"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            </div>
          </div>

          {/* Thesis paper */}
          <a
            href={withBasePath("/SV2ThesisPaper.pdf")}
            target="_blank"
            rel="noopener noreferrer"
            className="group mt-14 flex max-w-3xl items-center justify-between border-t border-purple/30 py-5 transition-opacity hover:opacity-60"
          >
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-purple">
                Thesis Documentation
              </p>
              <p className="mt-1 font-sans text-lg font-medium">
                SV2 Thesis Paper
              </p>
            </div>

            <span className="text-2xl transition-transform duration-200 group-hover:translate-x-1">
              ↗
            </span>
          </a>
        </motion.div>
      </motion.section>
    </div>
  );
}