export function Motif({ name }: { name: string }) {
  const common = "h-14 w-14 text-cyan";
  if (name === "crown") {
    return (
      <svg viewBox="0 0 64 64" className={common} aria-hidden="true">
        <path d="M8 42 L16 22 L26 34 L32 14 L38 34 L48 22 L56 42 Z" fill="none" stroke="currentColor" strokeWidth="1.6" />
        <circle cx="16" cy="20" r="2" fill="#8B3DFF" />
        <circle cx="32" cy="12" r="2" fill="#35DFFF" />
        <circle cx="48" cy="20" r="2" fill="#8B3DFF" />
        <path d="M14 48h36" stroke="rgba(234,240,255,0.6)" strokeWidth="1.4" />
      </svg>
    );
  }
  if (name === "mind") {
    return (
      <svg viewBox="0 0 64 64" className={common} aria-hidden="true">
        <path d="M18 34c0-10 8-16 14-16 4 0 7 2 9 5 4-1 9 2 9 7 4 1 6 6 4 10-2 6-8 8-14 8H24c-6 0-10-4-6-14z" fill="none" stroke="currentColor" strokeWidth="1.5" />
        <rect x="36" y="30" width="12" height="12" fill="none" stroke="#8B3DFF" strokeWidth="1.4" />
        <path d="M39 36h6M42 33v6" stroke="#EAF0FF" strokeWidth="1.2" />
      </svg>
    );
  }
  if (name === "crystal") {
    return (
      <svg viewBox="0 0 64 64" className={common} aria-hidden="true">
        <polygon points="32,6 54,32 32,58 10,32" fill="none" stroke="#8B3DFF" strokeWidth="1.6" />
        <polygon points="32,18 44,32 32,46 20,32" fill="none" stroke="currentColor" strokeWidth="1.3" />
        <path d="M32 6v52M10 32h44" stroke="rgba(234,240,255,0.35)" strokeWidth="1" />
      </svg>
    );
  }
  if (name === "globe") {
    return (
      <svg viewBox="0 0 64 64" className={common} aria-hidden="true">
        <circle cx="32" cy="32" r="20" fill="none" stroke="currentColor" strokeWidth="1.5" />
        <ellipse cx="32" cy="32" rx="8" ry="20" fill="none" stroke="#8B3DFF" strokeWidth="1.2" />
        <path d="M12 32h40M16 22h32M16 42h32" fill="none" stroke="rgba(234,240,255,0.45)" strokeWidth="1" />
      </svg>
    );
  }
  if (name === "hands") {
    return (
      <svg viewBox="0 0 64 64" className={common} aria-hidden="true">
        <path d="M6 40c10-2 16-8 20-16" fill="none" stroke="#8B3DFF" strokeWidth="1.6" />
        <path d="M58 40c-8-1-14-6-18-14" fill="none" stroke="currentColor" strokeWidth="1.6" />
        <circle cx="32" cy="24" r="3" fill="#EAF0FF" />
        <path d="M14 44h8M44 44h8M18 48h4M44 48h4" stroke="rgba(234,240,255,0.55)" strokeWidth="1.2" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 64 64" className={common} aria-hidden="true">
      <path d="M8 46h8l4-14h6l3 14h8l4-22h6l3 22h8" fill="none" stroke="currentColor" strokeWidth="1.5" />
      <path d="M6 50h52" stroke="rgba(234,240,255,0.4)" strokeWidth="1" />
      <circle cx="20" cy="18" r="1.6" fill="#8B3DFF" />
      <circle cx="40" cy="14" r="1.6" fill="#35DFFF" />
    </svg>
  );
}
