import { Link } from "react-router-dom";
import { Minus, Plus, Trash2 } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/CartContext";
import { formatAud } from "@/lib/format";
import { SHIPPING_LABEL, orderTotal, shippingAud, shippingRateHint } from "@/lib/checkout";

const CartPage = () => {
  const { lines, itemCount, subtotal, setLineQty, removeLine } = useCart();
  const hasItems = lines.length > 0;
  const shipping = shippingAud(itemCount);
  const total = orderTotal(subtotal, itemCount);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container pt-[calc(5rem+env(safe-area-inset-top))] sm:pt-[calc(6rem+env(safe-area-inset-top))] pb-16 sm:pb-20">
        <nav className="text-sm text-muted-foreground mb-6" aria-label="Checkout steps">
          <span className="text-foreground font-medium underline underline-offset-4">Shopping Cart</span>
          <span className="mx-2">→</span>
          <Link to="/checkout" className="hover:text-primary transition-colors">
            Checkout
          </Link>
          <span className="mx-2">→</span>
          <span>Order Complete</span>
        </nav>

        <h1 className="text-2xl sm:text-3xl font-semibold text-foreground mb-8">Shopping cart</h1>

        {lines.length === 0 ? (
          <div className="rounded-xl border border-border bg-card/50 p-8 text-center max-w-lg mx-auto">
            <p className="text-muted-foreground mb-6">Your cart is empty.</p>
            <Button asChild>
              <Link to="/#flavors">Browse flavours</Link>
            </Button>
          </div>
        ) : (
          <div className="grid lg:grid-cols-[1fr_380px] gap-10 lg:gap-12 items-start">
            <ul className="space-y-4">
              {lines.map((line) => {
                const lineTotal = line.price * line.qty;
                return (
                  <li
                    key={line.slug}
                    className="flex gap-4 flex-wrap sm:flex-nowrap rounded-xl border border-border bg-card p-4"
                  >
                    <div className="h-20 w-20 shrink-0 overflow-hidden rounded-lg bg-muted">
                      <img src={line.image} alt="" className="h-full w-full object-cover" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="font-medium text-foreground leading-snug">{line.name}</p>
                      <p className="text-sm text-muted-foreground mt-1">{formatAud(line.price)} each</p>
                      <div className="flex items-center gap-3 mt-3">
                        <div className="inline-flex items-center rounded-md border border-input">
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            className="h-9 w-9 rounded-none shrink-0"
                            onClick={() => setLineQty(line.slug, line.qty - 1)}
                            aria-label="Decrease quantity"
                          >
                            <Minus className="h-4 w-4" />
                          </Button>
                          <span className="tabular-nums text-sm w-10 text-center">{line.qty}</span>
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            className="h-9 w-9 rounded-none shrink-0"
                            onClick={() => setLineQty(line.slug, line.qty + 1)}
                            aria-label="Increase quantity"
                          >
                            <Plus className="h-4 w-4" />
                          </Button>
                        </div>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="text-destructive hover:text-destructive"
                          onClick={() => removeLine(line.slug)}
                        >
                          <Trash2 className="h-4 w-4 mr-1" />
                          Remove
                        </Button>
                      </div>
                    </div>
                    <div className="w-full sm:w-auto sm:text-right font-semibold text-indigo-900 tabular-nums">
                      {formatAud(lineTotal)}
                    </div>
                  </li>
                );
              })}
            </ul>

            <aside className="lg:sticky lg:top-[calc(6rem+env(safe-area-inset-top))] rounded-xl border border-border bg-muted/40 p-6 space-y-4">
              <h2 className="text-lg font-semibold">Cart totals</h2>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Subtotal</span>
                <span className="font-semibold text-indigo-900 tabular-nums">{formatAud(subtotal)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Shipping</span>
                <span className="tabular-nums">
                  {SHIPPING_LABEL}: {formatAud(shipping)}
                </span>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed">{shippingRateHint()}</p>
              <div className="border-t border-border pt-4 flex justify-between items-baseline">
                <span className="font-medium">Total</span>
                <span className="text-xl font-bold text-indigo-900 tabular-nums">{formatAud(total)}</span>
              </div>
              <Button asChild className="w-full" size="lg">
                <Link to="/checkout">Proceed to checkout</Link>
              </Button>
              <Button asChild variant="outline" className="w-full bg-background">
                <Link to="/#flavors">Continue shopping</Link>
              </Button>
            </aside>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default CartPage;
