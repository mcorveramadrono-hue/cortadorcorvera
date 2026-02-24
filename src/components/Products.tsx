import { useState, useCallback } from "react";
import jamonCebo50 from "@/assets/products/jamon-cebo-50.jpg";
import jamonCebo502 from "@/assets/products/jamon-cebo-50-2.jpg";
import jamonCeboCampo50 from "@/assets/products/jamon-cebo-campo-50.jpg";
import jamonCeboCampo502 from "@/assets/products/jamon-cebo-campo-50-2.jpg";
import jamonBellota100 from "@/assets/products/jamon-bellota-100.jpg";
import jamonBellota1002 from "@/assets/products/jamon-bellota-100-2.jpg";
import jamonBellota75 from "@/assets/products/jamon-bellota-75.jpg";
import jamonBellota752 from "@/assets/products/jamon-bellota-75-2.jpg";
import paletaCebo50 from "@/assets/products/paleta-cebo-50.jpg";
import paletaCebo502 from "@/assets/products/paleta-cebo-50-2.jpg";
import paletaCeboCampo50 from "@/assets/products/paleta-cebo-campo-50.jpg";
import paletaCeboCampo502 from "@/assets/products/paleta-cebo-campo-50-2.jpg";
import paletaBellota100 from "@/assets/products/paleta-bellota-100.webp";
import paletaBellota1002 from "@/assets/products/paleta-bellota-100-2.jpg";
import paletaBellota50 from "@/assets/products/paleta-bellota-50.jpg";
import paletaBellota502 from "@/assets/products/paleta-bellota-50-2.jpg";
import { ChevronLeft, ChevronRight } from "lucide-react";
import ContactFormDialog from "./ContactFormDialog";

const products = [
  {
    name: "Jamón de Bellota 100% Ibérico",
    description: "Jamón de bellota 100% ibérico, criado en libertad en la dehesa. Curación mínima de 36 meses.",
    price: "588,00 € – 770,00 €",
    images: [jamonBellota100, jamonBellota1002],
    weight: "7,5 – 8,5 kg",
  },
  {
    name: "Jamón de Bellota 75% Ibérico DO",
    description: "Jamón de bellota 75% ibérico con Denominación de Origen Guijuelo. Sabor redondo y equilibrado.",
    price: "497,00 € – 630,00 €",
    images: [jamonBellota75, jamonBellota752],
    weight: "7 – 10 kg",
  },
  {
    name: "Jamón de Cebo de Campo 50% Ibérico",
    description: "Cerdos criados en libertad con alimentación natural complementaria. Premiado en Frankfurt.",
    price: "336,00 €",
    images: [jamonCeboCampo50, jamonCeboCampo502],
    weight: "7 – 10 kg",
  },
  {
    name: "Jamón de Cebo 50% Ibérico",
    description: "Elaborado con cerdos alimentados con cereales de primera calidad. Ideal para el día a día.",
    price: "252,00 € – 322,00 €",
    images: [jamonCebo50, jamonCebo502],
    weight: "7 – 10 kg",
  },
  {
    name: "Paleta de Bellota 100% Ibérica",
    description: "Sabor intenso y concentrado, con grasa blanda y brillante. Extremadamente jugosa.",
    price: "196,00 €",
    images: [paletaBellota100, paletaBellota1002],
    weight: "5 – 6 kg",
  },
  {
    name: "Paleta de Bellota 50% Ibérica",
    description: "Sabor intenso con la calidad del cerdo ibérico de bellota en formato más accesible.",
    price: "182,00 € – 224,00 €",
    images: [paletaBellota50, paletaBellota502],
    weight: "4 – 6 kg",
  },
  {
    name: "Paleta de Cebo de Campo 50% Ibérica",
    description: "Criada en libertad con alimentación natural complementaria. Abanico de matices aromáticos.",
    price: "147,00 € – 182,00 €",
    images: [paletaCeboCampo50, paletaCeboCampo502],
    weight: "4 – 6 kg",
  },
  {
    name: "Paleta de Cebo 50% Ibérica",
    description: "Elaborada con cerdos alimentados con cereales de primera calidad. Ideal para el día a día.",
    price: "126,00 € – 154,00 €",
    images: [paletaCebo50, paletaCebo502],
    weight: "4 – 6 kg",
  },
];

