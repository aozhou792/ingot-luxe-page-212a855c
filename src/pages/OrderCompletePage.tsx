import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Check, Copy, ImagePlus, X } from "lucide-react";
import { toast } from "sonner";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Seo } from "@/components/Seo";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { formatAud } from "@/lib/format";
import { SHIPPING_LABEL, BANK_TRANSFER } from "@/lib/checkout";
import {
  formatOrderReference,
  readReceiptFile,
  cacheOrderLocally,
  RECEIPT_ACCEPT,
} from "@/lib/orders";
import { trackPlaceOrder, trackPurchase } from "@/lib/analytics";
import { submitOrderToBackend } from "@/lib/orders-api";
import { AU_STATES } from "@/data/australia";
import type { OrderAddress, OrderDetails } from "@/types/navigation";

const stateLabel = (value: string) => AU_STATES.find((s) => s.value === value)?.label ?? value;

const AddressBlock = ({ title, address }: { title: string; address: OrderAddress }) => (
  <div>
    <h3 className="text-base font-semibold text-foreground mb-2">{title}</h3>
    <address className="not-italic text-sm text-muted-foreground leading-relaxed">
      {address.firstName} {address.lastName}
      <br />
      {address.street}
      {address.apartment ? (
        <>
          <br />
          {address.apartment}
        </>
      ) : null}
      <br />
      {address.suburb}, {stateLabel(address.state)} {address.postcode}
      <br />
      {address.country}
      {address.phone ? (
        <>
          <br />
          {address.phone}
        </>
      ) : null}
      <br />
      {address.email}
    </address>
  </div>
);

const CopyValue = ({ value }: { value: string }) => {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      /* clipboard unavailable */
    }
  };
  return (
    <span className="inline-flex items-center gap-2">
      <span className="font-medium text-foreground tabular-nums">{value}</span>
      <button
        type="button"
        onClick={copy}
        aria-label="Copy"
        className="text-muted-foreground hover:text-primary transition-colors"
      >
        {copied ? <Check className="h-3.5 w-3.5 text-emerald-500" /> : <Copy className="h-3.5 w-3.5" />}
      </button>
    </span>
  );
};

