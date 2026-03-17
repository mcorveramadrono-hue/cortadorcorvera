import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronLeft, ChevronRight, Info, ShoppingCart, Scissors } from "lucide-react";
import { products } from "@/data/products";
import { useCart } from "@/contexts/CartContext";
import ProductDetailDialog from "./ProductDetailDialog";
import type { Product } from "@/data/products";
import { toast } from "@/hooks/use-toast";

const Products = () => {
  const navigate = useNavigate();
  const { addItem } = useCart();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [imageIndices, setImageIndices] = useState<Record<string, number>>({});
  const [detailProduct, setDetailProduct] = useState<Product | null>(null);
  const [selectedWeights, setSelectedWeights] = useState<Record<string, number>>({});
  const [selectedKnife, setSelectedKnife] = useState<Record<string, boolean>>({});

  const itemsPerView = typeof window !== "undefined" && window.innerWidth >= 1024 ? 4 : typeof window !== "undefined" && window.innerWidth >= 768 ? 2 : 1;
  const maxIndex = Math.max(0, products.length - itemsPerView);

  const prev = useCallback(() => setCurrentIndex((i) => Math.max(0, i - 1)), []);
  const next = useCallback(() => setCurrentIndex((i) => Math.min(maxIndex, i + 1)), [maxIndex]);

  const toggleProductImage = (productId: string, totalImages: number) => {
    setImageIndices((prev) => ({
      ...prev,
      [productId]: ((prev[productId] || 0) + 1) % totalImages,
    }));
  };

  const handleAddToCart = (product: Product) => {
    const weightIdx = selectedWeights[product.id] ?? 0;
    const option = product.weightOptions[weightIdx];
    const withKnife = selectedKnife[product.id] ?? false;

    addItem({
      product,
      selectedWeight: option.weight,
      price: option.price,
      quantity: 1,
      withKnife,
    });

    toast({
      title: "Añadido al carrito",
      description: `${product.name} (${option.weight.toFixed(1).replace('.', ',')} kg)`,
    });
  };

  return (
    <section id="productos" className="relative py-24 overflow-hidden">
      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <div className="text-center mb-16 space-y-4">
          <p className="text-sm tracking-[0.3em] uppercase text-primary font-medium">Catálogo</p>
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground">Nuestros Productos</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Jamones y paletas ibéricas seleccionados con la máxima exigencia. Cada pieza es única, curada con paciencia y tradición.
          </p>
        </div>

        {/* Carousel */}
        <div className="relative">
          <button
            onClick={prev}
            disabled={currentIndex === 0}
            className="absolute -left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 bg-background border border-border rounded-full flex items-center justify-center text-foreground hover:bg-primary hover:text-primary-foreground transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            onClick={next}
            disabled={currentIndex >= maxIndex}
            className="absolute -right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 bg-background border border-border rounded-full flex items-center justify-center text-foreground hover:bg-primary hover:text-primary-foreground transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
          >
            <ChevronRight size={20} />
          </button>

          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * (100 / itemsPerView)}%)` }}
            >
              {products.map((product) => {
                const weightIdx = selectedWeights[product.id] ?? 0;
                const option = product.weightOptions[weightIdx];
                const withKnife = selectedKnife[product.id] ?? false;
                const totalPrice = option.price + (withKnife ? product.knifeSupplementPrice : 0);

                return (
                  <article key={product.id} className="flex-shrink-0 px-2" style={{ width: `${100 / itemsPerView}%` }}>
                    <div className="group bg-card border border-border hover:border-primary/30 transition-all duration-300 h-full flex flex-col">
                      <div className="overflow-hidden bg-corvera-cream/30 cursor-pointer relative" onClick={() => toggleProductImage(product.id, product.images.length)}>
                        <img
                          src={product.images[imageIndices[product.id] || 0]}
                          alt={product.name}
                          className="w-full h-72 object-contain group-hover:scale-105 transition-transform duration-500 p-4"
                        />
                        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1.5">
                          {product.images.map((_, imgIdx) => (
                            <span
                              key={imgIdx}
                              className={`w-2 h-2 rounded-full transition-colors ${(imageIndices[product.id] || 0) === imgIdx ? "bg-primary" : "bg-muted-foreground/30"}`}
                            />
                          ))}
                        </div>
                      </div>
                      <div className="p-5 space-y-2 flex-1 flex flex-col">
                        <h3 className="font-serif text-base font-semibold text-foreground leading-tight">{product.name}</h3>
                        <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2">{product.description}</p>

                        {/* Weight selector */}
                        <div>
                          <select
                            value={weightIdx}
                            onChange={(e) => setSelectedWeights((prev) => ({ ...prev, [product.id]: Number(e.target.value) }))}
                            className="w-full border border-border bg-background px-3 py-1.5 text-xs text-foreground focus:outline-none focus:border-primary transition-colors"
                          >
                            {product.weightOptions.map((opt, idx) => (
                              <option key={idx} value={idx}>{opt.label}</option>
                            ))}
                          </select>
                        </div>

                        {/* Knife supplement */}
                        <label className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={withKnife}
                            onChange={(e) => setSelectedKnife((prev) => ({ ...prev, [product.id]: e.target.checked }))}
                            className="accent-primary"
                          />
                          <Scissors size={12} className="text-muted-foreground" />
                          <span className="text-[11px] text-muted-foreground">
                            Corte a cuchillo (+{product.knifeSupplementPrice} €)
                          </span>
                        </label>

                        <div className="pt-3 border-t border-border mt-auto space-y-2">
                          <div className="flex items-baseline justify-between">
                            <span className="font-serif text-sm font-semibold text-primary">
                              {totalPrice.toFixed(2).replace('.', ',')} €
                            </span>
                            <span className="text-[10px] text-muted-foreground/60">*IVA incl.</span>
                          </div>
                          <button
                            onClick={() => setDetailProduct(product)}
                            className="w-full inline-flex items-center justify-center gap-1.5 px-3 py-1.5 border border-border text-foreground text-xs tracking-widest uppercase hover:border-primary hover:text-primary transition-colors"
                          >
                            <Info size={14} />
                            Más Info
                          </button>
                          <button
                            onClick={() => handleAddToCart(product)}
                            className="w-full inline-flex items-center justify-center gap-1.5 px-3 py-2 bg-primary text-primary-foreground text-xs tracking-widest uppercase hover:bg-primary/90 transition-colors"
                          >
                            <ShoppingCart size={14} />
                            Añadir al Carrito
                          </button>
                        </div>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>

          <div className="flex justify-center gap-2 mt-8">
            {Array.from({ length: maxIndex + 1 }).map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentIndex(i)}
                className={`w-2.5 h-2.5 rounded-full transition-colors ${currentIndex === i ? "bg-primary" : "bg-muted-foreground/30"}`}
              />
            ))}
          </div>
        </div>

        <p className="text-center text-xs text-muted-foreground/50 mt-6">
          Gastos de envío: 15 € para pedidos inferiores a 20 kg · Envío gratuito a partir de 20 kg
        </p>

        <div className="text-center mt-10">
          <button
            onClick={() => navigate("/tienda")}
            className="inline-flex items-center justify-center gap-2 px-10 py-3 bg-primary text-primary-foreground text-sm tracking-widest uppercase hover:bg-primary/90 transition-colors"
          >
            <ShoppingCart size={16} />
            Ver Tienda
          </button>
        </div>
      </div>

      <ProductDetailDialog
        isOpen={!!detailProduct}
        onClose={() => setDetailProduct(null)}
        product={detailProduct}
      />
    </section>
  );
};

export default Products;
