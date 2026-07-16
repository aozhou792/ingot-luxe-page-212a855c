import { useLayoutEffect, useState, type FormEvent, type ReactNode } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Seo } from "@/components/Seo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import { formatAud } from "@/lib/format";
import { AU_STATES, DEFAULT_AU_COUNTRY } from "@/data/australia";
import {
  SHIPPING_LABEL,
  orderTotal,
  PAYMENT_METHOD_LABEL,
  shippingAud,
  shippingRateHint,
} from "@/lib/checkout";
import { trackPlaceOrder } from "@/lib/analytics";
import { saveCheckoutDraft } from "@/lib/marketing-api";
import { nextOrderNumber } from "@/lib/orders";
import { fetchNextOrderNumberFromApi } from "@/lib/orders-api";
import type { OrderDetails } from "@/types/navigation";

type BillingForm = {
  firstName: string;
  lastName: string;
  country: string;
  street: string;
  apartment: string;
  suburb: string;
  state: string;
  postcode: string;
  phone: string;
  email: string;
  orderNotes: string;
};

const initialForm: BillingForm = {
  firstName: "",
  lastName: "",
  country: DEFAULT_AU_COUNTRY,
  street: "",
  apartment: "",
  suburb: "",
  state: AU_STATES[0].value,
  postcode: "",
  phone: "",
  email: "",
  orderNotes: "",
};

type FieldErrors = Partial<Record<keyof BillingForm, string>>;

