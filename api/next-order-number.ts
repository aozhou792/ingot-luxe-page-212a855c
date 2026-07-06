import { nextOrderNumber } from "./_lib/order-store.js";

export async function GET(): Promise<Response> {
  try {
    const orderNumber = await nextOrderNumber();
    return Response.json({ orderNumber });
  } catch (error) {
    console.error("next-order-number failed:", error);
    const message = error instanceof Error ? error.message : "Failed to generate order number";
    return Response.json({ error: message }, { status: 500 });
  }
}
