"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "motion/react";

export default function Nav() {
  return (
    <motion.nav
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="fixed top-0 left-0 right-0 z-50"
    >
      {/* Blurred backing layer, feathered out at the bottom edge */}
      <div
        className="absolute inset-0 backdrop-blur-md"
        style={{
          maskImage:
            "linear-gradient(to bottom, black 0%, black 55%, transparent 100%)",
          WebkitMaskImage:
            "linear-gradient(to bottom, black 0%, black 55%, transparent 100%)",
        }}
      />

      {/* Actual nav content -- sits above the blur layer, never fades */}
      <div className="relative flex items-center justify-between p-6">
        <Link
          href="/"
          className="ml-7 scale-[1.6] transition-transform duration-200 hover:scale-[1.75] drop-shadow-[0_1px_3px_rgba(0,0,0,0.35)]"
        >
          <Image
            src="/images/icons/ink/favicon-512.png"
            alt="Justin Yuen"
            width={50}
            height={50}
            priority
          />
        </Link>
        <div className="text-2xl flex items-center gap-6 font-medium [text-shadow:0_1px_3px_rgba(0,0,0,0.35)]">
          <Link className="transition-all duration-200 hover:scale-110 hover:opacity-60"href="/">HOME</Link>
        <Link className="transition-all duration-200 hover:scale-110 hover:opacity-60"href="/about">ABOUT</Link>
        <Link className="transition-all duration-200 hover:scale-110 hover:opacity-60"href="/projects">PROJECTS</Link>
        <Link className="transition-all duration-200 hover:scale-110 hover:opacity-60"href="/resume">RESUME</Link>
        </div>
      </div>
    </motion.nav>
  );
}