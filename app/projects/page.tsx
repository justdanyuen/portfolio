import * as motion from "motion/react-client";
import { FaGithub } from "react-icons/fa";
import { withBasePath } from "@/lib/basePath";
import { container, item } from "@/lib/motion";
import Screenshots from "./Screenshots";

// Server component: the write-up is rendered to static HTML at build time.
// Only the screenshot grid + lightbox (Screenshots) runs as client code.

const tech = [
  { name: "C++", url: "https://www.geeksforgeeks.org/cpp/c-plus-plus/" },
  { name: "JUCE", url: "https://juce.com/" },
  {
    name: "VST3",
    url: "https://steinbergmedia.github.io/vst3_dev_portal/pages/Technical+Documentation/API+Documentation/Index.html",
  },
  {
    name: "AU",
    url: "https://developer.apple.com/documentation/audiotoolbox/audio-unit-v3-plug-ins",
  },
  { name: "AAX", url: "https://developer.avid.com/aax/" },
];

const projectImages = [
  {
    src: "/images/SV2/surroundfield.webp",
    alt: "SV2 surround field visualization",
    caption:
      "The spatial visualization window displays the placement and relative level of vocal groups throughout a 5.1 surround field.",
  },
  {
    src: "/images/SV2/frequency_spectrum.webp",
    alt: "SV2 frequency spectrum visualization",
    caption:
      "Real-time frequency analysis provides visual feedback for identifying spectral overlap and masking between vocal groups.",
  },
  {
    src: "/images/SV2/solo_elements.webp",
    alt: "SV2 solo elements view",
    caption:
      "Individual vocal elements can be isolated to examine their spatial position, level, and spectral characteristics in greater detail.",
  },
  {
    src: "/images/SV2/routing.webp",
    alt: "SV2 routing setup",
    caption:
      "SV2 is inserted across grouped vocal buses inside the DAW, allowing each section of the arrangement to be monitored independently.",
  },
];

// Shared body-paragraph style: smaller on mobile, original text-xl from sm up
const bodyText =
  "mt-3 max-w-3xl text-lg leading-relaxed text-foreground/80 sm:text-xl";

