import { useState } from "react";
import jamonCebo50 from "@/assets/products/jamon-cebo-50.jpg";
import jamonCeboCampo50 from "@/assets/products/jamon-cebo-campo-50.jpg";
import jamonBellota100 from "@/assets/products/jamon-bellota-100.jpg";
import jamonBellota75 from "@/assets/products/jamon-bellota-75.jpg";
import paletaCebo50 from "@/assets/products/paleta-cebo-50.jpg";
import paletaCeboCampo50 from "@/assets/products/paleta-cebo-campo-50.jpg";
import paletaBellota100 from "@/assets/products/paleta-bellota-100.webp";
import paletaBellota50 from "@/assets/products/paleta-bellota-50.jpg";
import { Info, ShoppingBag } from "lucide-react";
import cerdo from "@/assets/cerdo.png";
import ContactFormDialog from "./ContactFormDialog";
import ProductInfoDialog from "./ProductInfoDialog";

const products = [
  {
    name: "Jamón de Bellota 100% Ibérico",
    description: "Jamón de bellota 100% ibérico, criado en libertad en la dehesa. Curación mínima de 36 meses.",
    longDescription: "El jamón de bellota 100% ibérico es la pieza cumbre de la gastronomía española. Proviene de cerdos ibéricos puros criados en libertad en la dehesa, alimentados exclusivamente con bellotas durante la montanera. Su curación mínima de 36 meses en bodega natural le confiere un sabor profundo, con mayor infiltración de grasa, más jugoso y con un aroma intenso y aromático.",
    price: "588,00 € – 770,00 €",
    image: jamonBellota100,
    weight: "7,5 – 8,5 kg",
  },
  {
    name: "Jamón de Bellota 75% Ibérico DO",
    description: "Jamón de bellota 75% ibérico con Denominación de Origen Guijuelo. Sabor redondo y equilibrado.",
    longDescription: "Jamón de bellota 75% ibérico con Denominación de Origen Guijuelo. Procede de cerdos ibéricos criados en la dehesa con alimentación natural a base de bellotas. Un producto de excelencia avalado por la D.O. Guijuelo.",
    price: "497,00 € – 630,00 €",
    image: jamonBellota75,
    weight: "7 – 10 kg",
  },
  {
    name: "Jamón de Cebo de Campo 50% Ibérico",
    description: "Cerdos criados en libertad con alimentación natural complementaria. Premiado en Frankfurt.",
    longDescription: "El jamón de cebo de campo 50% ibérico proviene de cerdos criados en libertad en la dehesa con alimentación natural complementaria a base de cereales y leguminosas. Su curación lenta y pausada le confiere un equilibrio perfecto entre sabor, aroma y textura.",
    price: "336,00 €",
    image: jamonCeboCampo50,
    weight: "7 – 10 kg",
  },
  {
    name: "Jamón de Cebo 50% Ibérico",
    description: "Elaborado con cerdos alimentados con cereales de primera calidad. Ideal para el día a día.",
    longDescription: "El jamón de cebo 50% ibérico se elabora a partir de cerdos alimentados a base de cereales de primera calidad. Con una curación mínima de 36 meses en bodega natural, ofrece un sabor delicioso y aromático.",
    price: "252,00 € – 322,00 €",
    image: jamonCebo50,
    weight: "7 – 10 kg",
  },
  {
    name: "Paleta de Bellota 100% Ibérica",
    description: "Sabor intenso y concentrado, con grasa blanda y brillante. Extremadamente jugosa.",
    longDescription: "La paleta de bellota 100% ibérica proviene de las patas delanteras de cerdos ibéricos puros criados en libertad y alimentados con bellotas. Su curación más corta que el jamón le confiere un sabor extremadamente intenso y concentrado.",
    price: "196,00 €",
    image: paletaBellota100,
    weight: "5 – 6 kg",
  },
  {
    name: "Paleta de Bellota 50% Ibérica",
    description: "Sabor intenso con la calidad del cerdo ibérico de bellota en formato más accesible.",
    longDescription: "La paleta de bellota 50% ibérica combina la calidad del cerdo ibérico alimentado con bellotas con un proceso de curación artesanal. Más pequeña que el jamón, ofrece un sabor más intenso y concentrado.",
    price: "182,00 € – 224,00 €",
    image: paletaBellota50,
    weight: "4 – 6 kg",
  },
  {
    name: "Paleta de Cebo de Campo 50% Ibérica",
    description: "Criada en libertad con alimentación natural complementaria. Abanico de matices aromáticos.",
    longDescription: "La paleta de cebo de campo 50% ibérica proviene de cerdos criados en libertad en la dehesa con alimentación natural complementaria. Su curación artesanal le confiere un sabor intenso y un abanico de matices aromáticos.",
    price: "147,00 € – 182,00 €",
    image: paletaCeboCampo50,
    weight: "4 – 6 kg",
  },
  {
    name: "Paleta de Cebo 50% Ibérica",
    description: "Elaborada con cerdos alimentados con cereales de primera calidad. Ideal para el día a día.",
    longDescription: "La paleta de cebo 50% ibérica se elabora a partir de cerdos alimentados con cereales de primera calidad. Con una curación cuidada en bodegas naturales, ofrece un sabor delicioso y aromático.",
    price: "126,00 € – 154,00 €",
    image: paletaCebo50,
    weight: "4 – 6 kg",
  },
];

const Products = () => {
  const [selectedProduct, setSelectedProduct] = useState<typeof products[0] | null>(null);
  const [showInfo, setShowInfo] = useState(false);
  const [showBuyForm, setShowBuyForm] = useState(false);
  const [buyProductName, setBuyProductName] = useState("");

  return (
    <section id="productos" className="relative py-24 overflow-hidden">
      {/* Decorative cerdo illustration */}
      <img
        src={cerdo}
        alt=""
        className="absolute top-12 right-0 w-48 h-auto opacity-[0.04] pointer-events-none select-none"
      />

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

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product, index) => (
            <article
              key={index}
              className="group bg-card border border-border hover:border-primary/30 transition-all duration-300"
            >
              <div className="overflow-hidden bg-corvera-cream/30">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-72 object-contain group-hover:scale-105 transition-transform duration-500 p-4"
                />
              </div>
              <div className="p-5 space-y-2">
                <h3 className="font-serif text-base font-semibold text-foreground leading-tight">
                  {product.name}
                </h3>
                <span className="text-xs tracking-widest uppercase text-muted-foreground block">
                  {product.weight}
                </span>
                <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2">
                  {product.description}
                </p>
                <div className="pt-3 border-t border-border space-y-3">
                  <span className="font-serif text-sm font-semibold text-primary block">
                    {product.price}
                  </span>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => { setSelectedProduct(product); setShowInfo(true); }}
                      className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors"
                    >
                      <Info size={14} />
                      Info
                    </button>
                    <button
                      onClick={() => { setBuyProductName(product.name); setShowBuyForm(true); }}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-primary text-primary-foreground text-xs tracking-widest uppercase hover:bg-primary/90 transition-colors ml-auto"
                    >
                      <ShoppingBag size={12} />
                      Comprar
                    </button>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      <ProductInfoDialog
        isOpen={showInfo}
        onClose={() => setShowInfo(false)}
        product={selectedProduct}
      />

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
