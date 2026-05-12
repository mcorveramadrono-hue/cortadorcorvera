import { useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PromoBanner from "@/components/PromoBanner";

const setMeta = (name: string, content: string, attr: "name" | "property" = "name") => {
  let el = document.querySelector(`meta[${attr}="${name}"]`) as HTMLMetaElement | null;
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, name);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
};

const GuiaBridas = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
    const prevTitle = document.title;
    document.title = "Guía de las Bridas del Jamón Ibérico: Blanca, Verde, Roja y Negra";
    setMeta(
      "description",
      "Aprende a diferenciar las bridas del jamón ibérico (blanca, verde, roja y negra) según el RD 4/2014: raza, alimentación, curación y calidad. Guía de Corvera Ibéricos."
    );
    setMeta("og:title", "Guía de las Bridas del Jamón Ibérico", "property");
    setMeta(
      "og:description",
      "Diferencias entre brida blanca, verde, roja y negra del jamón ibérico. Cebo, cebo de campo, bellota y bellota 100% pata negra.",
      "property"
    );
    let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.setAttribute("rel", "canonical");
      document.head.appendChild(canonical);
    }
    canonical.setAttribute("href", "https://www.corveraibericos.com/guia-bridas-jamon-iberico");

    const ld = document.createElement("script");
    ld.type = "application/ld+json";
    ld.text = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Article",
      headline: "Guía de las Bridas del Jamón Ibérico: Blanca, Verde, Roja y Negra",
      description:
        "Diferencias entre las cuatro bridas oficiales del jamón ibérico según el RD 4/2014.",
      author: { "@type": "Organization", name: "Corvera Ibéricos" },
      publisher: { "@type": "Organization", name: "Corvera Ibéricos" },
    });
    document.head.appendChild(ld);
    return () => {
      document.title = prevTitle;
      document.head.removeChild(ld);
    };
  }, []);

  const bridas = [
    {
      color: "Blanca",
      hex: "#F5F5F0",
      border: "border-neutral-300",
      tipo: "Ibérico de Cebo",
      raza: "50%, 75% o 100% raza ibérica",
      habitat: "Granjas controladas con espacio y cuidados especializados que garantizan su bienestar.",
      alimentacion: "Piensos naturales a base de cereales y legumbres. Sabor suave y equilibrado.",
      curacion: "Entre 24 y 36 meses",
      precio: "Gama de entrada",
      descripcion:
        "La brida blanca identifica al jamón ibérico de cebo, la base de la gama ibérica. Es la señal visual que permite reconocer al instante un producto certificado por la norma de calidad del ibérico (RD 4/2014).",
    },
    {
      color: "Verde",
      hex: "#2F5D3A",
      border: "border-emerald-800",
      tipo: "Ibérico de Cebo de Campo",
      raza: "50%, 75% o 100% raza ibérica",
      habitat: "Cerdos criados al aire libre, en dehesas o campos abiertos, con mayor libertad de movimiento.",
      alimentacion: "Piensos de cereales y legumbres complementados con pastos naturales del campo.",
      curacion: "Entre 24 y 36 meses",
      precio: "Gama media",
      descripcion:
        "La brida verde señala un ibérico de cebo de campo: una crianza más natural, con mayor libertad y calidad que el cebo tradicional. El ejercicio y el contacto con el entorno aportan al jamón un sabor más profundo y una textura más jugosa.",
    },
    {
      color: "Roja",
      hex: "#8B2020",
      border: "border-primary",
      tipo: "Ibérico de Bellota",
      raza: "50% o 75% raza ibérica",
      habitat: "Dehesa durante la montanera (octubre a marzo), donde campan en libertad.",
      alimentacion: "Bellota y pastos naturales de la dehesa durante la montanera.",
      curacion: "Entre 36 y 42 meses",
      precio: "Gama alta",
      descripcion:
        "La brida roja distingue al jamón ibérico de bellota cuyos cerdos no son 100% de raza ibérica. Combina la calidad de la alimentación de bellota con un cruce genético, ofreciendo un equilibrio excepcional entre sabor, infiltración de grasa y precio.",
    },
    {
      color: "Negra",
      hex: "#111111",
      border: "border-black",
      tipo: "Ibérico de Bellota 100%",
      raza: "100% raza ibérica certificada (pata negra)",
      habitat: "Dehesa pura durante la montanera, en absoluta libertad.",
      alimentacion: "Exclusivamente bellota, hierba y recursos naturales de la dehesa.",
      curacion: "De 36 a 48 meses, e incluso más en piezas de gran reserva",
      precio: "Gama premium",
      descripcion:
        "La brida negra es la máxima distinción del ibérico: el conocido 'pata negra'. Identifica piezas de cerdos 100% raza ibérica alimentados exclusivamente con bellota durante la montanera. Sabor intenso y persistente, grasa infiltrada brillante y aroma profundo a dehesa.",
    },
  ];

  return (
    <div className="min-h-screen bg-background">

      <PromoBanner />
      <Header />

      <main className="pt-24 md:pt-28">
        {/* Hero */}
        <section className="max-w-5xl mx-auto px-6 pt-12 pb-16 text-center">
          <p className="text-sm tracking-[0.3em] uppercase text-primary font-medium mb-4">
            Guía del Consumidor
          </p>
          <h1 className="font-serif text-4xl md:text-6xl font-bold text-foreground mb-6 leading-tight">
            Las Bridas del Jamón Ibérico
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Blanca, verde, roja y negra. Cuatro precintos de colores que, según la norma de
            calidad del ibérico (Real Decreto 4/2014), te dicen exactamente qué jamón estás
            comprando. Aprende a reconocerlos antes de elegir.
          </p>
        </section>

        {/* Por qué importan */}
        <section className="bg-corvera-cream py-16">
          <div className="max-w-4xl mx-auto px-6">
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-6">
              ¿Por qué es importante mirar la brida?
            </h2>
            <p className="text-muted-foreground leading-relaxed text-lg mb-4">
              La brida (o precinto) es el sello oficial que cada pieza de jamón ibérico lleva en
              la pata desde el matadero. Su color identifica de un vistazo la <strong>raza</strong>{" "}
              del cerdo y el <strong>tipo de alimentación</strong> que ha recibido, los dos
              factores que más influyen en el sabor, la textura y el precio del jamón.
            </p>
            <p className="text-muted-foreground leading-relaxed text-lg">
              Si no sabes lo que compras, no sabes lo que comes. Esta guía te ayuda a entender
              cada categoría para que elijas con criterio.
            </p>
          </div>
        </section>

        {/* Bridas */}
        <section className="max-w-6xl mx-auto px-6 py-20 space-y-20">
          {bridas.map((b, i) => (
            <article key={b.color} className="grid md:grid-cols-12 gap-10 items-start">
              {/* Color block */}
              <div className="md:col-span-4">
                <div
                  className={`aspect-square w-full rounded-sm border ${b.border} shadow-sm flex flex-col items-center justify-center`}
                  style={{ backgroundColor: b.hex }}
                >
                  <span
                    className="font-serif text-2xl md:text-3xl font-bold tracking-wide"
                    style={{
                      color:
                        b.color === "Blanca" ? "#111" : "#fff",
                    }}
                  >
                    Brida
                  </span>
                  <span
                    className="font-serif text-4xl md:text-5xl font-bold tracking-wide"
                    style={{
                      color:
                        b.color === "Blanca" ? "#111" : "#fff",
                    }}
                  >
                    {b.color}
                  </span>
                </div>
                <p className="text-center mt-4 text-sm tracking-[0.2em] uppercase text-primary font-medium">
                  {b.precio}
                </p>
              </div>

              {/* Content */}
              <div className="md:col-span-8">
                <p className="text-sm tracking-[0.3em] uppercase text-muted-foreground mb-3">
                  Categoría {i + 1} de 4
                </p>
                <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-4">
                  {b.tipo}
                </h2>
                <p className="text-muted-foreground leading-relaxed text-lg mb-8">
                  {b.descripcion}
                </p>

                <div className="grid sm:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-serif text-xl font-bold text-foreground mb-2">
                      Raza ibérica
                    </h3>
                    <p className="text-muted-foreground">{b.raza}</p>
                  </div>
                  <div>
                    <h3 className="font-serif text-xl font-bold text-foreground mb-2">
                      Hábitat
                    </h3>
                    <p className="text-muted-foreground">{b.habitat}</p>
                  </div>
                  <div>
                    <h3 className="font-serif text-xl font-bold text-foreground mb-2">
                      Alimentación
                    </h3>
                    <p className="text-muted-foreground">{b.alimentacion}</p>
                  </div>
                  <div>
                    <h3 className="font-serif text-xl font-bold text-foreground mb-2">
                      Curación
                    </h3>
                    <p className="text-muted-foreground">{b.curacion}</p>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </section>

        {/* Tabla resumen */}
        <section className="bg-corvera-cream py-20">
          <div className="max-w-6xl mx-auto px-6">
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-10 text-center">
              Tabla comparativa rápida
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse bg-background">
                <thead>
                  <tr className="border-b-2 border-foreground">
                    <th className="p-4 font-serif font-bold">Brida</th>
                    <th className="p-4 font-serif font-bold">Categoría</th>
                    <th className="p-4 font-serif font-bold">Raza</th>
                    <th className="p-4 font-serif font-bold">Alimentación</th>
                    <th className="p-4 font-serif font-bold">Curación</th>
                  </tr>
                </thead>
                <tbody>
                  {bridas.map((b) => (
                    <tr key={b.color} className="border-b border-border">
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <span
                            className="inline-block w-5 h-5 rounded-full border border-neutral-300"
                            style={{ backgroundColor: b.hex }}
                          />
                          <span className="font-medium">{b.color}</span>
                        </div>
                      </td>
                      <td className="p-4 text-muted-foreground">{b.tipo}</td>
                      <td className="p-4 text-muted-foreground">{b.raza}</td>
                      <td className="p-4 text-muted-foreground">
                        {b.alimentacion.split(".")[0]}.
                      </td>
                      <td className="p-4 text-muted-foreground">{b.curacion}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Conclusión */}
        <section className="max-w-4xl mx-auto px-6 py-20">
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-6">
            ¿Cuál elegir?
          </h2>
          <p className="text-muted-foreground leading-relaxed text-lg mb-4">
            No hay una brida "mejor" en términos absolutos: depende de la ocasión, el paladar y
            el presupuesto. La <strong>brida blanca</strong> y la <strong>verde</strong> son
            ideales para el consumo diario y para introducirse en el mundo del ibérico. La{" "}
            <strong>roja</strong> ofrece la experiencia bellota a un precio más accesible. La{" "}
            <strong>negra</strong>, el conocido <em>pata negra</em>, es la cumbre del ibérico:
            reservada para celebraciones, regalos y momentos especiales.
          </p>
          <p className="text-muted-foreground leading-relaxed text-lg mb-8">
            En <strong>Corvera Ibéricos</strong> trabajamos cada categoría con piezas
            seleccionadas y curadas en su tiempo justo. Si tienes dudas sobre qué jamón
            comprar, escríbenos y te asesoramos sin compromiso.
          </p>
          <div className="flex flex-wrap gap-4">
            <a
              href="/tienda"
              className="inline-block bg-primary text-primary-foreground px-8 py-4 font-medium tracking-wide hover:bg-primary/90 transition-colors"
            >
              Ver nuestra tienda
            </a>
            <a
              href="/#contacto"
              className="inline-block border border-foreground text-foreground px-8 py-4 font-medium tracking-wide hover:bg-foreground hover:text-background transition-colors"
            >
              Contactar
            </a>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default GuiaBridas;
