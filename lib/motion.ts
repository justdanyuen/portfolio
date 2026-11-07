import type { Variants } from "motion/react";

// Shared entrance animations. Plain objects, so server components can pass them
// to `motion/react-client` elements (staggered parent + fade-up children).

export const container: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.15, delayChildren: 0.1 },
  },
};

export const item: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
  },
};

// Right-hand media (photo / resume preview) sliding in from the right
export const slideIn = {
  initial: { opacity: 0, x: 40 },
  animate: { opacity: 1, x: 0 },
  transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.2 },
} as const;
