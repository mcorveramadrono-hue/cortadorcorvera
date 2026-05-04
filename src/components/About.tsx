import cajaZonas from "@/assets/corvera-caja-zonas.png";

const About = () => {
  return (
    <section id="sobre-nosotros" className="relative py-24 bg-corvera-cream overflow-hidden" aria-label="Sobre Corvera Ibéricos">
      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-5 gap-12 items-center">
          {/* Image */}
          <div className="lg:col-span-3 flex items-center justify-center lg:-ml-8">
            <img
              src={cajaZonas}
              alt="Caja Corvera Ibéricos con jamón separado por zonas: maza, babilla, punta y jarrete"
              className="w-full h-auto object-contain scale-110"
            />
          </div>

          {/* Text */}
          <div className="space-y-6">
            <p className="text-sm tracking-[0.3em] uppercase text-primary font-medium">
              Sobre Nosotros
            </p>
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground">
              Un corte original
            </h2>
            <p className="text-muted-foreground leading-relaxed text-lg">
              En <strong>Corvera Ibéricos</strong> no solo vendemos jamón, creamos una experiencia gastronómica distinta. Sabemos que cada pieza es única y que el sabor no es igual en todas sus partes, por eso respetamos esa diferencia y la convertimos en el centro de nuestra propuesta.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              En lugar de presentar el jamón "todo mezclado", lo cortamos y envasamos separando sus zonas: <strong>maza, babilla, punta y jarrete</strong>. Así, el cliente puede descubrir cómo cambian la textura, el aroma y la intensidad dentro de la misma pieza, convirtiendo cada degustación en un auténtico recorrido por el jamón.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Nuestra forma de presentar el producto transforma algo tradicional en una experiencia nueva. No se trata solo de abrir una caja de sobres, sino de entender, disfrutar y compartir el jamón de una manera que, una vez descubierta, ya no se vuelve a ver igual.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
