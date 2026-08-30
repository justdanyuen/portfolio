"use client";

import Image from "next/image";
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
  return (
    <div className="relative">
      {/* Steel blue gradient band, same intensity/shape as the Projects purple band */}
      <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[700px] bg-gradient-to-b from-resume-blue via-resume-blue/40 to-transparent opacity-80" />

      <section className="w-full max-w-6xl px-6 pb-20 pt-36 sm:px-10 lg:px-16">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1fr_1.1fr] lg:items-start">
          {/* Left column: text content */}
          <motion.div variants={container} initial="hidden" animate="show">
            <motion.h1
              variants={item}
              className="font-sans text-3xl font-bold text-foreground sm:text-4xl"
            >
              RESUME
            </motion.h1>

            {/* Skills */}
            <motion.div variants={item} className="mt-8">
              <h2 className="mb-3 font-sans text-lg font-semibold text-foreground">
                Skills
              </h2>
              <div className="flex flex-wrap gap-2">
                {skills.map((s) => (
                  <a
                    key={s.name}
                    href={s.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-md bg-resume-blue px-3 py-1 text-xs font-medium text-white transition-opacity hover:opacity-75"
                  >
                    {s.name}
                  </a>
                ))}
              </div>
            </motion.div>

            {/* Download */}
            <motion.div variants={item} className="mt-10">
              <a
                href="/resume.pdf"
                download
                className="inline-block border-b border-resume-blue pb-1 text-sm font-medium uppercase tracking-[0.15em] text-resume-blue transition-opacity hover:opacity-60"
              >
                Download PDF
              </a>
            </motion.div>
          </motion.div>

          {/* Right column: larger preview, sized to fit without scrolling */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
            className="mx-auto w-full max-w-md lg:mx-0 lg:max-w-none"
          >
            <p className="mb-3 text-xs font-medium uppercase tracking-[0.2em] text-resume-blue">
              Preview
            </p>

            <div className="group relative aspect-[8.5/11] max-h-[70vh] w-full overflow-hidden rounded-xl border border-resume-blue/30 shadow-lg shadow-resume-blue/10 transition-shadow duration-300 hover:shadow-xl hover:shadow-resume-blue/20 lg:mx-auto">
              <Image
                src="/images/resume.png"
                alt="Resume preview"
                fill
                className="object-cover object-top"
              />

              {/* Hover overlay for a quick full-view link on desktop */}
              <a
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="absolute inset-0 flex items-center justify-center bg-resume-blue/0 opacity-0 transition-all duration-300 group-hover:bg-resume-blue/80 group-hover:opacity-100"
              >
                <span className="translate-y-2 text-sm font-medium uppercase tracking-[0.15em] text-white transition-transform duration-300 group-hover:translate-y-0">
                  Open full view
                </span>
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}