const CheckoutPage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { lines, deviceCount, subtotal, clearCart } = useCart();
  const [form, setForm] = useState<BillingForm>(initialForm);
  const [errors, setErrors] = useState<FieldErrors>({});

  const hasItems = lines.length > 0;
  const shipping = shippingAud(deviceCount);
  const total = orderTotal(subtotal, deviceCount);

  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useLayoutEffect(() => {
    if (user?.email && !form.email) {
      setForm((prev) => ({ ...prev, email: user.email }));
    }
  }, [user?.email, form.email]);

  const setField = <K extends keyof BillingForm>(key: K, value: BillingForm[K]) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => (prev[key] ? { ...prev, [key]: undefined } : prev));
  };

  const validate = (): FieldErrors => {
    const next: FieldErrors = {};
    if (!form.firstName.trim()) next.firstName = "First name is required";
    if (!form.lastName.trim()) next.lastName = "Last name is required";
    if (!form.street.trim()) next.street = "Street address is required";
    if (!form.suburb.trim()) next.suburb = "Suburb is required";
    if (!form.state) next.state = "State is required";
    if (!/^\d{4}$/.test(form.postcode.trim())) next.postcode = "Enter a valid 4-digit postcode";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) next.email = "Enter a valid email address";
    return next;
  };

  const placeOrder = async (event: FormEvent) => {
    event.preventDefault();
    if (!hasItems) return;

    const nextErrors = validate();
    setErrors(nextErrors);
    if (Object.values(nextErrors).some(Boolean)) {
      const firstInvalid = document.querySelector<HTMLElement>("[data-invalid='true']");
      firstInvalid?.scrollIntoView({ behavior: "smooth", block: "center" });
      firstInvalid?.focus();
      return;
    }

    let orderNumber: string;
    try {
      orderNumber = await fetchNextOrderNumberFromApi();
    } catch {
      orderNumber = nextOrderNumber();
    }

    const order: OrderDetails = {
      orderNumber,
      date: new Intl.DateTimeFormat("en-US", { year: "numeric", month: "long", day: "numeric" }).format(new Date()),
      lines: lines.map((l) => ({ slug: l.slug, name: l.name, qty: l.qty, price: l.price })),
      subtotal,
      shipping,
      total,
      paymentMethod: PAYMENT_METHOD_LABEL,
      deviceCount,
      billing: {
        firstName: form.firstName.trim(),
        lastName: form.lastName.trim(),
        street: form.street.trim(),
        apartment: form.apartment.trim() || undefined,
        suburb: form.suburb.trim(),
        state: form.state,
        postcode: form.postcode.trim(),
        country: form.country,
        phone: form.phone.trim() || undefined,
        email: form.email.trim(),
      },
      shipToDifferent: false,
    };

    void saveCheckoutDraft(order, deviceCount);
    await trackPlaceOrder(order);
    navigate("/order-complete", { state: order });
    requestAnimationFrame(() => clearCart());
  };

  return (
    <div className="min-h-screen bg-background">
      <Seo
        title="Checkout | Alibarbar Australia"
        description="Complete your Alibarbar Australia order with bank transfer payment."
        path="/checkout"
        noindex
      />
      <Navbar />
      <main className="container pt-[calc(5rem+env(safe-area-inset-top))] sm:pt-[calc(6rem+env(safe-area-inset-top))] pb-28 lg:pb-20 max-w-6xl">
        <nav className="text-sm text-muted-foreground mb-6" aria-label="Checkout steps">
          <Link to="/cart" className="hover:text-primary transition-colors">
            Shopping Cart
          </Link>
          <span className="mx-2">→</span>
          <span className="text-foreground font-medium underline underline-offset-4">Checkout Details</span>
          <span className="mx-2">→</span>
          <span>Order Complete</span>
        </nav>

        {!hasItems ? (
          <div className="rounded-2xl border border-border bg-card/70 p-8 text-center max-w-lg mx-auto">
            <h1 className="text-2xl font-semibold text-foreground mb-3">Your cart is empty</h1>
            <p className="text-muted-foreground mb-6">Add products before checking out.</p>
            <Button asChild>
              <Link to="/#flavors">Browse flavours</Link>
            </Button>
          </div>
        ) : (
          <form id="checkout-form" onSubmit={placeOrder} className="grid lg:grid-cols-[1fr_380px] gap-8 lg:gap-12 items-start" noValidate>
            <section className="space-y-6 order-last lg:order-none">
              <div className="rounded-2xl border border-border bg-card/70 p-6 sm:p-8">
                <h1 className="text-xl sm:text-2xl font-semibold text-foreground mb-6">Billing details</h1>

                <div className="grid sm:grid-cols-2 gap-4">
                  <Field label="First name" required error={errors.firstName}>
                    <Input
                      value={form.firstName}
                      onChange={(e) => setField("firstName", e.target.value)}
                      data-invalid={errors.firstName ? "true" : undefined}
                      autoComplete="given-name"
                    />
                  </Field>
                  <Field label="Last name" required error={errors.lastName}>
                    <Input
                      value={form.lastName}
                      onChange={(e) => setField("lastName", e.target.value)}
                      data-invalid={errors.lastName ? "true" : undefined}
                      autoComplete="family-name"
                    />
                  </Field>
                </div>

                <div className="mt-4">
                  <Field label="Country / Region" required>
                    <Select value={form.country} onValueChange={(v) => setField("country", v)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value={DEFAULT_AU_COUNTRY}>{DEFAULT_AU_COUNTRY}</SelectItem>
                      </SelectContent>
                    </Select>
                  </Field>
                </div>

                <div className="mt-4 grid sm:grid-cols-2 gap-4">
                  <Field label="Street address" required error={errors.street}>
                    <Input
                      value={form.street}
                      onChange={(e) => setField("street", e.target.value)}
                      placeholder="House number and street name"
                      data-invalid={errors.street ? "true" : undefined}
                      autoComplete="address-line1"
                    />
                  </Field>
                  <Field label="Apartment, suite, unit" hint="optional">
                    <Input
                      value={form.apartment}
                      onChange={(e) => setField("apartment", e.target.value)}
                      placeholder="Apartment, suite, unit, etc. (optional)"
                      autoComplete="address-line2"
                    />
                  </Field>
                </div>

                <div className="mt-4">
                  <Field label="Suburb" required error={errors.suburb}>
                    <Input
                      value={form.suburb}
                      onChange={(e) => setField("suburb", e.target.value)}
                      data-invalid={errors.suburb ? "true" : undefined}
                      autoComplete="address-level2"
                    />
                  </Field>
                </div>

                <div className="mt-4 grid sm:grid-cols-2 gap-4">
                  <Field label="State" required error={errors.state}>
                    <Select value={form.state} onValueChange={(v) => setField("state", v)}>
                      <SelectTrigger data-invalid={errors.state ? "true" : undefined}>
                        <SelectValue placeholder="Select a state" />
                      </SelectTrigger>
                      <SelectContent>
                        {AU_STATES.map((s) => (
                          <SelectItem key={s.value} value={s.value}>
                            {s.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </Field>
                  <Field label="Postcode" required error={errors.postcode}>
                    <Input
                      value={form.postcode}
                      inputMode="numeric"
                      maxLength={4}
                      onChange={(e) => setField("postcode", e.target.value.replace(/\D/g, ""))}
                      data-invalid={errors.postcode ? "true" : undefined}
                      autoComplete="postal-code"
                    />
                  </Field>
                </div>

                <div className="mt-4 grid sm:grid-cols-2 gap-4">
                  <Field label="Phone" hint="optional">
                    <Input
                      value={form.phone}
                      onChange={(e) => setField("phone", e.target.value)}
                      type="tel"
                      autoComplete="tel"
                    />
                  </Field>
                  <Field label="Email address" required error={errors.email}>
                    <Input
                      value={form.email}
                      onChange={(e) => setField("email", e.target.value)}
                      type="email"
                      data-invalid={errors.email ? "true" : undefined}
                      autoComplete="email"
                    />
                  </Field>
                </div>

                <div className="mt-6">
                  <Field label="Order notes" hint="optional">
                    <Textarea
                      value={form.orderNotes}
                      onChange={(e) => setField("orderNotes", e.target.value)}
                      placeholder="Notes about your order, e.g. special notes for delivery."
                      rows={4}
                    />
                  </Field>
                </div>
              </div>
            </section>

            <aside className="order-first lg:order-none lg:sticky lg:top-[calc(6rem+env(safe-area-inset-top))] rounded-2xl border border-border bg-muted/40 p-5 sm:p-6 space-y-5">
              <h2 className="text-lg font-semibold text-foreground border-b border-border pb-3">Your order</h2>

              <div className="flex justify-between text-xs uppercase tracking-wider text-muted-foreground">
                <span>Product</span>
                <span>Subtotal</span>
              </div>

              <ul className="space-y-3">
                {lines.map((line) => (
                  <li key={line.slug} className="flex justify-between gap-4 text-sm">
                    <span className="text-foreground leading-snug">
                      {line.name} <span className="text-muted-foreground">× {line.qty}</span>
                    </span>
                    <span className="tabular-nums whitespace-nowrap">{formatAud(line.price * line.qty)}</span>
                  </li>
                ))}
              </ul>

              <div className="border-t border-border pt-4 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span className="tabular-nums">{formatAud(subtotal)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Devices</span>
                  <span className="tabular-nums">{deviceCount}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Shipment</span>
                  <span className="tabular-nums">
                    {SHIPPING_LABEL}: {formatAud(shipping)}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">{shippingRateHint()}</p>
                <div className="flex justify-between items-baseline border-t border-border pt-3">
                  <span className="font-medium">Total</span>
                  <span className="text-2xl font-bold text-primary tabular-nums">{formatAud(total)}</span>
                </div>
              </div>

              <div className="rounded-lg border border-border bg-background/60 p-4 text-sm text-muted-foreground">
                <p className="font-medium text-foreground mb-1">Bank Transfer</p>
                <p>
                  Please transfer money to our Bank Transfer account. Put your order number to help us process your order
                  accurately.
                </p>
              </div>

              <Button type="submit" size="lg" className="w-full min-h-[48px] hidden lg:flex">
                Place order
              </Button>
              <Button asChild variant="outline" className="w-full bg-background">
                <Link to="/cart">Back to cart</Link>
              </Button>
            </aside>
          </form>
        )}

        {hasItems ? (
          <div
            aria-label="Checkout actions"
            className="lg:hidden fixed bottom-0 inset-x-0 z-40 border-t border-gold/30 bg-background/95 backdrop-blur-xl px-4 pt-3 pb-[max(0.75rem,env(safe-area-inset-bottom))]"
          >
            <div className="flex items-center justify-between gap-4 max-w-lg mx-auto">
              <div className="min-w-0">
                <p className="text-xs text-muted-foreground">Order total</p>
                <p className="text-xl font-bold text-primary tabular-nums">{formatAud(total)}</p>
              </div>
              <Button type="submit" form="checkout-form" size="lg" className="shrink-0 min-h-[48px] px-6">
                Place order
              </Button>
            </div>
          </div>
        ) : null}
      </main>
      <Footer />
    </div>
  );
};

type FieldProps = {
  label: string;
  required?: boolean;
  hint?: string;
  error?: string;
  children: ReactNode;
};

const Field = ({ label, required, hint, error, children }: FieldProps) => (
  <div className="space-y-1.5">
    <Label className="text-sm">
      {label}
      {required ? <span className="text-destructive"> *</span> : null}
      {hint ? <span className="text-muted-foreground font-normal"> ({hint})</span> : null}
    </Label>
    {children}
    {error ? <p className="text-xs text-destructive">{error}</p> : null}
  </div>
);

export default CheckoutPage;
