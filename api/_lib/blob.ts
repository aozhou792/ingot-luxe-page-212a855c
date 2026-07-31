/**
 * Drop-in replacement for the four `@vercel/blob` primitives this app uses.
 *
 * The Vercel Blob store hit the free-tier Advanced Request cap and was suspended,
 * which took down the order admin, draft saves and receipt uploads. Storage now
 * lives on our own VPS (see scripts/vps-blobsrv.mjs) behind ORDER_STORE_URL.
 *
 * `BLOB_READ_WRITE_TOKEN` is deliberately reused as the shared secret: every store
 * module already threads it into these calls and into raw `fetch(blob.url, ...)`
 * reads, so keeping the name makes this a 1-line change per module instead of a
 * rewrite of seven files during an outage.
 */

export interface StoredBlob {
  pathname: string;
  url: string;
  downloadUrl: string;
  size: number;
  uploadedAt: string;
  contentType: string;
  contentDisposition: string;
  cacheControl: string;
}

interface ListResult {
  blobs: StoredBlob[];
  hasMore: boolean;
  cursor?: string;
}

interface TokenOptions {
  token?: string;
}

interface PutOptions extends TokenOptions {
  access?: "public" | "private";
  contentType?: string;
  addRandomSuffix?: boolean;
  allowOverwrite?: boolean;
}

interface ListOptions extends TokenOptions {
  prefix?: string;
  cursor?: string;
  limit?: number;
}

function storeBase(): string {
  const base = process.env.ORDER_STORE_URL;
  if (!base) throw new Error("ORDER_STORE_URL is not configured");
  return base.replace(/\/+$/, "");
}

function storeToken(explicit?: string): string {
  const token = explicit || process.env.BLOB_READ_WRITE_TOKEN;
  if (!token) throw new Error("BLOB_READ_WRITE_TOKEN is not configured");
  return token;
}

function encodePathname(pathname: string): string {
  return pathname.split("/").map(encodeURIComponent).join("/");
}

/** Accepts either a bare pathname or a full store URL, as `del` is fed blob URLs. */
function toPathname(urlOrPathname: string): string {
  if (!/^https?:\/\//i.test(urlOrPathname)) return urlOrPathname.replace(/^\/+/, "");
  const { pathname } = new URL(urlOrPathname);
  const withoutPrefix = pathname.replace(/^\/b\//, "");
  return decodeURIComponent(withoutPrefix);
}

async function request(path: string, init: RequestInit, token?: string): Promise<Response> {
  const response = await fetch(`${storeBase()}${path}`, {
    ...init,
    headers: { ...(init.headers ?? {}), authorization: `Bearer ${storeToken(token)}` },
    cache: "no-store",
  });
  return response;
}

export async function put(
  pathname: string,
  body: Buffer | Uint8Array | string,
  options: PutOptions = {},
): Promise<StoredBlob> {
  const response = await request(
    `/b/${encodePathname(pathname)}`,
    {
      method: "PUT",
      body: typeof body === "string" ? body : new Uint8Array(body),
      headers: { "x-blob-content-type": options.contentType ?? "application/octet-stream" },
    },
    options.token,
  );
  if (!response.ok) throw new Error(`Order store put failed for ${pathname}: HTTP ${response.status}`);
  return (await response.json()) as StoredBlob;
}

export async function list(options: ListOptions = {}): Promise<ListResult> {
  const params = new URLSearchParams();
  if (options.prefix) params.set("prefix", options.prefix);
  if (options.cursor) params.set("cursor", options.cursor);
  if (options.limit) params.set("limit", String(options.limit));
  const response = await request(`/l?${params.toString()}`, { method: "GET" }, options.token);
  if (!response.ok) throw new Error(`Order store list failed: HTTP ${response.status}`);
  return (await response.json()) as ListResult;
}

export async function head(pathname: string, options: TokenOptions = {}): Promise<StoredBlob> {
  const params = new URLSearchParams({ pathname: toPathname(pathname) });
  const response = await request(`/h?${params.toString()}`, { method: "GET" }, options.token);
  if (!response.ok) throw new Error(`Order store head failed for ${pathname}: HTTP ${response.status}`);
  return (await response.json()) as StoredBlob;
}

export async function del(
  urlsOrPathnames: string | string[],
  options: TokenOptions = {},
): Promise<void> {
  const targets = Array.isArray(urlsOrPathnames) ? urlsOrPathnames : [urlsOrPathnames];
  for (const target of targets) {
    const response = await request(
      `/b/${encodePathname(toPathname(target))}`,
      { method: "DELETE" },
      options.token,
    );
    if (!response.ok && response.status !== 404) {
      throw new Error(`Order store delete failed for ${target}: HTTP ${response.status}`);
    }
  }
}
