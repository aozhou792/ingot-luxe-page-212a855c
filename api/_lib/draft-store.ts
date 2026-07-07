import { list, put } from "@vercel/blob";
import type { OrderDetails } from "./types.js";

const DRAFT_PREFIX = "drafts/";
const ORDER_PREFIX = "orders/";

export type CheckoutDraft = {
  orderNumber: string;
  order: OrderDetails;
  deviceCount: number;
  createdAt: string;
  abandonedReminderSentAt?: string;
  couponCode?: string;
  completedAt?: string;
};

function blobToken(): string {
  const token = process.env.BLOB_READ_WRITE_TOKEN;
  if (!token) throw new Error("BLOB_READ_WRITE_TOKEN is not configured");
  return token;
}

function draftPath(orderNumber: string): string {
  return `${DRAFT_PREFIX}${orderNumber}.json`;
}

async function readJson<T>(pathname: string): Promise<T | null> {
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

export async function saveCheckoutDraft(draft: CheckoutDraft): Promise<CheckoutDraft> {
  const token = blobToken();
  const record: CheckoutDraft = {
    ...draft,
    createdAt: draft.createdAt || new Date().toISOString(),
  };
  await put(draftPath(draft.orderNumber), JSON.stringify(record), {
    access: "private",
    contentType: "application/json",
    token,
    addRandomSuffix: false,
    allowOverwrite: true,
  });
  return record;
}

export async function listCheckoutDrafts(): Promise<CheckoutDraft[]> {
  const token = blobToken();
  const { blobs } = await list({ prefix: DRAFT_PREFIX, token });
  const jsonBlobs = blobs.filter((b) => b.pathname.endsWith(".json"));

  const drafts = await Promise.all(
    jsonBlobs.map(async (blob) => {
      const response = await fetch(blob.url, {
        headers: { authorization: `Bearer ${token}` },
        cache: "no-store",
      });
      if (!response.ok) return null;
      return (await response.json()) as CheckoutDraft;
    }),
  );

  return drafts.filter((d): d is CheckoutDraft => Boolean(d));
}

export async function orderReceiptExists(orderNumber: string): Promise<boolean> {
  const existing = await readJson<unknown>(`${ORDER_PREFIX}${orderNumber}.json`);
  return Boolean(existing);
}

export async function markDraftReminderSent(
  orderNumber: string,
  couponCode?: string,
): Promise<CheckoutDraft | null> {
  const pathname = draftPath(orderNumber);
  const existing = await readJson<CheckoutDraft>(pathname);
  if (!existing) return null;

  const updated: CheckoutDraft = {
    ...existing,
    abandonedReminderSentAt: new Date().toISOString(),
    couponCode: couponCode ?? existing.couponCode,
  };

  const token = blobToken();
  await put(pathname, JSON.stringify(updated), {
    access: "private",
    contentType: "application/json",
    token,
    addRandomSuffix: false,
    allowOverwrite: true,
  });
  return updated;
}

export async function completeCheckoutDraft(orderNumber: string): Promise<void> {
  const pathname = draftPath(orderNumber);
  const existing = await readJson<CheckoutDraft>(pathname);
  if (!existing) return;

  const updated: CheckoutDraft = {
    ...existing,
    completedAt: new Date().toISOString(),
  };

  const token = blobToken();
  await put(pathname, JSON.stringify(updated), {
    access: "private",
    contentType: "application/json",
    token,
    addRandomSuffix: false,
    allowOverwrite: true,
  });
}
