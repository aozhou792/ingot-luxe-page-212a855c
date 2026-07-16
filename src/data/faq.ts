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
      "Regular Post shipping is A$20 for orders under 10 devices and A$10 for orders of 10 or more devices, calculated automatically at checkout.",
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
      "All prices on Alibarbar Australia are shown and charged in Australian dollars (AUD).",
  },
  {
    category: "Product & Usage",
    question: "What is the Alibarbar Ingot 9000?",
    answer:
      "The Alibarbar Ingot 9000 is a pre-filled, pre-charged disposable vape that delivers up to 9000 puffs per device. It features a 22ml e-liquid capacity, a 2350mAh battery, and a built-in LED display that shows remaining battery and e-liquid.",
  },
  {
    category: "Product & Usage",
    question: "How many puffs does the Alibarbar Ingot 9000 have?",
    answer:
      "Each Alibarbar Ingot device is rated for up to 9000 puffs. Actual puff count varies with puff length and draw style, but most adult users get many days of use from a single device.",
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
      "The built-in smart LED display shows the remaining battery level and e-liquid level, so you can see at a glance how much life the device has left before it needs replacing.",
  },
  {
    category: "Product & Usage",
    question: "Which Alibarbar flavour is best?",
    answer:
      "It depends on your taste. Fruit lovers tend to choose Quadruple Berry, Mango Magic or Strawberry Watermelon, while those who prefer a cool finish go for Peach Ice, Grape Ice, Blackberry Ice or Strawberry Ice. Fanta and Lychee are popular for something different.",
  },
  {
    category: "Product & Usage",
    question: "Which flavours are available?",
    answer:
      "The current line-up includes Quadruple Berry, Fanta, Lychee, Peach Ice, Blackberry Ice, Mango Magic, Strawberry Coconut Watermelon, Grape Ice, Strawberry Watermelon, and Strawberry Ice.",
  },
  {
    category: "Product & Usage",
    question: "What is the 5 Flavour Custom Pack?",
    answer:
      "The 5 Flavour Custom Pack lets you pick any five flavours from our current Alibarbar Ingot 9000 collection for A$240. Repeats are allowed, and your choices are saved with your order.",
  },
  {
    category: "Product & Usage",
    question: "What are the 3 and 10 Flavour Custom Packs?",
    answer:
      "The 3 Flavour Custom Pack (A$150) and 10 Flavour Custom Pack (A$400) let you choose any three or ten flavours from the current line-up. They are ideal for trying a few options or stocking up with variety.",
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
      "Yes. We only sell genuine ALIBARBAR Ingot 9000 devices with the built-in smart LED display, 22ml e-liquid capacity, and up to 9000 puffs per device.",
  },
  {
    category: "Ordering & Shipping",
    question: "What is your warranty and returns policy?",
    answer:
      "Opened devices cannot be returned for change of mind. Faulty or damaged items reported within 7 days may qualify for a replacement or refund under the Australian Consumer Law. Full details are on our Returns & Refunds page at /returns.",
  },
  {
    category: "Legal & Safety",
    question: "Do I need to be over 18 to order?",
    answer:
      "Yes. You must be 18 years or older to purchase from Alibarbar Australia. By placing an order you confirm you meet the legal age requirement in your state or territory.",
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
      "Nicotine strength varies by batch and region. Check the packaging on your device for the exact mg/ml rating. If you need help identifying your unit, email orders@ailibarbar.com with your order number.",
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
      "Genuine Alibarbar Ingot 9000 devices have the smart LED display showing battery and e-liquid levels, up to 9000 puffs, 22ml capacity and the ALIBARBAR branding on packaging. Buying from Alibarbar Australia ensures authentic stock — avoid unusually cheap listings on unofficial marketplaces.",
  },
  {
    category: "Product & Usage",
    question: "Which Alibarbar flavour is best for beginners?",
    answer:
      "Mild fruit blends such as Mango Magic, Strawberry Watermelon or Lychee are popular starting points. If you prefer a cooler finish, try Peach Ice or Grape Ice with shorter first puffs until you find your comfortable draw.",
  },
  {
    category: "Legal & Safety",
    question: "How do I dispose of a used device?",
    answer:
      "A used disposable vape contains a battery and should not go in general household waste. Take it to an e-waste or battery recycling drop-off point where available in your area.",
  },
];
