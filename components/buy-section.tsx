import { PrimaryLink } from "@/components/primary-link";
import { project } from "@/config/project";
import { buyHref } from "@/lib/project";

const STEPS = [
  {
    title: "Set up an Ethereum-compatible wallet",
    body: "Choose a wallet that supports Ethereum and keep the recovery phrase offline. This website never asks for it, and it does not connect to a wallet.",
  },
  {
    title: "Add enough ETH for the purchase and network fees",
    body: "You will need Ether for the tokens and a little more for the Ethereum network fee. The fee changes with network demand.",
  },
  {
    title: "Open the verified trading link",
    body: "Use only the trading page published on this site. “Verified” here means the project supplied the link. It is not an audit.",
  },
  {
    title: "Check the token contract and review the swap details",
    body: "Compare the contract in the swap with the address published here. Read the amounts and the fees before you confirm. This guide does not set a slippage percentage.",
  },
];

export function BuySection() {
  const buy = buyHref();
  const address = project.CONTRACT_ADDRESS.trim();

  return (
    <section id="how-to-buy" className="section-scroll bg-void py-20 sm:py-28">
      <div className="mx-auto max-w-[980px] px-5 sm:px-8">
        <p className="font-mono text-[0.72rem] tracking-[0.22em] text-cyan uppercase">03 — Acquire</p>
        <h2 className="mt-3 font-display text-[clamp(2.6rem,6vw,4.8rem)] leading-[0.9] font-bold text-silver">
          How to Buy
        </h2>
        <p className="mt-4 max-w-2xl text-lg leading-relaxed text-mist">
          Four steps for a first purchase on Ethereum. You can read them without connecting a wallet.
        </p>

        <ol className="mt-8 space-y-4">
          {STEPS.map((step, index) => (
            <li key={step.title} className="grid gap-3 rounded-3xl border border-white/10 bg-[#0b1028]/60 p-5 sm:grid-cols-[auto_minmax(0,1fr)] sm:gap-6 sm:p-6">
              <span className="font-display text-5xl leading-none font-bold text-white/20" aria-hidden="true">
                0{index + 1}
              </span>
              <div>
                <h3 className="text-xl font-semibold text-silver">{step.title}</h3>
                <p className="mt-2 max-w-2xl text-base leading-relaxed text-mist">{step.body}</p>
                {index === 2 ? (
                  <div className="mt-4">
                    {buy ? (
                      <PrimaryLink href={buy} external>
                        Open the trading page
                      </PrimaryLink>
                    ) : (
                      <p className="text-sm text-silver">Verified trading link — Not announced</p>
                    )}
                  </div>
                ) : null}
                {index === 3 ? (
                  <p className="mt-4 font-mono text-sm break-all text-silver">
                    {address ? address : "Contract address — Not announced"}
                  </p>
                ) : null}
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
