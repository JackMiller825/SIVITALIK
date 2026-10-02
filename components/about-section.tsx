import { assets } from "@/lib/assets";
import { project } from "@/config/project";
import Image from "next/image";

export function AboutSection() {
  return (
    <section id="about" className="section-scroll bg-void py-20 sm:py-28">
      <div className="mx-auto grid max-w-[1160px] items-center gap-10 px-5 sm:px-8 lg:grid-cols-2 lg:gap-16">
        <div className="max-w-xl">
          <h2 className="font-display text-[clamp(3rem,7vw,5.5rem)] leading-[0.86] font-bold text-silver uppercase">
            About
          </h2>
          <p className="mt-6 text-base leading-relaxed text-mist sm:text-lg">
            Superintelligent Vitalik imagines an Ethereum-inspired character at the meeting point of human curiosity and machine intelligence. Its crystal crown, neural light, and connected worlds turn that idea into a shared visual identity.
          </p>
          <p className="mt-4 text-base leading-relaxed text-mist sm:text-lg">
            {project.DISPLAY_TICKER} is a meme project built around this fictional universe. The invitation is simple: explore the artwork, share your creativity, and help give the community its voice.
          </p>
        </div>
        <div className="overflow-hidden rounded-[28px] border border-white/10 bg-[#070b1c]">
          <div className="relative aspect-[4/3]">
            <Image
              src={assets.intelligence.src}
              alt="A luminous neural brain with a crystalline computing core, used as the portrait of the project’s imagined intelligence."
              width={assets.intelligence.width}
              height={assets.intelligence.height}
              sizes="(max-width: 1024px) 100vw, 560px"
              className="h-full w-full object-contain"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
