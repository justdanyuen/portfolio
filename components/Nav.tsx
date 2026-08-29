import Link from "next/link";
import Image from "next/image";

export default function Nav() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between p-6">
      <Link
        href="/"
        className="ml-7 scale-[1.6] transition-transform duration-200 hover:scale-[1.75]"
      >
        <Image
          src="/images/icons/ink/favicon-512.png"
          alt="Justin Yuen"
          width={50}
          height={50}
          priority
        />
      </Link>
      <div className="text-2xl flex items-center gap-6 font-medium">
        <Link className="transition-all duration-200 hover:scale-110 hover:opacity-60"href="/">ABOUT</Link>
        <Link className="transition-all duration-200 hover:scale-110 hover:opacity-60"href="/projects">PROJECTS</Link>
        <Link className="transition-all duration-200 hover:scale-110 hover:opacity-60"href="/education">EDUCATION</Link>
        <Link className="transition-all duration-200 hover:scale-110 hover:opacity-60"href="/resume">RESUME</Link>
      </div>
    </nav>
  );
}