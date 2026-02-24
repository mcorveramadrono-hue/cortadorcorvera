import corvera2 from "@/assets/corvera-2.jpeg";
import cerdo2 from "@/assets/cerdo-2.png";
import selloCorteOriginal from "@/assets/sello-corte-original.png";
import jamonTexturaBg from "@/assets/jamon-textura-bg.jpeg";

const About = () => {
  return (
    <section className="relative py-24 bg-corvera-cream overflow-hidden">
      {/* Decorative background */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `url(${jamonTexturaBg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          opacity: 0.04,
        }}
      />

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
              className="w-full h-48 object-cover"
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
              Cortador Corvera nace de la pasión por el jamón ibérico y del profundo respeto por un oficio que combina tradición, técnica y sensibilidad.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Detrás de este proyecto está Marcos Corvera, cortador profesional, que entiende que cada pieza es única y que cada corte debe realzar su sabor, su textura y su esencia. El corte de jamón no es solo un servicio, es una experiencia que aporta valor, elegancia y distinción a cualquier evento.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              En Cortador Corvera cuidamos cada detalle: desde la selección y preparación de la pieza hasta la presentación final, ofreciendo siempre una imagen profesional y un trato cercano.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Nuestro objetivo es claro: convertir cada oportunidad en un momento especial, donde los invitados no solo disfruten del jamón, sino también del arte de cortarlo.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Trabajamos en bodas, celebraciones privadas y eventos de empresa, adaptándonos a cada ocasión con profesionalidad, presencia y pasión por la excelencia.
            </p>
            <p className="text-muted-foreground leading-relaxed font-medium">
              Cortador Corvera es tradición, elegancia y respeto por el producto.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
