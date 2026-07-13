import { authorizeCron } from "../_lib/cron-auth.js";
import {
  listCheckoutDrafts,
  markDraftReminderSent,
  orderReceiptExists,
} from "../_lib/draft-store.js";
import { sendAbandonedCheckoutEmail } from "../_lib/marketing-email.js";

const ABANDONMENT_MS = 24 * 60 * 60 * 1000;

export async function GET(request: Request): Promise<Response> {
  if (!authorizeCron(request)) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const drafts = await listCheckoutDrafts();
    const now = Date.now();
    let sent = 0;

    for (const draft of drafts) {
      if (draft.completedAt || draft.abandonedReminderSentAt) continue;
      if (now - new Date(draft.createdAt).getTime() < ABANDONMENT_MS) continue;

      const paid = await orderReceiptExists(draft.orderNumber);
      if (paid) {
        await markDraftReminderSent(draft.orderNumber);
        continue;
      }

      await sendAbandonedCheckoutEmail(draft);
      await markDraftReminderSent(draft.orderNumber);
      sent += 1;
    }

    return Response.json({ ok: true, sent });
  } catch (error) {
    console.error("abandoned-checkout cron failed:", error);
    const message = error instanceof Error ? error.message : "Cron failed";
    return Response.json({ error: message }, { status: 500 });
  }
}
