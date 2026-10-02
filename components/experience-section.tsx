"use client";

import { Button } from "@/components/ui/button";
import { CORE_MODES, type CoreMode } from "@/lib/core-modes";
import { cn } from "@/lib/utils";
import { useReducedMotion } from "motion/react";
import Image from "next/image";
import { useEffect, useId, useState } from "react";

export function ExperienceSection() {
  const [mode, setMode] = useState<CoreMode>("intelligence");
  const [armed, setArmed] = useState(false);
  const reduced = useReducedMotion();
  const baseId = useId();
  const active = CORE_MODES.find((item) => item.id === mode) ?? CORE_MODES[0];
  const scenes = armed ? CORE_MODES : [active];

  useEffect(() => {
    const timeout = window.setTimeout(() => setArmed(true), 900);
    return () => window.clearTimeout(timeout);
  }, []);

  function onKeyDown(event: React.KeyboardEvent<HTMLDivElement>) {
    const keys = ["ArrowRight", "ArrowLeft", "ArrowDown", "ArrowUp", "Home", "End"];
    if (!keys.includes(event.key)) return;
    event.preventDefault();
    const index = CORE_MODES.findIndex((item) => item.id === mode);
    let next = index;
    if (event.key === "ArrowRight" || event.key === "ArrowDown") next = (index + 1) % CORE_MODES.length;
    if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
      next = (index - 1 + CORE_MODES.length) % CORE_MODES.length;
    }
    if (event.key === "Home") next = 0;
    if (event.key === "End") next = CORE_MODES.length - 1;
    const selected = CORE_MODES[next];
    setMode(selected.id);
    document.getElementById(`${baseId}-${selected.id}`)?.focus();
  }

  return (
    <section id="experience" className="section-scroll relative bg-[#070a18] py-20 sm:py-28">
      <div className="mx-auto max-w-[1180px] px-5 sm:px-8">
        <p className="font-mono text-[0.72rem] tracking-[0.18em] text-cyan uppercase">Experience</p>
        <h2 className="mt-3 max-w-3xl font-display text-[clamp(2.6rem,6vw,4.8rem)] leading-[0.9] font-bold text-silver">
          Four readings
        </h2>
        <p className="mt-4 max-w-2xl text-lg leading-relaxed text-mist">
          Choose a scene. Each illustration is a still artwork, shown in full.
        </p>

        <div className="mt-10 grid items-start gap-6 lg:grid-cols-[minmax(220px,280px)_minmax(0,1fr)] lg:gap-10">
          <div>
            <div
              role="tablist"
              aria-label="Core readings"
              aria-orientation="horizontal"
              className="grid grid-cols-2 gap-2 lg:grid-cols-1"
              onKeyDown={onKeyDown}
            >
              {CORE_MODES.map((item, index) => {
                const selected = item.id === mode;
                return (
                  <Button
                    key={item.id}
                    id={`${baseId}-${item.id}`}
                    type="button"
                    role="tab"
                    aria-selected={selected}
                    aria-controls={`${baseId}-panel`}
                    tabIndex={selected ? 0 : -1}
                    variant="outline"
                    className={cn(
                      "h-12 w-full cursor-pointer justify-start rounded-2xl border px-4 text-left text-base focus-visible:ring-[#35dfff]",
                      selected
                        ? "border-cyan/70 bg-cyan/10 text-silver shadow-[0_0_24px_rgba(53,223,255,0.14)]"
                        : "border-white/10 bg-white/[0.03] text-mist hover:border-white/30 hover:text-silver",
                    )}
                    onClick={() => setMode(item.id)}
                  >
                    <span className="mr-3 font-mono text-xs text-cyan">0{index + 1}</span>
                    {item.label}
                  </Button>
                );
              })}
            </div>
          </div>

          <div className="grid items-center gap-5 md:grid-cols-[minmax(0,1.15fr)_minmax(200px,0.72fr)]">
            <div className="overflow-hidden rounded-[28px] border border-white/15 bg-[#070b1c]">
              <div className="relative aspect-[4/3] bg-[#070b1c]">
                {scenes.map((item) => {
                  const selected = item.id === mode;
                  return (
                    <Image
                      key={item.id}
                      src={item.image.src}
                      alt={item.alt}
                      width={item.image.width}
                      height={item.image.height}
                      sizes="(max-width: 768px) 100vw, 640px"
                      priority={item.id === "intelligence"}
                      loading={item.id === "intelligence" ? undefined : "lazy"}
                      aria-hidden={!selected}
                      className={cn(
                        "absolute inset-0 h-full w-full object-contain",
                        reduced ? "transition-none" : "transition-opacity duration-500 ease-out",
                        selected ? "opacity-100" : "pointer-events-none opacity-0",
                      )}
                    />
                  );
                })}
              </div>
            </div>
            <div
              role="tabpanel"
              id={`${baseId}-panel`}
              aria-labelledby={`${baseId}-${active.id}`}
            >
              <h3 className="font-display text-4xl leading-none font-bold text-silver sm:text-5xl">{active.label}</h3>
              <p className="mt-3 text-lg leading-relaxed text-mist" aria-live="polite">
                {active.copy}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
