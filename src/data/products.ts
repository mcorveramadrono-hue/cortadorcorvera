import jamonBellota100 from "@/assets/products/jamon-bellota-100.jpg";
import jamonBellota1002 from "@/assets/products/jamon-bellota-100-2.jpg";
import jamonBellota75 from "@/assets/products/jamon-bellota-75.jpg";
import jamonBellota752 from "@/assets/products/jamon-bellota-75-2.jpg";
import jamonCeboCampo50 from "@/assets/products/jamon-cebo-campo-50.jpg";
import jamonCeboCampo502 from "@/assets/products/jamon-cebo-campo-50-2.jpg";
import jamonCebo50 from "@/assets/products/jamon-cebo-50.jpg";
import jamonCebo502 from "@/assets/products/jamon-cebo-50-2.jpg";
import paletaBellota100 from "@/assets/products/paleta-bellota-100.webp";
import paletaBellota1002 from "@/assets/products/paleta-bellota-100-2.jpg";
import paletaBellota50 from "@/assets/products/paleta-bellota-50.jpg";
import paletaBellota502 from "@/assets/products/paleta-bellota-50-2.jpg";
import paletaCeboCampo50 from "@/assets/products/paleta-cebo-campo-50.jpg";
import paletaCeboCampo502 from "@/assets/products/paleta-cebo-campo-50-2.jpg";
import paletaCebo50 from "@/assets/products/paleta-cebo-50.jpg";
import paletaCebo502 from "@/assets/products/paleta-cebo-50-2.jpg";

export interface Product {
  name: string;
  description: string;
  price: string;
  pricePerKg?: string;
  images: string[];
  weight: string;
  curing: string;
  campaign?: string;
  knifeSuplement: string;
  ivaIncluded: boolean;
  category: "jamon" | "paleta";
}

