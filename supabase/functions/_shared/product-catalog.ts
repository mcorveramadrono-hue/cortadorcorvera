// Server-side trusted product price catalog.
// Generated from src/data/products.ts. Must be kept in sync when prices change.
// Used by create-checkout to validate client-supplied order_items prices
// against trusted values before sending line items to Stripe.

export interface CatalogEntry {
  knifeSupplementPrice: number;
  // key = weight.toFixed(3), value = price in EUR
  prices: Record<string, number>;
}

export const PRODUCT_CATALOG: Record<string, CatalogEntry> = {"Jamón Bellota 100% Ibérico D.O.P.":{"knifeSupplementPrice":50,"prices":{"6.500":405.86,"7.000":437.08,"7.500":468.3,"8.000":499.52,"8.500":530.74,"9.000":561.96,"9.500":593.18}},"Jamón Bellota 100% Ibérico":{"knifeSupplementPrice":50,"prices":{"7.500":398.92,"8.000":425.52,"8.500":452.12}},"Jamón Bellota Ibérico 75% D.O.P.":{"knifeSupplementPrice":50,"prices":{"7.000":293.72,"7.500":314.7,"8.000":335.68,"8.500":356.66,"9.000":377.64,"9.500":398.62,"10.000":419.6}},"Jamón Cebo de Campo 50% Ibérico":{"knifeSupplementPrice":50,"prices":{"7.000":185.43,"7.500":198.68,"8.000":211.92,"8.500":225.17,"9.000":238.41,"9.500":251.65,"10.000":264.9}},"Jamón Cebo 50% Ibérico":{"knifeSupplementPrice":50,"prices":{"7.000":165.06,"7.500":176.85,"8.000":188.64,"8.500":200.43,"9.000":212.22,"9.500":224.01,"10.000":235.8}},"Jamón César Nieto Reserva Familiar <7kg":{"knifeSupplementPrice":50,"prices":{"7.000":159.18}},"Paleta Bellota 100% Ibérica D.O.P.":{"knifeSupplementPrice":35,"prices":{"5.000":174.35,"5.500":191.79,"6.000":209.22}},"Paleta Bellota 100% Ibérica":{"knifeSupplementPrice":35,"prices":{"5.000":153.2,"5.500":168.52,"6.000":183.84}},"Paleta Bellota 75% Ibérica D.O.P.":{"knifeSupplementPrice":35,"prices":{"4.000":117.2,"4.500":131.85,"5.000":146.5,"5.500":161.15,"6.000":175.8}},"Paleta Bellota 50% Ibérica":{"knifeSupplementPrice":35,"prices":{"4.000":111.88,"4.500":125.87,"5.000":139.85,"5.500":153.83,"6.000":167.82}},"Paleta Cebo de Campo 50% Ibérica":{"knifeSupplementPrice":35,"prices":{"4.000":101.24,"4.500":113.9,"5.000":126.55,"5.500":139.2,"6.000":151.86}},"Paleta Cebo 50% Ibérica":{"knifeSupplementPrice":35,"prices":{"4.000":90.6,"4.500":101.93,"5.000":113.25,"5.500":124.57,"6.000":135.9}},"Jamón Bellota 100% Ibérico D.O.P. Jabugo":{"knifeSupplementPrice":50,"prices":{"7.500":575.1,"8.000":613.44,"8.500":651.78}},"Jamón Bellota 100% Ibérico Jabugo":{"knifeSupplementPrice":50,"prices":{"7.500":539.1,"8.000":575.04,"8.500":610.98}},"Jamón Bellota 50% Ibérico Jabugo":{"knifeSupplementPrice":50,"prices":{"8.500":361.76,"9.000":383.04,"9.500":404.32}},"Jamón Cebo 50% Ibérico Jabugo":{"knifeSupplementPrice":50,"prices":{"7.500":198,"8.000":211.2,"8.500":224.4}},"Paleta Bellota 100% Ibérica D.O.P. Jabugo":{"knifeSupplementPrice":35,"prices":{"4.500":234.99,"5.000":261.1,"5.500":287.21}},"Paleta Bellota 100% Ibérica Jabugo":{"knifeSupplementPrice":35,"prices":{"4.500":206.1,"5.000":229,"5.500":251.9}},"Paleta Bellota 50% Ibérica Jabugo":{"knifeSupplementPrice":35,"prices":{"4.500":179.1,"5.000":199,"5.500":218.9}},"Paleta Cebo 50% Ibérica Jabugo":{"knifeSupplementPrice":35,"prices":{"4.500":134.1,"5.000":149,"5.500":163.9}},"Jamón de Cebo Ibérico Epicum 50%":{"knifeSupplementPrice":50,"prices":{"7.500":173.25,"8.000":184.8,"8.500":196.35,"9.000":207.9,"9.500":219.45}},"Sobres de Jamón Cebo 50% Ibérico Epicum (cortado a cuchillo)":{"knifeSupplementPrice":0,"prices":{"0.090":7.95}},"Jamón de Cebo Ibérico Finura 50%":{"knifeSupplementPrice":50,"prices":{"7.500":173.25,"8.000":184.8,"8.500":196.35,"9.000":207.9,"9.500":219.45}},"Jamón Ibérico Bellota 100%":{"knifeSupplementPrice":50,"prices":{"7.000":363.09,"7.500":389.03,"8.000":414.96,"8.500":440.9,"9.000":466.83,"9.500":492.77}},"Jamón Ibérico Bellota 75% D.O.":{"knifeSupplementPrice":50,"prices":{"7.000":314.58,"7.500":337.05,"8.000":359.52,"8.500":381.99,"9.000":404.46,"9.500":426.93,"10.000":449.4}},"Jamón Ibérico Bellota 50%":{"knifeSupplementPrice":50,"prices":{"7.500":248.78,"8.000":265.36,"8.500":281.95}},"Jamón Ibérico Cebo de Campo 50%":{"knifeSupplementPrice":50,"prices":{"9.000":214.56,"9.500":226.48,"10.000":238.4,"10.500":250.32}},"Jamón Ibérico Cebo 50%":{"knifeSupplementPrice":50,"prices":{"7.500":160.2,"8.000":170.88,"8.500":181.56,"9.000":192.24,"9.500":202.92}},"Paleta Ibérica Bellota 75% D.O.":{"knifeSupplementPrice":35,"prices":{"4.500":130.5,"5.000":145,"5.500":159.5}},"Paleta Ibérica Cebo de Campo 50%":{"knifeSupplementPrice":35,"prices":{"5.500":115.45,"6.000":125.94,"6.500":136.44}}};

/**
 * Look up the trusted unit price for a product+weight combination.
 * Returns null if the product/weight is unknown.
 * Allows ±1 cent rounding tolerance for the caller to validate against.
 */
export function getTrustedPrice(productName: string, weightKg: number): number | null {
  const entry = PRODUCT_CATALOG[productName];
  if (!entry) return null;
  const key = Number(weightKg).toFixed(3);
  const price = entry.prices[key];
  return typeof price === "number" ? price : null;
}

export function getTrustedKnifeSupplement(productName: string): number | null {
  const entry = PRODUCT_CATALOG[productName];
  if (!entry) return null;
  return entry.knifeSupplementPrice;
}
