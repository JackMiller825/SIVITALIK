"use client";

import { Button } from "@/components/ui/button";
import { useState } from "react";

async function writeClipboard(value: string) {
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

export function CopyAddress({
  address,
  label = "Copy Contract",
}: {
  address: string;
  label?: string;
}) {
  const [state, setState] = useState<"idle" | "copied" | "failed">("idle");
  const [notice, setNotice] = useState("");

  async function onCopy() {
    const ok = await writeClipboard(address);
    if (ok) {
      setState("copied");
      setNotice("Copied");
      window.setTimeout(() => setState("idle"), 2000);
      return;
    }
    setState("failed");
    setNotice("Could not copy automatically. Select the full address shown above.");
  }

  return (
    <div className="flex flex-col items-start gap-2">
      <Button
        type="button"
        variant="outline"
        className="h-11 cursor-pointer rounded-full border-white/20 bg-transparent px-4 text-silver hover:bg-white/10"
        onClick={onCopy}
      >
        {state === "copied" ? "Copied" : label}
      </Button>
      <p className="sr-only" aria-live="polite">
        {notice}
      </p>
      {state === "failed" ? (
        <p className="text-sm text-mist">Could not copy automatically. Select the full address shown above.</p>
      ) : null}
    </div>
  );
}
