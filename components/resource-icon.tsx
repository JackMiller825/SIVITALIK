export function ResourceIcon({ kind }: { kind: "telegram" | "x" | "explorer" | "trade" | "chart" }) {
  if (kind === "telegram") {
    return (
      <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true" fill="currentColor">
        <path d="M21.5 4.4 2.7 11.6c-1.3.5-1.3 1.2-.2 1.5l4.8 1.5 1.9 5.8c.2.7.1.9.8.9.5 0 .7-.2 1-.5l2.6-2.5 5.4 4c1 .6 1.7.3 2-.9l3.5-16.2c.4-1.5-.6-2.2-1.6-1.8Z" />
      </svg>
    );
  }
  if (kind === "x") {
    return (
      <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true" fill="currentColor">
        <path d="M14.7 10.3 22.4 2h-1.8l-6.7 7.2L8.4 2H2.2l8.1 11.2L2.2 22h1.8l7.1-7.6L15.6 22h6.2l-7.1-11.7Zm-2.5 2.7-.8-1.1L4.7 3.3h2.8l5.3 7.2.8 1.1 6.9 9.3h-2.8l-5.5-7.6Z" />
      </svg>
    );
  }
  if (kind === "explorer") {
    return (
      <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.6">
        <path d="m12 3 7 4v5c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V7l7-4Z" />
        <path d="m9 12 2 2 4-4" />
      </svg>
    );
  }
  if (kind === "trade") {
    return (
      <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.6">
        <path d="M7 7h11l-2-2M17 17H6l2 2" />
        <path d="M17 7v4M7 17v-4" />
      </svg>
    );
  }
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.6">
      <path d="M4 19V5M4 19h16" />
      <path d="m7 14 4-4 3 2 5-6" />
    </svg>
  );
}
