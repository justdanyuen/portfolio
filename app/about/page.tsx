"use client";

import { useRef, useState, useEffect, useCallback, useLayoutEffect } from "react";
import Image from "next/image";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
  useMotionTemplate,
  type Variants,
} from "motion/react";
import AccentBlock from "@/components/AccentBlock";

const background = [
  {
    title: "Berklee College of Music",
    subtitle: " M.M. Music Production, Technology, and Innovation | August 2025 - July 2026",
    accent: "#B23B3B",
    anchor: "#berklee",
  },
  {
    title: "Cal Poly",
    subtitle: "B.S. Computer Science | September 2021 - June 2025",
    accent: "#4A7C4E",
    anchor: "#cal-poly",
  },
];

const berkleeGallery = [
  { src: "/images/berklee/family.jpg", alt: "Berklee graduation", caption: "Greetings from Valencia, Spain!" },
  { src: "/images/berklee/pro-tools.jpg", alt: "Working in Pro Tools", caption: "Developing SV2 surround audio-visualizer plugin via C++/JUCE and Pro Tools." },
  { src: "/images/berklee/acappella.jpg", alt: "A cappella group", caption: "Post-performance pic with Viva Voce, acappella group at Berklee Valencia I founded in 2025." },
  { src: "/images/berklee/ceremony.jpg", alt: "Official ceremony pic", caption: "Master's in Music Production, Technology, and Innovation" },
  { src: "/images/berklee/mpti.jpg", alt: "MPTI event", caption: "Berklee Valencia MPTI Class of '26" },
  { src: "/images/berklee/friends.jpg", alt: "Friends at Berklee", caption: "End of year paella party to celebrate a year of connection and creation with life-long friends" },
];

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

// Neutral base color shown before reaching either section
const BASE_COLOR = "#E0C468";
const BERKLEE_COLOR = "#B23B3B";
const CAL_POLY_COLOR = "#4A7C4E";

