import { getCheckoutDraft, orderReceiptExists } from "./_lib/draft-store.js";

function normalizeEmail(email: string): string {
  return email.trim().toLowerCase();
}

export async function GET(request: Request): Promise<Response> {
  try {
    const url = new URL(request.url);
    const orderNumber = url.searchParams.get("orderNumber")?.trim() ?? "";
    const email = url.searchParams.get("email")?.trim() ?? "";

    if (!orderNumber || !email) {
      return Response.json({ error: "orderNumber and email are required" }, { status: 400 });
    }

    const draft = await getCheckoutDraft(orderNumber);
    if (!draft) {
      return Response.json({ error: "Order not found" }, { status: 404 });
    }

    if (normalizeEmail(draft.order.billing.email) !== normalizeEmail(email)) {
      return Response.json({ error: "Order not found" }, { status: 404 });
    }

    if (draft.completedAt || (await orderReceiptExists(orderNumber))) {
      return Response.json({ error: "This order is already completed" }, { status: 409 });
    }

    return Response.json({ ok: true, order: draft.order });
  } catch (error) {
    console.error("resume-checkout failed:", error);
    const message = error instanceof Error ? error.message : "Failed to resume checkout";
    return Response.json({ error: message }, { status: 500 });
  }
}
