import Image from "next/image";
import Link from "next/link";
import * as motion from "motion/react-client";
import AccentBlock from "@/components/AccentBlock";
import { thumbPath } from "@/lib/basePath";
import { container, item, slideIn } from "@/lib/motion";
import ColorBand from "./ColorBand";
import PhotoStrip from "./PhotoStrip";

// Server component: all text and layout is rendered to static HTML at build time.
// Interactive pieces are small client components: ColorBand (scroll-linked
// background) and PhotoStrip (gallery tiles + lightbox).

const background = [
  {
    title: "California Polytechnic State University, San Luis Obispo",
    subtitle: "B.S. Computer Science & Minor in Music | September 2021 - June 2025",
    accent: "#4A7C4E",
    anchor: "#cal-poly",
  },
  {
    title: "Berklee College of Music",
    subtitle: " M.M. Music Production, Technology, and Innovation | August 2025 - July 2026",
    accent: "#B23B3B",
    anchor: "#berklee",
  },
  {
    title: "What I'm working on now",
    subtitle: "",
    accent: "#4C6F8C",
    anchor: "#work",
  },

];


const calpolyGallery = [
  {
    src: "/images/cal-poly/grad-headshot.webp",
    alt: "Cal Poly graduation headshot",
    caption: "B.S. in Computer Science, Minor in Music from Cal Poly, San Luis Obispo, California",
    width: 3367,
    height: 5051,
  },
  {
    src: "/images/cal-poly/morro-rock.webp",
    alt: "Morro Rock",
    caption: "One of my favorite film photos I took located in Morro Bay, California. A popular landmark along the central coast.",
    width: 3130,
    height: 2075,
  },
  {
    src: "/images/cal-poly/salud.webp",
    alt: "Salud",
    caption: "Celebrations sponsored by Modelo :)",
    width: 5058,
    height: 3372,
  },
  {
    src: "/images/cal-poly/throw.webp",
    alt: "Throw",
    caption: "Upwards and onwards!",
    width: 3456,
    height: 5184,
  },
  {
    src: "/images/cal-poly/valencia-apartment.webp", // fixed filename to match disk
    alt: "Valencia apartments",
    caption: "Precursors to the year of a lifetime!",
    width: 5184,
    height: 3456,
  },
];

const berkleeGallery = [
  {
    src: "/images/berklee/family.webp",
    alt: "Berklee graduation",
    caption: "Greetings from Valencia, Spain",
    width: 2304,
    height: 1536,
  },
  {
    src: "/images/berklee/city-of-arts.webp",
    alt: "City of Arts and Sciences",
    caption: "The City of Arts and Sciences, a cultural and architectural complex in Valencia, Spain. This is where the Berklee Valencia campus is located!",
    width: 1024,
    height: 683,
  },
  {
    src: "/images/berklee/pro-tools.webp",
    alt: "Working in Pro Tools",
    width: 3635,
    height: 2433,
    caption: (
      <>
        Developing SV2 surround audio-visualizer plugin via C++/JUCE and Pro Tools.
        See the{" "}
        <Link
          href="/projects"
          className="underline underline-offset-2 hover:opacity-70 transition-opacity"
        >
          Projects
        </Link>{" "}
        tab for more details.
      </>
    ),
  },
  {
    src: "/images/berklee/paella.webp",
    alt: "Homemade paella",
    caption: "Homemade paella with chicken, rabbit, and garrofó beans - after all, Valencia is the birth-place of the beloved spanish dish!",
    width: 3024,
    height: 4032,
  },
  {
    src: "/images/berklee/acappella.webp",
    alt: "A cappella group",
    caption: "Post-performance pic with Viva Voce, acappella group at Berklee Valencia I founded in 2025.",
    width: 3635,
    height: 2435,
  },
  {
    src: "/images/berklee/ceremony.webp",
    alt: "Official ceremony pic",
    caption: "Master's in Music Production, Technology, and Innovation",
    width: 1965,
    height: 2953,
  },
  {
    src: "/images/berklee/mpti.webp",
    alt: "MPTI event",
    caption: "Berklee Valencia MPTI Class of '26",
    width: 2953,
    height: 1969,
  },
  {
    src: "/images/berklee/friends.webp",
    alt: "Friends at Berklee",
    caption: "End of year paella party to celebrate a year of connection and creation with life-long friends",
    width: 3635,
    height: 2433,
  },
];

