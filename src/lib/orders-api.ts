import type { OrderDetails, PaymentStatus, StoredOrder } from "@/lib/orders";

const ADMIN_KEY_STORAGE = "alibarbar-admin-key";

export function getAdminKey(): string {
  if (typeof window === "undefined") return "";
  return sessionStorage.getItem(ADMIN_KEY_STORAGE) ?? "";
}

export function setAdminKey(key: string): void {
  sessionStorage.setItem(ADMIN_KEY_STORAGE, key.trim());
}

export function clearAdminKey(): void {
  sessionStorage.removeItem(ADMIN_KEY_STORAGE);
}

function authHeaders(): HeadersInit {
  const key = getAdminKey();
  return key ? { Authorization: `Bearer ${key}` } : {};
}

async function parseError(response: Response): Promise<string> {
  try {
    const data = (await response.json()) as { error?: string };
    return data.error ?? `Request failed (${response.status})`;
  } catch {
    return `Request failed (${response.status})`;
  }
}

export async function fetchNextOrderNumberFromApi(): Promise<string> {
  const response = await fetch("/api/next-order-number");
  if (!response.ok) throw new Error(await parseError(response));
  const data = (await response.json()) as { orderNumber: string };
  return data.orderNumber;
}

export async function submitOrderToBackend(
  order: OrderDetails,
  receipt: { dataUrl: string; name: string },
): Promise<StoredOrder> {
  const response = await fetch("/api/submit-order", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ order, receipt }),
  });
  if (!response.ok) throw new Error(await parseError(response));
  const data = (await response.json()) as { order: StoredOrder };
  return data.order;
}

export async function fetchOrdersFromBackend(): Promise<StoredOrder[]> {
  const response = await fetch("/api/orders", { headers: authHeaders() });
  if (!response.ok) throw new Error(await parseError(response));
  const data = (await response.json()) as { orders: StoredOrder[] };
  return data.orders;
}

export async function updateOrderStatusOnBackend(
  orderNumber: string,
  status: PaymentStatus,
): Promise<StoredOrder> {
  const response = await fetch("/api/orders", {
    method: "PATCH",
    headers: { "Content-Type": "application/json", ...authHeaders() },
    body: JSON.stringify({ orderNumber, paymentStatus: status }),
  });
  if (!response.ok) throw new Error(await parseError(response));
  const data = (await response.json()) as { order: StoredOrder };
  return data.order;
}

export async function fetchReceiptBlobUrl(orderNumber: string): Promise<string> {
  const response = await fetch(`/api/receipt?orderNumber=${encodeURIComponent(orderNumber)}`, {
    headers: authHeaders(),
  });
  if (!response.ok) throw new Error(await parseError(response));
  const blob = await response.blob();
  return URL.createObjectURL(blob);
}
