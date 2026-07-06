import { useCallback, useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { CheckCircle2, Clock3, Download, Loader2, RefreshCw, ZoomIn } from "lucide-react";
import { toast } from "sonner";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { formatAud } from "@/lib/format";
import { formatOrderReference, type PaymentStatus, type StoredOrder } from "@/lib/orders";
import {
  clearAdminKey,
  fetchOrdersFromBackend,
  fetchReceiptBlobUrl,
  getAdminKey,
  setAdminKey,
  updateOrderStatusOnBackend,
} from "@/lib/orders-api";
import { exportOrdersToExcel } from "@/lib/export-orders-excel";

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

const ReceiptImage = ({ order }: { order: StoredOrder }) => {
  const [src, setSrc] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  useEffect(() => {
    let objectUrl: string | null = null;
    let cancelled = false;

    const load = async () => {
      setLoading(true);
      setError(null);
      try {
        if (order.paymentReceipt?.startsWith("data:")) {
          if (!cancelled) setSrc(order.paymentReceipt);
          return;
        }
        if (!order.paymentReceipt) {
          if (!cancelled) setError("No screenshot uploaded.");
          return;
        }
        objectUrl = await fetchReceiptBlobUrl(order.orderNumber);
        if (!cancelled) setSrc(objectUrl);
      } catch (err) {
        if (!cancelled) setError(err instanceof Error ? err.message : "Could not load receipt.");
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    void load();
    return () => {
      cancelled = true;
      if (objectUrl) URL.revokeObjectURL(objectUrl);
    };
  }, [order.orderNumber, order.paymentReceipt]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-40 text-muted-foreground text-sm">
        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
        Loading receipt…
      </div>
    );
  }

  if (error || !src) {
    return <p className="text-sm text-muted-foreground">{error ?? "No screenshot uploaded."}</p>;
  }

  return (
    <div className="space-y-3">
      <button
        type="button"
        onClick={() => setLightboxOpen(true)}
        className="group relative block w-full rounded-lg border border-border bg-black/20 overflow-hidden focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
        aria-label="View full receipt image"
      >
        <img
          src={src}
          alt={`${formatOrderReference(order.orderNumber)} receipt`}
          className="w-full max-h-56 object-contain"
        />
        <span className="absolute inset-0 flex items-center justify-center bg-black/0 group-hover:bg-black/35 transition-colors">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-background/90 px-3 py-1.5 text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity">
            <ZoomIn className="h-3.5 w-3.5" />
            點擊放大
          </span>
        </span>
      </button>
      <p className="text-xs text-muted-foreground break-words">{order.paymentReceiptName ?? "receipt"}</p>
      {order.paymentSubmittedAt ? (
        <p className="text-xs text-muted-foreground">Submitted: {new Date(order.paymentSubmittedAt).toLocaleString()}</p>
      ) : null}

      <Dialog open={lightboxOpen} onOpenChange={setLightboxOpen}>
        <DialogContent className="max-w-[min(96vw,1200px)] w-full p-3 sm:p-4 gap-3">
          <DialogHeader className="sr-only">
            <DialogTitle>{formatOrderReference(order.orderNumber)} receipt</DialogTitle>
            <DialogDescription>Full-size payment screenshot</DialogDescription>
          </DialogHeader>
          <img
            src={src}
            alt={`${formatOrderReference(order.orderNumber)} receipt full size`}
            className="w-full max-h-[85vh] object-contain rounded-md bg-black/20"
          />
        </DialogContent>
      </Dialog>
    </div>
  );
};

const AdminOrdersPage = () => {
  const [adminKeyInput, setAdminKeyInput] = useState("");
  const [authed, setAuthed] = useState(() => Boolean(getAdminKey()));
  const [orders, setOrders] = useState<StoredOrder[]>([]);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);

  const refresh = useCallback(async () => {
    if (!getAdminKey()) return;
    setLoading(true);
    try {
      const data = await fetchOrdersFromBackend();
      setOrders(data);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Could not load orders.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (authed) void refresh();
  }, [authed, refresh]);

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

  const login = () => {
    if (!adminKeyInput.trim()) {
      toast.error("Enter admin key.");
      return;
    }
    setAdminKey(adminKeyInput.trim());
    setAuthed(true);
    toast.success("Admin access granted.");
  };

  const logout = () => {
    clearAdminKey();
    setAuthed(false);
    setOrders([]);
  };

  const setStatus = async (order: StoredOrder, status: PaymentStatus) => {
    try {
      await updateOrderStatusOnBackend(order.orderNumber, status);
      await refresh();
      toast.success(
        `${formatOrderReference(order.orderNumber)} marked ${status === "confirmed" ? "confirmed" : "pending"}.`,
      );
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Could not update status.");
    }
  };

  const exportExcel = () => {
    if (filtered.length === 0) {
      toast.error("No orders to export.");
      return;
    }
    try {
      exportOrdersToExcel(filtered);
      toast.success(`Exported ${filtered.length} order(s) to Excel.`);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Could not export Excel file.");
    }
  };

  if (!authed) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="container pt-[calc(6rem+env(safe-area-inset-top))] pb-20 max-w-md">
          <div className="rounded-2xl border border-border bg-card p-8 space-y-4">
            <h1 className="text-2xl font-semibold">Orders Admin</h1>
            <p className="text-sm text-muted-foreground">Enter your admin key to view cloud-backed orders and receipts.</p>
            <Input
              type="password"
              value={adminKeyInput}
              onChange={(e) => setAdminKeyInput(e.target.value)}
              placeholder="Admin API key"
              onKeyDown={(e) => {
                if (e.key === "Enter") login();
              }}
            />
            <Button className="w-full" onClick={login}>
              Sign in
            </Button>
            <Button asChild variant="outline" className="w-full">
              <Link to="/">Back to store</Link>
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container pt-[calc(5rem+env(safe-area-inset-top))] sm:pt-[calc(6rem+env(safe-area-inset-top))] pb-16 sm:pb-20 max-w-6xl">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <div>
            <p className="text-xs uppercase tracking-[0.25em] text-primary mb-1">Back Office</p>
            <h1 className="text-2xl sm:text-3xl font-semibold text-foreground">Orders Admin</h1>
            <p className="text-sm text-muted-foreground mt-1">Cloud backup from Vercel Blob</p>
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            <Button type="button" variant="outline" onClick={exportExcel} disabled={filtered.length === 0}>
              <Download className="h-4 w-4 mr-2" />
              導出 Excel
            </Button>
            <Button type="button" variant="outline" onClick={() => void refresh()} disabled={loading}>
              <RefreshCw className={`h-4 w-4 mr-2 ${loading ? "animate-spin" : ""}`} />
              Refresh
            </Button>
            <Button type="button" variant="outline" onClick={logout}>
              Sign out
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

        {loading && orders.length === 0 ? (
          <div className="rounded-xl border border-border bg-card p-8 text-center text-muted-foreground">
            <Loader2 className="h-5 w-5 animate-spin inline-block mr-2" />
            Loading orders…
          </div>
        ) : filtered.length === 0 ? (
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
                        <Button type="button" size="sm" onClick={() => void setStatus(order, "confirmed")}>
                          Mark confirmed
                        </Button>
                      ) : (
                        <Button type="button" size="sm" variant="outline" onClick={() => void setStatus(order, "pending")}>
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
                      <ReceiptImage order={order} />
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
