import { del, list, put } from "@vercel/blob";
import type { PaymentStatus, StoredOrder } from "./types.js";

const ORDER_SEQ_INITIAL = 3870;
const ORDER_PREFIX = "orders/";
const RECEIPT_PREFIX = "receipts/";
const SEQ_PATH = "meta/order-seq.json";

function blobToken(): string {
  const token = process.env.BLOB_READ_WRITE_TOKEN;
  if (!token) throw new Error("BLOB_READ_WRITE_TOKEN is not configured");
  return token;
}

function orderPath(orderNumber: string): string {
  return `${ORDER_PREFIX}${orderNumber}.json`;
}

function receiptPath(orderNumber: string, ext: string): string {
  return `${RECEIPT_PREFIX}${orderNumber}.${ext}`;
}

function extFromMime(mime: string): string {
  if (mime.includes("png")) return "png";
  if (mime.includes("webp")) return "webp";
  if (mime.includes("jpeg") || mime.includes("jpg")) return "jpg";
  return "png";
}

export function parseDataUrl(dataUrl: string): { buffer: Buffer; contentType: string } {
  const match = /^data:([^;]+);base64,(.+)$/.exec(dataUrl);
  if (!match) throw new Error("Invalid receipt image data");
  return {
    contentType: match[1],
    buffer: Buffer.from(match[2], "base64"),
  };
}

async function readJsonBlob<T>(pathname: string): Promise<T | null> {
  const token = blobToken();
  const { blobs } = await list({ prefix: pathname, token });
  const blob = blobs.find((b) => b.pathname === pathname);
  if (!blob) return null;

  const response = await fetch(blob.url, {
    headers: { authorization: `Bearer ${token}` },
    cache: "no-store",
  });
  if (!response.ok) return null;
  return (await response.json()) as T;
}

export async function nextOrderNumber(): Promise<string> {
  const token = blobToken();
  const current = await readJsonBlob<{ last: number }>(SEQ_PATH);
  const last = current?.last ?? ORDER_SEQ_INITIAL - 1;
  const next = Number.isFinite(last) ? last + 1 : ORDER_SEQ_INITIAL;

  await put(SEQ_PATH, JSON.stringify({ last: next }), {
    access: "private",
    contentType: "application/json",
    token,
    addRandomSuffix: false,
    allowOverwrite: true,
  });

  return String(next);
}

export async function listOrders(): Promise<StoredOrder[]> {
  const token = blobToken();
  const { blobs } = await list({ prefix: ORDER_PREFIX, token });
  const jsonBlobs = blobs.filter((b) => b.pathname.endsWith(".json"));

  const orders = await Promise.all(
    jsonBlobs.map(async (blob) => {
      const response = await fetch(blob.url, {
        headers: { authorization: `Bearer ${token}` },
        cache: "no-store",
      });
      if (!response.ok) return null;
      return (await response.json()) as StoredOrder;
    }),
  );

  return orders
    .filter((o): o is StoredOrder => Boolean(o))
    .sort((a, b) => Number.parseInt(b.orderNumber, 10) - Number.parseInt(a.orderNumber, 10));
}

export async function saveOrderWithReceipt(
  order: StoredOrder,
  receipt: { dataUrl: string; name: string },
): Promise<StoredOrder> {
  const token = blobToken();
  const { buffer, contentType } = parseDataUrl(receipt.dataUrl);
  const ext = extFromMime(contentType);

  const receiptBlob = await put(receiptPath(order.orderNumber, ext), buffer, {
    access: "private",
    contentType,
    token,
    addRandomSuffix: false,
    allowOverwrite: true,
  });

  const record: StoredOrder = {
    ...order,
    paymentReceipt: receiptBlob.url,
    paymentReceiptName: receipt.name,
    paymentSubmittedAt: new Date().toISOString(),
    paymentStatus: "pending",
  };

  await put(orderPath(order.orderNumber), JSON.stringify(record), {
    access: "private",
    contentType: "application/json",
    token,
    addRandomSuffix: false,
    allowOverwrite: true,
  });

  return record;
}

/** Delete all payment receipt images and clear receipt fields on stored orders. */
export async function cleanupOrderReceipts(): Promise<{ deleted: number; ordersUpdated: number }> {
  const token = blobToken();
  let deleted = 0;
  let cursor: string | undefined;

  do {
    const result = await list({ prefix: RECEIPT_PREFIX, token, cursor });
    if (result.blobs.length > 0) {
      await del(
        result.blobs.map((b) => b.url),
        { token },
      );
      deleted += result.blobs.length;
    }
    cursor = result.hasMore ? result.cursor : undefined;
  } while (cursor);

  const orders = await listOrders();
  let ordersUpdated = 0;

  for (const order of orders) {
    if (!order.paymentReceipt && !order.paymentReceiptName) continue;

    const { paymentReceipt: _r, paymentReceiptName: _n, ...rest } = order;
    await put(orderPath(order.orderNumber), JSON.stringify(rest), {
      access: "private",
      contentType: "application/json",
      token,
      addRandomSuffix: false,
      allowOverwrite: true,
    });
    ordersUpdated += 1;
  }

  return { deleted, ordersUpdated };
}

export async function updateOrderStatus(orderNumber: string, status: PaymentStatus): Promise<StoredOrder | null> {
  const token = blobToken();
  const pathname = orderPath(orderNumber);
  const existing = await readJsonBlob<StoredOrder>(pathname);
  if (!existing) return null;

  const updated: StoredOrder = {
    ...existing,
    paymentStatus: status,
    paymentConfirmedAt: status === "confirmed" ? new Date().toISOString() : undefined,
  };
  await put(pathname, JSON.stringify(updated), {
    access: "private",
    contentType: "application/json",
    token,
    addRandomSuffix: false,
    allowOverwrite: true,
  });
  return updated;
}
