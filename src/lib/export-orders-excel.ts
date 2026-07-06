import * as XLSX from "xlsx";
import { formatOrderReference, type StoredOrder } from "@/lib/orders";

const HEADERS = [
  "收件人姓名",
  "收件人手機",
  "收件門市 / 地址",
  "收件門市編號",
  "訂單金額 TWD",
  "品牌",
  "名稱 (規格 / 口味)",
  "數量",
  "訂單總數量",
  "備註",
] as const;

const BRAND_LABEL = "Alibarbar Ingot 9000";

function recipientName(order: StoredOrder): string {
  return `${order.billing.firstName} ${order.billing.lastName}`.trim();
}

function recipientAddress(order: StoredOrder): string {
  const { street, apartment, suburb, state, postcode, country } = order.billing;
  return [street, apartment, suburb, state, postcode, country].filter(Boolean).join(" ");
}

function orderTotalQty(order: StoredOrder): number {
  return order.lines.reduce((sum, line) => sum + line.qty, 0);
}

function orderRemark(order: StoredOrder): string {
  const ref = formatOrderReference(order.orderNumber);
  const status = order.paymentStatus === "confirmed" ? "已確認" : "待確認";
  return `${ref} · ${status}`;
}

export function exportOrdersToExcel(orders: StoredOrder[], filename?: string): void {
  const rows: (string | number)[][] = [[...HEADERS]];

  for (const order of orders) {
    const totalQty = orderTotalQty(order);
    const remark = orderRemark(order);

    for (const line of order.lines) {
      rows.push([
        recipientName(order),
        order.billing.phone ?? "",
        recipientAddress(order),
        "",
        Math.round(order.total),
        BRAND_LABEL,
        `-${line.name}`,
        line.qty,
        totalQty,
        remark,
      ]);
    }
  }

  const worksheet = XLSX.utils.aoa_to_sheet(rows);
  worksheet["!cols"] = [
    { wch: 14 },
    { wch: 14 },
    { wch: 42 },
    { wch: 12 },
    { wch: 12 },
    { wch: 20 },
    { wch: 24 },
    { wch: 8 },
    { wch: 10 },
    { wch: 20 },
  ];

  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Orders");

  const date = new Date().toISOString().slice(0, 10);
  XLSX.writeFile(workbook, filename ?? `orders-export-${date}.xlsx`);
}
