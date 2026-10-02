import { project } from "@/config/project";

const rows = [
  { label: "Name", value: project.PROJECT_NAME },
  { label: "Ticker", value: project.TOKEN_SYMBOL },
  { label: "Network", value: project.NETWORK },
];

export function TokenSection() {
  return (
    <section id="token" className="section-scroll bg-obsidian py-20 sm:py-28">
      <div className="mx-auto max-w-[980px] px-5 sm:px-8">
        <p className="font-mono text-[0.72rem] tracking-[0.22em] text-cyan uppercase">02 — Token</p>
        <h2 className="mt-3 font-display text-[clamp(2.6rem,6vw,4.8rem)] leading-[0.9] font-bold text-silver">
          Know the Token
        </h2>

        <dl className="mt-10 divide-y divide-white/10 overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03]">
          {rows.map((row) => (
            <div key={row.label} className="grid gap-1 px-5 py-4 sm:grid-cols-[minmax(0,220px)_minmax(0,1fr)] sm:gap-4 sm:px-7">
              <dt className="font-mono text-[0.72rem] tracking-[0.16em] text-mist uppercase">{row.label}</dt>
              <dd className="text-base break-words text-silver">{row.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
