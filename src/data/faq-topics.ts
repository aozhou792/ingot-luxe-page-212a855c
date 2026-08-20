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
      "Shipping questions for Alibarbar Australia orders, including A$15 for 1–9 devices, A$10 for 10–19 devices, free shipping for 20+, dispatch timing, tracking and Australia-wide coverage.",
    intro:
      "This Shipping FAQ answers the practical delivery questions customers ask before and after ordering Alibarbar Ingot 9000 devices in Australia.",
    items: [
      {
        question: "How much is shipping?",
        answer:
          "Catalogue Regular Post is A$15 for 1–9 devices, A$10 for 10–19, and free for 20+. Typical delivery is about 3–7 business days after payment confirmation. Metro areas such as Sydney, Melbourne and Brisbane are often faster; remote postcodes can take longer. These are site-stated values and may change. Confirm the live checkout total before paying.",
      },
      {
        question: "Do you ship Australia-wide?",
        answer:
          "Yes. We ship to Australian states and territories including NSW, VIC, QLD, WA, SA, TAS, ACT and NT. Regional and remote areas may take longer than metro areas.",
      },
      {
        question: "Where is the store?",
        answer:
          "Alibarbar Australia is at 480 Queen St, Brisbane City QLD 4000, Australia, on Queen Street in Brisbane CBD. Catalogue orders still ship Australia-wide via Regular Post.",
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
          "At the moment the checkout default is Regular Post. Shipping is A$15 for 1–9 devices, A$10 for 10–19 devices, and free for 20+. If faster delivery options are added later, they will be shown clearly at checkout.",
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
          "All prices are shown in Australian dollars (AUD), including product prices and the tiered Regular Post shipping fee. See /guides/alibarbar-ingot-9000-price-guide-australia for singles, packs and shipping tiers.",
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
          "The Alibarbar Ingot 9000 is a pre-filled, pre-charged sealed disposable rated for up to 9000 puffs (usage dependent). It has a 22ml e-liquid tank, a 2350mAh non-rechargeable battery, and a built-in LED that shows remaining battery and e-liquid.",
      },
      {
        question: "How many puffs does the Alibarbar Ingot 9000 have?",
        answer:
          "Each Alibarbar Ingot device is rated for up to 9000 puffs (usage dependent). Actual puff count varies with puff length and draw style. It is not a guaranteed 9000-puff outcome.",
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
          "The smart LED shows two remaining-life indicators: battery level and e-liquid level. Low or empty usually means the device is near finished. Flashing can mean empty liquid, a flat battery, or a draw that is too hard — try a gentler puff. Treat exact flash codes as device-specific unless the manufacturer documents them. See /guides/how-to-read-alibarbar-led-when-finished.",
      },
      {
        question: "Which Alibarbar flavour is best?",
        answer:
          "It depends on your taste. Fruit lovers tend to choose Quadruple Berry, Mango Magic or Strawberry Watermelon, while those who prefer a cool finish go for Peach Ice, Grape Ice, Blackberry Ice or Strawberry Ice. Fanta is popular for a soda-style change-up.",
      },
      {
        question: "Which flavours are available?",
        answer:
          "The current line-up includes Quadruple Berry, Fanta, Peach Ice, Blackberry Ice, Mango Magic, Strawberry Coconut Watermelon, Grape Ice, Strawberry Watermelon, and Strawberry Ice.",
      },
      {
        question: "What is the 5 Flavour Custom Pack?",
        answer:
          "The 5 Flavour Custom Pack lets you pick any five flavours from our current Alibarbar Ingot 9000 collection for A$165. Repeats are allowed, and your choices are saved with your order.",
      },
      {
        question: "What is the 10 Flavour Custom Pack?",
        answer:
          "The 10 Flavour Custom Pack lets you choose any ten flavours from the current line-up for A$300.",
      },
      {
        question: "What is the 20 Flavour Custom Pack?",
        answer:
          "The 20 Flavour Custom Pack lets you pick any twenty flavours from our current Alibarbar Ingot 9000 collection for A$500, with free Regular Post shipping (20+ devices).",
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
          "Nicotine strength is not one fixed site-wide number. It can vary by batch and region, so the mg/mL or percentage printed on the pack is the source of truth. If packaging conflicts with a website figure, trust the pack. Full guide: /guides/alibarbar-nicotine-strength-australia.",
      },
      {
        question: "Is there a warranty on disposable vapes?",
        answer:
          "Disposable vapes are consumable products, but if a device arrives damaged or faulty out of the box, contact us within 7 days. Under the Australian Consumer Law you may be entitled to a replacement or refund for products that are not of acceptable quality.",
      },
      {
        question: "Which Alibarbar flavour is best for beginners?",
        answer:
          "Mild fruit blends such as Mango Magic or Strawberry Watermelon are popular starting points. If you prefer a cooler finish, try Peach Ice or Grape Ice with shorter first puffs until you find your comfortable draw.",
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
          "Check packaging and ALIBARBAR branding, a working smart LED, and specs that match up to 9000 puffs, 22ml and 2350mAh. Inconsistent labelling is a warning sign. See /guides/how-to-spot-fake-alibarbar-ingot.",
      },
      {
        question: "How can I tell if my Alibarbar Ingot is genuine?",
        answer:
          "Check the Authentication panel on the back of the box for ALIBARBAR branding and the honeycomb anti-counterfeit seal. Genuine devices also have the smart LED display, up to 9000 puffs, 22ml capacity and ALIBARBAR branding. Buying from Alibarbar Australia ensures authentic stock.",
      },
      {
        question: "How do I use the packaging authenticity marks?",
        answer:
          "Genuine packaging includes a left circular honeycomb seal (orange ring + hex pattern) and ALIBARBAR branding on the Authentication panel. The same five seal designs are printed randomly across genuine packaging (not a unique serial per device). If unsure, buy from Alibarbar Australia.",
      },
      {
        question: "How do I know if my Alibarbar is fake?",
        answer:
          "Check for a working LED display showing battery and e-liquid levels, ALIBARBAR branding on packaging, and consistent vapour quality. See our guide at /guides/how-to-spot-fake-alibarbar-ingot for the full checklist.",
      },
      {
        question: "What should genuine packaging look like?",
        answer:
          "Authentic packaging includes ALIBARBAR branding, Ingot 9000 model naming, clear puff-count and capacity labelling, plus the Authentication panel with a left honeycomb anti-counterfeit seal. The device inside should have the gold ingot-bar design and a working LED display.",
      },
      {
        question: "Why are some Alibarbar listings much cheaper online?",
        answer:
          "Unusually low prices on unofficial marketplaces often indicate grey-market or counterfeit stock. Genuine Ingot 9000 devices include a 22ml capacity and smart LED display — if those features are missing or inconsistent, treat the listing with caution. Compare fair AU pricing at /guides/alibarbar-ingot-9000-price-guide-australia.",
      },
      {
        question: "Where can I buy authentic Alibarbar in Australia?",
        answer:
          "You can compare listed Ingot 9000 specifications on ailibarbar.com. That catalogue is not proof the product may lawfully be supplied outside Australia’s pharmacy/therapeutic framework. Check TGA and local rules. See /guides/disposable-vape-laws-in-australia.",
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
          "Yes. Use the free honeycomb seal checker at /verify — photograph or upload the circular anti-counterfeit mark on your packaging. Also confirm a working smart LED, ALIBARBAR branding and consistent vapour. Full checklist: /guides/how-to-spot-fake-alibarbar-ingot.",
      },
      {
        question: "Are custom packs also genuine?",
        answer:
          "Yes. Our 5, 10 and 20 Flavour Custom Packs contain the same authentic single-flavour Ingot 9000 devices — only the flavour mix in your order changes.",
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
          "Yes. You must be 18 years or older to purchase from Alibarbar Australia. First-time visitors see an age gate, and checkout requires an explicit 18+ confirmation. By placing an order you confirm you meet the legal age requirement in your state or territory. Full policy: /age-verification.",
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
          "Current TGA guidance frames vapes as pharmacy-setting supply for therapeutic purposes, with extra conditions by nicotine strength and jurisdiction. Adults 18+ still apply. This site’s catalogue is not a lawful-supply determination. See /guides/disposable-vape-laws-in-australia — general information, not legal advice.",
      },
      {
        question: "Where can you legally buy vaping products in Australia?",
        answer:
          "Government guidance currently points to pharmacy settings for therapeutic purposes, not ordinary non-pharmacy retail. Extra conditions apply by nicotine strength and state or territory. Do not treat ailibarbar.com catalogue pages as proof of lawful supply. Not legal advice.",
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
          "Nicotine in vapes is tightly regulated. Strengths above 20 mg/mL typically sit under extra prescription-style controls. The Ingot 9000’s exact strength is not a single site-wide figure — read the pack. Confirm current TGA rules. Not legal advice.",
      },
      {
        question: "What is your age verification policy?",
        answer:
          "By placing an order you confirm you are 18+. First-time visitors also see an age gate; checkout requires an explicit 18+ tick. We may cancel orders where age cannot be verified. See /age-verification for the full policy.",
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
