/** Single source of product / catalogue facts for pages, schema, FAQ and llms.txt. */

export const FACTS_LAST_REVIEWED = "2026-08-13";

export const PRODUCT_FAMILY = {
  name: "Alibarbar Ingot 9000",
  puffRating: "up to 9000 puffs",
  puffNote:
    "Manufacturer-rated figure; actual puff count varies by puff duration and draw style. Do not rewrite this as a guaranteed 9000+ outcome.",
  eLiquidMl: 22,
  batteryMah: 2350,
  rechargeable: false,
  coil: "mesh",
  activation: "inhale-activated",
  display: "smart LED showing battery and e-liquid levels",
  netWeightG: 90,
  format: "sealed disposable device",
} as const;

export const NICOTINE = {
  status: "variable" as const,
  statement:
    "Exact nicotine strength is not treated as one fixed site-wide value. Strength can vary by batch and region, so the mg/mL or percentage printed on the packaging for that unit is the source of truth. If packaging conflicts with a website figure, do not assume the website figure is correct.",
  short:
    "Nicotine strength varies by batch and region; use the printed package label as the source of truth.",
};

export const CATALOGUE_PRICES_AUD = {
  single: 40,
  pack5: 190,
  pack10: 350,
  pack20: 600,
} as const;

export const SHIPPING = {
  devices1to9Aud: 15,
  devices10to19Aud: 10,
  devices20plusAud: 0,
  typicalDelivery: "approximately 3–7 business days after payment confirmation",
  coverage: "Australia-wide Regular Post (NSW, VIC, QLD, WA, SA, TAS, ACT and NT)",
} as const;

export const AGE_REQUIREMENT = "18+";

export const SUPPORT_EMAIL = "orders@ailibarbar.com";

export const FLAVOUR_SLUGS = [
  "quadruple-berry",
  "fanta",
  "lychee",
  "peach-ice",
  "blackberry-ice",
  "mango-magic",
  "strawberry-coconut-watermelon",
  "grape-ice",
  "strawberry-watermelon",
  "strawberry-ice",
] as const;

export function shippingSummary(): string {
  return `Catalogue shipping is A$${SHIPPING.devices1to9Aud} for 1–9 devices, A$${SHIPPING.devices10to19Aud} for 10–19 devices, and free Regular Post for 20 or more. Typical delivery is ${SHIPPING.typicalDelivery}. These are site-stated catalogue values and may change.`;
}

export function priceSummary(): string {
  return `Catalogue prices currently list a single Ingot 9000 flavour at A$${CATALOGUE_PRICES_AUD.single}, with custom packs at A$${CATALOGUE_PRICES_AUD.pack5} for 5, A$${CATALOGUE_PRICES_AUD.pack10} for 10 and A$${CATALOGUE_PRICES_AUD.pack20} for 20. Confirm live pricing on the product page before relying on these figures.`;
}
