/**
 * End-to-end check of the production admin read path against the VPS store,
 * without sending any email.
 *
 * Writes one synthetic order + receipt straight into the store, then drives the
 * live ailibarbar.com endpoints that a merchant actually uses, and cleans up.
 */
const STORE = "https://api.ailibarbar.com";
const SITE = "https://www.ailibarbar.com";
const STORE_TOKEN = process.env.BLOB_READ_WRITE_TOKEN;
const ADMIN_KEY = process.env.ADMIN_API_KEY;
const ORDER_NUMBER = "99001";

if (!STORE_TOKEN || !ADMIN_KEY) {
  console.error("BLOB_READ_WRITE_TOKEN and ADMIN_API_KEY are required");
  process.exit(1);
}

let failures = 0;
const check = (name, ok, detail) => {
  if (ok) console.log(`  PASS  ${name}`);
  else {
    failures += 1;
    console.error(`  FAIL  ${name}${detail === undefined ? "" : ` -> ${JSON.stringify(detail)}`}`);
  }
};

const storeHeaders = { authorization: `Bearer ${STORE_TOKEN}` };
const adminHeaders = { authorization: `Bearer ${ADMIN_KEY}` };

const png = Buffer.from(
  "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8DwHwAFAAH/q842iQAAAABJRU5ErkJggg==",
  "base64",
);

async function storePut(pathname, body, contentType) {
  const res = await fetch(`${STORE}/b/${pathname}`, {
    method: "PUT",
    headers: { ...storeHeaders, "x-blob-content-type": contentType },
    body,
  });
  if (!res.ok) throw new Error(`store put ${pathname}: HTTP ${res.status}`);
  return res.json();
}

console.log("seeding a synthetic order into the VPS store");
const receiptBlob = await storePut(`receipts/${ORDER_NUMBER}.png`, png, "image/png");
const order = {
  orderNumber: ORDER_NUMBER,
  date: new Date().toISOString(),
  lines: [{ slug: "custom-10-pack", name: "Custom 10 Pack", qty: 1, price: 205 }],
  subtotal: 205,
  shipping: 0,
  total: 205,
  paymentMethod: "Bank Transfer",
  billing: {
    firstName: "Store",
    lastName: "Migration",
    street: "1 Test St",
    suburb: "Sydney",
    state: "NSW",
    postcode: "2000",
    country: "Australia",
    email: "storecheck@example.invalid",
  },
  shipToDifferent: false,
  deviceCount: 10,
  paymentReceipt: receiptBlob.url,
  paymentReceiptName: "probe.png",
  paymentSubmittedAt: new Date().toISOString(),
  paymentStatus: "pending",
};
await storePut(`orders/${ORDER_NUMBER}.json`, JSON.stringify(order), "application/json");
console.log(`  seeded orders/${ORDER_NUMBER}.json\n`);

console.log("GET /api/orders — admin list");
const listRes = await fetch(`${SITE}/api/orders`, { headers: adminHeaders });
check("returns 200", listRes.status === 200, listRes.status);
const listBody = await listRes.json();
const found = listBody.orders?.find((o) => o.orderNumber === ORDER_NUMBER);
check("synthetic order appears in the list", !!found, listBody.orders?.map((o) => o.orderNumber));
check("total is intact", found?.total === 205, found?.total);
check("receipt url points at our store", found?.paymentReceipt?.startsWith(STORE), found?.paymentReceipt);
check("status starts as pending", found?.paymentStatus === "pending", found?.paymentStatus);

console.log("\nGET /api/orders without a key — must stay locked down");
check("unauthenticated read is 401", (await fetch(`${SITE}/api/orders`)).status === 401);

console.log("\nGET /api/receipt — serves the image through the site");
const receiptRes = await fetch(`${SITE}/api/receipt?orderNumber=${ORDER_NUMBER}`, { headers: adminHeaders });
check("returns 200", receiptRes.status === 200, receiptRes.status);
check("content-type is the image type", receiptRes.headers.get("content-type")?.includes("image/png"), receiptRes.headers.get("content-type"));
const receiptBytes = Buffer.from(await receiptRes.arrayBuffer());
check("bytes match what was stored", receiptBytes.equals(png), { got: receiptBytes.length, want: png.length });

console.log("\nPATCH /api/orders — confirm payment");
const patchRes = await fetch(`${SITE}/api/orders`, {
  method: "PATCH",
  headers: { ...adminHeaders, "content-type": "application/json" },
  body: JSON.stringify({ orderNumber: ORDER_NUMBER, paymentStatus: "confirmed" }),
});
check("returns 200", patchRes.status === 200, patchRes.status);
const afterPatch = await fetch(`${SITE}/api/orders`, { headers: adminHeaders }).then((r) => r.json());
const confirmed = afterPatch.orders?.find((o) => o.orderNumber === ORDER_NUMBER);
check("status persisted as confirmed", confirmed?.paymentStatus === "confirmed", confirmed?.paymentStatus);
check("confirmation timestamp written", !!confirmed?.paymentConfirmedAt, confirmed?.paymentConfirmedAt);

console.log("\ncleanup");
for (const path of [`orders/${ORDER_NUMBER}.json`, `receipts/${ORDER_NUMBER}.png`]) {
  const res = await fetch(`${STORE}/b/${path}`, { method: "DELETE", headers: storeHeaders });
  check(`deleted ${path}`, res.ok, res.status);
}
const finalList = await fetch(`${SITE}/api/orders`, { headers: adminHeaders }).then((r) => r.json());
check("synthetic order is gone", !finalList.orders?.some((o) => o.orderNumber === ORDER_NUMBER), finalList.orders?.map((o) => o.orderNumber));

console.log(`\n${failures === 0 ? "ALL PASSED" : `${failures} FAILURE(S)`}`);
process.exit(failures === 0 ? 0 : 1);
