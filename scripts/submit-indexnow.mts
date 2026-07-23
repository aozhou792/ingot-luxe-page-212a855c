/**
 * Submit all public site URLs to IndexNow (Bing + partners).
 * Requires the key file at public/{KEY}.txt to be deployed first.
 *
 * Usage: npx tsx scripts/submit-indexnow.mts
 * Optional: INDEXNOW_URLS="https://www.ailibarbar.com/,https://..." (comma-separated)
 */
import { getSiteRoutes } from "../src/data/site-routes.ts";

const HOST = "www.ailibarbar.com";
const SITE_URL = `https://${HOST}`;
const KEY = "ceebeecec6a741c4bb4d9bed13e8700b";
const KEY_LOCATION = `${SITE_URL}/${KEY}.txt`;
const ENDPOINT = "https://api.indexnow.org/indexnow";
const BATCH_SIZE = 10_000;

function collectUrls(): string[] {
  const fromEnv = process.env.INDEXNOW_URLS?.trim();
  if (fromEnv) {
    return fromEnv
      .split(",")
      .map((u) => u.trim())
      .filter(Boolean);
  }

  return getSiteRoutes().map((r) => (r.path === "/" ? `${SITE_URL}/` : `${SITE_URL}${r.path}`));
}

async function submitBatch(urlList: string[]): Promise<void> {
  const body = {
    host: HOST,
    key: KEY,
    keyLocation: KEY_LOCATION,
    urlList,
  };

  const res = await fetch(ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json; charset=utf-8" },
    body: JSON.stringify(body),
  });

  const text = await res.text();
  if (res.status !== 200 && res.status !== 202) {
    throw new Error(`IndexNow failed (${res.status}): ${text || res.statusText}`);
  }

  console.log(`[indexnow] OK ${res.status} — submitted ${urlList.length} URLs`);
  if (text) console.log(`[indexnow] ${text}`);
}

async function main() {
  const urls = collectUrls();
  if (urls.length === 0) {
    console.log("[indexnow] No URLs to submit");
    return;
  }

  console.log(`[indexnow] Key: ${KEY_LOCATION}`);
  console.log(`[indexnow] Submitting ${urls.length} URL(s) in batches of ${BATCH_SIZE}…`);

  for (let i = 0; i < urls.length; i += BATCH_SIZE) {
    await submitBatch(urls.slice(i, i + BATCH_SIZE));
  }
}

main().catch((err) => {
  console.error("[indexnow]", err);
  process.exit(1);
});
