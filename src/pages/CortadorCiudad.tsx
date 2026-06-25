import { useEffect } from "react";
import { useParams, Navigate, Link } from "react-router-dom";
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

interface CiudadData {
  slug: string;
  nombre: string;
  region: string;
  provincia: string;
  latitude: number;
  longitude: number;
  comarcas: string[];
  intro: string;
}

const CIUDADES: Record<string, CiudadData> = {
  madrid: {
    slug: "madrid",
    nombre: "Madrid",
    region: "Comunidad de Madrid",
    provincia: "Madrid",
    latitude: 40.4168,
    longitude: -3.7038,
    comarcas: ["Pozuelo", "Majadahonda", "Las Rozas", "Alcobendas", "Boadilla del Monte", "Aravaca", "Chamartín", "Salamanca", "Chamberí", "Retiro"],
    intro:
      "Servicio profesional de cortador de jamón a cuchillo en Madrid capital y toda la Comunidad. Bodas, eventos corporativos, presentaciones, catas privadas y celebraciones familiares atendidas por un cortador con más de una década de experiencia.",
  },
  barcelona: {
    slug: "barcelona",
    nombre: "Barcelona",
    region: "Cataluña",
    provincia: "Barcelona",
    latitude: 41.3851,
    longitude: 2.1734,
    comarcas: ["Eixample", "Sarrià-Sant Gervasi", "Pedralbes", "Gràcia", "Sant Cugat", "Sitges", "Castelldefels", "Vallès Occidental", "Maresme"],
    intro:
      "Cortador de jamón profesional a cuchillo en Barcelona ciudad, Vallès y costa catalana. Bodas, eventos de empresa, catas y celebraciones con jamón ibérico de bellota seleccionado.",
  },
  valencia: {
    slug: "valencia",
    nombre: "Valencia",
    region: "Comunitat Valenciana",
    provincia: "Valencia",
    latitude: 39.4699,
    longitude: -0.3763,
    comarcas: ["Ciutat Vella", "L'Eixample", "El Saler", "Paterna", "Burjassot", "Gandía", "Sagunto", "Cullera"],
    intro:
      "Cortador profesional de jamón a cuchillo en Valencia y toda la Comunitat. Cortes en directo para bodas, eventos corporativos, hoteles y catas privadas en la playa o en finca.",
  },
  sevilla: {
    slug: "sevilla",
    nombre: "Sevilla",
    region: "Andalucía",
    provincia: "Sevilla",
    latitude: 37.3886,
    longitude: -5.9823,
    comarcas: ["Triana", "Los Remedios", "Nervión", "Aljarafe", "Bormujos", "Tomares", "Mairena", "Dos Hermanas", "Carmona"],
    intro:
      "Servicio de cortador de jamón a cuchillo en Sevilla capital, Aljarafe y provincia. Bodas, ferias, hoteles, eventos y catas privadas con jamón ibérico de bellota.",
  },
};

