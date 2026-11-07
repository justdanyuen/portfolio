import * as motion from "motion/react-client";
import { withBasePath } from "@/lib/basePath";
import { container, item, slideIn } from "@/lib/motion";
import ResumePreview from "./ResumePreview";

// Server component: text and layout are rendered to static HTML at build time.
// Only the preview card + full-screen viewer (ResumePreview) runs as client code.

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

// Condensed from public/resume.pdf — keep in sync when the resume changes
const highlights = [
  {
    dates: "2026 – Present",
    title: "Software Developer — Data Annotation",
    detail:
      "Write and review C++, Python, and JS prompts for training AI models.",
  },
  {
    dates: "2026",
    title: "Master's Thesis — SV2",
    detail:
      "C++/JUCE 5.1 surround visualizer plugin with real-time FFT analysis.",
  },
  {
    dates: "2024",
    title: "Software Dev Intern — RadWatch, Berkeley",
    detail:
      "Automated global radiation data pipelines with Python, PHP, and MySQL.",
  },
  {
    dates: "2022 – 2025",
    title: "Music Director — Take it SLO A Cappella",
    detail:
      "Arranged, produced, and directed recordings with 150k+ streams.",
  },
];

export default function ResumePage() {
  return (
    // overflow-x-clip (not hidden) prevents the slide-in animation from
    // widening the page on mobile without breaking lg:sticky below
    <div className="relative overflow-x-clip">
      {/* Subtle neutral band, pinned to viewport, matching the About page band */}
      <div className="pointer-events-none fixed inset-x-0 top-0 -z-10 h-screen bg-gradient-to-b from-[#B5B1A8] from-0% to-transparent to-70% opacity-60" />

      {/* Below lg: one screen tall, preview fills the leftover space.
          lg+: text column on the left fills the remaining width, preview column
          is pinned to the right margin (720px from xl; 960px on 2xl screens at
          least 1024px tall, so standard-height desktops keep room for the text) */}
      <section className="flex min-h-svh w-full flex-col px-6 pb-24 pt-20 sm:px-10 lg:block lg:min-h-0 lg:px-16 lg:pb-0 lg:pt-36 lg:short:pt-32">
        <div className="flex flex-1 flex-col gap-6 lg:grid lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:items-start lg:gap-16 xl:grid-cols-[minmax(0,1fr)_minmax(0,720px)] xl:short:grid-cols-[minmax(0,1fr)_minmax(0,600px)] xl:gap-20 xl:short:gap-12 2xl:tall:grid-cols-[minmax(0,1fr)_minmax(0,960px)]">
          {/* Left column */}
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            // Pinned at the section's top padding (9rem, 8rem on short windows) so it doesn't shift on scroll
            className="lg:sticky lg:top-36 lg:short:top-32"
          >
            <motion.h1
              variants={item}
              className="font-sans text-3xl font-bold text-foreground sm:text-4xl"
            >
              RESUME
            </motion.h1>

            <motion.div variants={item} className="mt-4 lg:mt-8 lg:short:mt-5">
              <h2 className="mb-2 font-sans text-xl font-semibold text-foreground lg:mb-3 lg:text-2xl">
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

            {/* On short desktop windows this link moves into the preview header to save height */}
            <motion.div variants={item} className="mt-5 lg:mt-10 lg:short:hidden">
              <a
                href={withBasePath("/resume.pdf")}
                download
                className="inline-block border-b border-resume-blue pb-1 text-sm font-medium uppercase tracking-[0.15em] text-resume-blue transition-opacity hover:opacity-60"
              >
                Download PDF
              </a>
            </motion.div>

            {/* Summary + highlights: lg+ only, so the mobile preview keeps its full-screen layout */}
            <motion.div
              variants={item}
              className="mt-6 hidden border-t border-resume-blue/20 pt-6 lg:block short:mt-5 short:pt-5"
            >
              <h2 className="mb-3 font-sans text-xl font-semibold text-foreground lg:text-2xl short:mb-2 lg:short:text-xl">
                Summary
              </h2>
              <p className="text-lg leading-relaxed text-foreground/80 sm:text-xl short:leading-normal">
                I&apos;m a software developer and music producer based in the
                Bay Area. I studied computer science at Cal Poly, where most of
                my free time went to arranging and producing for Take It SLO,
                then moved to Spain for a master&apos;s at Berklee Valencia
                focused on audio engineering and surround mixing. Now I&apos;m a
                software developer at Data Annotation, writing and reviewing
                coding problems that help train AI models, while getting my
                thesis plugin, SV2, ready for release on the side.
              </p>

              {/* Very short windows (<900px): highlights hidden so the pinned column fits above the footer */}
              <div className="tiny:hidden">
                <h2 className="mb-4 mt-8 font-sans text-xl font-semibold text-foreground lg:text-2xl short:mb-3 short:mt-5 lg:short:text-xl">
                  Highlights
                </h2>
                <ul className="space-y-5 border-l border-resume-blue/30 pl-5 short:space-y-3">
                  {highlights.map((h) => (
                    <li
                      key={h.title}
                      // short: dates in a narrow left column, title + detail beside it, to save height
                      className="relative short:grid short:grid-cols-[8.5rem_minmax(0,1fr)] short:gap-x-3"
                    >
                      <span className="absolute -left-[23.5px] top-1.5 h-2 w-2 rounded-full bg-resume-blue" />
                      <p className="text-xs font-medium uppercase tracking-[0.15em] text-resume-blue short:pt-1.5">
                        {h.dates}
                      </p>
                      <div>
                        <p className="mt-1 font-sans text-lg font-medium text-foreground short:mt-0">
                          {h.title}
                        </p>
                        <p className="mt-1 text-base leading-relaxed text-foreground/70 short:mt-0.5 short:leading-snug">
                          {h.detail}
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </motion.div>

          {/* Resume */}
          <motion.div
            {...slideIn}
            // lg+: bottom padding lives here (not on the section) so the grid, and with it
            // the sticky left column's range, extends to the bottom of the page
            className="flex w-full max-w-[720px] flex-1 flex-col lg:block lg:max-w-none lg:pb-24"
          >
            <div className="mb-3 flex items-center justify-between lg:mb-4">
              <p className="text-xs font-medium uppercase tracking-[0.2em] text-resume-blue">
                Preview
              </p>

              <div className="flex items-center gap-6">
                <a
                  href={withBasePath("/resume.pdf")}
                  download
                  className="hidden text-xs font-medium uppercase tracking-[0.15em] text-resume-blue transition-opacity hover:opacity-60 lg:short:inline"
                >
                  Download PDF
                </a>
                <a
                  href={withBasePath("/resume.pdf")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-medium uppercase tracking-[0.15em] text-muted-foreground transition-colors hover:text-resume-blue"
                >
                  Open PDF ↗
                </a>
              </div>
            </div>

            <ResumePreview />
          </motion.div>
        </div>
      </section>

    </div>
  );
}