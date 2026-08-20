export type FaqItem = {
  question: string;
  answer: string;
  /** Grouping used on the dedicated FAQ hub page. */
  category?: "Ordering & Shipping" | "Payment" | "Product & Usage" | "Legal & Safety";
};

/** Shown on the homepage FAQ section and mirrored into FAQPage JSON-LD. */
export const faqItems: FaqItem[] = [
  {
    category: "Ordering & Shipping",
    question: "How much is shipping in Australia?",
    answer:
      "Catalogue Regular Post is A$15 for 1–9 devices, A$10 for 10–19 devices, and free for 20 or more, calculated at checkout. Typical delivery is about 3–7 business days after payment confirmation (metro NSW/VIC/QLD often faster; remote postcodes slower). These are site-stated values and may change. Lawful supply of vapes in Australia must still be checked against current TGA rules.",
  },
  {
    category: "Ordering & Shipping",
    question: "How long does delivery take?",
    answer:
      "Orders are dispatched after your bank transfer is confirmed, and delivery typically takes 3-7 business days depending on your state. Metro areas such as Sydney, Melbourne and Brisbane are usually on the faster end of that range.",
  },
  {
    category: "Ordering & Shipping",
    question: "Do you ship to all states in Australia?",
    answer:
      "We ship Australia-wide via Regular Post, including NSW, VIC, QLD, WA, SA, TAS, ACT and NT. Remote postcodes may take a little longer to arrive.",
  },
  {
    category: "Ordering & Shipping",
    question: "Where is Alibarbar Australia based?",
    answer:
      "The store address is 480 Queen St, Brisbane City QLD 4000, Australia, on Queen Street in Brisbane CBD. Catalogue orders still ship Australia-wide via Regular Post. For order help, email orders@ailibarbar.com.",
  },
  {
    category: "Ordering & Shipping",
    question: "Where can I buy Alibarbar in Australia?",
    answer:
      "Alibarbar Australia is an online store at ailibarbar.com. Catalogue orders ship Australia-wide. Lawful supply of vapes in Australia is currently described as pharmacy settings for therapeutic purposes — this site’s catalogue is not a lawful-supply determination. For authenticity checks, see /guides/where-to-buy-alibarbar-australia.",
  },
  {
    category: "Ordering & Shipping",
    question: "Is ailibarbar.com an Alibarbar vape shop?",
    answer:
      "Yes. Alibarbar Australia is an Australian online vape store for authentic Alibarbar Ingot devices. The live catalogue currently lists the Ingot 9000 (single flavours and custom packs), not every Alibarbar SKU. Shop at /shop.",
  },
  {
    category: "Ordering & Shipping",
    question: "How do I know my order went through?",
    answer:
      "After you upload your payment screenshot, our team verifies the transfer and confirms your order. Keep your order number handy if you need to contact us at orders@ailibarbar.com.",
  },
  {
    category: "Ordering & Shipping",
    question: "Can I track my order?",
    answer:
      "Once your order is dispatched we can provide tracking details on request. Email us your order number at orders@ailibarbar.com and we'll share the latest status.",
  },
  {
    category: "Payment",
    question: "How do I pay for my order?",
    answer:
      "We accept bank transfer. After placing your order you'll see our account details — transfer the total with your order number as the reference, then upload your payment screenshot to confirm.",
  },
  {
    category: "Payment",
    question: "Is checkout secure?",
    answer:
      "Yes. Your order details are transmitted over an encrypted HTTPS connection, and we never store card numbers because payment is made by direct bank transfer using your own banking app.",
  },
  {
    category: "Payment",
    question: "What currency are prices in?",
    answer:
      "All prices on Alibarbar Australia are shown and charged in Australian dollars (AUD). For single and pack pricing plus shipping tiers, see /guides/alibarbar-ingot-9000-price-guide-australia.",
  },
  {
    category: "Product & Usage",
    question: "What is the Alibarbar Ingot 9000?",
    answer:
      "The Alibarbar Ingot 9000 is a pre-filled, pre-charged sealed disposable rated for up to 9000 puffs (usage dependent). It has a 22ml e-liquid tank, a 2350mAh non-rechargeable battery, and a built-in LED that shows remaining battery and e-liquid.",
  },
  {
    category: "Product & Usage",
    question: "Do you sell the Alibarbar Ingot 20000?",
    answer:
      "No. This catalogue currently lists the Alibarbar Ingot 9000 only. Ingot 20000 is a different Alibarbar SKU commonly listed elsewhere with a higher puff rating. See /guides/alibarbar-ingot-9000-vs-ingot-20000 for the difference.",
  },
  {
    category: "Product & Usage",
    question: "How many puffs does the Alibarbar Ingot 9000 have?",
    answer:
      "Each Alibarbar Ingot device is rated for up to 9000 puffs (usage dependent). Actual puff count varies with puff length and draw style. It is not a guaranteed 9000-puff outcome.",
  },
  {
    category: "Product & Usage",
    question: "How long does one Alibarbar Ingot last?",
    answer:
      "For an average user taking around 300-400 puffs per day, a 9000-puff device typically lasts roughly two to four weeks. Heavier use will shorten this, lighter use will extend it.",
  },
  {
    category: "Product & Usage",
    question: "How do I recharge an Alibarbar vape?",
    answer:
      "You cannot. The Alibarbar Ingot is a non-rechargeable disposable that comes pre-charged with a 2350mAh battery sized to last the full e-liquid capacity. When it is finished, replace the device — do not attempt to open or charge it.",
  },
  {
    category: "Product & Usage",
    question: "Is the Alibarbar Ingot rechargeable?",
    answer:
      "No. The Alibarbar Ingot is a non-rechargeable disposable device. It comes pre-charged with a 2350mAh battery sized to last the full e-liquid capacity, so there is no charging required.",
  },
  {
    category: "Product & Usage",
    question: "How do I open an Alibarbar vape?",
    answer:
      "Open the retail packaging, remove any mouthpiece or air-intake protective cap, then take a gentle draw. Do not pry open the device casing — it is a sealed disposable and is not meant to be opened for charging or refilling.",
  },
  {
    category: "Product & Usage",
    question: "How do I use a disposable vape?",
    answer:
      "The Alibarbar Ingot is inhale-activated. Simply remove it from the packaging and take a gentle draw from the mouthpiece — there are no buttons, filling or setup. Start with short puffs to find your comfortable draw.",
  },
  {
    category: "Product & Usage",
    question: "What does the LED display show?",
    answer:
      "The smart LED shows two remaining-life indicators: battery level and e-liquid level. A low or empty reading usually means the device is near the end of its usable life. Flashing can mean empty e-liquid, a depleted battery, or a draw that is too hard — try a gentler puff first. Exact flash patterns should be treated as device-specific unless confirmed by current manufacturer documentation. Full guide: /guides/how-to-read-alibarbar-led-when-finished.",
  },
  {
    category: "Product & Usage",
    question: "Which Alibarbar flavour is best?",
    answer:
      "The site’s 2026 editorial ranking currently places Quadruple Berry as the overall pick. Peach Ice is the more moderate iced option, Blackberry Ice a stronger cooling berry, and Mango Magic a tropical choice. These are editorial preferences, not objective lab scores. See /best-alibarbar-australia.",
  },
  {
    category: "Product & Usage",
    question: "Which flavours are available?",
    answer:
      "The current line-up includes Quadruple Berry, Fanta, Peach Ice, Blackberry Ice, Mango Magic, Strawberry Coconut Watermelon, Grape Ice, Strawberry Watermelon, and Strawberry Ice.",
  },
  {
    category: "Product & Usage",
    question: "What is the 5 Flavour Custom Pack?",
    answer:
      "The 5 Flavour Custom Pack lets you pick any five flavours from our current Alibarbar Ingot 9000 collection for A$165. Repeats are allowed, and your choices are saved with your order.",
  },
  {
    category: "Product & Usage",
    question: "What is the 10 Flavour Custom Pack?",
    answer:
      "The 10 Flavour Custom Pack lets you choose any ten flavours from the current line-up for A$300. It is ideal for stocking up with variety.",
  },
  {
    category: "Product & Usage",
    question: "What is the 20 Flavour Custom Pack?",
    answer:
      "The 20 Flavour Custom Pack lets you pick any twenty flavours from our current Alibarbar Ingot 9000 collection for A$500, with free Regular Post shipping included (20+ devices).",
  },
  {
    category: "Product & Usage",
    question: "How should I store my Alibarbar Ingot?",
    answer:
      "Store your device in a cool, dry place away from direct sunlight and extreme heat. Avoid leaving it in a hot car, as high temperatures can affect the battery and e-liquid.",
  },
  {
    category: "Product & Usage",
    question: "Why is my disposable vape flashing?",
    answer:
      "A flashing light usually means the device is out of e-liquid or the battery has run down, which signals it has reached the end of its life. It can also flash if you draw too hard — try a gentler puff first.",
  },
  {
    category: "Product & Usage",
    question: "Are your products authentic?",
    answer:
      "Check that packaging and ALIBARBAR branding are consistent, the device has the expected smart LED, and specs match the known Ingot 9000 profile: up to 9000 puffs, 22ml e-liquid and a 2350mAh built-in battery. Missing or inconsistent specifications are warning signs. See /guides/how-to-spot-fake-alibarbar-ingot.",
  },
  {
    category: "Ordering & Shipping",
    question: "What is your warranty and returns policy?",
    answer:
      "Opened devices cannot be returned for change of mind. Faulty or damaged goods reported within seven days may qualify for a replacement or refund under the Australian Consumer Law. Keep your order number and photos of the issue. Full details: /returns.",
  },
  {
    category: "Legal & Safety",
    question: "Do I need to be over 18 to order?",
    answer:
      "Yes. You must be 18 years or older to purchase from Alibarbar Australia. First-time visitors see an age gate, and checkout requires an explicit 18+ confirmation. By placing an order you confirm you meet the legal age requirement in your state or territory.",
  },
  {
    category: "Legal & Safety",
    question: "Is vaping suitable for non-smokers?",
    answer:
      "No. Vaping products are intended only for existing adult smokers or vapers. They are not for non-smokers, people under 18, or anyone who is pregnant or breastfeeding.",
  },
  {
    category: "Legal & Safety",
    question: "Can I take a disposable vape on a plane?",
    answer:
      "Disposable vapes contain lithium batteries, so airlines generally require them to be carried in your cabin bag, never in checked luggage, and not used or charged in-flight. Always check your airline and destination rules before travelling.",
  },
  {
    category: "Product & Usage",
    question: "What nicotine strength is in the Alibarbar Ingot 9000?",
    answer:
      "Nicotine strength varies by batch and region and is not one fixed site-wide number. Use the mg/mL or percentage printed on the packaging for that unit as the source of truth. If the pack conflicts with a website figure, trust the pack. Full guide: /guides/alibarbar-nicotine-strength-australia.",
  },
  {
    category: "Product & Usage",
    question: "Is there a warranty on disposable vapes?",
    answer:
      "Disposable vapes are consumable products, but if a device arrives damaged or faulty out of the box, contact us within 7 days. Under the Australian Consumer Law you may be entitled to a replacement or refund for products that are not of acceptable quality.",
  },
  {
    category: "Product & Usage",
    question: "How can I tell if my Alibarbar Ingot is genuine?",
    answer:
      "Check packaging, a working smart LED (battery + e-liquid), and specs that match up to 9000 puffs, 22ml and 2350mAh. Unusually cheap marketplace lots that omit the LED are a warning sign. See /guides/how-to-spot-fake-alibarbar-ingot and /guides/alibarbar-ingot-9000-price-guide-australia.",
  },
  {
    category: "Product & Usage",
    question: "Which Alibarbar flavour is best for beginners?",
    answer:
      "Mild fruit blends such as Mango Magic or Strawberry Watermelon are popular starting points. If you prefer a cooler finish, try Peach Ice or Grape Ice with shorter first puffs until you find your comfortable draw.",
  },
  {
    category: "Legal & Safety",
    question: "How do I dispose of a used device?",
    answer:
      "Take it to an e-waste or battery recycling drop-off. A used disposable contains a lithium battery and should not go in general household waste.",
  },
  {
    category: "Legal & Safety",
    question: "Where can you legally buy vaping products in Australia?",
    answer:
      "Current Australian government guidance says vaping products are restricted to pharmacy settings for therapeutic purposes, with extra conditions depending on nicotine strength and state or territory law. Adults 18+ still apply. Strengths above 20 mg/mL typically sit under tighter prescription-style controls. This site’s catalogue is not proof of lawful non-pharmacy supply. See /guides/disposable-vape-laws-in-australia — not legal advice.",
  },
  {
    category: "Product & Usage",
    question: "How do Alibarbar custom packs work?",
    answer:
      "Choose any mix of 5, 10 or 20 Ingot 9000 flavours on the custom pack product page before checkout — repeats allowed. Current catalogue prices are A$165 (5-pack), A$300 (10-pack) and A$500 (20-pack). Full guide: /guides/alibarbar-custom-pack-guide-australia.",
  },
  {
    category: "Product & Usage",
    question: "Can I verify my Alibarbar device online?",
    answer:
      "Yes. Visit /verify and photograph the circular honeycomb anti-counterfeit seal on your packaging. The tool compares your image against official templates. Combine with LED and packaging checks in /guides/how-to-spot-fake-alibarbar-ingot.",
  },
  {
    category: "Ordering & Shipping",
    question: "How much does an Alibarbar Ingot 9000 cost in Australia?",
    answer:
      "Catalogue pricing lists singles at A$35, the 5 Flavour Custom Pack at A$165, 10-pack at A$300 and 20-pack at A$500, all in AUD. Shipping is tiered: A$15 (1–9 devices), A$10 (10–19), free at 20+. See /guides/alibarbar-ingot-9000-price-guide-australia.",
  },
];
