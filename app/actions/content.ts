"use server";

import { revalidatePath } from "next/cache";
import { getAdminSession } from "@/lib/auth";
import { saveUploadedImage } from "@/lib/cms/storage";
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

export async function uploadImageAction(formData: FormData) {
  await requireAdmin();
  const file = formData.get("file");
  if (!(file instanceof File) || file.size === 0) {
    throw new Error("Choose an image to upload.");
  }

  const allowed = ["image/jpeg", "image/png", "image/webp", "image/gif", "image/svg+xml"];
  if (!allowed.includes(file.type)) {
    throw new Error("Upload a JPG, PNG, WEBP, GIF, or SVG file.");
  }

  const ext = file.name.split(".").pop()?.toLowerCase() || "bin";
  const safeExt = ["jpg", "jpeg", "png", "webp", "gif", "svg"].includes(ext) ? ext : "bin";
  const filename = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${safeExt}`;
  return saveUploadedImage(filename, file);
}
