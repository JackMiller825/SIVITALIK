import { PrimaryLink } from "@/components/primary-link";
import { project } from "@/config/project";
import { assets } from "@/lib/assets";
import { buyHref, launchAction } from "@/lib/project";
import Image from "next/image";

export function TradeSection() {
  const buy = buyHref();
  const action = launchAction();

  return (
    <section id="trade" className="section-scroll bg-[#070a18] py-16 sm:py-24">
      <div className="mx-auto grid max-w-[1160px] items-center gap-10 px-5 sm:px-8 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
        <div className="overflow-hidden rounded-[28px] border border-white/10 bg-[#070b1c]">
          <div className="relative aspect-[4/3]">
            <Image
              src={assets.humanity.src}
              alt="A human hand and a robotic hand meeting at a spark."
              width={assets.humanity.width}
              height={assets.humanity.height}
              sizes="(max-width: 1024px) 100vw, 520px"
              loading="lazy"
              className="h-full w-full object-contain"
            />
          </div>
        </div>
        <div className="max-w-xl">
          <h2 className="font-display text-[clamp(2.8rem,6vw,4.8rem)] leading-[0.88] font-bold text-silver uppercase">
            {buy ? `Buy ${project.DISPLAY_TICKER}` : "Launch details"}
          </h2>
          <p className="mt-4 text-base leading-relaxed text-mist sm:text-lg">
            {buy
              ? `The checked trading page is open. Confirm the token there matches the contract published for ${project.DISPLAY_TICKER}.`
              : `Trading is not confirmed yet. Follow the steps above, and use the contract address here when it is published. This site does not take a payment.`}
          </p>
          <div className="mt-8">
            <PrimaryLink href={action.href} external={action.external}>
              {action.label}
            </PrimaryLink>
          </div>
        </div>
      </div>
    </section>
  );
}
