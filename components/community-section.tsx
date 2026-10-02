"use client";

import { channels } from "@/lib/project";
import { useReducedMotion } from "motion/react";
import { useEffect, useRef } from "react";

type Star = {
  x: number;
  y: number;
  z: number;
  sx: number;
  sy: number;
};

export function CommunitySection() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reduced = useReducedMotion();
  const links = channels();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext("2d");
    if (!context) return;
    const parent = canvas.parentElement;
    if (!parent) return;

    const mobile = window.matchMedia("(max-width: 767px)").matches;
    const count = mobile ? 28 : 56;
    const stars: Star[] = Array.from({ length: count }, (_, index) => {
      const phi = Math.acos(1 - (2 * (index + 0.5)) / count);
      const theta = Math.PI * (1 + Math.sqrt(5)) * index;
      return {
        x: Math.cos(theta) * Math.sin(phi),
        y: Math.cos(phi),
        z: Math.sin(theta) * Math.sin(phi),
        sx: Math.random(),
        sy: Math.random(),
      };
    });

    let frame = 0;
    let running = true;
    const started = performance.now();

    function resize() {
      const rect = parent!.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, mobile ? 1.15 : 1.4);
      canvas!.width = Math.max(1, Math.floor(rect.width * dpr));
      canvas!.height = Math.max(1, Math.floor(rect.height * dpr));
      canvas!.style.width = `${rect.width}px`;
      canvas!.style.height = `${rect.height}px`;
      context!.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    function draw(now: number) {
      const rect = parent!.getBoundingClientRect();
      const width = rect.width;
      const height = rect.height;
      context!.clearRect(0, 0, width, height);
      const progress = reduced ? 1 : Math.min(1, (now - started) / 2600);
      const ease = 1 - Math.pow(1 - progress, 3);
      const spin = reduced ? 0 : now * 0.00008;
      const radius = Math.min(width, height) * 0.34;
      const points = stars.map((star) => {
        const cos = Math.cos(spin);
        const sin = Math.sin(spin);
        const x = star.x * cos - star.z * sin;
        const z = star.x * sin + star.z * cos;
        const tx = width / 2 + x * radius;
        const ty = height / 2 + star.y * radius * 0.72;
        const sx = star.sx * width;
        const sy = star.sy * height;
        return {
          x: sx + (tx - sx) * ease,
          y: sy + (ty - sy) * ease,
          z,
        };
      });

      for (let i = 0; i < points.length; i += 1) {
        for (let j = i + 1; j < points.length; j += 1) {
          const a = points[i];
          const b = points[j];
          if (a.z < -0.15 && b.z < -0.15) continue;
          const dist = Math.hypot(a.x - b.x, a.y - b.y);
          if (dist > radius * 0.42) continue;
          context!.strokeStyle = `rgba(53, 223, 255, ${0.12 * (1 - dist / (radius * 0.42))})`;
          context!.beginPath();
          context!.moveTo(a.x, a.y);
          context!.lineTo(b.x, b.y);
          context!.stroke();
        }
      }

      for (const point of points) {
        const depth = (point.z + 1) / 2;
        context!.fillStyle = depth > 0.55 ? "rgba(234,240,255,0.9)" : "rgba(139,61,255,0.8)";
        context!.beginPath();
        context!.arc(point.x, point.y, 1.2 + depth * 1.6, 0, Math.PI * 2);
        context!.fill();
      }
    }

    const observer = new IntersectionObserver(([entry]) => {
      running = entry.isIntersecting && document.visibilityState === "visible";
    });
    observer.observe(parent);
    const onVisibility = () => {
      running = document.visibilityState === "visible";
    };
    document.addEventListener("visibilitychange", onVisibility);
    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(parent);
    resize();
    draw(started);

    function loop(now: number) {
      frame = requestAnimationFrame(loop);
      if (!running || reduced) return;
      draw(now);
    }
    if (!reduced) frame = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      resizeObserver.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [reduced]);

  return (
    <section id="community" className="section-scroll relative isolate min-h-[78vh] overflow-hidden bg-[#050818] py-24 sm:py-32">
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" aria-hidden="true" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(4,6,21,0.2),rgba(4,6,21,0.78)_62%,#040615)]" />
      <div className="relative z-10 mx-auto max-w-3xl px-5 sm:px-8">
        <div className="rounded-[28px] border border-white/12 bg-[#040615]/75 px-6 py-10 text-center shadow-[0_0_80px_rgba(139,61,255,0.16)] backdrop-blur-md sm:px-10">
          <p className="font-mono text-[0.72rem] tracking-[0.22em] text-cyan uppercase">04 — Community</p>
          <h2 className="mt-3 font-display text-[clamp(2.7rem,7vw,5rem)] leading-[0.88] font-bold text-silver">
            Join the Constellation
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-lg leading-relaxed text-mist">
            Explore the narrative. Share your ideas. Help shape the community.
          </p>
          {links.length > 0 ? (
            <ul className="mt-8 grid gap-3 text-left sm:grid-cols-2">
              {links.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="focus-ring group flex min-h-16 items-center justify-between rounded-2xl border border-white/15 bg-white/[0.04] px-5 py-4 transition duration-200 hover:border-cyan/60 hover:bg-cyan/10"
                  >
                    <span className="font-display text-3xl leading-none text-silver">{link.label}</span>
                    <span className="font-mono text-[0.68rem] tracking-[0.16em] text-mist uppercase transition-colors duration-200 group-hover:text-cyan">
                      Open
                    </span>
                    <span className="sr-only"> (opens in a new tab)</span>
                  </a>
                </li>
              ))}
            </ul>
          ) : null}
        </div>
      </div>
    </section>
  );
}
