import jamonBellota100 from "@/assets/products/jamon-bellota-100.jpg";
import jamonBellota100DopCN from "@/assets/products/jamon-bellota-100-dop-cn.jpg";
import jamonBellota100DopCN2 from "@/assets/products/jamon-bellota-100-dop-cn-2.jpg";
import jamonReservaFamiliar from "@/assets/products/jamon-reserva-familiar-new.png";
import jamonBellota1002 from "@/assets/products/jamon-bellota-100-2.jpg";
import jamonBellota75 from "@/assets/products/jamon-bellota-75.jpg";
import jamonBellota752 from "@/assets/products/jamon-bellota-75-2.jpg";
import jamonCeboCampo50 from "@/assets/products/jamon-cebo-campo-50.jpg";
import jamonCeboCampo502 from "@/assets/products/jamon-cebo-campo-50-2.jpg";
import jamonCebo50 from "@/assets/products/jamon-cebo-50.jpg";
import jamonCebo502 from "@/assets/products/jamon-cebo-50-2.jpg";
import paletaBellota100 from "@/assets/products/paleta-bellota-100.webp";
import paletaBellota100Dop from "@/assets/products/paleta-bellota-100-dop-new.png";
import paletaBellota75Dop from "@/assets/products/paleta-bellota-75-dop-new.png";
import paletaBellota1002 from "@/assets/products/paleta-bellota-100-2.jpg";
import paletaBellota50 from "@/assets/products/paleta-bellota-50.jpg";
import paletaBellota502 from "@/assets/products/paleta-bellota-50-2.jpg";
import paletaCeboCampo50 from "@/assets/products/paleta-cebo-campo-50.jpg";
import paletaCeboCampo502 from "@/assets/products/paleta-cebo-campo-50-2.jpg";
import paletaCebo50 from "@/assets/products/paleta-cebo-50.jpg";
import paletaCebo502 from "@/assets/products/paleta-cebo-50-2.jpg";

// La Joya
import lajoyaJamonBellota100 from "@/assets/products/lajoya/jamon-bellota-100.png";
import lajoyaJamonBellota100Alt from "@/assets/products/lajoya/jamon-bellota-100-alt.png";
import lajoyaJamonBellota50 from "@/assets/products/lajoya/jamon-bellota-50.png";
import lajoyaJamonBellota50Alt from "@/assets/products/lajoya/jamon-bellota-50-alt.png";
import lajoyaJamonCebo50 from "@/assets/products/lajoya/jamon-cebo-50.png";
import lajoyaJamonCebo50Alt from "@/assets/products/lajoya/jamon-cebo-50-alt.png";
import lajoyaPaletaBellota100 from "@/assets/products/lajoya/paleta-bellota-100.png";
import lajoyaPaletaBellota50 from "@/assets/products/lajoya/paleta-bellota-50.png";
import lajoyaPaletaBellota50Alt from "@/assets/products/lajoya/paleta-bellota-50-alt.png";
import lajoyaPaletaCebo50 from "@/assets/products/lajoya/paleta-cebo-50.png";
import lajoyaAmbient1 from "@/assets/products/lajoya/ambient-1.jpg";
import lajoyaAmbient2 from "@/assets/products/lajoya/ambient-2.jpg";
import lajoyaAmbient3 from "@/assets/products/lajoya/ambient-3.jpg";
import lajoyaAmbient4 from "@/assets/products/lajoya/ambient-4.jpg";
import lajoyaAmbient5 from "@/assets/products/lajoya/ambient-5.jpg";
import lajoyaAmbient6 from "@/assets/products/lajoya/ambient-6.jpg";
import lajoyaCaja from "@/assets/products/lajoya/caja.png";

export type Brand = "cesar-nieto" | "la-joya";

export interface WeightOption {
  weight: number;
  price: number;
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
  brand: Brand;
}