const Products = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [imageIndices, setImageIndices] = useState<Record<number, number>>({});
  const [showBuyForm, setShowBuyForm] = useState(false);
  const [buyProductName, setBuyProductName] = useState("");

  const itemsPerView = typeof window !== "undefined" && window.innerWidth >= 1024 ? 4 : typeof window !== "undefined" && window.innerWidth >= 768 ? 2 : 1;
  const maxIndex = Math.max(0, products.length - itemsPerView);

  const prev = useCallback(() => setCurrentIndex((i) => Math.max(0, i - 1)), []);
  const next = useCallback(() => setCurrentIndex((i) => Math.min(maxIndex, i + 1)), [maxIndex]);

  const toggleProductImage = (productIdx: number) => {
    setImageIndices((prev) => ({
      ...prev,
      [productIdx]: ((prev[productIdx] || 0) + 1) % products[productIdx].images.length,
    }));
  };

  return (
    <section id="productos" className="relative py-24 overflow-hidden">
      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <div className="text-center mb-16 space-y-4">
          <p className="text-sm tracking-[0.3em] uppercase text-primary font-medium">
            Catálogo
          </p>
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground">
            Nuestros Productos
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Jamones y paletas ibéricas seleccionados con la máxima exigencia. Cada pieza es única,
            curada con paciencia y tradición.
          </p>
        </div>

        {/* Carousel */}
        <div className="relative">
          {/* Navigation arrows */}
          <button
            onClick={prev}
            disabled={currentIndex === 0}
            className="absolute -left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 bg-background border border-border rounded-full flex items-center justify-center text-foreground hover:bg-primary hover:text-primary-foreground transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            onClick={next}
            disabled={currentIndex >= maxIndex}
            className="absolute -right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 bg-background border border-border rounded-full flex items-center justify-center text-foreground hover:bg-primary hover:text-primary-foreground transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
          >
            <ChevronRight size={20} />
          </button>

          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * (100 / itemsPerView)}%)` }}
            >
              {products.map((product, index) => (
                <article
                  key={index}
                  className="flex-shrink-0 px-2"
                  style={{ width: `${100 / itemsPerView}%` }}
                >
                  <div className="group bg-card border border-border hover:border-primary/30 transition-all duration-300 h-full flex flex-col">
                    <div
                      className="overflow-hidden bg-corvera-cream/30 cursor-pointer relative"
                      onClick={() => toggleProductImage(index)}
                    >
                      <img
                        src={product.images[imageIndices[index] || 0]}
                        alt={product.name}
                        className="w-full h-72 object-contain group-hover:scale-105 transition-transform duration-500 p-4"
                      />
                      {/* Image dots */}
                      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1.5">
                        {product.images.map((_, imgIdx) => (
                          <span
                            key={imgIdx}
                            className={`w-2 h-2 rounded-full transition-colors ${
                              (imageIndices[index] || 0) === imgIdx
                                ? "bg-primary"
                                : "bg-muted-foreground/30"
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                    <div className="p-5 space-y-2 flex-1 flex flex-col">
                      <h3 className="font-serif text-base font-semibold text-foreground leading-tight">
                        {product.name}
                      </h3>
                      <span className="text-xs tracking-widest uppercase text-muted-foreground block">
                        {product.weight}
                      </span>
                      <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2">
                        {product.description}
                      </p>
                      <div className="pt-3 border-t border-border mt-auto">
                        <span className="font-serif text-sm font-semibold text-primary block mb-3">
                          {product.price}
                        </span>
                        <button
                          onClick={() => {
                            setBuyProductName(product.name);
                            setShowBuyForm(true);
                          }}
                          className="w-full inline-flex items-center justify-center gap-1.5 px-3 py-2 bg-primary text-primary-foreground text-xs tracking-widest uppercase hover:bg-primary/90 transition-colors"
                        >
                          Comprar
                        </button>
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>

          {/* Dot indicators */}
          <div className="flex justify-center gap-2 mt-8">
            {Array.from({ length: maxIndex + 1 }).map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentIndex(i)}
                className={`w-2.5 h-2.5 rounded-full transition-colors ${
                  currentIndex === i ? "bg-primary" : "bg-muted-foreground/30"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Ver Tienda button */}
        <div className="text-center mt-12">
          <a
            href="https://www.cesarnieto.com/tienda/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center px-10 py-3 bg-primary text-primary-foreground text-sm tracking-widest uppercase hover:bg-primary/90 transition-colors"
          >
            Ver Tienda
          </a>
        </div>
      </div>

      <ContactFormDialog
        isOpen={showBuyForm}
        onClose={() => setShowBuyForm(false)}
        title={`Comprar: ${buyProductName}`}
        defaultMessage={`Hola, estoy interesado en: ${buyProductName}`}
      />
    </section>
  );
};

export default Products;
