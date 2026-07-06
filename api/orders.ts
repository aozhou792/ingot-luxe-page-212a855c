import { isAuthorized, unauthorizedResponse } from "./_lib/auth.js";
import { listOrders, updateOrderStatus } from "./_lib/order-store.js";
import type { PaymentStatus } from "./_lib/types.js";

export async function GET(request: Request): Promise<Response> {
  if (!isAuthorized(request)) return unauthorizedResponse();

  try {
    const orders = await listOrders();
    return Response.json({ orders });
  } catch (error) {
    console.error("orders GET failed:", error);
    const message = error instanceof Error ? error.message : "Failed to load orders";
    return Response.json({ error: message }, { status: 500 });
  }
}

export async function PATCH(request: Request): Promise<Response> {
  if (!isAuthorized(request)) return unauthorizedResponse();

  try {
    const body = (await request.json()) as { orderNumber?: string; paymentStatus?: PaymentStatus };
    if (!body.orderNumber || !body.paymentStatus) {
      return Response.json({ error: "orderNumber and paymentStatus are required" }, { status: 400 });
    }
    if (body.paymentStatus !== "pending" && body.paymentStatus !== "confirmed") {
      return Response.json({ error: "Invalid paymentStatus" }, { status: 400 });
    }

    const updated = await updateOrderStatus(body.orderNumber, body.paymentStatus);
    if (!updated) return Response.json({ error: "Order not found" }, { status: 404 });

    return Response.json({ order: updated });
  } catch (error) {
    console.error("orders PATCH failed:", error);
    const message = error instanceof Error ? error.message : "Failed to update order";
    return Response.json({ error: message }, { status: 500 });
  }
}
