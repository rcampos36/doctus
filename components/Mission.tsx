"use client";

import { useState } from "react";
import type { SiteContent } from "@/lib/cms/types";

export default function Mission({ content }: { content: SiteContent["mission"] }) {
  const [active, setActive] = useState(0);
  const current = content.tabs[active] ?? content.tabs[0];
  const progress = content.tabs.length
    ? `${((active + 1) / content.tabs.length) * 100}%`
    : "0%";

  if (!current) return null;

  return (
    <section
      id="values"
      className="values-section page-gutter pt-[clamp(3rem,8vw,5rem)] pb-[clamp(3rem,8vw,5.5rem)] text-text-dark"
      aria-labelledby="values-heading"
    >
      <div className="mx-auto max-w-[1300px] rounded-[1.25rem] bg-[#f6f6f6] p-4 sm:p-8 lg:p-10 xl:p-12">
        <header className="mb-8 w-full min-w-0 text-center lg:mb-12">
          <p className="mb-4 inline-flex rounded-full bg-[#ececec] px-4 py-1.5 text-[0.75rem] font-semibold text-text-dark/90">
            {content.badge}
          </p>
          <h2
            id="values-heading"
            className="w-full min-w-0 text-[clamp(2rem,4vw,3.25rem)] leading-[1.1] font-bold tracking-[-0.03em]"
          >
            {content.title}
          </h2>
        </header>

        <div className="grid gap-6 lg:grid-cols-[18rem_1fr] xl:grid-cols-[22rem_1fr]">
          <div className="values-tabs pt-4">
            <div className="mb-4 h-[2px] w-full bg-paragraph-gray/20" aria-hidden="true">
              <span
                className="block h-full bg-primary transition-[width] duration-300 ease-out"
                style={{ width: progress }}
              />
            </div>
            <p className="mb-4 text-right text-[0.95rem] font-medium tracking-[0.02em] text-paragraph-gray">
              {String(active + 1).padStart(2, "0")}/
              {String(content.tabs.length).padStart(2, "0")}
            </p>
            {content.tabs.map((tab, index) => (
              <button
                key={tab.id}
                type="button"
                className={`block min-h-11 w-full cursor-pointer border-0 bg-transparent py-1.5 text-left text-[1.375rem] leading-[1.22] font-semibold transition-colors sm:text-[1.625rem] lg:min-h-0 lg:py-1 lg:text-[1.875rem] ${
                  index === active ? "text-text-dark" : "text-paragraph-gray"
                }`}
                aria-selected={index === active}
                onClick={() => setActive(index)}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="grid gap-3 lg:grid-cols-[1fr_17rem] xl:grid-cols-[1fr_19rem]">
            <article className="flex h-full flex-col rounded-[1rem] bg-[#f1f1f1] p-4 sm:p-6 lg:p-8">
              <h3 className="mb-4 text-[clamp(1.125rem,3.4vw,1.5rem)] leading-[1.3] font-bold tracking-[-0.02em] sm:mb-6">
                {current.heading}
                {current.extra ? <span className="mt-4 block sm:mt-6">{current.extra}</span> : null}
              </h3>
            </article>
            <div className="overflow-hidden rounded-[1rem] bg-[#d7dfe2]">
              <img
                key={current.image}
                className="animate-fade-in h-52 w-full object-cover object-[60%_center] sm:h-72 lg:h-[328px]"
                src={current.image}
                alt={current.alt}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
