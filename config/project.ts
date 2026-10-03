/**
 * Public project facts. Edit this file only.
 *
 * Unknown values stay null. Do not substitute 0, an empty string, or a sample
 * number. A buy tax of 0% is published only when the token actually charges no tax.
 *
 * Trading is live only when LAUNCH_STATUS is "live" and BUY_URL is a real http(s)
 * link. A contract address alone does not mean trading has started.
 *
 * TOTAL_SUPPLY is the whole-token supply as a decimal string, such as "1000000000".
 * Allocation percent strings are exact, such as "40" or "12.5".
 * SITE_ORIGIN is the public https origin used for share metadata, such as
 * "https://example.com". Leave it null until that domain exists.
 */

export type TaxDetail = {
  /** Exact percent. 5 means 5%. Use 0 only when the token charges no tax. */
  percent: number;
  /** Initial rate, later rate, trigger, or remaining admin power, when relevant. */
  note: string | null;
};

export type AllocationItem = {
  label: string;
  percent: string;
  purpose: string;
  vesting: string | null;
  wallet: string | null;
  walletUrl: string | null;
};

export type LiquidityDetail = {
  dex: string | null;
  pool: string | null;
  status: "locked" | "burned" | "unlocked" | "partial" | "unannounced";
  /** Share affected, written as published, such as "80% of the LP tokens". */
  proportion: string | null;
  proportionMeasures: string | null;
  lockProvider: string | null;
  unlockDate: string | null;
  evidenceUrl: string | null;
  note: string | null;
  lastChecked: string | null;
};

export type AdminDetail = {
  arrangement: string | null;
  powers: string | null;
  multisig: string | null;
  timelock: string | null;
  evidenceUrl: string | null;
  lastChecked: string | null;
};

export type OfficialChannel = {
  label: string;
  url: string;
};

export type LaunchStatus = "prelaunch" | "live";
export type AllocationBasis = "launch" | "current";

export type TradingVenue = {
  name: string;
  /** Token-specific http(s) URL that has been checked. */
  url: string;
  /** Optional logo path under public/, or null for a text label. */
  logo: string | null;
  live: boolean;
};

export const project = {
  PROJECT_NAME: "Superintelligent Vitalik",
  TOKEN_SYMBOL: "SIVITALIK",
  DISPLAY_TICKER: "$SIVITALIK",
  NETWORK: "Ethereum Mainnet",
  TOKEN_STANDARD: null as string | null,
  SITE_ORIGIN: null as string | null,
  LAUNCH_STATUS: "prelaunch" as LaunchStatus,
  /** Token contract. Null until the address is confirmed. */
  CONTRACT_ADDRESS: null as string | null,
  POOL_ADDRESS: null as string | null,
  EXPLORER_URL: null as string | null,
  BUY_URL: null as string | null,
  CHART_URL: null as string | null,
  // Replace these with the project profiles. Every X and Telegram link reads these fields.
  TELEGRAM_URL: "https://t.me/SIVitalik" as string | null,
  X_URL: "https://x.com/" as string | null,
  OTHER_CHANNELS: [] as OfficialChannel[],
  TOTAL_SUPPLY: "1000000000" as string | null,
  DECIMALS: null as number | null,
  BUY_TAX: { percent: 0, note: null } as TaxDetail | null,
  SELL_TAX: { percent: 0, note: null } as TaxDetail | null,
  ALLOCATION_BASIS: null as AllocationBasis | null,
  ALLOCATIONS: null as AllocationItem[] | null,
  LIQUIDITY: null as LiquidityDetail | null,
  /** Whole-token liquidity figure. The public page does not list this row. */
  LIQUIDITY_AMOUNT: null as string | null,
  ADMIN: null as AdminDetail | null,
  LAST_CHECKED: null as string | null,
  /** Confirmed token listings only. An empty list hides the venues strip. */
  TRADING_VENUES: [] as TradingVenue[],
};
