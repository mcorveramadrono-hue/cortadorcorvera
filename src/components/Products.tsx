import { useNavigate } from "react-router-dom";
import { ArrowRight, ShoppingCart } from "lucide-react";
import { BRANDS } from "@/data/products";
import cesarNietoImg from "@/assets/products/cesar-nieto-hero.jpg";
import laJoyaImg from "@/assets/products/lajoya/jamon-bellota-100.png";

const brandImages: Record<string, string> = {
  "cesar-nieto": cesarNietoImg,
  "la-joya": laJoyaImg,
};

const Products = () => {
  const navigate = useNavigate();

  return (
    <section id="productos" className="relative py-24 overflow-hidden">
      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <div className="text-center mb-16 space-y-4">
          <p className="text-sm tracking-[0.3em] uppercase text-primary font-medium">Catálogo</p>
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground">Nuestras Marcas</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Trabajamos con dos casas de referencia del ibérico español. Selecciona una marca para descubrir todos sus jamones y paletas.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {BRANDS.map((brand) => (
            <button
              key={brand.id}
              onClick={() => navigate(`/tienda/${brand.id}`)}
              className="group relative bg-card border border-border hover:border-primary transition-all duration-300 overflow-hidden text-left"
            >
              <div className="aspect-[4/3] bg-corvera-cream/30 overflow-hidden flex items-center justify-center p-8">
                <img
                  src={brandImages[brand.id]}
                  alt={brand.name}
                  loading="lazy"
                  className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-6 space-y-2">
                <h3 className="font-serif text-2xl md:text-3xl font-bold text-foreground">{brand.name}</h3>
                <p className="text-sm text-muted-foreground">{brand.tagline}</p>
                <div className="pt-3 inline-flex items-center gap-2 text-sm tracking-widest uppercase text-primary font-medium">
                  Ver catálogo
                  <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </button>
          ))}
        </div>

        <p className="text-center text-xs text-muted-foreground/50 mt-10">
          Gastos de envío: 5 € para pedidos inferiores a 20 kg · Envío gratuito a partir de 20 kg
        </p>

        <div className="text-center mt-8">
          <button
            onClick={() => navigate("/tienda")}
            className="inline-flex items-center justify-center gap-2 px-10 py-3 bg-primary text-primary-foreground text-sm tracking-widest uppercase hover:bg-primary/90 transition-colors"
          >
            <ShoppingCart size={16} />
            Ver Tienda
          </button>
        </div>
      </div>
    </section>
  );
};

export default Products;
