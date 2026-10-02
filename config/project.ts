/**
 * Public project facts. This is the only place to edit them.
 *
 * Leave unknown strings empty. Do not add guessed prices, holders, audits,
 * listings, locks, or partnerships. The site treats empty fields as unannounced.
 *
 * Buy controls turn on only when LAUNCH_STATUS is "live" and BUY_URL is an
 * http(s) link. Set both after the trading page is verified.
 */

export type Allocation = {
  /** Public label, for example "Liquidity". */
  label: string;
  /** Exact share from 0 to 100. Do not invent a number to complete a chart. */
  percent: number;
};

export type OfficialChannel = {
  label: string;
  url: string;
};

export type LaunchStatus = "prelaunch" | "live";

export const project = {
  PROJECT_NAME: "Superintelligent Vitalik",
  TOKEN_SYMBOL: "$SIVITALIK",
  NETWORK: "Ethereum",
  CONTRACT_ADDRESS: "",
  EXPLORER_URL: "",
  BUY_URL: "",
  CHART_URL: "",
  TELEGRAM_URL: "",
  X_URL: "",
  TOTAL_SUPPLY: "",
  BUY_TAX: "",
  SELL_TAX: "",
  ALLOCATIONS: [] as Allocation[],
  LIQUIDITY_DETAILS: "",
  ADMIN_CONTROLS: "",
  LAUNCH_STATUS: "prelaunch" as LaunchStatus,
  OTHER_CHANNELS: [] as OfficialChannel[],
};
