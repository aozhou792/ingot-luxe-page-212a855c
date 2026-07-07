import { authorizeCron } from "../_lib/cron-auth.js";
import { sendMarketingPromoEmail } from "../_lib/marketing-email.js";
import { listMarketingRecipients, markMarketingEmailSent } from "../_lib/user-store.js";

export async function GET(request: Request): Promise<Response> {
  if (!authorizeCron(request)) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const recipients = await listMarketingRecipients();
    let sent = 0;

    for (const user of recipients) {
      try {
        await sendMarketingPromoEmail(user);
        await markMarketingEmailSent(user.id);
        sent += 1;
      } catch (error) {
        console.error(`marketing email failed for ${user.email}:`, error);
      }
    }

    return Response.json({ ok: true, sent });
  } catch (error) {
    console.error("marketing cron failed:", error);
    const message = error instanceof Error ? error.message : "Cron failed";
    return Response.json({ error: message }, { status: 500 });
  }
}
