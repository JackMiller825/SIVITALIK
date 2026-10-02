"use client";

import { BrandLogo } from "@/components/brand-logo";
import { HeroField } from "@/components/hero-field";
import { PrimaryLink } from "@/components/primary-link";
import { project } from "@/config/project";
import { buyHref, telegramHref } from "@/lib/project";
import { useReducedMotion } from "motion/react";
import Image from "next/image";
import { useEffect, useRef } from "react";

const NODES = Array.from({ length: 12 }, (_, index) => {
  const angle = (index / 12) * Math.PI * 2 - Math.PI / 2;
  const radius = index % 2 === 0 ? 43 : 46.5;
  const x = (50 + Math.cos(angle) * radius).toFixed(2);
  const y = (50 + Math.sin(angle) * radius * 0.94).toFixed(2);
  return { left: `${x}%`, top: `${y}%`, x: Number(x), y: Number(y) };
});

export function Hero() {
  const reduced = useReducedMotion();
  const stageRef = useRef<HTMLDivElement>(null);
  const fieldRef = useRef<HTMLDivElement>(null);
  const nodeRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const words = project.PROJECT_NAME.trim().split(/\s+/);
  const lead = words[0] ?? project.PROJECT_NAME;
  const rest = words.slice(1).join(" ");
  const buy = buyHref();
  const telegram = telegramHref();

  useEffect(() => {
    if (reduced) return;
    const field = fieldRef.current;
    if (!field) return;
    let frame = 0;
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const shift = Math.min(window.scrollY, 480) * 0.05;
        field.style.transform = `translate3d(0, ${shift}px, 0)`;
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
    };
  }, [reduced]);

  function onStageMove(event: React.PointerEvent<HTMLDivElement>) {
    if (reduced || event.pointerType !== "mouse") return;
    const stage = stageRef.current;
    if (!stage) return;
    const rect = stage.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;
    stage.style.setProperty("--rx", `${(-y * 7).toFixed(2)}deg`);
    stage.style.setProperty("--ry", `${(x * 8).toFixed(2)}deg`);
    nodeRefs.current.forEach((node, index) => {
      if (!node) return;
      const point = NODES[index];
      const dx = x - (point.x / 100 - 0.5);
      const dy = y - (point.y / 100 - 0.5);
      const distance = Math.hypot(dx, dy);
      const influence = Math.max(0, 1 - distance * 2.3);
      node.style.transform = `translate(${(-dx * 16 * influence).toFixed(1)}px, ${(-dy * 16 * influence).toFixed(1)}px)`;
      node.style.opacity = String(0.45 + influence * 0.55);
    });
  }

  function onStageLeave() {
    const stage = stageRef.current;
    if (!stage) return;
    stage.style.setProperty("--rx", "0deg");
    stage.style.setProperty("--ry", "0deg");
    nodeRefs.current.forEach((node) => {
      if (!node) return;
      node.style.transform = "";
      node.style.opacity = "";
    });
  }

  function onHeroMove(event: React.PointerEvent<HTMLElement>) {
    if (reduced || event.pointerType !== "mouse") return;
    const rect = event.currentTarget.getBoundingClientRect();
    event.currentTarget.style.setProperty("--lx", `${event.clientX - rect.left}px`);
    event.currentTarget.style.setProperty("--ly", `${event.clientY - rect.top}px`);
  }

  return (
    <section
      id="top"
      className="relative isolate overflow-hidden"
      onPointerMove={onHeroMove}
    >
      <figure className="relative z-10 px-0 pt-20">
        <Image
          src="/brand/banner.webp"
          alt="Banner artwork for Superintelligent Vitalik. A portrait with a neural crown stands beside the title. Across the sky are a brain and processor, an Ethereum crystal, and a linked globe. Below, a human hand meets a robotic hand, with a future city and people on a hill."
          width={2000}
          height={667}
          priority
          sizes="100vw"
          className="aspect-[3/1] h-auto w-full object-cover"
        />
      </figure>
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_75%_35%,rgba(139,61,255,0.22),transparent_58%),radial-gradient(ellipse_at_10%_80%,rgba(53,223,255,0.1),transparent_46%)]" />
        <div className="hero-grid absolute inset-0" />
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(420px circle at var(--lx, 72%) var(--ly, 38%), rgba(139,61,255,0.16), transparent 60%)",
          }}
        />
      </div>
      <div ref={fieldRef} className="pointer-events-none absolute inset-0" aria-hidden="true">
        <HeroField reduced={reduced} />
      </div>

      <div className="relative z-10 mx-auto grid w-full max-w-[1240px] items-center gap-12 px-5 pt-16 pb-20 sm:px-8 lg:grid-cols-[minmax(0,1.05fr)_minmax(320px,0.95fr)] lg:pt-20 lg:pb-24">
        <div className="@container min-w-0 max-w-xl">
          <p className="rise-in font-mono text-[0.72rem] tracking-[0.22em] text-cyan uppercase">
            {project.NETWORK} · Observatory
          </p>
          <h1 className="rise-in delay-1 mt-4 font-display text-[clamp(1.85rem,12.2cqi,6rem)] leading-[0.82] font-extrabold tracking-[-0.035em] text-silver uppercase">
            <span className="block">{lead}</span>
            {rest ? <span className="metal-word block">{rest}</span> : null}
          </h1>
          <p className="rise-in delay-2 mt-5 inline-flex items-center gap-2 rounded-full border border-cyan/40 bg-cyan/10 px-3 py-1 font-mono text-sm text-cyan">
            <span className="size-1.5 rounded-full bg-cyan shadow-[0_0_10px_#35dfff]" />
            {project.TOKEN_SYMBOL}
          </p>
          <p className="rise-in delay-3 mt-5 text-xl text-silver sm:text-2xl">
            <span className="text-cyan">Ethereum culture.</span> Artificial imagination.
          </p>
          <p className="rise-in delay-4 mt-4 max-w-lg text-base leading-relaxed text-mist sm:text-lg">
            An Ethereum meme token inspired by superintelligence, digital culture, and the possibilities of human–AI collaboration.
          </p>
          <div className="rise-in delay-5 mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <PrimaryLink href="#experience">Explore the Experience</PrimaryLink>
            <PrimaryLink
              href={telegram ?? "#community"}
              external={Boolean(telegram)}
              tone="quiet"
            >
              Join the Community
            </PrimaryLink>
            {buy ? (
              <PrimaryLink href={buy} external>
                Buy {project.TOKEN_SYMBOL}
              </PrimaryLink>
            ) : null}
          </div>
        </div>

        <div
          className="core-in relative mx-auto aspect-square w-full max-w-[560px]"
          onPointerMove={onStageMove}
          onPointerLeave={onStageLeave}
        >
          <div
            ref={stageRef}
            className="absolute inset-0 transition-transform duration-200 ease-out"
            style={{
              transform:
                "rotateX(var(--rx, 0deg)) rotateY(var(--ry, 0deg))",
              transformStyle: "preserve-3d",
            }}
          >
            <div
              className="absolute inset-[8%] rounded-full bg-[radial-gradient(circle,rgba(139,61,255,0.35),rgba(53,223,255,0.05)_42%,transparent_70%)]"
              aria-hidden="true"
            />
            <div
              className="facet-float absolute top-[16%] left-[12%] h-[30%] w-[30%] bg-[linear-gradient(140deg,rgba(139,61,255,0.15),rgba(53,223,255,0.55)_45%,rgba(234,240,255,0.15))] [clip-path:polygon(50%_0%,100%_50%,50%_100%,0%_50%)]"
              aria-hidden="true"
            />
            <div
              className="facet-float absolute right-[10%] bottom-[18%] h-[26%] w-[26%] bg-[linear-gradient(320deg,rgba(53,223,255,0.15),rgba(139,61,255,0.65)_50%,rgba(234,240,255,0.2))] [clip-path:polygon(50%_0%,100%_50%,50%_100%,0%_50%)] [animation-delay:-3s]"
              aria-hidden="true"
            />
            <div
              className="facet-float absolute top-[22%] right-[14%] h-[18%] w-[18%] bg-[linear-gradient(180deg,rgba(234,240,255,0.7),rgba(139,61,255,0.2))] [clip-path:polygon(50%_0%,100%_50%,50%_100%,0%_50%)] [animation-delay:-5s]"
              aria-hidden="true"
            />

            <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full" aria-hidden="true">
              <g className="orbit-spin">
                <ellipse
                  cx="50"
                  cy="50"
                  rx="46"
                  ry="18"
                  fill="none"
                  stroke="rgba(53,223,255,0.7)"
                  strokeWidth="0.35"
                  transform="rotate(20 50 50)"
                />
              </g>
              <g className="orbit-spin-reverse">
                <ellipse
                  cx="50"
                  cy="50"
                  rx="40"
                  ry="27"
                  fill="none"
                  stroke="rgba(139,61,255,0.75)"
                  strokeWidth="0.35"
                  transform="rotate(-28 50 50)"
                />
              </g>
              <circle cx="50" cy="50" r="33" fill="none" stroke="rgba(234,240,255,0.28)" strokeWidth="0.28" />
            </svg>
            <div className="pulse-ring pointer-events-none absolute inset-[4%] rounded-full" aria-hidden="true" />
            <div className="pulse-ring-violet pointer-events-none absolute inset-[2%] rounded-full" aria-hidden="true" />

            <div className="pointer-events-none absolute inset-0" aria-hidden="true">
              {NODES.map((node, index) => (
                <span
                  key={`${node.left}-${node.top}`}
                  ref={(element) => {
                    nodeRefs.current[index] = element;
                  }}
                  className="absolute size-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan shadow-[0_0_10px_#35dfff] transition duration-200"
                  style={{ left: node.left, top: node.top }}
                />
              ))}
            </div>

            <div className="absolute top-1/2 left-1/2 w-[70%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[linear-gradient(160deg,#eaf0ff,#8b3dff_42%,#35dfff)] p-[3px] shadow-[0_0_36px_rgba(139,61,255,0.45)]">
              <BrandLogo
                priority
                alt="Superintelligent Vitalik emblem: a portrait in a violet ring, with a crystal crown and an Ethereum diamond."
                sizes="(max-width: 1024px) 70vw, 420px"
                className="aspect-square h-auto w-full rounded-full"
              />
            </div>
          </div>
          <span className="pointer-events-none absolute top-3 left-3 hidden h-8 w-8 border-t border-l border-cyan/50 lg:block" aria-hidden="true" />
          <span className="pointer-events-none absolute top-3 right-3 hidden h-8 w-8 border-t border-r border-cyan/50 lg:block" aria-hidden="true" />
          <span className="pointer-events-none absolute bottom-3 left-3 hidden h-8 w-8 border-b border-l border-violet/60 lg:block" aria-hidden="true" />
          <span className="pointer-events-none absolute right-3 bottom-3 hidden h-8 w-8 border-r border-b border-violet/60 lg:block" aria-hidden="true" />
          <p className="pointer-events-none absolute -left-1 bottom-6 hidden font-mono text-[0.65rem] tracking-[0.18em] text-mist uppercase lg:block" aria-hidden="true">
            Fig. 01 · Core
          </p>
        </div>
      </div>
    </section>
  );
}
