import { defaultSiteContent } from "@/lib/cms/defaults";
import { ensurePlansContent, mergeContent } from "@/lib/cms/normalize";
import { readContentJson, writeContentJson } from "@/lib/cms/storage";
import type { SiteContent } from "@/lib/cms/types";

export { ensurePlansContent };

export async function getSiteContent(): Promise<SiteContent> {
  const raw = await readContentJson();
  if (!raw) {
    try {
      await writeContentJson(`${JSON.stringify(defaultSiteContent, null, 2)}\n`);
    } catch {
      // First load can still render defaults if the store is empty.
    }
    return structuredClone(defaultSiteContent);
  }

  try {
    return ensurePlansContent(mergeContent(defaultSiteContent, JSON.parse(raw)));
  } catch {
    return structuredClone(defaultSiteContent);
  }
}

export async function saveSiteContent(content: SiteContent): Promise<SiteContent> {
  const merged = ensurePlansContent(mergeContent(defaultSiteContent, content));
  merged.plans.plans = merged.plans.plans.map((plan) => ({
    ...plan,
    features: plan.features.map((feature) => feature.trim()).filter(Boolean),
  }));
  await writeContentJson(`${JSON.stringify(merged, null, 2)}\n`);
  return merged;
}
