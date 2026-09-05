"use client";

import { useEffect, useState } from "react";
import type { SiteContent } from "@/lib/cms/types";

export default function Header({ content }: { content: SiteContent["header"] }) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    const media = window.matchMedia("(min-width: 1024px)");
    const onChange = () => {
      if (media.matches) setOpen(false);
    };
    media.addEventListener("change", onChange);
    return () => media.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [open]);

  return (
    <header className="page-gutter fixed top-0 right-0 left-0 z-50 flex h-[var(--header-height)] w-full items-center overflow-visible bg-ductus-header pt-[env(safe-area-inset-top,0px)] text-text-dark shadow-[0_1px_0_rgb(0_0_0/0.08)]">
      <div className="mx-auto flex h-[var(--header-bar)] w-full max-w-[1300px] items-center justify-between gap-3 sm:gap-4">
        <a className="flex min-w-0 shrink-0 items-center gap-2 text-inherit no-underline" href="#home">
          <img
            className="block h-11 w-auto sm:h-[52px] lg:h-[60px]"
            src={content.logo}
            alt={content.logoAlt}
            width={100}
            height={43}
          />
        </a>

        <button
          type="button"
          className="flex h-11 w-11 shrink-0 flex-col items-center justify-center gap-1.5 rounded-full border border-text-dark/15 bg-white p-0 text-inherit shadow-sm lg:hidden"
          aria-expanded={open}
          aria-controls="hero-nav-drawer"
          onClick={() => setOpen((value) => !value)}
        >
          <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
          <span className="relative block h-3.5 w-[1.15rem]" aria-hidden="true">
            <span
              className={`absolute top-1/2 left-0 h-0.5 w-full rounded-sm bg-current transition-transform ${open ? "rotate-45" : "-translate-y-1.5"}`}
            />
            <span
              className={`absolute top-1/2 left-0 h-0.5 w-full rounded-sm bg-current transition-opacity ${open ? "opacity-0" : ""}`}
            />
            <span
              className={`absolute top-1/2 left-0 h-0.5 w-full rounded-sm bg-current transition-transform ${open ? "-rotate-45" : "translate-y-1.5"}`}
            />
          </span>
        </button>

        <div
          id="hero-nav-drawer"
          className={`flex flex-1 flex-col gap-5 max-lg:absolute max-lg:top-[calc(var(--header-height)+0.5rem)] max-lg:right-[max(1rem,env(safe-area-inset-right,0px))] max-lg:left-[max(1rem,env(safe-area-inset-left,0px))] max-lg:z-30 max-lg:max-h-[calc(100dvh-var(--header-height)-1rem)] max-lg:overflow-y-auto max-lg:rounded-2xl max-lg:border max-lg:border-text-dark/10 max-lg:bg-white max-lg:p-5 max-lg:shadow-lg lg:flex lg:flex-row lg:items-center lg:justify-between lg:gap-8 ${open ? "" : "max-lg:hidden"}`}
        >
          <nav className="flex flex-1 justify-center lg:flex" aria-label="Primary">
            <ul className="m-0 flex list-none flex-col items-start gap-y-1 p-0 lg:flex-row lg:flex-wrap lg:items-center lg:justify-center lg:gap-x-7 lg:gap-y-1">
              {content.navLinks.map((link) => (
                <li key={`${link.href}-${link.label}`}>
                  <a
                    href={link.href}
                    className="inline-flex min-h-11 items-center gap-1.5 py-2 text-[1rem] font-medium text-inherit no-underline transition-opacity hover:opacity-85 focus-visible:opacity-85 lg:min-h-0 lg:py-1.5 lg:text-[0.9375rem]"
                    onClick={() => setOpen(false)}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <a
            className="inline-flex min-h-11 w-full shrink-0 items-center justify-center rounded-full bg-primary px-[1.35rem] py-2.5 text-[0.9375rem] font-semibold text-white no-underline transition-opacity hover:opacity-90 focus-visible:opacity-90 lg:w-auto"
            href={content.ctaHref}
            onClick={() => setOpen(false)}
          >
            {content.ctaLabel}
          </a>
        </div>
      </div>
    </header>
  );
}
