import cortadorMaestro from "@/assets/hero-cortador-maestro.jpg";
import veteadoIberico from "@/assets/hero-veteado-iberico.jpg";

const Hero = () => {
  return (
    <section
      id="inicio"
      className="min-h-screen w-full flex items-center justify-center bg-background px-4 pt-24 pb-10 lg:px-12 lg:pt-28 lg:pb-12"
    >
      <div className="relative w-full max-w-7xl min-h-[85vh] bg-primary shadow-2xl overflow-hidden flex flex-col lg:flex-row">
        {/* Textura sutil de fondo */}
        <div
          className="absolute inset-0 opacity-15 pointer-events-none mix-blend-multiply"
          style={{
            backgroundImage:
              "radial-gradient(circle at 2px 2px, hsl(var(--corvera-cream) / 0.1) 1px, transparent 0)",
            backgroundSize: "24px 24px",
          }}
          aria-hidden="true"
        />

        {/* Panel de contenido */}
        <div className="relative z-20 w-full lg:w-3/5 flex flex-col justify-between p-8 lg:p-20 text-corvera-cream">
          <div className="flex justify-between items-start gap-6">
            <div>
              <p className="text-4xl lg:text-5xl font-medium tracking-[0.12em] leading-none mb-2">
                CORVERA
              </p>
              <p className="text-xs lg:text-sm tracking-[0.5em] font-light text-corvera-cream/80 uppercase">
                Ibéricos
              </p>
            </div>

            {/* Sello de calidad */}
            <div className="hidden sm:flex shrink-0 items-center justify-center w-24 h-24 border border-corvera-cream/30 rounded-full text-center">
              <span className="text-[9px] uppercase tracking-[0.2em] leading-tight px-2 text-corvera-cream/90">
                Un Corte
                <br />
                Original
              </span>
            </div>
          </div>

          <div className="max-w-xl my-12 lg:my-0">
            <span className="block text-corvera-cream/60 text-xs md:text-sm uppercase tracking-[0.3em] mb-6 font-medium">
              Jamón ibérico de bellota · Madrid
            </span>
            <h1 className="text-5xl lg:text-8xl font-medium leading-[0.95] tracking-tight mb-6">
              Un corte
              <br />
              <span className="italic font-light">original.</span>
            </h1>
            <p className="text-corvera-cream/80 text-base lg:text-lg leading-relaxed max-w-md mb-10">
              Selección de jamones y paletas de bellota de las mejores marcas, con
              cortador profesional a cuchillo y envío a toda España.
            </p>

            <div className="flex flex-wrap gap-5">
              <a
                href="#productos"
                className="px-10 py-4 bg-corvera-cream text-primary text-xs font-bold uppercase tracking-widest hover:bg-corvera-dark hover:text-corvera-cream transition-all duration-500"
              >
                Ver Productos
              </a>
              <a
                href="#contacto"
                className="px-10 py-4 border border-corvera-cream/40 text-corvera-cream text-xs font-bold uppercase tracking-widest hover:border-corvera-cream hover:bg-corvera-cream/10 transition-all duration-500"
              >
                Contactar
              </a>
            </div>
          </div>

          {/* Señales de confianza */}
          <div className="flex flex-col sm:flex-row gap-6 lg:gap-12">
            <div className="flex items-center gap-4">
              <span className="w-8 h-px bg-corvera-cream/30" aria-hidden="true" />
              <p className="text-[10px] uppercase tracking-[0.2em] text-corvera-cream/70 font-medium">
                Envío gratuito +20 kg
              </p>
            </div>
            <div className="flex items-center gap-4">
              <span className="w-8 h-px bg-corvera-cream/30" aria-hidden="true" />
              <p className="text-[10px] uppercase tracking-[0.2em] text-corvera-cream/70 font-medium">
                Maestría en el corte a cuchillo
              </p>
            </div>
          </div>
        </div>

        {/* Panel visual */}
        <div className="relative w-full lg:w-2/5 min-h-[450px] lg:min-h-full overflow-hidden">
          <div className="absolute inset-0 z-0 bg-corvera-dark">
            <img
              src={cortadorMaestro}
              alt="Cortador profesional de Corvera Ibéricos cortando jamón ibérico de bellota a cuchillo"
              width={800}
              height={1200}
              fetchPriority="high"
              decoding="async"
              className="w-full h-full object-cover"
            />
          </div>

          <div
            className="absolute inset-0 z-10 hidden lg:block bg-gradient-to-r from-primary via-primary/20 to-transparent"
            aria-hidden="true"
          />

          {/* Detalle de veteado */}
          <div className="absolute bottom-12 -left-16 z-20 hidden xl:block w-56 h-72 border-[10px] border-primary shadow-2xl overflow-hidden rotate-2">
            <img
              src={veteadoIberico}
              alt="Veteado y grasa infiltrada de lonchas de jamón ibérico de bellota"
              width={704}
              height={944}
              loading="lazy"
              className="w-full h-full object-cover"
            />
          </div>

          <div
            className="absolute top-8 right-8 w-12 h-12 border-t border-r border-corvera-cream/20"
            aria-hidden="true"
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
