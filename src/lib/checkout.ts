/** Flat-rate shipping used across cart and checkout, mirroring the storefront's Regular Post rate. */
export const SHIPPING_FLAT_AUD = 10.95;
export const SHIPPING_LABEL = "Regular Post";

/** Order total including flat-rate shipping. Shipping is waived on an empty cart. */
export function orderTotal(subtotal: number, hasItems: boolean): number {
  return hasItems ? subtotal + SHIPPING_FLAT_AUD : subtotal;
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
