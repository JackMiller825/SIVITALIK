import { CopyAddress } from "@/components/copy-address";
import { project } from "@/config/project";
import { assets } from "@/lib/assets";
import { groupInteger } from "@/lib/amount";
import { allocationSummary, chartHref, explorerHref, taxLabel } from "@/lib/project";
import Image from "next/image";

const SEGMENT_COLORS = ["#8B3DFF", "#35DFFF", "#EAF0FF", "#6d7cff", "#c084fc"];

function Fact({ label, value, note }: { label: string; value: string; note?: string | null }) {
  return (
    <div className="border-b border-white/10 py-3 last:border-b-0">
      <dt className="text-sm text-mist">{label}</dt>
      <dd className="mt-1 text-lg text-silver">{value}</dd>
      {note ? <p className="mt-1 text-sm leading-relaxed text-mist">{note}</p> : null}
    </div>
  );
}

export function TokenSection() {
  const supply = project.TOTAL_SUPPLY;
  const allocation = allocationSummary();
  const address = project.CONTRACT_ADDRESS?.trim() || null;
  const explorer = explorerHref();
  const chart = chartHref();
  const buyTax = taxLabel("buy");
  const sellTax = taxLabel("sell");
  const liquidity = project.LIQUIDITY;
  const admin = project.ADMIN;
  const live = project.LAUNCH_STATUS === "live";

  const barStops =
    allocation && allocation.balanced
      ? allocation.items
      : allocation
        ? allocation.items
        : [];
  const barTotal = allocation ? Number(allocation.total) : 0;

  return (
    <section id="tokenomics" className="section-scroll bg-obsidian py-20 sm:py-28">
      <div className="mx-auto max-w-[1100px] px-5 sm:px-8">
        <p className="font-mono text-[0.72rem] tracking-[0.18em] text-cyan uppercase">Tokenomics</p>
        <h2 className="mt-3 font-display text-[clamp(2.6rem,6vw,4.8rem)] leading-[0.9] font-bold text-silver">
          Tokenomics
        </h2>
        <p className="mt-4 max-w-2xl text-lg leading-relaxed text-mist">
          The supply, distribution, and contract details behind {project.DISPLAY_TICKER}.
        </p>

        <div className="mt-10 grid items-stretch gap-4 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)]">
          <article className="relative overflow-hidden rounded-[28px] border border-white/10 bg-[#070b1c] p-6 sm:p-8">
            <div className="pointer-events-none absolute right-4 bottom-4 w-28 opacity-70 sm:w-36" aria-hidden="true">
              <div className="relative aspect-[4/3]">
                <Image
                  src={assets.ethereum.src}
                  alt=""
                  width={assets.ethereum.width}
                  height={assets.ethereum.height}
                  sizes="144px"
                  className="h-full w-full object-contain"
                />
              </div>
            </div>
            <p className="font-mono text-[0.72rem] tracking-[0.16em] text-cyan uppercase">Total supply</p>
            {supply ? (
              <p className="mt-3 max-w-full font-display text-[clamp(2.4rem,7vw,5.5rem)] leading-none font-bold break-words text-silver">
                {groupInteger(supply)}
                {!live ? <span className="mt-3 block font-sans text-base font-medium tracking-normal text-mist normal-case">Announced supply. Trading status is separate.</span> : null}
              </p>
            ) : (
              <p className="mt-3 max-w-sm text-2xl leading-snug font-semibold text-silver">
                Supply announcement pending.
              </p>
            )}
            <dl className="relative mt-8 space-y-2 text-sm">
              <div className="flex flex-wrap justify-between gap-2">
                <dt className="text-mist">Token</dt>
                <dd className="text-silver">{project.PROJECT_NAME}</dd>
              </div>
              <div className="flex flex-wrap justify-between gap-2">
                <dt className="text-mist">Ticker</dt>
                <dd className="font-mono text-silver">{project.DISPLAY_TICKER}</dd>
              </div>
              <div className="flex flex-wrap justify-between gap-2">
                <dt className="text-mist">Network</dt>
                <dd className="text-silver">{project.NETWORK}</dd>
              </div>
              {project.TOKEN_STANDARD ? (
                <div className="flex flex-wrap justify-between gap-2">
                  <dt className="text-mist">Standard</dt>
                  <dd className="text-silver">{project.TOKEN_STANDARD}</dd>
                </div>
              ) : null}
            </dl>
          </article>

          <article className="rounded-[28px] border border-white/10 bg-white/[0.03] p-6 sm:p-8">
            <h3 className="text-lg font-semibold text-silver">Launch status</h3>
            <dl className="mt-2">
              <Fact label="Status" value={live ? "Live" : "Prelaunch"} />
              <Fact
                label="Buy tax"
                value={publishedValue(buyTax, live)}
                note={project.BUY_TAX?.note}
              />
              <Fact
                label="Sell tax"
                value={publishedValue(sellTax, live)}
                note={project.SELL_TAX?.note}
              />
              <Fact
                label="Liquidity"
                value={liquidity ? publishedValue(liquidityLabel(liquidity.status), live) : "To be announced"}
              />
              {!address ? <Fact label="Token contract" value="To be announced" /> : null}
            </dl>
            <p className="mt-4 text-sm leading-relaxed text-mist">
              A token tax is separate from the Ethereum network fee and from any pool or exchange fee.
            </p>
            {project.LAST_CHECKED ? (
              <p className="mt-3 font-mono text-xs text-mist">Last checked {project.LAST_CHECKED}</p>
            ) : null}
          </article>
        </div>

        {address ? (
        <article className="mt-4 rounded-[28px] border border-white/10 bg-white/[0.03] p-6 sm:p-8">
          <h3 className="text-lg font-semibold text-silver">Token contract</h3>
            <div className="mt-4">
              <p className="text-sm text-mist">
                {live
                  ? "This is the deployed token contract."
                  : "This contract is deployed. Trading is still separate from that fact."}
              </p>
              <code className="mt-3 block font-mono text-sm break-all text-silver">{address}</code>
              <p className="mt-2 text-sm text-mist">
                This is the token contract, not a payment address, and it is separate from any pool or pair address.
              </p>
              {project.POOL_ADDRESS ? (
                <p className="mt-3 font-mono text-sm break-all text-mist">
                  Pool address: {project.POOL_ADDRESS}
                </p>
              ) : null}
              <div className="mt-4 flex flex-wrap items-center gap-4">
                <CopyAddress address={address} />
                {explorer ? (
                  <a
                    href={explorer}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="focus-ring text-sm text-cyan underline-offset-4 hover:underline"
                  >
                    View on Etherscan
                    <span className="sr-only"> (opens in a new tab)</span>
                  </a>
                ) : null}
                {chart ? (
                  <a
                    href={chart}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="focus-ring text-sm text-cyan underline-offset-4 hover:underline"
                  >
                    View Chart
                    <span className="sr-only"> (opens in a new tab)</span>
                  </a>
                ) : null}
              </div>
            </div>
        </article>
        ) : null}

        {allocation ? (
          <article className="mt-4 rounded-[28px] border border-white/10 bg-[#070b1c] p-6 sm:p-8">
            <h3 className="text-lg font-semibold text-silver">
              {allocationTitle(allocation.basis, live)}
            </h3>
            <p className="mt-2 text-sm text-mist">
              {allocation.balanced
                ? "These categories total 100% of the stated allocation."
                : `These published percentages total ${allocation.total}%. They are shown as entered.`}
            </p>
            <div className="mt-5 flex h-3 overflow-hidden rounded-full bg-white/10" aria-hidden="true">
              {barStops.map((item, index) => (
                <div
                  key={item.label}
                  style={{
                    width: `${barTotal > 0 ? (Number(item.percent) / barTotal) * 100 : 0}%`,
                    background: SEGMENT_COLORS[index % SEGMENT_COLORS.length],
                  }}
                />
              ))}
            </div>
            <ul className="mt-6 divide-y divide-white/10">
              {allocation.items.map((item, index) => (
                <li key={item.label} className="grid gap-2 py-4 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-start">
                  <div>
                    <p className="flex items-center gap-2 text-silver">
                      <span
                        className="size-2.5 rounded-full"
                        style={{ background: SEGMENT_COLORS[index % SEGMENT_COLORS.length] }}
                        aria-hidden="true"
                      />
                      {item.label}
                      <span className="font-mono text-sm text-cyan">{item.percent}%</span>
                    </p>
                    <p className="mt-1 text-sm leading-relaxed text-mist">{item.purpose}</p>
                    {item.vesting ? <p className="mt-1 text-sm text-mist">Vesting: {item.vesting}</p> : null}
                    {item.walletUrl ? (
                      <a
                        href={item.walletUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="focus-ring mt-1 inline-block text-sm text-cyan underline-offset-4 hover:underline"
                      >
                        {item.wallet ?? "View wallet"}
                        <span className="sr-only"> (opens in a new tab)</span>
                      </a>
                    ) : item.wallet ? (
                      <p className="mt-1 font-mono text-xs break-all text-mist">{item.wallet}</p>
                    ) : null}
                  </div>
                  {item.amount ? (
                    <p className="font-mono text-sm text-silver sm:text-right">{groupInteger(item.amount)} tokens</p>
                  ) : null}
                </li>
              ))}
            </ul>
          </article>
        ) : (
          <p className="mt-4 text-base text-mist">Allocation will be published with the launch details.</p>
        )}

        <div className="mt-4 grid gap-4 md:grid-cols-2">
          <details className="group rounded-[28px] border border-white/10 bg-white/[0.03] p-6 open:bg-white/[0.04]">
            <summary className="focus-ring cursor-pointer list-none rounded-md text-lg font-semibold text-silver marker:content-none [&::-webkit-details-marker]:hidden">
              Liquidity
              <span className="ml-2 font-mono text-xs text-cyan group-open:hidden">Show</span>
              <span className="ml-2 hidden font-mono text-xs text-cyan group-open:inline">Hide</span>
            </summary>
            <div className="mt-4 space-y-2 text-sm leading-relaxed text-mist">
              <p>Liquidity-pool changes are separate from burning {project.DISPLAY_TICKER} supply.</p>
              {liquidity ? (
                <>
                  <p>Status: {liquidityLabel(liquidity.status)}.</p>
                  {liquidity.dex ? <p>DEX: {liquidity.dex}</p> : null}
                  {liquidity.pool ? <p className="break-all">Pool: {liquidity.pool}</p> : null}
                  {liquidity.proportion ? (
                    <p>
                      {liquidity.proportion}
                      {liquidity.proportionMeasures ? ` of ${liquidity.proportionMeasures}` : ""}.
                    </p>
                  ) : null}
                  {liquidity.lockProvider ? <p>Lock provider: {liquidity.lockProvider}</p> : null}
                  {liquidity.unlockDate ? <p>Unlock: {liquidity.unlockDate}</p> : null}
                  {liquidity.note ? <p>{liquidity.note}</p> : null}
                  {liquidity.evidenceUrl ? (
                    <a href={liquidity.evidenceUrl} target="_blank" rel="noopener noreferrer" className="focus-ring text-cyan underline-offset-4 hover:underline">
                      Evidence
                      <span className="sr-only"> (opens in a new tab)</span>
                    </a>
                  ) : null}
                  {liquidity.lastChecked ? <p className="font-mono text-xs">Last checked {liquidity.lastChecked}</p> : null}
                </>
              ) : (
                <p>Liquidity status is to be announced.</p>
              )}
            </div>
          </details>

          <details className="group rounded-[28px] border border-white/10 bg-white/[0.03] p-6 open:bg-white/[0.04]">
            <summary className="focus-ring cursor-pointer list-none rounded-md text-lg font-semibold text-silver marker:content-none [&::-webkit-details-marker]:hidden">
              Contract controls
              <span className="ml-2 font-mono text-xs text-cyan group-open:hidden">Show</span>
              <span className="ml-2 hidden font-mono text-xs text-cyan group-open:inline">Hide</span>
            </summary>
            <div className="mt-4 space-y-2 text-sm leading-relaxed text-mist">
              <p>Giving up ownership does not, by itself, remove every privileged function.</p>
              {admin ? (
                <>
                  {admin.arrangement ? <p>Arrangement: {admin.arrangement}</p> : null}
                  {admin.powers ? <p>Remaining powers: {admin.powers}</p> : null}
                  {admin.multisig ? <p>Multisig: {admin.multisig}</p> : null}
                  {admin.timelock ? <p>Timelock: {admin.timelock}</p> : null}
                  {admin.evidenceUrl ? (
                    <a href={admin.evidenceUrl} target="_blank" rel="noopener noreferrer" className="focus-ring text-cyan underline-offset-4 hover:underline">
                      Supporting record
                      <span className="sr-only"> (opens in a new tab)</span>
                    </a>
                  ) : null}
                  {admin.lastChecked ? <p className="font-mono text-xs">Last checked {admin.lastChecked}</p> : null}
                </>
              ) : (
                <p>Administrative controls are to be announced.</p>
              )}
            </div>
          </details>
        </div>
      </div>
    </section>
  );
}

function publishedValue(value: string | null, live: boolean) {
  if (!value) return "To be announced";
  return live ? value : `Planned: ${value}`;
}

function allocationTitle(basis: "launch" | "current" | null, live: boolean) {
  if (basis === "current") return "Current distribution";
  if (basis === "launch") return live ? "Launch allocation" : "Planned launch allocation";
  return live ? "Allocation" : "Planned allocation";
}

function liquidityLabel(status: NonNullable<typeof project.LIQUIDITY>["status"]) {
  if (status === "locked") return "Locked";
  if (status === "burned") return "LP tokens burned";
  if (status === "unlocked") return "Unlocked";
  if (status === "partial") return "Partially locked";
  return "To be announced";
}
