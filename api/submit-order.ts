import { saveOrderWithReceipt } from "./_lib/order-store.js";
import { sendOrderNotificationEmail } from "./_lib/email.js";
import type { SubmitOrderBody } from "./_lib/types.js";

export async function POST(request: Request): Promise<Response> {
  try {
    const body = (await request.json()) as SubmitOrderBody;
    const { order, receipt } = body;

    if (!order?.orderNumber || !order?.billing?.email || !receipt?.dataUrl) {
      return Response.json({ error: "Invalid order payload" }, { status: 400 });
    }

    const saved = await saveOrderWithReceipt(order, receipt);

    try {
      await sendOrderNotificationEmail(saved, receipt);
    } catch (emailError) {
      console.error("Email notification failed:", emailError);
      // Order is still saved even if email fails.
    }

    return Response.json({ ok: true, order: saved });
  } catch (error) {
    console.error("submit-order failed:", error);
    const message = error instanceof Error ? error.message : "Failed to submit order";
    return Response.json({ error: message }, { status: 500 });
  }
}
