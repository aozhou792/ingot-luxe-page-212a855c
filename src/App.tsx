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

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
        <CartProvider>
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
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
          <WhatsAppFloat />
          <AgeGate />
        </CartProvider>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
