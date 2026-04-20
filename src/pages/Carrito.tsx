import { useEffect, useState } from "react";
import { ArrowLeft, Trash2, Plus, Minus, ShoppingCart, Scissors, Tag, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useCart } from "@/contexts/CartContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { toast } from "@/hooks/use-toast";

const Carrito = () => {
  const navigate = useNavigate();
  const [promoInput, setPromoInput] = useState("");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const { items, removeItem, updateQuantity, updateKnife, subtotal, totalWeight, shippingCost, total, promoApplied, promoCode, applyPromoCode, removePromoCode } = useCart();

  const knifeTotal = items.reduce((sum, i) => sum + (i.withKnife ? i.product.knifeSupplementPrice * i.quantity : 0), 0);
  const knifeCount = items.filter((i) => i.withKnife).reduce((sum, i) => sum + i.quantity, 0);
  const productSubtotal = subtotal - knifeTotal;

  const handleApplyPromo = () => {
    if (applyPromoCode(promoInput)) {
      toast({ title: "¡Código aplicado!", description: "Envío gratuito en tu pedido." });
      setPromoInput("");
    } else {
      toast({ title: "Código inválido", description: "El código promocional no es válido.", variant: "destructive" });
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
                    {promoApplied && <span className="text-primary">(Código SEMANASANTA)</span>}
                    {!promoApplied && totalWeight >= 20 && <span className="text-primary">(¡Gratis!)</span>}
                  </span>
                  <span className={`text-foreground font-medium ${shippingCost === 0 ? "text-primary" : ""}`}>
                    {shippingCost === 0 ? "Gratis" : `${shippingCost.toFixed(2).replace('.', ',')} €`}
                  </span>
                </div>
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
                <div className="flex flex-wrap items-center justify-center gap-3">
                  {/* Visa */}
                  <div className="h-8 px-3 bg-white rounded border border-border flex items-center justify-center">
                    <svg viewBox="0 0 48 16" className="h-4 w-auto">
                      <path fill="#1A1F71" d="M17.24 1.8l-3.54 10.66h-2.6L14.64 1.8h2.6zm12.28 6.9c0 1.78-1.18 2.62-2.34 2.62-1.15 0-1.97-.68-1.97-1.74 0-1.2.88-1.88 2.2-1.88.6 0 1.16.14 1.6.38v.62h.51zm-1.84-4.56c-1.28 0-2.26.48-2.94 1.14l.4 1.42c.52-.44 1.24-.74 1.94-.74.72 0 1.12.32 1.12.88 0 .34-.2.58-.62.58h-1.26c-1.72 0-2.58.98-2.58 2.26 0 1.42 1.02 2.32 2.56 2.32.94 0 1.68-.34 2.24-.9l.32.74h1.64V7.02c0-1.96-1.2-2.88-2.82-2.88zM8.56 1.8L5.6 12.46H2.9L1.5 5.2c-.08-.44-.16-.6-.44-.78C.56 4.1 0 3.88 0 3.88l.04-2.08h3.44c.48 0 .9.32 1.02.96l.76 4.48L6.6 1.8h1.96zm9.12 0l-2.1 10.66h-2.5l2.08-10.66h2.52z"/>
                      <path fill="#1A1F71" d="M39.6 1.8l-2.24 10.66h-2.5l2.24-10.66h2.5z"/>
                      <path fill="#F7B600" d="M44.56 1.8l-3.32 10.66h-2.5l3.32-10.66h2.5z"/>
                    </svg>
                  </div>
                  {/* Mastercard */}
                  <div className="h-8 px-3 bg-white rounded border border-border flex items-center justify-center">
                    <svg viewBox="0 0 48 16" className="h-4 w-auto">
                      <circle cx="14" cy="8" r="6" fill="#EB001B"/>
                      <circle cx="20" cy="8" r="6" fill="#F79E1B"/>
                      <path fill="#F79E1B" d="M17 3.5c1.5 1 2.5 2.8 2.5 4.5s-1 3.5-2.5 4.5c1.5-1 2.5-2.8 2.5-4.5s-1-3.5-2.5-4.5z"/>
                    </svg>
                  </div>
                  {/* Apple Pay */}
                  <div className="h-8 px-3 bg-black rounded border border-border flex items-center justify-center">
                    <svg viewBox="0 0 48 16" className="h-3 w-auto">
                      <path fill="white" d="M9.5 3.5c.4 0 .9-.2 1.2-.6.3-.4.5-.9.5-1.4 0 0-.5 0-1 .4-.4.3-.7.8-.7 1.2 0 .2.2.4.5.4h.5zm-1 9.4c.6 0 1-.4 1.8-.4.8 0 1.1.4 1.7.4.7 0 1.2-.6 1.7-1.1.5-.6.8-1.3.8-1.3 0 0-1.5-.6-1.5-2.3 0-1.3 1-1.9 1.5-2.2-.8-1.1-2-1.2-2.5-1.2-.7 0-1.3.4-1.7.4-.4 0-1-.4-1.6-.4-1.2 0-2.5.9-3 2.3-.6 1.7.3 3.3.8 4 .5.6 1.1 1.3 1.9 1.3zm7.5-9.4c.4 0 .9-.2 1.2-.6.3-.4.5-.9.5-1.4 0 0-.5 0-1 .4-.4.3-.7.8-.7 1.2 0 .2.2.4.5.4h.5z"/>
                    </svg>
                  </div>
                  {/* Google Pay */}
                  <div className="h-8 px-3 bg-white rounded border border-border flex items-center justify-center">
                    <svg viewBox="0 0 48 16" className="h-3 w-auto">
                      <path fill="#4285F4" d="M14.5 8.2v1.4h2c-.1.6-.4 1.1-.8 1.4l1.2 1c.7-.7 1.1-1.7 1.1-2.8 0-.3 0-.5-.1-.8h-3.4z"/>
                      <path fill="#34A853" d="M16.7 10.7c-.8.6-1.8.9-2.8.9-2.2 0-4-1.4-4.6-3.4l-1.3 1c1.2 2.3 3.5 3.9 5.9 3.9 1.8 0 3.3-.6 4.4-1.6l-1.2-1c-.4.3-.9.6-1.4.7z"/>
                      <path fill="#FBBC05" d="M9.3 6.2c-.3-.9-.3-1.9 0-2.8L8 2.4c-1.2 2.3-1.2 5.1 0 7.4l1.3-1.6z"/>
                      <path fill="#EA4335" d="M13.9 2.5c1.2 0 2.3.4 3.1 1.2l2.3-2.3C17.8.5 16 0 13.9 0c-2.4 0-4.7 1.6-5.9 3.9l1.3 1c.6-2 2.4-3.4 4.6-3.4z"/>
                    </svg>
                  </div>
                  {/* Bizum */}
                  <div className="h-8 px-3 bg-[#004481] rounded border border-border flex items-center justify-center">
                    <span className="text-white text-xs font-bold tracking-wide">BIZUM</span>
                  </div>
                  {/* Transferencia */}
                  <div className="h-8 px-3 bg-muted rounded border border-border flex items-center justify-center gap-1.5">
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-foreground">
                      <rect x="2" y="5" width="20" height="14" rx="2"/>
                      <line x1="2" y1="10" x2="22" y2="10"/>
                    </svg>
                    <span className="text-xs font-medium text-foreground">Transferencia</span>
                  </div>
                </div>
                <p className="text-[10px] text-muted-foreground text-center">
                  🔒 Tu pago está protegido con encriptación SSL de 256-bit
                </p>
              </div>

              <button
                onClick={() => navigate("/checkout")}
                className="w-full inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-primary text-primary-foreground text-sm tracking-widest uppercase hover:bg-primary/90 transition-colors"
              >
                Realizar Pedido
              </button>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Carrito;