export default function ProjectsPage() {
  return (
    <div className="relative">
      {/* Subtle neutral band, pinned to viewport, matching the About page band */}
      <div className="pointer-events-none fixed inset-x-0 top-0 -z-10 h-screen bg-gradient-to-b from-[#B5B1A8] from-0% to-transparent to-70% opacity-60" />

      <motion.section
        variants={container}
        initial="hidden"
        animate="show"
        className="w-full px-6 pb-24 pt-20 sm:px-10 lg:px-16 lg:pt-36"
      >
        <motion.h1
          variants={item}
          className="font-sans text-3xl font-bold text-foreground sm:text-4xl"
        >
          PROJECTS
        </motion.h1>

        {/* Featured project */}
        <motion.div
          variants={item}
          className="mt-6 w-full lg:mt-12"
        >
          <div className="mb-3 flex items-center gap-3 lg:mb-4">
            {/* Main dot — static */}
            <span className="h-2 w-2 shrink-0 rounded-full bg-purple" />

            {/* flex-wrap + nowrap phrases: if it wraps on narrow screens,
                it breaks cleanly between the two phrases, never mid-phrase */}
            <p className="flex flex-wrap items-center text-xs font-medium uppercase tracking-[0.15em] text-purple sm:tracking-[0.2em]">
              <span className="whitespace-nowrap">Master&apos;s Thesis Project</span>

              {/* Flashing separator dot */}
              <motion.span
                className="mx-2 inline-block text-xl leading-none"
                animate={{
                  opacity: [1, 0.15, 1],
                  scale: [1, 1.5, 1],
                }}
                transition={{
                  duration: 1.4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                •
              </motion.span>

              <span className="whitespace-nowrap">Active Development</span>
            </p>
          </div>

          <h2 className="font-sans text-2xl font-semibold text-foreground">
            Surround Vocal Spectrum Visualizer - SV2
          </h2>

          <p className="mt-3 text-base italic leading-relaxed text-foreground/70 sm:text-xl">                     
            A real-time audio visualizer plugin built in{" "}
            <strong className="font-semibold text-foreground/90">
              C++ with the JUCE framework
            </strong>
            , designed for use directly inside DAW applications including Logic Pro X,
            Pro Tools, Cubase, and Reaper. Exported via VST3, AU, and AAX formats.
          </p>

          {/* Tech tags */}
          <div className="mt-4 flex flex-wrap gap-2">
            {tech.map((t) => (
              <a
                key={t.name}
                href={t.url}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-md bg-purple px-3 py-1 text-xs font-medium text-white transition-opacity hover:opacity-75"
              >
                {t.name}
              </a>
            ))}
          </div>

          {/* Desktop: writeup on the left, screenshots pinned alongside it on the right */}
          <div className="lg:grid lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)] lg:items-start lg:gap-12 xl:gap-16">
            <div>
              {/* <h3 className="mt-10 text-lg font-semibold uppercase tracking-[0.2em] text-purple">
                Motivation
              </h3> */}

              <p className={`${bodyText} mt-5`}>
                Stemming from my passion for <strong>a cappella</strong> — the composition of music
                centered around the human voice without external instruments,
                particularly in choir and collegiate groups — I wanted to create a
                new way to understand what is happening within a vocal mix. Various
                details of a group&apos;s performance - overall member composition and
                voice characteristics, dynamics, blend, and timbre - can blur the
                ability to discern individual elements during the mixing process.
                I wanted to create a plugin that would provide visual feedback of the
                placement and balance of vocal elements in a mix, allowing users to
                better decide of stylistic choices and make adjustments to the mix.
              </p>

              <h3 className="mt-8 text-base font-semibold uppercase tracking-[0.2em] text-purple sm:text-lg lg:mt-10">
                Development
              </h3>
              <p className={bodyText}>
                Through my education at Berklee Valencia, I developed foundational knowledge
                in signal flow, audio processing, and surround sound mixing in Dolby
                Atmos, which gave me the inspiration to create a plugin that
                visualizes the spatial distribution of elements in a mix. Leveraging
                my experience in software development from my undergraduate studies,
                I developed a plugin that provides real-time visual feedback of the
                frequency spectrum and spatial positioning of vocal elements,
                allowing users to see how their mix is distributed across the surround field.
              </p>

              <p className={bodyText}>
                The plugin uses different information parameters for the separate
                window monitoring to depict locational information in the surround
                space relative to the listener and the frequency spectrum of the
                audio signal. For the <strong>spatial visualization</strong>, the plugin uses
                the relative signal level of each channel to determine the relative
                volume coming out of each speaker in the source, which culminates
                in a visual diagram similar to the polar pattern of a microphone,
                where the center of the diagram represents the listener and the
                speaker sources are points around the listener accompanied with their
                respective labels - Left, Right, Center, Left Surround, Right Surround,
                and a dedicated LFE meter for each channel toward the bottom of the
                plugin window close to the buttons. Given that lower frequency sends
                are not typically used in a majority of the vocal mix, the LFE is
                mainly used in the Bass vocal group.
              </p>

              <p className={bodyText}>
                For the <strong>frequency spectrum visualization</strong>, the plugin
                uses a Fast Fourier Transform (FFT) to analyze the audio signal and
                display the frequency content of the signal in real-time. The plugin
                displays a frequency spectrum graph that shows the amplitude of the
                audio signal across different frequencies, allowing users to see how
                the vocal elements are distributed across the frequency spectrum.
                While the spatial diagram is for monitoring the placement of vocal
                elements in the surround field via panning, the frequency spectrum
                is for monitoring the timbre of different groups to aid in identifying
                spectral overlap and masking between groups, which can be a common
                issue in a cappella arrangements for clarity.
              </p>

              <p className={bodyText}>
                Aside from the core default functionality of the plugin, I also implemented
                a few additional features to enhance the user experience. Both windows of
                the plugin include a <strong>solo</strong> feature that allows users to
                isolate specific vocal groups for more detailed analysis. It also includes
                an overall input toggle to turn off specific signals from the mix, effectively
                working as a mute button for a designated channel. These features allow the
                user to focus on specific elements of the mix and make more informed decisions,
                as well as the overall context of the mix via panning choices and balance of the mix.
              </p>

              {/* Thesis paper */}
              <a
                href={withBasePath("/SV2ThesisPaper.pdf")}
                target="_blank"
                rel="noopener noreferrer"
                className="group mt-10 flex max-w-3xl items-center justify-between gap-4 border-t border-purple/30 py-5 transition-opacity hover:opacity-60 lg:mt-14"
              >
                <div>
                  <p className="text-sm uppercase tracking-[0.2em] text-purple sm:text-lg">
                    Thesis Documentation
                  </p>
                  <p className="mt-1 font-sans text-base font-medium sm:text-lg">
                    Surround Vocal Spectrum Visualizer — Master&apos;s Thesis
                  </p>
                </div>

                <span className="shrink-0 text-2xl transition-transform duration-200 group-hover:translate-x-1">
                  ↗
                </span>
              </a>

              <p className="mt-3 max-w-3xl text-base italic leading-relaxed text-foreground/80">
                Official downloads for AAX, VST3, and AU are not yet available
                as I continue to refine the UI and feature set ahead of the project&apos;s
                official release. In the meantime, feel free to explore the GitHub
                repository for a closer look at the project&apos;s architecture, implementation,
                and ongoing development.
              </p>

              <a
                href="https://github.com/justdanyuen/SV2"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-5 inline-flex items-center gap-2 border-b border-purple pb-1 text-sm font-medium transition-opacity hover:opacity-60"
              >
                <FaGithub className="text-lg" />
                View Source on GitHub ↗
              </a>
            </div>

            {/* Project images */}
            <Screenshots photos={projectImages} />
          </div>

          {/* Videos: stacked on mobile, side by side on desktop */}
          <div className="mt-8 grid grid-cols-1 gap-8 lg:mt-16 lg:grid-cols-2 lg:gap-12 xl:gap-16">
            {/* Project pitch */}
            <div>
              <p className="mb-3 text-xs font-medium uppercase tracking-[0.2em] text-purple">
                Project Pitch
              </p>

              <video
                controls
                preload="metadata"
                className="aspect-video w-full rounded-xl object-cover"
              >
                <source
                  src={withBasePath("/videos/SV2_pitch_web.mp4")}
                  type="video/mp4"
                />
                Your browser does not support the video tag.
              </video>
            </div>

            {/* Demo reel */}
            <div>
              <p className="mb-3 text-xs font-medium uppercase tracking-[0.2em] text-purple">
                Demo Reel
              </p>

              <div className="aspect-video w-full overflow-hidden rounded-xl">
                <iframe
                  className="h-full w-full"
                  src="https://www.youtube.com/embed/p0LQWIascj0"
                  title="SV2 Demo Reel"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />
              </div>
            </div>
          </div>
        </motion.div>
      </motion.section>
    </div>
  );
}