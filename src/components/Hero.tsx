import selloCorteOriginal from "@/assets/sello-corte-original.png";
import fraseJamon from "@/assets/frase-jamon.png";
import corveraLogo from "@/assets/corvera-logo.webp";

const Hero = () => {
  return (
    <section id="inicio" className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden bg-background">
      <div className="relative z-10 max-w-5xl mx-auto px-6 w-full flex flex-col items-center text-center space-y-10 py-16">
        {/* CORVERA logo arriba */}
        <img
          src={corveraLogo}
          alt="Corvera"
          className="w-full max-w-md h-auto object-contain"
        />

        {/* Sello "Un Corte Original" */}
        <img
          src={selloCorteOriginal}
          alt="Un Corte Original"
          className="w-36 h-36 md:w-48 md:h-48 object-contain"
        />

        {/* Frase exacta como imagen */}
        <img
          src={fraseJamon}
          alt="El dinero no te puede dar la felicidad pero sí te puede comprar un buen jamón"
          className="w-full max-w-xl h-auto object-contain"
        />

        {/* CTA buttons */}
        <div className="flex flex-col sm:flex-row gap-4 pt-4">
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
    </section>
  );
};

export default Hero;
