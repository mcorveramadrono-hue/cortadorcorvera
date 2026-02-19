import heroImage from "@/assets/hero-jamon.jpg";
import corvera1 from "@/assets/corvera-1.jpeg";

const Hero = () => {
  return (
    <section id="inicio" className="relative min-h-screen flex items-center pt-20">
      <div className="max-w-7xl mx-auto px-6 w-full grid lg:grid-cols-2 gap-12 items-center">
        {/* Text */}
        <div className="space-y-8">
          <p className="text-sm tracking-[0.3em] uppercase text-primary font-medium">
            Jamón Ibérico de Bellota
          </p>
          <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.1] text-foreground">
            CORVERA
          </h1>
          <p className="font-serif text-2xl md:text-3xl italic text-muted-foreground">
            Un Corte Original
          </p>
          <p className="text-lg text-muted-foreground max-w-md leading-relaxed">
            El dinero no te puede dar la felicidad, pero sí te puede comprar un buen jamón.
          </p>
          <div className="flex gap-4 pt-4">
            <a
              href="#productos"
              className="inline-flex items-center justify-center px-8 py-3 bg-primary text-primary-foreground text-sm tracking-widest uppercase hover:bg-primary/90 transition-colors"
            >
              Ver Productos
            </a>
            <a
              href="#contacto"
              className="inline-flex items-center justify-center px-8 py-3 border border-foreground text-foreground text-sm tracking-widest uppercase hover:bg-foreground hover:text-background transition-colors"
            >
              Contactar
            </a>
          </div>
        </div>

        {/* Image */}
        <div className="relative">
          <img
            src={heroImage}
            alt="Jamón Ibérico de Bellota en jamonero"
            className="w-full h-[500px] lg:h-[600px] object-cover"
          />
          <img
            src={corvera1}
            alt="Corvera branding"
            className="absolute -bottom-6 -left-6 w-32 h-32 object-cover border-4 border-background shadow-lg hidden lg:block"
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
