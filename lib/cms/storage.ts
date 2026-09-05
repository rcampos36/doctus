import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { get, put } from "@vercel/blob";

const LOCAL_DATA_DIR = path.join(process.cwd(), "data");
const LOCAL_CONTENT_PATH = path.join(LOCAL_DATA_DIR, "content.json");
const LOCAL_UPLOADS_DIR = path.join(process.cwd(), "public", "uploads");
const BLOB_CONTENT_PATH = "cms/content.json";

export function usesBlobStorage() {
  return Boolean(process.env.BLOB_READ_WRITE_TOKEN || process.env.BLOB_STORE_ID);
}

export async function readContentJson(): Promise<string | null> {
  if (usesBlobStorage()) {
    const result = await get(BLOB_CONTENT_PATH, { access: "private", useCache: false });
    if (!result || result.statusCode !== 200 || !result.stream) return null;
    return new Response(result.stream).text();
  }

  try {
    return await readFile(LOCAL_CONTENT_PATH, "utf8");
  } catch {
    return null;
  }
}

export async function writeContentJson(json: string) {
  if (usesBlobStorage()) {
    await put(BLOB_CONTENT_PATH, json, {
      access: "private",
      addRandomSuffix: false,
      allowOverwrite: true,
      contentType: "application/json",
    });
    return;
  }

  await mkdir(LOCAL_DATA_DIR, { recursive: true });
  await writeFile(LOCAL_CONTENT_PATH, json, "utf8");
}

export async function saveUploadedImage(filename: string, file: File) {
  if (usesBlobStorage()) {
    const blob = await put(`uploads/${filename}`, file, {
      access: "public",
      addRandomSuffix: false,
      contentType: file.type || undefined,
    });
    return blob.url;
  }

  await mkdir(LOCAL_UPLOADS_DIR, { recursive: true });
  await writeFile(path.join(LOCAL_UPLOADS_DIR, filename), Buffer.from(await file.arrayBuffer()));
  return `/uploads/${filename}`;
}