const CortadorCiudad = () => {
  const { ciudad } = useParams<{ ciudad: string }>();
  const data = ciudad ? CIUDADES[ciudad.toLowerCase()] : null;

  useEffect(() => {
    if (!data) return;
    window.scrollTo(0, 0);
    const prevTitle = document.title;
    const PAGE_URL = `https://corveraibericos.com/cortador-de-jamon-${data.slug}`;

    document.title = `Cortador de Jamón ${data.nombre} | Bodas y Eventos | Corvera`;
    setMeta(
      "description",
      `Cortador profesional de jamón ibérico a cuchillo en ${data.nombre}. Bodas, eventos corporativos, catas y celebraciones. Presupuesto sin compromiso.`
    );
    setMeta(
      "keywords",
      `cortador de jamón ${data.nombre}, cortador jamón ${data.nombre}, cortador profesional jamón ${data.nombre}, cortador jamón bodas ${data.nombre}, cortador jamón eventos ${data.nombre}, cortador a cuchillo ${data.nombre}, alquilar cortador de jamón ${data.nombre}, contratar cortador jamón ${data.nombre}, cortador jamón ${data.provincia}, cortador jamón ${data.region}, servicio cortador jamón ${data.nombre}, cortador jamón ibérico ${data.nombre}, maestro cortador ${data.nombre}, cortador jamón empresa ${data.nombre}, jamón ${data.nombre}, Corvera Ibéricos`
    );
    setMeta("og:title", `Cortador de Jamón Profesional en ${data.nombre} | Corvera Ibéricos`, "property");
    setMeta(
      "og:description",
      `Servicio de cortador de jamón a cuchillo en ${data.nombre}: bodas, eventos corporativos y celebraciones. Presupuesto sin compromiso.`,
      "property"
    );
    setMeta("og:type", "website", "property");
    setMeta("og:url", PAGE_URL, "property");
    setMeta("twitter:card", "summary_large_image");
    setMeta("twitter:title", `Cortador de Jamón en ${data.nombre}`);
    setMeta(
      "twitter:description",
      `Cortador profesional de jamón a cuchillo en ${data.nombre} para bodas y eventos. Corvera Ibéricos.`
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
        "@type": "ProfessionalService",
        name: `Corvera Ibéricos - Cortador de Jamón Profesional en ${data.nombre}`,
        description: `Servicio profesional de cortador de jamón ibérico a cuchillo en ${data.nombre} para bodas, eventos corporativos, catas y celebraciones.`,
        url: PAGE_URL,
        image: "https://corveraibericos.com/favicon-512.png",
        telephone: "+34676703034",
        email: "corveraibericos@gmail.com",
        priceRange: "€€-€€€",
        address: {
          "@type": "PostalAddress",
          addressLocality: data.nombre,
          addressRegion: data.region,
          addressCountry: "ES",
        },
        geo: {
          "@type": "GeoCoordinates",
          latitude: data.latitude,
          longitude: data.longitude,
        },
        areaServed: [
          { "@type": "City", name: data.nombre },
          { "@type": "AdministrativeArea", name: data.provincia },
          { "@type": "AdministrativeArea", name: data.region },
        ],
        serviceType: [
          "Cortador de jamón a cuchillo",
          "Cortador de jamón para bodas",
          "Cortador de jamón para eventos",
          "Catas de jamón ibérico",
        ],
        sameAs: ["https://www.instagram.com/corveraibericos/"],
      },
      {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Inicio", item: "https://corveraibericos.com/" },
          { "@type": "ListItem", position: 2, name: "Cortador de jamón", item: "https://corveraibericos.com/#servicios" },
          { "@type": "ListItem", position: 3, name: data.nombre, item: PAGE_URL },
        ],
      },
      {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: [
          {
            "@type": "Question",
            name: `¿Cuánto cuesta un cortador de jamón en ${data.nombre}?`,
            acceptedAnswer: {
              "@type": "Answer",
              text: `El precio en ${data.nombre} depende del tipo de evento, duración y número de invitados. Pide presupuesto sin compromiso por WhatsApp al +34 676 70 30 34.`,
            },
          },
          {
            "@type": "Question",
            name: `¿Atendéis bodas en toda la provincia de ${data.provincia}?`,
            acceptedAnswer: {
              "@type": "Answer",
              text: `Sí, cubrimos ${data.nombre} capital y toda la provincia de ${data.provincia}, incluyendo ${data.comarcas.slice(0, 4).join(", ")} y poblaciones cercanas.`,
            },
          },
          {
            "@type": "Question",
            name: "¿El jamón lo lleva el cortador?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Podemos llevar nosotros el jamón ibérico de bellota seleccionado o cortar la pieza que aporte el cliente. En el presupuesto se detalla cada opción.",
            },
          },
        ],
      },
    ];

    const scripts: HTMLScriptElement[] = ld.map((obj) => {
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
  }, [data]);

  if (!data) return <Navigate to="/" replace />;

  return (
    <div className="min-h-screen bg-background">
      <PromoBanner />
      <Header />

      <main className="pt-24 md:pt-28">
        <section className="max-w-4xl mx-auto px-6 pt-12 pb-12 text-center">
          <p className="text-sm tracking-[0.3em] uppercase text-primary font-medium mb-4">
            Servicio profesional · {data.region}
          </p>
          <h1 className="font-serif text-4xl md:text-6xl font-bold text-foreground mb-6 leading-tight">
            Cortador de Jamón en {data.nombre}
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            {data.intro}
          </p>
          <div className="mt-8 flex flex-wrap gap-4 justify-center">
            <a
              href="https://wa.me/34676703034"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-primary text-primary-foreground px-8 py-4 font-medium tracking-wide hover:bg-primary/90 transition-colors"
            >
              Pedir presupuesto por WhatsApp
            </a>
            <a
              href="tel:+34676703034"
              className="inline-block border border-foreground text-foreground px-8 py-4 font-medium tracking-wide hover:bg-foreground hover:text-background transition-colors"
            >
              Llamar al cortador
            </a>
          </div>
        </section>

        <section className="bg-corvera-cream py-16">
          <div className="max-w-5xl mx-auto px-6 grid md:grid-cols-3 gap-10">
            {[
              { t: "Bodas", d: `Cortador de jamón a cuchillo para bodas en ${data.nombre} y alrededores. Estación de jamón abierta durante el cóctel o el banquete, con tabla, soporte y cuchillería profesional.` },
              { t: "Eventos de empresa", d: `Servicio para inauguraciones, presentaciones, ferias y eventos corporativos en ${data.nombre}: cortes en directo con explicación del jamón ibérico y de la pieza.` },
              { t: "Catas privadas", d: `Catas guiadas de jamón ibérico de bellota en domicilios, fincas y restaurantes de ${data.nombre}. Comparativa de bridas y maridajes.` },
            ].map((s) => (
              <article key={s.t}>
                <h2 className="font-serif text-2xl font-bold text-foreground mb-3">{s.t}</h2>
                <p className="text-muted-foreground leading-relaxed">{s.d}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="max-w-4xl mx-auto px-6 py-16">
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-6">
            Zonas que cubrimos en {data.provincia}
          </h2>
          <p className="text-muted-foreground leading-relaxed text-lg mb-6">
            Trabajamos en {data.nombre} capital y nos desplazamos a toda la provincia, incluyendo:
          </p>
          <div className="flex flex-wrap gap-2">
            {data.comarcas.map((c) => (
              <span key={c} className="px-3 py-1 border border-border rounded-sm text-sm text-muted-foreground">
                {c}
              </span>
            ))}
          </div>
        </section>

        <section className="bg-corvera-cream py-16">
          <div className="max-w-4xl mx-auto px-6">
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-8">
              Preguntas frecuentes
            </h2>
            <div className="space-y-8">
              <div>
                <h3 className="font-serif text-xl font-bold text-foreground mb-2">¿Cuánto cuesta un cortador de jamón en {data.nombre}?</h3>
                <p className="text-muted-foreground leading-relaxed">El precio depende del tipo de evento, duración y número de invitados. Pide presupuesto sin compromiso por WhatsApp al +34 676 70 30 34.</p>
              </div>
              <div>
                <h3 className="font-serif text-xl font-bold text-foreground mb-2">¿Atendéis bodas en toda la provincia de {data.provincia}?</h3>
                <p className="text-muted-foreground leading-relaxed">Sí, cubrimos {data.nombre} capital y toda la provincia, incluyendo {data.comarcas.slice(0, 4).join(", ")} y poblaciones cercanas.</p>
              </div>
              <div>
                <h3 className="font-serif text-xl font-bold text-foreground mb-2">¿El jamón lo lleva el cortador?</h3>
                <p className="text-muted-foreground leading-relaxed">Podemos llevar nosotros el jamón ibérico de bellota seleccionado o cortar la pieza que aporte el cliente. En el presupuesto se detalla cada opción.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="max-w-4xl mx-auto px-6 py-16 text-center">
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-4">
            ¿Tienes un evento en {data.nombre}?
          </h2>
          <p className="text-muted-foreground text-lg mb-8">
            Cuéntanos los detalles y te enviamos presupuesto en menos de 24 horas.
          </p>
          <a
            href="https://wa.me/34676703034"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-primary text-primary-foreground px-8 py-4 font-medium tracking-wide hover:bg-primary/90 transition-colors"
          >
            Solicitar presupuesto
          </a>
          <p className="text-sm text-muted-foreground mt-8">
            También damos servicio en otras ciudades:{" "}
            {Object.values(CIUDADES)
              .filter((c) => c.slug !== data.slug)
              .map((c, i, arr) => (
                <span key={c.slug}>
                  <Link to={`/cortador-de-jamon-${c.slug}`} className="underline hover:text-primary">
                    {c.nombre}
                  </Link>
                  {i < arr.length - 1 ? " · " : ""}
                </span>
              ))}
          </p>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default CortadorCiudad;
