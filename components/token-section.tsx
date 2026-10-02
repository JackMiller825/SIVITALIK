import { CopyAddress } from "@/components/copy-address";
import { project } from "@/config/project";
import { assets } from "@/lib/assets";
import { groupInteger } from "@/lib/amount";
import { explorerHref, taxLabel } from "@/lib/project";
import Image from "next/image";

export function TokenSection() {
  const supply = project.TOTAL_SUPPLY?.trim() || null;
  const buyTax = taxLabel("buy");
  const sellTax = taxLabel("sell");
  const liquidity = project.LIQUIDITY;
  const admin = project.ADMIN;
  const address = project.CONTRACT_ADDRESS?.trim() || null;
  const liquidityAmount = project.LIQUIDITY_AMOUNT?.trim() || null;
  const explorer = explorerHref();

  return (
    <section id="tokenomics" className="section-scroll bg-void py-20 sm:py-28">
      <div className="mx-auto grid max-w-[1160px] items-center gap-10 px-5 sm:px-8 lg:grid-cols-2 lg:gap-14">
        <div className="min-w-0">
          <h2 className="font-display text-[clamp(3rem,7vw,5.5rem)] leading-[0.86] font-bold text-silver uppercase">
            Tokenomics
          </h2>
          <p className="mt-8 text-sm tracking-wide text-cyan uppercase">Supply</p>
          {supply ? (
            <p className="mt-2 font-display text-[clamp(3.2rem,8vw,6rem)] leading-none font-bold break-words text-silver">
              {groupInteger(supply)}
            </p>
          ) : (
            <p className="mt-2 text-3xl font-semibold text-silver sm:text-4xl">To be announced</p>
          )}
          <dl className="mt-8 divide-y divide-white/10 rounded-[28px] border border-white/10 bg-[#0b1028] px-5 sm:px-6">
            {address ? (
              <div className="py-4">
                <dt className="text-sm text-mist">Contract address</dt>
                <div className="mt-1 flex items-center gap-3">
                  <dd className="min-w-0 flex-1 font-mono text-sm break-all text-silver">{address}</dd>
                  <CopyAddress address={address} />
                </div>
                {explorer ? (
                  <a href={explorer} target="_blank" rel="noopener noreferrer" className="focus-ring mt-3 inline-block text-sm text-cyan underline-offset-4 hover:underline">
                    View on Etherscan
                    <span className="sr-only"> (opens in a new tab)</span>
                  </a>
                ) : null}
              </div>
            ) : null}
            <Fact label="Buy tax" value={buyTax ?? "To be announced"} note={project.BUY_TAX?.note} />
            <Fact label="Sell tax" value={sellTax ?? "To be announced"} note={project.SELL_TAX?.note} />
            <Fact
              label="Liquidity"
              value={
                liquidityAmount
                  ? groupInteger(liquidityAmount)
                  : liquidity
                    ? liquidityText(liquidity.status)
                    : "Details pending"
              }
            />
            <div className="py-4">
              <dt className="text-sm text-mist">Contract controls</dt>
              <dd className="mt-1 text-base leading-relaxed text-silver">
                {admin ? adminText(admin) : "LP tokens are burnt and contract ownership is renounced."}
              </dd>
              {admin?.evidenceUrl ? (
                <a href={admin.evidenceUrl} target="_blank" rel="noopener noreferrer" className="focus-ring mt-2 inline-block text-sm text-cyan underline-offset-4 hover:underline">
                  Supporting record
                  <span className="sr-only"> (opens in a new tab)</span>
                </a>
              ) : null}
            </div>
          </dl>
          {liquidity?.evidenceUrl ? (
            <p className="mt-4 text-sm text-mist">
              Liquidity evidence:{" "}
              <a href={liquidity.evidenceUrl} target="_blank" rel="noopener noreferrer" className="focus-ring text-cyan underline-offset-4 hover:underline">
                View record
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
              {liquidity.proportion ? ` · ${liquidity.proportion}` : ""}
              {liquidity.unlockDate ? ` · Unlock ${liquidity.unlockDate}` : ""}
            </p>
          ) : null}
          {liquidity?.status === "burned" ? (
            <p className="mt-2 text-sm text-mist">Burning LP tokens is separate from burning {project.DISPLAY_TICKER} supply.</p>
          ) : null}
        </div>
        <div className="overflow-hidden rounded-[28px] border border-white/10 bg-[#070b1c]">
          <div className="relative aspect-[4/3]">
            <Image
              src={assets.ethereum.src}
              alt="A faceted Ethereum crystal surrounded by connected blocks."
              width={assets.ethereum.width}
              height={assets.ethereum.height}
              sizes="(max-width: 1024px) 100vw, 560px"
              loading="lazy"
              className="h-full w-full object-contain"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function Fact({ label, value, note }: { label: string; value: string; note?: string | null }) {
  return (
    <div className="py-4">
      <dt className="text-sm text-mist">{label}</dt>
      <dd className="mt-1 text-lg text-silver">{value}</dd>
      {note ? <p className="mt-1 text-sm leading-relaxed text-mist">{note}</p> : null}
    </div>
  );
}

function liquidityText(status: NonNullable<typeof project.LIQUIDITY>["status"]) {
  if (status === "locked") return "Locked";
  if (status === "burned") return "LP tokens burned";
  if (status === "unlocked") return "Unlocked";
  if (status === "partial") return "Partially locked";
  return "Details pending";
}

function adminText(admin: NonNullable<typeof project.ADMIN>) {
  const parts = [admin.arrangement, admin.powers, admin.multisig, admin.timelock].filter(Boolean);
  return parts.length > 0 ? parts.join(" ") : "LP tokens are burnt and contract ownership is renounced.";
}
