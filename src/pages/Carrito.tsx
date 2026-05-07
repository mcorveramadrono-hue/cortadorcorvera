import { useEffect, useState } from "react";
import { ArrowLeft, Trash2, Plus, Minus, ShoppingCart, Scissors, Tag, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useCart } from "@/contexts/CartContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { toast } from "@/hooks/use-toast";
import payVisa from "@/assets/pay-visa.png";
import payMastercard from "@/assets/pay-mastercard.png";
import payGooglePay from "@/assets/pay-googlepay.png";
import payBizum from "@/assets/pay-bizum.png";
import cajaZonas from "@/assets/corvera-caja-zonas.png";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";

const Carrito = () => {
  const navigate = useNavigate();
  const [promoInput, setPromoInput] = useState("");
  const [showUpsell, setShowUpsell] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const { items, removeItem, updateQuantity, updateKnife, subtotal, totalWeight, shippingCost, discountAmount, total, promoApplied, promoCode, appliedCoupon, applyPromoCode, removePromoCode, hasPromoFreeShipping } = useCart();

  const productSubtotal = items.reduce((sum, i) => sum + i.price * i.quantity, 0);
  const knifeTotal = subtotal - productSubtotal;
  const knifeCount = items.filter((i) => i.withKnife).reduce((sum, i) => sum + i.quantity, 0);

  const handleApplyPromo = async () => {
    const res = await applyPromoCode(promoInput);
    if (res.ok) {
      toast({ title: "¡Código aplicado!", description: res.message });
      setPromoInput("");
    } else {
      toast({ title: "Código inválido", description: res.message, variant: "destructive" });
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-28 pb-16">
        <div className="max-w-4xl mx-auto px-4 md:px-6">
          <button
            onClick={() => navigate("/")}
            className="inline-flex items-center gap-2 text-sm tracking-widest uppercase text-muted-foreground hover:text-primary transition-colors mb-8"
          >
            <ArrowLeft size={16} />
            Seguir Comprando
          </button>

          <h1 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-8">Tu Carrito</h1>

          {items.length === 0 ? (
            <div className="text-center py-20 space-y-4">
              <ShoppingCart size={48} className="mx-auto text-muted-foreground/30" />
              <p className="text-muted-foreground">Tu carrito está vacío</p>
              <button
                onClick={() => navigate("/tienda")}
                className="inline-flex items-center justify-center px-8 py-3 bg-primary text-primary-foreground text-sm tracking-widest uppercase hover:bg-primary/90 transition-colors"
              >
                Ver Tienda
              </button>
            </div>
          ) : (
            <div className="space-y-6">
              {items.map((item, index) => {
                const itemTotal = (item.price + (item.withKnife ? item.product.knifeSupplementPrice : 0)) * item.quantity;

                return (
                  <div key={index} className="flex gap-4 p-4 border border-border bg-card">
                    <img
                      src={item.product.images[0]}
                      alt={item.product.name}
                      className="w-20 h-20 object-contain bg-corvera-cream/30 flex-shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <h3 className="font-serif text-sm font-semibold text-foreground truncate">{item.product.name}</h3>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        {item.selectedWeight.toFixed(1).replace('.', ',')} kg — {item.price.toFixed(2).replace('.', ',')} €
                      </p>

                      <div className="flex items-center gap-3 mt-2">
                        <button
                          onClick={() => updateQuantity(index, item.quantity - 1)}
                          className="w-7 h-7 border border-border flex items-center justify-center text-foreground hover:border-primary transition-colors"
                        >
                          <Minus size={12} />
                        </button>
                        <span className="text-sm font-medium w-6 text-center">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(index, item.quantity + 1)}
                          className="w-7 h-7 border border-border flex items-center justify-center text-foreground hover:border-primary transition-colors"
                        >
                          <Plus size={12} />
                        </button>
                      </div>

                      <label className="mt-3 inline-flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={item.withKnife}
                          onChange={(e) => updateKnife(index, e.target.checked)}
                          className="w-4 h-4 accent-primary"
                        />
                        <Scissors size={14} className="text-muted-foreground" />
                        <span className="text-xs text-muted-foreground">
                          Corte a cuchillo (+{item.product.knifeSupplementPrice} €)
                        </span>
                      </label>
                    </div>
                    <div className="flex flex-col items-end justify-between">
                      <button onClick={() => removeItem(index)} className="text-muted-foreground hover:text-destructive transition-colors">
                        <Trash2 size={16} />
                      </button>
                      <span className="font-serif text-sm font-bold text-primary">{itemTotal.toFixed(2).replace('.', ',')} €</span>
                    </div>
                  </div>
                );
              })}

              {/* Promo Code */}
              <div className="border border-border p-4 space-y-3">
                <h3 className="text-sm font-medium text-foreground flex items-center gap-2">
                  <Tag size={16} />
                  Código Promocional
                </h3>
                {promoApplied ? (
                  <div className="flex items-center justify-between bg-primary/10 border border-primary/20 rounded px-4 py-2.5">
                    <span className="text-sm font-mono font-bold text-primary">{promoCode}</span>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-muted-foreground">Envío gratis aplicado</span>
                      <button onClick={removePromoCode} className="text-muted-foreground hover:text-destructive transition-colors">
                        <X size={14} />
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={promoInput}
                      onChange={(e) => setPromoInput(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && handleApplyPromo()}
                      placeholder="Introduce tu código"
                      className="flex-1 border border-border bg-background px-4 py-2.5 text-sm text-foreground focus:outline-none focus:border-primary transition-colors"
                    />
                    <button
                      onClick={handleApplyPromo}
                      className="px-6 py-2.5 bg-primary text-primary-foreground text-sm tracking-widest uppercase hover:bg-primary/90 transition-colors"
                    >
                      Aplicar
                    </button>
                  </div>
                )}
              </div>

              <div className="border border-border p-6 space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Productos</span>
                  <span className="text-foreground font-medium">{productSubtotal.toFixed(2).replace('.', ',')} €</span>
                </div>
                {knifeTotal > 0 && (
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Corte a cuchillo x{knifeCount}</span>
                    <span className="text-foreground font-medium">{knifeTotal.toFixed(2).replace('.', ',')} €</span>
                  </div>
                )}
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Peso total</span>
                  <span className="text-foreground font-medium">{totalWeight.toFixed(1).replace('.', ',')} kg</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">
                    Envío{" "}
                    {appliedCoupon?.type === "free-shipping" && <span className="text-primary">(Código {promoCode})</span>}
                    {!appliedCoupon && hasPromoFreeShipping && <span className="text-primary">(¡Gratis por promoción!)</span>}
                    {!appliedCoupon && !hasPromoFreeShipping && totalWeight >= 20 && <span className="text-primary">(¡Gratis!)</span>}
                  </span>
                  <span className={`text-foreground font-medium ${shippingCost === 0 ? "text-primary" : ""}`}>
                    {shippingCost === 0 ? "Gratis" : `${shippingCost.toFixed(2).replace('.', ',')} €`}
                  </span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Descuento <span className="text-primary">({promoCode})</span></span>
                    <span className="text-primary font-medium">-{discountAmount.toFixed(2).replace('.', ',')} €</span>
                  </div>
                )}
                {appliedCoupon?.type === "amount-off" && discountAmount === 0 && (
                  <p className="text-[11px] text-muted-foreground italic">
                    El cupón {promoCode} se aplicará al alcanzar {appliedCoupon.minOrderTotal}€ en productos.
                  </p>
                )}
                <div className="border-t border-border pt-3 flex justify-between">
                  <span className="font-serif text-lg font-bold text-foreground">Total</span>
                  <span className="font-serif text-lg font-bold text-primary">{total.toFixed(2).replace('.', ',')} €</span>
                </div>
                <p className="text-[10px] text-muted-foreground/60 text-right">*IVA incluido</p>
              </div>

              {/* Pagos Seguros */}
              <div className="border border-border p-4 space-y-4">
                <div className="flex items-center gap-2 text-sm font-medium text-foreground">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                    <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                  </svg>
                  Pagos 100% Seguros
                </div>
                <div className="flex flex-wrap items-center justify-center gap-2.5">
                  <div className="h-10 w-16 bg-white rounded-md border border-border flex items-center justify-center px-1 shadow-sm overflow-hidden">
                    <img src={payVisa} alt="Visa" loading="lazy" className="h-12 w-auto object-contain" />
                  </div>
                  <div className="h-10 w-16 bg-white rounded-md border border-border flex items-center justify-center shadow-sm overflow-hidden">
                    <img src={payMastercard} alt="Mastercard" loading="lazy" className="h-14 w-auto object-contain" />
                  </div>
                  {/* Apple Pay */}
                  <div className="h-10 w-16 bg-black rounded-md border border-border flex items-center justify-center gap-1 shadow-sm">
                    <svg viewBox="0 0 24 24" className="h-6 w-6 fill-white" xmlns="http://www.w3.org/2000/svg">
                      <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09zM12 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/>
                    </svg>
                    <span className="text-white text-sm font-semibold">Pay</span>
                  </div>
                  <div className="h-10 w-16 bg-white rounded-md border border-border flex items-center justify-center shadow-sm overflow-hidden">
                    <img src={payGooglePay} alt="Google Pay" loading="lazy" className="h-14 w-auto object-contain" />
                  </div>
                  <div className="h-10 w-16 rounded-md border border-border overflow-hidden shadow-sm bg-white flex items-center justify-center">
                    <img src={payBizum} alt="Bizum" loading="lazy" className="h-14 w-auto object-contain" />
                  </div>
                  {/* Transferencia */}
                  <div className="h-10 px-3 bg-muted rounded-md border border-border flex items-center justify-center gap-1.5 shadow-sm">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-foreground">
                      <path d="M3 21h18"/>
                      <path d="M3 10h18"/>
                      <path d="M5 6l7-3 7 3"/>
                      <path d="M4 10v11"/>
                      <path d="M20 10v11"/>
                      <path d="M8 14v3"/>
                      <path d="M12 14v3"/>
                      <path d="M16 14v3"/>
                    </svg>
                    <span className="text-xs font-medium text-foreground">Transferencia</span>
                  </div>
                </div>
                <p className="text-[10px] text-muted-foreground text-center">
                  🔒 Tu pago está protegido con encriptación SSL de 256-bit
                </p>
              </div>

              <button
                onClick={() => {
                  const totalQty = items.reduce((s, i) => s + i.quantity, 0);
                  const anyKnife = items.some((i) => i.withKnife);
                  if (totalQty === 1 && !anyKnife) {
                    setShowUpsell(true);
                  } else {
                    navigate("/checkout");
                  }
                }}
                className="w-full inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-primary text-primary-foreground text-sm tracking-widest uppercase hover:bg-primary/90 transition-colors"
              >
                Realizar Pedido
              </button>

              <Dialog open={showUpsell} onOpenChange={setShowUpsell}>
                <DialogContent className="max-w-2xl bg-corvera-cream">
                  <DialogHeader>
                    <p className="text-xs tracking-[0.3em] uppercase text-primary font-medium">Antes de continuar</p>
                    <DialogTitle className="font-serif text-2xl md:text-3xl text-foreground">Un corte original</DialogTitle>
                  </DialogHeader>
                  <div className="grid md:grid-cols-2 gap-6 items-center">
                    <img
                      src={cajaZonas}
                      alt="Caja Corvera Ibéricos por zonas"
                      className="w-full h-auto object-contain"
                    />
                    <div className="space-y-4">
                      <DialogDescription className="text-sm text-muted-foreground leading-relaxed">
                        En <strong>Corvera Ibéricos</strong> separamos el jamón por zonas (<strong>maza, babilla, punta y jarrete</strong>) para que descubras cómo cambian textura, aroma e intensidad en cada bocado.
                      </DialogDescription>
                      <p className="font-serif text-lg text-foreground italic">
                        ¿Te lo vas a perder?
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-3 mt-2">
                    <button
                      onClick={() => {
                        items.forEach((_, i) => updateKnife(i, true));
                        setShowUpsell(false);
                        navigate("/checkout");
                      }}
                      className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3 bg-primary text-primary-foreground text-xs tracking-widest uppercase hover:bg-primary/90 transition-colors"
                    >
                      <Scissors size={14} />
                      Añadir corte a cuchillo
                    </button>
                    <button
                      onClick={() => {
                        setShowUpsell(false);
                        navigate("/checkout");
                      }}
                      className="flex-1 inline-flex items-center justify-center px-6 py-3 border border-primary text-primary text-xs tracking-widest uppercase hover:bg-primary/5 transition-colors"
                    >
                      Realizar el pago
                    </button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Carrito;
