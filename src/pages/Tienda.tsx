import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { products } from "@/components/Products";
import ContactFormDialog from "@/components/ContactFormDialog";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const Tienda = () => {
  const [imageIndices, setImageIndices] = useState<Record<number, number>>({});
  const [showBuyForm, setShowBuyForm] = useState(false);
  const [buyProductName, setBuyProductName] = useState("");

  const toggleProductImage = (productIdx: number) => {
    setImageIndices((prev) => ({
      ...prev,
      [productIdx]: ((prev[productIdx] || 0) + 1) % products[productIdx].images.length,
    }));
  };

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
              Jamones y paletas ibéricas seleccionados con la máxima exigencia.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((product, index) => (
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
                  <div className="pt-3 border-t border-border mt-auto">
                    <span className="font-serif text-sm font-semibold text-primary block mb-3">{product.price}</span>
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
            ))}
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
    </div>
  );
};

export default Tienda;
