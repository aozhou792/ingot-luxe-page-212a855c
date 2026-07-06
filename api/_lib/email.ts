import { Resend } from "resend";
import type { StoredOrder } from "./types.js";
import { parseDataUrl } from "./order-store.js";

function formatReference(orderNumber: string): string {
  return `VN #${orderNumber}`;
}

function buildHtml(order: StoredOrder): string {
  const lines = order.lines
    .map((line) => `<li>${line.name} × ${line.qty} — AUD ${(line.price * line.qty).toFixed(2)}</li>`)
    .join("");

  const address = [
    `${order.billing.firstName} ${order.billing.lastName}`,
    order.billing.street,
    order.billing.apartment,
    `${order.billing.suburb}, ${order.billing.state} ${order.billing.postcode}`,
    order.billing.country,
    order.billing.phone,
    order.billing.email,
  ]
    .filter(Boolean)
    .join("<br/>");

  return `
    <h2>New bank transfer payment — ${formatReference(order.orderNumber)}</h2>
    <p><strong>Date:</strong> ${order.date}</p>
    <p><strong>Total:</strong> AUD ${order.total.toFixed(2)}</p>
    <p><strong>Customer:</strong> ${order.billing.firstName} ${order.billing.lastName}</p>
    <p><strong>Email:</strong> ${order.billing.email}</p>
    <h3>Items</h3>
    <ul>${lines}</ul>
    <h3>Billing address</h3>
    <p>${address}</p>
    <p>Payment screenshot is attached.</p>
  `;
}

export async function sendOrderNotificationEmail(
  order: StoredOrder,
  receipt: { dataUrl: string; name: string },
): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.ORDER_NOTIFY_EMAIL ?? "hxjspacex1@gmail.com";
  const from = process.env.ORDER_FROM_EMAIL ?? "Alibarbar Orders <onboarding@resend.dev>";

  if (!apiKey) {
    console.warn("RESEND_API_KEY missing — skipping email notification");
    return;
  }

  const resend = new Resend(apiKey);
  const { buffer } = parseDataUrl(receipt.dataUrl);
  const fileName = receipt.name || `receipt-${order.orderNumber}.png`;

  await resend.emails.send({
    from,
    to,
    subject: `New payment ${formatReference(order.orderNumber)} — AUD ${order.total.toFixed(2)}`,
    html: buildHtml(order),
    attachments: [
      {
        filename: fileName,
        content: buffer,
      },
    ],
  });
}
