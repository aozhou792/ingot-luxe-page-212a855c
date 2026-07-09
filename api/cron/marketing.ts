import { authorizeCron } from "../_lib/cron-auth.js";
import { sendMarketingPromoEmail, sendWelcomeEmail } from "../_lib/marketing-email.js";
import { listMarketingRecipients, markMarketingEmailSent } from "../_lib/user-store.js";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

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

/** Send a one-off test email (welcome or marketing) — requires cron auth. */
export async function POST(request: Request): Promise<Response> {
  if (!authorizeCron(request)) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = (await request.json()) as {
      email?: string;
      displayName?: string;
      type?: "welcome" | "marketing";
    };

    const email = (body.email ?? "").trim();
    const displayName = (body.displayName ?? "Test User").trim() || "Test User";
    const type = body.type ?? "welcome";

    if (!EMAIL_RE.test(email)) {
      return Response.json({ error: "Enter a valid email address." }, { status: 400 });
    }

    if (type === "marketing") {
      await sendMarketingPromoEmail({
        id: "test",
        email,
        displayName,
        passwordHash: "",
        createdAt: new Date().toISOString(),
      });
    } else {
      await sendWelcomeEmail({ email, displayName });
    }

    return Response.json({ ok: true, type, email });
  } catch (error) {
    console.error("marketing test email failed:", error);
    const message = error instanceof Error ? error.message : "Failed to send test email";
    return Response.json({ error: message }, { status: 500 });
  }
}
