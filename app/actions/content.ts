"use server";

import { revalidatePath } from "next/cache";
import { getAdminSession } from "@/lib/auth";
import { saveSiteContent } from "@/lib/cms/store";
import type { SiteContent } from "@/lib/cms/types";

async function requireAdmin() {
  if (!(await getAdminSession())) {
    throw new Error("Unauthorized");
  }
}

export async function saveContentAction(content: SiteContent) {
  await requireAdmin();
  const saved = await saveSiteContent(content);
  revalidatePath("/");
  revalidatePath("/admin");
  return saved;
}
