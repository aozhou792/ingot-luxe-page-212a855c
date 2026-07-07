import { saveCheckoutDraft } from "./_lib/draft-store.js";
import type { OrderDetails } from "./_lib/types.js";

export async function POST(request: Request): Promise<Response> {
  try {
    const body = (await request.json()) as { order?: OrderDetails; deviceCount?: number };
    const { order, deviceCount } = body;

    if (!order?.orderNumber || !order.billing?.email || typeof deviceCount !== "number") {
      return Response.json({ error: "Invalid draft payload" }, { status: 400 });
    }

    const draft = await saveCheckoutDraft({
      orderNumber: order.orderNumber,
      order: { ...order, deviceCount },
      deviceCount,
      createdAt: new Date().toISOString(),
    });

    return Response.json({ ok: true, orderNumber: draft.orderNumber });
  } catch (error) {
    console.error("save-checkout-draft failed:", error);
    const message = error instanceof Error ? error.message : "Failed to save checkout draft";
    return Response.json({ error: message }, { status: 500 });
  }
}
