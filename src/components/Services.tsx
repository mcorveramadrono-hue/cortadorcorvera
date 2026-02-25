import { useState } from "react";
import eventosServicio from "@/assets/eventos-servicio.jpg";
import servicioSinPieza from "@/assets/servicio-sin-pieza.jpg";
import servicioConPieza from "@/assets/servicio-con-pieza.jpg";
import { PartyPopper, Utensils, Award } from "lucide-react";
import cuchillo from "@/assets/cuchillo.png";
import ContactFormDialog from "./ContactFormDialog";

const services = [
  {
    icon: PartyPopper,
    title: "Eventos y Catering",
    description:
      "Hacemos de tu evento una experiencia gastronómica inolvidable. Bodas, celebraciones, eventos corporativos... Ponemos el jamón ibérico en el centro de tu mesa con un servicio premium.",
    features: [
      "Bodas y celebraciones",
      "Eventos corporativos",
      "Show de corte en vivo",
      "Posibilidad de elección de la pieza",
    ],
    image: eventosServicio,
  },
  {
    icon: Utensils,
    title: "Corte de Jamón a Cuchillo sin Pieza Incluida",
    description:
      "¿Ya tienes tu pieza de jamón ibérico? Nuestro cortador profesional se encarga de lonchearla con la máxima precisión. Tú pones el jamón, nosotros la técnica y el arte del corte a cuchillo.",
    features: [
      "Trae tu propia pieza",
      "Corte a cuchillo",
      "Servicio a domicilio",
      "Envasado al vacío",
    ],
    image: servicioSinPieza,
  },
  {
    icon: Award,
    title: "Corte de Jamón a Cuchillo con Pieza Incluida",
    description:
      "El servicio más completo: nosotros ponemos la pieza de jamón ibérico de bellota y el cortador profesional. Solo tienes que disfrutar. Ideal para eventos, celebraciones o reuniones especiales.",
    features: [
      "Pieza de jamón ibérico incluida",
      "Corte a cuchillo",
      "Servicio a domicilio",
      "Envasado al vacío",
    ],
    image: servicioConPieza,
  },
];

const Services = () => {
  const [showForm, setShowForm] = useState(false);
  const [selectedService, setSelectedService] = useState("");

  return (
    <section id="servicios" className="relative py-24 bg-corvera-cream overflow-hidden">
      <img
        src={cuchillo}
        alt=""
        className="absolute bottom-20 left-0 w-64 h-auto opacity-[0.05] pointer-events-none select-none rotate-12"
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <div className="text-center mb-16 space-y-4">
          <p className="text-sm tracking-[0.3em] uppercase text-primary font-medium">Servicios</p>
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground">Experiencias a Medida</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Más allá del producto, ofrecemos experiencias únicas alrededor del jamón ibérico.
          </p>
        </div>

        <div className="space-y-20">
          {services.map((service, index) => (
            <div key={index} className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Image: on mobile always after text (order-2), on desktop alternating */}
              <div className={`order-2 ${index % 2 === 1 ? "lg:order-2" : "lg:order-1"}`}>
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-[300px] md:h-[400px] object-cover"
                />
              </div>

              {/* Text: on mobile always first (order-1), on desktop alternating */}
              <div className={`space-y-6 order-1 ${index % 2 === 1 ? "lg:order-1" : "lg:order-2"}`}>
                <service.icon size={32} className="text-primary" />
                <h3 className="font-serif text-3xl font-bold text-foreground">{service.title}</h3>
                <p className="text-muted-foreground leading-relaxed text-lg">{service.description}</p>
                <ul className="space-y-2">
                  {service.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-3 text-muted-foreground">
                      <span className="w-1.5 h-1.5 bg-primary rounded-full flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <button
                  onClick={() => {
                    setSelectedService(service.title);
                    setShowForm(true);
                  }}
                  className="inline-flex items-center gap-2 px-8 py-3 bg-primary text-primary-foreground text-sm tracking-widest uppercase hover:bg-primary/90 transition-colors mt-4"
                >
                  Solicitar Servicio
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <ContactFormDialog
        isOpen={showForm}
        onClose={() => setShowForm(false)}
        title={`Solicitar: ${selectedService}`}
        defaultMessage={`Hola, estoy interesado en: ${selectedService}`}
      />
    </section>
  );
};

export default Services;
