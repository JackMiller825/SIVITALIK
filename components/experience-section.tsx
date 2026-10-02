"use client";

import { CoreDiagram } from "@/components/core/core-diagram";
import { SceneBoundary } from "@/components/scene-boundary";
import { BrandLogo } from "@/components/brand-logo";
import { Button } from "@/components/ui/button";
import { CORE_MODES, type CoreMode } from "@/lib/core-modes";
import { cn } from "@/lib/utils";
import { useReducedMotion } from "motion/react";
import dynamic from "next/dynamic";
import { useEffect, useId, useState } from "react";

const ObservatoryScene = dynamic(() => import("@/components/core/observatory-scene"), {
  ssr: false,
});

function hasWebGL() {
  try {
    const canvas = document.createElement("canvas");
    return Boolean(canvas.getContext("webgl2") || canvas.getContext("webgl"));
  } catch {
    return false;
  }
}

export function ExperienceSection() {
  const [mode, setMode] = useState<CoreMode>("intelligence");
  const [enable3d, setEnable3d] = useState(false);
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);
  const reduced = useReducedMotion();
  const baseId = useId();
  const active = CORE_MODES.find((item) => item.id === mode) ?? CORE_MODES[0];
  const live = enable3d && ready && !failed && !reduced;

  useEffect(() => {
    if (reduced) return;
    if (!hasWebGL()) return;
    const start = () => setEnable3d(true);
    const browser = window as Window & {
      requestIdleCallback?: (callback: () => void) => number;
      cancelIdleCallback?: (id: number) => void;
    };
    if (browser.requestIdleCallback) {
      const id = browser.requestIdleCallback(start);
      return () => browser.cancelIdleCallback?.(id);
    }
    const id = window.setTimeout(start, 450);
    return () => window.clearTimeout(id);
  }, [reduced]);

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
        <p className="font-mono text-[0.72rem] tracking-[0.22em] text-cyan uppercase">01 — Experience</p>
        <h2 className="mt-3 max-w-3xl font-display text-[clamp(2.6rem,6vw,4.8rem)] leading-[0.9] font-bold text-silver">
          The Superintelligence Core
        </h2>
        <p className="mt-4 max-w-2xl text-lg leading-relaxed text-mist">
          Four readings of one system. Choose a control to change the scene.
        </p>

        <div className="mt-10 grid items-start gap-6 lg:grid-cols-[minmax(240px,300px)_minmax(0,1fr)] lg:gap-10">
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
                        : "border-white/10 bg-white/[0.03] text-mist hover:border-white/30 hover:bg-white/[0.05] hover:text-silver",
                    )}
                    onClick={() => setMode(item.id)}
                  >
                    <span className="mr-3 font-mono text-xs text-cyan">0{index + 1}</span>
                    {item.label}
                  </Button>
                );
              })}
            </div>
            <p className="mt-3 font-mono text-[0.7rem] tracking-wide text-mist">
              Click, tap, or use the arrow keys.
            </p>
          </div>

          <div>
            <div className="overflow-hidden rounded-[28px] border border-white/15 bg-[#070b1c] shadow-[inset_0_1px_0_rgba(255,255,255,0.16),0_30px_80px_rgba(0,0,0,0.35)]">
              <div className="flex items-center justify-between gap-3 border-b border-white/10 px-4 py-3 font-mono text-[0.68rem] tracking-[0.16em] text-mist uppercase">
                <span>Core</span>
                <span className="text-cyan">{active.label}</span>
                <span>{live ? "Live field" : "Still diagram"}</span>
              </div>
              <div className="relative aspect-square sm:aspect-[5/4]" aria-hidden="true">
                <div
                  className={cn(
                    "absolute inset-0 transition-opacity duration-700",
                    live ? "opacity-0" : "opacity-100",
                  )}
                >
                  <CoreDiagram mode={mode} />
                </div>
                {enable3d && !failed && !reduced ? (
                  <SceneBoundary
                    onError={() => {
                      setFailed(true);
                      setReady(false);
                    }}
                  >
                    <div
                      className={cn(
                        "absolute inset-0 transition-opacity duration-700",
                        live ? "opacity-100" : "opacity-0",
                      )}
                    >
                      <ObservatoryScene mode={mode} onReady={() => setReady(true)} />
                    </div>
                  </SceneBoundary>
                ) : null}
                <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
                  <div className="w-[24%] max-w-[148px] rounded-full bg-[linear-gradient(160deg,#eaf0ff,#8b3dff_46%,#35dfff)] p-[2px] shadow-[0_0_28px_rgba(139,61,255,0.4)]">
                    <BrandLogo
                      alt=""
                      sizes="148px"
                      className="aspect-square h-auto w-full rounded-full"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div
              role="tabpanel"
              id={`${baseId}-panel`}
              aria-labelledby={`${baseId}-${active.id}`}
              className="mt-5 max-w-2xl"
            >
              <p className="font-mono text-xs tracking-[0.18em] text-cyan uppercase">
                Reading 0{CORE_MODES.findIndex((item) => item.id === mode) + 1} / 04
              </p>
              <h3 className="mt-2 font-display text-4xl leading-none font-bold text-silver sm:text-5xl">
                {active.label}
              </h3>
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
