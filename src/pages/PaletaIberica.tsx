import { useEffect } from "react";
import { Link } from "react-router-dom";
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

const PAGE_URL = "https://corveraibericos.com/paleta-iberica-de-bellota";

const PaletaIberica = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
    const prevTitle = document.title;
    document.title = "Paleta Ibérica de Bellota Online | D.O.P. Guijuelo | Corvera";
    setMeta(
      "description",
      "Paleta ibérica de bellota online: 100%, 75% y 50% raza ibérica. D.O.P. Guijuelo, Jabugo y Extremadura. Pieza entera, deshuesada o loncheada. Envío España."
    );
    setMeta(
      "keywords",
      "paleta ibérica de bellota, comprar paleta ibérica, paleta ibérica online, paleta bellota 100%, paleta bellota 75%, paleta bellota 50%, paleta pata negra, paleta DOP Guijuelo, paleta DOP Jabugo, paleta ibérica Extremadura, paleta ibérica cebo de campo, paleta ibérica envío gratis, paleta ibérica loncheada, paleta ibérica deshuesada, mejor paleta ibérica, paleta ibérica precio, Corvera Ibéricos"
    );
    setMeta("og:title", "Comprar Paleta Ibérica de Bellota Online | Corvera Ibéricos", "property");
    setMeta(
      "og:description",
      "Paleta ibérica de bellota 100%, 75% y 50% raza ibérica. D.O.P. Guijuelo y Jabugo. Envío a toda España.",
      "property"
    );
    setMeta("og:type", "website", "property");
    setMeta("og:url", PAGE_URL, "property");
    setMeta("twitter:card", "summary_large_image");
    setMeta("twitter:title", "Comprar Paleta Ibérica de Bellota Online");
    setMeta("twitter:description", "Paleta ibérica 100%, 75% y 50% — D.O.P. y dehesa. Envío España.");

    let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.setAttribute("rel", "canonical");
      document.head.appendChild(canonical);
    }
    canonical.setAttribute("href", PAGE_URL);

    const ld = [
      {
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        name: "Comprar paleta ibérica de bellota online",
        description: "Paletas ibéricas de bellota 100%, 75% y 50% de las mejores D.O.P. españolas.",
        url: PAGE_URL,
        inLanguage: "es-ES",
      },
      {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Inicio", item: "https://corveraibericos.com/" },
          { "@type": "ListItem", position: 2, name: "Tienda", item: "https://corveraibericos.com/tienda" },
          { "@type": "ListItem", position: 3, name: "Paleta ibérica de bellota", item: PAGE_URL },
        ],
      },
      {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: [
          {
            "@type": "Question",
            name: "¿Cuánto pesa una paleta ibérica?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Una paleta ibérica entera pesa entre 4,5 y 6 kg de media. El rendimiento útil tras deshuesar ronda el 50-55%.",
            },
          },
          {
            "@type": "Question",
            name: "¿Cuánto dura la curación de una paleta ibérica?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Entre 24 y 36 meses para las paletas de bellota. Al tener menos masa que el jamón, su curación es más corta pero igualmente intensa.",
            },
          },
          {
            "@type": "Question",
            name: "¿Es mejor jamón o paleta ibérica?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Ambos provienen del mismo cerdo. La paleta tiene un sabor más intenso y curación más corta; el jamón es más equilibrado y dura más. La paleta es la opción ideal para consumo en menos tiempo y mejor relación calidad-precio.",
            },
          },
        ],
      },
    ];

    const scripts = ld.map((obj) => {
      const s = document.createElement("script");
      s.type = "application/ld+json";
      s.text = JSON.stringify(obj);
      document.head.appendChild(s);
      return s;
    });

    return () => {
      document.title = prevTitle;
      scripts.forEach((s) => document.head.removeChild(s));
    };
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <PromoBanner />
      <Header />

      <main className="pt-24 md:pt-28">
        <section className="max-w-4xl mx-auto px-6 pt-12 pb-12 text-center">
          <p className="text-sm tracking-[0.3em] uppercase text-primary font-medium mb-4">
            Tienda online · Envío a toda España
          </p>
          <h1 className="font-serif text-4xl md:text-6xl font-bold text-foreground mb-6 leading-tight">
            Paleta Ibérica de Bellota
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Paletas ibéricas <strong>100%, 75% y 50%</strong> raza ibérica de Guijuelo, Jabugo y
            Extremadura. Curación de 24 a 36 meses. Pieza entera, deshuesada al vacío o
            loncheada a cuchillo.
          </p>
          <div className="mt-8 flex flex-wrap gap-4 justify-center">
            <Link to="/tienda" className="inline-block bg-primary text-primary-foreground px-8 py-4 font-medium tracking-wide hover:bg-primary/90 transition-colors">
              Ver paletas en tienda
            </Link>
            <Link to="/comprar-jamon-iberico-de-bellota" className="inline-block border border-foreground text-foreground px-8 py-4 font-medium tracking-wide hover:bg-foreground hover:text-background transition-colors">
              Ver jamones
            </Link>
          </div>
        </section>

        <section className="bg-corvera-cream py-16">
          <div className="max-w-4xl mx-auto px-6">
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-6">
              ¿Por qué elegir paleta ibérica?
            </h2>
            <ul className="space-y-3 text-muted-foreground text-lg leading-relaxed">
              <li>✔ Sabor más intenso y aromático que el jamón.</li>
              <li>✔ Curación más corta — perfecta para consumir antes.</li>
              <li>✔ Mejor relación calidad-precio dentro del ibérico de bellota.</li>
              <li>✔ Ideal para hogares pequeños o consumo más rápido.</li>
              <li>✔ Disponible en pieza entera, deshuesada o loncheada a cuchillo.</li>
            </ul>
          </div>
        </section>

        <section className="max-w-4xl mx-auto px-6 py-16">
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-8">
            Preguntas frecuentes
          </h2>
          <div className="space-y-8">
            <div>
              <h3 className="font-serif text-xl font-bold text-foreground mb-2">¿Cuánto pesa una paleta ibérica?</h3>
              <p className="text-muted-foreground leading-relaxed">Entre 4,5 y 6 kg de media. El rendimiento útil tras deshuesar ronda el 50-55%.</p>
            </div>
            <div>
              <h3 className="font-serif text-xl font-bold text-foreground mb-2">¿Cuánto dura la curación de una paleta ibérica?</h3>
              <p className="text-muted-foreground leading-relaxed">Entre 24 y 36 meses para las paletas de bellota. Al tener menos masa que el jamón, la curación es más corta pero igualmente intensa.</p>
            </div>
            <div>
              <h3 className="font-serif text-xl font-bold text-foreground mb-2">¿Es mejor jamón o paleta ibérica?</h3>
              <p className="text-muted-foreground leading-relaxed">La paleta tiene sabor más intenso y curación más corta; el jamón es más equilibrado y dura más. La paleta es ideal para consumo en menos tiempo y mejor relación calidad-precio.</p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default PaletaIberica;
