import { CopyAddress } from "@/components/copy-address";
import { PrimaryLink } from "@/components/primary-link";
import { project } from "@/config/project";
import { buyHref, chartHref, socialLinks } from "@/lib/project";

const STEPS = [
  {
    title: "Create a Wallet",
    icon: WalletIcon,
  },
  {
    title: "Get Some ETH",
    icon: EthIcon,
  },
  {
    title: "Go to Uniswap",
    icon: LinkIcon,
  },
  {
    title: `Switch ETH for ${project.DISPLAY_TICKER}`,
    icon: CheckIcon,
  },
];

const QUESTIONS = [
  {
    q: `Which network is ${project.DISPLAY_TICKER} on?`,
    a: `${project.DISPLAY_TICKER} is an Ethereum Mainnet token. ETH on another network is not the same balance, and it is not ready to spend here until it is on Ethereum Mainnet.`,
  },
  {
    q: "Where can I find the contract address?",
    a: "The token contract is published in Tokenomics when it is announced. Copy that address and compare it with the token selected on the trading page. It is not a payment address.",
  },
  {
    q: "Why should I leave some ETH for fees?",
    a: "Ethereum charges a network fee to send a transaction. That fee is separate from the token price and from any token tax. If the wallet spends every ETH on the swap, the transaction cannot pay the network.",
  },
  {
    q: "What is the difference between token tax, slippage, and price impact?",
    a: "A token tax is a fee written into the token, when one exists. Slippage is the price movement you are willing to accept while the swap confirms. Price impact is how much your own trade moves the pool price. None of these is the Ethereum network fee.",
  },
  {
    q: "What should I check if a swap fails?",
    a: "Confirm you are on Ethereum Mainnet, that the wallet still holds ETH for the network fee, that trading is live, and that the selected token matches the published contract. Thin liquidity can also stop a swap. Do not keep raising slippage to force a failing trade through. The exchange you use can explain its own error messages.",
  },
  {
    q: "Why might a purchased token not appear in my wallet immediately?",
    a: "Check the transaction first. If it is still pending or failed, the tokens are not in the wallet yet. If it succeeded and the wallet does not list the token, some wallets let you add it manually with the exact token contract.",
  },
];

