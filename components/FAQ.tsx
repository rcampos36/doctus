import type { SiteContent } from "@/lib/cms/types";

export default function FAQ({ content }: { content: SiteContent["faq"] }) {
  return (
    <section
      id="faq"
      className="faq-section page-gutter bg-light-bg pt-[clamp(1rem,4vw,2rem)] pb-[clamp(3rem,8vw,5rem)] text-text-dark"
      aria-labelledby="faq-heading"
    >
      <div className="mx-auto max-w-[52rem]">
        <header className="mb-8 text-center lg:mb-10">
          <p className="mb-4 inline-flex rounded-full bg-white px-4 py-1.5 text-[0.8125rem] font-semibold text-primary">
            {content.badge}
          </p>
          <h2
            id="faq-heading"
            className="text-[clamp(2rem,4vw,3.5rem)] leading-[1.12] font-bold tracking-[-0.03em] whitespace-pre-line"
          >
            {content.title}
          </h2>
        </header>

        <div className="flex flex-col gap-3">
          {content.items.map((item) => (
            <details
              key={item.q}
              className="faq-item group rounded-[1rem] bg-[#f4f4f4] px-4 py-1 shadow-[0_1px_0_rgb(0_0_0/0.04)] open:bg-white open:ring-1 open:ring-primary/15 sm:px-5"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-3 py-3.5 text-left text-[0.975rem] leading-[1.35] font-semibold text-text-dark marker:content-none sm:gap-4 sm:py-4 sm:text-[1.0625rem] [&::-webkit-details-marker]:hidden">
                <span className="min-w-0">&quot;{item.q}&quot;</span>
                <span
                  className="faq-item__icon inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white text-[1.25rem] leading-none font-normal text-primary transition-transform duration-200"
                  aria-hidden="true"
                >
                  +
                </span>
              </summary>
              <div className="border-t border-black/5 pt-4 pb-5 text-[1rem] leading-[1.55] whitespace-pre-line text-paragraph-gray">
                {item.a}
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
