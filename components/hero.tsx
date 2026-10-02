"use client";

import { HeroField } from "@/components/hero-field";
import { PrimaryLink } from "@/components/primary-link";
import { project } from "@/config/project";
import { assets } from "@/lib/assets";
import { launchAction, secondaryAction } from "@/lib/project";
import { useReducedMotion } from "motion/react";
import Image from "next/image";

export function Hero() {
  const reduced = useReducedMotion();
  const primary = launchAction();
  const secondary = secondaryAction();
  const live = project.LAUNCH_STATUS === "live";

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
      className="relative isolate min-h-[100svh] overflow-hidden"
      onPointerMove={onMove}
      onPointerLeave={onLeave}
    >
      <div
        className="pointer-events-none absolute inset-[-4%] transition-transform duration-200 ease-out"
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
      <div className="pointer-events-none absolute inset-0 hidden bg-[linear-gradient(90deg,#040615_0%,rgba(4,6,21,0.92)_34%,rgba(4,6,21,0.58)_58%,rgba(4,6,21,0.22)_100%)] lg:block" />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(4,6,21,0.92)_0%,rgba(4,6,21,0.78)_34%,rgba(4,6,21,0.28)_58%,transparent_78%)] lg:hidden" />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(4,6,21,0.35),transparent_16%,transparent_74%,#040615)]" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-full opacity-80 lg:w-1/2" aria-hidden="true">
        <HeroField reduced={reduced} />
      </div>

      <div className="relative z-10 mx-auto grid min-h-[100svh] w-full max-w-[1240px] items-center gap-6 px-5 pt-28 pb-16 sm:px-8 lg:grid-cols-[minmax(0,1.05fr)_minmax(280px,0.95fr)] lg:pt-24">
        <div className="@container min-w-0 max-w-xl">
          <p className="font-mono text-[0.72rem] tracking-[0.22em] text-cyan uppercase">
            {project.NETWORK}
            <span className="mx-2 text-mist">·</span>
            {live ? "Live" : "Prelaunch"}
          </p>
          <h1 className="mt-4 font-display text-[clamp(2.6rem,12cqi,6.2rem)] leading-[0.84] font-extrabold tracking-[-0.035em] text-silver uppercase">
            <span className="block">Superintelligent</span>
            <span className="metal-word block">Vitalik</span>
          </h1>
          <p className="mt-5 inline-flex items-center gap-2 rounded-full border border-cyan/40 bg-cyan/10 px-3 py-1 font-mono text-sm text-cyan">
            <span className="size-1.5 rounded-full bg-cyan shadow-[0_0_10px_#35dfff]" />
            {project.DISPLAY_TICKER}
          </p>
          <p className="mt-5 max-w-lg text-base leading-relaxed text-silver sm:text-lg">
            An Ethereum meme token inspired by superintelligence, digital culture, and human–AI collaboration.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <PrimaryLink href={primary.href} external={primary.external}>
              {primary.label}
            </PrimaryLink>
            <PrimaryLink href={secondary.href} external={secondary.external} tone="quiet">
              {secondary.label}
            </PrimaryLink>
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-[560px]">
          <div
            className="pointer-events-none absolute inset-[12%] rounded-full bg-[radial-gradient(circle,rgba(139,61,255,0.45),rgba(53,223,255,0.12)_42%,transparent_70%)] blur-2xl"
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
              sizes="(max-width: 1024px) 90vw, 540px"
              className="mx-auto h-auto max-h-[46vh] w-full object-contain object-bottom sm:max-h-[52vh] lg:max-h-[78vh]"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
