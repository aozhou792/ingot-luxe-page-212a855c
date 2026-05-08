import { useLayoutEffect, useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ChevronDown, ChevronUp } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useCart } from "@/context/CartContext";
import { AU_STATES, DEFAULT_AU_COUNTRY } from "@/data/australia";
import { formatAud } from "@/lib/format";

const req = <span className="text-red-600">*</span>;

const CheckoutPage = () => {
  const navigate = useNavigate();
  const { lines, subtotal, itemCount, removeLine, clearCart } = useCart();
  const [couponOpen, setCouponOpen] = useState(false);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [company, setCompany] = useState("");
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");
  const [suburb, setSuburb] = useState("");
  const [state, setState] = useState("NSW");
  const [postcode, setPostcode] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [newsletter, setNewsletter] = useState(false);
  const [differentShipping, setDifferentShipping] = useState(false);
  const [orderNotes, setOrderNotes] = useState("");

  const [shipFirstName, setShipFirstName] = useState("");
  const [shipLastName, setShipLastName] = useState("");
  const [shipCompany, setShipCompany] = useState("");
  const [shipAddress1, setShipAddress1] = useState("");
  const [shipAddress2, setShipAddress2] = useState("");
  const [shipSuburb, setShipSuburb] = useState("");
  const [shipState, setShipState] = useState("NSW");
  const [shipPostcode, setShipPostcode] = useState("");
  const [couponCode, setCouponCode] = useState("");

  const [submitError, setSubmitError] = useState<string | null>(null);

  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const cartSummaryText =
    lines.length === 0
      ? "Your cart is empty."
      : lines
          .map((l) => `${l.qty} × ${l.name}`)
          .slice(0, 3)
          .join(" · ") + (lines.length > 3 ? " · …" : "");

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    setSubmitError(null);

    if (lines.length === 0) {
      setSubmitError("Your cart is empty.");
      return;
    }

    const need =
      !firstName.trim() ||
      !lastName.trim() ||
      !address1.trim() ||
      !suburb.trim() ||
      !postcode.trim() ||
      !phone.trim() ||
      !email.trim();
    if (need) {
      setSubmitError("Please fill in all required billing fields.");
      return;
    }

    if (!/^\d{4}$/.test(postcode.trim())) {
      setSubmitError("Please enter a valid 4-digit Australian postcode.");
      return;
    }

    if (differentShipping) {
      const shipNeed =
        !shipFirstName.trim() ||
        !shipLastName.trim() ||
        !shipAddress1.trim() ||
        !shipSuburb.trim() ||
        !shipPostcode.trim();
      if (shipNeed) {
        setSubmitError("Please fill in all required shipping address fields.");
        return;
      }
      if (!/^\d{4}$/.test(shipPostcode.trim())) {
        setSubmitError("Please enter a valid 4-digit shipping postcode.");
        return;
      }
    }

    const total = subtotal;
    clearCart();
    navigate("/order-complete", {
      replace: true,
      state: {
        totalAmount: total,
        email: email.trim(),
        itemCount,
        couponAttempted: couponCode.trim() || undefined,
        newsletter,
      },
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container pt-[calc(5rem+env(safe-area-inset-top))] sm:pt-[calc(6rem+env(safe-area-inset-top))] pb-16 sm:pb-20 max-w-6xl">
        <nav className="text-sm text-muted-foreground mb-6" aria-label="Checkout steps">
          <Link to="/cart" className="hover:text-primary transition-colors">
            Shopping Cart
          </Link>
          <span className="mx-2">→</span>
          <span className="text-foreground font-medium underline underline-offset-4">Checkout</span>
          <span className="mx-2">→</span>
          <span>Order Complete</span>
        </nav>

        {lines.length === 0 ? (
          <div className="rounded-xl border border-border bg-card/50 p-8 text-center max-w-lg mx-auto">
            <p className="text-muted-foreground mb-6">Your cart is empty. Add products before checkout.</p>
            <Button asChild>
              <Link to="/cart">View cart</Link>
            </Button>
          </div>
        ) : (
          <>
            <div className="mb-4 rounded-md bg-emerald-600 px-4 py-3 text-sm text-white flex flex-wrap items-center gap-2">
              <span className="font-medium" aria-hidden>
                ✓
              </span>
              <Link to="/#flavors" className="underline font-medium hover:text-emerald-100">
                Continue shopping
              </Link>
              <span className="opacity-90">— {cartSummaryText}</span>
            </div>

            <Collapsible open={couponOpen} onOpenChange={setCouponOpen} className="mb-8">
              <CollapsibleTrigger asChild>
                <button
                  type="button"
                  className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
                >
                  Have a coupon?{" "}
                  <span className="text-indigo-800 font-medium underline underline-offset-2">Click here to enter your code</span>
                  {couponOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                </button>
              </CollapsibleTrigger>
              <CollapsibleContent className="mt-3">
                <div className="flex flex-col sm:flex-row gap-2 max-w-md">
                  <Input
                    placeholder="Coupon code"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    className="bg-background"
                  />
                  <Button type="button" variant="secondary" disabled className="shrink-0">
                    Apply
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground mt-2">Coupons are not processed in this demo storefront.</p>
              </CollapsibleContent>
            </Collapsible>

            <form onSubmit={onSubmit} className="grid lg:grid-cols-[1fr_400px] gap-10 lg:gap-12 items-start">
              <div className="space-y-10">
                <section>
                  <h2 className="text-lg font-semibold text-indigo-950 mb-6">
                    1. Billing details
                  </h2>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">First name {req}</Label>
                      <Input id="firstName" value={firstName} onChange={(e) => setFirstName(e.target.value)} required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Last name {req}</Label>
                      <Input id="lastName" value={lastName} onChange={(e) => setLastName(e.target.value)} required />
                    </div>
                  </div>
                  <div className="mt-4 space-y-2">
                    <Label htmlFor="company">Company name (optional)</Label>
                    <Input id="company" value={company} onChange={(e) => setCompany(e.target.value)} />
                  </div>
                  <div className="mt-4 space-y-2">
                    <Label htmlFor="country">Country / region {req}</Label>
                    <Input id="country" readOnly value={DEFAULT_AU_COUNTRY} className="bg-muted/50" />
                  </div>
                  <div className="mt-4 space-y-2">
                    <Label htmlFor="address1">Street address {req}</Label>
                    <Input
                      id="address1"
                      placeholder="House number and street name"
                      value={address1}
                      onChange={(e) => setAddress1(e.target.value)}
                      required
                    />
                  </div>
                  <div className="mt-4 space-y-2">
                    <Label htmlFor="address2" className="text-muted-foreground">
                      Apartment, suite, unit, etc. (optional)
                    </Label>
                    <Input
                      id="address2"
                      placeholder="Apartment, suite, unit, etc. (optional)"
                      value={address2}
                      onChange={(e) => setAddress2(e.target.value)}
                    />
                  </div>
                  <div className="mt-4 space-y-2">
                    <Label htmlFor="suburb">Suburb {req}</Label>
                    <Input id="suburb" value={suburb} onChange={(e) => setSuburb(e.target.value)} required />
                  </div>
                  <div className="grid sm:grid-cols-2 gap-4 mt-4">
                    <div className="space-y-2">
                      <Label htmlFor="state">State {req}</Label>
                      <Select value={state} onValueChange={setState} required>
                        <SelectTrigger id="state">
                          <SelectValue placeholder="Select state" />
                        </SelectTrigger>
                        <SelectContent>
                          {AU_STATES.map((s) => (
                            <SelectItem key={s.value} value={s.value}>
                              {s.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="postcode">Postcode {req}</Label>
                      <Input
                        id="postcode"
                        inputMode="numeric"
                        maxLength={4}
                        autoComplete="postal-code"
                        value={postcode}
                        onChange={(e) => setPostcode(e.target.value.replace(/\D/g, "").slice(0, 4))}
                        required
                      />
                    </div>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-4 mt-4">
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone {req}</Label>
                      <Input
                        id="phone"
                        type="tel"
                        autoComplete="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email address {req}</Label>
                      <Input
                        id="email"
                        type="email"
                        autoComplete="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <div className="mt-6 flex flex-col gap-4">
                    <label className="flex items-start gap-3 text-sm cursor-pointer">
                      <Checkbox
                        checked={newsletter}
                        onCheckedChange={(v) => setNewsletter(v === true)}
                        className="mt-0.5"
                      />
                      <span>Sign me up to receive email updates and news (optional)</span>
                    </label>
                    <label className="flex items-start gap-3 text-sm cursor-pointer">
                      <Checkbox
                        checked={differentShipping}
                        onCheckedChange={(v) => setDifferentShipping(v === true)}
                        className="mt-0.5"
                      />
                      <span>Deliver to a different address?</span>
                    </label>
                  </div>

                  {differentShipping ? (
                    <div className="mt-6 rounded-xl border border-dashed border-border p-4 space-y-4 bg-muted/20">
                      <h3 className="font-medium text-foreground">Shipping address</h3>
                      <div className="grid sm:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="shipFirstName">First name {req}</Label>
                          <Input id="shipFirstName" value={shipFirstName} onChange={(e) => setShipFirstName(e.target.value)} />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="shipLastName">Last name {req}</Label>
                          <Input id="shipLastName" value={shipLastName} onChange={(e) => setShipLastName(e.target.value)} />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="shipCompany">Company name (optional)</Label>
                        <Input id="shipCompany" value={shipCompany} onChange={(e) => setShipCompany(e.target.value)} />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="shipAddress1">Street address {req}</Label>
                        <Input
                          id="shipAddress1"
                          placeholder="House number and street name"
                          value={shipAddress1}
                          onChange={(e) => setShipAddress1(e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="shipAddress2" className="text-muted-foreground">
                          Apartment, suite, unit, etc. (optional)
                        </Label>
                        <Input id="shipAddress2" value={shipAddress2} onChange={(e) => setShipAddress2(e.target.value)} />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="shipSuburb">Suburb {req}</Label>
                        <Input id="shipSuburb" value={shipSuburb} onChange={(e) => setShipSuburb(e.target.value)} />
                      </div>
                      <div className="grid sm:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label>State {req}</Label>
                          <Select value={shipState} onValueChange={setShipState}>
                            <SelectTrigger>
                              <SelectValue placeholder="Select state" />
                            </SelectTrigger>
                            <SelectContent>
                              {AU_STATES.map((s) => (
                                <SelectItem key={s.value} value={s.value}>
                                  {s.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="shipPostcode">Postcode {req}</Label>
                          <Input
                            id="shipPostcode"
                            inputMode="numeric"
                            maxLength={4}
                            value={shipPostcode}
                            onChange={(e) => setShipPostcode(e.target.value.replace(/\D/g, "").slice(0, 4))}
                          />
                        </div>
                      </div>
                    </div>
                  ) : null}

                  <div className="mt-6 space-y-2">
                    <Label htmlFor="orderNotes">Order notes (optional)</Label>
                    <Textarea
                      id="orderNotes"
                      placeholder="Notes about your order, e.g. special notes for delivery."
                      rows={4}
                      value={orderNotes}
                      onChange={(e) => setOrderNotes(e.target.value)}
                      className="resize-y min-h-[100px]"
                    />
                  </div>
                </section>

                <section>
                  <h2 className="text-lg font-semibold text-indigo-950 mb-3">2. Cash on delivery</h2>
                  <p className="text-sm text-muted-foreground mb-4">
                    Pay with cash when your order is delivered. No card or bank details are collected on this website.
                  </p>
                  <ul className="text-sm text-muted-foreground space-y-1 list-disc pl-5">
                    <li>Our team may contact you by phone or email to confirm delivery details.</li>
                    <li>Please have the exact amount ready where possible.</li>
                  </ul>
                </section>

                {submitError ? (
                  <p className="text-sm text-destructive" role="alert">
                    {submitError}
                  </p>
                ) : null}

                <Button type="submit" size="lg" className="w-full sm:w-auto min-w-[200px]">
                  Place order
                </Button>
              </div>

              <aside className="lg:sticky lg:top-[calc(6rem+env(safe-area-inset-top))] rounded-xl border border-border bg-muted/50 p-6 space-y-4">
                <h2 className="text-lg font-semibold text-foreground border-b border-border pb-3">Your order</h2>
                <div className="text-xs font-medium text-muted-foreground grid grid-cols-[1fr_auto] gap-2 pb-2">
                  <span>Product</span>
                  <span className="text-right">Subtotal</span>
                </div>
                <ul className="space-y-4 text-sm">
                  {lines.map((line) => {
                    const lineTotal = line.price * line.qty;
                    return (
                      <li key={line.slug} className="grid grid-cols-[1fr_auto] gap-3 items-start">
                        <div className="flex gap-3 min-w-0">
                          <button
                            type="button"
                            className="text-muted-foreground hover:text-destructive text-lg leading-none px-0.5"
                            aria-label={`Remove ${line.name}`}
                            onClick={() => removeLine(line.slug)}
                          >
                            ×
                          </button>
                          <div className="h-14 w-14 shrink-0 overflow-hidden rounded-md bg-background border">
                            <img src={line.image} alt="" className="h-full w-full object-cover" />
                          </div>
                          <div className="min-w-0">
                            <p className="font-medium text-foreground leading-snug text-[13px] sm:text-sm">
                              {line.name} × {line.qty}
                            </p>
                          </div>
                        </div>
                        <span className="font-semibold text-indigo-900 tabular-nums text-right whitespace-nowrap">
                          {formatAud(lineTotal)}
                        </span>
                      </li>
                    );
                  })}
                </ul>
                <div className="border-t border-border pt-3 space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span className="font-bold text-indigo-900 tabular-nums">{formatAud(subtotal)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Shipment</span>
                    <span>Free shipping</span>
                  </div>
                  <div className="flex justify-between items-baseline pt-2 text-base">
                    <span className="font-semibold">Total</span>
                    <span className="text-xl font-bold text-indigo-900 tabular-nums">{formatAud(subtotal)}</span>
                  </div>
                </div>
              </aside>
            </form>
          </>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default CheckoutPage;
