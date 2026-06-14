import { PRODUCTS } from "./src/data/products";
const catalog: Record<string, { knifeSupplementPrice: number; prices: Record<string, number> }> = {};
for (const p of PRODUCTS) {
  const prices: Record<string, number> = {};
  for (const w of p.weightOptions) prices[w.weight.toFixed(3)] = w.price;
  catalog[p.name] = { knifeSupplementPrice: p.knifeSupplementPrice, prices };
}
import { writeFileSync } from "fs";
writeFileSync("/tmp/catalog.json", JSON.stringify(catalog, null, 2));
console.log("ok", Object.keys(catalog).length);