export default function AboutPage() {
  return (
    <div className="relative">
      {/* Scroll-linked color band, pinned to viewport, tracks real section positions */}
      <ColorBand />

      <section className="w-full px-6 pb-20 pt-20 sm:px-10 lg:px-16 lg:pb-32 lg:pt-36">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1.3fr_1fr] lg:items-start">
          <motion.div variants={container} initial="hidden" animate="show">
            <motion.h1
              variants={item}
              className="font-sans text-3xl font-bold text-foreground sm:text-4xl"
            >
              ABOUT
            </motion.h1>

            <motion.p
              variants={item}
              className="mt-5 max-w-2xl text-lg sm:text-xl lg:mt-8 lg:text-2xl leading-relaxed text-foreground/80"
            >
              Hello and welcome to my page—thanks for stopping by!

            </motion.p>

            <motion.p
              variants={item}
              className="mt-5 max-w-2xl text-lg sm:text-xl lg:mt-8 lg:text-2xl leading-relaxed text-foreground/80"
            >
              My interest in sound began at a young age when I fell in love with 
              singing. That curiosity grew during my time in collegiate a cappella, 
              where I became fascinated with microphones, live sound, and the 
              technology behind a performance and capturing the moment.
              Eventually, that interest led me into the recording studio and 
              continues to shape how I approach building software today—thinking 
              about signal, latency, and the small details that make audio tools feel 
              right to use.
            </motion.p>

            <motion.p
              variants={item}
              className="mt-4 max-w-2xl text-lg sm:text-xl lg:text-2xl leading-relaxed text-foreground/80"
            >
              Outside of my interests in software development and music production,
              I enjoy running, creating vocal arrangements of songs for different 
              groups, and exploring new foods. I'm always looking for any recommendations
              for some good bites!
            </motion.p>

            {/* Background + Currently listening, stacked in the left column beside the photo */}
            <motion.div variants={item} className="mt-10 lg:mt-14">
              <h2 className="mb-4 font-sans text-2xl font-semibold text-foreground">
                Background
              </h2>
              <div>
                {background.map((entry) => (
                  <a
                    key={entry.title}
                    href={entry.anchor}
                    className="block transition-opacity hover:opacity-70"
                  >
                    <AccentBlock
                      color={entry.accent}
                      title={entry.title}
                      subtitle={entry.subtitle}
                    />
                  </a>
                ))}
              </div>
            </motion.div>

            <motion.div variants={item} className="mt-10 lg:mt-12">
              <h2 className="font-sans text-2xl font-semibold text-foreground">
                Currently listening
              </h2>

              <p className="mt-3 max-w-2xl text-lg sm:text-xl leading-relaxed text-foreground/80">
                A collection of songs I've been listening to, check out
                some of tunes that have been inspiring me recently :)
              </p>

              <a
                href="https://open.spotify.com/playlist/2h6NmrVarPILPwIyfVE1GR?si=f15ed16774b9472e"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-5 inline-flex items-center gap-2 text-lg font-medium text-foreground underline decoration-2 underline-offset-4 transition-opacity hover:opacity-60"
              >
                Listen on Spotify
                <span aria-hidden="true">↗</span>
              </a>
            </motion.div>
          </motion.div>

          <motion.div {...slideIn} className="hidden flex-col gap-4 lg:flex">
            <div className="relative aspect-[3/4] w-full overflow-hidden">
              <Image
                src={thumbPath("/images/studio.webp")}
                alt="Studio"
                fill
                priority
                sizes="(min-width: 1024px) 40vw, 100vw"
                className="object-cover object-center"
              />
            </div>
          </motion.div>
        </div>

        {/* Cal Poly text */}
        <div id="cal-poly" className="mt-16 scroll-mt-24 lg:mt-24 lg:scroll-mt-36">
          <h2 className="mb-4 font-sans text-2xl sm:text-3xl lg:text-4xl font-semibold text-foreground">
            Cal Poly San Luis Obispo
          </h2>
          {/* <h3 className="mb-4 font-sans text-lg font-semibold text-foreground">
            San Luis Obispo, California
          </h3> */}
          <div className="lg:mt-8">
          <p className="mt-5 text-lg sm:text-xl lg:mt-0 lg:mb-8 lg:last:mb-0 lg:text-2xl leading-relaxed text-foreground/80">
            Growing up in a time when technology was becoming increasingly 
            woven into everyday life, I was drawn to understanding how complex 
            systems work and how they can be built to solve real problems. 
            At Cal Poly, I had the opportunity to explore computer science 
            from several different angles, from data structures and algorithms 
            and their role in building efficient, scalable software, to computer 
            architecture and RISC-V assembly, where I learned how software interacts 
            with hardware at a lower level.
          </p>

          <p className="mt-5 text-lg sm:text-xl lg:mt-0 lg:mb-8 lg:last:mb-0 lg:text-2xl leading-relaxed text-foreground/80">
            Some of my favorite courses focused on database systems and 
            design. In one class, my team used SQL and Python to build a 
            responsive shop system that managed inventory, changing weekly 
            product demand, and customer interactions. I especially enjoyed
            thinking through how information should be structured, stored, 
            and retrieved efficiently.
          
          </p>

          <p className="mt-5 text-lg sm:text-xl lg:mt-0 lg:mb-8 lg:last:mb-0 lg:text-2xl leading-relaxed text-foreground/80">
            A large part of my college experience was spent with my time
            in Take It SLO, Cal Poly's premier acappella group. Coming into
            college, I was a huge fan of the acappella scene popularized by
            groups like Pentatonix and movies like Pitch Perfect. However,
            it was super daunting as a freshman with no prior group singing
            experience to audition for a group that had been around for decades.
            It turned out to be one of the best decisions I made in college,
            as I met some of my closest lifelong friends, learned how to 
            arrange and produce music, and performed across the central coast
            and Los Angeles at various events throughout the years.
          </p>
          </div>
        </div>
      </section>

      {/* Cal Poly gallery */}
      <div className="-mt-12 px-6 sm:px-10 lg:px-16">
        <PhotoStrip photos={calpolyGallery} />
      </div>

      {/* Photo Carousel Cal Poly */}
      {/* <div className="-mt-12 px-6 sm:px-10 lg:px-16">
        <PhotoCarousel photos={calpolyGallery} />
      </div> */}

      <section className="mt-12 w-full px-6 pb-20 pt-8 sm:px-10 lg:mt-24 lg:px-16 lg:pb-32 lg:pt-16">
        {/* Berklee text */}
        <div id="berklee" className="scroll-mt-24 lg:scroll-mt-36">
          <h2 className="mb-4 font-sans text-2xl sm:text-3xl lg:text-4xl font-semibold text-foreground">
              Berklee Valencia - Berklee College of Music 
          </h2>
          {/* <h3 className="mb-4 font-sans text-lg font-semibold text-foreground">
            Valencia, Spain 
          </h3> */}
          <div className="lg:mt-8">
          <p className="mt-5 text-lg sm:text-xl lg:mt-0 lg:mb-8 lg:last:mb-0 lg:text-2xl leading-relaxed text-foreground/80">
            In August 2025, I moved across the world from Northern California to Valencia,
            Spain to pursue a master's degree in Music Production, Technology, and Innovation. 
            I spent a year at Berklee College of Music's Valencia study abroad campus, 
            where I learned advanced concepts in audio engineering, surround sound mixing,
            signal flow, music production, and software development for audio applications. 
            What began as a year of uncertainty and exploration turned into a life-changing
            experience where I met lifelong friends, collaborated on music and software 
            projects with artists and developers from around the world, and gained a deeper 
            understanding of how technology in the modern world has predominant influence
            on the way we create and consume audio.
          </p>
          </div>
        </div>
      </section>

      {/* Berklee gallery */}
      <div className="-mt-12 px-6 sm:px-10 lg:px-16">
        <PhotoStrip photos={berkleeGallery} arrows />
      </div>

      {/* Photo Carousel Berklee */}
      {/* <div className="-mt-12 px-6 sm:px-10 lg:px-16">
        <PhotoCarousel photos={berkleeGallery} />
      </div> */}

      <section className="mt-12 w-full px-6 pb-24 pt-8 sm:px-10 lg:mt-24 lg:px-16 lg:pb-32 lg:pt-16">
        <div
          id="work"
          className="scroll-mt-24 lg:scroll-mt-36"
        >
          <h2 className="mb-4 font-sans text-2xl sm:text-3xl lg:text-4xl font-semibold text-foreground">
            What I&apos;m working on now
          </h2>

          <h3 className="mb-4 font-sans text-lg font-semibold text-foreground">
            San Francisco Bay Area, California
          </h3>

          <div className="lg:mt-8">
          <p className="mt-5 text-lg sm:text-xl lg:mt-0 lg:mb-8 lg:last:mb-0 lg:text-2xl leading-relaxed text-foreground/80">
            Since completing my Master's and moving back from Spain, I've
            started working as a software developer with Data Annotation,
            where I write and review coding problems in Python, JavaScript,
            and C++ that are used to evaluate and train AI models. 
            Additionally I&apos;ve been working on a few different projects, including refinement
            of my thesis project in anticipation for release, mixing and 
            production for various artists, and exploring new ideas for 
            software development in the audio scene. I've recently joined 
            membership under the Audio Engineering Society, and look forward
            to connecting with other audio professionals and enthusiasts in 
            the field. On the side, I love creating vocal-arrangements in my 
            free time and keeping in-touch with my creative side. Feel free to
            reach out to me if you'd like to chat about audio or software,
            I'd love to connect!
          </p>
          </div>
        </div>
      </section>

    </div>
  );
}