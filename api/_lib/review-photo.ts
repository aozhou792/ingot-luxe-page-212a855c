import { head } from "@vercel/blob";

const ALLOWED_PREFIX = "reviews/photos/";

function blobToken(): string {
  const token = process.env.BLOB_READ_WRITE_TOKEN;
  if (!token) throw new Error("BLOB_READ_WRITE_TOKEN is not configured");
  return token;
}

export async function serveReviewPhoto(path: string): Promise<Response> {
  if (!path.startsWith(ALLOWED_PREFIX)) {
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
}
