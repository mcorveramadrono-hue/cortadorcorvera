import corvera2 from "@/assets/corvera-2.jpeg";
import cerdo2 from "@/assets/cerdo-2.png";
import selloCorteOriginal from "@/assets/sello-corte-original.png";

const About = () => {
  return (
    <section className="relative py-24 bg-corvera-cream overflow-hidden">

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Images */}
          <div className="grid grid-cols-2 gap-4">
            <img
              src={corvera2}
              alt="Anatomía del jamón ibérico"
              className="w-full h-64 object-cover col-span-2"
            />
            <img
              src={cerdo2}
              alt="Cerdo ibérico"
              className="w-full h-48 object-contain bg-corvera-cream"
            />
            <div className="flex items-center justify-center p-6 bg-background">
              <img src={selloCorteOriginal} alt="Un Corte Original" className="w-28 h-28 object-contain" />
            </div>
          </div>

          {/* Text */}
          <div className="space-y-6">
            <p className="text-sm tracking-[0.3em] uppercase text-primary font-medium">
              Sobre Nosotros
            </p>
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground">
              La tradición del buen jamón
            </h2>
            <p className="text-muted-foreground leading-relaxed text-lg">
              Corvera Ibéricos nace de la pasión por el jamón ibérico y del profundo respeto por un oficio que combina tradición, técnica y sensibilidad.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Nuestro objetivo es claro: convertir cada oportunidad en un momento especial, donde los invitados no solo disfruten del jamón, sino también del arte de cortarlo.
            </p>
            <p className="text-muted-foreground leading-relaxed font-medium">
              Corvera Ibéricos es tradición, elegancia y respeto por el producto.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
