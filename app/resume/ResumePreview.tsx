"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import { withBasePath } from "@/lib/basePath";

const RESUME_SRC = "/images/resume.webp";

// Resume preview card plus its full-screen viewer (click to open, Escape or
// click outside to close; background scrolling is locked while open)
export default function ResumePreview() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;

    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [open]);

  return (
    <>
      {/* Below lg: full page scaled to fit the leftover height, shadow hugs the paper.
          lg+: the original white card at a fixed 8.5x11 ratio. */}
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="View resume full screen"
        className="relative block min-h-[240px] w-full flex-1 cursor-zoom-in transition-transform duration-500 hover:-translate-y-1 lg:aspect-[8.5/11] lg:min-h-0 lg:flex-none lg:overflow-hidden lg:rounded-xl lg:border lg:border-resume-blue/20 lg:bg-white lg:shadow-xl lg:shadow-black/10"
      >
        <Image
          src={withBasePath(RESUME_SRC)}
          alt="Justin Yuen resume"
          fill
          priority
          sizes="(max-width: 1024px) 100vw, 65vw"
          className="object-contain drop-shadow-[0_8px_20px_rgba(0,0,0,0.18)] lg:drop-shadow-none"
        />
      </button>

      {/* Full-screen viewer: resume at full width, scrolls vertically */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[100] overflow-y-auto bg-black/90"
            onClick={() => setOpen(false)}
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
                  src={withBasePath(RESUME_SRC)}
                  alt="Justin Yuen resume"
                  width={1700}
                  height={2200}
                  className="h-auto w-full rounded-md bg-white"
                />
              </motion.div>
            </div>

            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close resume viewer"
              className="fixed right-5 top-4 text-4xl text-white transition-opacity hover:opacity-60"
            >
              &times;
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
