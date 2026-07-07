import { formatAud } from "@/lib/format";

/** Flat-rate shipping used across cart and checkout. */
export const SHIPPING_LABEL = "Regular Post";

/** Shipping is based on the actual number of vape devices in the cart. */
export const SMALL_ORDER_SHIPPING_AUD = 20;
export const BULK_ORDER_SHIPPING_AUD = 10;
export const BULK_SHIPPING_THRESHOLD = 5;

export function shippingRateHint(): string {
  return `${formatAud(SMALL_ORDER_SHIPPING_AUD)} shipping for 1-4 devices; ${formatAud(BULK_ORDER_SHIPPING_AUD)} shipping for ${BULK_SHIPPING_THRESHOLD}+ devices.`;
}

export function shippingAud(deviceCount: number): number {
  if (deviceCount <= 0) return 0;
  return deviceCount < BULK_SHIPPING_THRESHOLD ? SMALL_ORDER_SHIPPING_AUD : BULK_ORDER_SHIPPING_AUD;
}

/** Order total including device-count shipping. */
export function orderTotal(subtotal: number, deviceCount: number): number {
  return deviceCount > 0 ? subtotal + shippingAud(deviceCount) : subtotal;
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
