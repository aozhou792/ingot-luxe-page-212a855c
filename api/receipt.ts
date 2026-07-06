import { isAuthorized, unauthorizedResponse } from "./_lib/auth.js";
import { listOrders } from "./_lib/order-store.js";

export async function GET(request: Request): Promise<Response> {
  if (!isAuthorized(request)) return unauthorizedResponse();

  const orderNumber = new URL(request.url).searchParams.get("orderNumber");
  if (!orderNumber) {
    return Response.json({ error: "orderNumber is required" }, { status: 400 });
  }

  try {
    const orders = await listOrders();
    const order = orders.find((o) => o.orderNumber === orderNumber);
    if (!order?.paymentReceipt) {
      return Response.json({ error: "Receipt not found" }, { status: 404 });
    }

    const token = process.env.BLOB_READ_WRITE_TOKEN;
    if (!token) return Response.json({ error: "Storage not configured" }, { status: 500 });

    const receiptResponse = await fetch(order.paymentReceipt, {
      headers: { authorization: `Bearer ${token}` },
    });
    if (!receiptResponse.ok) {
      return Response.json({ error: "Could not load receipt image" }, { status: 502 });
    }

    const contentType = receiptResponse.headers.get("content-type") ?? "image/png";
    return new Response(receiptResponse.body, {
      headers: {
        "Content-Type": contentType,
        "Cache-Control": "private, max-age=60",
      },
    });
  } catch (error) {
    console.error("receipt GET failed:", error);
    return Response.json({ error: "Failed to load receipt" }, { status: 500 });
  }
}
