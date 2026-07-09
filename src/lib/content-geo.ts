/** Helpers for GEO-friendly content blocks and schema wiring. */

import type { Comparison } from "@/data/comparisons";
import type { FlavourProfile } from "@/data/flavours";
import type { Product } from "@/data/products";

export type QuickAnswer = {
  question: string;
  answer: string;
};

export function deriveQuickAnswer(title: string, intro: string, explicit?: QuickAnswer): QuickAnswer {
  if (explicit) return explicit;
  const question = title.trim().endsWith("?") ? title : title.replace(/\s*\|.*$/, "").trim();
  return { question, answer: intro };
}

export function deriveKeyTakeaways(explicit?: string[], ...candidates: (string[] | undefined)[]): string[] {
  if (explicit && explicit.length > 0) return explicit;
  for (const list of candidates) {
    if (list && list.length > 0) return list.slice(0, 6);
  }
  return [];
}

export function formatContentDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-AU", { month: "long", year: "numeric" });
}

export function deriveProductQuickAnswer(product: Product, flavour?: FlavourProfile): QuickAnswer {
  if (product.isCustomPack) {
    const size = product.customPackSize ?? 5;
    return {
      question: `What is the Alibarbar ${size} Flavour Custom Pack?`,
      answer: `${product.excerpt} Each device delivers up to 9000 puffs with a 22ml tank, mesh coil and smart LED display — pick any ${size} flavours from the current range before checkout.`,
    };
  }

  const flavourDetail = flavour ? ` ${flavour.tagline}` : ` ${product.excerpt}`;
  return {
    question: `What is the Alibarbar Ingot 9000 ${product.name}?`,
    answer: `The Alibarbar Ingot 9000 ${product.name} is a premium disposable vape rated for up to 9000 puffs, with a 22ml pre-filled tank, 2350mAh built-in battery and mesh coil.${flavourDetail} It includes a smart LED display for battery and e-liquid levels and is ready to use straight out of the box.`,
  };
}

export function deriveProductKeyTakeaways(product: Product, flavour?: FlavourProfile): string[] {
  if (product.isCustomPack) {
    const size = product.customPackSize ?? 5;
    return [
      `Choose any ${size} flavours from the range`,
      "Lower bundle price vs buying singles",
      "Up to 9000 puffs per device",
      "22ml pre-filled e-liquid per device",
      "Smart LED battery & e-liquid display",
    ];
  }

  const base = [
    "Up to 9000 puffs per device",
    "22ml pre-filled e-liquid",
    "2350mAh built-in battery",
    "Mesh coil for consistent flavour",
    "Smart LED battery & e-liquid display",
  ];

  if (!flavour) return base;

  const cooling =
    flavour.coolness >= 3 ? "Iced finish with noticeable cooling" : "Smooth, low-menthol fruit profile";

  return [base[0], base[1], `${flavour.family} flavour profile`, cooling, flavour.bestFor[0] ?? "Adult vapers 18+"];
}

export function deriveProductBestFor(product: Product, flavour?: FlavourProfile): string[] {
  if (flavour) return flavour.bestFor;
  if (product.isCustomPack) {
    return [
      "Trying multiple flavours in one order",
      "Heavy users who want variety",
      "First-time buyers unsure which flavour to pick",
      "Sharing with friends or partners",
    ];
  }
  return [
    "Daily vaping without refilling or charging",
    "Adults wanting a long-lasting disposable",
    "Users who value flavour consistency",
    "Anyone wanting zero setup",
  ];
}

export function deriveProductAvoid(product: Product, flavour?: FlavourProfile): string[] {
  if (product.isPlaceholder) return ["Anyone needing a device available to buy today"];
  if (flavour) {
    if (flavour.coolness >= 3) {
      return ["People who dislike menthol or ice", "Those wanting pure fruit with no cooling"];
    }
    if (flavour.coolness <= 1) {
      return ["Strong menthol or ice lovers", "Anyone wanting a cold throat hit"];
    }
  }
  if (product.isCustomPack) {
    return ["Buyers who already know one favourite flavour and only want singles"];
  }
  return ["Minors under 18", "Non-smokers or non-vapers", "Anyone seeking a rechargeable device"];
}

export function deriveCompareShortAnswer(comparison: Comparison): { alibarbar: string; competitor: string } {
  const alibarbar =
    comparison.shortAnswer?.alibarbar ??
    (comparison.alibarbarStrengths[0]
      ? `If you want ${comparison.alibarbarStrengths[0].toLowerCase()}, choose Alibarbar.`
      : comparison.verdict[0] ?? "Alibarbar Ingot 9000 suits buyers prioritising capacity and display features.");

  const competitor =
    comparison.shortAnswer?.competitor ??
    (comparison.competitorStrengths[0]
      ? `If you prefer ${comparison.competitorStrengths[0].toLowerCase()}, choose ${comparison.competitor}.`
      : comparison.verdict[1] ?? `${comparison.competitor} may suit buyers with different priorities.`);

  return { alibarbar, competitor };
}

export function deriveWhoShouldBuy(candidates: string[]): string[] {
  return candidates.slice(0, 4);
}

export function deriveWhoShouldAvoid(candidates: string[]): string[] {
  return candidates.slice(0, 3);
}
