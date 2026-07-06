import type { OrderDetails } from "@/types/navigation";

const ORDER_SEQ_KEY = "alibarbar-order-seq";
const ORDERS_STORAGE_KEY = "alibarbar-orders";

/** First order number when no prior sequence exists in localStorage. */
export const ORDER_SEQ_INITIAL = 3870;

export const MAX_RECEIPT_BYTES = 5 * 1024 * 1024;
export const RECEIPT_ACCEPT = "image/jpeg,image/png,image/webp,image/heic,image/heif";

export type PaymentStatus = "pending" | "confirmed";

export type StoredOrder = OrderDetails & {
  paymentReceipt?: string;
  paymentReceiptName?: string;
  paymentSubmittedAt?: string;
  paymentStatus?: PaymentStatus;
};

/** Next sequential order number (3870, 3871, 3872, …). */
export function nextOrderNumber(): string {
  if (typeof window === "undefined") return String(ORDER_SEQ_INITIAL);
  try {
    const raw = window.localStorage.getItem(ORDER_SEQ_KEY);
    const last = raw ? Number.parseInt(raw, 10) : ORDER_SEQ_INITIAL - 1;
    const next = Number.isFinite(last) ? last + 1 : ORDER_SEQ_INITIAL;
    window.localStorage.setItem(ORDER_SEQ_KEY, String(next));
    return String(next);
  } catch {
    return String(ORDER_SEQ_INITIAL);
  }
}

export function formatOrderReference(orderNumber: string): string {
  return `VN #${orderNumber}`;
}

function loadOrders(): StoredOrder[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(ORDERS_STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function getStoredOrders(): StoredOrder[] {
  return loadOrders();
}

/** Persist order + payment screenshot locally as a cache after cloud backup succeeds. */
export function cacheOrderLocally(order: StoredOrder): void {
  try {
    const existing = loadOrders();
    const next = [order, ...existing.filter((o) => o.orderNumber !== order.orderNumber)];
    window.localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(next));
  } catch {
    /* ignore local cache failures */
  }
}

/** @deprecated Use submitOrderWithReceipt via orders-api for cloud backup. */
export function saveOrderWithReceipt(
  order: OrderDetails,
  receipt: { dataUrl: string; name: string },
): void {
  const entry: StoredOrder = {
    ...order,
    paymentReceipt: receipt.dataUrl,
    paymentReceiptName: receipt.name,
    paymentSubmittedAt: new Date().toISOString(),
    paymentStatus: "pending",
  };

  try {
    const existing = loadOrders();
    const next = [entry, ...existing.filter((o) => o.orderNumber !== order.orderNumber)];
    window.localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(next));
  } catch {
    throw new Error("Could not save your receipt. Try a smaller image.");
  }
}

export function updateOrderPaymentStatus(orderNumber: string, status: PaymentStatus): void {
  const existing = loadOrders();
  const next = existing.map((o) => (o.orderNumber === orderNumber ? { ...o, paymentStatus: status } : o));
  window.localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(next));
}

export function readReceiptFile(file: File): Promise<{ dataUrl: string; name: string }> {
  if (!file.type.startsWith("image/")) {
    return Promise.reject(new Error("Please upload an image file (JPG, PNG, or WebP)."));
  }
  if (file.size > MAX_RECEIPT_BYTES) {
    return Promise.reject(new Error("Image must be 5 MB or smaller."));
  }

  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === "string") {
        resolve({ dataUrl: reader.result, name: file.name });
      } else {
        reject(new Error("Could not read the image."));
      }
    };
    reader.onerror = () => reject(new Error("Could not read the image."));
    reader.readAsDataURL(file);
  });
}

export async function dataUrlToFile(dataUrl: string, fileName: string): Promise<File> {
  const response = await fetch(dataUrl);
  const blob = await response.blob();
  const hasExt = /\.[A-Za-z0-9]+$/.test(fileName);
  const ext = blob.type.split("/")[1] ?? "png";
  const finalName = hasExt ? fileName : `${fileName}.${ext}`;
  return new File([blob], finalName, { type: blob.type || "image/png" });
}

export function buildPaymentShareText(order: OrderDetails): string {
  const reference = formatOrderReference(order.orderNumber);
  const lines = order.lines.map((line) => `${line.name} x ${line.qty}`).join(", ");
  return [
    `Payment proof for ${reference}`,
    `Date: ${order.date}`,
    `Total: AUD ${order.total.toFixed(2)}`,
    `Customer: ${order.billing.firstName} ${order.billing.lastName}`,
    `Email: ${order.billing.email}`,
    `Items: ${lines}`,
  ].join("\n");
}