export function BuySection() {
  const buy = buyHref();
  const chart = chartHref();
  const address = project.CONTRACT_ADDRESS?.trim() || null;
  const socials = socialLinks();
  const live = Boolean(buy);

  return (
    <section id="how-to-buy" className="section-scroll bg-void py-20 sm:py-28">
      <div className="mx-auto max-w-[1100px] px-5 sm:px-8">
        <p className="font-mono text-[0.72rem] tracking-[0.18em] text-cyan uppercase">How to Buy</p>
        <h2 className="mt-3 font-display text-[clamp(2.6rem,6vw,4.8rem)] leading-[0.9] font-bold text-silver">
          How to Buy {project.DISPLAY_TICKER}
        </h2>
        <p className="mt-4 max-w-2xl text-lg leading-relaxed text-mist">
          Prepare your wallet, confirm the Ethereum network, and review your swap.
        </p>

        <ol className="mt-10 grid gap-4 md:grid-cols-2">
          {STEPS.map((step, index) => {
            const Icon = step.icon;
            return (
              <li key={step.title} className="rounded-[28px] border border-white/10 bg-[#0b1028]/80 p-6">
                <div className="flex items-center gap-3">
                  <span className="inline-flex size-11 items-center justify-center rounded-2xl border border-cyan/30 bg-cyan/10 text-cyan">
                    <Icon />
                  </span>
                  <p className="font-mono text-xs tracking-[0.16em] text-cyan uppercase">Step 0{index + 1}</p>
                </div>
                <h3 className="mt-4 text-xl font-semibold text-silver">{step.title}</h3>
                <StepBody index={index} address={address} />
              </li>
            );
          })}
        </ol>

        <aside className="mt-6 rounded-[28px] border border-white/10 bg-white/[0.03] p-6 sm:p-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:items-center">
            {live && buy ? (
              <PrimaryLink href={buy} external>
                Buy {project.DISPLAY_TICKER}
              </PrimaryLink>
            ) : (
              <PrimaryLink href="https://app.uniswap.org/" external>
                Open Uniswap
              </PrimaryLink>
            )}
            {address ? <CopyAddress address={address} /> : null}
            {chart ? (
              <a href={chart} target="_blank" rel="noopener noreferrer" className="focus-ring text-sm text-cyan underline-offset-4 hover:underline">
                View Chart
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
            ) : null}
            {socials.map((link) => (
              <a key={link.label} href={link.href} target="_blank" rel="noopener noreferrer" className="focus-ring text-sm text-cyan underline-offset-4 hover:underline">
                {link.label}
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
            ))}
          </div>
          <p className="mt-4 text-sm leading-relaxed text-mist">
            This site does not connect a wallet or submit a swap. The exchange page is where a purchase happens.
          </p>
        </aside>

        <div className="mt-12">
          <h3 className="font-display text-4xl leading-none font-bold text-silver">Buying questions</h3>
          <div className="mt-6 divide-y divide-white/10 rounded-[28px] border border-white/10">
            {QUESTIONS.map((item) => (
              <details key={item.q} className="group px-5 py-4 sm:px-6">
                <summary className="focus-ring flex cursor-pointer list-none items-start justify-between gap-4 rounded-md text-base font-semibold text-silver marker:content-none [&::-webkit-details-marker]:hidden">
                  <span>{item.q}</span>
                  <span className="mt-1 font-mono text-cyan group-open:hidden" aria-hidden="true">+</span>
                  <span className="mt-1 hidden font-mono text-cyan group-open:inline" aria-hidden="true">−</span>
                </summary>
                <p className="mt-3 max-w-3xl text-sm leading-relaxed text-mist">{item.a}</p>
              </details>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function StepBody({ index, address }: { index: number; address: string | null }) {
  if (index === 0) {
    return (
      <p className="mt-3 text-base leading-relaxed text-mist">
        Download MetaMask or your wallet of choice from the App Store or Google Play Store for free. Desktop users, download the Google Chrome extension by going to{" "}
        <a href="https://metamask.io/" target="_blank" rel="noopener noreferrer" className="focus-ring text-cyan underline-offset-4 hover:underline">
          metamask.io
          <span className="sr-only"> (opens in a new tab)</span>
        </a>
        .
      </p>
    );
  }
  if (index === 1) {
    return (
      <p className="mt-3 text-base leading-relaxed text-mist">
        Have ETH in your wallet to switch to {project.DISPLAY_TICKER}. If you don’t have any ETH, you can buy directly on MetaMask, transfer from another wallet, or buy on another exchange and send it to your wallet.
      </p>
    );
  }
  if (index === 2) {
    return (
      <div className="mt-3 space-y-3">
        <p className="text-base leading-relaxed text-mist">
          Connect to Uniswap. Go to{" "}
          <a href="https://app.uniswap.org/" target="_blank" rel="noopener noreferrer" className="focus-ring text-cyan underline-offset-4 hover:underline">
            app.uniswap.org
            <span className="sr-only"> (opens in a new tab)</span>
          </a>{" "}
          in Google Chrome or on the browser inside your MetaMask app. Connect your wallet. Paste the {project.DISPLAY_TICKER} token address into Uniswap, select {project.DISPLAY_TICKER}, and confirm. When MetaMask prompts you for a wallet signature, check that it matches this swap, then sign.
        </p>
        {address ? <CopyAddress address={address} /> : (
          <p className="text-sm leading-relaxed text-mist">The token address will appear here when it is published.</p>
        )}
      </div>
    );
  }
  return (
    <p className="mt-3 text-base leading-relaxed text-mist">
      Switch ETH for {project.DISPLAY_TICKER}. We have zero taxes, so you don’t need to worry about buying with a specific slippage, although you may need to use slippage during times of market volatility.
    </p>
  );
}

function WalletIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.6">
      <rect x="3" y="6" width="18" height="13" rx="2" />
      <path d="M3 10h18" />
      <circle cx="16.5" cy="14.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

function EthIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.6">
      <path d="M12 3 6.5 12 12 9.8 17.5 12 12 3Z" />
      <path d="M6.5 13.2 12 21l5.5-7.8L12 15.2 6.5 13.2Z" />
    </svg>
  );
}

function LinkIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.6">
      <path d="M10 14a5 5 0 0 0 7.1.1l2-2a5 5 0 0 0-7.1-7.1l-1.2 1.2" />
      <path d="M14 10a5 5 0 0 0-7.1-.1l-2 2a5 5 0 0 0 7.1 7.1l1.2-1.2" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.6">
      <circle cx="12" cy="12" r="8" />
      <path d="m8.5 12.2 2.4 2.4 4.6-5" />
    </svg>
  );
}
