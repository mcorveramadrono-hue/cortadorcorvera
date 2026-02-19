import heroImage from "@/assets/hero-jamon.jpg";
import corvera4 from "@/assets/corvera-4.jpeg";
import corvera5 from "@/assets/corvera-5.jpeg";
import { MessageCircle } from "lucide-react";

const products = [
  {
    name: "Jamón Ibérico de Bellota",
    description: "Pieza entera de jamón 100% ibérico de bellota. Curación mínima de 36 meses en bodega natural.",
    price: "Consultar precio",
    image: heroImage,
    weight: "7-8 kg",
  },
  {
    name: "Paleta Ibérica de Bellota",
    description: "Paleta 100% ibérica de bellota con curación de 24 meses. Sabor intenso y textura sedosa.",
    price: "Consultar precio",
    image: corvera4,
    weight: "5-6 kg",
  },
  {
    name: "Jamón Ibérico de Cebo de Campo",
    description: "Jamón ibérico de cebo de campo, criado en libertad con alimentación natural complementaria.",
    price: "Consultar precio",
    image: corvera5,
    weight: "7-8 kg",
  },
  {
    name: "Loncheado de Bellota",
    description: "Jamón ibérico de bellota cortado a cuchillo y envasado al vacío. Listo para degustar.",
    price: "Consultar precio",
    image: heroImage,
    weight: "100g / sobre",
  },
  {
    name: "Pack Degustación",
    description: "Selección de loncheados ibéricos de bellota: jamón, paleta y lomo. Ideal para regalo.",
    price: "Consultar precio",
    image: corvera4,
    weight: "3 x 100g",
  },
  {
    name: "Media Pieza de Jamón",
    description: "Media pieza de jamón ibérico de bellota, deshuesada y envasada al vacío para mayor comodidad.",
    price: "Consultar precio",
    image: corvera5,
    weight: "3-4 kg",
  },
];

const WHATSAPP_NUMBER = "34600000000";

const Products = () => {
  return (
    <section id="productos" className="py-24">
      <div className="max-w-7xl mx-auto px-6">
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
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {product.description}
                </p>
                <div className="flex items-center justify-between pt-3 border-t border-border">
                  <span className="font-serif text-lg font-semibold text-primary">
                    {product.price}
                  </span>
                  <a
                    href={`https://wa.me/${WHATSAPP_NUMBER}?text=Hola, me interesa el producto: ${product.name}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm text-primary hover:text-primary/80 transition-colors"
                  >
                    <MessageCircle size={16} />
                    <span>Pedir</span>
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Products;
