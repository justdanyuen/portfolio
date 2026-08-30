"use client";

import Image from "next/image";
import { motion, type Variants } from "motion/react";
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
  return (
    <div className="relative">
      {/* Steel blue gradient band, same intensity/shape as the Projects purple band */}
      <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[700px] bg-gradient-to-b from-resume-blue via-resume-blue/40 to-transparent opacity-80" />

        <section className="w-full px-6 pb-24 pt-36 sm:px-10 lg:px-16">
          <div className="grid max-w-[1400px] grid-cols-1 gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16 xl:grid-cols-[0.7fr_1.3fr] xl:gap-20 lg:items-start">          
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

            <motion.div variants={item} className="mt-8">
              <h2 className="mb-3 font-sans text-2xl font-semibold text-foreground">
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

            <motion.div variants={item} className="mt-10">
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
            className="w-full max-w-[720px] justify-self-start"
          >
            <div className="mb-4 flex items-center justify-between">
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

            <div className="group relative aspect-[8.5/11] w-full overflow-hidden rounded-xl border border-resume-blue/20 bg-white shadow-xl shadow-black/10 transition-transform duration-500 hover:-translate-y-1">
              <Image
                src={withBasePath("/images/resume.png")}
                alt="Justin Yuen resume"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 65vw"
                className="object-contain"
              />

              <a
                href={withBasePath("/resume.pdf")}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Open resume PDF"
                className="absolute inset-0"
              />
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}