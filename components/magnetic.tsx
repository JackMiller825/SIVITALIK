"use client";

import { useReducedMotion } from "motion/react";
import { useRef, type ReactNode } from "react";

export function Magnetic({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  function onMove(event: React.PointerEvent<HTMLDivElement>) {
    if (reduced || event.pointerType !== "mouse") return;
    const node = ref.current;
    if (!node) return;
    const rect = node.getBoundingClientRect();
    const x = event.clientX - (rect.left + rect.width / 2);
    const y = event.clientY - (rect.top + rect.height / 2);
    node.style.transform = `translate(${(x * 0.22).toFixed(1)}px, ${(y * 0.28).toFixed(1)}px)`;
  }

  function onLeave() {
    const node = ref.current;
    if (!node) return;
    node.style.transform = "";
  }

  return (
    <div
      ref={ref}
      className="inline-flex transition-transform duration-200 ease-out"
      onPointerMove={onMove}
      onPointerLeave={onLeave}
    >
      {children}
    </div>
  );
}
