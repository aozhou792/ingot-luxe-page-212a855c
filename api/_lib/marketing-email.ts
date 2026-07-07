import { Resend } from "resend";
import type { CheckoutDraft } from "./draft-store.js";
import { COUPON_DISCOUNT_AUD, COUPON_VALID_DAYS } from "./coupon-store.js";
import type { StoredUser } from "./user-store.js";

const DEFAULT_SITE_URL = "https://www.ailibarbar.com";

function appBaseUrl(): string {
  return (process.env.SITE_URL || DEFAULT_SITE_URL).replace(/\/+$/, "");
}

function fromAddress(): string {
  return process.env.ORDER_FROM_EMAIL ?? "Alibarbar Orders <orders@ailibarbar.com>";
}

async function sendEmail(to: string, subject: string, html: string, text: string): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.warn("RESEND_API_KEY missing — skipping customer email");
    return;
  }
  const resend = new Resend(apiKey);
  await resend.emails.send({ from: fromAddress(), to, subject, html, text });
}

function orderLinesHtml(draft: CheckoutDraft): string {
  return draft.order.lines
    .map((l) => `<li>${l.name} × ${l.qty} — AUD ${(l.price * l.qty).toFixed(2)}</li>`)
    .join("");
}

export async function sendAbandonedCheckoutEmail(draft: CheckoutDraft, couponCode?: string): Promise<void> {
  const email = draft.order.billing.email;
  const checkoutUrl = `${appBaseUrl()}/checkout`;
  const reference = `VN #${draft.order.orderNumber}`;
  const lines = orderLinesHtml(draft);

  const withCoupon = Boolean(couponCode);
  const subject = withCoupon
    ? `Your ${reference} is waiting — A$${COUPON_DISCOUNT_AUD} off expires soon`
    : `Complete your Alibarbar order ${reference}`;

  const couponBlock = withCoupon
    ? `
      <p style="margin:16px 0;padding:16px;background:#1a1a1a;border:1px solid #d7b760;border-radius:8px;">
        <strong>Your exclusive code: ${couponCode}</strong><br/>
        Save <strong>A$${COUPON_DISCOUNT_AUD.toFixed(2)}</strong> on this order (3+ devices required).<br/>
        Expires in ${COUPON_VALID_DAYS} days — complete checkout before it ends.
      </p>
    `
    : "";

  const html = `
    <h2>Still thinking about your order?</h2>
    <p>Hi ${draft.order.billing.firstName},</p>
    <p>We noticed you started order <strong>${reference}</strong> but have not uploaded your bank transfer receipt yet.</p>
    <h3>Your items</h3>
    <ul>${lines}</ul>
    <p><strong>Subtotal:</strong> AUD ${draft.order.subtotal.toFixed(2)}<br/>
    <strong>Shipping:</strong> AUD ${draft.order.shipping.toFixed(2)}<br/>
    <strong>Total:</strong> AUD ${draft.order.total.toFixed(2)}</p>
    ${couponBlock}
    <p>Return to checkout and upload your payment screenshot to confirm your order.</p>
    <p><a href="${checkoutUrl}" style="display:inline-block;padding:12px 24px;background:#d7b760;color:#111;text-decoration:none;border-radius:999px;font-weight:bold;">Complete my order</a></p>
    <p style="font-size:12px;color:#666;">If you already paid, please upload your receipt on the order page or email orders@ailibarbar.com with reference ${reference}.</p>
  `;

  const text = [
    `Hi ${draft.order.billing.firstName},`,
    "",
    `Order ${reference} is still awaiting payment confirmation.`,
    "",
    ...draft.order.lines.map((l) => `- ${l.name} x${l.qty}`),
    "",
    `Total: AUD ${draft.order.total.toFixed(2)}`,
    withCoupon ? `Your code: ${couponCode} (A$${COUPON_DISCOUNT_AUD} off, 3+ devices, expires in ${COUPON_VALID_DAYS} days)` : "",
    "",
    `Complete your order: ${checkoutUrl}`,
  ]
    .filter(Boolean)
    .join("\n");

  await sendEmail(email, subject, html, text);
}

export async function sendMarketingPromoEmail(user: StoredUser): Promise<void> {
  const shopUrl = `${appBaseUrl()}/#flavors`;
  const packsUrl = `${appBaseUrl()}/product/custom-5-pack`;
  const telegramUrl = "https://t.me/ailibarbar";

  const subject = "New from Alibarbar Australia — flavours, packs & deals";
  const html = `
    <h2>Hi ${user.displayName},</h2>
    <p>Thanks for being part of Alibarbar Australia. Here is what is new for adult vapers this week:</p>
    <ul>
      <li><strong>10 signature flavours</strong> — Quadruple Berry, Peach Ice, Mango Magic and more</li>
      <li><strong>Custom 3 / 5 / 10 packs</strong> — mix your favourites and save on shipping</li>
      <li><strong>Tiered AU shipping</strong> — A$10 when you order 5+ devices</li>
    </ul>
    <p><a href="${shopUrl}" style="display:inline-block;padding:12px 24px;background:#d7b760;color:#111;text-decoration:none;border-radius:999px;font-weight:bold;">Shop flavours</a>
    &nbsp;
    <a href="${packsUrl}" style="display:inline-block;padding:12px 24px;border:1px solid #d7b760;color:#d7b760;text-decoration:none;border-radius:999px;font-weight:bold;">Build a custom pack</a></p>
    <p>Join our Telegram community for restock alerts: <a href="${telegramUrl}">${telegramUrl}</a></p>
    <p style="font-size:12px;color:#666;">You receive this because you registered at Alibarbar Australia. Strictly 18+.</p>
  `;

  const text = [
    `Hi ${user.displayName},`,
    "",
    "Shop flavours: " + shopUrl,
    "Custom packs: " + packsUrl,
    "Telegram: " + telegramUrl,
    "",
    "Strictly 18+. Alibarbar Australia.",
  ].join("\n");

  await sendEmail(user.email, subject, html, text);
}
