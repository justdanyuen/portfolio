import Image from "next/image";
import profilePic from "../public/images/profile.webp";
import HeroText from "@/components/HeroText";

// Olive at a given opacity, for building smooth multi-stop gradients
const olive = (alpha: number) =>
  `color-mix(in srgb, var(--color-olive) ${alpha}%, transparent)`;

// Eased scrim: solid olive behind the nav/heading, easing out through the text,
// clear over the face, then easing back into olive under the footer
const mobileScrim = `linear-gradient(to bottom,
  ${olive(100)} 0%, ${olive(100)} 26%, ${olive(85)} 32%, ${olive(62)} 37%,
  ${olive(38)} 42%, ${olive(18)} 47%, ${olive(6)} 51%, ${olive(0)} 55%)`;

export default function Home() {
  return (
    <section className="relative min-h-svh flex-1 overflow-hidden bg-olive px-6 pt-20 sm:min-h-0 sm:px-10 sm:pt-0 lg:px-16">
      {/* Portrait (mobile) -- full-bleed background behind the hero text */}
      <div className="absolute inset-0 sm:hidden">
        <div className="absolute inset-x-0 bottom-0 top-[25svh]">
          <Image
            src={profilePic}
            alt="Justin Yuen"
            fill
            priority
            className="object-cover object-[center_40%]"
          />
        </div>
        <div className="absolute inset-0" style={{ background: mobileScrim }} />
      </div>

      <div className="mx-auto flex w-full max-w-7xl items-center sm:min-h-[75vh]">
        {/* Text */}
        <HeroText />

        {/* Portrait (desktop) */}
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
    </section>
  );
}