import { useEffect } from "react";
import { ArrowLeft, Tag } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { PROMOTIONS } from "@/data/promotions";
import { products } from "@/data/products";
import PromoBadge from "@/components/PromoBadge";

const Ofertas = () => {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "Ofertas y Promociones | Corvera Ibéricos";
    const meta = document.querySelector('meta[name="description"]');
    if (meta) meta.setAttribute("content", "Todas las ofertas y promociones de Corvera Ibéricos: envío gratuito, corte a cuchillo gratis y descuentos en jamones ibéricos.");
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-28 pb-16">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <button
            onClick={() => navigate("/")}
            className="inline-flex items-center gap-2 text-sm tracking-widest uppercase text-muted-foreground hover:text-primary transition-colors mb-8"
          >
            <ArrowLeft size={16} /> Volver
          </button>

          <div className="text-center mb-12 space-y-4">
            <p className="text-sm tracking-[0.3em] uppercase text-primary font-medium flex items-center justify-center gap-2">
              <Tag size={16} /> Promociones activas
            </p>
            <h1 className="font-serif text-4xl md:text-5xl font-bold text-foreground">Todas las Ofertas</h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Aprovecha estas promociones exclusivas en jamones ibéricos seleccionados.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {PROMOTIONS.map((promo) => {
              const product = products.find((p) => p.id === promo.productId);
              if (!product) return null;
              return (
                <Link
                  key={promo.productId}
                  to={`/tienda/${product.brand}/${product.id}?from=ofertas`}
                  className="group bg-card border border-border hover:border-primary transition-all overflow-hidden flex flex-col"
                >
                  <div className="relative aspect-square bg-corvera-cream/30 p-6 flex items-center justify-center overflow-hidden">
                    <img src={product.images[0]} alt={product.name} loading="lazy" className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500" />
                    <PromoBadge productId={product.id} className="absolute top-3 left-3" size="md" />
                  </div>
                  <div className="p-5 space-y-2 flex-1 flex flex-col">
                    <h2 className="font-serif text-lg font-bold text-foreground leading-tight">{promo.title}</h2>
                    <p className="text-sm text-muted-foreground flex-1">{promo.description}</p>
                    <span className="pt-3 inline-flex items-center gap-2 text-xs tracking-widest uppercase text-primary font-medium">
                      Ver producto →
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Ofertas;
