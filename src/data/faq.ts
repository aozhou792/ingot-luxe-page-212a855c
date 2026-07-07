export type FaqItem = {
  question: string;
  answer: string;
};

/** Shown on the homepage FAQ section and mirrored into FAQPage JSON-LD. */
export const faqItems: FaqItem[] = [
  {
    question: "How much is shipping in Australia?",
    answer:
      "Standard checkout shipping is a flat A$10 Australia-wide via Regular Post, added automatically to your order total at checkout.",
  },
  {
    question: "How do I pay for my order?",
    answer:
      "We accept bank transfer. After placing your order you'll see our account details — transfer the total with your order number as the reference, then upload your payment screenshot to confirm.",
  },
  {
    question: "How long does delivery take?",
    answer:
      "Orders are dispatched after your bank transfer is confirmed, and delivery typically takes 3-7 business days depending on your state.",
  },
  {
    question: "Do I need to be over 18 to order?",
    answer:
      "Yes. You must be 18 years or older to purchase from Alibarbar Australia. By placing an order you confirm you meet the legal age requirement.",
  },
  {
    question: "What is the 5 Flavour Custom Pack?",
    answer:
      "The 5 Flavour Custom Pack lets you pick any five flavours from our current Alibarbar Ingot 9000 collection for A$150. Repeats are allowed, and your choices are saved with your order.",
  },
  {
    question: "Are your products authentic?",
    answer:
      "Yes. We only sell genuine ALIBARBAR Ingot 9000 devices with the built-in smart LED display, 22ml e-liquid capacity, and up to 9000 puffs per device.",
  },
  {
    question: "How do I know my order went through?",
    answer:
      "After you upload your payment screenshot, our team verifies the transfer and confirms your order. Keep your order number handy if you need to contact us at orders@ailibarbar.com.",
  },
  {
    question: "Which flavours are available?",
    answer:
      "The current line-up includes Quadruple Berry, Fanta, Lychee, Peach Ice, Blackberry Ice, Mango Magic, Strawberry Coconut Watermelon, Grape Ice, Strawberry Watermelon, and Strawberry Ice.",
  },
];
