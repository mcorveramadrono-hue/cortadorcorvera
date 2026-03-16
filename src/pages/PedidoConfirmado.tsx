import { useEffect, useState } from "react";
import { useParams, useNavigate, useSearchParams } from "react-router-dom";
import { CheckCircle, Building2, CreditCard } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const PedidoConfirmado = () => {
  const { orderId } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrder = async () => {
      if (!orderId) return;
      const { data } = await supabase
        .from("orders")
        .select("*")
        .eq("id", orderId)
        .single();
      setOrder(data);
      setLoading(false);
    };
    fetchOrder();
  }, [orderId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-muted-foreground">Cargando...</p>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="pt-24 pb-16 text-center">
          <p className="text-muted-foreground mt-20">Pedido no encontrado.</p>
          <button onClick={() => navigate("/")} className="mt-4 px-6 py-2 bg-primary text-primary-foreground text-sm tracking-widest uppercase">
            Ir al Inicio
          </button>
        </main>
        <Footer />
      </div>
    );
  }

  const isTransfer = order.payment_method === "transfer";

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-24 pb-16">
        <div className="max-w-2xl mx-auto px-6 text-center space-y-6">
          <CheckCircle size={64} className="mx-auto text-primary" />
          <h1 className="font-serif text-3xl md:text-4xl font-bold text-foreground">
            ¡Pedido Confirmado!
          </h1>
          <p className="text-muted-foreground">
            Tu número de pedido es: <strong className="text-foreground">{order.order_number}</strong>
          </p>

          <div className="border border-border p-6 text-left space-y-4">
            <div className="flex items-center gap-2">
              {isTransfer ? <Building2 size={20} className="text-primary" /> : <CreditCard size={20} className="text-primary" />}
              <h2 className="font-serif text-lg font-bold text-foreground">
                {isTransfer ? "Transferencia Bancaria" : "Pago con Tarjeta"}
              </h2>
            </div>

            {isTransfer ? (
              <div className="space-y-3">
                <p className="text-sm text-muted-foreground">
                  Para completar tu pedido, realiza una transferencia con los siguientes datos:
                </p>
                <div className="bg-corvera-cream/50 p-4 space-y-2">
                  <p className="text-sm"><strong>Titular:</strong> Miguel Corvera Madroño</p>
                  <p className="text-sm"><strong>IBAN:</strong> ES00 0000 0000 0000 0000 0000</p>
                  <p className="text-sm"><strong>Concepto:</strong> {order.order_number}</p>
                  <p className="text-sm"><strong>Importe:</strong> {Number(order.total).toFixed(2).replace('.', ',')} €</p>
                </div>
                <p className="text-xs text-muted-foreground">
                  Una vez recibido el pago, prepararemos tu pedido y te enviaremos un email de confirmación.
                </p>
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">
                Tu pago ha sido procesado correctamente. Recibirás un email de confirmación en breve.
              </p>
            )}
          </div>

          <div className="border border-border p-6 text-left space-y-2">
            <h3 className="font-serif text-base font-bold text-foreground">Resumen</h3>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Subtotal</span>
              <span>{Number(order.subtotal).toFixed(2).replace('.', ',')} €</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Envío</span>
              <span>{Number(order.shipping_cost) === 0 ? "Gratis" : `${Number(order.shipping_cost).toFixed(2).replace('.', ',')} €`}</span>
            </div>
            <div className="border-t border-border pt-2 flex justify-between font-bold">
              <span className="text-foreground">Total</span>
              <span className="text-primary">{Number(order.total).toFixed(2).replace('.', ',')} €</span>
            </div>
          </div>

          <p className="text-xs text-muted-foreground">
            Hemos enviado un email con los detalles a <strong>{order.email}</strong>
          </p>

          <button
            onClick={() => navigate("/")}
            className="inline-flex items-center justify-center px-8 py-3 bg-primary text-primary-foreground text-sm tracking-widest uppercase hover:bg-primary/90 transition-colors"
          >
            Volver al Inicio
          </button>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default PedidoConfirmado;