export const products: Product[] = [
  // JAMONES
  {
    name: "Jamón Bellota 100% Ibérico D.O.P.",
    description: "Se obtiene a partir de cerdos de raza 100% ibérica. Se alimentan en exclusiva de hierba y bellotas, estando en libertad total en las Dehesas de Salamanca y Extremadura.",
    price: "299 – 450 €",
    pricePerKg: "45,97 €/kg",
    images: [jamonBellota100, jamonBellota1002],
    weight: "6,5 – 9,5 kg",
    curing: "Más de 36 meses",
    campaign: "2020",
    knifeSuplement: "Suplemento de 50 €",
    ivaIncluded: true,
    category: "jamon",
  },
  {
    name: "Jamón Bellota 100% Ibérico",
    description: "De cerdos criados en libertad y alimentados con bellota. Elaborado de forma tradicional y curado más de 36 meses, destaca por su sabor intenso con toque dulce, su color característico y su textura suave y fundente.",
    price: "315 – 360 €",
    pricePerKg: "41,98 €/kg",
    images: [jamonBellota100, jamonBellota1002],
    weight: "7,5 – 8,5 kg",
    curing: "Más de 36 meses",
    campaign: "2020",
    knifeSuplement: "Suplemento de 50 €",
    ivaIncluded: true,
    category: "jamon",
  },
  {
    name: "Jamón Bellota Ibérico 75% D.O.P.",
    description: "Se obtiene a partir de cerdos de raza ibérica que se alimentan exclusivamente de hierba y bellotas, en total libertad en las Dehesas de Salamanca y Extremadura.",
    price: "270 – 390 €",
    pricePerKg: "38,66 €/kg",
    images: [jamonBellota75, jamonBellota752],
    weight: "7 – 10 kg",
    curing: "Más de 36 meses",
    campaign: "2019",
    knifeSuplement: "Suplemento de 50 €",
    ivaIncluded: true,
    category: "jamon",
  },
  {
    name: "Jamón Cebo de Campo 50% Ibérico",
    description: "Se obtiene de cruces selectos del Cerdo Ibérico, alcanzando un 50% de Raza Ibérica en su genética. Se alimentan de hierbas y otros recursos mientras campean libremente por fincas de César Nieto.",
    price: "178 – 255 €",
    pricePerKg: "25,35 €/kg",
    images: [jamonCeboCampo50, jamonCeboCampo502],
    weight: "7 – 10 kg",
    curing: "Más de 30 meses",
    knifeSuplement: "Suplemento de 50 €",
    ivaIncluded: true,
    category: "jamon",
  },
  {
    name: "Jamón Cebo 50% Ibérico",
    description: "Se obtiene a partir de cruces selectos del Cerdo Ibérico, con un 50% de la Raza Ibérica en su genética. Estos cerdos se crían en granjas que aseguran su bienestar animal y son alimentados con piensos naturales, a base de cereales de la máxima calidad.",
    price: "155 – 220 €",
    pricePerKg: "22,69 €/kg",
    images: [jamonCebo50, jamonCebo502],
    weight: "7 – 10 kg",
    curing: "Más de 30 meses",
    knifeSuplement: "Suplemento de 50 €",
    ivaIncluded: true,
    category: "jamon",
  },
  {
    name: "Jamón César Nieto Reserva Familiar <7kg",
    description: "Jamón seleccionado de forma artesanal, elaborado a partir de piezas escogidas por su excelente calidad y equilibrio de grasa infiltrada. Su curación lenta en bodegas naturales potencia un aroma intenso y un sabor suave y persistente en boca.",
    price: "150 € (aprox.)",
    pricePerKg: "21,05 €/kg",
    images: [jamonCebo50, jamonCebo502],
    weight: "< 7 kg",
    curing: "Más de 30 meses",
    knifeSuplement: "Suplemento de 50 €",
    ivaIncluded: true,
    category: "jamon",
  },
  // PALETAS
  {
    name: "Paleta Bellota 100% Ibérica D.O.P.",
    description: "Fruto de su prolongada curación de más de 24 meses, y de su alimentación natural a base de bellotas. Su color característico va del rosa intenso al rosa pálido con abundante grasa veteada.",
    price: "150 – 180 €",
    pricePerKg: "29,61 €/kg",
    images: [paletaBellota100, paletaBellota502],
    weight: "5 – 6 kg",
    curing: "Más de 24 meses",
    campaign: "2021",
    knifeSuplement: "Suplemento de 35 €",
    ivaIncluded: true,
    category: "paleta",
  },
  {
    name: "Paleta Bellota 100% Ibérica",
    description: "Curada más de 24 meses y procedente de cerdos criados en libertad y alimentados con bellotas. Elaborada de forma tradicional con menos sal gracias al clima de Guijuelo, destaca por su sabor intenso con matices delicados y toque dulce.",
    price: "145 – 175 €",
    pricePerKg: "28,95 €/kg",
    images: [paletaBellota100, paletaBellota502],
    weight: "5 – 6 kg",
    curing: "Más de 24 meses",
    knifeSuplement: "Suplemento de 35 €",
    ivaIncluded: true,
    category: "paleta",
  },
  {
    name: "Paleta Bellota 75% Ibérica D.O.P.",
    description: "Fruto de su prolongada curación de más de 24 meses, y de su alimentación natural a base de bellotas. La proporción superior al 56% de ácido oleico en sus grasas la hacen untuosa a la vez que suave, se \"funde\" en el paladar.",
    price: "110 – 165 €",
    pricePerKg: "27,62 €/kg",
    images: [paletaBellota50, paletaBellota502],
    weight: "4 – 6 kg",
    curing: "Más de 24 meses",
    campaign: "2021",
    knifeSuplement: "Suplemento de 35 €",
    ivaIncluded: true,
    category: "paleta",
  },
  {
    name: "Paleta Bellota 50% Ibérica",
    description: "Fruto de su prolongada curación de más de 24 meses, y de su alimentación natural a base de bellotas. La proporción superior al 56% de ácido oleico en sus grasas la hacen untuosa a la vez que suave, se \"funde\" en el paladar.",
    price: "105 – 160 €",
    pricePerKg: "26,95 €/kg",
    images: [paletaBellota50, paletaBellota502],
    weight: "4 – 6 kg",
    curing: "Más de 24 meses",
    knifeSuplement: "Suplemento de 35 €",
    ivaIncluded: true,
    category: "paleta",
  },
  {
    name: "Paleta Cebo de Campo 50% Ibérica",
    description: "Fruto de su prolongada curación superior a los 20 meses. Su color va del rosa oscuro al rosa claro con abundante grasa veteada. La elevada proporción de ácido oleico en sus grasas la hacen muy suave en boca a la vez que ligera.",
    price: "95 – 140 €",
    pricePerKg: "23,32 €/kg",
    images: [paletaCeboCampo50, paletaCeboCampo502],
    weight: "4 – 6 kg",
    curing: "Más de 20 meses",
    knifeSuplement: "Suplemento de 35 €",
    ivaIncluded: true,
    category: "paleta",
  },
  {
    name: "Paleta Cebo 50% Ibérica",
    description: "Se obtiene a partir de cruces selectos del Cerdo Ibérico, alcanzando un 50% de la Raza Ibérica en su genética. Estos cerdos se crían en granjas que aseguran su bienestar animal y son alimentados con piensos naturales a base de cereales de la máxima calidad.",
    price: "85 – 125 €",
    pricePerKg: "20,96 €/kg",
    images: [paletaCebo50, paletaCebo502],
    weight: "4 – 6 kg",
    curing: "Más de 20 meses",
    knifeSuplement: "Suplemento de 35 €",
    ivaIncluded: true,
    category: "paleta",
  },
];
