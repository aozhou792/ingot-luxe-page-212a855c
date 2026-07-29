import { Resend } from "resend";
import type { CheckoutDraft } from "./draft-store.js";
import { COUPON_DISCOUNT_AUD, COUPON_VALID_DAYS } from "./coupon-store.js";
import type { StoredUser } from "./user-store.js";
import type { OrderDetails } from "./types.js";
import { BANK_TRANSFER } from "./bank.js";

const DEFAULT_SITE_URL = "https://www.ailibarbar.com";
const TELEGRAM_URL = "https://t.me/ailibarbar";
const WHATSAPP_PHONE_DISPLAY = "+86 176 8897 1179";
const WHATSAPP_URL = "https://wa.me/8617688971179";
const SUPPORT_EMAIL = "orders@ailibarbar.com";
const DEFAULT_REPLY_TO = "orders@ailibarbar.com";

function appBaseUrl(): string {
  return (process.env.SITE_URL || DEFAULT_SITE_URL).replace(/\/+$/, "");
}

function fromAddress(): string {
  return process.env.ORDER_FROM_EMAIL ?? "Alibarbar Orders <orders@ailibarbar.com>";
}

/** Customer replies go to orders@ (Cloudflare Email Routing → Gmail). */
function replyToAddress(): string {
  const explicit = process.env.ORDER_REPLY_TO?.trim();
  if (explicit) return explicit;
  return DEFAULT_REPLY_TO;
}

async function sendEmail(to: string, subject: string, html: string, text: string): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.warn("RESEND_API_KEY missing — skipping customer email");
    return;
  }
  const resend = new Resend(apiKey);
  await resend.emails.send({
    from: fromAddress(),
    to,
    replyTo: replyToAddress(),
    subject,
    html,
    text,
  });
}

function orderLinesHtml(order: Pick<OrderDetails, "lines">): string {
  return order.lines
    .map((l) => `<li>${l.name} × ${l.qty} — AUD ${(l.price * l.qty).toFixed(2)}</li>`)
    .join("");
}

function formatReference(orderNumber: string): string {
  return `VN #${orderNumber}`;
}

function resumeOrderUrl(orderNumber: string, email: string): string {
  const params = new URLSearchParams({
    order: orderNumber,
    email: email.trim().toLowerCase(),
  });
  return `${appBaseUrl()}/order-complete?${params.toString()}`;
}

function bankDetailsHtml(): string {
  return `
    <table style="width:100%;border-collapse:collapse;margin:16px 0;font-size:14px;">
      <tr><td style="padding:6px 0;color:#666;">Account Name</td><td style="padding:6px 0;text-align:right;"><strong>${BANK_TRANSFER.accountName}</strong></td></tr>
      <tr><td style="padding:6px 0;color:#666;">BSB</td><td style="padding:6px 0;text-align:right;"><strong>${BANK_TRANSFER.bsb}</strong></td></tr>
      <tr><td style="padding:6px 0;color:#666;">Account Number</td><td style="padding:6px 0;text-align:right;"><strong>${BANK_TRANSFER.accountNumber}</strong></td></tr>
      <tr><td style="padding:6px 0;color:#666;">Swift/BIC</td><td style="padding:6px 0;text-align:right;"><strong>${BANK_TRANSFER.swift}</strong></td></tr>
      <tr><td style="padding:6px 0;color:#666;">Bank</td><td style="padding:6px 0;text-align:right;">${BANK_TRANSFER.bankName}</td></tr>
    </table>
  `;
}