export default function AboutPage() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  const berkleeRef = useRef<HTMLDivElement>(null);
  const calPolyRef = useRef<HTMLDivElement>(null);
  const [activePhoto, setActivePhoto] = useState<number | null>(null);
  const [sectionFractions, setSectionFractions] = useState({
    berklee: 0.25,
    calPoly: 0.65,
  });

  const { scrollYProgress } = useScroll({
    target: scrollRef,
    offset: ["start start", "end end"],
  });

  // Measure where the Berklee and Cal Poly sections actually sit
  // as a fraction of total scrollable height, so the color band
  // lines up with the real anchors instead of a flat page-wide guess.
  useLayoutEffect(() => {
    function measure() {
      const container = scrollRef.current;
      const berklee = berkleeRef.current;
      const calPoly = calPolyRef.current;
      if (!container || !berklee || !calPoly) return;

      const totalHeight = container.scrollHeight - window.innerHeight;
      if (totalHeight <= 0) return;

      const berkleeOffset = getOffsetWithin(berklee, container);
      const calPolyOffset = getOffsetWithin(calPoly, container);

      setSectionFractions({
        berklee: Math.min(Math.max(berkleeOffset / totalHeight, 0), 1),
        calPoly: Math.min(Math.max(calPolyOffset / totalHeight, 0), 1),
      });
    }

    function getOffsetWithin(el: HTMLElement, ancestor: HTMLElement) {
      let offset = 0;
      let node: HTMLElement | null = el;
      while (node && node !== ancestor) {
        offset += node.offsetTop;
        node = node.offsetParent as HTMLElement | null;
      }
      return offset;
    }

    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  // Neutral at top -> red once Berklee section is reached -> green once Cal Poly is reached
  const bandColor = useTransform(
    scrollYProgress,
    [
      0,
      Math.max(sectionFractions.berklee - 0.14, 0.01),
      sectionFractions.berklee + 0.08,
      Math.max(sectionFractions.calPoly - 0.14, sectionFractions.berklee + 0.12),
      sectionFractions.calPoly + 0.08,
      1,
    ],
    [BASE_COLOR, BASE_COLOR, BERKLEE_COLOR, BERKLEE_COLOR, CAL_POLY_COLOR, CAL_POLY_COLOR]
  );
  const bandBackground = useMotionTemplate`linear-gradient(to bottom, ${bandColor} 0%, transparent 70%)`;

  const scrollCarousel = (direction: "left" | "right") => {
    const el = carouselRef.current;
    if (!el) return;
    const amount = el.clientWidth * 0.8;
    el.scrollBy({
      left: direction === "left" ? -amount : amount,
      behavior: "smooth",
    });
  };

  const showPrev = useCallback(() => {
    setActivePhoto((current) => {
      if (current === null) return current;
      return (current - 1 + berkleeGallery.length) % berkleeGallery.length;
    });
  }, []);

  const showNext = useCallback(() => {
    setActivePhoto((current) => {
      if (current === null) return current;
      return (current + 1) % berkleeGallery.length;
    });
  }, []);

  // Keyboard navigation for the lightbox
  useEffect(() => {
    if (activePhoto === null) return;

    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setActivePhoto(null);
      if (e.key === "ArrowLeft") showPrev();
      if (e.key === "ArrowRight") showNext();
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activePhoto, showPrev, showNext]);

  return (
    <div ref={scrollRef} className="relative">
      {/* Scroll-linked color band, pinned to viewport, tracks real section positions */}
      <motion.div
        className="pointer-events-none fixed inset-x-0 top-0 -z-10 h-screen opacity-60"
        style={{ background: bandBackground }}
      />

      <section className="w-full px-6 pb-32 pt-36 sm:px-10 lg:px-16">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1.3fr_1fr] lg:items-start">
          <motion.div variants={container} initial="hidden" animate="show">
            <motion.h1
              variants={item}
              className="font-sans text-3xl font-bold text-foreground sm:text-4xl"
            >
              ABOUT
            </motion.h1>

            {/* Background links moved to the top */}
            <motion.div variants={item} className="mt-6">
              <h2 className="mb-4 font-sans text-lg font-semibold text-foreground">
                Background
              </h2>
              <div>
                {background.map((entry) => (
                  <a
                    key={entry.title}
                    href={entry.anchor}
                    className="block transition-opacity hover:opacity-70"
                  >
                    <AccentBlock
                      color={entry.accent}
                      title={entry.title}
                      subtitle={entry.subtitle}
                    />
                  </a>
                ))}
              </div>
            </motion.div>

            <motion.p
              variants={item}
              className="mt-8 max-w-2xl font-handwriting text-2xl leading-relaxed text-foreground/80"
            >
              I&apos;m a software engineer with a focus on audio technology.
              My interest in sound started in the studio, and it&apos;s
              carried through into how I approach building software today
              &mdash; thinking about signal, latency, and the small details
              that make audio tools feel right to use.
            </motion.p>

            <motion.p
              variants={item}
              className="mt-4 max-w-2xl font-handwriting text-2xl leading-relaxed text-foreground/80"
            >
              Outside of coursework and projects, I spend time exploring the
              intersection of music production and real-time software
              &mdash; the kind of tools that sit between a musician&apos;s
              idea and the sound coming out of the speakers.
            </motion.p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
            className="hidden flex-col gap-4 lg:flex"
          >
            <div className="relative aspect-[4/3] w-full overflow-hidden bg-olive">
              <Image
                src="/images/studio.jpg"
                alt="Studio"
                fill
                className="object-cover object-center"
              />
            </div>
          </motion.div>
        </div>

        {/* Berklee text */}
        <div ref={berkleeRef} id="berklee" className="mt-24 max-w-3xl scroll-mt-36">
          <h2 className="mb-4 font-sans text-4xl font-semibold text-foreground">
            Berklee
          </h2>
          <p className="text-2xl font-handwriting leading-relaxed text-foreground/80">
            In August 2025, I moved across the world from Northern California to Valencia,
            Spain to pursue a master's degree in Music Production, Technology, and Innovation. 
            I spent a year at Berklee College of Music's Valencia study abroad campus, 
            where I learned advanced concepts in audio engineering, surround sound mixing,
            signal flow, music production, and software development for audio applications. 
            What began as a year of uncertainty and exploration turned into a life-changing
            experience where I met lifelong friends, collaborated on music and software 
            projects with artists and developers from around the world, and gaind a deeper 
            understanding of how technology in the modern world has predominant influence
            on the way we create and consume audio.
          </p>
          <p className="text-2xl font-handwriting leading-relaxed text-foreground/80">
          
          </p>

        </div>
      </section>

      {/* Full-bleed gallery carousel, breaking out of the page's max-width for larger photos */}
      <div className="relative left-1/2 right-1/2 -mx-[50vw] mt-6 w-screen px-6 sm:px-10 lg:px-16">
        <div className="group/carousel relative">
          <div
            ref={carouselRef}
            className="flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {berkleeGallery.map((photo, index) => (
              <button
                key={photo.alt}
                type="button"
                onClick={() => setActivePhoto(index)}
                className="relative aspect-square w-[45%] flex-shrink-0 snap-start cursor-zoom-in overflow-hidden bg-olive transition-opacity hover:opacity-90 sm:w-[23%]"
              >
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  className="object-cover object-center"
                />
              </button>
            ))}
          </div>

          {/* Carousel nav buttons */}
          <button
            type="button"
            onClick={() => scrollCarousel("left")}
            aria-label="Scroll gallery left"
            className="absolute left-2 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-foreground opacity-0 shadow-md transition-opacity duration-200 group-hover/carousel:opacity-100 hover:bg-white"
          >
            &#8249;
          </button>
          <button
            type="button"
            onClick={() => scrollCarousel("right")}
            aria-label="Scroll gallery right"
            className="absolute right-2 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-foreground opacity-0 shadow-md transition-opacity duration-200 group-hover/carousel:opacity-100 hover:bg-white"
          >
            &#8250;
          </button>
        </div>
      </div>

      <section className="w-full max-w-6xl px-6 pb-32 pt-16 sm:px-10 lg:px-16">
        <div ref={calPolyRef} id="cal-poly" className="max-w-xl scroll-mt-36">
          <h2 className="mb-4 font-sans text-4xl font-semibold text-foreground">
            Cal Poly
          </h2>
          <p className="text-2xl font-handwriting leading-relaxed text-foreground/80">
            Placeholder copy about Cal Poly &mdash; coursework, projects,
            the thesis, and how your CS background eventually pointed back
            toward audio. Replace with your actual narrative.
          </p>
        </div>

        <div className="mt-16 max-w-xl">
          <h2 className="mb-4 font-sans text-4xl font-semibold text-foreground">
            What I&apos;m working on now
          </h2>
          <p className="text-2xl font-handwriting leading-relaxed text-foreground/80">
            Placeholder for current interests or ongoing projects &mdash;
            whatever you&apos;re building, learning, or exploring right
            now in audio technology.
          </p>
        </div>
      </section>

      {/* Lightbox with prev/next navigation and captions */}
      <AnimatePresence>
        {activePhoto !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-6"
            onClick={() => setActivePhoto(null)}
          >
            <motion.div
              key={activePhoto}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="flex max-h-[90vh] max-w-[90vw] flex-col items-center"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative max-h-[75vh] w-auto max-w-[90vw]">
                <Image
                  src={berkleeGallery[activePhoto].src}
                  alt={berkleeGallery[activePhoto].alt}
                  width={1600}
                  height={1600}
                  className="max-h-[75vh] w-auto max-w-[90vw] object-contain"
                />
              </div>
              <p className="mt-4 text-center text-sm text-white/80">
                {berkleeGallery[activePhoto].caption}
              </p>
            </motion.div>

            {/* Prev / next controls */}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                showPrev();
              }}
              aria-label="Previous photo"
              className="absolute left-4 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-3xl text-white transition-colors hover:bg-white/20 sm:left-8"
            >
              &#8249;
            </button>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                showNext();
              }}
              aria-label="Next photo"
              className="absolute right-4 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-3xl text-white transition-colors hover:bg-white/20 sm:right-8"
            >
              &#8250;
            </button>

            <button
              type="button"
              onClick={() => setActivePhoto(null)}
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