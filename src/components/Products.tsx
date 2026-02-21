import { useState } from "react";
import heroImage from "@/assets/hero-jamon.jpg";
import corvera4 from "@/assets/corvera-4.jpeg";
import corvera5 from "@/assets/corvera-5.jpeg";
import { Info, ShoppingBag } from "lucide-react";
import cerdo from "@/assets/cerdo.png";
import ContactFormDialog from "./ContactFormDialog";
import ProductInfoDialog from "./ProductInfoDialog";

const products = [
  {
    name: "Jamón Ibérico de Bellota",
    description: "Pieza entera de jamón 100% ibérico de bellota. Curación mínima de 36 meses en bodega natural.",
    longDescription: "Pieza entera de jamón 100% ibérico de bellota, procedente de cerdos criados en libertad en las dehesas extremeñas. Alimentados exclusivamente con bellotas durante la montanera, cada pieza se cura durante un mínimo de 36 meses en bodega natural, donde adquiere su sabor profundo, su grasa infiltrada y su textura sedosa. Un producto de excelencia para los paladares más exigentes.",
    price: "Consultar precio",
    image: heroImage,
    weight: "7-8 kg",
  },
  {
    name: "Paleta Ibérica de Bellota",
    description: "Paleta 100% ibérica de bellota con curación de 24 meses. Sabor intenso y textura sedosa.",
    longDescription: "Paleta 100% ibérica de bellota con curación de 24 meses en bodega natural. La paleta, más pequeña que el jamón, ofrece un sabor más intenso y concentrado. Ideal para degustar en reuniones familiares o como pieza de consumo más accesible sin renunciar a la calidad suprema del ibérico de bellota.",
    price: "Consultar precio",
    image: corvera4,
    weight: "5-6 kg",
  },
  {
    name: "Jamón Ibérico de Cebo de Campo",
    description: "Jamón ibérico de cebo de campo, criado en libertad con alimentación natural complementaria.",
    longDescription: "Jamón ibérico de cebo de campo, elaborado a partir de cerdos ibéricos criados en libertad en la dehesa con alimentación natural complementaria a base de cereales y leguminosas. Su curación de al menos 24 meses le confiere un equilibrio perfecto entre sabor, aroma y textura, siendo una opción excepcional con la esencia del ibérico.",
    price: "Consultar precio",
    image: corvera5,
    weight: "7-8 kg",
  },
  {
    name: "Loncheado de Bellota",
    description: "Jamón ibérico de bellota cortado a cuchillo y envasado al vacío. Listo para degustar.",
    longDescription: "Lonchas de jamón ibérico de bellota cortadas a cuchillo por nuestros maestros cortadores y envasadas al vacío para conservar todo su aroma y sabor. Cada sobre contiene 100g de puro placer ibérico, listo para abrir y degustar en cualquier momento. Presentación ideal para regalo o para disfrutar en casa sin necesidad de jamonero.",
    price: "Consultar precio",
    image: heroImage,
    weight: "100g / sobre",
  },
  {
    name: "Pack Degustación",
    description: "Selección de loncheados ibéricos de bellota: jamón, paleta y lomo. Ideal para regalo.",
    longDescription: "Pack degustación compuesto por tres sobres de loncheados ibéricos de bellota: jamón, paleta y lomo ibérico. Cada variedad aporta un matiz diferente de sabor, permitiendo una experiencia gastronómica completa. Presentado en un estuche elegante, es el regalo perfecto para amantes del ibérico o para descubrir las diferencias entre las distintas piezas.",
    price: "Consultar precio",
    image: corvera4,
    weight: "3 x 100g",
  },
  {
    name: "Media Pieza de Jamón",
    description: "Media pieza de jamón ibérico de bellota, deshuesada y envasada al vacío para mayor comodidad.",
    longDescription: "Media pieza de jamón ibérico de bellota, deshuesada y envasada al vacío para una conservación óptima y mayor comodidad de consumo. Ideal para quienes buscan disfrutar de la calidad suprema del jamón ibérico sin necesidad de jamonero ni herramientas especiales. Se puede cortar fácilmente en casa en lonchas perfectas.",
    price: "Consultar precio",
    image: corvera5,
    weight: "3-4 kg",
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
            Jamones ibéricos seleccionados con la máxima exigencia. Cada pieza es única, 
            curada con paciencia y tradición.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product, index) => (
            <article
              key={index}
              className="group bg-card border border-border hover:border-primary/30 transition-all duration-300"
            >
              <div className="overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-6 space-y-3">
                <div className="flex justify-between items-start">
                  <h3 className="font-serif text-xl font-semibold text-foreground">
                    {product.name}
                  </h3>
                  <span className="text-xs tracking-widest uppercase text-muted-foreground whitespace-nowrap ml-2">
                    {product.weight}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2">
                  {product.description}
                </p>
                <div className="flex items-center justify-between pt-3 border-t border-border">
                  <span className="font-serif text-lg font-semibold text-primary">
                    {product.price}
                  </span>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => { setSelectedProduct(product); setShowInfo(true); }}
                      className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      <Info size={16} />
                      <span className="hidden sm:inline">Info</span>
                    </button>
                    <button
                      onClick={() => { setBuyProductName(product.name); setShowBuyForm(true); }}
                      className="inline-flex items-center gap-1.5 px-4 py-2 bg-primary text-primary-foreground text-xs tracking-widest uppercase hover:bg-primary/90 transition-colors"
                    >
                      <ShoppingBag size={14} />
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
