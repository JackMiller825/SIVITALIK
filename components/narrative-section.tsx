import { assets } from "@/lib/assets";
import Image from "next/image";

const IDEAS = [
  {
    title: "The Mind",
    body: "The portrait and branching light picture imagined superintelligence. They are a metaphor, not a system the token runs.",
  },
  {
    title: "The Network",
    body: "Crystals, links, and a shared globe speak the visual language of Ethereum and decentralization. They do not assign control or a partnership.",
  },
  {
    title: "The Collective",
    body: "Human and mechanical hands meet at one spark. The image is about people and machines collaborating, not a product feature.",
  },
];

export function NarrativeSection() {
  return (
    <section id="narrative" className="section-scroll bg-void py-20 sm:py-28">
      <div className="mx-auto max-w-[1180px] px-5 sm:px-8">
        <p className="font-mono text-[0.72rem] tracking-[0.18em] text-cyan uppercase">Narrative</p>
        <h2 className="mt-3 font-display text-[clamp(2.6rem,6vw,4.8rem)] leading-[0.9] font-bold text-silver">
          One picture, three ideas
        </h2>
      </div>
      <figure className="mx-auto mt-8 max-w-[1400px] sm:px-8">
        <Image
          src={assets.banner.src}
          alt="Wide banner for Superintelligent Vitalik. A portrait stands beside the title. The sky holds a brain, an Ethereum crystal, and a linked globe. A human hand meets a robotic hand above a future city."
          width={assets.banner.width}
          height={assets.banner.height}
          sizes="(max-width: 1400px) 100vw, 1400px"
          loading="lazy"
          className="h-auto w-full"
        />
      </figure>
      <ol className="mx-auto mt-10 grid max-w-[1180px] gap-4 px-5 sm:px-8 lg:grid-cols-3">
        {IDEAS.map((idea) => (
          <li key={idea.title} className="rounded-3xl border border-white/10 bg-white/[0.03] p-6">
            <h3 className="font-display text-3xl leading-none font-bold text-silver">{idea.title}</h3>
            <p className="mt-3 text-base leading-relaxed text-mist">{idea.body}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}
