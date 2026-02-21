import logoMC from "@/assets/logo-mc.png";
import selloCorteOriginal from "@/assets/sello-corte-original.png";
import fraseJamon from "@/assets/frase-jamon.png";
import jamonTexturaBg from "@/assets/jamon-textura-bg.jpeg";
import brandPageBg from "@/assets/brand-page-bg.jpeg";
import bellota from "@/assets/bellota.png";
import jamon1 from "@/assets/jamon-1.png";

const Hero = () => {
  return (
    <section id="inicio" className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
      {/* Background image with heavy blur and fade */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `url(${brandPageBg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          filter: "blur(30px)",
          opacity: 0.12,
          transform: "scale(1.1)",
        }}
      />
      {/* Second subtle texture layer */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `url(${jamonTexturaBg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          opacity: 0.04,
        }}
      />
      {/* Gradient fade overlay */}
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-background/80 via-background/40 to-background/90" />

      {/* Decorative illustrations */}
      <img
        src={bellota}
        alt=""
        className="absolute top-32 left-8 w-16 md:w-24 h-auto opacity-[0.06] pointer-events-none select-none"
      />
      <img
        src={jamon1}
        alt=""
        className="absolute bottom-20 right-8 w-24 md:w-36 h-auto opacity-[0.05] pointer-events-none select-none"
      />

      <div className="relative z-10 max-w-5xl mx-auto px-6 w-full flex flex-col items-center text-center space-y-10 py-16">
        {/* Sello "Un Corte Original" */}
        <img
          src={selloCorteOriginal}
          alt="Un Corte Original"
          className="w-36 h-36 md:w-48 md:h-48 object-contain"
        />

        {/* Logo MC */}
        <img
          src={logoMC}
          alt="MC Logo Corvera"
          className="w-16 md:w-20 h-auto"
        />

        {/* Frase exacta como imagen */}
        <img
          src={fraseJamon}
          alt="El dinero no te puede dar la felicidad pero sí te puede comprar un buen jamón"
          className="w-full max-w-xl h-auto object-contain"
        />

        {/* CORVERA title */}
        <h1 className="font-serif text-6xl md:text-8xl lg:text-9xl font-bold tracking-tight text-foreground leading-none">
          CORVERA
        </h1>

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
