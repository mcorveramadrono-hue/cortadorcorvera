import { useEffect, useState } from "react";
import { ArrowLeft, ShoppingCart, Tag } from "lucide-react";
import { useNavigate, useParams, Navigate, useSearchParams } from "react-router-dom";
import { products, BRANDS } from "@/data/products";
import { getPromotion } from "@/data/promotions";
import { useCart } from "@/contexts/CartContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PromoBadge from "@/components/PromoBadge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { CheckCircle2 } from "lucide-react";

const Producto = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const from = searchParams.get("from");
  const { brand, productId } = useParams<{ brand: string; productId: string }>();
  const { addItem } = useCart();
  const [imageIdx, setImageIdx] = useState(0);
  const [weightIdx, setWeightIdx] = useState(0);
  const [withKnife, setWithKnife] = useState(false);
  const [added, setAdded] = useState<{ name: string; weight: number } | null>(null);

  const product = products.find((p) => p.id === productId && p.brand === brand);
  const brandInfo = BRANDS.find((b) => b.id === brand);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (product && brandInfo) {
      const minPrice = product.weightOptions.reduce((m, o) => (o.price < m ? o.price : m), product.weightOptions[0].price);
      const maxPrice = product.weightOptions.reduce((m, o) => (o.price > m ? o.price : m), product.weightOptions[0].price);

      document.title = `${product.name} | ${brandInfo.name} - Comprar online | Corvera Ibéricos`;
      const meta = document.querySelector('meta[name="description"]');
      const desc = `${product.name} de ${brandInfo.name}. ${product.description.slice(0, 120)} Compra online con envío a toda España.`;
      if (meta) meta.setAttribute("content", desc.slice(0, 160));

      // Canonical
      const canonicalHref = `https://corveraibericos.com/tienda/${product.brand}/${product.id}`;
      let canonical = document.querySelector('link[rel="canonical"]');
      if (!canonical) {
        canonical = document.createElement('link');
        canonical.setAttribute('rel', 'canonical');
        document.head.appendChild(canonical);
      }
      canonical.setAttribute('href', canonicalHref);

      // Product JSON-LD
      const ldId = 'product-jsonld';
      let script = document.getElementById(ldId) as HTMLScriptElement | null;
      if (!script) {
        script = document.createElement('script');
        script.type = 'application/ld+json';
        script.id = ldId;
        document.head.appendChild(script);
      }
      script.textContent = JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Product",
        name: product.name,
        description: product.description,
        brand: { "@type": "Brand", name: brandInfo.name },
        category: product.category === "jamon" ? "Jamón Ibérico" : "Paleta Ibérica",
        url: canonicalHref,
        offers: {
          "@type": "AggregateOffer",
          lowPrice: minPrice.toFixed(2),
          highPrice: maxPrice.toFixed(2),
          priceCurrency: "EUR",
          availability: "https://schema.org/InStock",
          seller: { "@type": "Organization", name: "Corvera Ibéricos" },
        },
      });

      return () => {
        const s = document.getElementById(ldId);
        if (s) s.remove();
      };
    }
  }, [product, brandInfo]);

  if (!product || !brandInfo) return <Navigate to="/tienda" replace />;

  const promo = getPromotion(product.id);
  const knifeIsFree = promo?.type === "free-knife";
  const option = product.weightOptions[weightIdx];
  const knifeCost = withKnife && !knifeIsFree ? product.knifeSupplementPrice : 0;
  const totalPrice = option.price + knifeCost;

  const handleAdd = () => {
    addItem({
      product,
      selectedWeight: option.weight,
      price: option.price,
      quantity: 1,
      withKnife,
    });
    setAdded({ name: product.name, weight: option.weight });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-28 pb-16">
        <div className="max-w-6xl mx-auto px-4 md:px-6">
          <button
            onClick={() => {
              if (window.history.length > 1) navigate(-1);
              else navigate("/tienda");
            }}
            className="inline-flex items-center gap-2 text-sm tracking-widest uppercase text-muted-foreground hover:text-primary transition-colors mb-8"
          >
            <ArrowLeft size={16} />
            Volver
          </button>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
            <div className="space-y-4">
              <div
                className="bg-corvera-cream/30 p-6 overflow-hidden cursor-zoom-in group relative"
                onMouseMove={(e) => {
                  const r = e.currentTarget.getBoundingClientRect();
                  const x = ((e.clientX - r.left) / r.width) * 100;
                  const y = ((e.clientY - r.top) / r.height) * 100;
                  const img = e.currentTarget.querySelector('img') as HTMLImageElement | null;
                  if (img) {
                    img.style.transformOrigin = `${x}% ${y}%`;
                    img.style.transform = 'scale(2)';
                  }
                }}
                onMouseLeave={(e) => {
                  const img = e.currentTarget.querySelector('img') as HTMLImageElement | null;
                  if (img) img.style.transform = 'scale(1)';
                }}
              >
                <PromoBadge productId={product.id} className="absolute top-3 left-3 z-10" size="md" />
                <img
                  src={product.images[imageIdx]}
                  alt={product.name}
                  className="w-full h-96 object-contain transition-transform duration-200 ease-out"
                />
              </div>
              {product.images.length > 1 && (
                <div className="flex gap-2">
                  {product.images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setImageIdx(idx)}
                      className={`flex-1 bg-corvera-cream/30 p-2 border ${imageIdx === idx ? 'border-primary' : 'border-border'}`}
                    >
                      <img src={img} alt="" className="w-full h-20 object-contain" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className="space-y-6">
              <div>
                <p className="text-xs tracking-[0.3em] uppercase text-primary mb-2">{brandInfo.name}</p>
                <h1 className="font-serif text-3xl md:text-4xl font-bold text-foreground">{product.name}</h1>
              </div>

              {promo && (
                <div className="border-l-4 border-primary bg-primary/5 px-4 py-3 flex items-start gap-3">
                  <Tag size={18} className="text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-xs tracking-widest uppercase text-primary font-bold">{promo.badge}</p>
                    <p className="text-sm text-foreground mt-0.5">{promo.description}</p>
                  </div>
                </div>
              )}

              <p className="text-muted-foreground leading-relaxed">{product.description}</p>

              <div className="grid grid-cols-2 gap-3">
                <div className="p-4 border border-border">
                  <p className="text-xs tracking-widest uppercase text-muted-foreground mb-1">Precio por kg</p>
                  <p className="font-serif text-base font-semibold text-foreground">{product.pricePerKg.toFixed(2).replace('.', ',')} €/kg</p>
                </div>
                <div className="p-4 border border-border">
                  <p className="text-xs tracking-widest uppercase text-muted-foreground mb-1">Curación</p>
                  <p className="font-serif text-base font-semibold text-foreground">{product.curing}</p>
                </div>
                {product.campaign && (
                  <div className="p-4 border border-border">
                    <p className="text-xs tracking-widest uppercase text-muted-foreground mb-1">Campaña</p>
                    <p className="font-serif text-base font-semibold text-foreground">{product.campaign}</p>
                  </div>
                )}
                <div className="p-4 border border-border">
                  <p className="text-xs tracking-widest uppercase text-muted-foreground mb-1">Corte a cuchillo</p>
                  <p className="font-serif text-sm font-semibold text-foreground">+{product.knifeSupplementPrice} €</p>
                </div>
              </div>

              <div>
                <label className="text-xs tracking-widest uppercase text-muted-foreground block mb-2">Peso</label>
                <select
                  value={weightIdx}
                  onChange={(e) => setWeightIdx(Number(e.target.value))}
                  className="w-full border border-border bg-background px-3 py-2.5 text-sm text-foreground focus:outline-none focus:border-primary transition-colors"
                >
                  {product.weightOptions.map((opt, idx) => (
                    <option key={idx} value={idx}>{opt.label}</option>
                  ))}
                </select>
              </div>

              <label className="flex items-center gap-3 p-3 border border-border cursor-pointer hover:border-primary/50 transition-colors">
                <input
                  type="checkbox"
                  checked={withKnife}
                  onChange={(e) => setWithKnife(e.target.checked)}
                  className="w-4 h-4 accent-primary"
                />
                <span className="text-sm text-foreground">
                  Cortado a cuchillo{" "}
                  {knifeIsFree ? (
                    <strong className="text-primary">GRATIS (incluido por promoción)</strong>
                  ) : (
                    <>(+{product.knifeSupplementPrice} €)</>
                  )}
                </span>
              </label>

              <div className="pt-4 border-t border-border">
                <div className="flex items-baseline justify-between mb-4">
                  <span className="text-xs tracking-widest uppercase text-muted-foreground">Precio total</span>
                  <span className="font-serif text-3xl font-bold text-primary">{totalPrice.toFixed(2).replace('.', ',')} €</span>
                </div>
                <button
                  onClick={handleAdd}
                  className="w-full inline-flex items-center justify-center gap-2 px-6 py-4 bg-primary text-primary-foreground text-sm tracking-widest uppercase hover:bg-primary/90 transition-colors"
                >
                  <ShoppingCart size={18} />
                  Añadir al Carrito
                </button>
                <p className="text-[10px] text-muted-foreground/60 text-center mt-2">*IVA incluido</p>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />

      <Dialog open={!!added} onOpenChange={(open) => !open && setAdded(null)}>
        <DialogContent className="max-w-md bg-corvera-cream">
          <DialogHeader className="items-center text-center">
            <CheckCircle2 className="text-primary mb-2" size={40} />
            <DialogTitle className="font-serif text-2xl text-foreground">Producto añadido al carrito</DialogTitle>
            <DialogDescription className="text-sm text-muted-foreground">
              {added && (
                <>Se ha añadido <strong>{added.name}</strong> ({added.weight.toFixed(1).replace('.', ',')} kg) a tu carrito.</>
              )}
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col sm:flex-row gap-3 mt-2">
            <button
              onClick={() => setAdded(null)}
              className="flex-1 inline-flex items-center justify-center px-6 py-3 border border-primary text-primary text-xs tracking-widest uppercase hover:bg-primary/5 transition-colors"
            >
              Seguir comprando
            </button>
            <button
              onClick={() => {
                setAdded(null);
                navigate("/carrito");
              }}
              className="flex-1 inline-flex items-center justify-center px-6 py-3 bg-primary text-primary-foreground text-xs tracking-widest uppercase hover:bg-primary/90 transition-colors"
            >
              Ir al carrito
            </button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Producto;
