import { useState } from "react";
import { ArrowLeft, Building2, Smartphone, Loader2 } from "lucide-react";
import { useNavigate, Link } from "react-router-dom";
import { useCart } from "@/contexts/CartContext";
import { supabase } from "@/integrations/supabase/client";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { toast } from "@/hooks/use-toast";

const Checkout = () => {
  const navigate = useNavigate();
  const { items, subtotal, totalWeight, shippingCost, total, clearCart } = useCart();
  const [loading, setLoading] = useState(false);
  const [acceptPrivacy, setAcceptPrivacy] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<"transfer" | "bizum">("transfer");
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    dni: "",
    address: "",
    city: "",
    province: "",
    postalCode: "",
    notes: "",
  });

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="pt-24 pb-16 text-center">
          <p className="text-muted-foreground mt-20">No tienes productos en el carrito.</p>
          <button onClick={() => navigate("/tienda")} className="mt-4 px-6 py-2 bg-primary text-primary-foreground text-sm tracking-widest uppercase">
            Ir a la Tienda
          </button>
        </main>
        <Footer />
      </div>
    );
  }

  const knifeTotal = items.reduce((sum, i) => sum + (i.withKnife ? i.product.knifeSupplementPrice * i.quantity : 0), 0);
  const knifeCount = items.filter((i) => i.withKnife).reduce((sum, i) => sum + i.quantity, 0);
  const productSubtotal = subtotal - knifeTotal;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!acceptPrivacy) return;
    setLoading(true);

    try {
      const orderData = {
        order_number: `TMP-${Date.now()}`,
        first_name: formData.firstName,
        last_name: formData.lastName,
        email: formData.email,
        phone: formData.phone,
        dni: formData.dni,
        address: formData.address,
        city: formData.city,
        province: formData.province,
        postal_code: formData.postalCode,
        subtotal,
        shipping_cost: shippingCost,
        total,
        total_weight: totalWeight,
        notes: formData.notes || null,
        accept_privacy: acceptPrivacy,
        payment_method: paymentMethod,
        status: "pending_payment",
      };

      const { data: order, error: orderError } = await supabase
        .from("orders")
        .insert(orderData)
        .select()
        .single();

      if (orderError) throw orderError;

      const orderItems = items.map((item) => ({
        order_id: order.id,
        product_name: item.product.name,
        weight: item.selectedWeight,
        price: item.price,
        quantity: item.quantity,
        knife_supplement: item.withKnife,
        knife_supplement_price: item.withKnife ? item.product.knifeSupplementPrice : 0,
      }));

      const { error: itemsError } = await supabase.from("order_items").insert(orderItems);
      if (itemsError) throw itemsError;

      let notificationSent = false;
      let lastNotificationError: string | null = null;

      for (let attempt = 0; attempt < 2; attempt++) {
        const { error: notificationError } = await supabase.functions.invoke("send-order-notification", {
          body: { orderId: order.id },
        });

        if (!notificationError) {
          notificationSent = true;
          break;
        }

        lastNotificationError = notificationError.message;
      }

      if (!notificationSent) {
        console.error("Order notification error:", lastNotificationError);
        toast({
          title: "Pedido guardado",
          description: "Tu pedido se registró, pero hubo un problema enviando la notificación. Si no te contactamos pronto, escríbenos por WhatsApp.",
          variant: "destructive",
        });
      }

      clearCart();
      navigate(`/pedido-confirmado/${order.id}`);
    } catch (err: any) {
      console.error("Checkout error:", err);
      toast({
        title: "Error al procesar el pedido",
        description: "Por favor, inténtalo de nuevo o contacta con nosotros.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const inputClass = "w-full border border-border bg-background px-4 py-2.5 text-sm text-foreground focus:outline-none focus:border-primary transition-colors";

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-28 pb-16">
        <div className="max-w-5xl mx-auto px-4 md:px-6">
          <button
            onClick={() => navigate("/carrito")}
            className="inline-flex items-center gap-2 text-sm tracking-widest uppercase text-muted-foreground hover:text-primary transition-colors mb-8"
          >
            <ArrowLeft size={16} />
            Volver al Carrito
          </button>

          <h1 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-8">Finalizar Pedido</h1>

          <form onSubmit={handleSubmit} className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              <div className="border border-border p-6 space-y-4">
                <h2 className="font-serif text-lg font-bold text-foreground">Datos Personales</h2>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs tracking-widest uppercase text-muted-foreground block mb-1.5">Nombre *</label>
                    <input type="text" required value={formData.firstName} onChange={(e) => handleChange("firstName", e.target.value)} className={inputClass} placeholder="Tu nombre" />
                  </div>
                  <div>
                    <label className="text-xs tracking-widest uppercase text-muted-foreground block mb-1.5">Apellidos *</label>
                    <input type="text" required value={formData.lastName} onChange={(e) => handleChange("lastName", e.target.value)} className={inputClass} placeholder="Tus apellidos" />
                  </div>
                </div>
                <div>
                  <label className="text-xs tracking-widest uppercase text-muted-foreground block mb-1.5">DNI/NIE *</label>
                  <input type="text" required value={formData.dni} onChange={(e) => handleChange("dni", e.target.value)} className={inputClass} placeholder="12345678A" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs tracking-widest uppercase text-muted-foreground block mb-1.5">Email *</label>
                    <input type="email" required value={formData.email} onChange={(e) => handleChange("email", e.target.value)} className={inputClass} placeholder="tu@email.com" />
                  </div>
                  <div>
                    <label className="text-xs tracking-widest uppercase text-muted-foreground block mb-1.5">Teléfono *</label>
                    <input type="tel" required value={formData.phone} onChange={(e) => handleChange("phone", e.target.value)} className={inputClass} placeholder="+34 600 000 000" />
                  </div>
                </div>
              </div>

              <div className="border border-border p-6 space-y-4">
                <h2 className="font-serif text-lg font-bold text-foreground">Dirección de Envío</h2>
                <div>
                  <label className="text-xs tracking-widest uppercase text-muted-foreground block mb-1.5">Dirección *</label>
                  <input type="text" required value={formData.address} onChange={(e) => handleChange("address", e.target.value)} className={inputClass} placeholder="Calle, número, piso..." />
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label className="text-xs tracking-widest uppercase text-muted-foreground block mb-1.5">Ciudad *</label>
                    <input type="text" required value={formData.city} onChange={(e) => handleChange("city", e.target.value)} className={inputClass} placeholder="Madrid" />
                  </div>
                  <div>
                    <label className="text-xs tracking-widest uppercase text-muted-foreground block mb-1.5">Provincia *</label>
                    <input type="text" required value={formData.province} onChange={(e) => handleChange("province", e.target.value)} className={inputClass} placeholder="Madrid" />
                  </div>
                  <div>
                    <label className="text-xs tracking-widest uppercase text-muted-foreground block mb-1.5">C.P. *</label>
                    <input type="text" required value={formData.postalCode} onChange={(e) => handleChange("postalCode", e.target.value)} className={inputClass} placeholder="28001" />
                  </div>
                </div>
              </div>

              <div className="border border-border p-6 space-y-4">
                <h2 className="font-serif text-lg font-bold text-foreground">Notas del Pedido</h2>
                <textarea
                  rows={3}
                  value={formData.notes}
                  onChange={(e) => handleChange("notes", e.target.value)}
                  className={`${inputClass} resize-none`}
                  placeholder="Instrucciones especiales de entrega, comentarios..."
                />
              </div>

              <div className="border border-border p-6 space-y-4">
                <h2 className="font-serif text-lg font-bold text-foreground">Método de Pago</h2>
                <div className="space-y-3">
                  <label
                    className={`flex items-center gap-3 p-4 border cursor-pointer transition-colors ${
                      paymentMethod === "transfer" ? "border-primary bg-primary/5" : "border-border hover:border-primary/30"
                    }`}
                  >
                    <input type="radio" name="payment" value="transfer" checked={paymentMethod === "transfer"} onChange={() => setPaymentMethod("transfer")} className="accent-primary" />
                    <Building2 size={20} className="text-foreground" />
                    <div>
                      <p className="text-sm font-medium text-foreground">Transferencia bancaria</p>
                      <p className="text-xs text-muted-foreground">Titular: Marcos Corvera Madroño</p>
                    </div>
                  </label>
                  <label
                    className={`flex items-center gap-3 p-4 border cursor-pointer transition-colors ${
                      paymentMethod === "bizum" ? "border-primary bg-primary/5" : "border-border hover:border-primary/30"
                    }`}
                  >
                    <input type="radio" name="payment" value="bizum" checked={paymentMethod === "bizum"} onChange={() => setPaymentMethod("bizum")} className="accent-primary" />
                    <Smartphone size={20} className="text-foreground" />
                    <div>
                      <p className="text-sm font-medium text-foreground">Bizum</p>
                      <p className="text-xs text-muted-foreground">Pago rápido con Bizum</p>
                    </div>
                  </label>
                </div>
              </div>

              <div className="flex items-start gap-3 border border-border bg-card p-4 md:p-5">
                <input
                  type="checkbox"
                  id="privacy-checkout"
                  required
                  checked={acceptPrivacy}
                  onChange={(e) => setAcceptPrivacy(e.target.checked)}
                  className="mt-0.5 h-5 w-5 accent-primary"
                />
                <label htmlFor="privacy-checkout" className="text-sm text-muted-foreground leading-relaxed">
                  He leído y acepto la{" "}
                  <Link to="/politica-privacidad" target="_blank" className="text-primary hover:underline">
                    Política de Privacidad
                  </Link>{" "}
                  y las condiciones de compra. *
                </label>
              </div>
            </div>

            <div className="lg:col-span-1">
              <div className="border border-border p-6 space-y-4 sticky top-20">
                <h2 className="font-serif text-lg font-bold text-foreground">Resumen del Pedido</h2>
                <div className="space-y-3 max-h-60 overflow-y-auto">
                  {items.map((item, i) => {
                    const itemTotal = (item.price + (item.withKnife ? item.product.knifeSupplementPrice : 0)) * item.quantity;
                    return (
                      <div key={i} className="flex justify-between text-sm">
                        <div className="min-w-0">
                          <p className="text-foreground truncate text-xs">{item.product.name}</p>
                          <p className="text-[10px] text-muted-foreground">
                            {item.selectedWeight.toFixed(1).replace('.', ',')} kg × {item.quantity}
                            {item.withKnife && ` + cuchillo (${item.product.knifeSupplementPrice} €)`}
                          </p>
                        </div>
                        <span className="text-foreground font-medium text-xs whitespace-nowrap ml-2">{itemTotal.toFixed(2).replace('.', ',')} €</span>
                      </div>
                    );
                  })}
                </div>
                <div className="border-t border-border pt-3 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Productos</span>
                    <span className="text-foreground">{productSubtotal.toFixed(2).replace('.', ',')} €</span>
                  </div>
                  {knifeTotal > 0 && (
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Corte a cuchillo x{knifeCount}</span>
                      <span className="text-foreground">{knifeTotal.toFixed(2).replace('.', ',')} €</span>
                    </div>
                  )}
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Envío ({totalWeight.toFixed(1).replace('.', ',')} kg)</span>
                    <span className="text-foreground">{shippingCost === 0 ? "Gratis" : `${shippingCost.toFixed(2).replace('.', ',')} €`}</span>
                  </div>
                  <div className="border-t border-border pt-2 flex justify-between">
                    <span className="font-serif font-bold text-foreground">Total</span>
                    <span className="font-serif font-bold text-primary text-lg">{total.toFixed(2).replace('.', ',')} €</span>
                  </div>
                </div>
                <button
                  type="submit"
                  disabled={loading || !acceptPrivacy}
                  className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-primary text-primary-foreground text-sm tracking-widest uppercase hover:bg-primary/90 transition-colors disabled:opacity-50"
                >
                  {loading ? <Loader2 size={16} className="animate-spin" /> : paymentMethod === "bizum" ? <Smartphone size={16} /> : <Building2 size={16} />}
                  {loading ? "Procesando..." : "Confirmar Pedido"}
                </button>
              </div>
            </div>
          </form>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Checkout;