/** Sent when checkout draft is saved — customer confirmation with pay instructions. */
export async function sendCustomerOrderReceivedEmail(order: OrderDetails): Promise<void> {
  const email = order.billing.email;
  const reference = formatReference(order.orderNumber);
  const resumeUrl = resumeOrderUrl(order.orderNumber, email);
  const notesBlock = order.notes?.trim()
    ? `<p><strong>Your notes:</strong> ${order.notes.trim()}</p>`
    : "";

  const subject = `Order ${reference} received — please complete bank transfer`;
  const html = `
    <h2>Thanks for your order, ${order.billing.firstName}</h2>
    <p>We have received order <strong>${reference}</strong>. Please transfer <strong>AUD ${order.total.toFixed(2)}</strong> and upload your payment screenshot to confirm.</p>
    <h3>Items</h3>
    <ul>${orderLinesHtml(order)}</ul>
    <p><strong>Subtotal:</strong> AUD ${order.subtotal.toFixed(2)}<br/>
    <strong>Shipping:</strong> AUD ${order.shipping.toFixed(2)}<br/>
    <strong>Total:</strong> AUD ${order.total.toFixed(2)}</p>
    ${notesBlock}
    <h3>Bank transfer details</h3>
    ${bankDetailsHtml()}
    <p>Use reference <strong>${reference}</strong> on your transfer so we can match your payment.</p>
    <p><a href="${resumeUrl}" style="display:inline-block;padding:12px 24px;background:#d7b760;color:#111;text-decoration:none;border-radius:999px;font-weight:bold;">Upload payment receipt</a></p>
    <p style="font-size:12px;color:#666;">Questions? Reply to this email or contact ${SUPPORT_EMAIL}.</p>
  `;

  const text = [
    `Hi ${order.billing.firstName},`,
    "",
    `Order ${reference} received. Please transfer AUD ${order.total.toFixed(2)}.`,
    "",
    ...order.lines.map((l) => `- ${l.name} x${l.qty}`),
    "",
    `Total: AUD ${order.total.toFixed(2)}`,
    order.notes?.trim() ? `Notes: ${order.notes.trim()}` : "",
    "",
    `Account: ${BANK_TRANSFER.accountName}`,
    `BSB: ${BANK_TRANSFER.bsb}`,
    `Account number: ${BANK_TRANSFER.accountNumber}`,
    `Reference: ${reference}`,
    "",
    `Upload receipt: ${resumeUrl}`,
    "",
    `Support: ${SUPPORT_EMAIL}`,
  ]
    .filter(Boolean)
    .join("\n");

  await sendEmail(email, subject, html, text);
}

/** Sent after payment screenshot is submitted. */
export async function sendCustomerReceiptReceivedEmail(order: OrderDetails): Promise<void> {
  const email = order.billing.email;
  const reference = formatReference(order.orderNumber);
  const subject = `Payment receipt received for ${reference}`;
  const html = `
    <h2>Receipt received</h2>
    <p>Hi ${order.billing.firstName},</p>
    <p>We have received your payment screenshot for order <strong>${reference}</strong> (AUD ${order.total.toFixed(2)}).</p>
    <p>Our team will confirm the bank transfer shortly. Once confirmed, your order will be packed and shipped.</p>
    <p style="font-size:12px;color:#666;">Questions? Contact ${SUPPORT_EMAIL} with reference ${reference}.</p>
  `;
  const text = [
    `Hi ${order.billing.firstName},`,
    "",
    `We received your payment screenshot for ${reference} (AUD ${order.total.toFixed(2)}).`,
    "We will confirm the transfer shortly, then pack and ship your order.",
    "",
    `Support: ${SUPPORT_EMAIL}`,
  ].join("\n");

  await sendEmail(email, subject, html, text);
}

