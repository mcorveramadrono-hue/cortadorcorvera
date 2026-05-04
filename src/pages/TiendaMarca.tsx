import { useEffect, useState } from "react";
import { ArrowLeft, ShoppingCart, Info } from "lucide-react";
import { useNavigate, useParams, Navigate } from "react-router-dom";
import { products, BRANDS } from "@/data/products";
import type { Product, Brand } from "@/data/products";
import { useCart } from "@/contexts/CartContext";
import ProductDetailDialog from "@/components/ProductDetailDialog";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { CheckCircle2 } from "lucide-react";

const TiendaMarca = () => {
  const navigate = useNavigate();
  const { brand } = useParams<{ brand: string }>();
  const { addItem } = useCart();
  const [imageIndices, setImageIndices] = useState<Record<string, number>>({});
  const [selectedWeights, setSelectedWeights] = useState<Record<string, number>>({});
  const [detailProduct, setDetailProduct] = useState<Product | null>(null);
  const [addedProduct, setAddedProduct] = useState<{ name: string; weight: number } | null>(null);

  const brandInfo = BRANDS.find((b) => b.id === brand);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (brandInfo) {
      document.title = `${brandInfo.name} | Jamones y Paletas Ibéricas - Corvera Ibéricos`;
      const meta = document.querySelector('meta[name="description"]');
      if (meta) meta.setAttribute("content", `Compra jamones y paletas ibéricas ${brandInfo.name}. ${brandInfo.tagline}. Envío a toda España.`);
    }
  }, [brandInfo]);

  if (!brandInfo) return <Navigate to="/tienda" replace />;

  const brandProducts = products.filter((p) => p.brand === (brand as Brand));
  const jamones = brandProducts.filter((p) => p.category === "jamon");
  const paletas = brandProducts.filter((p) => p.category === "paleta");

  const toggleProductImage = (productId: string, totalImages: number) => {
    if (totalImages <= 1) return;
    setImageIndices((prev) => ({
      ...prev,
      [productId]: ((prev[productId] || 0) + 1) % totalImages,
    }));
  };

  const handleAddToCart = (product: Product) => {
    const weightIdx = selectedWeights[product.id] ?? 0;
    const option = product.weightOptions[weightIdx];
    addItem({
      product,
      selectedWeight: option.weight,
      price: option.price,
      quantity: 1,
      withKnife: false,
    });
    setAddedProduct({ name: product.name, weight: option.weight });
  };

  const renderProductCard = (product: Product) => {
    const weightIdx = selectedWeights[product.id] ?? 0;
    const option = product.weightOptions[weightIdx];
    const totalPrice = option.price;

    return (
      <article key={product.id} className="group bg-card border border-border hover:border-primary/30 transition-all duration-300 flex flex-col">
        <div className="overflow-hidden bg-corvera-cream/30 cursor-pointer relative" onClick={() => toggleProductImage(product.id, product.images.length)}>
          <img
            src={product.images[imageIndices[product.id] || 0]}
            alt={product.name}
            className="w-full h-72 object-contain group-hover:scale-105 transition-transform duration-500 p-4"
          />
          {product.images.length > 1 && (
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1.5">
              {product.images.map((_, imgIdx) => (
                <span
                  key={imgIdx}
                  className={`w-2 h-2 rounded-full transition-colors ${(imageIndices[product.id] || 0) === imgIdx ? "bg-primary" : "bg-muted-foreground/30"}`}
                />
              ))}
            </div>
          )}
        </div>
        <div className="p-5 space-y-3 flex-1 flex flex-col">
          <h3 className="font-serif text-base font-semibold text-foreground leading-tight">{product.name}</h3>
          <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2">{product.description}</p>

          <div>
            <label className="text-xs tracking-widest uppercase text-muted-foreground block mb-1.5">Peso</label>
            <select
              value={weightIdx}
              onChange={(e) => setSelectedWeights((prev) => ({ ...prev, [product.id]: Number(e.target.value) }))}
              className="w-full border border-border bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:border-primary transition-colors"
            >
              {product.weightOptions.map((opt, idx) => (
                <option key={idx} value={idx}>{opt.label}</option>
              ))}
            </select>
          </div>

          <div className="pt-3 border-t border-border mt-auto space-y-2">
            <div className="flex items-baseline justify-between">
              <span className="font-serif text-lg font-bold text-primary">{totalPrice.toFixed(2).replace('.', ',')} €</span>
              <span className="text-[10px] text-muted-foreground/60">*IVA incl.</span>
            </div>
            <button
              onClick={() => setDetailProduct(product)}
              className="w-full inline-flex items-center justify-center gap-1.5 px-3 py-2 border border-border text-foreground text-xs tracking-widest uppercase hover:border-primary hover:text-primary transition-colors"
            >
              <Info size={14} />
              Más Información
            </button>
            <button
              onClick={() => handleAddToCart(product)}
              className="w-full inline-flex items-center justify-center gap-1.5 px-3 py-2.5 bg-primary text-primary-foreground text-xs tracking-widest uppercase hover:bg-primary/90 transition-colors"
            >
              <ShoppingCart size={14} />
              Añadir al Carrito
            </button>
          </div>
        </div>
      </article>
    );
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-28 pb-16">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="flex items-center justify-between mb-8">
            <button
              onClick={() => navigate("/tienda")}
              className="inline-flex items-center gap-2 text-sm tracking-widest uppercase text-muted-foreground hover:text-primary transition-colors"
            >
              <ArrowLeft size={16} />
              Volver a marcas
            </button>
          </div>

          <div className="text-center mb-16 space-y-4">
            <p className="text-sm tracking-[0.3em] uppercase text-primary font-medium">{brandInfo.tagline}</p>
            <h1 className="font-serif text-4xl md:text-5xl font-bold text-foreground">{brandInfo.name}</h1>
          </div>

          {jamones.length > 0 && (
            <div className="mb-16">
              <h2 className="font-serif text-2xl md:text-3xl font-bold text-foreground mb-8">Jamones Ibéricos</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {jamones.map(renderProductCard)}
              </div>
            </div>
          )}

          {paletas.length > 0 && (
            <div className="mb-12">
              <h2 className="font-serif text-2xl md:text-3xl font-bold text-foreground mb-8">Paletas Ibéricas</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {paletas.map(renderProductCard)}
              </div>
            </div>
          )}

          <div className="text-center p-6 border border-border bg-corvera-cream/30 space-y-2">
            <p className="text-sm text-muted-foreground">
              <strong>Envío gratuito</strong> para pedidos superiores a 20 kg de peso.
            </p>
            <p className="text-xs text-muted-foreground/70">
              Para pedidos inferiores a 20 kg, los gastos de envío son de 5 €.
            </p>
          </div>
        </div>
      </main>
      <Footer />

      <ProductDetailDialog
        isOpen={!!detailProduct}
        onClose={() => setDetailProduct(null)}
        product={detailProduct}
      />

      <Dialog open={!!addedProduct} onOpenChange={(open) => !open && setAddedProduct(null)}>
        <DialogContent className="max-w-md bg-corvera-cream">
          <DialogHeader className="items-center text-center">
            <CheckCircle2 className="text-primary mb-2" size={40} />
            <DialogTitle className="font-serif text-2xl text-foreground">¡Gracias por tu compra!</DialogTitle>
            <DialogDescription className="text-sm text-muted-foreground">
              {addedProduct && (
                <>Hemos añadido <strong>{addedProduct.name}</strong> ({addedProduct.weight.toFixed(1).replace('.', ',')} kg) a tu carrito.</>
              )}
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col sm:flex-row gap-3 mt-2">
            <button
              onClick={() => setAddedProduct(null)}
              className="flex-1 inline-flex items-center justify-center px-6 py-3 border border-primary text-primary text-xs tracking-widest uppercase hover:bg-primary/5 transition-colors"
            >
              Seguir comprando
            </button>
            <button
              onClick={() => {
                setAddedProduct(null);
                navigate("/carrito");
              }}
              className="flex-1 inline-flex items-center justify-center px-6 py-3 bg-primary text-primary-foreground text-xs tracking-widest uppercase hover:bg-primary/90 transition-colors"
            >
              Ir al carrito
            </button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default TiendaMarca;
