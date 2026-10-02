import { project } from "@/config/project";

const STEPS = [
  {
    title: "The Portrait",
    body: "The crystal crown, neural light, and connected worlds are the face of the project. That artwork is the identity on this page.",
  },
  {
    title: "The Circle",
    body: `Art and conversation gather around ${project.DISPLAY_TICKER}. The community gives the character a voice.`,
  },
  {
    title: "The Swap",
    body: "Ethereum trading is announced on this page when a venue is confirmed. Until then, the buy button stays a launch-details link.",
  },
];

export function RoadmapSection() {
  return (
    <section id="roadmap" className="section-scroll bg-obsidian py-20 sm:py-28">
      <div className="mx-auto max-w-[1160px] px-5 sm:px-8">
        <h2 className="font-display text-[clamp(3rem,7vw,5.5rem)] leading-[0.86] font-bold text-silver uppercase">
          Roadmap
        </h2>
        <p className="mt-4 max-w-xl text-lg leading-relaxed text-mist">
          Three chapters for the character, the people around it, and the market.
        </p>
        <ol className="mt-10 grid gap-4 lg:grid-cols-3">
          {STEPS.map((step, index) => (
            <li key={step.title} className="rounded-[28px] border border-white/10 bg-[#070b1c] p-6">
              <p className="font-mono text-sm text-cyan">0{index + 1}</p>
              <h3 className="mt-3 font-display text-3xl leading-none font-bold text-silver">{step.title}</h3>
              <p className="mt-3 text-base leading-relaxed text-mist">{step.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
