import { project } from "@/config/project";
import { BrandLogo } from "@/components/brand-logo";

export function BuySection() {
  return (
    <section id="how-to-buy" className="section-scroll bg-obsidian py-20 sm:py-28">
      <div className="mx-auto max-w-[1160px] px-5 sm:px-8">
        <h2 className="font-display text-[clamp(3rem,7vw,5.5rem)] leading-[0.86] font-bold text-silver uppercase">
          How to Buy
        </h2>
        <ol className="mt-10 space-y-4">
          <li className="relative overflow-hidden rounded-[28px] border border-cyan/25 bg-[#140c2e] p-6 sm:p-8">
            <span className="pointer-events-none absolute top-4 right-4 size-2 rotate-45 border border-cyan/60" aria-hidden="true" />
            <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:gap-8">
              <span className="inline-flex size-16 shrink-0 items-center justify-center rounded-2xl border border-white/15 bg-white/[0.04] text-cyan sm:size-20">
                <WalletIcon />
              </span>
              <div className="max-w-3xl">
                <h3 className="text-2xl font-semibold text-silver">Create a Wallet</h3>
                <p className="mt-2 text-base leading-relaxed text-mist">
                  Download MetaMask or your wallet of choice from the App Store or Google Play Store for free. Desktop users, download the Google Chrome extension by going to{" "}
                  <a href="https://metamask.io/" target="_blank" rel="noopener noreferrer" className="focus-ring text-cyan underline-offset-4 hover:underline">
                    metamask.io
                    <span className="sr-only"> (opens in a new tab)</span>
                  </a>
                  .
                </p>
              </div>
            </div>
          </li>

          <li className="relative overflow-hidden rounded-[28px] border border-cyan/25 bg-[#140c2e] p-6 sm:p-8">
            <span className="pointer-events-none absolute top-4 right-4 size-2 rotate-45 border border-cyan/60" aria-hidden="true" />
            <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:gap-8">
              <span className="inline-flex size-16 shrink-0 items-center justify-center rounded-2xl border border-white/15 bg-white/[0.04] text-cyan sm:size-20">
                <EthIcon />
              </span>
              <div className="max-w-3xl">
                <h3 className="text-2xl font-semibold text-silver">Get Some ETH</h3>
                <p className="mt-2 text-base leading-relaxed text-mist">
                  Have ETH in your wallet to switch to {project.DISPLAY_TICKER}. If you don’t have any ETH, you can buy directly on MetaMask, transfer from another wallet, or buy on another exchange and send it to your wallet.
                </p>
              </div>
            </div>
          </li>

          <li className="relative overflow-hidden rounded-[28px] border border-cyan/25 bg-[#140c2e] p-6 sm:p-8">
            <span className="pointer-events-none absolute top-4 right-4 size-2 rotate-45 border border-cyan/60" aria-hidden="true" />
            <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:gap-8">
              <span className="inline-flex size-16 shrink-0 items-center justify-center rounded-2xl border border-white/15 bg-white/[0.04] text-cyan sm:size-20">
                <SwapIcon />
              </span>
              <div className="max-w-3xl">
                <h3 className="text-2xl font-semibold text-silver">Go to Uniswap</h3>
                <p className="mt-2 text-base leading-relaxed text-mist">
                  Connect to Uniswap. Go to{" "}
                  <a href="https://app.uniswap.org/" target="_blank" rel="noopener noreferrer" className="focus-ring text-cyan underline-offset-4 hover:underline">
                    app.uniswap.org
                    <span className="sr-only"> (opens in a new tab)</span>
                  </a>{" "}
                  in Google Chrome or on the browser inside your MetaMask app. Connect your wallet. Paste the {project.DISPLAY_TICKER} token address into Uniswap, select {project.DISPLAY_TICKER}, and confirm. When MetaMask prompts you for a wallet signature, review the swap and sign only if it matches.
                </p>
              </div>
            </div>
          </li>

          <li className="relative overflow-hidden rounded-[28px] border border-cyan/25 bg-[#140c2e] p-6 sm:p-8">
            <span className="pointer-events-none absolute top-4 right-4 size-2 rotate-45 border border-cyan/60" aria-hidden="true" />
            <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:gap-8">
              <span className="inline-flex size-16 shrink-0 items-center justify-center overflow-hidden rounded-2xl border border-white/15 bg-white/[0.04] sm:size-20">
                <BrandLogo alt="" sizes="80px" className="size-12 rounded-full sm:size-14" />
              </span>
              <div className="max-w-3xl">
                <h3 className="text-2xl font-semibold text-silver">Switch ETH for {project.DISPLAY_TICKER}</h3>
                <p className="mt-2 text-base leading-relaxed text-mist">
                  Switch ETH for {project.DISPLAY_TICKER}. We have zero taxes, so you don’t need to worry about buying with a specific slippage, although you may need to use slippage during times of market volatility.
                </p>
              </div>
            </div>
          </li>
        </ol>
      </div>
    </section>
  );
}

function WalletIcon() {
  return (
    <svg width="32" height="32" viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.6">
      <rect x="3" y="6" width="18" height="13" rx="2" />
      <path d="M3 10h18" />
      <circle cx="16.5" cy="14.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

function EthIcon() {
  return (
    <svg width="32" height="32" viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.6">
      <path d="M12 3 6.2 12.2 12 10.2 17.8 12.2 12 3Z" />
      <path d="M6.2 13.4 12 21l5.8-7.6L12 15.4 6.2 13.4Z" />
    </svg>
  );
}

function SwapIcon() {
  return (
    <svg width="32" height="32" viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.6">
      <path d="M7 7h12l-2.5-2.5M17 17H5l2.5 2.5" />
      <path d="M17 7v5M7 17v-5" />
    </svg>
  );
}
