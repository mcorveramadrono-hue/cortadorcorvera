import { useEffect } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { BRANDS } from "@/data/products";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import cesarNietoImg from "@/assets/products/jamon-bellota-100-dop-cn.jpg";
import laJoyaImg from "@/assets/products/lajoya/jamon-bellota-100.png";

const brandImages: Record<string, string> = {
  "cesar-nieto": cesarNietoImg,
  "la-joya": laJoyaImg,
};

const Tienda = () => {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "Tienda | Jamones César Nieto y La Joya - Corvera Ibéricos";
    const meta = document.querySelector('meta[name="description"]');
    if (meta) meta.setAttribute("content", "Compra jamón ibérico de bellota online: César Nieto (Guijuelo) y La Joya (Jabugo). Envío a toda España. Corte a cuchillo.");
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', 'https://corveraibericos.com/tienda');
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-28 pb-16">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="flex items-center justify-between mb-8">
            <button
              onClick={() => navigate("/")}
              className="inline-flex items-center gap-2 text-sm tracking-widest uppercase text-muted-foreground hover:text-primary transition-colors"
            >
              <ArrowLeft size={16} />
              Volver
            </button>
          </div>

          <div className="text-center mb-16 space-y-4">
            <p className="text-sm tracking-[0.3em] uppercase text-primary font-medium">Nuestras Marcas</p>
            <h1 className="font-serif text-4xl md:text-5xl font-bold text-foreground">Elige tu Marca</h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Trabajamos con dos casas de referencia del ibérico español. Selecciona una marca para descubrir todos sus jamones y paletas.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
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
                    className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-6 space-y-2">
                  <h2 className="font-serif text-2xl md:text-3xl font-bold text-foreground">{brand.name}</h2>
                  <p className="text-sm text-muted-foreground">{brand.tagline}</p>
                  <div className="pt-3 inline-flex items-center gap-2 text-sm tracking-widest uppercase text-primary font-medium">
                    Ver catálogo
                    <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </button>
            ))}
          </div>

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
    </div>
  );
};

export default Tienda;
