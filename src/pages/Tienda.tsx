import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Info } from "lucide-react";
import { products } from "@/data/products";
import type { Product } from "@/data/products";
import ContactFormDialog from "@/components/ContactFormDialog";
import ProductDetailDialog from "@/components/ProductDetailDialog";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const Tienda = () => {
  const [imageIndices, setImageIndices] = useState<Record<number, number>>({});
  const [showBuyForm, setShowBuyForm] = useState(false);
  const [buyProductName, setBuyProductName] = useState("");
  const [detailProduct, setDetailProduct] = useState<Product | null>(null);

  const toggleProductImage = (productIdx: number) => {
    setImageIndices((prev) => ({
      ...prev,
      [productIdx]: ((prev[productIdx] || 0) + 1) % products[productIdx].images.length,
    }));
  };

  const jamones = products.filter((p) => p.category === "jamon");
  const paletas = products.filter((p) => p.category === "paleta");

  const renderProductCard = (product: Product, index: number) => (
    <article key={index} className="group bg-card border border-border hover:border-primary/30 transition-all duration-300 flex flex-col">
      <div className="overflow-hidden bg-corvera-cream/30 cursor-pointer relative" onClick={() => toggleProductImage(index)}>
        <img
          src={product.images[imageIndices[index] || 0]}
          alt={product.name}
          className="w-full h-72 object-contain group-hover:scale-105 transition-transform duration-500 p-4"
        />
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1.5">
          {product.images.map((_, imgIdx) => (
            <span
              key={imgIdx}
              className={`w-2 h-2 rounded-full transition-colors ${(imageIndices[index] || 0) === imgIdx ? "bg-primary" : "bg-muted-foreground/30"}`}
            />
          ))}
        </div>
      </div>
      <div className="p-5 space-y-2 flex-1 flex flex-col">
        <h3 className="font-serif text-base font-semibold text-foreground leading-tight">{product.name}</h3>
        <span className="text-xs tracking-widest uppercase text-muted-foreground block">{product.weight}</span>
        <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2">{product.description}</p>
        <div className="pt-3 border-t border-border mt-auto space-y-2">
          <div className="flex items-baseline justify-between">
            <span className="font-serif text-sm font-semibold text-primary">{product.price}</span>
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
            onClick={() => {
              setBuyProductName(product.name);
              setShowBuyForm(true);
            }}
            className="w-full inline-flex items-center justify-center gap-1.5 px-3 py-2 bg-primary text-primary-foreground text-xs tracking-widest uppercase hover:bg-primary/90 transition-colors"
          >
            Comprar
          </button>
        </div>
      </div>
    </article>
  );

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-6">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm tracking-widest uppercase text-muted-foreground hover:text-primary transition-colors mb-8"
          >
            <ArrowLeft size={16} />
            Volver al inicio
          </Link>

          <div className="text-center mb-16 space-y-4">
            <p className="text-sm tracking-[0.3em] uppercase text-primary font-medium">Catálogo Completo</p>
            <h1 className="font-serif text-4xl md:text-5xl font-bold text-foreground">Nuestra Tienda</h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Jamones y paletas ibéricas seleccionados con la máxima exigencia. Todos los precios incluyen IVA.
            </p>
          </div>

          {/* Jamones */}
          <div className="mb-16">
            <h2 className="font-serif text-2xl md:text-3xl font-bold text-foreground mb-8">Jamones Ibéricos</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {jamones.map((product, index) => renderProductCard(product, index))}
            </div>
          </div>

          {/* Paletas */}
          <div className="mb-12">
            <h2 className="font-serif text-2xl md:text-3xl font-bold text-foreground mb-8">Paletas Ibéricas</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {paletas.map((product, index) => renderProductCard(product, index + jamones.length))}
            </div>
          </div>

          {/* Shipping info */}
          <div className="text-center p-6 border border-border bg-corvera-cream/30 space-y-2">
            <p className="text-sm text-muted-foreground">
              <strong>Envío gratuito</strong> para pedidos superiores a 20 kg de peso.
            </p>
            <p className="text-xs text-muted-foreground/70">
              Para pedidos inferiores a 20 kg, los gastos de envío son de 15 €.
            </p>
          </div>
        </div>
      </main>
      <Footer />

      <ContactFormDialog
        isOpen={showBuyForm}
        onClose={() => setShowBuyForm(false)}
        title={`Comprar: ${buyProductName}`}
        defaultMessage={`Hola, estoy interesado en: ${buyProductName}`}
      />

      <ProductDetailDialog
        isOpen={!!detailProduct}
        onClose={() => setDetailProduct(null)}
        product={detailProduct}
      />
    </div>
  );
};

export default Tienda;
