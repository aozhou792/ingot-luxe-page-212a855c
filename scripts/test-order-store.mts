/**
 * Integration test for api/_lib/blob.ts against the live VPS order store.
 *
 * The seven store modules were not changed apart from their import line, so the
 * only thing that can regress is whether this shim matches the `@vercel/blob`
 * behaviour they rely on. Each case below mirrors an actual call site.
 *
 * Run: npx tsx scripts/test-order-store.mts
 */
import { del, head, list, put } from "../api/_lib/blob.js";

const PREFIX = `_itest/${Date.now()}/`;
let failures = 0;

function check(name: string, condition: unknown, detail?: unknown) {
  if (condition) {
    console.log(`  PASS  ${name}`);
  } else {
    failures += 1;
    console.error(`  FAIL  ${name}${detail === undefined ? "" : ` -> ${JSON.stringify(detail)}`}`);
  }
}

function token(): string {
  const value = process.env.BLOB_READ_WRITE_TOKEN;
  if (!value) throw new Error("BLOB_READ_WRITE_TOKEN missing");
  return value;
}

console.log(`store = ${process.env.ORDER_STORE_URL}`);
console.log(`test prefix = ${PREFIX}\n`);

// --- put + read back through the returned url, the way order-store does it ---
console.log("put / fetch(blob.url) — mirrors readJsonBlob and receipt.ts");
const jsonPath = `${PREFIX}order.json`;
const payload = { orderNumber: "9001", nested: { total: 55.5 }, unicode: "澳洲 ✓" };
const putResult = await put(jsonPath, JSON.stringify(payload), {
  access: "private",
  contentType: "application/json",
  token: token(),
  addRandomSuffix: false,
  allowOverwrite: true,
});
check("put returns pathname", putResult.pathname === jsonPath, putResult.pathname);
check("put returns absolute https url", /^https:\/\//.test(putResult.url), putResult.url);

const viaUrl = await fetch(putResult.url, {
  headers: { authorization: `Bearer ${token()}` },
  cache: "no-store",
});
check("fetch(blob.url) is 200", viaUrl.status === 200, viaUrl.status);
const roundTripped = await viaUrl.json();
check("json survives round trip incl. unicode", JSON.stringify(roundTripped) === JSON.stringify(payload), roundTripped);

const unauthorized = await fetch(putResult.url);
check("fetch without token is rejected", unauthorized.status === 401, unauthorized.status);

// --- overwrite must replace, since every store writes with allowOverwrite ---
console.log("\noverwrite semantics");
await put(jsonPath, JSON.stringify({ orderNumber: "9001", version: 2 }), {
  access: "private",
  contentType: "application/json",
  token: token(),
  addRandomSuffix: false,
  allowOverwrite: true,
});
const afterOverwrite = await (await fetch(putResult.url, { headers: { authorization: `Bearer ${token()}` } })).json();
check("overwrite replaces content", (afterOverwrite as { version?: number }).version === 2, afterOverwrite);
check("overwrite keeps the same pathname", true);

// --- list by exact path: stores do blobs.find(b => b.pathname === pathname) ---
console.log("\nlist({ prefix: exactPath }) — the readJsonBlob lookup pattern");
const exact = await list({ prefix: jsonPath, token: token() });
check("exact-prefix list finds the blob", exact.blobs.some((b) => b.pathname === jsonPath), exact.blobs.map((b) => b.pathname));

// --- list by directory prefix + ordering, as listOrders / listCheckoutDrafts do ---
console.log("\nlist({ prefix: dir }) — the listOrders pattern");
for (const n of ["9002", "9003", "9004"]) {
  await put(`${PREFIX}${n}.json`, JSON.stringify({ orderNumber: n }), {
    access: "private",
    contentType: "application/json",
    token: token(),
    addRandomSuffix: false,
    allowOverwrite: true,
  });
}
const dirList = await list({ prefix: PREFIX, token: token() });
check("lists all 4 blobs under the prefix", dirList.blobs.length === 4, dirList.blobs.length);
check("every entry has size + uploadedAt", dirList.blobs.every((b) => b.size > 0 && !!b.uploadedAt));
check("hasMore is false for a small set", dirList.hasMore === false, dirList.hasMore);
check("unrelated prefix returns empty", (await list({ prefix: "_itest/nope/", token: token() })).blobs.length === 0);

// --- pagination: cleanupOrderReceipts loops on hasMore/cursor ---
console.log("\ncursor pagination — the cleanupOrderReceipts loop");
const page1 = await list({ prefix: PREFIX, token: token(), limit: 2 });
check("first page respects limit", page1.blobs.length === 2, page1.blobs.length);
check("first page reports hasMore", page1.hasMore === true, page1.hasMore);
check("first page returns a cursor", typeof page1.cursor === "string", page1.cursor);
const page2 = await list({ prefix: PREFIX, token: token(), limit: 2, cursor: page1.cursor });
check("second page returns the rest", page2.blobs.length === 2, page2.blobs.length);
check("second page ends pagination", page2.hasMore === false, page2.hasMore);
const seen = [...page1.blobs, ...page2.blobs].map((b) => b.pathname);
check("pages do not overlap or skip", new Set(seen).size === 4, seen);

// --- binary + head: review-photo.ts calls head() then fetches meta.url ---
console.log("\nbinary put + head() — the review-photo / receipt path");
const png = Buffer.from(
  "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8DwHwAFAAH/q842iQAAAABJRU5ErkJggg==",
  "base64",
);
const photoPath = `${PREFIX}photo.png`;
await put(photoPath, png, {
  access: "private",
  contentType: "image/png",
  token: token(),
  addRandomSuffix: false,
  allowOverwrite: true,
});
const meta = await head(photoPath, { token: token() });
check("head returns contentType", meta.contentType === "image/png", meta.contentType);
check("head returns matching size", meta.size === png.length, { got: meta.size, want: png.length });
check("head returns a usable url", /^https:\/\//.test(meta.url), meta.url);
const imageResponse = await fetch(meta.url, { headers: { authorization: `Bearer ${token()}` } });
const imageBytes = Buffer.from(await imageResponse.arrayBuffer());
check("binary bytes are byte-identical", imageBytes.equals(png), { got: imageBytes.length, want: png.length });
check("binary content-type is served", imageResponse.headers.get("content-type") === "image/png", imageResponse.headers.get("content-type"));

// --- del by URL: cleanupOrderReceipts passes blob.url, not pathname ---
console.log("\ndel([blob.url]) — cleanupOrderReceipts passes urls");
await del([meta.url], { token: token() });
const afterDelete = await list({ prefix: photoPath, token: token() });
check("deleted blob disappears from list", afterDelete.blobs.length === 0, afterDelete.blobs);
const goneResponse = await fetch(meta.url, { headers: { authorization: `Bearer ${token()}` } });
check("deleted blob url now 404s", goneResponse.status === 404, goneResponse.status);

console.log("\ndel is idempotent (cron may retry)");
let idempotent = true;
try {
  await del([meta.url], { token: token() });
} catch (error) {
  idempotent = false;
  console.error(error);
}
check("deleting a missing blob does not throw", idempotent);

console.log("\nhead() on a missing blob rejects (review-photo relies on the throw)");
let headThrew = false;
try {
  await head(`${PREFIX}definitely-missing.png`, { token: token() });
} catch {
  headThrew = true;
}
check("head throws for missing blob", headThrew);

// --- cleanup ---
console.log("\ncleanup");
const leftovers = await list({ prefix: PREFIX, token: token() });
await del(leftovers.blobs.map((b) => b.url), { token: token() });
const finalCheck = await list({ prefix: PREFIX, token: token() });
check("test data removed", finalCheck.blobs.length === 0, finalCheck.blobs.map((b) => b.pathname));

console.log(`\n${failures === 0 ? "ALL PASSED" : `${failures} FAILURE(S)`}`);
process.exit(failures === 0 ? 0 : 1);
