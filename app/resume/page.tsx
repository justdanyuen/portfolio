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

export default function ResumePage() {
  return (
    // overflow-x-clip stops the slide-in animation from widening the page
    <div className="relative overflow-x-clip">
      {/* Subtle neutral band, pinned to viewport, matching the About page band */}
      <div className="pointer-events-none fixed inset-x-0 top-0 -z-10 h-screen bg-gradient-to-b from-[#B5B1A8] from-0% to-transparent to-70% opacity-60" />

      {/* One column: title (left, like other pages), then skills, download link and
          the preview in a centered page-width column. Below lg the page is one
          screen tall and the preview fills the leftover space. */}
      <section className="flex min-h-svh w-full flex-col px-6 pb-24 pt-20 sm:px-10 lg:block lg:min-h-0 lg:px-16 lg:pb-24 lg:pt-36">
        <div className="flex flex-1 flex-col gap-6 lg:gap-10">
          <motion.div variants={container} initial="hidden" animate="show">
            <motion.h1
              variants={item}
              className="font-sans text-3xl font-bold text-foreground sm:text-4xl"
            >
              RESUME
            </motion.h1>

            <motion.div variants={item} className="mt-4 lg:mx-auto lg:mt-8 lg:max-w-[760px] lg:short:mt-5">
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

            <motion.div variants={item} className="mt-5 lg:mx-auto lg:mt-8 lg:max-w-[760px]">
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
            {...slideIn}
            // lg+: a page-sized card, centered with the skills/download column above
            className="flex w-full flex-1 flex-col lg:mx-auto lg:block lg:max-w-[760px]"
          >
            <div className="mb-3 flex items-center justify-between lg:mb-4">
              <p className="text-xs font-medium uppercase tracking-[0.2em] text-resume-blue">
                Preview
              </p>

              <div className="flex items-center gap-6">
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