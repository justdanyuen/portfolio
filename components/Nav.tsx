"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence, type Variants } from "motion/react";
import { withBasePath } from "@/lib/basePath";

const links = [
  { href: "/about", label: "ABOUT" },
  { href: "/projects", label: "PROJECTS" },
  { href: "/resume", label: "RESUME" },
];

const linkClass =
  "transition-all duration-200 hover:scale-110 hover:opacity-60";

// Each page's accent color, so the mobile menu matches the band behind the nav
const pageAccents: Record<string, string> = {
  "/": "var(--color-olive)",
  "/about": "#B5B1A8", // matches BASE_COLOR on the About page
  "/projects": "var(--color-purple)",
  "/resume": "var(--color-resume-blue)",
};

// Shared styles for the three hamburger lines (sized for the 48px button)
const barClass =
  "absolute left-2.5 right-2.5 h-0.5 rounded-full bg-current transition-all duration-300";

// Links drop in one after another when the menu opens
const menuList: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.05, delayChildren: 0.05 } },
};

const menuItem: Variants = {
  hidden: { opacity: 0, y: -6 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] },
  },
};

export default function Nav() {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  // Light tint of the page's accent: close to the accent at the top (matching
  // the nav bar), fading lighter toward the bottom
  const accent = pageAccents[pathname] ?? "var(--background)";
  const panelBackground = `linear-gradient(to bottom,
    color-mix(in srgb, ${accent} 80%, white) 0%,
    color-mix(in srgb, ${accent} 45%, white) 100%)`;

  // Close the menu with Escape
  useEffect(() => {
    if (!menuOpen) return;

    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setMenuOpen(false);
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [menuOpen]);

  return (
    <motion.nav
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="fixed top-0 left-0 right-0 z-50"
    >
      {/* Mobile: soften the page behind the open menu (blur, no darkening);
          tapping it closes the menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            key="menu-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-white/10 backdrop-blur-sm sm:hidden"
            onClick={() => setMenuOpen(false)}
            aria-hidden
          />
        )}
      </AnimatePresence>

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
      <div className="relative flex items-center justify-between gap-4 p-4 md:p-6">
        <Link
          href="/"
          onClick={() => setMenuOpen(false)}
          className="shrink-0 md:ml-3 transition-transform duration-200 hover:scale-105 drop-shadow-[0_1px_3px_rgba(0,0,0,0.35)]"
        >
          <Image
            src={withBasePath("/images/icons/ink/favicon-512.webp")}
            alt="Justin Yuen"
            width={80}
            height={80}
            priority
            className="h-auto w-14 md:w-20"
          />
        </Link>

        {/* Desktop / tablet links */}
        <div className="hidden items-center gap-4 text-lg font-medium [text-shadow:0_1px_3px_rgba(0,0,0,0.35)] sm:flex md:gap-6 md:text-2xl">
          {/* <Link className={linkClass} href="/">HOME</Link> */}
          {links.map((link) => (
            <Link key={link.href} className={linkClass} href={link.href}>
              {link.label}
            </Link>
          ))}
        </div>

        {/* Mobile hamburger: three lines that morph into an X */}
        <button
          type="button"
          onClick={() => setMenuOpen((open) => !open)}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          className="relative h-12 w-12 drop-shadow-[0_1px_3px_rgba(0,0,0,0.35)] sm:hidden"
        >
          <span
            className={`${barClass} ${
              menuOpen ? "top-1/2 -translate-y-1/2 rotate-45" : "top-[15px]"
            }`}
          />
          <span
            className={`${barClass} top-1/2 -translate-y-1/2 ${
              menuOpen ? "opacity-0" : "opacity-100"
            }`}
          />
          <span
            className={`${barClass} ${
              menuOpen ? "top-1/2 -translate-y-1/2 -rotate-45" : "top-[31px]"
            }`}
          />
        </button>
      </div>

      {/* Mobile dropdown panel */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="mobile-menu"
            key="mobile-menu"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-x-0 top-full shadow-lg shadow-black/10 sm:hidden"
            style={{ background: panelBackground }}
          >
            <motion.ul
              variants={menuList}
              initial="hidden"
              animate="show"
              className="flex flex-col px-6 py-2"
            >
              {links.map((link) => {
                const active = pathname === link.href;

                return (
                  <motion.li
                    key={link.href}
                    variants={menuItem}
                    className="border-b border-black/10 last:border-none"
                  >
                    <Link
                      href={link.href}
                      onClick={() => setMenuOpen(false)}
                      aria-current={active ? "page" : undefined}
                      className={`flex items-center justify-between py-4 text-2xl font-medium tracking-wide transition-opacity hover:opacity-60 ${
                        active ? "opacity-100" : "opacity-75"
                      }`}
                    >
                      {link.label}
                      {active && (
                        <span className="h-2 w-2 rounded-full bg-current" />
                      )}
                    </Link>
                  </motion.li>
                );
              })}
            </motion.ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}