const OrderCompletePage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const order = (location.state as OrderDetails | null) ?? null;
  const [payOpen, setPayOpen] = useState(false);
  const [receipt, setReceipt] = useState<{ dataUrl: string; name: string } | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [paymentDone, setPaymentDone] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useLayoutEffect(() => {
    const root = document.documentElement;
    const prevBehavior = root.style.scrollBehavior;
    root.style.scrollBehavior = "auto";
    root.scrollTop = 0;
    document.body.scrollTop = 0;
    window.scrollTo(0, 0);
    root.style.scrollBehavior = prevBehavior;
  }, [order?.orderNumber]);

  useEffect(() => {
    if (!order) return;
    void trackPlaceOrder(order);
  }, [order]);

  if (!order) {
    return (
      <div className="min-h-screen bg-background">
        <Seo
          title="No Recent Order | Alibarbar Australia"
          description="No recent Alibarbar Australia order was found for this browser session."
          path="/order-complete"
          noindex
        />
        <Navbar />
        <main className="container pt-[calc(6rem+env(safe-area-inset-top))] pb-20 max-w-lg text-center">
          <div className="rounded-2xl border border-border bg-card p-8">
            <h1 className="text-2xl font-semibold text-foreground mb-3">No recent order</h1>
            <p className="text-muted-foreground mb-6">Place an order to see your confirmation here.</p>
            <Button asChild>
              <Link to="/#flavors">Browse flavours</Link>
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const reference = formatOrderReference(order.orderNumber);

  const handleReceiptPick = async (file: File | undefined) => {
    if (!file) return;
    try {
      const parsed = await readReceiptFile(file);
      setReceipt(parsed);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Could not upload image.");
    }
  };

  const clearReceipt = () => {
    setReceipt(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const confirmSent = async () => {
    if (!receipt) {
      toast.error("Please upload your payment screenshot first.");
      fileInputRef.current?.focus();
      return;
    }

    setSubmitting(true);
    try {
      const saved = await submitOrderToBackend(order, receipt);
      cacheOrderLocally(saved);
      trackPurchase(order);
      setPaymentDone(true);
      setPayOpen(false);
      toast.success("Payment receipt received.", {
        description: `We'll confirm transfer ${reference} shortly.`,
      });
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Could not save receipt.");
    } finally {
      setSubmitting(false);
    }
  };

  const handlePayOpenChange = (open: boolean) => {
    setPayOpen(open);
    if (!open && !paymentDone) clearReceipt();
  };

  const cancelOrder = () => {
    toast.message("Order cancelled");
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-background">
      <Seo
        title="Order Complete | Alibarbar Australia"
        description="Alibarbar Australia order confirmation and bank transfer receipt upload."
        path="/order-complete"
        noindex
      />
      <Navbar />
      <main className="container pt-[calc(5rem+env(safe-area-inset-top))] sm:pt-[calc(6rem+env(safe-area-inset-top))] pb-16 sm:pb-20 max-w-5xl">
        <nav className="text-sm text-muted-foreground mb-8" aria-label="Checkout steps">
          <Link to="/cart" className="hover:text-primary transition-colors">
            Shopping Cart
          </Link>
          <span className="mx-2">→</span>
          <Link to="/checkout" className="hover:text-primary transition-colors">
            Checkout Details
          </Link>
          <span className="mx-2">→</span>
          <span className="text-foreground font-medium underline underline-offset-4">Order Complete</span>
        </nav>

        <div className="grid lg:grid-cols-[1fr_320px] gap-8 lg:gap-10 items-start">
          <section>
            <h1 className="text-2xl font-semibold text-foreground mb-5">Order details</h1>

            <div className="rounded-2xl border border-border overflow-hidden">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-muted/60 text-xs uppercase tracking-wider text-muted-foreground">
                    <th className="text-left font-medium px-4 py-3">Product</th>
                    <th className="text-right font-medium px-4 py-3">Total</th>
                  </tr>
                </thead>
                <tbody>
                  {order.lines.map((line) => (
                    <tr key={line.slug} className="border-t border-border">
                      <td className="px-4 py-3 text-foreground break-words">
                        {line.name} <span className="text-muted-foreground">× {line.qty}</span>
                      </td>
                      <td className="px-4 py-3 text-right tabular-nums whitespace-nowrap">
                        {formatAud(line.price * line.qty)}
                      </td>
                    </tr>
                  ))}
                  <tr className="border-t border-border">
                    <td className="px-4 py-3 text-muted-foreground">Subtotal</td>
                    <td className="px-4 py-3 text-right tabular-nums">{formatAud(order.subtotal)}</td>
                  </tr>
                  <tr className="border-t border-border">
                    <td className="px-4 py-3 text-muted-foreground">Shipping</td>
                    <td className="px-4 py-3 text-right tabular-nums whitespace-nowrap">
                      {formatAud(order.shipping)} via {SHIPPING_LABEL}
                    </td>
                  </tr>
                  {order.discountAmount && order.discountAmount > 0 ? (
                    <tr className="border-t border-border">
                      <td className="px-4 py-3 text-emerald-500">
                        Discount{order.discountCode ? ` (${order.discountCode})` : ""}
                      </td>
                      <td className="px-4 py-3 text-right tabular-nums text-emerald-500 whitespace-nowrap">
                        −{formatAud(order.discountAmount)}
                      </td>
                    </tr>
                  ) : null}
                  <tr className="border-t border-border">
                    <td className="px-4 py-3 font-semibold text-foreground">Total</td>
                    <td className="px-4 py-3 text-right font-bold text-foreground tabular-nums">
                      {formatAud(order.total)}
                    </td>
                  </tr>
                  <tr className="border-t border-border">
                    <td className="px-4 py-3 text-muted-foreground align-middle">Payment method</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-end gap-3">
                        <span className="text-foreground">{order.paymentMethod}</span>
                        <Button size="sm" onClick={() => setPayOpen(true)} disabled={paymentDone}>
                          {paymentDone ? "Paid" : "Pay now"}
                        </Button>
                      </div>
                    </td>
                  </tr>
                  <tr className="border-t border-border">
                    <td className="px-4 py-3 text-muted-foreground align-middle">Actions</td>
                    <td className="px-4 py-3">
                      <div className="flex justify-end">
                        <Button size="sm" variant="outline" onClick={cancelOrder}>
                          Cancel
                        </Button>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="mt-8 grid sm:grid-cols-2 gap-8">
              <AddressBlock title="Billing address" address={order.billing} />
              {order.shipToDifferent ? <AddressBlock title="Shipping address" address={order.billing} /> : null}
            </div>
          </section>

          <aside className="rounded-2xl border border-emerald-500/30 bg-emerald-500/10 p-6">
            <p className="text-emerald-600 dark:text-emerald-400 font-medium mb-4">
              Thank you. Your order has been received.
            </p>
            <ul className="space-y-2 text-sm text-foreground">
              <li>
                <span className="text-muted-foreground">Order number:</span> {reference}
              </li>
              <li>
                <span className="text-muted-foreground">Date:</span> {order.date}
              </li>
              <li>
                <span className="text-muted-foreground">Total:</span> {formatAud(order.total)}
              </li>
              <li>
                <span className="text-muted-foreground">Payment method:</span> {order.paymentMethod}
              </li>
              {paymentDone ? (
                <li className="text-emerald-600 dark:text-emerald-400">
                  Payment receipt submitted — awaiting confirmation.
                </li>
              ) : null}
            </ul>
          </aside>
        </div>
      </main>
      <Footer />

      <Dialog open={payOpen} onOpenChange={handlePayOpenChange}>
        <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-center uppercase tracking-wide">Pay with bank transfer</DialogTitle>
            <DialogDescription className="text-center">
              Transfer <span className="font-semibold text-foreground">{formatAud(order.total)}</span> to the bank
              account details below.
            </DialogDescription>
          </DialogHeader>

          <dl className="divide-y divide-border rounded-lg border border-border">
            <div className="flex items-center justify-between gap-4 px-4 py-2.5 text-sm">
              <dt className="text-muted-foreground">Account Name</dt>
              <dd className="font-medium text-foreground text-right">{BANK_TRANSFER.accountName}</dd>
            </div>
            <div className="flex items-center justify-between gap-4 px-4 py-2.5 text-sm">
              <dt className="text-muted-foreground">BSB</dt>
              <dd>
                <CopyValue value={BANK_TRANSFER.bsb} />
              </dd>
            </div>
            <div className="flex items-center justify-between gap-4 px-4 py-2.5 text-sm">
              <dt className="text-muted-foreground">Account Number</dt>
              <dd>
                <CopyValue value={BANK_TRANSFER.accountNumber} />
              </dd>
            </div>
            <div className="flex items-center justify-between gap-4 px-4 py-2.5 text-sm">
              <dt className="text-muted-foreground">Swift/BIC</dt>
              <dd>
                <CopyValue value={BANK_TRANSFER.swift} />
              </dd>
            </div>
            <div className="flex items-start justify-between gap-4 px-4 py-2.5 text-sm">
              <dt className="text-muted-foreground shrink-0">Bank</dt>
              <dd className="font-medium text-foreground text-right">
                {BANK_TRANSFER.bankName}
                <br />
                <span className="font-normal text-muted-foreground">{BANK_TRANSFER.bankAddress}</span>
              </dd>
            </div>
            <div className="flex items-center justify-between gap-4 px-4 py-2.5 text-sm">
              <dt className="text-muted-foreground">Total Amount</dt>
              <dd className="font-semibold text-foreground tabular-nums">{formatAud(order.total)}</dd>
            </div>
            <div className="flex items-center justify-between gap-4 px-4 py-2.5 text-sm">
              <dt className="text-muted-foreground">Reference</dt>
              <dd>
                <CopyValue value={reference} />
              </dd>
            </div>
          </dl>

          <p className="text-xs text-muted-foreground text-center">
            Please include the reference <span className="font-medium text-foreground">{reference}</span> in your
            transfer so we can match your payment. Your order ships once the transfer is confirmed.
          </p>

          <div className="space-y-3">
            <p className="text-sm font-medium text-foreground">Upload payment screenshot</p>
            <input
              ref={fileInputRef}
              type="file"
              accept={RECEIPT_ACCEPT}
              className="sr-only"
              onChange={(e) => {
                void handleReceiptPick(e.target.files?.[0]);
                e.target.value = "";
              }}
            />
            {receipt ? (
              <div className="relative rounded-lg border border-border overflow-hidden bg-muted/30">
                <img src={receipt.dataUrl} alt="Payment receipt preview" className="w-full max-h-48 object-contain bg-black/20" />
                <div className="flex items-center justify-between gap-2 px-3 py-2 text-xs text-muted-foreground border-t border-border">
                  <span className="truncate">{receipt.name}</span>
                  <button
                    type="button"
                    onClick={clearReceipt}
                    className="inline-flex items-center gap-1 text-foreground hover:text-destructive transition-colors shrink-0"
                  >
                    <X className="h-3.5 w-3.5" />
                    Remove
                  </button>
                </div>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="w-full rounded-lg border border-dashed border-border bg-muted/20 px-4 py-8 text-center hover:border-primary/50 hover:bg-muted/40 transition-colors"
              >
                <ImagePlus className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                <p className="text-sm font-medium text-foreground">Tap to upload receipt</p>
                <p className="text-xs text-muted-foreground mt-1">JPG, PNG or WebP · max 5 MB</p>
              </button>
            )}
          </div>

          {!paymentDone ? (
            <p className="text-center text-xs text-muted-foreground">Waiting for your transfer…</p>
          ) : null}

          <Button className="w-full" onClick={() => void confirmSent()} disabled={submitting || !receipt}>
            {submitting ? "Submitting…" : "I have sent the money"}
          </Button>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default OrderCompletePage;
