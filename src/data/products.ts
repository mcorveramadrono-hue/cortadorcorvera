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

export interface WeightOption {
  weight: number; // kg
  price: number;  // euros
  label: string;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  pricePerKg: number;
  images: string[];
  weightOptions: WeightOption[];
  curing: string;
  campaign?: string;
  knifeSupplementPrice: number;
  category: "jamon" | "paleta";
}

function generateWeightOptions(minKg: number, maxKg: number, stepKg: number, pricePerKg: number): WeightOption[] {
  const options: WeightOption[] = [];
  for (let w = minKg; w <= maxKg + 0.01; w += stepKg) {
    const rounded = Math.round(w * 10) / 10;
    const price = Math.round(rounded * pricePerKg * 100) / 100;
    options.push({
      weight: rounded,
      price,
      label: `${rounded.toFixed(1).replace('.', ',')} kg — ${price.toFixed(2).replace('.', ',')} €`,
    });
  }
  return options;
}

export const products: Product[] = [
  // JAMONES
  {
    id: "jamon-bellota-100-dop",
    name: "Jamón Bellota 100% Ibérico D.O.P.",
    description: "Se obtiene a partir de cerdos de raza 100% ibérica. Se alimentan en exclusiva de hierba y bellotas, estando en libertad total en las Dehesas de Salamanca y Extremadura.",
    pricePerKg: 45.97,
    images: [jamonBellota100, jamonBellota1002],
    weightOptions: generateWeightOptions(6.5, 9.5, 0.5, 45.97),
    curing: "Más de 36 meses",
    campaign: "2020",
    knifeSupplementPrice: 50,
    category: "jamon",
  },
  {
    id: "jamon-bellota-100",
    name: "Jamón Bellota 100% Ibérico",
    description: "De cerdos criados en libertad y alimentados con bellota. Elaborado de forma tradicional y curado más de 36 meses, destaca por su sabor intenso con toque dulce, su color característico y su textura suave y fundente.",
    pricePerKg: 41.98,
    images: [jamonBellota100, jamonBellota1002],
    weightOptions: generateWeightOptions(7.5, 8.5, 0.5, 41.98),
    curing: "Más de 36 meses",
    campaign: "2020",
    knifeSupplementPrice: 50,
    category: "jamon",
  },
  {
    id: "jamon-bellota-75-dop",
    name: "Jamón Bellota Ibérico 75% D.O.P.",
    description: "Se obtiene a partir de cerdos de raza ibérica que se alimentan exclusivamente de hierba y bellotas, en total libertad en las Dehesas de Salamanca y Extremadura.",
    pricePerKg: 38.66,
    images: [jamonBellota75, jamonBellota752],
    weightOptions: generateWeightOptions(7, 10, 0.5, 38.66),
    curing: "Más de 36 meses",
    campaign: "2019",
    knifeSupplementPrice: 50,
    category: "jamon",
  },
  {
    id: "jamon-cebo-campo-50",
    name: "Jamón Cebo de Campo 50% Ibérico",
    description: "Se obtiene de cruces selectos del Cerdo Ibérico, alcanzando un 50% de Raza Ibérica en su genética. Se alimentan de hierbas y otros recursos mientras campean libremente por fincas de César Nieto.",
    pricePerKg: 25.35,
    images: [jamonCeboCampo50, jamonCeboCampo502],
    weightOptions: generateWeightOptions(7, 10, 0.5, 25.35),
    curing: "Más de 30 meses",
    knifeSupplementPrice: 50,
    category: "jamon",
  },
  {
    id: "jamon-cebo-50",
    name: "Jamón Cebo 50% Ibérico",
    description: "Se obtiene a partir de cruces selectos del Cerdo Ibérico, con un 50% de la Raza Ibérica en su genética. Estos cerdos se crían en granjas que aseguran su bienestar animal y son alimentados con piensos naturales, a base de cereales de la máxima calidad.",
    pricePerKg: 22.69,
    images: [jamonCebo50, jamonCebo502],
    weightOptions: generateWeightOptions(7, 10, 0.5, 22.69),
    curing: "Más de 30 meses",
    knifeSupplementPrice: 50,
    category: "jamon",
  },
  {
    id: "jamon-reserva-familiar",
    name: "Jamón César Nieto Reserva Familiar <7kg",
    description: "Jamón seleccionado de forma artesanal, elaborado a partir de piezas escogidas por su excelente calidad y equilibrio de grasa infiltrada. Su curación lenta en bodegas naturales potencia un aroma intenso y un sabor suave y persistente en boca.",
    pricePerKg: 21.05,
    images: [jamonCebo50, jamonCebo502],
    weightOptions: generateWeightOptions(7, 7, 0.5, 21.05),
    curing: "Más de 30 meses",
    knifeSupplementPrice: 50,
    category: "jamon",
  },
  // PALETAS
  {
    id: "paleta-bellota-100-dop",
    name: "Paleta Bellota 100% Ibérica D.O.P.",
    description: "Fruto de su prolongada curación de más de 24 meses, y de su alimentación natural a base de bellotas. Su color característico va del rosa intenso al rosa pálido con abundante grasa veteada.",
    pricePerKg: 29.61,
    images: [paletaBellota100, paletaBellota502],
    weightOptions: generateWeightOptions(5, 6, 0.5, 29.61),
    curing: "Más de 24 meses",
    campaign: "2021",
    knifeSupplementPrice: 35,
    category: "paleta",
  },
  {
    id: "paleta-bellota-100",
    name: "Paleta Bellota 100% Ibérica",
    description: "Curada más de 24 meses y procedente de cerdos criados en libertad y alimentados con bellotas. Elaborada de forma tradicional con menos sal gracias al clima de Guijuelo, destaca por su sabor intenso con matices delicados y toque dulce.",
    pricePerKg: 28.95,
    images: [paletaBellota100, paletaBellota502],
    weightOptions: generateWeightOptions(5, 6, 0.5, 28.95),
    curing: "Más de 24 meses",
    knifeSupplementPrice: 35,
    category: "paleta",
  },
  {
    id: "paleta-bellota-75-dop",
    name: "Paleta Bellota 75% Ibérica D.O.P.",
    description: "Fruto de su prolongada curación de más de 24 meses, y de su alimentación natural a base de bellotas. La proporción superior al 56% de ácido oleico en sus grasas la hacen untuosa a la vez que suave, se \"funde\" en el paladar.",
    pricePerKg: 27.62,
    images: [paletaBellota50, paletaBellota502],
    weightOptions: generateWeightOptions(4, 6, 0.5, 27.62),
    curing: "Más de 24 meses",
    campaign: "2021",
    knifeSupplementPrice: 35,
    category: "paleta",
  },
  {
    id: "paleta-bellota-50",
    name: "Paleta Bellota 50% Ibérica",
    description: "Fruto de su prolongada curación de más de 24 meses, y de su alimentación natural a base de bellotas. La proporción superior al 56% de ácido oleico en sus grasas la hacen untuosa a la vez que suave, se \"funde\" en el paladar.",
    pricePerKg: 26.95,
    images: [paletaBellota50, paletaBellota502],
    weightOptions: generateWeightOptions(4, 6, 0.5, 26.95),
    curing: "Más de 24 meses",
    knifeSupplementPrice: 35,
    category: "paleta",
  },
  {
    id: "paleta-cebo-campo-50",
    name: "Paleta Cebo de Campo 50% Ibérica",
    description: "Fruto de su prolongada curación superior a los 20 meses. Su color va del rosa oscuro al rosa claro con abundante grasa veteada. La elevada proporción de ácido oleico en sus grasas la hacen muy suave en boca a la vez que ligera.",
    pricePerKg: 23.32,
    images: [paletaCeboCampo50, paletaCeboCampo502],
    weightOptions: generateWeightOptions(4, 6, 0.5, 23.32),
    curing: "Más de 20 meses",
    knifeSupplementPrice: 35,
    category: "paleta",
  },
  {
    id: "paleta-cebo-50",
    name: "Paleta Cebo 50% Ibérica",
    description: "Se obtiene a partir de cruces selectos del Cerdo Ibérico, alcanzando un 50% de la Raza Ibérica en su genética. Estos cerdos se crían en granjas que aseguran su bienestar animal y son alimentados con piensos naturales a base de cereales de la máxima calidad.",
    pricePerKg: 20.96,
    images: [paletaCebo50, paletaCebo502],
    weightOptions: generateWeightOptions(4, 6, 0.5, 20.96),
    curing: "Más de 20 meses",
    knifeSupplementPrice: 35,
    category: "paleta",
  },
];
