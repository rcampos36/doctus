import { defaultSiteContent } from "@/lib/cms/defaults";
import type { SiteContent } from "@/lib/cms/types";

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

export function normalizePlans(
  value: unknown,
  fallback: SiteContent["plans"] = defaultSiteContent.plans,
): SiteContent["plans"] {
  if (!isRecord(value)) return structuredClone(fallback);

  const incomingPlans = Array.isArray(value.plans) ? value.plans : [];
  return {
    badge: typeof value.badge === "string" && value.badge ? value.badge : fallback.badge,
    title: typeof value.title === "string" && value.title ? value.title : fallback.title,
    plans: (incomingPlans.length ? incomingPlans : fallback.plans).map((item, index) => {
      const plan = isRecord(item) ? item : {};
      const fallbackPlan = fallback.plans[index] ?? fallback.plans[0];
      const features = Array.isArray(plan.features)
        ? plan.features.filter((feature): feature is string => typeof feature === "string")
        : fallbackPlan.features;
      return {
        name: typeof plan.name === "string" ? plan.name : fallbackPlan.name,
        price: typeof plan.price === "string" ? plan.price : fallbackPlan.price,
        period: typeof plan.period === "string" ? plan.period : fallbackPlan.period,
        features: features.length ? features : [...fallbackPlan.features],
      };
    }),
  };
}

export function ensurePlansContent(content: SiteContent): SiteContent {
  return {
    ...content,
    plans: normalizePlans(content.plans, defaultSiteContent.plans),
  };
}

export function mergeContent(base: SiteContent, incoming: unknown): SiteContent {
  if (!isRecord(incoming)) return structuredClone(base);

  const next = structuredClone(base);
  for (const key of Object.keys(base) as (keyof SiteContent)[]) {
    const value = incoming[key];
    if (key === "plans") {
      next.plans = normalizePlans(value, base.plans);
      continue;
    }
    if (isRecord(value) && isRecord(next[key])) {
      Object.assign(next[key] as object, value);
    }
  }
  if (!incoming.plans) {
    next.plans = structuredClone(base.plans);
  }
  return next;
}
