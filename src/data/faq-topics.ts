export type FaqTopic = {
  slug: string;
  title: string;
  description: string;
  intro: string;
  items: { question: string; answer: string }[];
};

export const faqTopics: FaqTopic[] = [
  {
    slug: "shipping",
    title: "Shipping FAQ",
    description:
      "Shipping questions for Alibarbar Australia orders, including A$20 under 5 devices, A$10 for 5+ devices, dispatch timing, tracking and Australia-wide coverage.",
    intro:
      "This Shipping FAQ answers the practical delivery questions customers ask before and after ordering Alibarbar Ingot 9000 devices in Australia.",
    items: [
      {
        question: "How much is shipping?",
        answer:
          "Shipping is A$20 for orders under 5 devices and A$10 for orders of 5 or more devices. The shipping fee is added automatically at checkout so you can see the total before placing your order.",
      },
      {
        question: "Do you ship Australia-wide?",
        answer:
          "Yes. We ship to Australian states and territories including NSW, VIC, QLD, WA, SA, TAS, ACT and NT. Regional and remote areas may take longer than metro areas.",
      },
      {
        question: "How long does delivery take?",
        answer:
          "After your bank transfer has been confirmed, delivery usually takes 3-7 business days depending on your state and postcode.",
      },
      {
        question: "When will my order be dispatched?",
        answer:
          "Orders are dispatched after payment is verified. To avoid delays, use your order number as the bank transfer reference and upload your payment screenshot after ordering.",
      },
      {
        question: "Can I get tracking?",
        answer:
          "Yes. If tracking is available for your parcel, email orders@ailibarbar.com with your order number and we can provide the latest delivery status.",
      },
      {
        question: "Do you offer express shipping?",
        answer:
          "At the moment the checkout default is Regular Post. Shipping is A$20 under 5 devices and A$10 for 5+ devices. If faster delivery options are added later, they will be shown clearly at checkout.",
      },
      {
        question: "What if my parcel is delayed?",
        answer:
          "Most delays are caused by postal network congestion, remote routing or incomplete address details. Email us with your order number and we will help check the status.",
      },
      {
        question: "Can I change my delivery address?",
        answer:
          "Contact us as quickly as possible after ordering. If the parcel has not been dispatched yet, we will try to update the address. Once dispatched, address changes may not be possible.",
      },
      {
        question: "What happens if my address is wrong?",
        answer:
          "If an incorrect address causes a parcel to be returned or lost, we may need to wait for carrier confirmation before arranging the next step. Always check your delivery details carefully before paying.",
      },
      {
        question: "Do you ship to PO boxes or parcel lockers?",
        answer:
          "Where the postal service accepts the destination, PO boxes and parcel lockers may be supported. If you are unsure, contact us before ordering.",
      },
      {
        question: "Can someone under 18 receive the parcel?",
        answer:
          "No. Products are strictly for adults 18+. The person ordering and receiving the products must meet the legal age requirement.",
      },
      {
        question: "Do you ship internationally?",
        answer:
          "No. Alibarbar Australia is focused on Australian customers and Australia-wide delivery.",
      },
      {
        question: "What if my item arrives damaged?",
        answer:
          "Email orders@ailibarbar.com within 7 days with your order number and photos or a short video of the issue. We will assess the claim under our Returns & Refunds Policy.",
      },
      {
        question: "Can I combine multiple orders into one shipment?",
        answer:
          "If the orders have not been dispatched, contact us quickly and we will see what is possible. Once dispatched, orders cannot be combined.",
      },
      {
        question: "Where can I read the full shipping policy?",
        answer:
          "The full policy is available at /shipping and includes dispatch timing, delivery estimates, tracking and support details.",
      },
    ],
  },
  {
    slug: "payment",
    title: "Payment FAQ",
    description:
      "Payment questions for Alibarbar Australia orders, including bank transfer instructions, payment screenshots, verification timing and secure checkout.",
    intro:
      "This Payment FAQ explains how bank transfer checkout works, what reference to use, how verification happens, and what to do if you make a mistake.",
    items: [
      {
        question: "What payment methods do you accept?",
        answer:
          "We currently accept bank transfer. After placing your order, you will see the bank account details and the order total to transfer.",
      },
      {
        question: "How do I pay by bank transfer?",
        answer:
          "Place your order, copy the bank details shown on the order confirmation page, transfer the exact order total, and use your order number as the payment reference.",
      },
      {
        question: "Why do I need to upload a payment screenshot?",
        answer:
          "The screenshot helps us match your transfer to your order faster. It should show the transfer amount, date and reference where possible.",
      },
      {
        question: "What should I use as the payment reference?",
        answer:
          "Use your order number. This is the easiest way for our team to verify your transfer and avoid dispatch delays.",
      },
      {
        question: "How long does payment verification take?",
        answer:
          "Verification is usually completed after your transfer is visible and matched to your order. Bank processing times vary, so some payments can take longer to appear.",
      },
      {
        question: "What if I forgot to use my order number as the reference?",
        answer:
          "Email orders@ailibarbar.com with your order number, transfer amount, transfer time and a screenshot. We will manually match the payment where possible.",
      },
      {
        question: "What if I transferred the wrong amount?",
        answer:
          "Contact us immediately. If the amount is short, we may ask you to transfer the difference. If you overpaid, we can help resolve it after verifying the transaction.",
      },
      {
        question: "Is checkout secure?",
        answer:
          "Yes. The checkout page uses HTTPS, and because payment is made by bank transfer, we do not store card numbers or card security codes.",
      },
      {
        question: "Do you accept credit cards?",
        answer:
          "Not currently. If card payment is added in the future, the option will appear clearly at checkout.",
      },
      {
        question: "Do you accept PayPal?",
        answer:
          "Not currently. Bank transfer is the available payment method on the site.",
      },
      {
        question: "Can I cancel before paying?",
        answer:
          "If you have not paid yet, you can simply contact us with your order number and ask for the order to be cancelled.",
      },
      {
        question: "Can I cancel after paying?",
        answer:
          "Contact us as soon as possible. If the order has not been dispatched, we will review the request. Once dispatched, cancellation may not be possible.",
      },
      {
        question: "What currency are prices in?",
        answer:
          "All prices are shown in Australian dollars (AUD), including product prices and the tiered Regular Post shipping fee.",
      },
      {
        question: "Will I get a receipt?",
        answer:
          "Your order confirmation acts as the order record. If you need help with order details, email us with your order number.",
      },
      {
        question: "Who do I contact about payment problems?",
        answer:
          "Email orders@ailibarbar.com with your order number and any relevant transfer details or screenshots.",
      },
    ],
  },
  {
    slug: "product",
    title: "Product & Usage FAQ",
    description:
      "Product questions about the Alibarbar Ingot 9000 — puff count, battery, flavours, storage, nicotine, warranty and how to use a disposable vape in Australia.",
    intro:
      "This Product FAQ covers the practical questions adult Australian customers ask about the Alibarbar Ingot 9000 before and after buying.",
    items: [
      {
        question: "What is the Alibarbar Ingot 9000?",
        answer:
          "The Alibarbar Ingot 9000 is a pre-filled, pre-charged disposable vape that delivers up to 9000 puffs per device. It features a 22ml e-liquid capacity, a 2350mAh battery, and a built-in LED display that shows remaining battery and e-liquid.",
      },
      {
        question: "How many puffs does the Alibarbar Ingot 9000 have?",
        answer:
          "Each Alibarbar Ingot device is rated for up to 9000 puffs. Actual puff count varies with puff length and draw style, but most adult users get many days of use from a single device.",
      },
      {
        question: "How long does one Alibarbar Ingot last?",
        answer:
          "For an average user taking around 300-400 puffs per day, a 9000-puff device typically lasts roughly two to four weeks. Heavier use will shorten this, lighter use will extend it.",
      },
      {
        question: "How do I recharge an Alibarbar vape?",
        answer:
          "You cannot. The Alibarbar Ingot is a non-rechargeable disposable that comes pre-charged with a 2350mAh battery sized to last the full e-liquid capacity. When it is finished, replace the device — do not attempt to open or charge it.",
      },
      {
        question: "Is the Alibarbar Ingot rechargeable?",
        answer:
          "No. The Alibarbar Ingot is a non-rechargeable disposable device. It comes pre-charged with a 2350mAh battery sized to last the full e-liquid capacity, so there is no charging required.",
      },
      {
        question: "How do I open an Alibarbar vape?",
        answer:
          "Open the retail packaging, remove any mouthpiece or air-intake protective cap, then take a gentle draw. Do not pry open the device casing — it is a sealed disposable and is not meant to be opened for charging or refilling.",
      },
      {
        question: "How do I use a disposable vape?",
        answer:
          "The Alibarbar Ingot is inhale-activated. Simply remove it from the packaging and take a gentle draw from the mouthpiece — there are no buttons, filling or setup. Start with short puffs to find your comfortable draw.",
      },
      {
        question: "What does the LED display show?",
        answer:
          "The built-in smart LED display shows the remaining battery level and e-liquid level, so you can see at a glance how much life the device has left before it needs replacing.",
      },
      {
        question: "Which Alibarbar flavour is best?",
        answer:
          "It depends on your taste. Fruit lovers tend to choose Quadruple Berry, Mango Magic or Strawberry Watermelon, while those who prefer a cool finish go for Peach Ice, Grape Ice, Blackberry Ice or Strawberry Ice. Fanta and Lychee are popular for something different.",
      },
      {
        question: "Which flavours are available?",
        answer:
          "The current line-up includes Quadruple Berry, Fanta, Lychee, Peach Ice, Blackberry Ice, Mango Magic, Strawberry Coconut Watermelon, Grape Ice, Strawberry Watermelon, and Strawberry Ice.",
      },
      {
        question: "What is the 5 Flavour Custom Pack?",
        answer:
          "The 5 Flavour Custom Pack lets you pick any five flavours from our current Alibarbar Ingot 9000 collection for A$160. Repeats are allowed, and your choices are saved with your order.",
      },
      {
        question: "How should I store my Alibarbar Ingot?",
        answer:
          "Store your device in a cool, dry place away from direct sunlight and extreme heat. Avoid leaving it in a hot car, as high temperatures can affect the battery and e-liquid.",
      },
      {
        question: "Why is my disposable vape flashing?",
        answer:
          "A flashing light usually means the device is out of e-liquid or the battery has run down, which signals it has reached the end of its life. It can also flash if you draw too hard — try a gentler puff first.",
      },
      {
        question: "What nicotine strength is in the Alibarbar Ingot 9000?",
        answer:
          "Nicotine strength varies by batch and region. Check the packaging on your device for the exact mg/ml rating. If you need help identifying your unit, email orders@ailibarbar.com with your order number.",
      },
      {
        question: "Is there a warranty on disposable vapes?",
        answer:
          "Disposable vapes are consumable products, but if a device arrives damaged or faulty out of the box, contact us within 7 days. Under the Australian Consumer Law you may be entitled to a replacement or refund for products that are not of acceptable quality.",
      },
      {
        question: "Which Alibarbar flavour is best for beginners?",
        answer:
          "Mild fruit blends such as Mango Magic, Strawberry Watermelon or Lychee are popular starting points. If you prefer a cooler finish, try Peach Ice or Grape Ice with shorter first puffs until you find your comfortable draw.",
      },
      {
        question: "Does the Alibarbar Ingot 9000 leak?",
        answer:
          "Genuine devices are designed with sealed construction. If you notice leaking, check that the mouthpiece cap was removed and the air intake is clear. Persistent leaking on a new device may indicate a fault — contact us within 7 days.",
      },
    ],
  },
  {
    slug: "authenticity",
    title: "Authenticity FAQ",
    description:
      "How to verify genuine Alibarbar Ingot 9000 devices in Australia — packaging checks, LED display, counterfeit warnings and where to buy authentic stock.",
    intro:
      "Counterfeit disposable vapes are a real risk in Australia. This FAQ explains how to confirm your Alibarbar Ingot 9000 is genuine and why buying from an authorised retailer matters.",
    items: [
      {
        question: "Are your products authentic?",
        answer:
          "Yes. We only sell genuine ALIBARBAR Ingot 9000 devices with the built-in smart LED display, 22ml e-liquid capacity, and up to 9000 puffs per device.",
      },
      {
        question: "How can I tell if my Alibarbar Ingot is genuine?",
        answer:
          "Check the Authentication panel on the back of the box: scan the right QR to open /verify, then photograph or upload the left honeycomb anti-counterfeit seal for a Genuine / not-genuine result. Genuine devices also have the smart LED display, up to 9000 puffs, 22ml capacity and ALIBARBAR branding. Buying from Alibarbar Australia ensures authentic stock.",
      },
      {
        question: "How do I use the packaging authenticity marks?",
        answer:
          "Scan the right-hand QR code on the box to open www.alibarbar.mom/verify. On that page, photograph or upload the left circular honeycomb seal (orange ring + hex + 点阵 — no QR inside that seal). Matching any of our five official seal templates shows Genuine Alibarbar. The same five seals are printed randomly across genuine packaging (not a unique serial per device).",
      },
      {
        question: "How do I know if my Alibarbar is fake?",
        answer:
          "Check for a working LED display showing battery and e-liquid levels, ALIBARBAR branding on packaging, and consistent vapour quality. See our guide at /guides/how-to-spot-fake-alibarbar-ingot for the full checklist.",
      },
      {
        question: "What should genuine packaging look like?",
        answer:
          "Authentic packaging includes ALIBARBAR branding, Ingot 9000 model naming, clear puff-count and capacity labelling, plus the Authentication panel with a left honeycomb anti-counterfeit seal and a right QR code linked to our verify page. The device inside should have the gold ingot-bar design and a working LED display.",
      },
      {
        question: "Why are some Alibarbar listings much cheaper online?",
        answer:
          "Unusually low prices on unofficial marketplaces often indicate grey-market or counterfeit stock. Genuine Ingot 9000 devices include a 22ml capacity and smart LED display — if those features are missing or inconsistent, treat the listing with caution.",
      },
      {
        question: "Where can I buy authentic Alibarbar in Australia?",
        answer:
          "You can order authentic Alibarbar Ingot 9000 devices directly from Alibarbar Australia at www.alibarbar.mom. We ship Australia-wide to NSW, VIC, QLD, WA, SA, TAS, ACT and NT.",
      },
      {
        question: "Does the LED display work on fakes?",
        answer:
          "Many counterfeits either omit the LED display entirely or show static/incorrect readings. A genuine device updates battery and e-liquid indicators as you use it.",
      },
      {
        question: "What if I think I received a fake device?",
        answer:
          "Email orders@ailibarbar.com within 7 days with your order number and photos of the device and packaging. We will investigate and resolve genuine quality issues under our Returns & Refunds Policy.",
      },
      {
        question: "Can I verify my device online?",
        answer:
          "Yes. Scan the right packaging QR to open www.alibarbar.mom/verify, then photograph or upload the left honeycomb seal on that page. A successful photo match confirms an official Alibarbar product. When in doubt, buying from Alibarbar Australia removes the guesswork.",
      },
      {
        question: "Are custom packs also genuine?",
        answer:
          "Yes. Our 3, 5 and 10 Flavour Custom Packs contain the same authentic single-flavour Ingot 9000 devices — only the flavour mix in your order changes.",
      },
    ],
  },
  {
    slug: "legal",
    title: "Legal & Safety FAQ",
    description:
      "Legal and safety questions about disposable vapes in Australia — age requirements, airline travel, disposal, suitability and general regulation overview.",
    intro:
      "Vaping products are restricted to adults in Australia. This FAQ covers age verification, safe use, travel and disposal — general information only, not legal advice.",
    items: [
      {
        question: "Do I need to be over 18 to order?",
        answer:
          "Yes. You must be 18 years or older to purchase from Alibarbar Australia. By placing an order you confirm you meet the legal age requirement in your state or territory.",
      },
      {
        question: "Is vaping suitable for non-smokers?",
        answer:
          "No. Vaping products are intended only for existing adult smokers or vapers. They are not for non-smokers, people under 18, or anyone who is pregnant or breastfeeding.",
      },
      {
        question: "Can I take a disposable vape on a plane?",
        answer:
          "Disposable vapes contain lithium batteries, so airlines generally require them to be carried in your cabin bag, never in checked luggage, and not used or charged in-flight. Always check your airline and destination rules before travelling.",
      },
      {
        question: "Are disposable vapes legal in Australia?",
        answer:
          "Vaping regulation in Australia varies by state and territory and changes over time. Products are strictly 18+ and intended for existing adult smokers or vapers only. See our overview at /guides/disposable-vape-laws-in-australia — it is general information, not legal advice.",
      },
      {
        question: "How do I dispose of a used device?",
        answer:
          "A used disposable vape contains a battery and should not go in general household waste. Take it to an e-waste or battery recycling drop-off point where available in your area.",
      },
      {
        question: "Can someone under 18 receive the parcel?",
        answer:
          "No. Products are strictly for adults 18+. The person ordering and receiving the products must meet the legal age requirement.",
      },
      {
        question: "Is nicotine legal in disposable vapes in Australia?",
        answer:
          "Nicotine regulation in Australia is complex and changes over time. Check the packaging on your device for nicotine content and consult official state or territory guidance. This FAQ is general information, not legal advice.",
      },
      {
        question: "What is your age verification policy?",
        answer:
          "Every visitor must confirm they are 18+ via our age gate before browsing the store. At checkout you confirm again. See /age-verification for the full policy.",
      },
      {
        question: "Can I use a disposable vape while pregnant?",
        answer:
          "No. Vaping products are not intended for anyone who is pregnant or breastfeeding. If you are trying to quit smoking, speak to a qualified health professional.",
      },
      {
        question: "Where can I read the full terms?",
        answer:
          "Our Terms of Service, Privacy Policy and Age Verification Policy are linked in the site footer at /terms, /privacy and /age-verification.",
      },
    ],
  },
];

export function getFaqTopicBySlug(slug: string | undefined): FaqTopic | undefined {
  if (!slug) return undefined;
  return faqTopics.find((topic) => topic.slug === slug);
}
