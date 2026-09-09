import type { PricingPlan, SiteContent } from "@/lib/cms/types";

function PlanDetails({ plan, tone }: { plan: PricingPlan; tone: "dark" | "light" }) {
  const isLight = tone === "light";

  return (
    <>
      <p className="flex flex-wrap items-start gap-x-2">
        <span
          className={`text-[clamp(3rem,6vw,4.25rem)] leading-none font-semibold tracking-[-0.04em] ${
            isLight ? "text-text-dark" : "text-white"
          }`}
        >
          {plan.price}
        </span>
        <span
          className={`mt-2 text-[0.95rem] font-medium ${isLight ? "text-text-dark/70" : "text-white/75"}`}
        >
          {plan.period}
        </span>
      </p>
      <h3
        className={`mt-5 text-[1.35rem] leading-tight font-bold tracking-[-0.02em] ${
          isLight ? "text-text-dark" : "text-white"
        }`}
      >
        {plan.name}
      </h3>
      <ul className="mt-8 list-none p-0">
        {plan.features.map((feature, featureIndex) => (
          <li
            key={`${feature}-${featureIndex}`}
            className={`border-t py-4 text-[0.975rem] leading-[1.45] ${
              isLight
                ? "border-text-dark/20 text-text-dark last:border-b"
                : "border-white/20 text-white/90"
            }`}
          >
            {feature}
          </li>
        ))}
      </ul>
    </>
  );
}

export default function Plans({ content }: { content: SiteContent["plans"] }) {
  if (!content?.plans?.length) return null;

  return (
    <section
      id="plans"
      className="page-gutter bg-text-dark py-[clamp(3rem,8vw,5rem)] text-creamy"
      aria-labelledby="plans-heading"
    >
      <div className="mx-auto max-w-[1300px]">
        <header className="mb-10 text-center lg:mb-14">
          <p className="mb-4 inline-flex rounded-full bg-white/10 px-4 py-1.5 text-[0.75rem] font-semibold text-primary">
            {content.badge}
          </p>
          <h2
            id="plans-heading"
            className="text-[clamp(1.875rem,5vw,2.5rem)] leading-[1.12] font-bold tracking-[-0.03em] text-creamy"
          >
            {content.title}
          </h2>
        </header>

        <div className="grid gap-0 md:grid-cols-3">
          {content.plans.map((plan, index) => (
            <article
              key={`${plan.name}-${index}`}
              className={`plan-card py-2 md:px-8 md:py-0 ${
                index > 0
                  ? "border-t border-white/25 pt-10 md:border-t-0 md:border-l md:pt-0"
                  : ""
              } ${index < content.plans.length - 1 ? "pb-10 md:pb-0" : ""}`}
            >
              <div className="plan-card__base">
                <PlanDetails plan={plan} tone="dark" />
                <div className="plan-card__hover-spacer" aria-hidden="true" />
              </div>

              <div className="plan-card__overlay md:px-8" aria-hidden="true">
                <PlanDetails plan={plan} tone="light" />
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
