import type { SiteContent } from "@/lib/cms/types";

export default function Hero({ content }: { content: SiteContent["hero"] }) {
  return (
    <section
      id="home"
      className="relative flex min-h-[min(100dvh,calc(100svh*0.78))] flex-col text-white min-[480px]:min-h-[min(100dvh,calc(100svh*0.84))] md:min-h-[min(100dvh,calc(100svh*0.9))] lg:min-h-[min(100dvh,calc(100svh*0.96))] xl:min-h-[min(100dvh,100svh)]"
      aria-label="Homepage hero"
    >
      <div
        className="absolute inset-0 z-0 bg-[#1a120e] bg-cover bg-center"
        style={{ backgroundImage: `url('${content.backgroundImage}')` }}
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute inset-0 z-[1] bg-[linear-gradient(90deg,rgb(0_0_0/0.72)_0%,rgb(0_0_0/0.45)_42%,rgb(0_0_0/0.35)_100%)]"
        aria-hidden="true"
      />

      <div className="page-gutter relative z-10 flex flex-1 flex-col justify-center pt-[var(--header-height)] pb-[clamp(2.5rem,8vw,5rem)] lg:justify-start lg:pt-[calc(var(--header-height)+clamp(1.25rem,4vh,3rem))]">
        <div className="mx-auto mt-6 flex w-full max-w-[1300px] flex-col items-center gap-[clamp(1.5rem,4vw,3.5rem)] sm:mt-10 lg:mt-12 lg:flex-row lg:items-start lg:gap-12 xl:mt-16">
          <div className="animate-fade-up w-full min-w-0 lg:max-w-[52%] lg:basis-[52%] lg:self-start lg:pr-2 xl:pr-4">
            <h1 className="mb-5 text-[clamp(2.25rem,5.8vw,4.75rem)] leading-[1.06] font-bold tracking-[-0.03em] sm:mb-6 lg:mb-8">
              {content.heading}
              <span className="mt-4 block sm:mt-6">{content.headingAccent}</span>
            </h1>
            <p className="mb-8 max-w-[34rem] text-[clamp(1rem,1.35vw,1.125rem)] leading-relaxed text-white/92 sm:mb-12">
              {content.description}
            </p>
            <div className="flex flex-col gap-3 min-[420px]:flex-row min-[420px]:flex-wrap">
              <a
                className="inline-flex min-h-12 items-center justify-center rounded-full bg-primary px-6 py-[0.85rem] text-[0.9375rem] font-semibold text-white no-underline transition-colors hover:bg-[color-mix(in_srgb,var(--primary)_88%,black)] focus-visible:bg-[color-mix(in_srgb,var(--primary)_88%,black)]"
                href={content.primaryCta.href}
              >
                {content.primaryCta.label}
              </a>
              <a
                className="inline-flex min-h-12 items-center justify-center rounded-full bg-white px-6 py-[0.85rem] text-[0.9375rem] font-semibold text-text-dark no-underline transition-colors hover:bg-creamy focus-visible:bg-creamy"
                href={content.secondaryCta.href}
              >
                {content.secondaryCta.label}
              </a>
            </div>
          </div>

          <aside className="hero-cards w-full min-w-0 lg:max-w-[40rem] lg:flex-1 lg:shrink-0 lg:self-center lg:pt-2">
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4">
              {content.cards.map((card, index) => (
                <article
                  key={`${card.title}-${index}`}
                  className={`hero-card animate-fade-up flex min-h-0 flex-col rounded-[1.25rem] border border-white/20 bg-white/10 p-4 shadow-[0_12px_40px_rgb(0_0_0/0.18)] backdrop-blur-lg sm:min-h-[12rem] sm:p-5 ${card.wide ? "sm:col-span-2 sm:min-h-[11.5rem] sm:p-6" : ""}`}
                  style={{ animationDelay: `${160 + index * 120}ms` }}
                >
                  <img
                    className={`${card.wide ? "mb-4 h-8 w-8 sm:mb-5 sm:h-9 sm:w-9" : "mb-3 h-7 w-7 sm:mb-4 sm:h-8 sm:w-8"} block shrink-0 brightness-0 invert opacity-95`}
                    src={card.icon}
                    alt=""
                  />
                  <h2
                    className={`${card.wide ? "text-xl sm:text-2xl" : "text-lg sm:text-xl"} mb-2 leading-tight font-bold tracking-tight`}
                  >
                    {card.title}
                  </h2>
                  <p className="text-[0.9375rem] leading-[1.5] text-white/88 sm:text-base">
                    {card.body}
                  </p>
                </article>
              ))}
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
