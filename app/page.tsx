import Image from "next/image";
import profilePic from "../public/images/profile.jpg";
import {FaLinkedin, FaGithub, FaInstagram} from "react-icons/fa";

export default function Home() {
  return (
    <section className="relative flex-1 overflow-hidden px-6 sm:px-10 lg:px-16">
      <div className="mx-auto flex min-h-[75vh] max-w-7xl items-center">
        {/* Text */}
        <div className="relative z-10 max-w-3xl">
          <p className="font-handwriting mb-4 text-2xl uppercase tracking-[0.3em]">
            Audio • Software • Music
          </p>

          <h1 className="font-handwriting text-6xl leading-none sm:text-7xl lg:text-8xl">
            Hi, I&apos;m Justin 
          </h1>

          <p className="font-handwriting mt-6 max-w-3xl text-[27px] leading-relaxed">
            Software engineer exploring immersive audio technology,{" "}
            <span className="whitespace-nowrap">plugin development</span>, and creative
            tools for music production.
          </p>

          <div className="mt-8 flex flex-wrap gap-6 text-sm uppercase tracking-[0.2em]">
            <a
              href="/projects"
              className="font-handwriting text-xl border-b border-current pb-1 transition-opacity hover:opacity-60"
            >
              View Projects
            </a>

            <a
              href="/about"
              className="font-handwriting text-xl border-b border-current pb-1 transition-opacity hover:opacity-60"
            >
              
              About Me
            </a>
          </div>
        </div>

        {/* Portrait */}
        <div className="absolute bottom-0 right-0 top-0 hidden w-[70%] sm:block">
          <Image
            src={profilePic}
            alt="Justin Yuen"
            fill
            priority
            className="object-cover object-center"
          />

          {/* Soft overlay so text/image blend together */}
          <div className="absolute inset-0 bg-gradient-to-r from-[var(--background)] via-[var(--background)]/20 to-transparent" />
        </div>
      </div>

      {/* Mobile image */}
      <div className="relative mt-10 aspect-[4/5] overflow-hidden rounded-2xl sm:hidden">
        <Image
          src={profilePic}
          alt="Justin Yuen"
          fill
          priority
          className="object-cover object-center"
        />
      </div>
      <div className="absolute bottom-0 left-0 right-0 z-20 flex items-center justify-between border-t border-black/20 px-6 py-4 sm:px-10 lg:px-16">
        <a
            href="mailto:jdyuen03@gmail.com"
            className="font-handwriting text-3xl uppercase tracking-[0.2em] hover:opacity-60 transition-opacity"
          >
            Connect
        </a>

        <div className="flex gap-6 text-sm">
          <a
            href="https://www.linkedin.com/in/justdanyuen"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="text-4xl transition-all duration-200 hover:scale-110 hover:opacity-60"
          >
            <FaLinkedin />
          </a>

          <a
            href="https://github.com/justdanyuen"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="text-4xl transition-all duration-200 hover:scale-110 hover:opacity-60"
          >
            <FaGithub />
          </a>

          <a
            href="https://instagram.com/justdanyuen"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            className="text-4xl transition-all duration-200 hover:scale-110 hover:opacity-60"
          >
            <FaInstagram />
          </a>
        </div>
      </div>
    </section>
  );
}