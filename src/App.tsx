import { lazy, Suspense } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AgeGate } from "@/components/AgeGate";
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

// Content/marketing routes are lazy-loaded to keep the initial bundle small.
const GuidesIndexPage = lazy(() => import("./pages/GuidesIndexPage.tsx"));
const GuidePage = lazy(() => import("./pages/GuidePage.tsx"));
const FaqPage = lazy(() => import("./pages/FaqPage.tsx"));
const ContactPage = lazy(() => import("./pages/ContactPage.tsx"));
const ContentPage = lazy(() => import("./pages/ContentPage.tsx"));
const FlavoursIndexPage = lazy(() => import("./pages/FlavoursIndexPage.tsx"));
const FlavourPage = lazy(() => import("./pages/FlavourPage.tsx"));
const CompareIndexPage = lazy(() => import("./pages/CompareIndexPage.tsx"));
const ComparePage = lazy(() => import("./pages/ComparePage.tsx"));
const BrandsIndexPage = lazy(() => import("./pages/BrandsIndexPage.tsx"));
const BrandPage = lazy(() => import("./pages/BrandPage.tsx"));
const BlogIndexPage = lazy(() => import("./pages/BlogIndexPage.tsx"));
const BlogPostPage = lazy(() => import("./pages/BlogPostPage.tsx"));
const ReviewsIndexPage = lazy(() => import("./pages/ReviewsIndexPage.tsx"));
const ReviewPage = lazy(() => import("./pages/ReviewPage.tsx"));
const FaqTopicPage = lazy(() => import("./pages/FaqTopicPage.tsx"));

const queryClient = new QueryClient();

const RouteFallback = () => <div className="min-h-screen bg-background" aria-hidden />;

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <CartProvider>
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
              <Route path="/contact" element={<ContactPage />} />
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
            <WhatsAppFloat />
            <AgeGate />
          </CartProvider>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
