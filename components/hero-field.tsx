"use client";

import { useEffect, useRef } from "react";

type Node = { x: number; y: number; vx: number; vy: number; phase: number };

export function HeroField({ reduced }: { reduced: boolean | null }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext("2d");
    if (!context) return;

    const parent = canvas.parentElement;
    if (!parent) return;

    let frame = 0;
    let running = true;
    const nodes: Node[] = [];
    const mobile = window.matchMedia("(max-width: 767px)").matches;
    const count = mobile ? 18 : 34;

    function seed(width: number, height: number) {
      nodes.length = 0;
      for (let index = 0; index < count; index += 1) {
        nodes.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.18,
          vy: (Math.random() - 0.5) * 0.18,
          phase: Math.random(),
        });
      }
    }

    function resize() {
      const rect = parent!.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, mobile ? 1.15 : 1.5);
      canvas!.width = Math.max(1, Math.floor(rect.width * dpr));
      canvas!.height = Math.max(1, Math.floor(rect.height * dpr));
      canvas!.style.width = `${rect.width}px`;
      canvas!.style.height = `${rect.height}px`;
      context!.setTransform(dpr, 0, 0, dpr, 0, 0);
      if (nodes.length === 0) seed(rect.width, rect.height);
    }

    function draw(time: number) {
      const rect = parent!.getBoundingClientRect();
      const width = rect.width;
      const height = rect.height;
      context!.clearRect(0, 0, width, height);
      const pulse = (time * 0.00012) % 1;

      if (!reduced) {
        for (const node of nodes) {
          node.x += node.vx;
          node.y += node.vy;
          if (node.x < 0 || node.x > width) node.vx *= -1;
          if (node.y < 0 || node.y > height) node.vy *= -1;
        }
      }

      const reach = mobile ? 120 : 160;
      for (let i = 0; i < nodes.length; i += 1) {
        for (let j = i + 1; j < nodes.length; j += 1) {
          const a = nodes[i];
          const b = nodes[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dist = Math.hypot(dx, dy);
          if (dist > reach) continue;
          const near = 1 - dist / reach;
          const edgePhase = (a.phase + b.phase) / 2;
          const wave = Math.max(0, 1 - Math.abs(edgePhase - pulse) * 8);
          context!.strokeStyle = `rgba(53, 223, 255, ${0.04 + near * 0.12 + wave * 0.18})`;
          context!.lineWidth = 1;
          context!.beginPath();
          context!.moveTo(a.x, a.y);
          context!.lineTo(b.x, b.y);
          context!.stroke();
        }
      }

      for (const node of nodes) {
        const wave = Math.max(0, 1 - Math.abs(node.phase - pulse) * 6);
        context!.fillStyle = wave > 0.4 ? "rgba(139, 61, 255, 0.9)" : "rgba(234, 240, 255, 0.75)";
        context!.beginPath();
        context!.arc(node.x, node.y, wave > 0.4 ? 2.3 : 1.5, 0, Math.PI * 2);
        context!.fill();
      }
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        running = entry.isIntersecting && document.visibilityState === "visible";
      },
      { threshold: 0.01 },
    );
    observer.observe(parent);

    const onVisibility = () => {
      running = document.visibilityState === "visible";
    };
    document.addEventListener("visibilitychange", onVisibility);
    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(parent);
    resize();
    draw(0);

    let last = 0;
    function loop(time: number) {
      frame = requestAnimationFrame(loop);
      if (!running || reduced) return;
      if (time - last < 32) return;
      last = time;
      draw(time);
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
    <canvas
      ref={canvasRef}
      className="absolute inset-0 h-full w-full"
      aria-hidden="true"
    />
  );
}
