import { Link, useLocation } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { formatAud } from "@/lib/format";

type OrderState = {
  totalAmount?: number;
  email?: string;
  itemCount?: number;
};

const OrderCompletePage = () => {
  const location = useLocation();
  const state = (location.state as OrderState | null) ?? null;
  const total = typeof state?.totalAmount === "number" ? state.totalAmount : null;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container pt-[calc(5rem+env(safe-area-inset-top))] sm:pt-[calc(6rem+env(safe-area-inset-top))] pb-16 sm:pb-20 max-w-2xl text-center">
        <nav className="text-sm text-muted-foreground mb-8" aria-label="Checkout steps">
          <Link to="/cart" className="hover:text-primary transition-colors">
            Shopping Cart
          </Link>
          <span className="mx-2">→</span>
          <Link to="/checkout" className="hover:text-primary transition-colors">
            Checkout
          </Link>
          <span className="mx-2">→</span>
          <span className="text-foreground font-medium underline underline-offset-4">Order Complete</span>
        </nav>

        <div className="rounded-2xl border border-border bg-card p-8 sm:p-10 shadow-sm">
          <h1 className="text-2xl sm:text-3xl font-semibold text-foreground mb-3">Thank you for your order</h1>
          <p className="text-muted-foreground mb-6">
            {state?.email
              ? `We’ve received your request${total != null ? ` for ${formatAud(total)}` : ""}. We may contact you at ${state.email} to confirm delivery.`
              : "We’ve received your order details. Our team may reach out to confirm delivery."}
          </p>
          {typeof state?.itemCount === "number" ? (
            <p className="text-sm text-muted-foreground mb-8">
              Items in this order: {state.itemCount}.
            </p>
          ) : null}
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button asChild>
              <Link to="/">Back to home</Link>
            </Button>
            <Button asChild variant="outline">
              <Link to="/#flavors">Continue shopping</Link>
            </Button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default OrderCompletePage;
