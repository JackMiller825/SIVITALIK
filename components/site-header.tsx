"use client";

import { BrandLogo } from "@/components/brand-logo";
import { PrimaryLink } from "@/components/primary-link";
import { project } from "@/config/project";
import { buyHref, NAV_LINKS } from "@/lib/project";
import { cn } from "@/lib/utils";
import { useReducedMotion } from "motion/react";
import { useEffect, useId, useRef, useState, useSyncExternalStore } from "react";

function subscribeScroll(onStoreChange: () => void) {
  window.addEventListener("scroll", onStoreChange, { passive: true });
  return () => window.removeEventListener("scroll", onStoreChange);
}

export function SiteHeader() {
  const scrolled = useSyncExternalStore(
    subscribeScroll,
    () => window.scrollY > 12,
    () => false,
  );
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string>("");
  const reduced = useReducedMotion();
  const panelRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const menuId = useId();
  const buy = buyHref();

  useEffect(() => {
    const elements = NAV_LINKS.map((link) => document.getElementById(link.id)).filter(
      (element): element is HTMLElement => Boolean(element),
    );
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target.id) setActive(visible.target.id);
      },
      { rootMargin: "-45% 0px -48% 0px", threshold: [0.1, 0.3, 0.6] },
    );
    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!open) return;
    const panel = panelRef.current;
    const main = document.querySelector("main");
    const footer = document.querySelector("footer");
    main?.setAttribute("inert", "");
    footer?.setAttribute("inert", "");
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const focusable = () =>
      panel
        ? [...panel.querySelectorAll<HTMLElement>("a, button")]
        : [];
    focusable()[0]?.focus();

    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
        return;
      }
      if (event.key !== "Tab" || !panel) return;
      const items = focusable();
      const first = items[0];
      const last = items[items.length - 1];
      if (!first || !last) return;
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }

    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = previousOverflow;
      main?.removeAttribute("inert");
      footer?.removeAttribute("inert");
    };
  }, [open]);

  function goTop(event: React.MouseEvent<HTMLAnchorElement>) {
    event.preventDefault();
    setOpen(false);
    window.scrollTo({ top: 0, behavior: reduced ? "auto" : "smooth" });
    history.replaceState(null, "", "#top");
  }

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-5">
      <div
        className={cn(
          "mx-auto flex h-14 max-w-[1240px] items-center gap-2 rounded-full border px-2.5 transition-[background-color,border-color,box-shadow] duration-200 sm:px-3",
          scrolled || open
            ? "border-white/12 bg-[#040615]/80 shadow-[0_12px_40px_rgba(0,0,0,0.35)] backdrop-blur-xl"
            : "border-transparent bg-transparent",
        )}
      >
        <a
          href="#top"
          onClick={goTop}
          className="focus-ring flex min-w-0 items-center gap-2 rounded-full py-1 pr-2 pl-1"
        >
          <BrandLogo
            alt=""
            sizes="40px"
            className="size-9 shrink-0 rounded-full sm:size-10"
          />
          <span className="truncate text-[12.5px] font-semibold tracking-tight text-silver sm:text-[15px]">
            {project.PROJECT_NAME}
          </span>
        </a>

        <div className="ml-auto flex items-center gap-1 sm:gap-2">
        <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary">
          {NAV_LINKS.map((link) => (
            <a
              key={link.id}
              href={`#${link.id}`}
              aria-current={active === link.id ? "location" : undefined}
              className={cn(
                "focus-ring rounded-full px-3 py-2 text-sm transition-colors duration-200",
                active === link.id ? "text-silver" : "text-mist hover:text-silver",
              )}
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="hidden md:block">
          {buy ? (
            <PrimaryLink href={buy} external compact>
              Buy {project.TOKEN_SYMBOL}
            </PrimaryLink>
          ) : (
            <PrimaryLink href="#how-to-buy" tone="quiet" compact>
              Prelaunch
            </PrimaryLink>
          )}
        </div>

        <button
          ref={toggleRef}
          type="button"
          className="focus-ring inline-flex size-11 cursor-pointer items-center justify-center rounded-full border border-white/15 text-silver lg:hidden"
          aria-expanded={open}
          aria-controls={menuId}
          onClick={() => setOpen((value) => !value)}
        >
          <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
          {open ? (
            <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true">
              <path d="M4 4l10 10M14 4L4 14" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
            </svg>
          ) : (
            <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true">
              <path d="M3 5h12M3 9h12M3 13h12" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
            </svg>
          )}
        </button>
        </div>
      </div>

      {open ? (
        <div
          id={menuId}
          ref={panelRef}
          role="dialog"
          aria-modal="true"
          aria-label="Primary"
          className="menu-in fixed inset-x-3 top-[4.6rem] z-50 rounded-3xl border border-white/12 bg-[#070b1c]/95 p-3 shadow-[0_24px_80px_rgba(0,0,0,0.45)] backdrop-blur-xl lg:hidden"
        >
          <nav className="flex flex-col gap-1" aria-label="Mobile">
            {NAV_LINKS.map((link) => (
              <a
                key={link.id}
                href={`#${link.id}`}
                className="focus-ring rounded-2xl px-4 py-3 text-lg text-silver"
                onClick={() => setOpen(false)}
              >
                {link.label}
              </a>
            ))}
            <div className="px-1 pt-2">
              {buy ? (
                <PrimaryLink href={buy} external>
                  Buy {project.TOKEN_SYMBOL}
                </PrimaryLink>
              ) : (
                <a
                  href="#how-to-buy"
                  className="focus-ring inline-flex h-12 items-center rounded-full border border-white/15 px-5 text-silver"
                  onClick={() => setOpen(false)}
                >
                  Prelaunch
                </a>
              )}
            </div>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
