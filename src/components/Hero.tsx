import logoMC from "@/assets/logo-mc.png";
import selloCorteOriginal from "@/assets/sello-corte-original.png";
import fraseJamon from "@/assets/frase-jamon.png";
import jamonTexturaBg from "@/assets/jamon-textura-bg.jpeg";

const Hero = () => {
  return (
    <section id="inicio" className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
      {/* Subtle background image */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `url(${jamonTexturaBg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          opacity: 0.06,
        }}
      />

      <div className="relative z-10 max-w-5xl mx-auto px-6 w-full flex flex-col items-center text-center space-y-12 py-16">
        {/* Sello "Un Corte Original" */}
        <img
          src={selloCorteOriginal}
          alt="Un Corte Original"
          className="w-40 h-40 md:w-52 md:h-52 object-contain"
        />

        {/* Logo MC */}
        <img
          src={logoMC}
          alt="MC Logo Corvera"
          className="w-20 h-auto"
        />

        {/* Frase exacta como imagen */}
        <img
          src={fraseJamon}
          alt="El dinero no te puede dar la felicidad pero sí te puede comprar un buen jamón"
          className="w-full max-w-2xl h-auto object-contain"
        />

        {/* CORVERA title */}
        <h1 className="font-serif text-7xl md:text-8xl lg:text-9xl font-bold tracking-tight text-foreground leading-none">
          CORVERA
        </h1>

        {/* CTA buttons */}
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
    </section>
  );
};

export default Hero;
