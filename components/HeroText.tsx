"use client";

import { motion, type Variants } from "motion/react";

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
        className="mb-4 text-xl uppercase tracking-[0.3em] text-foreground/70"
      >
        Audio • Software • Music
      </motion.p>

      <motion.h1
        variants={item}
        className="text-6xl leading-none sm:text-7xl lg:text-8xl font-sans font-semibold"
      >
        Hi, I&apos;m <span className="font-handwriting font-normal">Justin</span>
      </motion.h1>

      <motion.p
        variants={item}
        className="mt-6 max-w-xl text-xl leading-relaxed text-foreground/80 text-pretty"
      >
        Software engineer exploring immersive audio technology, plugin
        development, and creative tools for music production.
      </motion.p>

      <motion.div
        variants={item}
        className="mt-8 flex flex-wrap gap-6 text-sm uppercase tracking-[0.2em]"
      >
        <a
          href="/projects"
          className="text-xl border-b border-current pb-1 transition-opacity hover:opacity-60"
        >
          View Projects
        </a>
        <a
          href="/about"
          className="text-xl border-b border-current pb-1 transition-opacity hover:opacity-60"
        >
          About Me
        </a>
      </motion.div>
    </motion.div>
  );
}