import { useCallback, useEffect, useMemo, useState } from "react";
import { CheckCircle2, Loader2, RefreshCw, Sparkles, Trash2, X } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { StarRating } from "@/components/reviews/StarRating";
import { getAdminKey } from "@/lib/orders-api";
import { getProductBySlug } from "@/data/products";
import {
  deleteReviewOnBackend,
  fetchAdminReviews,
  moderateReview,
  seedReviewsOnBackend,
  type AdminReview,
  type ReviewStatus,
} from "@/lib/reviews-api";

function apiErrorMessage(error: unknown, fallback: string): string {
  if (!(error instanceof Error)) return fallback;
  if (error.message === "Unauthorized") return "管理员密钥无效，请重新登录。";
  if (error.message.startsWith("Request failed")) return fallback;
  return error.message;
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

const statusLabel: Record<ReviewStatus, string> = {
  pending: "待审核",
  approved: "已通过",
  rejected: "已拒绝",
};

export const AdminReviews = () => {
  const [reviews, setReviews] = useState<AdminReview[]>([]);
  const [loading, setLoading] = useState(false);
  const [seeding, setSeeding] = useState(false);
  const [filter, setFilter] = useState<ReviewStatus | "all">("all");

  const refresh = useCallback(async () => {
    if (!getAdminKey()) return;
    setLoading(true);
    try {
      const data = await fetchAdminReviews(getAdminKey());
      setReviews(data.reviews);
    } catch (error) {
      toast.error(apiErrorMessage(error, "无法加载评论。"));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void refresh();
  }, [refresh]);

  const counts = useMemo(() => {
    return {
      all: reviews.length,
      pending: reviews.filter((r) => r.status === "pending").length,
      approved: reviews.filter((r) => r.status === "approved").length,
      rejected: reviews.filter((r) => r.status === "rejected").length,
    };
  }, [reviews]);

  const filtered = useMemo(() => {
    const list = filter === "all" ? reviews : reviews.filter((r) => r.status === filter);
    return [...list].sort((a, b) => {
      const order = { pending: 0, approved: 1, rejected: 2 };
      if (order[a.status] !== order[b.status]) return order[a.status] - order[b.status];
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });
  }, [reviews, filter]);

  const setStatus = async (id: string, status: ReviewStatus) => {
    try {
      await moderateReview(getAdminKey(), id, status);
      setReviews((prev) => prev.map((r) => (r.id === id ? { ...r, status } : r)));
      toast.success(`已设为${statusLabel[status]}。`);
    } catch (error) {
      toast.error(apiErrorMessage(error, "无法更新评论。"));
    }
  };

  const remove = async (id: string) => {
    try {
      await deleteReviewOnBackend(getAdminKey(), id);
      setReviews((prev) => prev.filter((r) => r.id !== id));
      toast.success("已删除评论。");
    } catch (error) {
      toast.error(apiErrorMessage(error, "无法删除评论。"));
    }
  };

  const seed = async () => {
    setSeeding(true);
    try {
      const added = await seedReviewsOnBackend(getAdminKey());
      if (added > 0) {
        toast.success(`已生成 ${added} 条初始好评。`);
        await refresh();
      } else {
        toast.info("初始好评已存在，未重复生成。");
      }
    } catch (error) {
      toast.error(apiErrorMessage(error, "无法生成初始好评。"));
    } finally {
      setSeeding(false);
    }
  };

  const tabs: { key: ReviewStatus | "all"; label: string; count: number }[] = [
    { key: "all", label: "全部", count: counts.all },
    { key: "pending", label: "待审核", count: counts.pending },
    { key: "approved", label: "已通过", count: counts.approved },
    { key: "rejected", label: "已拒绝", count: counts.rejected },
  ];

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-5">
        <div className="flex flex-wrap gap-2">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              type="button"
              onClick={() => setFilter(tab.key)}
              className={`rounded-full border px-3 py-1.5 text-sm transition-colors ${
                filter === tab.key
                  ? "border-primary bg-primary/10 text-primary font-semibold"
                  : "border-border text-muted-foreground hover:text-foreground"
              }`}
            >
              {tab.label} ({tab.count})
            </button>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <Button type="button" variant="outline" onClick={() => void seed()} disabled={seeding}>
            <Sparkles className={`h-4 w-4 mr-2 ${seeding ? "animate-pulse" : ""}`} />
            生成初始好评
          </Button>
          <Button type="button" variant="outline" onClick={() => void refresh()} disabled={loading}>
            <RefreshCw className={`h-4 w-4 mr-2 ${loading ? "animate-spin" : ""}`} />
            刷新
          </Button>
        </div>
      </div>

      {loading && reviews.length === 0 ? (
        <div className="rounded-xl border border-border bg-card p-8 text-center text-muted-foreground">
          <Loader2 className="h-5 w-5 animate-spin inline-block mr-2" />
          加载评论中…
        </div>
      ) : filtered.length === 0 ? (
        <div className="rounded-xl border border-border bg-card p-8 text-center">
          <p className="text-muted-foreground">暂无评论。可点击“生成初始好评”铺一批 5 星评论。</p>
        </div>
      ) : (
        <div className="space-y-4">
          {filtered.map((review) => {
            const product = getProductBySlug(review.productSlug);
            return (
              <article key={review.id} className="rounded-2xl border border-border bg-card p-5">
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <StarRating value={review.rating} size="sm" />
                      <span className="text-sm font-semibold">{review.author}</span>
                      <span
                        className={`rounded-full px-2 py-0.5 text-xs font-medium ${
                          review.status === "approved"
                            ? "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400"
                            : review.status === "pending"
                              ? "bg-amber-500/15 text-amber-700 dark:text-amber-300"
                              : "bg-rose-500/15 text-rose-600 dark:text-rose-400"
                        }`}
                      >
                        {statusLabel[review.status]}
                      </span>
                      {review.seeded ? (
                        <span className="rounded-full bg-primary/10 text-primary px-2 py-0.5 text-xs">初始</span>
                      ) : null}
                    </div>
                    <p className="mt-1 text-xs text-muted-foreground">
                      {product ? product.name : review.productSlug} · {formatDateTime(review.createdAt)}
                    </p>
                    {review.title ? <h3 className="mt-2 text-sm font-semibold">{review.title}</h3> : null}
                    <p className="mt-1 text-sm text-muted-foreground leading-relaxed">{review.body}</p>
                  </div>
                  <div className="flex items-center gap-2 flex-wrap shrink-0">
                    {review.status !== "approved" ? (
                      <Button type="button" size="sm" onClick={() => void setStatus(review.id, "approved")}>
                        <CheckCircle2 className="h-4 w-4 mr-1" />
                        通过
                      </Button>
                    ) : null}
                    {review.status !== "rejected" ? (
                      <Button type="button" size="sm" variant="outline" onClick={() => void setStatus(review.id, "rejected")}>
                        <X className="h-4 w-4 mr-1" />
                        拒绝
                      </Button>
                    ) : null}
                    <Button
                      type="button"
                      size="sm"
                      variant="outline"
                      className="text-rose-600 hover:text-rose-700"
                      onClick={() => void remove(review.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      )}
    </div>
  );
};
