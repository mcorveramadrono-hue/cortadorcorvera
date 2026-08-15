import selloCorteOriginal from "@/assets/sello-corte-original.png";
import corveraLogo from "@/assets/corvera-logo.webp";
import fondoJamon from "@/assets/hero-textura-jamon.jpg";

const Hero = () => {
  return (
    <section
      id="inicio"
      className="relative min-h-screen w-full flex items-center justify-center bg-primary p-4 pt-24 pb-12 lg:p-8 lg:pt-28 overflow-hidden"
    >
      {/* Fondo textura jamón */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${fondoJamon})` }}
        aria-hidden="true"
      />
      <div className="absolute inset-0 bg-primary/85 mix-blend-multiply" aria-hidden="true" />
      <div
        className="absolute inset-0 bg-gradient-to-b from-corvera-dark/40 via-transparent to-corvera-dark/60"
        aria-hidden="true"
      />

      {/* Placa editorial central */}
      <div className="relative z-10 max-w-4xl w-full bg-corvera-cream px-6 py-12 md:p-16 lg:p-20 shadow-2xl">
        <div className="absolute inset-3 md:inset-4 border border-primary/10 pointer-events-none" aria-hidden="true" />
        <div className="absolute inset-5 md:inset-6 border border-primary/5 pointer-events-none" aria-hidden="true" />

        <div className="relative flex flex-col items-center text-center">
          <h1 className="sr-only">
            Corvera Ibéricos — Tienda oficial de jamón ibérico de bellota y cortador profesional a cuchillo en Madrid, envíos a toda España
          </h1>

          {/* Marca */}
          <div className="mb-8 flex flex-col items-center gap-3">
            <img
              src={corveraLogo}
              alt="Corvera Ibéricos - Jamón Ibérico de Bellota"
              width="448"
              height="160"
              fetchPriority="high"
              decoding="async"
              className="w-full max-w-xs md:max-w-md h-auto object-contain"
            />
            <span className="h-px w-12 bg-primary" aria-hidden="true" />
            <span className="text-primary text-xs md:text-sm tracking-[0.5em] uppercase font-medium">
              Ibéricos
            </span>
          </div>

          {/* Lema */}
          <div className="mb-10 max-w-lg space-y-4">
            <p className="text-corvera-dark/80 text-xl lg:text-2xl italic">Un corte original</p>
            <p className="text-corvera-dark/70 text-[11px] md:text-sm uppercase tracking-[0.2em] leading-relaxed">
              Cortador profesional a cuchillo · Selección de bellota
            </p>
          </div>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 mb-12 w-full sm:w-auto">
            <a
              href="#productos"
              className="px-10 py-4 bg-primary text-primary-foreground text-sm font-semibold tracking-widest uppercase hover:bg-primary/90 transition-colors duration-300 shadow-lg"
            >
              Ver Productos
            </a>
            <a
              href="#contacto"
              className="px-10 py-4 border border-primary text-primary text-sm font-semibold tracking-widest uppercase hover:bg-primary hover:text-primary-foreground transition-all duration-300"
            >
              Contactar
            </a>
          </div>

          {/* Señales de confianza + sello */}
          <div className="w-full flex flex-col md:flex-row items-center justify-between pt-10 border-t border-primary/10 gap-8">
            <div className="flex flex-col items-center md:items-start text-xs uppercase text-corvera-dark/60 font-medium">
              <span className="mb-1 tracking-[0.15em]">Envío gratuito</span>
              <span className="text-primary font-bold text-sm">Pedidos +20 kg</span>
            </div>

            <img
              src={selloCorteOriginal}
              alt="Sello Un Corte Original de Corvera Ibéricos"
              loading="lazy"
              className="w-24 h-24 object-contain mix-blend-multiply"
            />

            <div className="flex flex-col items-center md:items-end text-xs uppercase text-corvera-dark/60 font-medium">
              <span className="mb-1 tracking-[0.15em]">Maestría en el</span>
              <span className="text-primary font-bold text-sm">Corte a cuchillo</span>
            </div>
          </div>
        </div>
      </div>

      {/* Esquinas decorativas */}
      <div
        className="absolute top-24 left-10 w-32 h-32 border-t-2 border-l-2 border-corvera-cream/20 hidden lg:block"
        aria-hidden="true"
      />
      <div
        className="absolute bottom-10 right-10 w-32 h-32 border-b-2 border-r-2 border-corvera-cream/20 hidden lg:block"
        aria-hidden="true"
      />
    </section>
  );
};

export default Hero;
