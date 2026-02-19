import corteImage from "@/assets/corte-servicio.jpg";
import eventosImage from "@/assets/eventos-servicio.jpg";
import { MessageCircle, Scissors, PartyPopper } from "lucide-react";

const WHATSAPP_NUMBER = "34600000000";

const services = [
  {
    icon: Scissors,
    title: "Corte de Jamón a Domicilio",
    description:
      "Nuestro cortador profesional se desplaza a tu hogar o local para ofrecer un servicio de corte impecable. Disfruta de lonchas perfectas cortadas a cuchillo, con la técnica y el mimo que solo un experto puede ofrecer.",
    features: [
      "Cortador profesional certificado",
      "Desplazamiento incluido",
      "Corte a cuchillo de máxima precisión",
      "Presentación elegante en plato",
    ],
    image: corteImage,
    whatsappText: "Hola, me gustaría contratar el servicio de corte de jamón a domicilio",
  },
  {
    icon: PartyPopper,
    title: "Eventos y Catering",
    description:
      "Hacemos de tu evento una experiencia gastronómica inolvidable. Bodas, celebraciones, eventos corporativos... Ponemos el jamón ibérico en el centro de tu mesa con un servicio premium.",
    features: [
      "Bodas y celebraciones",
      "Eventos corporativos",
      "Show de corte en vivo",
      "Maridaje con vinos seleccionados",
    ],
    image: eventosImage,
    whatsappText: "Hola, me gustaría información sobre el servicio de eventos y catering",
  },
];

const Services = () => {
  return (
    <section id="servicios" className="py-24 bg-corvera-cream">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16 space-y-4">
          <p className="text-sm tracking-[0.3em] uppercase text-primary font-medium">
            Servicios
          </p>
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground">
            Experiencias a Medida
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Más allá del producto, ofrecemos experiencias únicas alrededor del jamón ibérico.
          </p>
        </div>

        <div className="space-y-20">
          {services.map((service, index) => (
            <div
              key={index}
              className={`grid lg:grid-cols-2 gap-12 items-center ${
                index % 2 === 1 ? "lg:direction-rtl" : ""
              }`}
            >
              <div className={`${index % 2 === 1 ? "lg:order-2" : ""}`}>
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-[400px] object-cover"
                />
              </div>

              <div className={`space-y-6 ${index % 2 === 1 ? "lg:order-1" : ""}`}>
                <service.icon size={32} className="text-primary" />
                <h3 className="font-serif text-3xl font-bold text-foreground">
                  {service.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed text-lg">
                  {service.description}
                </p>
                <ul className="space-y-2">
                  {service.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-3 text-muted-foreground">
                      <span className="w-1.5 h-1.5 bg-primary rounded-full flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <a
                  href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(service.whatsappText)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-8 py-3 bg-primary text-primary-foreground text-sm tracking-widest uppercase hover:bg-primary/90 transition-colors mt-4"
                >
                  <MessageCircle size={16} />
                  Solicitar Servicio
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
