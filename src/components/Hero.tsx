import selloCorteOriginal from "@/assets/sello-corte-original.png";
import corveraLogo from "@/assets/corvera-logo.webp";
import fondoJamon from "@/assets/hero-textura-jamon.jpg";

const Hero = () => {
  return (
    <section
      id="inicio"
      className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden bg-primary"
    >
      {/* Fondo textura jamón */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${fondoJamon})` }}
        aria-hidden="true"
      />
      <div className="absolute inset-0 bg-primary/80 mix-blend-multiply" aria-hidden="true" />
      <div className="absolute inset-0 bg-gradient-to-b from-corvera-dark/50 via-transparent to-corvera-dark/70" aria-hidden="true" />

      <div className="relative z-10 w-full max-w-3xl mx-auto px-6 py-20 flex flex-col items-center text-center">
        <h1 className="sr-only">
          Corvera Ibéricos — Tienda Oficial de Jamón Ibérico y Cortador Profesional a Cuchillo en Madrid, envíos a toda España
        </h1>
        <p className="sr-only">
          Comprar jamón ibérico de bellota online de las marcas César Nieto, La Joya, Epicum y Finura, paleta ibérica D.O.P. Guijuelo y Extremadura, y servicio de cortador de jamón a cuchillo para bodas y eventos. Tienda oficial Corvera Ibéricos.
        </p>

        {/* Placa crema con la marca */}
        <div className="w-full bg-corvera-cream shadow-2xl px-8 py-10 md:px-16 md:py-14 flex flex-col items-center gap-5">
          <img
            src={corveraLogo}
            alt="Corvera Ibéricos - Jamón Ibérico de Bellota"
            width="448"
            height="160"
            fetchPriority="high"
            decoding="async"
            className="w-full max-w-sm md:max-w-md h-auto object-contain"
          />
          <span className="text-corvera-dark text-sm md:text-base tracking-[0.55em] uppercase">
            Ibéricos
          </span>
          {/* Sello (contiene el lema "Un corte original") */}
          <img
            src={selloCorteOriginal}
            alt="Un Corte Original"
            className="w-24 h-24 md:w-28 md:h-28 object-contain mt-2 mix-blend-multiply"
          />
        </div>

        {/* Frase */}
        <img
          src={fraseJamon}
          alt="El dinero no te puede dar la felicidad pero sí te puede comprar un buen jamón"
          loading="lazy"
          decoding="async"
          className="w-full max-w-2xl h-auto object-contain mt-10 opacity-95"
        />


        

        {/* CTA buttons */}
        <div className="flex flex-col sm:flex-row gap-4 mt-8">
          <a
            href="#productos"
            className="inline-flex items-center justify-center px-8 py-3 bg-corvera-cream text-corvera-dark text-sm tracking-widest uppercase hover:bg-corvera-cream/90 transition-colors"
          >
            Ver Productos
          </a>
          <a
            href="#contacto"
            className="inline-flex items-center justify-center px-8 py-3 border border-corvera-cream text-corvera-cream text-sm tracking-widest uppercase hover:bg-corvera-cream hover:text-corvera-dark transition-colors"
          >
            Contactar
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;
