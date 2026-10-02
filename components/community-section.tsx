import { assets } from "@/lib/assets";
import { channels } from "@/lib/project";
import { project } from "@/config/project";
import Image from "next/image";

export function CommunitySection() {
  const links = channels();

  return (
    <section id="community" className="section-scroll relative bg-[#050818] py-20 sm:py-28">
      <div className="mx-auto grid max-w-[1100px] items-center gap-10 px-5 sm:px-8 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1fr)]">
        <div className="overflow-hidden rounded-[28px] border border-white/10 bg-[#070b1c]">
          <div className="relative aspect-[4/3]">
            <Image
              src={assets.community.src}
              alt="A connected globe circled by abstract figures, shown beside the community invitation."
              width={assets.community.width}
              height={assets.community.height}
              sizes="(max-width: 1024px) 100vw, 420px"
              loading="lazy"
              className="h-full w-full object-contain"
            />
          </div>
        </div>
        <div>
          <p className="font-mono text-[0.72rem] tracking-[0.18em] text-cyan uppercase">Community</p>
          <h2 className="mt-3 font-display text-[clamp(2.6rem,6vw,4.8rem)] leading-[0.9] font-bold text-silver">
            Join the Constellation
          </h2>
          <p className="mt-4 max-w-xl text-lg leading-relaxed text-mist">
            Explore the narrative. Share your ideas. Help shape the community around {project.DISPLAY_TICKER}.
          </p>
          {links.length > 0 ? (
            <ul className="mt-8 grid gap-3 sm:grid-cols-2">
              {links.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="focus-ring group flex min-h-16 items-center justify-between rounded-2xl border border-white/15 bg-white/[0.04] px-5 py-4 transition duration-200 hover:border-cyan/60 hover:bg-cyan/10"
                  >
                    <span className="font-display text-3xl leading-none text-silver">{link.label}</span>
                    <span className="font-mono text-[0.68rem] tracking-[0.16em] text-mist uppercase group-hover:text-cyan">
                      Open
                    </span>
                    <span className="sr-only"> (opens in a new tab)</span>
                  </a>
                </li>
              ))}
            </ul>
          ) : null}
        </div>
      </div>
    </section>
  );
}
