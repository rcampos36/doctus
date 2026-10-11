import { NextResponse } from "next/server";
import { getAdminSession } from "@/lib/auth";
import { saveUploadedImage } from "@/lib/cms/storage";

const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp", "image/gif", "image/svg+xml"];
const ALLOWED_EXTS = ["jpg", "jpeg", "png", "webp", "gif", "svg"];

function isUploadFile(value: FormDataEntryValue | null): value is File {
  return value instanceof File;
}

export async function POST(request: Request) {
  if (!(await getAdminSession())) {
    return NextResponse.json({ error: "Sign in to upload images." }, { status: 401 });
  }

  let formData: FormData;
  try {
    formData = await request.formData();
  } catch {
    return NextResponse.json({ error: "Could not read the uploaded file." }, { status: 400 });
  }

  const file = formData.get("file");
  if (!isUploadFile(file) || file.size === 0) {
    return NextResponse.json({ error: "Choose an image to upload." }, { status: 400 });
  }

  if (file.type && !ALLOWED_TYPES.includes(file.type)) {
    return NextResponse.json(
      { error: "Upload a JPG, PNG, WEBP, GIF, or SVG file." },
      { status: 400 },
    );
  }

  const ext = (file.name?.split(".").pop() || "").toLowerCase();
  const safeExt = ALLOWED_EXTS.includes(ext) ? ext : file.type === "image/png" ? "png" : "jpg";
  const filename = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${safeExt}`;

  try {
    const url = await saveUploadedImage(filename, file);
    return NextResponse.json({ url });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Could not save the image.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
