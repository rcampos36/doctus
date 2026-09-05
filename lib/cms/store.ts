import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { defaultSiteContent } from "@/lib/cms/defaults";
import type { SiteContent } from "@/lib/cms/types";

const DATA_DIR = path.join(process.cwd(), "data");
const CONTENT_PATH = path.join(DATA_DIR, "content.json");

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
  try {
    const raw = await readFile(CONTENT_PATH, "utf8");
    return mergeContent(defaultSiteContent, JSON.parse(raw));
  } catch {
    try {
      await persistSiteContent(defaultSiteContent);
    } catch {
      // Read-only hosts such as Vercel cannot create the data file.
    }
    return structuredClone(defaultSiteContent);
  }
}

async function persistSiteContent(content: SiteContent) {
  await mkdir(DATA_DIR, { recursive: true });
  await writeFile(CONTENT_PATH, `${JSON.stringify(content, null, 2)}\n`, "utf8");
}

export async function saveSiteContent(content: SiteContent): Promise<SiteContent> {
  const merged = mergeContent(defaultSiteContent, content);
  try {
    await persistSiteContent(merged);
  } catch {
    throw new Error(
      "Content could not be saved on this host. Local development can write data/content.json; Vercel needs a writable store.",
    );
  }
  return merged;
}
