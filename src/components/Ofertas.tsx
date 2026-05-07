import { useNavigate } from "react-router-dom";
import { Tag, Gift, Scissors, Truck } from "lucide-react";
import lajoyaCebo from "@/assets/products/lajoya/jamon-cebo-50.png";
import lajoyaBellota from "@/assets/products/lajoya/jamon-bellota-50.png";
import reservaFamiliar from "@/assets/products/jamon-reserva-familiar-new.png";
import epicumImg from "@/assets/products/epicum/jamon-cebo-50.jpg";

const offers = [
  {
    icon: Gift,
    image: lajoyaCebo,
    title: "Jamón Cebo 50% Ibérico La Joya",
    badge: "10€ DE REGALO",
    description: "Llévate este jamón y consigue 10€ de descuento en tu siguiente compra superior a 150€.",
    cta: "Ver oferta",
    path: "/tienda/la-joya/lajoya-jamon-cebo-50",
  },
  {
    icon: Scissors,
    image: lajoyaBellota,
    title: "Jamón Bellota 50% Ibérico Jabugo La Joya",
    badge: "CORTE A CUCHILLO GRATIS",
    description: "Servicio de corte a cuchillo profesional incluido sin coste adicional.",
    cta: "Ver oferta",
    path: "/tienda/la-joya/lajoya-jamon-bellota-50",
  },
  {
    icon: Truck,
    image: reservaFamiliar,
    title: "Jamón César Nieto Reserva Familiar <7kg",
    badge: "ENVÍO GRATUITO",
    description: "Tradición y sabor de Guijuelo con envío gratis a toda la península.",
    cta: "Ver oferta",
    path: "/tienda/cesar-nieto/jamon-reserva-familiar",
  },
  {
    icon: Truck,
    image: epicumImg,
    title: "Jamón Cebo 50% Ibérico Epicum y Finura",
    badge: "ENVÍO GRATUITO",
    description: "Cebo ibérico de máxima calidad con envío gratuito incluido.",
    cta: "Ver ofertas",
    path: "/tienda/epicum",
  },
];

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

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {offers.map((offer, i) => (
            <button
              key={i}
              onClick={() => navigate(offer.path)}
              className="group relative bg-card border border-border hover:border-primary transition-all duration-300 overflow-hidden text-left flex flex-col"
            >
              <div className="relative aspect-square bg-background overflow-hidden flex items-center justify-center p-2 md:p-6">
                <img
                  src={offer.image}
                  alt={offer.title}
                  loading="lazy"
                  className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute top-2 left-2 bg-primary text-primary-foreground text-[9px] md:text-[10px] font-bold tracking-wider px-2 py-1 uppercase">
                  {offer.badge}
                </span>
              </div>
              <div className="p-3 md:p-5 space-y-2 flex-1 flex flex-col">
                <h3 className="font-serif text-sm md:text-lg font-bold text-foreground leading-tight">
                  {offer.title}
                </h3>
                <p className="text-[11px] md:text-sm text-muted-foreground flex-1">{offer.description}</p>
                <div className="pt-2 inline-flex items-center gap-2 text-[10px] md:text-xs tracking-widest uppercase text-primary font-medium">
                  {offer.cta} →
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Ofertas;
