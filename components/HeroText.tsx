"use client";

import { motion, type Variants } from "motion/react";
import { withBasePath } from "@/lib/basePath";

const container: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.22, delayChildren: 0.2 },
  },
};

const item: Variants = {
  hidden: { opacity: 0, x: -120 },
  show: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 1.1,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

export default function HeroText() {
  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="relative z-10 max-w-3xl"
    >
      <motion.p
        variants={item}
        className="mb-2 text-sm uppercase tracking-[0.2em] text-foreground/70 sm:mb-4 sm:text-xl sm:tracking-[0.3em]"
      >
        Audio • Software • Music
      </motion.p>

      <motion.h1
        variants={item}
        className="font-sans text-5xl font-semibold leading-[0.95] sm:text-7xl sm:leading-none lg:text-8xl"
      >
        Hi, I&apos;m Justin
        {/* <span className="font-handwriting font-normal"> */}
          {/* </span> */}
      </motion.h1>

      <motion.p
        variants={item}
        className="mt-3 max-w-xl text-base leading-normal text-foreground text-pretty sm:mt-6 sm:text-xl sm:leading-relaxed"
      >
        Software engineer specializing in audio technology, from studio production to building DAW plugins via C++ / JUCE.
      </motion.p>

      <motion.div
        variants={item}
        className="mt-5 flex flex-wrap gap-5 text-sm uppercase tracking-[0.15em] sm:mt-8 sm:gap-6 sm:text-xl sm:tracking-[0.2em]"
      >
        <a
          href={withBasePath("/projects")}
          className="border-b border-current pb-1 transition-opacity hover:opacity-60"
        >
          View Projects
        </a>
        <a
          href={withBasePath("/about")}
          className="border-b border-current pb-1 transition-opacity hover:opacity-60"
        >
          About Me
        </a>
      </motion.div>
    </motion.div>
  );
}