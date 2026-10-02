/** Exact decimal helpers. Amounts are floored to whole tokens. */

type Decimal = { digits: bigint; scale: bigint };

export function parseDecimal(value: string): Decimal | null {
  const trimmed = value.trim();
  if (!/^\d+(\.\d+)?$/.test(trimmed)) return null;
  const [whole, fraction = ""] = trimmed.split(".");
  return {
    digits: BigInt(whole + fraction),
    scale: 10n ** BigInt(fraction.length),
  };
}

export function formatDecimal(digits: bigint, scale: bigint): string {
  const whole = digits / scale;
  const remainder = digits % scale;
  if (remainder === 0n) return whole.toString();
  const width = scale.toString().length - 1;
  const fraction = remainder.toString().padStart(width, "0").replace(/0+$/, "");
  return `${whole.toString()}.${fraction}`;
}

export function sumPercents(values: string[]): string | null {
  const parsed = values.map(parseDecimal);
  if (parsed.some((item) => item === null)) return null;
  const known = parsed as Decimal[];
  const scale = known.reduce((max, item) => (item.scale > max ? item.scale : max), 1n);
  const sum = known.reduce((total, item) => total + item.digits * (scale / item.scale), 0n);
  return formatDecimal(sum, scale);
}

/** Whole tokens allocated to a category: floor(supply * percent / 100). */
export function tokenShare(supply: string, percent: string): string | null {
  const base = parseDecimal(supply);
  const share = parseDecimal(percent);
  if (!base || !share) return null;
  const denominator = base.scale * share.scale * 100n;
  if (denominator === 0n) return null;
  return ((base.digits * share.digits) / denominator).toString();
}

export function groupInteger(value: string): string {
  const trimmed = value.trim();
  if (!/^\d+(\.\d+)?$/.test(trimmed)) return value;
  const [whole, fraction] = trimmed.split(".");
  const grouped = whole.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return fraction ? `${grouped}.${fraction}` : grouped;
}
