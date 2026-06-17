import { useEffect } from "react";
import { ArrowLeft } from "lucide-react";
import { useNavigate, useParams, Navigate, Link, useSearchParams } from "react-router-dom";
import { products, BRANDS } from "@/data/products";
import type { Product, Brand } from "@/data/products";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PromoBadge from "@/components/PromoBadge";

const TiendaMarca = () => {
  const navigate = useNavigate();
  const { brand } = useParams<{ brand: string }>();
  const [searchParams] = useSearchParams();
  const from = searchParams.get("from");

  const brandInfo = BRANDS.find((b) => b.id === brand);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (!brandInfo) return;

    const brandProducts = products.filter((p) => p.brand === (brand as Brand));
    const productNames = brandProducts.map((p) => p.name).join(", ");

    const title = `Comprar Jamón ${brandInfo.name} | ${brandInfo.name} Ibérico Online`.slice(0, 70);
    const description = `Comprar jamones y paletas ${brandInfo.name} online en Corvera Ibéricos. ${brandInfo.tagline}. ${productNames.slice(0, 110)}. Envío a toda España y corte a cuchillo profesional opcional.`.slice(0, 300);

    document.title = title;

    const setMeta = (selector: string, value: string) => {
      let el = document.querySelector(selector) as HTMLMetaElement | null;
      if (!el) {
        el = document.createElement("meta");
        const propMatch = selector.match(/\[property="([^"]+)"\]/);
        const nameMatch = selector.match(/\[name="([^"]+)"\]/);
        if (propMatch) el.setAttribute("property", propMatch[1]);
        else if (nameMatch) el.setAttribute("name", nameMatch[1]);
        document.head.appendChild(el);
      }
      el.setAttribute("content", value);
    };

    setMeta('meta[name="description"]', description.slice(0, 160));
    setMeta('meta[property="og:title"]', title);
    setMeta('meta[property="og:description"]', description.slice(0, 200));
    setMeta('meta[property="og:type"]', "website");
    setMeta('meta[property="og:url"]', `https://corveraibericos.com/tienda/${brand}`);
    setMeta('meta[name="twitter:title"]', title);
    setMeta('meta[name="twitter:description"]', description.slice(0, 200));

    const canonicalHref = `https://corveraibericos.com/tienda/${brand}`;
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.setAttribute("rel", "canonical");
      document.head.appendChild(canonical);
    }
    canonical.setAttribute("href", canonicalHref);

    const ldId = "brand-itemlist-jsonld";
    const ldBrandId = "brand-entity-jsonld";
    let script = document.getElementById(ldId) as HTMLScriptElement | null;
    if (!script) {
      script = document.createElement("script");
      script.type = "application/ld+json";
      script.id = ldId;
      document.head.appendChild(script);
    }
    let scriptBrand = document.getElementById(ldBrandId) as HTMLScriptElement | null;
    if (!scriptBrand) {
      scriptBrand = document.createElement("script");
      scriptBrand.type = "application/ld+json";
      scriptBrand.id = ldBrandId;
      document.head.appendChild(scriptBrand);
    }
    scriptBrand.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Brand",
      name: brandInfo.name,
      description: `${brandInfo.tagline}. Jamones y paletas ibéricas ${brandInfo.name} distribuidas oficialmente por Corvera Ibéricos.`,
      url: canonicalHref,
      logo: "https://corveraibericos.com/favicon-192.png",
    });
    script.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      name: `Jamones y Paletas ${brandInfo.name} - Comprar Online`,
      description,
      url: canonicalHref,
      isPartOf: { "@type": "WebSite", name: "Corvera Ibéricos", url: "https://corveraibericos.com" },
      about: { "@type": "Brand", name: brandInfo.name },
      breadcrumb: {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Inicio", item: "https://corveraibericos.com/" },
          { "@type": "ListItem", position: 2, name: "Tienda", item: "https://corveraibericos.com/tienda" },
          { "@type": "ListItem", position: 3, name: brandInfo.name, item: canonicalHref },
        ],
      },
      mainEntity: {
        "@type": "ItemList",
        itemListElement: brandProducts.map((p, idx) => {
          const minPrice = Math.min(...p.weightOptions.map((o) => o.price));
          const maxPrice = Math.max(...p.weightOptions.map((o) => o.price));
          return {
            "@type": "ListItem",
            position: idx + 1,
            item: {
              "@type": "Product",
              name: p.name,
              description: p.description,
              brand: { "@type": "Brand", name: brandInfo.name },
              category: p.category === "jamon" ? "Jamón Ibérico" : "Paleta Ibérica",
              url: `https://corveraibericos.com/tienda/${p.brand}/${p.id}`,
              offers: {
                "@type": "AggregateOffer",
                lowPrice: minPrice.toFixed(2),
                highPrice: maxPrice.toFixed(2),
                priceCurrency: "EUR",
                availability: "https://schema.org/InStock",
                seller: { "@type": "Organization", name: "Corvera Ibéricos" },
              },
            },
          };
        }),
      },
    });

    return () => {
      const s = document.getElementById(ldId);
      if (s) s.remove();
      const sb = document.getElementById(ldBrandId);
      if (sb) sb.remove();
    };
  }, [brandInfo, brand]);

  if (!brandInfo) return <Navigate to="/tienda" replace />;

  const brandProducts = products.filter((p) => p.brand === (brand as Brand));
  const jamones = brandProducts.filter((p) => p.category === "jamon");
  const paletas = brandProducts.filter((p) => p.category === "paleta");

  const renderProductCard = (product: Product) => {
    const minPrice = product.weightOptions.reduce(
      (min, opt) => (opt.price < min ? opt.price : min),
      product.weightOptions[0].price
    );
    const hoverImage = product.images[1] ?? product.images[0];

    return (
      <Link
        to={`/tienda/${brand}/${product.id}?from=marca`}
        key={product.id}
        className="group bg-card border border-border hover:border-primary/30 transition-all duration-300 flex flex-col"
      >
        <div className="overflow-hidden bg-corvera-cream/30 relative">
          <PromoBadge productId={product.id} className="absolute top-2 left-2 z-10" />
          <img
            src={product.images[0]}
            alt={product.name}
            className="w-full h-72 object-contain p-4 transition-opacity duration-300 group-hover:opacity-0"
          />
          <img
            src={hoverImage}
            alt=""
            aria-hidden="true"
            className="absolute inset-0 w-full h-72 object-contain p-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          />
        </div>
        <div className="p-5 space-y-2 flex-1 flex flex-col items-center text-center">
          <h3 className="font-serif text-base font-semibold text-foreground leading-tight">{product.name}</h3>
          <p className="font-serif text-lg font-bold text-primary mt-auto">
            Desde {minPrice.toFixed(2).replace('.', ',')} €
          </p>
          <span className="text-[10px] text-muted-foreground">*IVA incl.</span>
        </div>
      </Link>
    );
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-28 pb-16">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="flex items-center justify-between mb-8">
            <button
              onClick={() => {
                if (from === "home") {
                  navigate("/#productos");
                } else if (window.history.length > 1) {
                  navigate(-1);
                } else {
                  navigate("/tienda");
                }
              }}
              className="inline-flex items-center gap-2 text-sm tracking-widest uppercase text-muted-foreground hover:text-primary transition-colors"
            >
              <ArrowLeft size={16} />
              {from === "home" ? "Volver" : "Volver a marcas"}
            </button>
          </div>

          <div className="text-center mb-16 space-y-4">
            <p className="text-sm tracking-[0.3em] uppercase text-primary font-medium">{brandInfo.tagline}</p>
            <h1 className="font-serif text-4xl md:text-5xl font-bold text-foreground">{brandInfo.name}</h1>
          </div>

          {jamones.length > 0 && (
            <div className="mb-16">
              <h2 className="font-serif text-2xl md:text-3xl font-bold text-foreground mb-8">Jamones Ibéricos</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {jamones.map(renderProductCard)}
              </div>
            </div>
          )}

          {paletas.length > 0 && (
            <div className="mb-12">
              <h2 className="font-serif text-2xl md:text-3xl font-bold text-foreground mb-8">Paletas Ibéricas</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {paletas.map(renderProductCard)}
              </div>
            </div>
          )}

          <div className="text-center p-6 border border-border bg-corvera-cream/30 space-y-2">
            <p className="text-sm text-muted-foreground">
              <strong>Envío gratuito</strong> para pedidos superiores a 20 kg de peso.
            </p>
            <p className="text-xs text-muted-foreground">
              Para pedidos inferiores a 20 kg, los gastos de envío son de 5 €.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default TiendaMarca;
