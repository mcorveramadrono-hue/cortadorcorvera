// Genera el feed de productos para Google Merchant Center (Google Shopping).
// Uso: bun run scripts/generate-shopping-feed.mjs
import { build } from "esbuild";
import { mkdir, writeFile, copyFile, rm } from "node:fs/promises";
import { execFileSync } from "node:child_process";
import path from "node:path";
import { pathToFileURL } from "node:url";

const ROOT = process.cwd();
const SITE = "https://www.corveraibericos.com";
const IMG_DIR = path.join(ROOT, "public", "feed-images");
const IMG_EXT = /\.(png|jpe?g|webp|avif|gif|svg)$/i;

const assetPlugin = {
  name: "asset-as-path",
  setup(b) {
    b.onResolve({ filter: /^@\// }, (args) => {
      const p = path.join(ROOT, "src", args.path.slice(2));
      return { path: p, namespace: IMG_EXT.test(p) ? "asset" : undefined };
    });
    b.onResolve({ filter: IMG_EXT }, (args) => ({
      path: path.resolve(args.resolveDir, args.path),
      namespace: "asset",
    }));
    b.onLoad({ filter: /.*/, namespace: "asset" }, (args) => ({
      contents: `export default ${JSON.stringify(args.path)};`,
      loader: "js",
    }));
  },
};

const outfile = path.join(ROOT, "node_modules", ".cache", "products.feed.mjs");
await mkdir(path.dirname(outfile), { recursive: true });
await build({
  entryPoints: [path.join(ROOT, "src", "data", "products.ts")],
  bundle: true,
  format: "esm",
  platform: "node",
  outfile,
  plugins: [assetPlugin],
  logLevel: "silent",
});

const { products, BRANDS } = await import(pathToFileURL(outfile).href + `?t=${Date.now()}`);
const brandName = (id) => BRANDS.find((b) => b.id === id)?.name ?? "Corvera Ibéricos";

const esc = (s) =>
  String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

await rm(IMG_DIR, { recursive: true, force: true });
await mkdir(IMG_DIR, { recursive: true });

const items = [];
for (const p of products) {
  if (p.available === false) continue;

  const imgs = [];
  for (let i = 0; i < Math.min(p.images.length, 4); i++) {
    const src = p.images[i];
    const name = `${p.id}-${i + 1}.jpg`;
    const dest = path.join(IMG_DIR, name);
    try {
      execFileSync("python3", [
        "-c",
        [
          "import sys",
          "from PIL import Image",
          "im = Image.open(sys.argv[1])",
          "im = im.convert('RGBA')",
          "bg = Image.new('RGB', im.size, (255,255,255))",
          "bg.paste(im, mask=im.split()[3])",
          "bg.thumbnail((1600,1600))",
          "bg.save(sys.argv[2], 'JPEG', quality=85, optimize=True)",
        ].join("\n"),
        src,
        dest,
      ]);
    } catch {
      await copyFile(src, dest);
    }
    imgs.push(`${SITE}/feed-images/${name}`);
  }

  const cheapest = [...p.weightOptions].sort((a, b) => a.price - b.price)[0];
  const price = cheapest ? cheapest.price : p.pricePerKg;
  const weightKg = cheapest ? cheapest.weight : p.unitWeightKg ?? 1;
  const title = `${p.name} — ${brandName(p.brand)}`.slice(0, 145);
  const desc = `${p.description} Curación: ${p.curing}. Precio ${p.pricePerKg
    .toFixed(2)
    .replace(".", ",")} €/kg. Envío a toda España.`.slice(0, 4900);

  items.push(`  <item>
    <g:id>${esc(p.id)}</g:id>
    <g:title>${esc(title)}</g:title>
    <g:description>${esc(desc)}</g:description>
    <g:link>${SITE}/tienda/${esc(p.brand)}/${esc(p.id)}</g:link>
    <g:image_link>${esc(imgs[0])}</g:image_link>
${imgs
  .slice(1)
  .map((u) => `    <g:additional_image_link>${esc(u)}</g:additional_image_link>`)
  .join("\n")}
    <g:availability>in_stock</g:availability>
    <g:condition>new</g:condition>
    <g:price>${price.toFixed(2)} EUR</g:price>
    <g:brand>${esc(brandName(p.brand))}</g:brand>
    <g:identifier_exists>no</g:identifier_exists>
    <g:product_type>${p.category === "paleta" ? "Paletas ibéricas" : "Jamones ibéricos"}</g:product_type>
    <g:google_product_category>5811</g:google_product_category>
    <g:shipping_weight>${weightKg} kg</g:shipping_weight>
    <g:shipping>
      <g:country>ES</g:country>
      <g:service>Estándar</g:service>
    </g:shipping>
  </item>`);
}

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:g="http://base.google.com/ns/1.0">
<channel>
  <title>Corvera Ibéricos — Jamones y paletas ibéricas</title>
  <link>${SITE}</link>
  <description>Catálogo de jamones y paletas ibéricas de Corvera Ibéricos.</description>
${items.join("\n")}
</channel>
</rss>
`;

await writeFile(path.join(ROOT, "public", "google-shopping.xml"), xml, "utf8");
console.log(`Feed generado con ${items.length} productos.`);
