import {
  project,
  type Allocation,
  type OfficialChannel,
} from "@/config/project";

export function httpUrl(value: string): string | null {
  const trimmed = value.trim();
  if (!trimmed) return null;
  try {
    const url = new URL(trimmed);
    if (url.protocol !== "https:" && url.protocol !== "http:") return null;
    return url.toString();
  } catch {
    return null;
  }
}

export function announced(value: string): string {
  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed : "Not announced";
}

export function canBuy(): boolean {
  return project.LAUNCH_STATUS === "live" && httpUrl(project.BUY_URL) !== null;
}

export function buyHref(): string | null {
  return canBuy() ? httpUrl(project.BUY_URL) : null;
}

export function tradingAnnounced(): boolean {
  return canBuy() && project.CONTRACT_ADDRESS.trim().length > 0;
}

export function explorerHref(): string | null {
  return httpUrl(project.EXPLORER_URL);
}

export function chartHref(): string | null {
  return httpUrl(project.CHART_URL);
}

export function telegramHref(): string | null {
  return httpUrl(project.TELEGRAM_URL);
}

export type PublicChannel = { label: string; href: string };

export function channels(): PublicChannel[] {
  const items: PublicChannel[] = [];
  const telegram = telegramHref();
  const x = httpUrl(project.X_URL);
  if (telegram) items.push({ label: "Telegram", href: telegram });
  if (x) items.push({ label: "X", href: x });
  for (const channel of project.OTHER_CHANNELS as OfficialChannel[]) {
    const href = httpUrl(channel.url);
    const label = channel.label.trim();
    if (href && label) items.push({ label, href });
  }
  return items;
}

export function allocationView(items: Allocation[] = project.ALLOCATIONS) {
  if (items.length === 0) return null;
  const invalid = items.some(
    (item) =>
      item.label.trim().length === 0 ||
      !Number.isFinite(item.percent) ||
      item.percent < 0,
  );
  if (invalid) return null;
  const total = items.reduce((sum, item) => sum + item.percent, 0);
  if (total <= 0) return null;
  return {
    items,
    total,
    balanced: Math.abs(total - 100) <= 0.5,
  };
}

export const NAV_LINKS = [
  { id: "experience", label: "Experience" },
  { id: "token", label: "Token" },
  { id: "how-to-buy", label: "How to Buy" },
  { id: "community", label: "Community" },
] as const;
