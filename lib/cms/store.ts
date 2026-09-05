import { defaultSiteContent } from "@/lib/cms/defaults";
import { readContentJson, writeContentJson } from "@/lib/cms/storage";
import type { SiteContent } from "@/lib/cms/types";

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function mergeContent(base: SiteContent, incoming: unknown): SiteContent {
  if (!isRecord(incoming)) return structuredClone(base);

  const next = structuredClone(base);
  for (const key of Object.keys(base) as (keyof SiteContent)[]) {
    const value = incoming[key];
    if (isRecord(value) && isRecord(next[key])) {
      Object.assign(next[key] as object, value);
    }
  }
  return next;
}

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
    return mergeContent(defaultSiteContent, JSON.parse(raw));
  } catch {
    return structuredClone(defaultSiteContent);
  }
}

export async function saveSiteContent(content: SiteContent): Promise<SiteContent> {
  const merged = mergeContent(defaultSiteContent, content);
  await writeContentJson(`${JSON.stringify(merged, null, 2)}\n`);
  return merged;
}
