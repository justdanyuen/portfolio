"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence, type Variants } from "motion/react";
import { withBasePath } from "@/lib/basePath";

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

const skills = [
  { name: "C++", url: "https://www.geeksforgeeks.org/cpp/c-plus-plus/" },
  { name: "JUCE", url: "https://juce.com/" },
  { name: "Python", url: "https://www.python.org/" },
  { name: "JavaScript", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript" },
  { name: "SQL", url: "https://www.w3schools.com/sql/" },
  { name: "Logic Pro X", url: "https://www.apple.com/logic-pro/" },
  { name: "Pro Tools", url: "https://www.avid.com/pro-tools" },
  { name: "MAX/MSP", url: "https://cycling74.com/products/max/" },
];

export default function ResumePage() {
  const [viewerOpen, setViewerOpen] = useState(false);

  // Close on Escape, and lock background scrolling while the viewer is open
  useEffect(() => {
    if (!viewerOpen) return;

    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setViewerOpen(false);
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [viewerOpen]);

  return (
    // overflow-x-clip (not hidden) prevents the slide-in animation from
    // widening the page on mobile without breaking lg:sticky below
    <div className="relative overflow-x-clip">
      {/* Steel blue gradient band, same intensity/shape as the Projects purple band */}
      <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[700px] bg-gradient-to-b from-resume-blue via-resume-blue/40 to-transparent opacity-80" />

      {/* Below lg: one screen tall, preview fills the leftover space. lg+: original layout */}
      <section className="flex min-h-svh w-full flex-col px-6 pb-24 pt-20 sm:px-10 lg:block lg:min-h-0 lg:px-16 lg:pt-36">
        <div className="flex max-w-[1400px] flex-1 flex-col gap-6 lg:grid lg:grid-cols-[0.8fr_1.2fr] lg:items-start lg:gap-16 xl:grid-cols-[0.7fr_1.3fr] xl:gap-20">
          {/* Left column */}
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="lg:sticky lg:top-32"
          >
            <motion.h1
              variants={item}
              className="font-sans text-3xl font-bold text-foreground sm:text-4xl"
            >
              RESUME
            </motion.h1>

            <motion.div variants={item} className="mt-4 lg:mt-8">
              <h2 className="mb-2 font-sans text-xl font-semibold text-foreground lg:mb-3 lg:text-2xl">
                Skills
              </h2>

              <div className="flex flex-wrap gap-2">
                {skills.map((s) => (
                  <a
                    key={s.name}
                    href={s.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-md bg-resume-blue px-3 py-1 text-xs font-medium text-white transition-all hover:-translate-y-0.5 hover:opacity-80"
                  >
                    {s.name}
                  </a>
                ))}
              </div>
            </motion.div>

            <motion.div variants={item} className="mt-5 lg:mt-10">
              <a
                href={withBasePath("/resume.pdf")}
                download
                className="inline-block border-b border-resume-blue pb-1 text-sm font-medium uppercase tracking-[0.15em] text-resume-blue transition-opacity hover:opacity-60"
              >
                Download PDF
              </a>
            </motion.div>
          </motion.div>

          {/* Resume */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{
              duration: 0.9,
              ease: [0.16, 1, 0.3, 1],
              delay: 0.2,
            }}
            className="flex w-full max-w-[720px] flex-1 flex-col justify-self-start lg:block"
          >
            <div className="mb-3 flex items-center justify-between lg:mb-4">
              <p className="text-xs font-medium uppercase tracking-[0.2em] text-resume-blue">
                Preview
              </p>

              <a
                href={withBasePath("/resume.pdf")}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-medium uppercase tracking-[0.15em] text-muted-foreground transition-colors hover:text-resume-blue"
              >
                Open PDF ↗
              </a>
            </div>

            {/* Below lg: full page scaled to fit the leftover height, shadow hugs the paper.
                lg+: the original white card at a fixed 8.5x11 ratio. */}
            <button
              type="button"
              onClick={() => setViewerOpen(true)}
              aria-label="View resume full screen"
              className="relative block min-h-[240px] w-full flex-1 cursor-zoom-in transition-transform duration-500 hover:-translate-y-1 lg:aspect-[8.5/11] lg:min-h-0 lg:flex-none lg:overflow-hidden lg:rounded-xl lg:border lg:border-resume-blue/20 lg:bg-white lg:shadow-xl lg:shadow-black/10"
            >
              <Image
                src={withBasePath("/images/resume.webp")}
                alt="Justin Yuen resume"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 65vw"
                className="object-contain drop-shadow-[0_8px_20px_rgba(0,0,0,0.18)] lg:drop-shadow-none"
              />
            </button>
          </motion.div>
        </div>
      </section>

      {/* Full-screen viewer: resume at full width, scrolls vertically */}
      <AnimatePresence>
        {viewerOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[100] overflow-y-auto bg-black/90"
            onClick={() => setViewerOpen(false)}
          >
            <div className="flex min-h-full items-start justify-center px-4 py-16 sm:px-8">
              <motion.div
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.97 }}
                transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                className="w-full max-w-3xl"
                onClick={(e) => e.stopPropagation()}
              >
                <Image
                  src={withBasePath("/images/resume.webp")}
                  alt="Justin Yuen resume"
                  width={1700}
                  height={2200}
                  className="h-auto w-full rounded-md bg-white"
                />
              </motion.div>
            </div>

            <button
              type="button"
              onClick={() => setViewerOpen(false)}
              aria-label="Close resume viewer"
              className="fixed right-5 top-4 text-4xl text-white transition-opacity hover:opacity-60"
            >
              &times;
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}