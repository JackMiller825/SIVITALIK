import { project, type AllocationItem, type OfficialChannel, type TradingVenue } from "@/config/project";
import { sumPercents, tokenShare } from "@/lib/amount";

export function httpUrl(value: string | null | undefined): string | null {
  if (!value) return null;
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

export function publicSiteOrigin(requestHost?: string | null, requestProto?: string | null): string | null {
  if (project.SITE_ORIGIN) {
    try {
      const url = new URL(project.SITE_ORIGIN);
      const local = url.hostname === "localhost" || url.hostname === "127.0.0.1" || url.hostname === "::1";
      if (url.protocol === "https:" && !local) return url.origin;
    } catch {
      return null;
    }
    return null;
  }
  if (!requestHost) return null;
  const hostname = requestHost.split(":")[0];
  if (hostname === "localhost" || hostname === "127.0.0.1" || hostname === "::1") return null;
  const scheme = requestProto === "http" ? "http" : "https";
  return `${scheme}://${requestHost}`;
}

export function canBuy(): boolean {
  return project.LAUNCH_STATUS === "live" && httpUrl(project.BUY_URL) !== null;
}

export function buyHref(): string | null {
  return canBuy() ? httpUrl(project.BUY_URL) : null;
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

export function xHref(): string | null {
  return httpUrl(project.X_URL);
}

function hasProfilePath(value: string | null): boolean {
  if (!value) return false;
  try {
    const path = new URL(value).pathname.replace(/\/+$/, "");
    return path.length > 0;
  } catch {
    return false;
  }
}

export type PublicChannel = { label: string; href: string };

export function socialLinks(): PublicChannel[] {
  const items: PublicChannel[] = [];
  const telegram = telegramHref();
  const x = xHref();
  if (telegram) items.push({ label: "Telegram", href: telegram });
  if (x) items.push({ label: "X", href: x });
  return items;
}

export type ResourceLink = PublicChannel & { kind: "telegram" | "x" | "explorer" | "trade" | "chart" };

export function resourceLinks(): ResourceLink[] {
  const items: ResourceLink[] = [];
  const telegram = telegramHref();
  const x = xHref();
  const explorer = explorerHref();
  const trade = buyHref();
  const chart = chartHref();
  if (telegram) items.push({ kind: "telegram", label: "Telegram", href: telegram });
  if (x) items.push({ kind: "x", label: "X", href: x });
  if (explorer) items.push({ kind: "explorer", label: "Etherscan", href: explorer });
  if (trade) items.push({ kind: "trade", label: "Trading page", href: trade });
  if (chart) items.push({ kind: "chart", label: "Market data", href: chart });
  return items;
}

export function confirmedVenues(): Array<TradingVenue & { href: string }> {
  return project.TRADING_VENUES.flatMap((venue) => {
    const href = httpUrl(venue.url);
    const name = venue.name.trim();
    if (!venue.live || !href || !name) return [];
    return [{ ...venue, name, href }];
  });
}

export function channels(): PublicChannel[] {
  const items: PublicChannel[] = [...socialLinks()];
  for (const channel of project.OTHER_CHANNELS as OfficialChannel[]) {
    const href = httpUrl(channel.url);
    const label = channel.label.trim();
    if (href && label) items.push({ label, href });
  }
  return items;
}

export function launchAction(): { href: string; label: string; external: boolean } {
  const buy = buyHref();
  if (buy) {
    return { href: buy, label: `Buy ${project.DISPLAY_TICKER}`, external: true };
  }
  return { href: "#tokenomics", label: "Launch Details", external: false };
}

export function secondaryAction(): { href: string; label: string; external: boolean } {
  const telegram = telegramHref();
  if (telegram && hasProfilePath(telegram)) {
    return { href: telegram, label: "Join Telegram", external: true };
  }
  return { href: "#experience", label: "Explore the Experience", external: false };
}

export function allocationSummary(items: AllocationItem[] | null = project.ALLOCATIONS) {
  if (!items || items.length === 0) return null;
  const invalid = items.some(
    (item) => item.label.trim().length === 0 || !/^\d+(\.\d+)?$/.test(item.percent.trim()),
  );
  if (invalid) return null;
  const total = sumPercents(items.map((item) => item.percent));
  if (!total) return null;
  const supply = project.TOTAL_SUPPLY;
  return {
    items: items.map((item) => ({
      ...item,
      amount: supply ? tokenShare(supply, item.percent) : null,
    })),
    total,
    balanced: total === "100",
    basis: project.ALLOCATION_BASIS,
  };
}

export function taxLabel(kind: "buy" | "sell"): string | null {
  const tax = kind === "buy" ? project.BUY_TAX : project.SELL_TAX;
  if (!tax || !Number.isFinite(tax.percent) || tax.percent < 0) return null;
  return `${tax.percent}%`;
}

export const NAV_LINKS = [
  { id: "top", label: "Home" },
  { id: "about", label: "About" },
  { id: "how-to-buy", label: "How to Buy" },
  { id: "tokenomics", label: "Tokenomics" },
] as const;
