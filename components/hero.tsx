"use client";

import { HeroField } from "@/components/hero-field";
import { PrimaryLink } from "@/components/primary-link";
import { ResourceIcon } from "@/components/resource-icon";
import { project } from "@/config/project";
import { assets } from "@/lib/assets";
import { confirmedVenues, launchAction, resourceLinks } from "@/lib/project";
import { useReducedMotion } from "motion/react";
import Image from "next/image";

export function Hero() {
  const reduced = useReducedMotion();
  const primary = launchAction();
  const resources = resourceLinks();
  const live = project.LAUNCH_STATUS === "live";
  const hasVenues = confirmedVenues().length > 0;

  function onMove(event: React.PointerEvent<HTMLElement>) {
    if (reduced || event.pointerType !== "mouse") return;
    if (window.matchMedia("(max-width: 1023px)").matches) return;
    const rect = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;
    event.currentTarget.style.setProperty("--px", x.toFixed(3));
    event.currentTarget.style.setProperty("--py", y.toFixed(3));
  }

  function onLeave(event: React.PointerEvent<HTMLElement>) {
    event.currentTarget.style.setProperty("--px", "0");
    event.currentTarget.style.setProperty("--py", "0");
  }

  return (
    <section
      id="top"
      className="relative isolate overflow-hidden lg:min-h-[100svh]"
      onPointerMove={onMove}
      onPointerLeave={onLeave}
    >
      <div
        className="pointer-events-none absolute inset-[-4%] transition-transform duration-200 ease-out motion-reduce:transition-none"
        style={{ transform: "translate3d(calc(var(--px, 0) * -12px), calc(var(--py, 0) * -8px), 0) scale(1.06)" }}
        aria-hidden="true"
      >
        <Image
          src={assets.heroBackground.src}
          alt=""
          width={assets.heroBackground.width}
          height={assets.heroBackground.height}
          priority
          sizes="100vw"
          className="h-full w-full object-cover object-[72%_center]"
        />
      </div>
      <div className="pointer-events-none absolute inset-0 hidden bg-[linear-gradient(90deg,#040615_0%,rgba(4,6,21,0.92)_36%,rgba(4,6,21,0.55)_62%,rgba(4,6,21,0.18)_100%)] lg:block" />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(4,6,21,0.94)_0%,rgba(4,6,21,0.82)_42%,rgba(4,6,21,0.35)_68%,rgba(4,6,21,0.12)_100%)] lg:hidden" />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(4,6,21,0.28),transparent_18%,transparent_72%,#040615)]" />
      <div className="pointer-events-none absolute inset-y-0 right-0 hidden w-1/2 opacity-70 lg:block" aria-hidden="true">
        <HeroField reduced={reduced} />
      </div>

      <div className="relative z-10 mx-auto grid w-full max-w-[1160px] items-center gap-8 px-5 pt-28 pb-16 sm:px-8 lg:min-h-[100svh] lg:grid-cols-[minmax(0,1.05fr)_minmax(280px,0.95fr)] lg:pt-24">
        <div className="min-w-0 max-w-xl">
          <p className="text-sm font-medium text-cyan sm:text-base">Ethereum imagination, amplified.</p>
          <h1 className="mt-4 font-display text-[clamp(2.7rem,8vw,5.6rem)] leading-[0.86] font-extrabold tracking-[-0.03em] text-silver uppercase">
            <span className="block">Superintelligent</span>
            <span className="metal-word block">Vitalik</span>
          </h1>
          <p className="mt-5 font-display text-3xl leading-none font-bold text-cyan sm:text-4xl">
            {project.DISPLAY_TICKER}
          </p>
          <p className="mt-5 max-w-lg text-base leading-relaxed text-silver sm:text-lg">
            Meet {project.DISPLAY_TICKER}: a meme-token identity where neural crowns, crystalline worlds, and internet culture collide.
          </p>
          {!hasVenues ? (
            <p className="mt-4 text-sm text-mist">{live ? "Trading is live." : "Prelaunch. Trading venues are not confirmed yet."}</p>
          ) : null}
          {resources.length > 0 ? (
            <ul className="mt-6 flex flex-wrap gap-2">
              {resources.map((item) => (
                <li key={item.kind}>
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={item.label}
                    className="focus-ring inline-flex size-11 items-center justify-center rounded-full border border-white/15 bg-white/[0.04] text-silver transition duration-200 hover:border-cyan/70 hover:bg-cyan/10 hover:text-cyan"
                  >
                    <ResourceIcon kind={item.kind} />
                    <span className="sr-only">{item.label} (opens in a new tab)</span>
                  </a>
                </li>
              ))}
            </ul>
          ) : null}
          <div className="mt-8">
            <PrimaryLink href={primary.href} external={primary.external}>
              {primary.label}
            </PrimaryLink>
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-[520px]">
          <div
            className="pointer-events-none absolute inset-[14%] rounded-full bg-[radial-gradient(circle,rgba(139,61,255,0.5),rgba(53,223,255,0.12)_45%,transparent_70%)] blur-2xl"
            aria-hidden="true"
          />
          <div
            className="relative px-4 transition-transform duration-200 ease-out motion-reduce:transition-none"
            style={{ transform: "translate3d(calc(var(--px, 0) * 6px), calc(var(--py, 0) * 4px), 0)" }}
          >
            <Image
              src={assets.heroCharacter.src}
              alt="The Superintelligent Vitalik figure, wearing a crystal crown and crystalline armor, with an Ethereum diamond at the chest."
              width={assets.heroCharacter.width}
              height={assets.heroCharacter.height}
              priority
              sizes="(max-width: 1024px) 88vw, 500px"
              className="mx-auto h-auto max-h-[42vh] w-full object-contain object-bottom sm:max-h-[48vh] lg:max-h-[72vh]"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
