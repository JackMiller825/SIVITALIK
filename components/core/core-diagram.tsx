import { CORE_MODES, type CoreMode } from "@/lib/core-modes";
import { cn } from "@/lib/utils";

function Intelligence() {
  const rings = [112, 150, 184];
  return (
    <>
      {rings.map((radius) => (
        <circle key={radius} cx="200" cy="200" r={radius} fill="none" stroke="rgba(53,223,255,0.45)" strokeWidth="1.2" />
      ))}
      {rings.flatMap((radius, ring) =>
        Array.from({ length: 8 + ring * 2 }, (_, index) => {
          const angle = (index / (8 + ring * 2)) * Math.PI * 2 + ring * 0.4;
          const x = 200 + Math.cos(angle) * radius;
          const y = 200 + Math.sin(angle) * radius;
          return <circle key={`${radius}-${index}`} cx={x} cy={y} r={ring === 2 ? 3.2 : 2.4} fill="#35DFFF" />;
        }),
      )}
      <path d="M200 88 L248 150 L152 150 Z" fill="none" stroke="#8B3DFF" strokeWidth="1.2" />
      <path d="M88 200 L150 248 L150 152 Z" fill="none" stroke="rgba(234,240,255,0.55)" strokeWidth="1" />
      <path d="M312 200 L250 152 L250 248 Z" fill="none" stroke="rgba(234,240,255,0.55)" strokeWidth="1" />
    </>
  );
}

function Ethereum() {
  return (
    <>
      <polygon points="200,62 338,200 200,338 62,200" fill="none" stroke="#8B3DFF" strokeWidth="1.6" />
      <polygon points="200,104 296,200 200,296 104,200" fill="none" stroke="#35DFFF" strokeWidth="1.2" />
      <polygon points="200,146 254,200 200,254 146,200" fill="none" stroke="rgba(234,240,255,0.7)" strokeWidth="1" />
      {[
        [62, 200],
        [200, 62],
        [338, 200],
        [200, 338],
      ].map(([x, y]) => (
        <rect key={`${x}-${y}`} x={x - 8} y={y - 8} width="16" height="16" fill="none" stroke="#35DFFF" strokeWidth="1.4" />
      ))}
      <path d="M200 62 V146 M338 200 H254 M200 338 V254 M62 200 H146" stroke="rgba(53,223,255,0.45)" strokeWidth="1" />
    </>
  );
}

function Humanity() {
  return (
    <>
      <path
        d="M28 230 C 70 120, 120 150, 168 200"
        fill="none"
        stroke="#8B3DFF"
        strokeWidth="1.8"
      />
      <path
        d="M36 168 C 90 80, 130 110, 170 176"
        fill="none"
        stroke="rgba(139,61,255,0.45)"
        strokeWidth="1"
      />
      <path d="M372 150 H300 L270 176 H232 L210 200" fill="none" stroke="#35DFFF" strokeWidth="1.8" />
      <path d="M372 246 H312 L286 220 H236" fill="none" stroke="rgba(53,223,255,0.5)" strokeWidth="1" />
      {[40, 78, 116, 154].map((x, index) => (
        <circle key={x} cx={x} cy={210 - index * 12} r="3" fill="#C9A6FF" />
      ))}
      {[300, 332, 364].map((x) => (
        <rect key={x} x={x} y="144" width="7" height="7" fill="#35DFFF" />
      ))}
      <circle cx="200" cy="200" r="18" fill="none" stroke="#EAF0FF" strokeWidth="1.4" />
    </>
  );
}

function Community() {
  return (
    <>
      <circle cx="200" cy="200" r="168" fill="none" stroke="rgba(53,223,255,0.7)" strokeWidth="1.4" />
      <ellipse cx="200" cy="200" rx="70" ry="168" fill="none" stroke="rgba(139,61,255,0.55)" strokeWidth="1" />
      <ellipse cx="200" cy="200" rx="168" ry="64" fill="none" stroke="rgba(234,240,255,0.4)" strokeWidth="1" />
      <ellipse cx="200" cy="200" rx="168" ry="120" fill="none" stroke="rgba(53,223,255,0.28)" strokeWidth="1" />
      {Array.from({ length: 18 }, (_, index) => {
        const angle = (index / 18) * Math.PI * 2;
        const x = 200 + Math.cos(angle) * 168;
        const y = 200 + Math.sin(angle) * 168;
        return <circle key={index} cx={x} cy={y} r="3" fill={index % 3 === 0 ? "#8B3DFF" : "#35DFFF"} />;
      })}
    </>
  );
}

const DRAWINGS = {
  intelligence: Intelligence,
  ethereum: Ethereum,
  humanity: Humanity,
  community: Community,
};

export function CoreDiagram({ mode }: { mode: CoreMode }) {
  return (
    <div className="relative h-full w-full">
      {CORE_MODES.map((item) => {
        const Drawing = DRAWINGS[item.id];
        return (
          <svg
            key={item.id}
            viewBox="0 0 400 400"
            className={cn(
              "absolute inset-0 h-full w-full transition-opacity duration-700",
              mode === item.id ? "opacity-100" : "opacity-0",
            )}
          >
            <Drawing />
          </svg>
        );
      })}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_36%,rgba(7,11,28,0.35)_100%)]" />
    </div>
  );
}
