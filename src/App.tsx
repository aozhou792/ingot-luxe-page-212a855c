import { lazy, Suspense, type ComponentType } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Analytics } from "@/components/Analytics";
import { RouteErrorBoundary } from "@/components/RouteErrorBoundary";
import { WhatsAppFloat } from "@/components/WhatsAppFloat";
import { AuthProvider } from "@/context/AuthContext";
import { CartProvider } from "@/context/CartContext";
import Index from "./pages/Index.tsx";
import NotFound from "./pages/NotFound.tsx";
import ProductPage from "./pages/ProductPage.tsx";
import CartPage from "./pages/CartPage.tsx";
import CheckoutPage from "./pages/CheckoutPage.tsx";
import OrderCompletePage from "./pages/OrderCompletePage.tsx";
import AdminOrdersPage from "./pages/AdminOrdersPage.tsx";
import WhatsAppQrPage from "./pages/WhatsAppQrPage.tsx";
import ResetPasswordPage from "./pages/ResetPasswordPage.tsx";
import SearchPage from "./pages/SearchPage.tsx";

/** Retry stale chunk URLs after a deploy so Suspense does not hang forever. */
function lazyWithRetry<T extends ComponentType<unknown>>(
  factory: () => Promise<{ default: T }>,
  retries = 2,
) {
  return lazy(async () => {
    let lastError: unknown;
    for (let attempt = 0; attempt <= retries; attempt++) {
      try {
        return await factory();
      } catch (error) {
        lastError = error;
        // Give the CDN/browser a beat, then retry (often fixes post-deploy hash mismatches).
        await new Promise((resolve) => setTimeout(resolve, 350 * (attempt + 1)));
      }
    }
    throw lastError;
  });
}

// Content/marketing routes are lazy-loaded to keep the initial bundle small.
const GuidesIndexPage = lazyWithRetry(() => import("./pages/GuidesIndexPage.tsx"));
const GuidePage = lazyWithRetry(() => import("./pages/GuidePage.tsx"));
const FaqPage = lazyWithRetry(() => import("./pages/FaqPage.tsx"));
const ContactPage = lazyWithRetry(() => import("./pages/ContactPage.tsx"));
const WholesalePage = lazyWithRetry(() => import("./pages/WholesalePage.tsx"));
const ContentPage = lazyWithRetry(() => import("./pages/ContentPage.tsx"));
const FlavoursIndexPage = lazyWithRetry(() => import("./pages/FlavoursIndexPage.tsx"));
const FlavourPage = lazyWithRetry(() => import("./pages/FlavourPage.tsx"));
const CompareIndexPage = lazyWithRetry(() => import("./pages/CompareIndexPage.tsx"));
const ComparePage = lazyWithRetry(() => import("./pages/ComparePage.tsx"));
const BrandsIndexPage = lazyWithRetry(() => import("./pages/BrandsIndexPage.tsx"));
const BrandPage = lazyWithRetry(() => import("./pages/BrandPage.tsx"));
const BlogIndexPage = lazyWithRetry(() => import("./pages/BlogIndexPage.tsx"));
const BlogPostPage = lazyWithRetry(() => import("./pages/BlogPostPage.tsx"));
const ReviewsIndexPage = lazyWithRetry(() => import("./pages/ReviewsIndexPage.tsx"));
const ReviewPage = lazyWithRetry(() => import("./pages/ReviewPage.tsx"));
const FaqTopicPage = lazyWithRetry(() => import("./pages/FaqTopicPage.tsx"));
const AuthorPage = lazyWithRetry(() => import("./pages/AuthorPage.tsx"));
const TopicsIndexPage = lazyWithRetry(() => import("./pages/TopicsIndexPage.tsx"));
const TopicPage = lazyWithRetry(() => import("./pages/TopicPage.tsx"));
const queryClient = new QueryClient();

const RouteFallback = () => (
  <div className="min-h-screen bg-background text-foreground flex items-center justify-center px-6" role="status">
    <div className="text-center space-y-3">
      <p className="text-xs uppercase tracking-[0.25em] text-primary font-semibold">Alibarbar</p>
      <p className="text-sm text-muted-foreground">Loading…</p>
    </div>
  </div>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Analytics />
        <AuthProvider>
          <CartProvider>
            <RouteErrorBoundary>
            <Suspense fallback={<RouteFallback />}>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/product/cool-mint" element={<Navigate to="/product/blackberry-ice" replace />} />
              <Route
                path="/product/chupa-strawberry"
                element={<Navigate to="/product/strawberry-coconut-watermelon" replace />}
              />
              <Route path="/product/:slug" element={<ProductPage />} />
              <Route path="/cart" element={<CartPage />} />
              <Route path="/checkout" element={<CheckoutPage />} />
              <Route path="/order-complete" element={<OrderCompletePage />} />
              <Route path="/orders2589" element={<AdminOrdersPage />} />
              <Route path="/whatsapp-qr" element={<WhatsAppQrPage />} />
              <Route path="/reset-password" element={<ResetPasswordPage />} />
              <Route path="/guides" element={<GuidesIndexPage />} />
              <Route path="/guides/:slug" element={<GuidePage />} />
              <Route path="/flavours" element={<FlavoursIndexPage />} />
              <Route path="/flavours/:slug" element={<FlavourPage />} />
              <Route path="/compare" element={<CompareIndexPage />} />
              <Route path="/compare/:slug" element={<ComparePage />} />
              <Route path="/brands" element={<BrandsIndexPage />} />
              <Route path="/brands/:slug" element={<BrandPage />} />
              <Route path="/blog" element={<BlogIndexPage />} />
              <Route path="/blog/:slug" element={<BlogPostPage />} />
              <Route path="/reviews" element={<ReviewsIndexPage />} />
              <Route path="/reviews/:slug" element={<ReviewPage />} />
              <Route path="/faq" element={<FaqPage />} />
              <Route path="/faq/:slug" element={<FaqTopicPage />} />
              <Route path="/topics" element={<TopicsIndexPage />} />
              <Route path="/topics/:slug" element={<TopicPage />} />
              <Route path="/author/:slug" element={<AuthorPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/wholesale" element={<WholesalePage />} />
              <Route path="/verify" element={<Navigate to="/" replace />} />
              <Route path="/search" element={<SearchPage />} />
              <Route path="/about" element={<ContentPage />} />
              <Route path="/shipping" element={<ContentPage />} />
              <Route path="/returns" element={<ContentPage />} />
              <Route path="/privacy" element={<ContentPage />} />
              <Route path="/terms" element={<ContentPage />} />
              <Route path="/why-trust-us" element={<ContentPage />} />
              <Route path="/editorial-policy" element={<ContentPage />} />
              <Route path="/age-verification" element={<ContentPage />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
            </Suspense>
            </RouteErrorBoundary>
            <WhatsAppFloat />
          </CartProvider>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
