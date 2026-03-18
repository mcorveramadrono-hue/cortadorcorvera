import { ArrowLeft, Trash2, Plus, Minus, ShoppingCart } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useCart } from "@/contexts/CartContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const Carrito = () => {
  const navigate = useNavigate();
  const { items, removeItem, updateQuantity, subtotal, totalWeight, shippingCost, total } = useCart();

  // Calculate knife supplement total
  const knifeTotal = items.reduce((sum, i) => sum + (i.withKnife ? i.product.knifeSupplementPrice * i.quantity : 0), 0);
  const productSubtotal = subtotal - knifeTotal;

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
                        {item.withKnife && ` · Corte a cuchillo (+${item.product.knifeSupplementPrice} €)`}
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

              {/* Totals */}
              <div className="border border-border p-6 space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Productos</span>
                  <span className="text-foreground font-medium">{productSubtotal.toFixed(2).replace('.', ',')} €</span>
                </div>
                {knifeTotal > 0 && (
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Corte a cuchillo</span>
                    <span className="text-foreground font-medium">{knifeTotal.toFixed(2).replace('.', ',')} €</span>
                  </div>
                )}
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Peso total</span>
                  <span className="text-foreground font-medium">{totalWeight.toFixed(1).replace('.', ',')} kg</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Envío {totalWeight >= 20 && <span className="text-primary">(¡Gratis!)</span>}</span>
                  <span className="text-foreground font-medium">{shippingCost === 0 ? "Gratis" : `${shippingCost.toFixed(2).replace('.', ',')} €`}</span>
                </div>
                <div className="border-t border-border pt-3 flex justify-between">
                  <span className="font-serif text-lg font-bold text-foreground">Total</span>
                  <span className="font-serif text-lg font-bold text-primary">{total.toFixed(2).replace('.', ',')} €</span>
                </div>
                <p className="text-[10px] text-muted-foreground/60 text-right">*IVA incluido</p>
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
