export type PaymentStatus = "pending" | "confirmed";

export type OrderLine = {
  slug: string;
  name: string;
  qty: number;
  price: number;
};

export type OrderAddress = {
  firstName: string;
  lastName: string;
  street: string;
  apartment?: string;
  suburb: string;
  state: string;
  postcode: string;
  country: string;
  phone?: string;
  email: string;
};

export type OrderDetails = {
  orderNumber: string;
  date: string;
  lines: OrderLine[];
  subtotal: number;
  shipping: number;
  total: number;
  paymentMethod: string;
  billing: OrderAddress;
  shipToDifferent: boolean;
  deviceCount: number;
  discountCode?: string;
  discountAmount?: number;
};

export type StoredOrder = OrderDetails & {
  paymentReceipt?: string;
  paymentReceiptName?: string;
  paymentSubmittedAt?: string;
  paymentStatus?: PaymentStatus;
  paymentConfirmedAt?: string;
};

export type SubmitOrderBody = {
  order: OrderDetails;
  receipt: {
    dataUrl: string;
    name: string;
  };
};
