import { useEffect, useMemo, useState } from "react";
import { ArrowLeft, Search, X } from "lucide-react";
import { useNavigate, Link } from "react-router-dom";
import { BRANDS, products } from "@/data/products";
import type { Product } from "@/data/products";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Slider } from "@/components/ui/slider";

type CategoryFilter = "all" | "jamon" | "paleta";

type Quality = "bellota-100" | "bellota-75" | "bellota-50" | "cebo-campo" | "cebo";

const QUALITIES: { id: Quality; label: string }[] = [
  { id: "bellota-100", label: "Bellota 100%" },
  { id: "bellota-75", label: "Bellota 75%" },
  { id: "bellota-50", label: "Bellota 50%" },
  { id: "cebo-campo", label: "Cebo de Campo" },
  { id: "cebo", label: "Cebo" },
];

function getQuality(p: Product): Quality {
  const n = p.name.toLowerCase();
  if (n.includes("bellota") && n.includes("100")) return "bellota-100";
  if (n.includes("bellota") && n.includes("75")) return "bellota-75";
  if (n.includes("bellota") && n.includes("50")) return "bellota-50";
  if (n.includes("cebo de campo") || n.includes("cebo campo")) return "cebo-campo";
  return "cebo";
}

function getMinPrice(p: Product): number {
  return p.weightOptions.reduce((m, o) => (o.price < m ? o.price : m), p.weightOptions[0].price);
}

const ALL_PRICES = products.map(getMinPrice);
const PRICE_MIN = Math.floor(Math.min(...ALL_PRICES));
const PRICE_MAX = Math.ceil(Math.max(...ALL_PRICES));