export async function sendAbandonedCheckoutEmail(draft: CheckoutDraft, couponCode?: string): Promise<void> {
  const email = draft.order.billing.email;
  const resumeUrl = resumeOrderUrl(draft.order.orderNumber, email);
  const reference = formatReference(draft.order.orderNumber);
  const lines = orderLinesHtml(draft.order);

  const withCoupon = Boolean(couponCode);
  const subject = withCoupon
    ? `Your ${reference} is waiting — A$${COUPON_DISCOUNT_AUD} off expires soon`
    : `Complete your Alibarbar order ${reference}`;

  const couponBlock = withCoupon
    ? `
      <p style="margin:16px 0;padding:16px;background:#1a1a1a;border:1px solid #d7b760;border-radius:8px;">
        <strong>Your exclusive code: ${couponCode}</strong><br/>
        Save <strong>A$${COUPON_DISCOUNT_AUD.toFixed(2)}</strong> on this order (3+ devices required).<br/>
        Expires in ${COUPON_VALID_DAYS} days — complete payment before it ends.
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
    <h3>Bank transfer details</h3>
    <p>Please transfer <strong>AUD ${draft.order.total.toFixed(2)}</strong> using reference <strong>${reference}</strong>:</p>
    ${bankDetailsHtml()}
    <p>Open your order page and upload your payment screenshot to confirm.</p>
    <p><a href="${resumeUrl}" style="display:inline-block;padding:12px 24px;background:#d7b760;color:#111;text-decoration:none;border-radius:999px;font-weight:bold;">Complete my order</a></p>
    <p style="font-size:12px;color:#666;">If you already paid, upload your receipt on the order page or email ${SUPPORT_EMAIL} with reference ${reference}.</p>
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
    "Bank transfer details:",
    `Account: ${BANK_TRANSFER.accountName}`,
    `BSB: ${BANK_TRANSFER.bsb}`,
    `Account number: ${BANK_TRANSFER.accountNumber}`,
    `Bank: ${BANK_TRANSFER.bankName}`,
    `Reference: ${reference}`,
    "",
    `Complete your order: ${resumeUrl}`,
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
      <li><strong>Custom 5 / 10 / 20 packs</strong> — mix your favourites; 20+ devices ship free</li>
      <li><strong>Tiered AU shipping</strong> — A$15 for 1–9 devices, A$10 for 10–19, free for 20+</li>
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

function welcomeEmailHtml(displayName: string): string {
  const shopUrl = appBaseUrl();
  const logoUrl = `${shopUrl}/logo.png`;

  return `
    <div style="margin:0;padding:0;background:#f5f5f5;font-family:Arial,Helvetica,sans-serif;">
      <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#f5f5f5;padding:24px 12px;">
        <tr>
          <td align="center">
            <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:560px;background:#ffffff;border-radius:4px;overflow:hidden;">
              <tr>
                <td style="padding:32px 28px 8px;text-align:center;">
                  <img src="${logoUrl}" alt="Alibarbar" width="72" height="72" style="display:block;margin:0 auto 20px;border-radius:50%;" />
                  <h1 style="margin:0 0 24px;font-size:22px;line-height:1.35;color:#111111;font-weight:700;">
                    You're now a valued customer of Alibarbar
                  </h1>
                </td>
              </tr>
              <tr>
                <td style="padding:0 28px 24px;color:#333333;font-size:15px;line-height:1.6;">
                  <p style="margin:0 0 12px;">Hi ${displayName},</p>
                  <p style="margin:0 0 20px;">You've successfully created an account with Alibarbar.</p>
                  <p style="margin:0 0 8px;font-style:italic;color:#d35400;font-size:15px;line-height:1.6;">
                    Follow our Telegram channel for the latest discount info — we also run occasional promo
                    drops with exclusive coupon codes. 🎁
                  </p>
                  <p style="margin:0 0 20px;">
                    <a href="${TELEGRAM_URL}" style="color:#2563eb;text-decoration:underline;">${TELEGRAM_URL}</a>
                  </p>
                  <p style="margin:0 0 8px;">In addition, you can also add our WhatsApp account for inquiries or to learn more information.</p>
                  <p style="margin:0 0 24px;">
                    <strong style="color:#d35400;">WhatsApp:</strong>
                    <a href="${WHATSAPP_URL}" style="color:#2563eb;text-decoration:underline;">${WHATSAPP_PHONE_DISPLAY}</a>
                  </p>
                  <p style="margin:0;text-align:center;">
                    <a href="${shopUrl}" style="display:inline-block;padding:14px 36px;background:#111111;color:#ffffff;text-decoration:none;font-weight:700;font-size:15px;border-radius:2px;">
                      Visit store
                    </a>
                  </p>
                </td>
              </tr>
              <tr>
                <td style="padding:24px 28px;background:#f0f0f0;color:#555555;font-size:13px;line-height:1.6;">
                  <p style="margin:0 0 12px;">
                    Got questions? We'll do everything we can to make your time with us enjoyable.
                    If you have any questions or feedback, contact us via
                    <a href="mailto:${SUPPORT_EMAIL}" style="color:#2563eb;text-decoration:underline;">${SUPPORT_EMAIL}</a>.
                  </p>
                  <p style="margin:0 0 8px;">Regards,<br/>The Alibarbar team</p>
                  <p style="margin:0;font-size:12px;color:#888888;">This email was sent by Alibarbar</p>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    </div>
  `;
}

function welcomeEmailText(displayName: string): string {
  const shopUrl = appBaseUrl();
  return [
    `Hi ${displayName},`,
    "",
    "You've successfully created an account with Alibarbar.",
    "",
    "Follow our Telegram channel for latest discount info and occasional promo drops:",
    TELEGRAM_URL,
    "",
    `WhatsApp: ${WHATSAPP_PHONE_DISPLAY}`,
    WHATSAPP_URL,
    "",
    `Visit store: ${shopUrl}`,
    "",
    `Questions? Contact ${SUPPORT_EMAIL}`,
    "",
    "Regards,",
    "The Alibarbar team",
  ].join("\n");
}

export async function sendWelcomeEmail(user: Pick<StoredUser, "email" | "displayName">): Promise<void> {
  const subject = "Welcome to Alibarbar — you're now a valued customer";
  await sendEmail(
    user.email,
    subject,
    welcomeEmailHtml(user.displayName),
    welcomeEmailText(user.displayName),
  );
}
