import { useCallback, useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { CheckCircle2, Clock3, Download, Loader2, RefreshCw, ZoomIn } from "lucide-react";
import { toast } from "sonner";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Seo } from "@/components/Seo";
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

function formatDateTime(value: string): string {
  return new Date(value).toLocaleString("zh-CN", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function apiErrorMessage(error: unknown, fallback: string): string {
  if (!(error instanceof Error)) return fallback;
  const msg = error.message;
  if (msg === "Unauthorized") return "管理员密钥无效，请重新登录。";
  if (msg.startsWith("Request failed")) return fallback;
  return msg;
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
    {status === "confirmed" ? "已确认" : "待确认"}
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
          if (!cancelled) setError("尚未上传付款截图。");
          return;
        }
        objectUrl = await fetchReceiptBlobUrl(order.orderNumber);
        if (!cancelled) setSrc(objectUrl);
      } catch (err) {
        if (!cancelled) setError(apiErrorMessage(err, "无法加载付款截图。"));
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
        加载截图中…
      </div>
    );
  }

  if (error || !src) {
    return <p className="text-sm text-muted-foreground">{error ?? "尚未上传付款截图。"}</p>;
  }

  return (
    <div className="space-y-3">
      <button
        type="button"
        onClick={() => setLightboxOpen(true)}
        className="group relative block w-full rounded-lg border border-border bg-black/20 overflow-hidden focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
        aria-label="查看完整付款截图"
      >
        <img
          src={src}
          alt={`${formatOrderReference(order.orderNumber)} 付款截图`}
          className="w-full max-h-56 object-contain"
        />
        <span className="absolute inset-0 flex items-center justify-center bg-black/0 group-hover:bg-black/35 transition-colors">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-background/90 px-3 py-1.5 text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity">
            <ZoomIn className="h-3.5 w-3.5" />
            点击放大
          </span>
        </span>
      </button>
      <p className="text-xs text-muted-foreground break-words">{order.paymentReceiptName ?? "付款截图"}</p>
      {order.paymentSubmittedAt ? (
        <p className="text-xs text-muted-foreground">提交时间：{formatDateTime(order.paymentSubmittedAt)}</p>
      ) : null}

      <Dialog open={lightboxOpen} onOpenChange={setLightboxOpen}>
        <DialogContent className="max-w-[min(96vw,1200px)] w-full p-3 sm:p-4 gap-3">
          <DialogHeader className="sr-only">
            <DialogTitle>{formatOrderReference(order.orderNumber)} 付款截图</DialogTitle>
            <DialogDescription>付款截图大图</DialogDescription>
          </DialogHeader>
          <img
            src={src}
            alt={`${formatOrderReference(order.orderNumber)} 付款截图大图`}
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
      toast.error(apiErrorMessage(error, "无法加载订单。"));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (authed) void refresh();
  }, [authed, refresh]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    const list = q
      ? orders.filter((order) => {
          const ref = formatOrderReference(order.orderNumber).toLowerCase();
          const customer = `${order.billing.firstName} ${order.billing.lastName}`.toLowerCase();
          return (
            ref.includes(q) ||
            customer.includes(q) ||
            order.billing.email.toLowerCase().includes(q) ||
            order.orderNumber.includes(q)
          );
        })
      : orders;

    return [...list].sort((a, b) => {
      const aPending = statusOf(a) === "pending" ? 0 : 1;
      const bPending = statusOf(b) === "pending" ? 0 : 1;
      if (aPending !== bPending) return aPending - bPending;
      return Number.parseInt(b.orderNumber, 10) - Number.parseInt(a.orderNumber, 10);
    });
  }, [orders, query]);

  const pendingCount = filtered.filter((o) => statusOf(o) === "pending").length;
  const confirmedCount = filtered.length - pendingCount;

  const login = () => {
    if (!adminKeyInput.trim()) {
      toast.error("请输入管理员密钥。");
      return;
    }
    setAdminKey(adminKeyInput.trim());
    setAuthed(true);
    toast.success("登录成功。");
  };

  const logout = () => {
    clearAdminKey();
    setAuthed(false);
    setOrders([]);
  };

  const setStatus = async (order: StoredOrder, status: PaymentStatus) => {
    try {
      const updated = await updateOrderStatusOnBackend(order.orderNumber, status);
      setOrders((prev) => prev.map((o) => (o.orderNumber === updated.orderNumber ? updated : o)));
      toast.success(
        status === "confirmed"
          ? `${formatOrderReference(order.orderNumber)} 已标记为已确认。`
          : `${formatOrderReference(order.orderNumber)} 已改为待确认。`,
      );
    } catch (error) {
      await refresh();
      toast.error(apiErrorMessage(error, "无法更新订单状态。"));
    }
  };

  const exportExcel = () => {
    if (filtered.length === 0) {
      toast.error("没有可导出的订单。");
      return;
    }
    try {
      exportOrdersToExcel(filtered);
      toast.success(`已导出 ${filtered.length} 笔订单。`);
    } catch (error) {
      toast.error(apiErrorMessage(error, "无法导出 Excel 文件。"));
    }
  };

  if (!authed) {
    return (
      <div className="min-h-screen bg-background">
        <Seo
          title="Orders Admin | Alibarbar Australia"
          description="Private Alibarbar Australia order management."
          path="/orders2589"
          noindex
        />
        <Navbar />
        <main className="container pt-[calc(6rem+env(safe-area-inset-top))] pb-20 max-w-md">
          <div className="rounded-2xl border border-border bg-card p-8 space-y-4">
            <h1 className="text-2xl font-semibold">订单管理后台</h1>
            <p className="text-sm text-muted-foreground">输入管理员密钥，查看云端订单与付款截图。</p>
            <Input
              type="password"
              value={adminKeyInput}
              onChange={(e) => setAdminKeyInput(e.target.value)}
              placeholder="管理员 API 密钥"
              onKeyDown={(e) => {
                if (e.key === "Enter") login();
              }}
            />
            <Button className="w-full" onClick={login}>
              登录
            </Button>
            <Button asChild variant="outline" className="w-full">
              <Link to="/">返回商店</Link>
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Seo
        title="Orders Admin | Alibarbar Australia"
        description="Private Alibarbar Australia order management."
        path="/orders2589"
        noindex
      />
      <Navbar />
      <main className="container pt-[calc(5rem+env(safe-area-inset-top))] sm:pt-[calc(6rem+env(safe-area-inset-top))] pb-16 sm:pb-20 max-w-6xl">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <div>
            <p className="text-xs uppercase tracking-[0.25em] text-primary mb-1">后台管理</p>
            <h1 className="text-2xl sm:text-3xl font-semibold text-foreground">订单管理</h1>
            <p className="text-sm text-muted-foreground mt-1">云端备份</p>
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            <Button type="button" variant="outline" onClick={exportExcel} disabled={filtered.length === 0}>
              <Download className="h-4 w-4 mr-2" />
              导出 Excel
            </Button>
            <Button type="button" variant="outline" onClick={() => void refresh()} disabled={loading}>
              <RefreshCw className={`h-4 w-4 mr-2 ${loading ? "animate-spin" : ""}`} />
              刷新
            </Button>
            <Button type="button" variant="outline" onClick={logout}>
              退出登录
            </Button>
            <Button asChild>
              <Link to="/">返回商店</Link>
            </Button>
          </div>
        </div>

        <div className="grid sm:grid-cols-3 gap-3 mb-6">
          <div className="rounded-xl border border-border bg-card p-4">
            <p className="text-xs text-muted-foreground">显示订单</p>
            <p className="text-2xl font-semibold">{filtered.length}</p>
          </div>
          <div className="rounded-xl border border-border bg-card p-4">
            <p className="text-xs text-muted-foreground">待确认付款</p>
            <p className="text-2xl font-semibold text-amber-600 dark:text-amber-400">{pendingCount}</p>
          </div>
          <div className="rounded-xl border border-border bg-card p-4">
            <p className="text-xs text-muted-foreground">已标记确认</p>
            <p className="text-2xl font-semibold text-emerald-600 dark:text-emerald-400">{confirmedCount}</p>
          </div>
        </div>

        <div className="rounded-xl border border-border bg-card p-4 mb-6">
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="搜索 VN 单号、客户姓名或邮箱"
          />
        </div>

        {loading && orders.length === 0 ? (
          <div className="rounded-xl border border-border bg-card p-8 text-center text-muted-foreground">
            <Loader2 className="h-5 w-5 animate-spin inline-block mr-2" />
            加载订单中…
          </div>
        ) : filtered.length === 0 ? (
          <div className="rounded-xl border border-border bg-card p-8 text-center">
            <p className="text-muted-foreground">暂无已提交付款截图的订单。</p>
          </div>
        ) : (
          <div className="space-y-5">
            {filtered.map((order) => {
              const status = statusOf(order);
              const isConfirmed = status === "confirmed";
              return (
                <article
                  key={order.orderNumber}
                  className={`rounded-2xl border p-5 sm:p-6 transition-colors ${
                    isConfirmed
                      ? "border-emerald-500/40 bg-emerald-500/[0.04] shadow-sm shadow-emerald-500/5"
                      : "border-border bg-card"
                  }`}
                >
                  {isConfirmed ? (
                    <div className="mb-4 flex items-center gap-2 rounded-lg border border-emerald-500/30 bg-emerald-500/10 px-3 py-2 text-sm font-medium text-emerald-700 dark:text-emerald-300">
                      <CheckCircle2 className="h-4 w-4 shrink-0" />
                      <span>此订单已标记确认</span>
                      {order.paymentConfirmedAt ? (
                        <span className="text-emerald-600/80 dark:text-emerald-400/80 font-normal">
                          · 确认时间 {formatDateTime(order.paymentConfirmedAt)}
                        </span>
                      ) : null}
                    </div>
                  ) : null}

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
                          标记已确认
                        </Button>
                      ) : (
                        <>
                          <span className="inline-flex items-center gap-1 rounded-md bg-emerald-600 px-3 py-1.5 text-xs font-semibold text-white">
                            <CheckCircle2 className="h-3.5 w-3.5" />
                            已标记
                          </span>
                          <Button
                            type="button"
                            size="sm"
                            variant="outline"
                            onClick={() => void setStatus(order, "pending")}
                          >
                            改为待确认
                          </Button>
                        </>
                      )}
                    </div>
                  </div>

                  <div className="mt-4 grid md:grid-cols-[1.2fr_1fr] gap-5">
                    <div className="rounded-xl border border-border bg-background/30 p-4">
                      <p className="text-xs uppercase tracking-wide text-muted-foreground mb-2">商品明细</p>
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
                          <span className="text-muted-foreground">小计</span>
                          <span className="tabular-nums">{formatAud(order.subtotal)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">运费</span>
                          <span className="tabular-nums">{formatAud(order.shipping)}</span>
                        </div>
                        <div className="flex justify-between font-semibold">
                          <span>合计</span>
                          <span className="tabular-nums">{formatAud(order.total)}</span>
                        </div>
                      </div>
                    </div>

                    <div className="rounded-xl border border-border bg-background/30 p-4">
                      <p className="text-xs uppercase tracking-wide text-muted-foreground mb-2">付款截图</p>
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
