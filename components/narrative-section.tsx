import { Motif } from "@/components/motifs";
import { Reveal } from "@/components/reveal";
import Image from "next/image";
import { cn } from "@/lib/utils";

const SYMBOLS = [
  {
    motif: "crown",
    title: "Neural crown",
    kicker: "Imagined superintelligence",
    body: "Branching light sits above the figure like a crown of thought. It pictures intelligence past familiar limits. The image is a metaphor, not a system the token runs.",
  },
  {
    motif: "mind",
    title: "Brain and processor",
    kicker: "Artificial intelligence",
    body: "A mind and a chip share one circuit. Artificial intelligence is the idea in the picture. It is not a claim that the token computes, learns, or answers.",
  },
  {
    motif: "crystal",
    title: "Ethereum crystal",
    kicker: "The Ethereum ecosystem",
    body: "The faceted stone uses Ethereum’s familiar geometry: something crystalline, shared, and passed between people. It marks the network the token is issued on.",
  },
  {
    motif: "globe",
    title: "Linked globe",
    kicker: "Decentralization",
    body: "Lines wrap a world. Decentralization is drawn as many points in contact. The picture does not assign anyone control over that world.",
  },
  {
    motif: "hands",
    title: "Human and robotic hands",
    kicker: "Collaboration",
    body: "One hand is human and the other is mechanical. They meet at a spark. The gesture is about people and machines sharing a moment, not a product feature.",
  },
  {
    motif: "city",
    title: "Future city",
    kicker: "Collective imagination",
    body: "Towers on the horizon, and the people watching them, stand for a future pictured together. The city is a story the community can extend.",
  },
] as const;

export function NarrativeSection() {
  return (
    <section id="narrative" className="section-scroll bg-void py-20 sm:py-28">
      <div className="mx-auto max-w-[1180px] px-5 sm:px-8">
        <p className="font-mono text-[0.72rem] tracking-[0.22em] text-cyan uppercase">02 — Narrative</p>
        <h2 className="mt-3 font-display text-[clamp(2.6rem,6vw,4.8rem)] leading-[0.9] font-bold text-silver">
          Narrative
        </h2>
        <p className="mt-4 max-w-2xl text-lg leading-relaxed text-mist">
          The banner is one picture. The notes below are artistic readings of its symbols. They are not statements of partnership, capability, or endorsement.
        </p>
      </div>

      <figure className="mx-auto mt-10 max-w-[1400px] px-0 sm:px-8">
        <div className="border-y border-white/15 bg-black/30 p-1 shadow-[0_0_80px_rgba(139,61,255,0.12)] sm:rounded-[28px] sm:border sm:p-2">
          <Image
            src="/brand/banner.webp"
            alt="Banner artwork for Superintelligent Vitalik. A portrait with a neural crown stands beside the title. Across the sky are a brain and processor, an Ethereum crystal, and a linked globe. Below, a human hand meets a robotic hand, with a future city and people on a hill."
            width={2000}
            height={667}
            sizes="100vw"
            className="h-auto w-full"
          />
        </div>
        <figcaption className="mx-auto mt-4 max-w-[1180px] px-5 text-sm text-mist sm:px-0">
          The banner, shown complete. Readings of its symbols follow.
        </figcaption>
      </figure>

      <div className="relative mx-auto mt-16 max-w-5xl px-5 sm:px-8">
        <div
          className="absolute top-2 bottom-2 left-[1.35rem] w-px bg-gradient-to-b from-transparent via-cyan/50 to-violet/40 lg:left-1/2"
          aria-hidden="true"
        />
        <ol className="relative">
          {SYMBOLS.map((symbol, index) => {
            const left = index % 2 === 0;
            return (
              <li key={symbol.title} className="relative py-6 lg:py-8">
                <span
                  className={cn(
                    "absolute top-10 size-3 -translate-x-1/2 rounded-full border border-cyan bg-void shadow-[0_0_12px_rgba(53,223,255,0.85)]",
                    "left-[1.35rem] lg:left-1/2",
                  )}
                  aria-hidden="true"
                />
                <Reveal
                  className={cn(
                    "pl-12 lg:w-[calc(50%-2.5rem)] lg:pl-0",
                    left ? "lg:pr-10" : "lg:ml-auto lg:pl-10",
                  )}
                  delay={0.05}
                >
                  <div className={cn("flex items-center gap-4", left ? "lg:flex-row-reverse" : "")}>
                    <Motif name={symbol.motif} />
                    <div className={cn(left ? "lg:text-right" : "")}>
                      <p className="font-mono text-[0.68rem] tracking-[0.18em] text-cyan uppercase">
                        0{index + 1} · {symbol.kicker}
                      </p>
                      <h3 className="mt-1 font-display text-3xl leading-none font-bold text-silver sm:text-4xl">
                        {symbol.title}
                      </h3>
                    </div>
                  </div>
                  <p className={cn("mt-4 max-w-md text-base leading-relaxed text-mist", left ? "lg:ml-auto lg:text-right" : "")}>
                    {symbol.body}
                  </p>
                </Reveal>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
