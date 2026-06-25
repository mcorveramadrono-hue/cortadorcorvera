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

const PAGE_URL = "https://corveraibericos.com/comprar-jamon-iberico-de-bellota";

const ComprarJamonBellota = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
    const prevTitle = document.title;
    document.title = "Comprar Jamón Ibérico de Bellota Online | Envío España | Corvera";
    setMeta(
      "description",
      "Comprar jamón ibérico de bellota online: piezas seleccionadas de Guijuelo, Jabugo y Extremadura. 100%, 75% y 50% raza ibérica. Envío a toda España."
    );
    setMeta(
      "keywords",
      "comprar jamón ibérico de bellota, comprar jamón bellota online, jamón ibérico bellota online, jamón bellota 100%, jamón bellota 75%, jamón bellota 50%, pata negra online, comprar pata negra, jamón ibérico DOP Guijuelo, jamón DOP Jabugo, jamón ibérico Extremadura, jamón bellota envío gratis, jamón bellota península, mejor jamón ibérico online, jamón bellota precio, jamón bellota pieza entera, jamón bellota loncheado, Corvera Ibéricos"
    );
    setMeta("og:title", "Comprar Jamón Ibérico de Bellota Online | Corvera Ibéricos", "property");
    setMeta(
      "og:description",
      "Jamón ibérico de bellota de Guijuelo, Jabugo y Extremadura. Pieza entera, deshuesado o loncheado. Envío a toda España.",
      "property"
    );
    setMeta("og:type", "website", "property");
    setMeta("og:url", PAGE_URL, "property");
    setMeta("twitter:card", "summary_large_image");
    setMeta("twitter:title", "Comprar Jamón Ibérico de Bellota Online");
    setMeta("twitter:description", "Piezas seleccionadas con curaciones de 36-48 meses. Envío a toda España.");

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
        name: "Comprar jamón ibérico de bellota online",
        description:
          "Selección de jamones ibéricos de bellota 100%, 75% y 50% raza ibérica de las mejores zonas productoras de España.",
        url: PAGE_URL,
        inLanguage: "es-ES",
      },
      {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Inicio", item: "https://corveraibericos.com/" },
          { "@type": "ListItem", position: 2, name: "Tienda", item: "https://corveraibericos.com/tienda" },
          { "@type": "ListItem", position: 3, name: "Jamón ibérico de bellota", item: PAGE_URL },
        ],
      },
      {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: [
          {
            "@type": "Question",
            name: "¿Cuál es la diferencia entre jamón bellota 100%, 75% y 50%?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "El porcentaje indica la pureza de raza ibérica del cerdo. El 100% (brida negra) es raza ibérica pura; el 75% y 50% (brida roja) son cruces con cerda Duroc. Los tres se han alimentado de bellota en la dehesa durante la montanera.",
            },
          },
          {
            "@type": "Question",
            name: "¿Cuánto tarda el envío?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Enviamos a toda la península en 24-72 horas laborables. Envío gratuito en pedidos superiores a 20 kg.",
            },
          },
          {
            "@type": "Question",
            name: "¿Puedo comprar el jamón loncheado a cuchillo?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Sí. Ofrecemos la pieza entera, deshuesada al vacío o loncheada a cuchillo y envasada al vacío en sobres de 90 g.",
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

  const marcas = [
    { slug: "cesar-nieto", nombre: "César Nieto", origen: "D.O.P. Guijuelo (Salamanca)", desc: "Tradición ibérica desde 1923. Jamón y paleta con D.O.P. Guijuelo, bellota 100% y 75%." },
    { slug: "la-joya", nombre: "La Joya", origen: "D.O.P. Jabugo (Huelva)", desc: "Jamón ibérico de Jabugo, bellota 100% D.O.P. y bellota 50%, de la sierra onubense." },
    { slug: "angel-martin", nombre: "Ángel Martín e Hijos", origen: "D.O.P. Guijuelo", desc: "Jamón y paleta de bellota 100% y 75% D.O.P. con larga curación." },
    { slug: "castro-fuerte", nombre: "Castro Fuerte", origen: "Dehesa de Extremadura", desc: "Jamón ibérico de bellota 100% y 50% de la dehesa extremeña." },
  ];

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
            Comprar Jamón Ibérico de Bellota Online
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Piezas seleccionadas de Guijuelo, Jabugo y Extremadura. Bellota 100%, 75% y 50%
            raza ibérica, con curaciones de 36 a 48 meses. Pieza entera, deshuesado al vacío
            o loncheado a cuchillo.
          </p>
          <div className="mt-8 flex flex-wrap gap-4 justify-center">
            <Link to="/tienda" className="inline-block bg-primary text-primary-foreground px-8 py-4 font-medium tracking-wide hover:bg-primary/90 transition-colors">
              Ver tienda
            </Link>
            <Link to="/guia-bridas-jamon-iberico" className="inline-block border border-foreground text-foreground px-8 py-4 font-medium tracking-wide hover:bg-foreground hover:text-background transition-colors">
              Guía de bridas
            </Link>
          </div>
        </section>

        <section className="bg-corvera-cream py-16">
          <div className="max-w-6xl mx-auto px-6">
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-10 text-center">
              Marcas de jamón ibérico de bellota
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {marcas.map((m) => (
                <Link key={m.slug} to={`/tienda/${m.slug}`} className="bg-background p-6 border border-border hover:border-primary transition-colors">
                  <h3 className="font-serif text-xl font-bold text-foreground mb-2">{m.nombre}</h3>
                  <p className="text-xs uppercase tracking-wider text-primary mb-3">{m.origen}</p>
                  <p className="text-sm text-muted-foreground leading-relaxed">{m.desc}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="max-w-4xl mx-auto px-6 py-16">
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-6">
            ¿Qué jamón ibérico de bellota elegir?
          </h2>
          <p className="text-muted-foreground leading-relaxed text-lg mb-4">
            El <strong>jamón ibérico de bellota</strong> procede de cerdos criados en libertad
            en la dehesa que se alimentan exclusivamente de bellota y pastos naturales durante
            la montanera (octubre-marzo). La diferencia entre <strong>100%, 75% y 50%</strong>{" "}
            está en el porcentaje de raza ibérica del cerdo: el 100% lleva brida negra y el
            75%/50% brida roja.
          </p>
          <p className="text-muted-foreground leading-relaxed text-lg mb-4">
            Para entender al detalle las cuatro categorías oficiales, consulta nuestra{" "}
            <Link to="/guia-bridas-jamon-iberico" className="text-primary underline">
              guía de bridas del jamón ibérico
            </Link>.
          </p>
        </section>

        <section className="bg-corvera-cream py-16">
          <div className="max-w-4xl mx-auto px-6">
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-8">
              Preguntas frecuentes
            </h2>
            <div className="space-y-8">
              <div>
                <h3 className="font-serif text-xl font-bold text-foreground mb-2">¿Cuál es la diferencia entre jamón bellota 100%, 75% y 50%?</h3>
                <p className="text-muted-foreground leading-relaxed">El porcentaje indica la pureza de raza ibérica del cerdo. El 100% (brida negra) es raza ibérica pura; el 75% y 50% (brida roja) son cruces. Los tres se han alimentado de bellota en la dehesa durante la montanera.</p>
              </div>
              <div>
                <h3 className="font-serif text-xl font-bold text-foreground mb-2">¿Cuánto tarda el envío?</h3>
                <p className="text-muted-foreground leading-relaxed">Enviamos a toda la península en 24-72 horas laborables. Envío gratuito en pedidos superiores a 20 kg.</p>
              </div>
              <div>
                <h3 className="font-serif text-xl font-bold text-foreground mb-2">¿Puedo comprar el jamón loncheado a cuchillo?</h3>
                <p className="text-muted-foreground leading-relaxed">Sí. Ofrecemos la pieza entera, deshuesada al vacío o loncheada a cuchillo y envasada al vacío en sobres de 90 g.</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default ComprarJamonBellota;
