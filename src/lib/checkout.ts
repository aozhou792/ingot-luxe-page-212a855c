import { formatAud } from "@/lib/format";

/** Flat-rate shipping used across cart and checkout. */
export const SHIPPING_LABEL = "Regular Post";

/** 5+ devices: $10 AUD; fewer than 5: $20 AUD. */
export const SHIPPING_5_OR_MORE_AUD = 10;
export const SHIPPING_UNDER_5_AUD = 20;
export const SHIPPING_QUANTITY_THRESHOLD = 5;

export function shippingRateHint(): string {
  return `5+ devices: ${formatAud(SHIPPING_5_OR_MORE_AUD)} shipping · under 5 devices: ${formatAud(SHIPPING_UNDER_5_AUD)}`;
}

export function shippingAud(itemCount: number): number {
  if (itemCount <= 0) return 0;
  return itemCount >= SHIPPING_QUANTITY_THRESHOLD ? SHIPPING_5_OR_MORE_AUD : SHIPPING_UNDER_5_AUD;
}

/** Order total including quantity-based shipping. */
export function orderTotal(subtotal: number, itemCount: number): number {
  return itemCount > 0 ? subtotal + shippingAud(itemCount) : subtotal;
}

/** Wise (bank transfer) account the storefront collects payment into. */
export const BANK_TRANSFER = {
  accountName: "XIAOHONG HUANG",
  bsb: "774-001",
  accountNumber: "246121333",
  swift: "TRWIAUS1XXX",
  bankName: "Wise Australia Pty Ltd",
  bankAddress: "Suite 1, Level 11, 66 Goulburn Street, Sydney, NSW, 2000, Australia",
} as const;

export const PAYMENT_METHOD_LABEL = "Bank Transfer";
