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
];

export function getFaqTopicBySlug(slug: string | undefined): FaqTopic | undefined {
  if (!slug) return undefined;
  return faqTopics.find((topic) => topic.slug === slug);
}
