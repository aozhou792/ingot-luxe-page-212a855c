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

function parseNotifyEmails(raw: string | undefined): string[] {
  const fallback =
    "wmitch714@gmail.com,517637108@qq.com,11385994@qq.com";
  const source = raw?.trim() ? raw : fallback;
  return source
    .split(/[,;\s]+/)
    .map((email) => email.trim())
    .filter(Boolean);
}

export async function sendOrderNotificationEmail(
  order: StoredOrder,
  receipt: { dataUrl: string; name: string },
): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY;
  const to = parseNotifyEmails(process.env.ORDER_NOTIFY_EMAIL);
  const from = process.env.ORDER_FROM_EMAIL ?? "Alibarbar Orders <orders@ailibarbar.com>";

  if (!apiKey) {
    throw new Error("RESEND_API_KEY missing — cannot send order notification");
  }

  if (to.length === 0) {
    throw new Error("ORDER_NOTIFY_EMAIL empty — cannot send order notification");
  }

  const resend = new Resend(apiKey);
  const { buffer } = parseDataUrl(receipt.dataUrl);
  const fileName = receipt.name || `receipt-${order.orderNumber}.png`;

  const { data, error } = await resend.emails.send({
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

  if (error) {
    throw new Error(
      `Resend failed for ${formatReference(order.orderNumber)}: ${error.message || JSON.stringify(error)}`,
    );
  }

  if (!data?.id) {
    throw new Error(`Resend returned no email id for ${formatReference(order.orderNumber)}`);
  }

  console.info(
    `Order notify email sent: ${formatReference(order.orderNumber)} id=${data.id} to=${to.join(",")}`,
  );
}
