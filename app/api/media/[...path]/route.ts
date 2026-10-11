import { get } from "@vercel/blob";
import { NextResponse } from "next/server";
import { usesBlobStorage } from "@/lib/cms/storage";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ path: string[] }> },
) {
  if (!usesBlobStorage()) {
    return NextResponse.json({ error: "Not found." }, { status: 404 });
  }

  const { path } = await params;
  const pathname = path.join("/");
  if (!/^uploads\/[A-Za-z0-9._-]+$/.test(pathname)) {
    return NextResponse.json({ error: "Not found." }, { status: 404 });
  }

  const result = await get(pathname, { access: "private" });
  if (!result || result.statusCode !== 200 || !result.stream) {
    return NextResponse.json({ error: "Not found." }, { status: 404 });
  }

  return new Response(result.stream, {
    headers: {
      "Content-Type": result.blob.contentType || "application/octet-stream",
      "Cache-Control": result.blob.cacheControl || "public, max-age=31536000, immutable",
    },
  });
}
