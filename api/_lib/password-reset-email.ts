import { Resend } from "resend";

const DEFAULT_SITE_URL = "https://www.ailibarbar.com";

function appBaseUrl(): string {
  const raw = process.env.SITE_URL || DEFAULT_SITE_URL;
  return raw.replace(/\/+$/, "");
}

function resetUrl(token: string): string {
  return `${appBaseUrl()}/reset-password?token=${encodeURIComponent(token)}`;
}

export async function sendPasswordResetEmail(to: string, token: string): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) throw new Error("RESEND_API_KEY missing");

  const from = process.env.ORDER_FROM_EMAIL ?? "Alibarbar Orders <orders@ailibarbar.com>";
  const url = resetUrl(token);

  const resend = new Resend(apiKey);
  await resend.emails.send({
    from,
    to,
    subject: "Reset your Alibarbar account password",
    html: `
      <h2>Password reset request</h2>
      <p>We received a request to reset your Alibarbar account password.</p>
      <p><a href="${url}">Click here to reset your password</a></p>
      <p>If the button does not work, copy and paste this link in your browser:</p>
      <p>${url}</p>
      <p>This link expires in 60 minutes.</p>
      <p>If you did not request this, you can safely ignore this email.</p>
    `,
    text: [
      "Password reset request",
      "",
      "We received a request to reset your Alibarbar account password.",
      `Reset link: ${url}`,
      "",
      "This link expires in 60 minutes.",
      "If you did not request this, you can ignore this email.",
    ].join("\n"),
  });
}