export const BRANDS: { id: Brand; name: string; tagline: string }[] = [
  { id: "cesar-nieto", name: "César Nieto", tagline: "Tradición ibérica de Guijuelo" },
  { id: "la-joya", name: "La Joya", tagline: "Jamón ibérico desde Jabugo" },
];

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
  // ====== CÉSAR NIETO — JAMONES ======
  {
    id: "jamon-bellota-100-dop",
    name: "Jamón Bellota 100% Ibérico D.O.P.",
    description: "Se obtiene a partir de cerdos de raza 100% ibérica. Se alimentan en exclusiva de hierba y bellotas, estando en libertad total en las Dehesas de Salamanca y Extremadura.",
    pricePerKg: 62.44,
    images: [jamonBellota100DopCN, jamonBellota100DopCN2],
    weightOptions: generateWeightOptions(6.5, 9.5, 0.5, 62.44),
    curing: "Más de 36 meses",
    campaign: "2020",
    knifeSupplementPrice: 50,
    category: "jamon",
    brand: "cesar-nieto",
  },
  {
    id: "jamon-bellota-100",
    name: "Jamón Bellota 100% Ibérico",
    description: "De cerdos criados en libertad y alimentados con bellota. Elaborado de forma tradicional y curado más de 36 meses, destaca por su sabor intenso con toque dulce, su color característico y su textura suave y fundente.",
    pricePerKg: 53.19,
    images: [jamonBellota100, jamonBellota1002],
    weightOptions: generateWeightOptions(7.5, 8.5, 0.5, 53.19),
    curing: "Más de 36 meses",
    campaign: "2020",
    knifeSupplementPrice: 50,
    category: "jamon",
    brand: "cesar-nieto",
  },
  {
    id: "jamon-bellota-75-dop",
    name: "Jamón Bellota Ibérico 75% D.O.P.",
    description: "Se obtiene a partir de cerdos de raza ibérica que se alimentan exclusivamente de hierba y bellotas, en total libertad en las Dehesas de Salamanca y Extremadura.",
    pricePerKg: 41.96,
    images: [jamonBellota75, jamonBellota752],
    weightOptions: generateWeightOptions(7, 10, 0.5, 41.96),
    curing: "Más de 36 meses",
    campaign: "2019",
    knifeSupplementPrice: 50,
    category: "jamon",
    brand: "cesar-nieto",
  },
  {
    id: "jamon-cebo-campo-50",
    name: "Jamón Cebo de Campo 50% Ibérico",
    description: "Se obtiene de cruces selectos del Cerdo Ibérico, alcanzando un 50% de Raza Ibérica en su genética. Se alimentan de hierbas y otros recursos mientras campean libremente por fincas de César Nieto.",
    pricePerKg: 26.49,
    images: [jamonCeboCampo50, jamonCeboCampo502],
    weightOptions: generateWeightOptions(7, 10, 0.5, 26.49),
    curing: "Más de 30 meses",
    knifeSupplementPrice: 50,
    category: "jamon",
    brand: "cesar-nieto",
  },
  {
    id: "jamon-cebo-50",
    name: "Jamón Cebo 50% Ibérico",
    description: "Se obtiene a partir de cruces selectos del Cerdo Ibérico, con un 50% de la Raza Ibérica en su genética. Estos cerdos se crían en granjas que aseguran su bienestar animal y son alimentados con piensos naturales, a base de cereales de la máxima calidad.",
    pricePerKg: 23.58,
    images: [jamonCebo50, jamonCebo502],
    weightOptions: generateWeightOptions(7, 10, 0.5, 23.58),
    curing: "Más de 30 meses",
    knifeSupplementPrice: 50,
    category: "jamon",
    brand: "cesar-nieto",
  },
  {
    id: "jamon-reserva-familiar",
    name: "Jamón César Nieto Reserva Familiar <7kg",
    description: "Jamón seleccionado de forma artesanal, elaborado a partir de piezas escogidas por su excelente calidad y equilibrio de grasa infiltrada. Su curación lenta en bodegas naturales potencia un aroma intenso y un sabor suave y persistente en boca.",
    pricePerKg: 22.74,
    images: [jamonReservaFamiliar, jamonBellota1002],
    weightOptions: generateWeightOptions(7, 7, 0.5, 22.74),
    curing: "Más de 30 meses",
    knifeSupplementPrice: 50,
    category: "jamon",
    brand: "cesar-nieto",
  },
  // ====== CÉSAR NIETO — PALETAS ======
  {
    id: "paleta-bellota-100-dop",
    name: "Paleta Bellota 100% Ibérica D.O.P.",
    description: "Fruto de su prolongada curación de más de 24 meses, y de su alimentación natural a base de bellotas. Su color característico va del rosa intenso al rosa pálido con abundante grasa veteada.",
    pricePerKg: 34.87,
    images: [paletaBellota100Dop, paletaBellota502],
    weightOptions: generateWeightOptions(5, 6, 0.5, 34.87),
    curing: "Más de 24 meses",
    campaign: "2021",
    knifeSupplementPrice: 35,
    category: "paleta",
    brand: "cesar-nieto",
  },
  {
    id: "paleta-bellota-100",
    name: "Paleta Bellota 100% Ibérica",
    description: "Curada más de 24 meses y procedente de cerdos criados en libertad y alimentados con bellotas. Elaborada de forma tradicional con menos sal gracias al clima de Guijuelo, destaca por su sabor intenso con matices delicados y toque dulce.",
    pricePerKg: 30.64,
    images: [paletaBellota100, paletaBellota502],
    weightOptions: generateWeightOptions(5, 6, 0.5, 30.64),
    curing: "Más de 24 meses",
    knifeSupplementPrice: 35,
    category: "paleta",
    brand: "cesar-nieto",
  },
  {
    id: "paleta-bellota-75-dop",
    name: "Paleta Bellota 75% Ibérica D.O.P.",
    description: "Fruto de su prolongada curación de más de 24 meses, y de su alimentación natural a base de bellotas. La proporción superior al 56% de ácido oleico en sus grasas la hacen untuosa a la vez que suave, se \"funde\" en el paladar.",
    pricePerKg: 29.30,
    images: [paletaBellota75Dop, paletaBellota502],
    weightOptions: generateWeightOptions(4, 6, 0.5, 29.30),
    curing: "Más de 24 meses",
    campaign: "2021",
    knifeSupplementPrice: 35,
    category: "paleta",
    brand: "cesar-nieto",
  },
  {
    id: "paleta-bellota-50",
    name: "Paleta Bellota 50% Ibérica",
    description: "Fruto de su prolongada curación de más de 24 meses, y de su alimentación natural a base de bellotas. La proporción superior al 56% de ácido oleico en sus grasas la hacen untuosa a la vez que suave, se \"funde\" en el paladar.",
    pricePerKg: 27.97,
    images: [paletaBellota50, paletaBellota502],
    weightOptions: generateWeightOptions(4, 6, 0.5, 27.97),
    curing: "Más de 24 meses",
    knifeSupplementPrice: 35,
    category: "paleta",
    brand: "cesar-nieto",
  },
  {
    id: "paleta-cebo-campo-50",
    name: "Paleta Cebo de Campo 50% Ibérica",
    description: "Fruto de su prolongada curación superior a los 20 meses. Su color va del rosa oscuro al rosa claro con abundante grasa veteada. La elevada proporción de ácido oleico en sus grasas la hacen muy suave en boca a la vez que ligera.",
    pricePerKg: 25.31,
    images: [paletaCeboCampo50, paletaCeboCampo502],
    weightOptions: generateWeightOptions(4, 6, 0.5, 25.31),
    curing: "Más de 20 meses",
    knifeSupplementPrice: 35,
    category: "paleta",
    brand: "cesar-nieto",
  },
  {
    id: "paleta-cebo-50",
    name: "Paleta Cebo 50% Ibérica",
    description: "Se obtiene a partir de cruces selectos del Cerdo Ibérico, alcanzando un 50% de la Raza Ibérica en su genética. Estos cerdos se crían en granjas que aseguran su bienestar animal y son alimentados con piensos naturales a base de cereales de la máxima calidad.",
    pricePerKg: 22.65,
    images: [paletaCebo50, paletaCebo502],
    weightOptions: generateWeightOptions(4, 6, 0.5, 22.65),
    curing: "Más de 20 meses",
    knifeSupplementPrice: 35,
    category: "paleta",
    brand: "cesar-nieto",
  },

  // ====== LA JOYA — JAMONES ======
  {
    id: "lajoya-jamon-bellota-100-dop",
    name: "Jamón Bellota 100% Ibérico D.O.P. Jabugo",
    description: "La máxima expresión del ibérico de Jabugo. Curación lenta, aroma profundo, textura sedosa y ese brillo natural que solo dan los años. Una joya que transforma cada corte en celebración.",
    pricePerKg: 79.87,
    images: [lajoyaJamonBellota100, lajoyaAmbient1, lajoyaCaja],
    weightOptions: generateWeightOptions(7.5, 8.5, 0.5, 79.87),
    curing: "Más de 36 meses",
    knifeSupplementPrice: 50,
    category: "jamon",
    brand: "la-joya",
  },
  {
    id: "lajoya-jamon-bellota-100",
    name: "Jamón Bellota 100% Ibérico Jabugo",
    description: "Jamón de bellota 100% ibérico desde El Repilado, Jabugo. Curación lenta y aroma profundo, con textura sedosa y sabor elegante en cada corte.",
    pricePerKg: 74.88,
    images: [lajoyaJamonBellota100Alt, lajoyaAmbient1, lajoyaCaja],
    weightOptions: generateWeightOptions(7.5, 8.5, 0.5, 74.88),
    curing: "Más de 36 meses",
    knifeSupplementPrice: 50,
    category: "jamon",
    brand: "la-joya",
  },
  {
    id: "lajoya-jamon-bellota-50",
    name: "Jamón Bellota 50% Ibérico Jabugo",
    description: "Una pieza generosa, de sabor amable y persistente. La mejor puerta de entrada al universo de La Joya. Ideal para compartir, disfrutar y sorprender.",
    pricePerKg: 44.33,
    images: [lajoyaJamonBellota50, lajoyaAmbient2, lajoyaAmbient3, lajoyaCaja],
    weightOptions: generateWeightOptions(8.5, 9.5, 0.5, 44.33),
    curing: "Más de 30 meses",
    knifeSupplementPrice: 50,
    category: "jamon",
    brand: "la-joya",
  },
  {
    id: "lajoya-jamon-cebo-50",
    name: "Jamón Cebo 50% Ibérico Jabugo",
    description: "Una opción versátil para el día a día. Textura melosa, sabor redondo y un perfil amable que seduce a todos. Ideal para quienes buscan iniciarse en los ibéricos sin renunciar a la calidad.",
    pricePerKg: 27.50,
    images: [lajoyaJamonCebo50, lajoyaAmbient4, lajoyaAmbient3, lajoyaCaja],
    weightOptions: generateWeightOptions(7.5, 8.5, 0.5, 27.50),
    curing: "Más de 24 meses",
    knifeSupplementPrice: 50,
    category: "jamon",
    brand: "la-joya",
  },

  // ====== LA JOYA — PALETAS ======
  {
    id: "lajoya-paleta-bellota-100-dop",
    name: "Paleta Bellota 100% Ibérica D.O.P. Jabugo",
    description: "Paleta de bellota 100% ibérica con D.O.P. Jabugo. Curación lenta y sabor profundo en cada loncha.",
    pricePerKg: 52.222,
    images: [lajoyaPaletaBellota100, lajoyaAmbient5, lajoyaAmbient3, lajoyaCaja],
    weightOptions: generateWeightOptions(4.5, 5.5, 0.5, 52.222),
    curing: "Más de 24 meses",
    knifeSupplementPrice: 35,
    category: "paleta",
    brand: "la-joya",
  },
  {
    id: "lajoya-paleta-bellota-100",
    name: "Paleta Bellota 100% Ibérica Jabugo",
    description: "Paleta de bellota 100% ibérica de Jabugo. Aroma envolvente, sabor elegante y textura fundente.",
    pricePerKg: 45.80,
    images: [lajoyaPaletaBellota100, lajoyaAmbient5, lajoyaAmbient3, lajoyaCaja],
    weightOptions: generateWeightOptions(4.5, 5.5, 0.5, 45.80),
    curing: "Más de 24 meses",
    knifeSupplementPrice: 35,
    category: "paleta",
    brand: "la-joya",
  },
  {
    id: "lajoya-paleta-bellota-50",
    name: "Paleta Bellota 50% Ibérica Jabugo",
    description: "Paleta de bellota 50% ibérica. Sabor equilibrado y textura sedosa, ideal para compartir.",
    pricePerKg: 39.80,
    images: [lajoyaPaletaBellota50, lajoyaAmbient6, lajoyaAmbient3, lajoyaCaja],
    weightOptions: generateWeightOptions(4.5, 5.5, 0.5, 39.80),
    curing: "Más de 24 meses",
    knifeSupplementPrice: 35,
    category: "paleta",
    brand: "la-joya",
  },
  {
    id: "lajoya-paleta-cebo-50",
    name: "Paleta Cebo 50% Ibérica Jabugo",
    description: "Paleta de cebo 50% ibérica. Perfil delicado y sabor accesible, perfecto para iniciarse en el mundo ibérico.",
    pricePerKg: 29.80,
    images: [lajoyaPaletaCebo50, lajoyaAmbient4, lajoyaAmbient3, lajoyaCaja],
    weightOptions: generateWeightOptions(4.5, 5.5, 0.5, 29.80),
    curing: "Más de 20 meses",
    knifeSupplementPrice: 35,
    category: "paleta",
    brand: "la-joya",
  },
];

