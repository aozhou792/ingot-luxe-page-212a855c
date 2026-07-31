/**
 * Minimal filesystem-backed blob store for the Alibarbar order backend.
 *
 * Replaces Vercel Blob, which hit its free-tier Advanced Request cap and got
 * suspended, taking the order admin and receipt uploads down with it. The API
 * surface deliberately mirrors only the four primitives the app actually uses
 * (put / list / head / del) so the Vercel Functions keep their existing logic.
 *
 * Listens on loopback only; nginx terminates TLS and proxies to it.
 */
import { createServer } from "node:http";
import { createReadStream } from "node:fs";
import { mkdir, readFile, readdir, rm, stat, writeFile } from "node:fs/promises";
import { dirname, join, posix, resolve, sep } from "node:path";

const PORT = Number(process.env.BLOBSRV_PORT ?? 3100);
const HOST = process.env.BLOBSRV_HOST ?? "127.0.0.1";
const DATA_DIR = resolve(process.env.BLOBSRV_DATA ?? "/www/order-data/blobs");
const TOKEN = process.env.BLOBSRV_TOKEN;
const PUBLIC_BASE = (process.env.BLOBSRV_PUBLIC_BASE ?? "https://api.ailibarbar.com").replace(/\/+$/, "");
const MAX_BODY = Number(process.env.BLOBSRV_MAX_BODY ?? 64 * 1024 * 1024);

if (!TOKEN) {
  console.error("BLOBSRV_TOKEN is required");
  process.exit(1);
}

const META_SUFFIX = ".__meta.json";

function authorized(req) {
  const header = req.headers.authorization ?? "";
  const provided = header.startsWith("Bearer ") ? header.slice(7) : "";
  if (provided.length !== TOKEN.length) return false;
  // Length is already public via the header, so a plain compare after the length
  // guard is enough here; timing on equal-length secrets is the only concern.
  let diff = 0;
  for (let i = 0; i < TOKEN.length; i += 1) diff |= provided.charCodeAt(i) ^ TOKEN.charCodeAt(i);
  return diff === 0;
}

/** Reject anything that could escape DATA_DIR or collide with a meta sidecar. */
function safePath(pathname) {
  const clean = decodeURIComponent(pathname).replace(/^\/+/, "");
  if (!clean || clean.length > 512) return null;
  if (clean.includes("\\") || clean.includes("\0")) return null;
  if (clean.split("/").some((part) => part === "." || part === ".." || part === "")) return null;
  if (clean.endsWith(META_SUFFIX)) return null;
  const full = resolve(DATA_DIR, clean);
  if (full !== DATA_DIR && !full.startsWith(DATA_DIR + sep)) return null;
  return { pathname: clean, full };
}

function json(res, status, body) {
  const payload = JSON.stringify(body);
  res.writeHead(status, { "content-type": "application/json; charset=utf-8", "content-length": Buffer.byteLength(payload) });
  res.end(payload);
}

async function readBody(req) {
  const chunks = [];
  let total = 0;
  for await (const chunk of req) {
    total += chunk.length;
    if (total > MAX_BODY) throw new Error("body too large");
    chunks.push(chunk);
  }
  return Buffer.concat(chunks);
}

async function readMeta(full) {
  try {
    return JSON.parse(await readFile(full + META_SUFFIX, "utf8"));
  } catch {
    return {};
  }
}

function blobUrl(pathname) {
  return `${PUBLIC_BASE}/b/${pathname.split("/").map(encodeURIComponent).join("/")}`;
}

async function describe(pathname, full) {
  const info = await stat(full);
  const meta = await readMeta(full);
  return {
    pathname,
    url: blobUrl(pathname),
    downloadUrl: blobUrl(pathname),
    size: info.size,
    uploadedAt: meta.uploadedAt ?? info.mtime.toISOString(),
    contentType: meta.contentType ?? "application/octet-stream",
    contentDisposition: `inline; filename="${posix.basename(pathname)}"`,
    cacheControl: "no-store",
  };
}

