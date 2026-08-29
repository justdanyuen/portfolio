import { FaLinkedin, FaGithub, FaInstagram } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="fixed bottom-0 left-0 right-0 z-40 flex items-center justify-between border-t border-black/20 px-6 py-4 sm:px-10 lg:px-16">
      <a
        href="mailto:jdyuen03@gmail.com"
        className="text-3xl uppercase tracking-[0.2em] hover:opacity-60 transition-opacity"
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
    </footer>
  );
}
