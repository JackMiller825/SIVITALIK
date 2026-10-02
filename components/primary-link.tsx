"use client";

import { Button } from "@/components/ui/button";
import { Magnetic } from "@/components/magnetic";
import { cn } from "@/lib/utils";
import type { MouseEvent, ReactNode } from "react";

const solid =
  "h-12 cursor-pointer rounded-full bg-primary px-6 text-base text-primary-foreground shadow-[0_0_0_1px_rgba(53,223,255,0.35),0_12px_32px_rgba(139,61,255,0.28)] hover:bg-[#9b57ff] focus-visible:ring-[#35dfff]";

const quiet =
  "h-12 cursor-pointer rounded-full border-white/20 bg-white/[0.04] px-6 text-base text-silver hover:border-cyan/50 hover:bg-cyan/10 focus-visible:ring-[#35dfff]";

export function PrimaryLink({
  href,
  children,
  external = false,
  tone = "solid",
  compact = false,
  onClick,
}: {
  href: string;
  children: ReactNode;
  external?: boolean;
  tone?: "solid" | "quiet";
  compact?: boolean;
  onClick?: (event: MouseEvent<HTMLAnchorElement>) => void;
}) {
  return (
    <Magnetic>
      <Button
        nativeButton={false}
        render={
          <a
            href={href}
            onClick={onClick}
            {...(external
              ? { target: "_blank", rel: "noopener noreferrer" }
              : {})}
          />
        }
        className={cn(tone === "solid" ? solid : quiet, compact && "h-10 px-4 text-sm")}
      >
        {children}
        {external ? (
          <span className="sr-only"> (opens in a new tab)</span>
        ) : null}
      </Button>
    </Magnetic>
  );
}