/** Depth-first walk returning pathnames relative to DATA_DIR, sorted. */
async function walk(dir, prefix = "") {
  let entries;
  try {
    entries = await readdir(dir, { withFileTypes: true });
  } catch {
    return [];
  }
  const out = [];
  for (const entry of entries) {
    const rel = prefix ? `${prefix}/${entry.name}` : entry.name;
    if (entry.isDirectory()) out.push(...(await walk(join(dir, entry.name), rel)));
    else if (!entry.name.endsWith(META_SUFFIX)) out.push(rel);
  }
  return out;
}

const server = createServer(async (req, res) => {
  try {
    const url = new URL(req.url ?? "/", "http://localhost");

    if (url.pathname === "/health") return json(res, 200, { ok: true, store: DATA_DIR });

    if (!authorized(req)) return json(res, 401, { error: "unauthorized" });

    if (url.pathname === "/l" && req.method === "GET") {
      const prefix = url.searchParams.get("prefix") ?? "";
      const limit = Math.min(Number(url.searchParams.get("limit") ?? 1000) || 1000, 1000);
      const cursor = url.searchParams.get("cursor") ?? "";
      const all = (await walk(DATA_DIR)).filter((p) => p.startsWith(prefix)).sort();
      const start = cursor ? all.findIndex((p) => p > cursor) : 0;
      const slice = start < 0 ? [] : all.slice(start, start + limit);
      const blobs = [];
      for (const pathname of slice) {
        try {
          blobs.push(await describe(pathname, resolve(DATA_DIR, pathname)));
        } catch {
          /* raced with a delete */
        }
      }
      const hasMore = start >= 0 && start + limit < all.length;
      return json(res, 200, { blobs, hasMore, cursor: hasMore ? slice.at(-1) : undefined });
    }

    if (url.pathname.startsWith("/b/")) {
      const target = safePath(url.pathname.slice(3));
      if (!target) return json(res, 400, { error: "invalid pathname" });

      if (req.method === "PUT" || req.method === "POST") {
        const body = await readBody(req);
        await mkdir(dirname(target.full), { recursive: true });
        await writeFile(target.full, body);
        await writeFile(
          target.full + META_SUFFIX,
          JSON.stringify({
            contentType: req.headers["x-blob-content-type"] ?? req.headers["content-type"] ?? "application/octet-stream",
            uploadedAt: new Date().toISOString(),
          }),
        );
        return json(res, 200, await describe(target.pathname, target.full));
      }

      if (req.method === "HEAD" || req.method === "GET") {
        let meta;
        try {
          meta = await describe(target.pathname, target.full);
        } catch {
          return json(res, 404, { error: "not found" });
        }
        if (req.method === "HEAD") {
          res.writeHead(200, {
            "content-type": meta.contentType,
            "content-length": String(meta.size),
            "x-blob-meta": JSON.stringify(meta),
          });
          return res.end();
        }
        res.writeHead(200, { "content-type": meta.contentType, "content-length": String(meta.size), "cache-control": "no-store" });
        return createReadStream(target.full).pipe(res);
      }

      if (req.method === "DELETE") {
        await rm(target.full, { force: true });
        await rm(target.full + META_SUFFIX, { force: true });
        return json(res, 200, { ok: true });
      }
    }

    // head() needs metadata without a body stream, keyed by pathname.
    if (url.pathname === "/h" && req.method === "GET") {
      const target = safePath(url.searchParams.get("pathname") ?? "");
      if (!target) return json(res, 400, { error: "invalid pathname" });
      try {
        return json(res, 200, await describe(target.pathname, target.full));
      } catch {
        return json(res, 404, { error: "not found" });
      }
    }

    return json(res, 404, { error: "no route" });
  } catch (error) {
    console.error("blobsrv error:", error);
    return json(res, 500, { error: String(error instanceof Error ? error.message : error) });
  }
});

await mkdir(DATA_DIR, { recursive: true });
server.listen(PORT, HOST, () => console.log(`blobsrv listening on ${HOST}:${PORT}, data=${DATA_DIR}`));
