"use client";

import { Button } from "@/components/ui/button";
import { project } from "@/config/project";
import {
  allocationView,
  announced,
  chartHref,
  explorerHref,
} from "@/lib/project";
import { useState } from "react";

const SEGMENT_COLORS = ["#8B3DFF", "#35DFFF", "#EAF0FF", "#6d7cff", "#c084fc", "#7ee7f7"];

async function copyText(value: string) {
  try {
    await navigator.clipboard.writeText(value);
    return true;
  } catch {
    try {
      const area = document.createElement("textarea");
      area.value = value;
      area.setAttribute("readonly", "");
      area.style.position = "fixed";
      area.style.left = "-9999px";
      document.body.appendChild(area);
      area.select();
      const ok = document.execCommand("copy");
      area.remove();
      return ok;
    } catch {
      return false;
    }
  }
}

export function TokenSection() {
  const address = project.CONTRACT_ADDRESS.trim();
  const explorer = explorerHref();
  const chart = chartHref();
  const allocation = allocationView();
  const [notice, setNotice] = useState("");
  const [copied, setCopied] = useState(false);

  async function onCopy() {
    const ok = await copyText(address);
    if (ok) {
      setCopied(true);
      setNotice("Contract address copied.");
      window.setTimeout(() => setCopied(false), 2000);
      return;
    }
    setCopied(false);
    setNotice("Could not copy automatically. The full address is shown on the page.");
  }

  const rows: { label: string; value: string }[] = [
    { label: "Name", value: project.PROJECT_NAME },
    { label: "Ticker", value: project.TOKEN_SYMBOL },
    { label: "Network", value: project.NETWORK },
    { label: "Total supply", value: announced(project.TOTAL_SUPPLY) },
    { label: "Buy tax", value: announced(project.BUY_TAX) },
    { label: "Sell tax", value: announced(project.SELL_TAX) },
    { label: "Liquidity", value: announced(project.LIQUIDITY_DETAILS) },
    { label: "Ownership and controls", value: announced(project.ADMIN_CONTROLS) },
  ];

  return (
    <section id="token" className="section-scroll bg-obsidian py-20 sm:py-28">
      <div className="mx-auto max-w-[980px] px-5 sm:px-8">
        <p className="font-mono text-[0.72rem] tracking-[0.22em] text-cyan uppercase">03 — Token</p>
        <h2 className="mt-3 font-display text-[clamp(2.6rem,6vw,4.8rem)] leading-[0.9] font-bold text-silver">
          Know the Token
        </h2>
        <p className="mt-4 max-w-2xl text-lg leading-relaxed text-mist">
          Published details only. Empty fields stay unannounced. Nothing here is an estimate of price, holders, or volume.
        </p>

        <dl className="mt-10 divide-y divide-white/10 overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03]">
          {rows.map((row) => (
            <div key={row.label} className="grid gap-1 px-5 py-4 sm:grid-cols-[minmax(0,220px)_minmax(0,1fr)] sm:gap-4 sm:px-7">
              <dt className="font-mono text-[0.72rem] tracking-[0.16em] text-mist uppercase">{row.label}</dt>
              <dd className="text-base break-words text-silver">{row.value}</dd>
            </div>
          ))}

          <div className="grid gap-3 px-5 py-5 sm:grid-cols-[minmax(0,220px)_minmax(0,1fr)] sm:px-7">
            <dt className="font-mono text-[0.72rem] tracking-[0.16em] text-mist uppercase">Contract</dt>
            <dd className="min-w-0">
              {address ? (
                <div className="flex flex-col gap-3">
                  <code className="block font-mono text-sm break-all text-silver">{address}</code>
                  <div className="flex flex-wrap items-center gap-3">
                    <Button
                      type="button"
                      variant="outline"
                      className="h-11 cursor-pointer rounded-full border-white/20 bg-transparent px-4 text-silver hover:bg-white/10"
                      onClick={onCopy}
                    >
                      {copied ? "Copied" : "Copy address"}
                    </Button>
                    {explorer ? (
                      <a
                        href={explorer}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="focus-ring inline-flex h-11 items-center rounded-full px-2 text-sm text-cyan underline-offset-4 hover:underline"
                      >
                        View on the block explorer
                        <span className="sr-only"> (opens in a new tab)</span>
                      </a>
                    ) : null}
                  </div>
                </div>
              ) : (
                <p className="text-base text-silver">Not announced</p>
              )}
              <p className="sr-only" aria-live="polite">
                {notice}
              </p>
            </dd>
          </div>

          <div className="grid gap-3 px-5 py-5 sm:grid-cols-[minmax(0,220px)_minmax(0,1fr)] sm:px-7">
            <dt className="font-mono text-[0.72rem] tracking-[0.16em] text-mist uppercase">Allocation</dt>
            <dd>
              {allocation ? (
                <div>
                  <div
                    className="flex h-3 overflow-hidden rounded-full bg-white/10"
                    aria-hidden="true"
                  >
                    {allocation.items.map((item, index) => (
                      <div
                        key={item.label}
                        style={{
                          width: `${(item.percent / allocation.total) * 100}%`,
                          background: SEGMENT_COLORS[index % SEGMENT_COLORS.length],
                        }}
                      />
                    ))}
                  </div>
                  <ul className="mt-4 space-y-2">
                    {allocation.items.map((item, index) => (
                      <li key={item.label} className="flex items-center justify-between gap-4 text-sm text-silver">
                        <span className="flex items-center gap-2">
                          <span
                            className="size-2.5 rounded-full"
                            style={{ background: SEGMENT_COLORS[index % SEGMENT_COLORS.length] }}
                            aria-hidden="true"
                          />
                          {item.label}
                        </span>
                        <span className="font-mono">{item.percent}%</span>
                      </li>
                    ))}
                  </ul>
                  {allocation.balanced ? (
                    <p className="mt-3 text-sm text-mist">Shares as published by the project.</p>
                  ) : (
                    <p className="mt-3 text-sm text-mist">
                      These figures total {allocation.total}% and are shown as published.
                    </p>
                  )}
                </div>
              ) : (
                <p className="text-base text-silver">Not announced</p>
              )}
            </dd>
          </div>
        </dl>

        {chart ? (
          <p className="mt-6 text-sm text-mist">
            <a
              href={chart}
              target="_blank"
              rel="noopener noreferrer"
              className="focus-ring text-cyan underline-offset-4 hover:underline"
            >
              Open the published chart
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
          </p>
        ) : null}
      </div>
    </section>
  );
}
