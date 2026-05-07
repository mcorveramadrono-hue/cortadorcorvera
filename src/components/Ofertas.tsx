import { Link, useNavigate } from "react-router-dom";
import { Tag, ArrowRight } from "lucide-react";
import { FEATURED_PROMOTIONS } from "@/data/promotions";
import { products } from "@/data/products";
import PromoBadge from "@/components/PromoBadge";

const Ofertas = () => {
  const navigate = useNavigate();

  return (
    <section id="ofertas" className="relative py-20 bg-corvera-cream overflow-hidden" aria-label="Ofertas especiales Corvera Ibéricos">
      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <div className="text-center mb-12 space-y-4">
          <p className="text-sm tracking-[0.3em] uppercase text-primary font-medium flex items-center justify-center gap-2">
            <Tag size={16} /> Ofertas Especiales
          </p>
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground">Promociones Exclusivas</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Aprovecha nuestras ofertas en jamones ibéricos seleccionados. Calidad Corvera con ventajas únicas.
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 md:gap-6">
          {FEATURED_PROMOTIONS.map((promo) => {
            const product = products.find((p) => p.id === promo.productId);
            if (!product) return null;
            return (
              <Link
                key={promo.productId}
                to={`/tienda/${product.brand}/${product.id}?from=ofertas`}
                className="group relative bg-card border border-border hover:border-primary transition-all duration-300 overflow-hidden text-left flex flex-col"
              >
                <div className="relative aspect-square bg-background overflow-hidden flex items-center justify-center p-2 md:p-6">
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    loading="lazy"
                    className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
                  />
                  <PromoBadge productId={product.id} className="absolute top-2 left-2" />
                </div>
                <div className="p-3 md:p-5 space-y-2 flex-1 flex flex-col">
                  <h3 className="font-serif text-sm md:text-base font-bold text-foreground leading-tight">
                    {product.name}
                  </h3>
                  <p className="text-[11px] md:text-sm text-muted-foreground flex-1 line-clamp-3">{promo.description}</p>
                  <div className="pt-2 inline-flex items-center gap-2 text-[10px] md:text-xs tracking-widest uppercase text-primary font-medium">
                    Ver oferta →
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        <div className="text-center mt-10">
          <button
            onClick={() => navigate("/ofertas")}
            className="inline-flex items-center justify-center gap-2 px-10 py-3 border border-primary text-primary text-sm tracking-widest uppercase hover:bg-primary hover:text-primary-foreground transition-colors"
          >
            Ver todas las ofertas
            <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Ofertas;