const Tienda = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState<CategoryFilter>("all");
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [selectedQualities, setSelectedQualities] = useState<Quality[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([PRICE_MIN, PRICE_MAX]);

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "Tienda | Jamones Ibéricos - Corvera Ibéricos";
    const meta = document.querySelector('meta[name="description"]');
    if (meta) meta.setAttribute("content", "Compra jamón ibérico de bellota online: César Nieto, La Joya, Epicum y Finura. Envío a toda España. Corte a cuchillo.");
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', 'https://corveraibericos.com/tienda');
  }, []);

  const toggleBrand = (id: string) => {
    setSelectedBrands((prev) => prev.includes(id) ? prev.filter((b) => b !== id) : [...prev, id]);
  };
  const toggleQuality = (id: Quality) => {
    setSelectedQualities((prev) => prev.includes(id) ? prev.filter((q) => q !== id) : [...prev, id]);
  };

  const clearFilters = () => {
    setSearch("");
    setCategory("all");
    setSelectedBrands([]);
    setSelectedQualities([]);
    setPriceRange([PRICE_MIN, PRICE_MAX]);
  };

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return products.filter((p) => {
      if (category !== "all" && p.category !== category) return false;
      if (selectedBrands.length > 0 && !selectedBrands.includes(p.brand)) return false;
      if (selectedQualities.length > 0 && !selectedQualities.includes(getQuality(p))) return false;
      const price = getMinPrice(p);
      if (price < priceRange[0] || price > priceRange[1]) return false;
      if (q && !`${p.name} ${p.description}`.toLowerCase().includes(q)) return false;
      return true;
    });
  }, [search, category, selectedBrands, selectedQualities, priceRange]);

  const renderProductCard = (product: Product) => {
    const minPrice = product.weightOptions.reduce(
      (min, opt) => (opt.price < min ? opt.price : min),
      product.weightOptions[0].price
    );
    const hoverImage = product.images[1] ?? product.images[0];
    const brandName = BRANDS.find((b) => b.id === product.brand)?.name ?? "";

    return (
      <Link
        to={`/tienda/${product.brand}/${product.id}`}
        key={product.id}
        className="group bg-card border border-border hover:border-primary/30 transition-all duration-300 flex flex-col"
      >
        <div className="overflow-hidden bg-corvera-cream/30 relative">
          <img
            src={product.images[0]}
            alt={product.name}
            className="w-full h-64 object-contain p-4 transition-opacity duration-300 group-hover:opacity-0"
          />
          <img
            src={hoverImage}
            alt=""
            aria-hidden="true"
            className="absolute inset-0 w-full h-64 object-contain p-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          />
        </div>
        <div className="p-4 space-y-1.5 flex-1 flex flex-col items-center text-center">
          <span className="text-[10px] tracking-[0.2em] uppercase text-primary/80 font-medium">{brandName}</span>
          <h3 className="font-serif text-sm font-semibold text-foreground leading-tight">{product.name}</h3>
          <p className="font-serif text-base font-bold text-primary mt-auto pt-2">
            Desde {minPrice.toFixed(2).replace('.', ',')} €
          </p>
          <span className="text-[10px] text-muted-foreground/60">*IVA incl.</span>
        </div>
      </Link>
    );
  };

  const hasActiveFilters = search || category !== "all" || selectedBrands.length > 0;

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-28 pb-16">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="flex items-center justify-between mb-8">
            <button
              onClick={() => navigate("/")}
              className="inline-flex items-center gap-2 text-sm tracking-widest uppercase text-muted-foreground hover:text-primary transition-colors"
            >
              <ArrowLeft size={16} />
              Volver
            </button>
          </div>

          <div className="text-center mb-12 space-y-4">
            <p className="text-sm tracking-[0.3em] uppercase text-primary font-medium">Tienda</p>
            <h1 className="font-serif text-4xl md:text-5xl font-bold text-foreground">Nuestro Catálogo</h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Trabajamos con varias casas de referencia del ibérico español. Busca, filtra y encuentra el jamón o la paleta perfecta para ti.
            </p>
          </div>

          {/* Marcas */}
          <div className="mb-12">
            <h2 className="font-serif text-xl md:text-2xl font-bold text-foreground mb-5 text-center">Comprar por marca</h2>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {BRANDS.map((brand) => (
                <button
                  key={brand.id}
                  onClick={() => navigate(`/tienda/${brand.id}`)}
                  className="group relative bg-card border border-border hover:border-primary transition-all duration-300 overflow-hidden text-left"
                >
                  <div className="aspect-square bg-corvera-cream/30 overflow-hidden flex items-center justify-center p-4">
                    <img
                      src={brandImages[brand.id]}
                      alt={brand.name}
                      className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-4 space-y-1">
                    <h3 className="font-serif text-lg font-bold text-foreground">{brand.name}</h3>
                    <p className="text-xs text-muted-foreground">{brand.tagline}</p>
                    <div className="pt-2 inline-flex items-center gap-1.5 text-[11px] tracking-widest uppercase text-primary font-medium">
                      Ver catálogo
                      <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Buscador y filtros */}
          <div className="border-t border-border pt-10">
            <h2 className="font-serif text-2xl md:text-3xl font-bold text-foreground mb-6 text-center">Todos los productos</h2>

            <div className="bg-corvera-cream/30 border border-border p-4 md:p-6 mb-8 space-y-4">
              {/* Search */}
              <div className="relative">
                <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Busca por nombre, tipo o descripción…"
                  className="w-full pl-10 pr-10 py-3 bg-background border border-border focus:border-primary outline-none text-sm"
                />
                {search && (
                  <button
                    onClick={() => setSearch("")}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    aria-label="Limpiar búsqueda"
                  >
                    <X size={16} />
                  </button>
                )}
              </div>

              {/* Categoría */}
              <div className="flex flex-wrap gap-2">
                <span className="text-xs tracking-widest uppercase text-muted-foreground self-center mr-2">Tipo:</span>
                {([
                  { id: "all", label: "Todos" },
                  { id: "jamon", label: "Jamones" },
                  { id: "paleta", label: "Paletas" },
                ] as { id: CategoryFilter; label: string }[]).map((c) => (
                  <button
                    key={c.id}
                    onClick={() => setCategory(c.id)}
                    className={`px-4 py-1.5 text-xs tracking-widest uppercase border transition-colors ${
                      category === c.id
                        ? "bg-primary text-primary-foreground border-primary"
                        : "bg-background border-border text-muted-foreground hover:border-primary"
                    }`}
                  >
                    {c.label}
                  </button>
                ))}
              </div>

              {/* Marcas */}
              <div className="flex flex-wrap gap-2">
                <span className="text-xs tracking-widest uppercase text-muted-foreground self-center mr-2">Marca:</span>
                {BRANDS.map((b) => {
                  const active = selectedBrands.includes(b.id);
                  return (
                    <button
                      key={b.id}
                      onClick={() => toggleBrand(b.id)}
                      className={`px-4 py-1.5 text-xs tracking-widest uppercase border transition-colors ${
                        active
                          ? "bg-primary text-primary-foreground border-primary"
                          : "bg-background border-border text-muted-foreground hover:border-primary"
                      }`}
                    >
                      {b.name}
                    </button>
                  );
                })}
              </div>

              {hasActiveFilters && (
                <div className="flex items-center justify-between pt-2 border-t border-border/60">
                  <span className="text-xs text-muted-foreground">
                    {filtered.length} {filtered.length === 1 ? "producto" : "productos"}
                  </span>
                  <button
                    onClick={clearFilters}
                    className="text-xs tracking-widest uppercase text-primary hover:underline"
                  >
                    Limpiar filtros
                  </button>
                </div>
              )}
            </div>

            {/* Resultados */}
            {filtered.length > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
                {filtered.map(renderProductCard)}
              </div>
            ) : (
              <div className="text-center py-16 border border-dashed border-border">
                <p className="text-muted-foreground">No hay productos con estos filtros.</p>
                <button onClick={clearFilters} className="mt-3 text-sm tracking-widest uppercase text-primary hover:underline">
                  Limpiar filtros
                </button>
              </div>
            )}
          </div>

          <div className="mt-12 text-center p-6 border border-border bg-corvera-cream/30 space-y-2">
            <p className="text-sm text-muted-foreground">
              <strong>Envío gratuito</strong> para pedidos superiores a 20 kg de peso.
            </p>
            <p className="text-xs text-muted-foreground/70">
              Para pedidos inferiores a 20 kg, los gastos de envío son de 5 €.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Tienda;
