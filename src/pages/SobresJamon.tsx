import { useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PromoBanner from "@/components/PromoBanner";
import { Button } from "@/components/ui/button";
import { products } from "@/data/products";

const setMeta = (name: string, content: string, attr: "name" | "property" = "name") => {
  let el = document.querySelector(`meta[${attr}="${name}"]`) as HTMLMetaElement | null;
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, name);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
};

const PAGE_URL = "https://corveraibericos.com/sobres-de-jamon-iberico";

const SobresJamon = () => {
  const sobre = products.find((p) => p.id === "epicum-sobres-cebo-iberico");

  useEffect(() => {
    window.scrollTo(0, 0);
    const prevTitle = document.title;
    document.title = "Sobres de Jamón Ibérico Cortado a Cuchillo | Corvera";
    setMeta(
      "description",
      "Sobres de jamón ibérico cortado a cuchillo y envasado al vacío. 90 g por sobre, listos para servir. Envío gratis a toda la península."
    );
    setMeta(
      "keywords",
      "sobres de jamón, sobres de jamón ibérico, sobres jamón cortado a cuchillo, sobres jamón cebo ibérico, sobres jamón 50% ibérico, sobres jamón envasado al vacío, comprar sobres de jamón online, sobres jamón 90g, sobres jamón Epicum, lonchas jamón ibérico, jamón loncheado a cuchillo, sobres jamón ibérico online, sobres jamón para regalo, sobres jamón picoteo, sobres jamón eventos, jamón en sobres, sobre 100g jamón, jamón loncheado envasado, comprar jamón loncheado, jamón loncheado online, Corvera Ibéricos"
    );
    setMeta("og:title", "Sobres de Jamón Ibérico Cortado a Cuchillo | Corvera Ibéricos", "property");
    setMeta(
      "og:description",
      "Sobres de jamón ibérico cortado a cuchillo y envasado al vacío. 90 g listos para servir. Envío gratis a toda la península.",
      "property"
    );
    setMeta("og:type", "product", "property");
    setMeta("og:url", PAGE_URL, "property");
    setMeta("twitter:card", "summary_large_image");
    setMeta("twitter:title", "Sobres de Jamón Ibérico Cortado a Cuchillo");
    setMeta(
      "twitter:description",
      "Sobres de jamón ibérico 90 g cortado a cuchillo y envasado al vacío. Envío gratis a toda la península."
    );

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
        "@type": "Product",
        name: "Sobres de Jamón Cebo 50% Ibérico cortado a cuchillo",
        description:
          "Sobres de jamón de cebo 50% ibérico cortados a cuchillo y envasados al vacío. 90 g por sobre, listos para servir.",
        image: ["https://corveraibericos.com/favicon-512.png"],
        brand: { "@type": "Brand", name: "Epicum" },
        category: "Jamón ibérico loncheado",
        offers: {
          "@type": "Offer",
          url: PAGE_URL,
          priceCurrency: "EUR",
          price: "7.95",
          availability: "https://schema.org/InStock",
          itemCondition: "https://schema.org/NewCondition",
          seller: { "@type": "Organization", name: "Corvera Ibéricos" },
        },
      },
      {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Inicio", item: "https://corveraibericos.com/" },
          { "@type": "ListItem", position: 2, name: "Tienda", item: "https://corveraibericos.com/tienda" },
          { "@type": "ListItem", position: 3, name: "Sobres de Jamón Ibérico", item: PAGE_URL },
        ],
      },
      {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: [
          {
            "@type": "Question",
            name: "¿Cuánto pesa cada sobre de jamón?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Cada sobre de jamón ibérico contiene 90 gramos de lonchas finas cortadas a cuchillo y envasadas al vacío.",
            },
          },
          {
            "@type": "Question",
            name: "¿Los sobres de jamón están cortados a cuchillo o a máquina?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Todos nuestros sobres de jamón están cortados a cuchillo por un cortador profesional y envasados al vacío para conservar el aroma y la textura.",
            },
          },
          {
            "@type": "Question",
            name: "¿Cuál es el pedido mínimo de sobres de jamón?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "El pedido mínimo es de 3 sobres y el máximo de 20 sobres por pedido. El envío es gratuito a toda la península.",
            },
          },
          {
            "@type": "Question",
            name: "¿Cuánto duran los sobres de jamón envasados al vacío?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Los sobres de jamón ibérico envasados al vacío se conservan en perfectas condiciones varias semanas en refrigeración. Recomendamos atemperarlos 15 minutos antes de servir.",
            },
          },
        ],
      },
    ];

    const ldNodes: HTMLScriptElement[] = [];
    for (const block of ld) {
      const s = document.createElement("script");
      s.type = "application/ld+json";
      s.text = JSON.stringify(block);
      document.head.appendChild(s);
      ldNodes.push(s);
    }

    return () => {
      document.title = prevTitle;
      for (const n of ldNodes) n.parentNode?.removeChild(n);
    };
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <PromoBanner />
      <Header />
      <main className="flex-1">
        <nav aria-label="Migas de pan" className="container mx-auto px-4 pt-6 text-sm text-muted-foreground">
          <ol className="flex flex-wrap gap-1">
            <li><Link to="/" className="hover:underline">Inicio</Link><span className="mx-1">/</span></li>
            <li><Link to="/tienda" className="hover:underline">Tienda</Link><span className="mx-1">/</span></li>
            <li aria-current="page" className="text-foreground">Sobres de Jamón Ibérico</li>
          </ol>
        </nav>

        <section className="container mx-auto px-4 py-10 max-w-4xl">
          <h1 className="text-4xl md:text-5xl font-serif font-semibold text-primary mb-4">
            Sobres de Jamón Ibérico Cortado a Cuchillo
          </h1>
          <p className="text-lg text-muted-foreground mb-6">
            Compra online <strong>sobres de jamón ibérico</strong> cortado a cuchillo por un
            cortador profesional y envasado al vacío. Cada sobre lleva <strong>90 g de lonchas
            finas</strong> listas para servir: el formato perfecto para un picoteo, una tabla,
            un regalo gourmet o llevar a cualquier sitio.
          </p>

          {sobre && (
            <div className="rounded-lg border border-border bg-card p-6 mb-10">
              <h2 className="text-2xl font-serif font-semibold mb-2">{sobre.name}</h2>
              <p className="text-muted-foreground mb-4">{sobre.description}</p>
              <p className="text-3xl font-semibold text-primary mb-4">7,95 € / sobre</p>
              <Button asChild size="lg">
                <Link to={`/tienda/epicum/${sobre.id}`}>Comprar sobres de jamón</Link>
              </Button>
            </div>
          )}

          <h2 className="text-2xl font-serif font-semibold mt-10 mb-3">¿Por qué nuestros sobres de jamón?</h2>
          <ul className="list-disc pl-6 space-y-2 text-foreground/90">
            <li><strong>Corte a cuchillo profesional</strong>: lonchas finas, regulares y con el grosor que potencia el aroma del jamón ibérico.</li>
            <li><strong>Envasado al vacío</strong> inmediato tras el corte para conservar la textura, el sabor y la grasa infiltrada.</li>
            <li><strong>Jamón de cebo 50 % ibérico Epicum</strong>, con más de 28 meses de curación.</li>
            <li><strong>90 g por sobre</strong>, la ración ideal para 2 personas.</li>
            <li><strong>Envío gratis</strong> a toda la península en pedidos de 3 a 20 sobres.</li>
          </ul>

          <h2 className="text-2xl font-serif font-semibold mt-10 mb-3">Cómo servir los sobres de jamón ibérico</h2>
          <p className="text-foreground/90 mb-3">
            Saca los <strong>sobres de jamón</strong> de la nevera 15 minutos antes de servir y
            ábrelos justo en el momento. Coloca las lonchas en un plato amplio, sin amontonar,
            para que la grasa se atempere y libere todo su aroma. Acompáñalos con un buen pan,
            picos artesanos o una copa de vino fino.
          </p>

          <h2 className="text-2xl font-serif font-semibold mt-10 mb-3">Preguntas frecuentes sobre los sobres de jamón</h2>
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold">¿Cuánto pesa cada sobre de jamón?</h3>
              <p className="text-muted-foreground">Cada sobre contiene 90 g de lonchas cortadas a cuchillo.</p>
            </div>
            <div>
              <h3 className="font-semibold">¿Están cortados a cuchillo o a máquina?</h3>
              <p className="text-muted-foreground">Todos nuestros sobres se cortan a cuchillo por un cortador profesional.</p>
            </div>
            <div>
              <h3 className="font-semibold">¿Cuál es el pedido mínimo?</h3>
              <p className="text-muted-foreground">Mínimo 3 sobres, máximo 20. El envío es gratuito a toda la península.</p>
            </div>
            <div>
              <h3 className="font-semibold">¿Cuánto duran envasados al vacío?</h3>
              <p className="text-muted-foreground">Varias semanas en refrigeración. Atemperar 15 minutos antes de servir.</p>
            </div>
          </div>

          <div className="mt-10 text-center">
            <Button asChild size="lg" variant="outline">
              <Link to="/tienda">Ver toda la tienda de jamón ibérico</Link>
            </Button>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default SobresJamon;
