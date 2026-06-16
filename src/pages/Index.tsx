import Header from "@/components/Header";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Products from "@/components/Products";
import Services from "@/components/Services";
import Gallery from "@/components/Gallery";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import PromoBanner from "@/components/PromoBanner";
import Ofertas from "@/components/Ofertas";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { usePageSeo } from "@/lib/seo";

const Index = () => {
  const location = useLocation();
  usePageSeo({
    title: "Corvera Ibéricos | Compra Jamón Ibérico Online",
    description: "Jamón ibérico de bellota online: César Nieto, La Joya, Ángel Martín, Epicum y Finura. Corte a cuchillo profesional. Envío a toda España.",
    path: "/",
    jsonLd: {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: [
        { "@type": "Question", name: "¿Hacéis envíos a toda España?", acceptedAnswer: { "@type": "Answer", text: "Sí, realizamos envíos a toda la península española. Envío gratuito para pedidos superiores a 20 kg; para pedidos inferiores, el coste es de 5 €." } },
        { "@type": "Question", name: "¿Qué métodos de pago aceptáis?", acceptedAnswer: { "@type": "Answer", text: "Aceptamos pago con tarjeta de crédito/débito (Visa, Mastercard), transferencia bancaria y Bizum." } },
        { "@type": "Question", name: "¿Qué diferencia hay entre jamón ibérico de bellota y de cebo?", acceptedAnswer: { "@type": "Answer", text: "El de bellota procede de cerdos alimentados con bellotas y hierbas en la dehesa; el de cebo se alimenta con piensos a base de cereales. La bellota aporta mayor infiltración grasa y sabor más complejo." } },
        { "@type": "Question", name: "¿Ofrecéis servicio de corte a cuchillo para eventos?", acceptedAnswer: { "@type": "Answer", text: "Sí, ofrecemos cortador profesional para bodas, celebraciones y eventos corporativos, con o sin pieza incluida." } },
        { "@type": "Question", name: "¿Cuánto tiempo de curación tienen vuestros jamones?", acceptedAnswer: { "@type": "Answer", text: "Los jamones ibéricos de bellota tienen una curación mínima de 36 meses; los de cebo y cebo de campo, 30 meses; las paletas entre 20 y 24 meses." } },
      ],
    },
  });
  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace("#", "");
      // wait for sections to mount
      setTimeout(() => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 100);
    }
  }, [location.hash]);
  return (
    <div className="min-h-screen bg-background">
      <PromoBanner />
      <Header />
      <main>
        <Hero />
        <Ofertas />
        <Products />
        <About />
        <Services />
        <Gallery />
        <Contact />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
