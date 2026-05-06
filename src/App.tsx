import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CartProvider } from "@/contexts/CartContext";
import Index from "./pages/Index";
import Tienda from "./pages/Tienda";
import TiendaMarca from "./pages/TiendaMarca";
import Producto from "./pages/Producto";
import Carrito from "./pages/Carrito";
import Checkout from "./pages/Checkout";
import PedidoConfirmado from "./pages/PedidoConfirmado";
import PoliticaPrivacidad from "./pages/PoliticaPrivacidad";
import Unsubscribe from "./pages/Unsubscribe";
import ConfirmarPago from "./pages/ConfirmarPago";
import MarcarEnvio from "./pages/MarcarEnvio";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <CartProvider>
        <Sonner />
        <BrowserRouter>
          <Toaster />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/tienda" element={<Tienda />} />
            <Route path="/tienda/:brand" element={<TiendaMarca />} />
            <Route path="/tienda/:brand/:productId" element={<Producto />} />
            <Route path="/carrito" element={<Carrito />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/pedido-confirmado/:orderId" element={<PedidoConfirmado />} />
            <Route path="/politica-privacidad" element={<PoliticaPrivacidad />} />
            <Route path="/unsubscribe" element={<Unsubscribe />} />
            <Route path="/confirmar-pago" element={<ConfirmarPago />} />
            <Route path="/marcar-envio/:orderId" element={<MarcarEnvio />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </CartProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
