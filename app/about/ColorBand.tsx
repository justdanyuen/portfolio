"use client";

import { useLayoutEffect, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useMotionTemplate,
} from "motion/react";

// Neutral base color shown before reaching any section
const BASE_COLOR = "#B5B1A8";
const CAL_POLY_COLOR = "#4A7C4E";
const BERKLEE_COLOR = "#B23B3B";
const WORK_COLOR = "#4C6F8C";

// Scroll-linked color band pinned to the viewport. Neutral at the top, then
// green at Cal Poly, red at Berklee, and blue at "What I'm working on now".
// Section positions are measured from their ids (#cal-poly, #berklee, #work)
// so the color changes line up with the real anchors at every breakpoint.
export default function ColorBand() {
  const [fractions, setFractions] = useState({
    calPoly: 0.25,
    berklee: 0.65,
    work: 0.85,
  });

  const { scrollYProgress } = useScroll();

  useLayoutEffect(() => {
    function measure() {
      const calPoly = document.getElementById("cal-poly");
      const berklee = document.getElementById("berklee");
      const work = document.getElementById("work");
      if (!calPoly || !berklee || !work) return;

      const totalHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight <= 0) return;

      // Anchors' scroll-margin-top (scroll-mt-24 / lg:scroll-mt-36)
      const navOffset =
        parseFloat(getComputedStyle(berklee).scrollMarginTop) || 0;

      const fraction = (el: HTMLElement) => {
        const top = el.getBoundingClientRect().top + window.scrollY - navOffset;
        return Math.min(Math.max(top / totalHeight, 0), 1);
      };

      setFractions({
        calPoly: fraction(calPoly),
        berklee: fraction(berklee),
        work: fraction(work),
      });
    }

    measure();
    // Re-measure once images/fonts settle, and on resize
    window.addEventListener("load", measure);
    window.addEventListener("resize", measure);
    return () => {
      window.removeEventListener("load", measure);
      window.removeEventListener("resize", measure);
    };
  }, []);

  const bandColor = useTransform(
    scrollYProgress,
    [
      0,
      Math.max(fractions.calPoly - 0.2, 0.01),
      fractions.calPoly,
      Math.max(fractions.berklee - 0.2, fractions.calPoly + 0.1),
      fractions.berklee,
      Math.max(fractions.work - 0.15, fractions.berklee + 0.05),
      fractions.work,
      1,
    ],
    [
      BASE_COLOR,
      BASE_COLOR,
      CAL_POLY_COLOR,
      CAL_POLY_COLOR,
      BERKLEE_COLOR,
      BERKLEE_COLOR,
      WORK_COLOR,
      WORK_COLOR,
    ]
  );

  const background = useMotionTemplate`linear-gradient(to bottom, ${bandColor} 0%, transparent 70%)`;

  return (
    <motion.div
      className="pointer-events-none fixed inset-x-0 top-0 -z-10 h-screen opacity-60"
      style={{ background }}
    />
  );
}
