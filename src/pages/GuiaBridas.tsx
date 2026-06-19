import { useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PromoBanner from "@/components/PromoBanner";
import bridaBlanca from "@/assets/brida-blanca.png";
import bridaVerde from "@/assets/brida-verde.png";
import bridaRoja from "@/assets/brida-roja.png";
import bridaNegra from "@/assets/brida-negra.png";

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
    document.title = "Bridas del Jamón Ibérico | Guía RD 4/2014";
    setMeta(
      "description",
      "Guía de las bridas del jamón ibérico (blanca, verde, roja, negra) según el RD 4/2014: raza, alimentación, curación y precio."
    );
    setMeta(
      "keywords",
      "bridas jamón ibérico, brida blanca, brida verde, brida roja, brida negra, precintos jamón ibérico, etiqueta jamón ibérico, RD 4/2014, norma calidad ibérico, jamón cebo ibérico, jamón cebo de campo ibérico, jamón bellota ibérico, jamón bellota 100% ibérico, diferencias jamón ibérico, cómo elegir jamón ibérico, qué significa la brida negra, qué significa la brida roja, qué significa la brida verde, qué significa la brida blanca, raza ibérica, dehesa, montanera, Corvera Ibéricos"
    );
    setMeta("og:title", "Guía de las Bridas del Jamón Ibérico (Blanca, Verde, Roja, Negra)", "property");
    setMeta(
      "og:description",
      "Diferencias entre brida blanca, verde, roja y negra del jamón ibérico según el RD 4/2014. Aprende a elegir antes de comprar.",
      "property"
    );
    setMeta("og:type", "article", "property");
    setMeta("og:url", "https://corveraibericos.com/guia-bridas-jamon-iberico", "property");
    setMeta("twitter:card", "summary_large_image");
    setMeta("twitter:title", "Bridas del Jamón Ibérico: Blanca, Verde, Roja y Negra");
    setMeta(
      "twitter:description",
      "Guía RD 4/2014 para diferenciar las bridas del jamón ibérico antes de comprar."
    );

    let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.setAttribute("rel", "canonical");
      document.head.appendChild(canonical);
    }
    canonical.setAttribute("href", "https://corveraibericos.com/guia-bridas-jamon-iberico");

    const ldArticle = document.createElement("script");
    ldArticle.type = "application/ld+json";
    ldArticle.text = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Article",
      headline: "Guía de las Bridas del Jamón Ibérico: Blanca, Verde, Roja y Negra",
      description:
        "Diferencias entre las cuatro bridas oficiales del jamón ibérico según el RD 4/2014: raza, alimentación, curación y precio.",
      author: { "@type": "Organization", name: "Corvera Ibéricos", url: "https://corveraibericos.com" },
      publisher: {
        "@type": "Organization",
        name: "Corvera Ibéricos",
        logo: { "@type": "ImageObject", url: "https://corveraibericos.com/favicon-192.png" },
      },
      mainEntityOfPage: {
        "@type": "WebPage",
        "@id": "https://corveraibericos.com/guia-bridas-jamon-iberico",
      },
      inLanguage: "es-ES",
      about: ["Jamón ibérico", "RD 4/2014", "Norma de calidad del ibérico"],
    });
    document.head.appendChild(ldArticle);

    const ldFaq = document.createElement("script");
    ldFaq.type = "application/ld+json";
    ldFaq.text = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "¿Qué significa la brida negra del jamón ibérico?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "La brida negra identifica al jamón ibérico de bellota 100%: cerdos de raza 100% ibérica certificada, alimentados exclusivamente con bellota y pastos naturales en la dehesa durante la montanera. Es la máxima categoría según el RD 4/2014.",
          },
        },
        {
          "@type": "Question",
          name: "¿Qué diferencia hay entre la brida roja y la brida negra?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Ambas son jamones de bellota, pero la brida negra exige 100% raza ibérica, mientras que la brida roja se obtiene de cerdos cruzados (50% o 75% ibérico). La alimentación de bellota en montanera es la misma; la diferencia está en la pureza genética.",
          },
        },
        {
          "@type": "Question",
          name: "¿Qué significa la brida verde?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "La brida verde corresponde al jamón ibérico de cebo de campo: cerdos criados al aire libre alimentados con piensos de cereales y legumbres complementados con pastos naturales del campo.",
          },
        },
        {
          "@type": "Question",
          name: "¿Qué significa la brida blanca?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "La brida blanca identifica al jamón ibérico de cebo, alimentado con piensos naturales de cereales y legumbres en granja. Es la categoría de entrada de la gama ibérica.",
          },
        },
        {
          "@type": "Question",
          name: "¿Cuál es la mejor brida del jamón ibérico?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "La brida negra es la categoría más alta (bellota 100% ibérico). La mejor opción depende del paladar y el presupuesto: la roja ofrece bellota a precio más accesible y la verde y blanca son ideales para consumo diario.",
          },
        },
      ],
    });
    document.head.appendChild(ldFaq);

    const ldBread = document.createElement("script");
    ldBread.type = "application/ld+json";
    ldBread.text = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Inicio", item: "https://corveraibericos.com/" },
        { "@type": "ListItem", position: 2, name: "Guías", item: "https://corveraibericos.com/guia-bridas-jamon-iberico" },
        { "@type": "ListItem", position: 3, name: "Bridas del Jamón Ibérico", item: "https://corveraibericos.com/guia-bridas-jamon-iberico" },
      ],
    });
    document.head.appendChild(ldBread);

    return () => {
      document.title = prevTitle;
      document.head.removeChild(ldArticle);
      document.head.removeChild(ldFaq);
      document.head.removeChild(ldBread);
    };
  }, []);

  const bridas = [
    {
      color: "Blanca",
      hex: "#F5F5F0",
      image: bridaBlanca,
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
      image: bridaVerde,
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
      image: bridaRoja,
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
      image: bridaNegra,
      tipo: "Ibérico de Bellota 100%",
      raza: "100% raza ibérica certificada",
      habitat: "Dehesa pura durante la montanera, en absoluta libertad.",
      alimentacion: "Exclusivamente bellota, hierba y recursos naturales de la dehesa.",
      curacion: "De 36 a 48 meses, e incluso más en piezas de gran reserva",
      precio: "Gama premium",
      descripcion:
        "La brida negra es la máxima distinción del ibérico. Identifica piezas de cerdos 100% raza ibérica alimentados exclusivamente con bellota durante la montanera. Sabor intenso y persistente, grasa infiltrada brillante y aroma profundo a dehesa.",
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
          <nav aria-label="Índice de la guía" className="mt-10 flex flex-wrap justify-center gap-3 text-sm">
            <a href="#brida-blanca" className="px-4 py-2 border border-border rounded-sm hover:bg-foreground hover:text-background transition-colors">Brida Blanca · Cebo</a>
            <a href="#brida-verde" className="px-4 py-2 border border-border rounded-sm hover:bg-foreground hover:text-background transition-colors">Brida Verde · Cebo de Campo</a>
            <a href="#brida-roja" className="px-4 py-2 border border-border rounded-sm hover:bg-foreground hover:text-background transition-colors">Brida Roja · Bellota</a>
            <a href="#brida-negra" className="px-4 py-2 border border-border rounded-sm hover:bg-foreground hover:text-background transition-colors">Brida Negra · Bellota 100%</a>
            <a href="#preguntas-frecuentes" className="px-4 py-2 border border-border rounded-sm hover:bg-foreground hover:text-background transition-colors">Preguntas frecuentes</a>
          </nav>
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
            <article
              key={b.color}
              id={`brida-${b.color.toLowerCase()}`}
              className="grid md:grid-cols-12 gap-10 items-start scroll-mt-28"
            >
              {/* Brida image */}
              <div className="md:col-span-5">
                <p className="text-center mb-2 text-sm tracking-[0.2em] uppercase text-primary font-medium">
                  {b.precio}
                </p>
                <div className="w-full flex items-center justify-center">
                  <img
                    src={b.image}
                    alt={`Sello oficial de brida ${b.color.toLowerCase()} para ${b.tipo.toLowerCase()} según el RD 4/2014 (raza ${b.raza.toLowerCase()})`}
                    className="w-full h-auto object-contain"
                    loading="lazy"
                  />
                </div>
              </div>

              {/* Content */}
              <div className="md:col-span-7">
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

        {/* FAQ visible */}
        <section id="preguntas-frecuentes" className="max-w-4xl mx-auto px-6 py-20 scroll-mt-28">
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-10">
            Preguntas frecuentes sobre las bridas del jamón ibérico
          </h2>
          <div className="space-y-8">
            <div>
              <h3 className="font-serif text-xl font-bold text-foreground mb-2">¿Qué significa la brida negra del jamón ibérico?</h3>
              <p className="text-muted-foreground leading-relaxed">La brida negra identifica al jamón ibérico de bellota 100%: cerdos de raza 100% ibérica certificada, alimentados exclusivamente con bellota y pastos naturales en la dehesa durante la montanera. Es la máxima categoría según el RD 4/2014.</p>
            </div>
            <div>
              <h3 className="font-serif text-xl font-bold text-foreground mb-2">¿Qué diferencia hay entre la brida roja y la brida negra?</h3>
              <p className="text-muted-foreground leading-relaxed">Ambas son jamones de bellota, pero la brida negra exige 100% raza ibérica, mientras que la brida roja se obtiene de cerdos cruzados (50% o 75% ibérico). La alimentación de bellota en montanera es la misma; la diferencia está en la pureza genética.</p>
            </div>
            <div>
              <h3 className="font-serif text-xl font-bold text-foreground mb-2">¿Qué significa la brida verde?</h3>
              <p className="text-muted-foreground leading-relaxed">La brida verde corresponde al jamón ibérico de cebo de campo: cerdos criados al aire libre alimentados con piensos de cereales y legumbres complementados con pastos naturales del campo.</p>
            </div>
            <div>
              <h3 className="font-serif text-xl font-bold text-foreground mb-2">¿Qué significa la brida blanca?</h3>
              <p className="text-muted-foreground leading-relaxed">La brida blanca identifica al jamón ibérico de cebo, alimentado con piensos naturales de cereales y legumbres en granja. Es la categoría de entrada de la gama ibérica.</p>
            </div>
            <div>
              <h3 className="font-serif text-xl font-bold text-foreground mb-2">¿Cuál es la mejor brida del jamón ibérico?</h3>
              <p className="text-muted-foreground leading-relaxed">La brida negra es la categoría más alta (bellota 100% ibérico). La mejor opción depende del paladar y el presupuesto: la roja ofrece bellota a precio más accesible y la verde y blanca son ideales para consumo diario.</p>
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
            <strong>negra</strong> es la cumbre del ibérico: reservada para celebraciones,
            regalos y momentos especiales.
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
