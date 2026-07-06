import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { CheckCircle2, Clock3, RefreshCw } from "lucide-react";
import { toast } from "sonner";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { formatAud } from "@/lib/format";
import {
  formatOrderReference,
  getStoredOrders,
  updateOrderPaymentStatus,
  type PaymentStatus,
  type StoredOrder,
} from "@/lib/orders";

function statusOf(order: StoredOrder): PaymentStatus {
  return order.paymentStatus === "confirmed" ? "confirmed" : "pending";
}

const StatusPill = ({ status }: { status: PaymentStatus }) => (
  <span
    className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-medium ${
      status === "confirmed"
        ? "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30"
        : "bg-amber-500/15 text-amber-700 dark:text-amber-300 border border-amber-500/30"
    }`}
  >
    {status === "confirmed" ? <CheckCircle2 className="h-3.5 w-3.5" /> : <Clock3 className="h-3.5 w-3.5" />}
    {status === "confirmed" ? "Confirmed" : "Pending"}
  </span>
);

const AdminOrdersPage = () => {
  const [orders, setOrders] = useState<StoredOrder[]>([]);
  const [query, setQuery] = useState("");

  const refresh = () => {
    const data = getStoredOrders();
    const sorted = [...data].sort((a, b) => Number.parseInt(b.orderNumber, 10) - Number.parseInt(a.orderNumber, 10));
    setOrders(sorted);
  };

  useEffect(() => {
    refresh();
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return orders;
    return orders.filter((order) => {
      const ref = formatOrderReference(order.orderNumber).toLowerCase();
      const customer = `${order.billing.firstName} ${order.billing.lastName}`.toLowerCase();
      return (
        ref.includes(q) ||
        customer.includes(q) ||
        order.billing.email.toLowerCase().includes(q) ||
        order.orderNumber.includes(q)
      );
    });
  }, [orders, query]);

  const pendingCount = filtered.filter((o) => statusOf(o) === "pending").length;
  const confirmedCount = filtered.length - pendingCount;

  const setStatus = (order: StoredOrder, status: PaymentStatus) => {
    updateOrderPaymentStatus(order.orderNumber, status);
    refresh();
    toast.success(
      `${formatOrderReference(order.orderNumber)} marked ${status === "confirmed" ? "confirmed" : "pending"}.`,
    );
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container pt-[calc(5rem+env(safe-area-inset-top))] sm:pt-[calc(6rem+env(safe-area-inset-top))] pb-16 sm:pb-20 max-w-6xl">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <div>
            <p className="text-xs uppercase tracking-[0.25em] text-primary mb-1">Back Office</p>
            <h1 className="text-2xl sm:text-3xl font-semibold text-foreground">Orders Admin</h1>
          </div>
          <div className="flex items-center gap-2">
            <Button type="button" variant="outline" onClick={refresh}>
              <RefreshCw className="h-4 w-4 mr-2" />
              Refresh
            </Button>
            <Button asChild>
              <Link to="/">Back to store</Link>
            </Button>
          </div>
        </div>

        <div className="grid sm:grid-cols-3 gap-3 mb-6">
          <div className="rounded-xl border border-border bg-card p-4">
            <p className="text-xs text-muted-foreground">Visible orders</p>
            <p className="text-2xl font-semibold">{filtered.length}</p>
          </div>
          <div className="rounded-xl border border-border bg-card p-4">
            <p className="text-xs text-muted-foreground">Pending payment checks</p>
            <p className="text-2xl font-semibold text-amber-600 dark:text-amber-400">{pendingCount}</p>
          </div>
          <div className="rounded-xl border border-border bg-card p-4">
            <p className="text-xs text-muted-foreground">Confirmed payments</p>
            <p className="text-2xl font-semibold text-emerald-600 dark:text-emerald-400">{confirmedCount}</p>
          </div>
        </div>

        <div className="rounded-xl border border-border bg-card p-4 mb-6">
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by VN #, customer name, or email"
          />
        </div>

        {filtered.length === 0 ? (
          <div className="rounded-xl border border-border bg-card p-8 text-center">
            <p className="text-muted-foreground">No submitted receipt orders yet.</p>
          </div>
        ) : (
          <div className="space-y-5">
            {filtered.map((order) => {
              const status = statusOf(order);
              return (
                <article key={order.orderNumber} className="rounded-2xl border border-border bg-card p-5 sm:p-6">
                  <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                    <div>
                      <p className="text-lg font-semibold text-foreground">{formatOrderReference(order.orderNumber)}</p>
                      <p className="text-sm text-muted-foreground">
                        {order.date} · {order.billing.firstName} {order.billing.lastName} · {order.billing.email}
                      </p>
                    </div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <StatusPill status={status} />
                      {status === "pending" ? (
                        <Button type="button" size="sm" onClick={() => setStatus(order, "confirmed")}>
                          Mark confirmed
                        </Button>
                      ) : (
                        <Button type="button" size="sm" variant="outline" onClick={() => setStatus(order, "pending")}>
                          Set pending
                        </Button>
                      )}
                    </div>
                  </div>

                  <div className="mt-4 grid md:grid-cols-[1.2fr_1fr] gap-5">
                    <div className="rounded-xl border border-border bg-background/30 p-4">
                      <p className="text-xs uppercase tracking-wide text-muted-foreground mb-2">Items</p>
                      <ul className="space-y-1.5 text-sm">
                        {order.lines.map((line) => (
                          <li key={line.slug} className="flex items-center justify-between gap-4">
                            <span>
                              {line.name} <span className="text-muted-foreground">× {line.qty}</span>
                            </span>
                            <span className="tabular-nums">{formatAud(line.price * line.qty)}</span>
                          </li>
                        ))}
                      </ul>
                      <div className="mt-3 border-t border-border pt-3 text-sm space-y-1.5">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Subtotal</span>
                          <span className="tabular-nums">{formatAud(order.subtotal)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Shipping</span>
                          <span className="tabular-nums">{formatAud(order.shipping)}</span>
                        </div>
                        <div className="flex justify-between font-semibold">
                          <span>Total</span>
                          <span className="tabular-nums">{formatAud(order.total)}</span>
                        </div>
                      </div>
                    </div>

                    <div className="rounded-xl border border-border bg-background/30 p-4">
                      <p className="text-xs uppercase tracking-wide text-muted-foreground mb-2">Payment Receipt</p>
                      {order.paymentReceipt ? (
                        <div className="space-y-3">
                          <img
                            src={order.paymentReceipt}
                            alt={`${formatOrderReference(order.orderNumber)} receipt`}
                            className="w-full max-h-56 object-contain rounded-lg border border-border bg-black/20"
                          />
                          <p className="text-xs text-muted-foreground break-words">{order.paymentReceiptName ?? "receipt"}</p>
                          {order.paymentSubmittedAt ? (
                            <p className="text-xs text-muted-foreground">
                              Submitted: {new Date(order.paymentSubmittedAt).toLocaleString()}
                            </p>
                          ) : null}
                          <Button asChild variant="outline" size="sm" className="w-full">
                            <a href={order.paymentReceipt} target="_blank" rel="noreferrer">
                              Open full image
                            </a>
                          </Button>
                        </div>
                      ) : (
                        <p className="text-sm text-muted-foreground">No screenshot uploaded.</p>
                      )}
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default AdminOrdersPage;
