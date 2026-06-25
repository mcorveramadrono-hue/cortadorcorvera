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

const GuiaEmbarazo = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
    const prevTitle = document.title;
    document.title = "¿Se Puede Comer Jamón Ibérico en el Embarazo? | Guía 2026";
    setMeta(
      "description",
      "¿Jamón ibérico durante el embarazo? Guía clara sobre toxoplasmosis, congelación a -20 ºC, curación y recomendaciones de los ginecólogos. Resuelve tus dudas."
    );
    setMeta(
      "keywords",
      "jamon iberico embarazo, jamón ibérico embarazo, jamon embarazo, jamón embarazo, comer jamón embarazada, embarazada puedo comer jamón ibérico, jamón curado embarazo, toxoplasmosis jamón, congelar jamón embarazo, jamón bellota embarazo, jamón cebo embarazo, jamón cocido embarazo, jamón york embarazo, salmonelosis jamón, listeria jamón, ibéricos embarazo, embutido embarazo, jamón pasteurizado embarazo, jamón 36 meses curación embarazo, embarazo alimentación segura, Corvera Ibéricos"
    );
    setMeta("og:title", "¿Se Puede Comer Jamón Ibérico en el Embarazo?", "property");
    setMeta(
      "og:description",
      "Guía actualizada sobre el consumo de jamón ibérico durante el embarazo: toxoplasmosis, congelación, curación y recomendaciones médicas.",
      "property"
    );
    setMeta("og:type", "article", "property");
    setMeta("og:url", "https://corveraibericos.com/jamon-iberico-y-embarazo", "property");
    setMeta("twitter:card", "summary_large_image");
    setMeta("twitter:title", "Jamón Ibérico y Embarazo: Guía Completa");
    setMeta(
      "twitter:description",
      "Toxoplasmosis, congelación a -20 ºC, curación y consejos para disfrutar del jamón ibérico durante el embarazo."
    );

    let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.setAttribute("rel", "canonical");
      document.head.appendChild(canonical);
    }
    canonical.setAttribute("href", "https://corveraibericos.com/jamon-iberico-y-embarazo");

    const ldArticle = document.createElement("script");
    ldArticle.type = "application/ld+json";
    ldArticle.text = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Article",
      headline: "¿Se Puede Comer Jamón Ibérico en el Embarazo? Guía Completa",
      description:
        "Toxoplasmosis, congelación a -20 ºC, curación y recomendaciones médicas sobre el jamón ibérico durante el embarazo.",
      author: { "@type": "Organization", name: "Corvera Ibéricos", url: "https://corveraibericos.com" },
      publisher: {
        "@type": "Organization",
        name: "Corvera Ibéricos",
        logo: { "@type": "ImageObject", url: "https://corveraibericos.com/favicon-192.png" },
      },
      mainEntityOfPage: {
        "@type": "WebPage",
        "@id": "https://corveraibericos.com/jamon-iberico-y-embarazo",
      },
      inLanguage: "es-ES",
      about: ["Jamón ibérico", "Embarazo", "Toxoplasmosis", "Alimentación segura"],
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
          name: "¿Se puede comer jamón ibérico durante el embarazo?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Sí, siempre que se haya congelado previamente a -20 ºC durante al menos 48 horas (idealmente 10 días) para eliminar el riesgo de toxoplasmosis. Un jamón ibérico de bellota con más de 24 meses de curación reduce drásticamente el riesgo, pero la recomendación oficial sigue siendo congelar antes de consumir si no se tiene inmunidad frente a la toxoplasmosis.",
          },
        },
        {
          "@type": "Question",
          name: "¿Cómo congelar el jamón para eliminar la toxoplasmosis?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Loncheado y envasado al vacío, mantenlo en el congelador doméstico (-20 ºC o inferior) al menos 48 horas; muchos especialistas recomiendan hasta 10 días para mayor seguridad. Después, descongela en la nevera 24 h antes de consumir.",
          },
        },
        {
          "@type": "Question",
          name: "¿Y si ya soy inmune a la toxoplasmosis?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Si tu analítica del primer trimestre confirma inmunidad (IgG positivo, IgM negativo), puedes consumir jamón ibérico sin necesidad de congelarlo previamente. Consulta siempre con tu ginecólogo.",
          },
        },
        {
          "@type": "Question",
          name: "¿La curación del jamón elimina la toxoplasmosis?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Estudios recientes (entre ellos los del Instituto IRTA-CReSA) demuestran que curaciones superiores a 18-24 meses reducen drásticamente el parásito, pero las autoridades sanitarias en España siguen recomendando congelar como medida más segura durante el embarazo.",
          },
        },
        {
          "@type": "Question",
          name: "¿Qué tipo de jamón es más seguro durante el embarazo?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "El jamón ibérico de bellota con larga curación (36-48 meses) es el más seguro por su baja actividad de agua y salinidad. Aun así, congélalo previamente. El jamón cocido (york) es seguro sin congelar al estar pasteurizado.",
          },
        },
        {
          "@type": "Question",
          name: "¿Puedo comer jamón ibérico envasado al vacío sin congelar?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "El envasado al vacío conserva el jamón pero no elimina la toxoplasmosis. Si no eres inmune, congélalo igualmente antes de consumir.",
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
        { "@type": "ListItem", position: 2, name: "Guías", item: "https://corveraibericos.com/jamon-iberico-y-embarazo" },
        { "@type": "ListItem", position: 3, name: "Jamón ibérico y embarazo", item: "https://corveraibericos.com/jamon-iberico-y-embarazo" },
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

  return (
    <div className="min-h-screen bg-background">
      <PromoBanner />
      <Header />

      <main className="pt-24 md:pt-28">
        {/* Hero */}
        <section className="max-w-4xl mx-auto px-6 pt-12 pb-12 text-center">
          <p className="text-sm tracking-[0.3em] uppercase text-primary font-medium mb-4">
            Guía del Consumidor
          </p>
          <h1 className="font-serif text-4xl md:text-6xl font-bold text-foreground mb-6 leading-tight">
            ¿Se puede comer jamón ibérico en el embarazo?
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Sí — si se toman las precauciones correctas. Te explicamos en detalle qué dice la
            ciencia sobre la <strong>toxoplasmosis</strong>, cómo <strong>congelar el jamón a -20 ºC</strong>{" "}
            y cuándo puedes disfrutarlo con total tranquilidad durante el embarazo.
          </p>
          <p className="mt-6 text-sm text-muted-foreground italic">
            Última actualización: 2026 · Información divulgativa basada en recomendaciones de la AESAN.
          </p>
        </section>

        {/* TL;DR */}
        <section className="bg-corvera-cream py-12">
          <div className="max-w-3xl mx-auto px-6">
            <h2 className="font-serif text-2xl md:text-3xl font-bold text-foreground mb-4">
              Resumen rápido
            </h2>
            <ul className="space-y-3 text-muted-foreground text-lg leading-relaxed">
              <li>✅ <strong>Sí, puedes comer jamón ibérico</strong> en el embarazo si lo congelas previamente a -20 ºC al menos 48 h (ideal: 10 días).</li>
              <li>✅ Si ya eres <strong>inmune a la toxoplasmosis</strong> (IgG positivo), puedes consumirlo sin congelar.</li>
              <li>✅ El <strong>jamón cocido (york) pasteurizado</strong> es seguro sin congelación previa.</li>
              <li>⚠️ El envasado al vacío y la sal <strong>no eliminan</strong> la toxoplasmosis por sí solos.</li>
              <li>⚠️ Consulta siempre con tu <strong>ginecólogo o matrona</strong>.</li>
            </ul>
          </div>
        </section>

        {/* Por qué surge la duda */}
        <section className="max-w-3xl mx-auto px-6 py-16">
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-6">
            ¿Por qué se desaconseja el jamón en el embarazo?
          </h2>
          <p className="text-muted-foreground leading-relaxed text-lg mb-4">
            El motivo es la <strong>toxoplasmosis</strong>, una infección causada por el parásito{" "}
            <em>Toxoplasma gondii</em> que puede estar presente en la carne cruda o curada. En
            adultos sanos suele ser asintomática, pero durante el embarazo puede transmitirse al
            feto y provocar complicaciones, especialmente en el primer trimestre.
          </p>
          <p className="text-muted-foreground leading-relaxed text-lg">
            Por eso, en la primera analítica del embarazo se mide la <strong>inmunidad frente a
            la toxoplasmosis</strong>. Si nunca has pasado la infección, los ginecólogos
            recomiendan tomar precauciones con carnes crudas, curadas y embutidos.
          </p>
        </section>

        {/* Congelación */}
        <section className="bg-corvera-cream py-16">
          <div className="max-w-3xl mx-auto px-6">
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-6">
              Cómo congelar el jamón ibérico correctamente
            </h2>
            <p className="text-muted-foreground leading-relaxed text-lg mb-6">
              El frío extremo inactiva al parásito <em>Toxoplasma gondii</em>. La AESAN
              (Agencia Española de Seguridad Alimentaria y Nutrición) recomienda:
            </p>
            <ol className="space-y-4 text-muted-foreground text-lg leading-relaxed list-decimal pl-6">
              <li>Compra el jamón <strong>loncheado y envasado al vacío</strong> (más cómodo y uniforme para congelar).</li>
              <li>Mantenlo en el congelador a <strong>-20 ºC durante al menos 48 horas</strong>. Lo más seguro: <strong>10 días</strong>.</li>
              <li>Descongela en la nevera <strong>24 horas antes</strong> de consumirlo (nunca a temperatura ambiente).</li>
              <li>Una vez descongelado, consúmelo en <strong>2-3 días</strong> manteniéndolo refrigerado.</li>
            </ol>
            <p className="text-muted-foreground leading-relaxed text-lg mt-6">
              Importante: los congeladores domésticos modernos (tres o cuatro estrellas ❄❄❄❄)
              alcanzan -18/-20 ºC. Verifica que el tuyo cumpla esta temperatura.
            </p>
          </div>
        </section>

        {/* Curación */}
        <section className="max-w-3xl mx-auto px-6 py-16">
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-6">
            ¿La curación elimina la toxoplasmosis?
          </h2>
          <p className="text-muted-foreground leading-relaxed text-lg mb-4">
            Estudios del <strong>IRTA-CReSA</strong> y otras instituciones demuestran que
            curaciones <strong>superiores a 18-24 meses</strong>, combinadas con la salinidad
            propia del proceso, reducen drásticamente la viabilidad del parásito.
          </p>
          <p className="text-muted-foreground leading-relaxed text-lg mb-4">
            Un <strong>jamón ibérico de bellota con 36-48 meses de curación</strong> presenta un
            riesgo mínimo. Aun así, las autoridades sanitarias mantienen la recomendación de{" "}
            <strong>congelar previamente</strong> como medida más segura mientras dure la
            gestación si no hay inmunidad confirmada.
          </p>
          <p className="text-muted-foreground leading-relaxed text-lg">
            Si tienes dudas sobre la curación de una pieza concreta, en{" "}
            <a href="/tienda" className="text-primary underline">nuestra tienda</a>{" "}
            indicamos los meses de curación de cada jamón.
          </p>
        </section>

        {/* Comparativa */}
        <section className="bg-corvera-cream py-16">
          <div className="max-w-5xl mx-auto px-6">
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-10 text-center">
              ¿Qué jamón puedo comer durante el embarazo?
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse bg-background">
                <thead>
                  <tr className="border-b-2 border-foreground">
                    <th className="p-4 font-serif font-bold">Tipo de jamón</th>
                    <th className="p-4 font-serif font-bold">¿Seguro?</th>
                    <th className="p-4 font-serif font-bold">Condición</th>
                  </tr>
                </thead>
                <tbody className="text-muted-foreground">
                  <tr className="border-b border-border">
                    <td className="p-4">Jamón ibérico bellota (36-48 meses)</td>
                    <td className="p-4">✅ Sí</td>
                    <td className="p-4">Congelado previamente a -20 ºC ≥ 48 h</td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="p-4">Jamón ibérico cebo / cebo de campo</td>
                    <td className="p-4">✅ Sí</td>
                    <td className="p-4">Congelado previamente a -20 ºC ≥ 48 h</td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="p-4">Jamón serrano</td>
                    <td className="p-4">✅ Sí</td>
                    <td className="p-4">Congelado previamente a -20 ºC ≥ 48 h</td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="p-4">Jamón cocido (york) pasteurizado</td>
                    <td className="p-4">✅ Sí</td>
                    <td className="p-4">Sin congelación previa</td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="p-4">Embutidos crudos (chorizo, salchichón, lomo)</td>
                    <td className="p-4">⚠️ Con precaución</td>
                    <td className="p-4">Congelar a -20 ºC ≥ 48 h o cocinar antes</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Inmunidad */}
        <section className="max-w-3xl mx-auto px-6 py-16">
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-6">
            ¿Y si ya pasé la toxoplasmosis?
          </h2>
          <p className="text-muted-foreground leading-relaxed text-lg mb-4">
            En la primera analítica del embarazo se mide el <strong>IgG e IgM frente a Toxoplasma</strong>:
          </p>
          <ul className="space-y-3 text-muted-foreground text-lg leading-relaxed list-disc pl-6 mb-4">
            <li><strong>IgG positivo, IgM negativo</strong>: ya has pasado la infección, estás inmunizada. Puedes comer jamón ibérico sin congelar.</li>
            <li><strong>IgG e IgM negativos</strong>: no has pasado la infección. Aplica las precauciones (congelar).</li>
            <li><strong>IgM positivo</strong>: posible infección activa, consulta urgentemente con tu ginecólogo.</li>
          </ul>
          <p className="text-muted-foreground leading-relaxed text-lg">
            En España, aproximadamente el <strong>20-30% de las embarazadas tiene inmunidad</strong>{" "}
            previa, así que para muchas mujeres el jamón ibérico no representa ningún problema.
          </p>
        </section>

        {/* FAQ visible (también marcada en JSON-LD) */}
        <section id="preguntas-frecuentes" className="bg-corvera-cream py-20 scroll-mt-28">
          <div className="max-w-4xl mx-auto px-6">
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-10">
              Preguntas frecuentes sobre jamón ibérico y embarazo
            </h2>
            <div className="space-y-8">
              <div>
                <h3 className="font-serif text-xl font-bold text-foreground mb-2">¿Se puede comer jamón ibérico durante el embarazo?</h3>
                <p className="text-muted-foreground leading-relaxed">Sí, siempre que se haya congelado previamente a -20 ºC durante al menos 48 horas (idealmente 10 días) para eliminar el riesgo de toxoplasmosis. Un jamón ibérico de bellota con larga curación reduce el riesgo, pero la recomendación oficial sigue siendo congelar antes de consumir si no se tiene inmunidad.</p>
              </div>
              <div>
                <h3 className="font-serif text-xl font-bold text-foreground mb-2">¿Cómo congelar el jamón para eliminar la toxoplasmosis?</h3>
                <p className="text-muted-foreground leading-relaxed">Loncheado y envasado al vacío, mantenlo en el congelador doméstico (-20 ºC o inferior) al menos 48 horas; muchos especialistas recomiendan hasta 10 días. Después, descongela en la nevera 24 h antes de consumir.</p>
              </div>
              <div>
                <h3 className="font-serif text-xl font-bold text-foreground mb-2">¿Y si ya soy inmune a la toxoplasmosis?</h3>
                <p className="text-muted-foreground leading-relaxed">Si tu analítica confirma inmunidad (IgG positivo, IgM negativo), puedes consumir jamón ibérico sin congelarlo. Consulta siempre con tu ginecólogo.</p>
              </div>
              <div>
                <h3 className="font-serif text-xl font-bold text-foreground mb-2">¿La curación del jamón elimina la toxoplasmosis?</h3>
                <p className="text-muted-foreground leading-relaxed">Curaciones superiores a 18-24 meses reducen drásticamente el parásito, pero las autoridades sanitarias en España siguen recomendando congelar como medida más segura durante el embarazo.</p>
              </div>
              <div>
                <h3 className="font-serif text-xl font-bold text-foreground mb-2">¿Qué tipo de jamón es más seguro durante el embarazo?</h3>
                <p className="text-muted-foreground leading-relaxed">El jamón ibérico de bellota con larga curación (36-48 meses) es el más seguro por su baja actividad de agua y salinidad. Aun así, congélalo previamente si no eres inmune. El jamón cocido (york) es seguro sin congelar al estar pasteurizado.</p>
              </div>
              <div>
                <h3 className="font-serif text-xl font-bold text-foreground mb-2">¿Puedo comer jamón ibérico envasado al vacío sin congelar?</h3>
                <p className="text-muted-foreground leading-relaxed">El envasado al vacío conserva el jamón pero no elimina la toxoplasmosis. Si no eres inmune, congélalo igualmente antes de consumir.</p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="max-w-4xl mx-auto px-6 py-20 text-center">
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-6">
            Jamón ibérico de larga curación, perfecto para congelar
          </h2>
          <p className="text-muted-foreground leading-relaxed text-lg mb-8">
            En <strong>Corvera Ibéricos</strong> seleccionamos piezas con curaciones de 36 a 48
            meses, ideales para congelar y consumir con total seguridad durante el embarazo.
            Loncheado a cuchillo y envasado al vacío, listo para tu congelador.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <a
              href="/sobres-de-jamon-iberico"
              className="inline-block bg-primary text-primary-foreground px-8 py-4 font-medium tracking-wide hover:bg-primary/90 transition-colors"
            >
              Ver sobres al vacío
            </a>
            <a
              href="/tienda"
              className="inline-block border border-foreground text-foreground px-8 py-4 font-medium tracking-wide hover:bg-foreground hover:text-background transition-colors"
            >
              Explorar tienda
            </a>
          </div>
          <p className="text-xs text-muted-foreground mt-10 max-w-2xl mx-auto">
            Aviso: esta guía tiene carácter divulgativo y no sustituye el consejo médico. Consulta
            siempre con tu ginecólogo, matrona o especialista en nutrición durante el embarazo.
          </p>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default GuiaEmbarazo;
