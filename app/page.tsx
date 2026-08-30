import Image from "next/image";
import profilePic from "../public/images/profile.jpg";
import HeroText from "@/components/HeroText";

export default function Home() {
  return (
    <section className="relative flex-1 overflow-hidden bg-olive px-6 sm:px-10 lg:px-16">
      <div className="mx-auto flex min-h-[75vh] max-w-7xl items-center">
        {/* Text */}
        <HeroText />

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
          <div className="absolute inset-0 bg-gradient-to-r from-olive via-olive/20 to-transparent" />
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
    </section>
  );
}