import { head } from "@vercel/blob";

function blobToken(): string {
  const token = process.env.BLOB_READ_WRITE_TOKEN;
  if (!token) throw new Error("BLOB_READ_WRITE_TOKEN is not configured");
  return token;
}

const ALLOWED_PREFIX = "reviews/photos/";

export async function GET(request: Request): Promise<Response> {
  try {
    const path = new URL(request.url).searchParams.get("path");
    if (!path || !path.startsWith(ALLOWED_PREFIX)) {
      return Response.json({ error: "Not found" }, { status: 404 });
    }

    const token = blobToken();
    const meta = await head(path, { token });
    const upstream = await fetch(meta.url, {
      headers: { authorization: `Bearer ${token}` },
      cache: "no-store",
    });

    if (!upstream.ok) {
      return Response.json({ error: "Not found" }, { status: 404 });
    }

    const bytes = await upstream.arrayBuffer();
    return new Response(bytes, {
      headers: {
        "Content-Type": meta.contentType || "image/jpeg",
        "Cache-Control": "public, max-age=86400, immutable",
      },
    });
  } catch (error) {
    console.error("review-photo GET failed:", error);
    return Response.json({ error: "Failed to load photo" }, { status: 500 });
  }
}
