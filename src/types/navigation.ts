/** Passed when opening a product from home — preserves scroll for Back to home only. */
export type ProductLocationState = {
  homeScrollY?: number;
};

/** Only set on the Back to home link so Index restores scroll (not for other / navigations). */
export type HomeRestoreState = {
  homeScrollY: number;
  restoreHomeScroll: true;
};

/** A single purchased line, snapshotted at checkout (cart is cleared afterwards). */
export type OrderLine = {
  slug: string;
  name: string;
  qty: number;
  price: number;
};

/** Billing / shipping address captured on the checkout form. */
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

/** Full order snapshot passed to the order-complete page via router state. */
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
};
