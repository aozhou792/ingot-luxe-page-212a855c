import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from "react";
import { toast } from "sonner";

export type CartLine = {
  slug: string;
  name: string;
  price: number;
  image: string;
  qty: number;
};

type CartContextValue = {
  lines: CartLine[];
  itemCount: number;
  subtotal: number;
  addToCart: (item: { slug: string; name: string; price: string; image: string; qty?: number }) => void;
  /** Replace cart with this line only (for express checkout). */
  buyNow: (item: { slug: string; name: string; price: string; image: string; qty?: number }) => void;
  setLineQty: (slug: string, qty: number) => void;
  removeLine: (slug: string) => void;
  clearCart: () => void;
};

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>([]);

  const addToCart = useCallback(
    (item: { slug: string; name: string; price: string; image: string; qty?: number }) => {
      const qty = item.qty ?? 1;
      const price = Number.parseFloat(item.price);
      if (Number.isNaN(price)) return;

      setLines((prev) => {
        const i = prev.findIndex((l) => l.slug === item.slug);
        if (i >= 0) {
          const next = [...prev];
          next[i] = { ...next[i], qty: next[i].qty + qty };
          return next;
        }
        return [...prev, { slug: item.slug, name: item.name, price, image: item.image, qty }];
      });
      toast.success("Added to cart", { description: `${item.name} × ${qty}` });
    },
    [],
  );

  const buyNow = useCallback((item: { slug: string; name: string; price: string; image: string; qty?: number }) => {
    const qty = item.qty ?? 1;
    const price = Number.parseFloat(item.price);
    if (Number.isNaN(price)) return;
    setLines([{ slug: item.slug, name: item.name, price, image: item.image, qty }]);
    toast.message("Checkout", { description: `${item.name} × ${qty}` });
  }, []);

  const setLineQty = useCallback((slug: string, qty: number) => {
    const n = Math.floor(qty);
    if (n < 1) {
      setLines((prev) => prev.filter((l) => l.slug !== slug));
      return;
    }
    setLines((prev) => prev.map((l) => (l.slug === slug ? { ...l, qty: n } : l)));
  }, []);

  const removeLine = useCallback((slug: string) => {
    setLines((prev) => prev.filter((l) => l.slug !== slug));
  }, []);

  const clearCart = useCallback(() => {
    setLines([]);
  }, []);

  const itemCount = useMemo(() => lines.reduce((n, l) => n + l.qty, 0), [lines]);

  const subtotal = useMemo(() => lines.reduce((sum, l) => sum + l.price * l.qty, 0), [lines]);

  const value = useMemo(
    () => ({
      lines,
      itemCount,
      subtotal,
      addToCart,
      buyNow,
      setLineQty,
      removeLine,
      clearCart,
    }),
    [lines, itemCount, subtotal, addToCart, buyNow, setLineQty, removeLine, clearCart],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
