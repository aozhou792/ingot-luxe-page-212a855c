import { getCheckoutDraft, saveCheckoutDraft } from "./_lib/draft-store.js";
import type { OrderDetails } from "./_lib/types.js";

export async function POST(request: Request): Promise<Response> {
  try {
    const body = (await request.json()) as { order?: OrderDetails; deviceCount?: number };
    const { order, deviceCount } = body;

    if (!order?.orderNumber || !order.billing?.email || typeof deviceCount !== "number") {
      return Response.json({ error: "Invalid draft payload" }, { status: 400 });
    }

    const existing = await getCheckoutDraft(order.orderNumber);
    const draft = await saveCheckoutDraft({
      orderNumber: order.orderNumber,
      order: { ...order, deviceCount },
      deviceCount,
      createdAt: existing?.createdAt || new Date().toISOString(),
      abandonedReminderSentAt: existing?.abandonedReminderSentAt,
      couponCode: existing?.couponCode,
      completedAt: existing?.completedAt,
    });

    // Draft only — order details are shown on /order-complete (no customer email on place order).
    return Response.json({ ok: true, orderNumber: draft.orderNumber });
  } catch (error) {
    console.error("save-checkout-draft failed:", error);
    const message = error instanceof Error ? error.message : "Failed to save checkout draft";
    return Response.json({ error: message }, { status: 500 });
  }
}
