// Sistema central de promociones de productos.
// Cualquier sitio que muestre un producto puede leer aquí su promoción activa.

export type PromotionType = "free-shipping" | "free-knife" | "coupon-10";

export interface Promotion {
  productId: string;
  type: PromotionType;
  badge: string;        // texto del badge corto
  title: string;        // título largo en página de ofertas
  description: string;  // descripción para tarjeta
  featured?: boolean;   // se muestra en el home (las demás solo en /ofertas)
  cta?: string;
}

export const PROMOTIONS: Promotion[] = [
  {
    productId: "lajoya-jamon-bellota-100",
    type: "free-knife",
    badge: "CORTE A CUCHILLO GRATIS",
    title: "Corte a cuchillo gratis con el Jamón Bellota 100% Ibérico Jabugo La Joya",
    description:
      "Servicio de corte a cuchillo profesional incluido sin coste adicional al añadirlo al carrito.",
    featured: true,
  },
  {
    productId: "lajoya-jamon-cebo-50",
    type: "coupon-10",
    badge: "10€ DE REGALO",
    title: "10€ de regalo con tu Jamón Cebo 50% Ibérico La Joya",
    description:
      "Llévate este jamón y recibirás por email un código único de 10€ de descuento aplicable a tu siguiente compra superior a 150€.",
  },
  {
    productId: "lajoya-jamon-bellota-50",
    type: "free-knife",
    badge: "CORTE A CUCHILLO GRATIS",
    title: "Corte a cuchillo gratis con el Jamón Bellota 50% Ibérico Jabugo La Joya",
    description:
      "Servicio de corte a cuchillo profesional incluido sin coste adicional al añadirlo al carrito.",
  },
  {
    productId: "jamon-reserva-familiar",
    type: "free-shipping",
    badge: "ENVÍO GRATUITO",
    title: "Envío gratuito · Jamón César Nieto Reserva Familiar <7kg",
    description:
      "Tradición y sabor de Guijuelo con envío gratis a toda la península al añadirlo a tu cesta.",
  },
  {
    productId: "epicum-jamon-cebo-iberico",
    type: "free-shipping",
    badge: "ENVÍO GRATUITO",
    title: "Envío gratuito · Jamón Cebo 50% Ibérico Epicum",
    description: "Cebo ibérico Epicum con más de 28 meses de curación y envío gratuito incluido.",
  },
  {
    productId: "finura-jamon-cebo-iberico",
    type: "free-shipping",
    badge: "ENVÍO GRATUITO",
    title: "Envío gratuito · Jamón Cebo 50% Ibérico Finura",
    description: "Cebo ibérico Finura de ganadería propia con envío gratuito incluido.",
  },
];

export function getPromotion(productId: string): Promotion | undefined {
  return PROMOTIONS.find((p) => p.productId === productId);
}
