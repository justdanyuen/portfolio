"use client";

import { useRef } from "react";
import Image from "next/image";
import {
  motion,
  useScroll,
  useTransform,
  useMotionTemplate,
  type Variants,
} from "motion/react";
import AccentBlock from "@/components/AccentBlock";
import aboutPic from "../../public/images/about-photo.jpg";

const background = [
  {
    title: "Berklee College of Music",
    subtitle: "Audio engineering studies",
    accent: "#B23B3B",
  },
  {
    title: "Cal Poly",
    subtitle: "B.S. Computer Science",
    accent: "#4A7C4E",
  },
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

export default function AboutPage() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: scrollRef,
    offset: ["start start", "end end"],
  });

  // Red (Berklee) -> Green (Cal Poly) as you scroll through the page
  const bandColor = useTransform(
    scrollYProgress,
    [0, 1],
    ["#B23B3B", "#4A7C4E"]
  );
  const bandBackground = useMotionTemplate`linear-gradient(to bottom, ${bandColor} 0%, transparent 70%)`;

  return (
    <div ref={scrollRef} className="relative">
      {/* Scroll-linked color band, pinned to viewport so it visibly shifts as you scroll */}
      <motion.div
        className="pointer-events-none fixed inset-x-0 top-0 -z-10 h-screen opacity-60"
        style={{ background: bandBackground }}
      />

      <section className="w-full max-w-6xl px-6 pb-32 pt-36 sm:px-10 lg:px-16">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1.3fr_1fr] lg:items-start">
          <motion.div variants={container} initial="hidden" animate="show">
            <motion.h1
              variants={item}
              className="font-sans text-3xl font-semibold text-foreground sm:text-4xl"
            >
              About
            </motion.h1>

            <motion.p
              variants={item}
              className="mt-6 max-w-xl font-handwriting text-2xl leading-relaxed text-foreground/80"
            >
              I&apos;m a software engineer with a focus on audio technology.
              My interest in sound started in the studio, and it&apos;s
              carried through into how I approach building software today
              &mdash; thinking about signal, latency, and the small details
              that make audio tools feel right to use.
            </motion.p>

            <motion.p
              variants={item}
              className="mt-4 max-w-xl font-handwriting text-2xl leading-relaxed text-foreground/80"
            >
              Outside of coursework and projects, I spend time exploring the
              intersection of music production and real-time software
              &mdash; the kind of tools that sit between a musician&apos;s
              idea and the sound coming out of the speakers.
            </motion.p>

            <motion.div variants={item} className="mt-10">
              <h2 className="mb-4 font-sans text-lg font-semibold text-foreground">
                Background
              </h2>
              <div>
                {background.map((entry) => (
                  <AccentBlock
                    key={entry.title}
                    color={entry.accent}
                    title={entry.title}
                    subtitle={entry.subtitle}
                  />
                ))}
              </div>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
            className="relative hidden aspect-[4/5] w-full overflow-hidden rounded-2xl bg-olive lg:block"
          >
            <Image
              src={aboutPic}
              alt="Justin Yuen"
              fill
              className="object-cover object-center"
            />
          </motion.div>
        </div>

        {/* Filler content so there's room to scroll through the color transition */}
        <div className="mt-24 max-w-xl">
          <h2 className="mb-4 font-sans text-lg font-semibold text-foreground">
            Berklee
          </h2>
          <p className="text-base leading-relaxed text-foreground/80">
            Placeholder copy about your time at Berklee &mdash; what you
            studied, studio work, sessions, gear, or specific coursework
            that shaped how you think about sound. Replace this with the
            real story once you&apos;ve got it written.
          </p>
        </div>

        <div className="mt-16 max-w-xl">
          <h2 className="mb-4 font-sans text-lg font-semibold text-foreground">
            Cal Poly
          </h2>
          <p className="text-base leading-relaxed text-foreground/80">
            Placeholder copy about Cal Poly &mdash; coursework, projects,
            the thesis, and how your CS background eventually pointed back
            toward audio. Replace with your actual narrative.
          </p>
        </div>

        <div className="mt-16 max-w-xl">
          <h2 className="mb-4 font-sans text-lg font-semibold text-foreground">
            What I&apos;m working on now
          </h2>
          <p className="text-base leading-relaxed text-foreground/80">
            Placeholder for current interests or ongoing projects &mdash;
            whatever you&apos;re building, learning, or exploring right
            now in audio technology.
          </p>
        </div>
      </section>
    </div>
  );
}
