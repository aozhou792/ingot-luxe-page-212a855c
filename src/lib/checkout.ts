import { formatAud } from "@/lib/format";

/** Flat-rate shipping used across cart and checkout. */
export const SHIPPING_LABEL = "Regular Post";

/** Default checkout shipping. */
export const DEFAULT_SHIPPING_AUD = 10;

export function shippingRateHint(): string {
  return `Default checkout shipping: ${formatAud(DEFAULT_SHIPPING_AUD)}`;
}

export function shippingAud(itemCount: number): number {
  if (itemCount <= 0) return 0;
  return DEFAULT_SHIPPING_AUD;
}

/** Order total including default shipping. */
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
