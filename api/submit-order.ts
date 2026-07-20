import { markOrderNotifyEmailResult, saveOrderWithReceipt } from "./_lib/order-store.js";
import { sendOrderNotificationEmail } from "./_lib/email.js";
import { redeemCoupon } from "./_lib/coupon-store.js";
import { completeCheckoutDraft } from "./_lib/draft-store.js";
import { assertOrderTotals } from "./_lib/order-totals.js";
import type { SubmitOrderBody } from "./_lib/types.js";

export async function POST(request: Request): Promise<Response> {
  try {
    const body = (await request.json()) as SubmitOrderBody;
    const { order, receipt } = body;

    if (!order?.orderNumber || !order?.billing?.email || !receipt?.dataUrl) {
      return Response.json({ error: "Invalid order payload" }, { status: 400 });
    }

    if (typeof order.deviceCount !== "number" || order.deviceCount <= 0) {
      return Response.json({ error: "Invalid device count" }, { status: 400 });
    }

    await assertOrderTotals(order);

    const saved = await saveOrderWithReceipt(order, receipt);

    if (order.discountCode) {
      await redeemCoupon(order.discountCode, order.orderNumber);
    }
    await completeCheckoutDraft(order.orderNumber);

    try {
      await sendOrderNotificationEmail(saved, receipt);
      const withEmail = await markOrderNotifyEmailResult(saved.orderNumber, { ok: true });
      return Response.json({ ok: true, order: withEmail ?? saved, emailSent: true });
    } catch (emailError) {
      const message = emailError instanceof Error ? emailError.message : String(emailError);
      console.error(
        `Email notification failed for VN #${saved.orderNumber}:`,
        message,
        emailError,
      );
      const withError = await markOrderNotifyEmailResult(saved.orderNumber, {
        ok: false,
        error: message,
      });
      // Order is still saved even if email fails.
      return Response.json({
        ok: true,
        order: withError ?? saved,
        emailSent: false,
        emailError: message,
      });
    }
  } catch (error) {
    console.error("submit-order failed:", error);
    const message = error instanceof Error ? error.message : "Failed to submit order";
    return Response.json({ error: message }, { status: 500 });
  }
}
