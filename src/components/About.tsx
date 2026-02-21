import corvera2 from "@/assets/corvera-2.jpeg";
import corvera3 from "@/assets/corvera-3.jpeg";
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
              src={corvera3}
              alt="Textura del jamón Corvera"
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
              En Corvera, cada pieza cuenta una historia. Seleccionamos los mejores jamones ibéricos 
              de bellota, criados en las dehesas extremeñas, con una curación que respeta los tiempos 
              y la tradición artesanal.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Nuestro compromiso es llevar a tu mesa un producto excepcional, con el sabor auténtico 
              que solo un jamón ibérico de la más alta calidad puede ofrecer. Cada corte es una 
              experiencia única.
            </p>
            <div className="grid grid-cols-3 gap-6 pt-6">
              <div className="text-center">
                <p className="font-serif text-3xl font-bold text-primary">+15</p>
                <p className="text-xs tracking-widest uppercase text-muted-foreground mt-1">Años</p>
              </div>
              <div className="text-center">
                <p className="font-serif text-3xl font-bold text-primary">100%</p>
                <p className="text-xs tracking-widest uppercase text-muted-foreground mt-1">Ibérico</p>
              </div>
              <div className="text-center">
                <p className="font-serif text-3xl font-bold text-primary">+36</p>
                <p className="text-xs tracking-widest uppercase text-muted-foreground mt-1">Meses</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
