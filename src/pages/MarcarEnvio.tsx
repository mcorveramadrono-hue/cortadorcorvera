import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { Loader2, Package, CheckCircle2, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL as string;
const SUPABASE_KEY = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY as string;
const FN_URL = `${SUPABASE_URL}/functions/v1/mark-as-shipped`;

interface OrderData {
  id: string;
  order_number: string;
  first_name: string;
  last_name: string;
  email: string;
  status: string;
  shipping_carrier: string | null;
  tracking_number: string | null;
  tracking_url: string | null;
  shipped_at: string | null;
}

const MarcarEnvio = () => {
  const { orderId } = useParams<{ orderId: string }>();
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token") || "";

  const [loading, setLoading] = useState(true);
  const [order, setOrder] = useState<OrderData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);

  const [carrier, setCarrier] = useState("");
  const [trackingNumber, setTrackingNumber] = useState("");
  const [trackingUrl, setTrackingUrl] = useState("");

  useEffect(() => {
    const fetchOrder = async () => {
      if (!orderId || !token) {
        setError("Enlace inválido");
        setLoading(false);
        return;
      }
      try {
        const res = await fetch(`${FN_URL}?orderId=${orderId}&token=${token}`, {
          headers: { apikey: SUPABASE_KEY, Authorization: `Bearer ${SUPABASE_KEY}` },
        });
        const data = await res.json();
        if (!res.ok) {
          setError("Enlace inválido o pedido no encontrado");
        } else {
          setOrder(data.order);
          if (data.order.shipped_at) {
            setDone(true);
            setCarrier(data.order.shipping_carrier || "");
            setTrackingNumber(data.order.tracking_number || "");
            setTrackingUrl(data.order.tracking_url || "");
          }
        }
      } catch {
        setError("Error al cargar el pedido");
      } finally {
        setLoading(false);
      }
    };
    fetchOrder();
  }, [orderId, token]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!carrier.trim() || !trackingNumber.trim()) {
      toast.error("Compañía y código de seguimiento son obligatorios");
      return;
    }
    setSubmitting(true);
    try {
      const res = await fetch(FN_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          apikey: SUPABASE_KEY,
          Authorization: `Bearer ${SUPABASE_KEY}`,
        },
        body: JSON.stringify({
          orderId,
          token,
          shippingCarrier: carrier.trim(),
          trackingNumber: trackingNumber.trim(),
          trackingUrl: trackingUrl.trim(),
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        toast.error(data.error || "Error al marcar como enviado");
      } else {
        setDone(true);
        toast.success("Pedido marcado como enviado. Email enviado al cliente.");
      }
    } catch {
      toast.error("Error de red");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background p-4">
        <Card className="max-w-md w-full p-8 text-center">
          <AlertCircle className="h-12 w-12 text-destructive mx-auto mb-4" />
          <h1 className="text-xl font-bold mb-2">Enlace inválido</h1>
          <p className="text-muted-foreground">{error}</p>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <Card className="p-8">
          <div className="flex items-center gap-3 mb-6">
            <Package className="h-8 w-8 text-primary" />
            <div>
              <h1 className="text-2xl font-bold">Marcar pedido como enviado</h1>
              <p className="text-muted-foreground text-sm">Pedido {order?.order_number}</p>
            </div>
          </div>

          <div className="bg-muted/50 rounded-lg p-4 mb-6 space-y-1 text-sm">
            <p><strong>Cliente:</strong> {order?.first_name} {order?.last_name}</p>
            <p><strong>Email:</strong> {order?.email}</p>
          </div>

          {done ? (
            <div className="text-center py-6">
              <CheckCircle2 className="h-16 w-16 text-primary mx-auto mb-4" />
              <h2 className="text-xl font-bold mb-2">Pedido marcado como enviado</h2>
              <p className="text-muted-foreground mb-4">
                Se ha enviado un email al cliente con los datos del envío.
              </p>
              <div className="bg-muted/50 rounded-lg p-4 text-left text-sm space-y-2 max-w-md mx-auto">
                <p><strong>Compañía:</strong> {carrier}</p>
                <p><strong>Tracking:</strong> {trackingNumber}</p>
                {trackingUrl && (
                  <p className="break-all"><strong>URL:</strong> <a href={trackingUrl} target="_blank" rel="noreferrer" className="text-primary underline">{trackingUrl}</a></p>
                )}
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="carrier">Compañía de envío *</Label>
                <Input
                  id="carrier"
                  value={carrier}
                  onChange={(e) => setCarrier(e.target.value)}
                  placeholder="GLS, SEUR, MRW, Correos Express..."
                  maxLength={100}
                  required
                />
              </div>

              <div>
                <Label htmlFor="tracking">Código de seguimiento *</Label>
                <Input
                  id="tracking"
                  value={trackingNumber}
                  onChange={(e) => setTrackingNumber(e.target.value)}
                  placeholder="Ej: 1234567890ABC"
                  maxLength={200}
                  required
                />
              </div>

              <div>
                <Label htmlFor="url">URL de seguimiento (opcional)</Label>
                <Input
                  id="url"
                  type="url"
                  value={trackingUrl}
                  onChange={(e) => setTrackingUrl(e.target.value)}
                  placeholder="https://www.gls-spain.es/seguimiento?codigo=..."
                  maxLength={500}
                />
                <p className="text-xs text-muted-foreground mt-1">
                  Si lo añades, el cliente verá un botón "Seguir mi pedido" en el email.
                </p>
              </div>

              <Button type="submit" disabled={submitting} className="w-full" size="lg">
                {submitting && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
                Marcar como enviado y notificar al cliente
              </Button>
            </form>
          )}
        </Card>
      </div>
    </div>
  );
};

export default MarcarEnvio;
