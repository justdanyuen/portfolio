"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence, type Variants} from "motion/react";
import { withBasePath } from "@/lib/basePath";
import Image from "next/image";
import { FaGithub } from "react-icons/fa";

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

const projectImages = [
  {
    src: "/images/SV2/surroundfield.png",
    alt: "SV2 surround field visualization",
    caption:
      "The spatial visualization window displays the placement and relative level of vocal groups throughout a 5.1 surround field.",
  },
  {
    src: "/images/SV2/frequency_spectrum.png",
    alt: "SV2 frequency spectrum visualization",
    caption:
      "Real-time frequency analysis provides visual feedback for identifying spectral overlap and masking between vocal groups.",
  },
  {
    src: "/images/SV2/solo_elements.png",
    alt: "SV2 solo elements view",
    caption:
      "Individual vocal elements can be isolated to examine their spatial position, level, and spectral characteristics in greater detail.",
  },
    {
    src: "/images/SV2/routing.png",
    alt: "SV2 routing setup",
    caption:
      "SV2 is inserted across grouped vocal buses inside the DAW, allowing each section of the arrangement to be monitored independently.",
  },
];

export default function ProjectsPage() {
  const [activeImage, setActiveImage] = useState<number | null>(null);

  const showPrev = useCallback(() => {
    setActiveImage((current) => {
      if (current === null) return current;

      return (
        (current - 1 + projectImages.length) %
        projectImages.length
      );
    });
  }, []);

  const showNext = useCallback(() => {
    setActiveImage((current) => {
      if (current === null) return current;

      return (current + 1) % projectImages.length;
    });
  }, []);

  // keyboard controls
  useEffect(() => {
    if (activeImage === null) return;

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setActiveImage(null);
      }

      if (event.key === "ArrowLeft") {
        showPrev();
      }

      if (event.key === "ArrowRight") {
        showNext();
      }
    }

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [activeImage, showPrev, showNext]);

  
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
            {/* Main dot — static */}
            <span className="h-2 w-2 shrink-0 rounded-full bg-purple" />

            <p className="flex items-center text-xs font-medium uppercase tracking-[0.2em] text-purple">
              Master&apos;s Thesis Project

              {/* Flashing separator dot */}
              <motion.span
                className="mx-2 inline-block text-xl leading-none"
                animate={{
                  opacity: [1, 0.15, 1],
                  scale: [1, 1.5, 1],
                }}
                transition={{
                  duration: 1.4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                •
              </motion.span>

              Active Development
            </p>
          </div>

          <h2 className="font-sans text-2xl font-semibold text-foreground">
            Surround Vocal Spectrum Visualizer - SV2
          </h2>

          <p className="mt-3 max-w-3xl text-lg italic leading-relaxed text-foreground/70">
            A real-time audio visualizer plugin built in{" "}
            <strong className="font-semibold text-foreground/90">
              C++ with the JUCE framework
            </strong>
            , designed for use directly inside DAW applications including Logic Pro X,
            Pro Tools, Cubase, and Reaper. Exported via VST3, AU, and AAX formats.
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


          <h3 className="mt-10 text-xs font-semibold uppercase tracking-[0.2em] text-purple">
            Motivation
          </h3>

          <p className="mt-3 max-w-3xl text-base leading-relaxed text-foreground/80">
            Stemming from my passion for <strong>a cappella </strong>— the composition of music
            centered around the human voice without external instruments,
            particularly in choir and collegiate groups — I wanted to create a
            new way to understand what is happening within a vocal mix.  Various
            details of a group's performance - overall member composition and 
            voice characteristics, dynamics, blend, and timbre - can blur  the
            ability to discern individual elements during the mixing process. 
            I wanted to create a plugin that would provide visual feedback of the
            placement and balance of vocal elements in a mix, allowing users to
            better decide of stylistic choices and make adjustments to the mix.
            </p>
            

          <h3 className="mt-10 text-xs font-semibold uppercase tracking-[0.2em] text-purple">
            Development
          </h3>  
          <p className="mt-3 max-w-3xl text-base leading-relaxed text-foreground/80">
            Through my education at Berklee Valencia, I developed foundational knowledge 
            in signal flow, audio processing, and surround sound mixing in Dolby
            Atmos, which gave me the inspiration to create a plugin that 
            visualizes the spatial distribution of elements in a mix. Leveraging 
            my experience in software development from my undergraduate studies, 
            I developed a plugin that provides real-time visual feedback of the 
            frequency spectrum and spatial positioning of vocal elements, 
            allowing users to see how their mix is distributed across the surround field. 
          </p>

          <p className="mt-3 max-w-3xl text-base leading-relaxed text-foreground/80">
            The plugin uses different information parameters for the separate 
            window monitoring to depict locational information in the surround 
            space relative to the listener and the frequency spectrum of the 
            audio signal. For the <strong>spatial visualization</strong>, the plugin uses
            the relative signal level of each channel to determine the relative
            volume coming out of each speaker in the source, which culminuates 
            in a visual diagram similar to the polar pattern of a microhone,
            where the center of the diagram represents the listener and the
            speaker sources are points around the listener accompanied with their
            respective labels - Left, Right, Center, Left Surround, Right Surround,
            and a dedicated LFE meter for each channel toward the bottom of the
            plugin window close to the buttons. Given that lower frequency sends
            are not typically used in a majority of the vocal mix, the LFE is 
            mainly used in the Bass vocal group.
          </p>

          <p className="mt-3 max-w-3xl text-base leading-relaxed text-foreground/80">
            For the <strong>frequency spectrum visualization</strong>, the plugin 
            uses a Fast Fourier Transform (FFT) to analyze the audio signal and
            display the frequency content of the signal in real-time. The plugin
            displays a frequency spectrum graph that shows the amplitude of the
            audio signal across different frequencies, allowing users to see how
            the vocal elements are distributed across the frequency spectrum. 
            While the spatial diagram is for monitoring the placement of vocal
            elements in the surround field via panning, the frequency spectrum
            is for monitoring the timbre of different groups to aid in identifying
            spectral overlap and masking between groups, which can be a common
            issue in acappella arrangements for clarity.
          </p>
          
          <p className="mt-3 max-w-3xl text-base leading-relaxed text-foreground/80">
            Aside from the core default functionalty of the plugin, I also implemented 
            a few additional features to enhance the user experience. Both windows of 
            the plugin include a <strong>solo</strong> feature that allows users to 
            isolate specific vocal groups for more detailed analysis. It also includes
            an overall input toggle to turn off specific signals from the mix, effectively
            working as a mute button for a designated channel. These features allow the 
            user to focus on specific elements of the mix and make more informed decisions,
            as well as the overall context of the mix via panning choices and balance of the mix.
          </p>

          {/* Thesis paper */}
          <a
            href={withBasePath("/SV2ThesisPaper.pdf")}
            target="_blank"
            rel="noopener noreferrer"
            className="group mt-14 flex max-w-3xl items-center justify-between border-t border-purple/30 py-5 transition-opacity hover:opacity-60"
          >
            <div>
              <p className="text-lg uppercase tracking-[0.2em] text-purple">
                Thesis Documentation
              </p>
              <p className="mt-1 font-sans text-lg font-medium">
                Surround Vocal Spectrum Visualizer — Master&apos;s Thesis
              </p>
            </div>

            <span className="text-2xl transition-transform duration-200 group-hover:translate-x-1">
              ↗
            </span>
          </a>

          <p className="mt-3 max-w-3xl text-base italic leading-relaxed text-foreground/80">
            Official downloads for AAX, VST3, and AU are not yet available 
            as I continue to refine the UI and feature set ahead of the project’s 
            official release. In the meantime, feel free to explore the GitHub 
            repository for a closer look at the project’s architecture, implementation, 
            and ongoing development.
          </p>

          <a
            href="https://github.com/justdanyuen/SV2"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-5 inline-flex items-center gap-2 border-b border-purple pb-1 text-sm font-medium transition-opacity hover:opacity-60"
          >
            <FaGithub className="text-lg" />
            View Source on GitHub ↗
          </a>

          {/* Project images */}
          <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2">
            {projectImages.map((photo, index) => (
              <button
                key={photo.src}
                type="button"
                onClick={() => setActiveImage(index)}
                className="group relative aspect-video overflow-hidden rounded-xl bg-black/5 cursor-zoom-in"
              >
                <Image
                  src={withBasePath(photo.src)}
                  alt={photo.alt}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                />

                <div className="pointer-events-none absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/10" />
              </button>
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

        </motion.div>
      </motion.section>

      <AnimatePresence>
        {activeImage !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-6"
            onClick={() => setActiveImage(null)}
          >
            <motion.div
              key={activeImage}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{
                duration: 0.2,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="flex max-h-[90vh] max-w-[90vw] flex-col items-center"
              onClick={(event) => event.stopPropagation()}
            >
              <Image
                src={withBasePath(projectImages[activeImage].src)}
                alt={projectImages[activeImage].alt}
                width={1920}
                height={1080}
                className="max-h-[75vh] w-auto max-w-[90vw] rounded-lg object-contain"
              />

              <p className="mt-5 max-w-2xl text-center text-sm leading-relaxed text-white/80 sm:text-base">
                {projectImages[activeImage].caption}
              </p>

              <p className="mt-2 text-xs uppercase tracking-[0.2em] text-white/40">
                {activeImage + 1} / {projectImages.length}
              </p>
            </motion.div>

            <button
              type="button"
              onClick={(event) => {
                event.stopPropagation();
                showPrev();
              }}
              aria-label="Previous screenshot"
              className="absolute left-4 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-3xl text-white transition-colors hover:bg-white/20 sm:left-8"
            >
              &#8249;
            </button>

            <button
              type="button"
              onClick={(event) => {
                event.stopPropagation();
                showNext();
              }}
              aria-label="Next screenshot"
              className="absolute right-4 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-3xl text-white transition-colors hover:bg-white/20 sm:right-8"
            >
              &#8250;
            </button>

            <button
              type="button"
              onClick={() => setActiveImage(null)}
              aria-label="Close preview"
              className="absolute right-6 top-6 text-3xl text-white transition-opacity hover:opacity-60"
            >
              &times;
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}