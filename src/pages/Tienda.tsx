import { useEffect, useMemo, useState } from "react";
import { ArrowLeft, Search, X, SlidersHorizontal, ChevronDown } from "lucide-react";
import { useNavigate, Link } from "react-router-dom";
import { BRANDS, products } from "@/data/products";
import type { Product } from "@/data/products";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Slider } from "@/components/ui/slider";

type CategoryFilter = "all" | "jamon" | "paleta";
type SortOption = "default" | "price-asc" | "price-desc";

type Quality = "bellota-100" | "bellota-75" | "bellota-50" | "cebo-campo" | "cebo" | "fuera-norma";

const QUALITIES: { id: Quality; label: string }[] = [
  { id: "bellota-100", label: "Bellota 100%" },
  { id: "bellota-75", label: "Bellota 75%" },
  { id: "bellota-50", label: "Bellota 50%" },
  { id: "cebo-campo", label: "Cebo de Campo" },
  { id: "cebo", label: "Cebo" },
  { id: "fuera-norma", label: "Fuera de Norma (F/N)" },
];

function getQuality(p: Product): Quality {
  const n = p.name.toLowerCase();
  if (n.includes("reserva familiar") || n.includes("fuera de norma") || n.includes("f/n")) return "fuera-norma";
  if (n.includes("bellota") && n.includes("100")) return "bellota-100";
  if (n.includes("bellota") && n.includes("75")) return "bellota-75";
  if (n.includes("bellota") && n.includes("50")) return "bellota-50";
  if (n.includes("cebo de campo") || n.includes("cebo campo")) return "cebo-campo";
  return "cebo";
}

function getMinPrice(p: Product): number {
  return p.weightOptions.reduce((m, o) => (o.price < m ? o.price : m), p.weightOptions[0].price);
}

function getMinPricePerKg(p: Product): number {
  return p.pricePerKg;
}

const ALL_PRICES = products.map(getMinPrice);
const PRICE_MIN = Math.floor(Math.min(...ALL_PRICES));
const PRICE_MAX = Math.ceil(Math.max(...ALL_PRICES));

// Default ordering: reserva familiar / fuera de norma first, then cheapest cebo, then rest grouped by brand
function defaultSort(list: Product[]): Product[] {
  const fueraNorma = list.filter((p) => getQuality(p) === "fuera-norma");
  const cebos = list
    .filter((p) => getQuality(p) === "cebo" || getQuality(p) === "cebo-campo")
    .sort((a, b) => getMinPricePerKg(a) - getMinPricePerKg(b));
  const rest = list.filter((p) => {
    const q = getQuality(p);
    return q !== "fuera-norma" && q !== "cebo" && q !== "cebo-campo";
  });
  const brandOrder = BRANDS.map((b) => b.id);
  rest.sort((a, b) => brandOrder.indexOf(a.brand) - brandOrder.indexOf(b.brand));
  return [...fueraNorma, ...cebos, ...rest];
}

const Tienda = () => {
  const navigate = useNavigate();
  const STORAGE_KEY = "tienda:filters";
  const saved = (() => {
    try {
      const raw = sessionStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  })();
  const [search, setSearch] = useState<string>(saved?.search ?? "");
  const [category, setCategory] = useState<CategoryFilter>(saved?.category ?? "all");
  const [selectedBrands, setSelectedBrands] = useState<string[]>(saved?.selectedBrands ?? []);
  const [selectedQualities, setSelectedQualities] = useState<Quality[]>(saved?.selectedQualities ?? []);
  const [priceRange, setPriceRange] = useState<[number, number]>(saved?.priceRange ?? [PRICE_MIN, PRICE_MAX]);
  const [sortBy, setSortBy] = useState<SortOption>(saved?.sortBy ?? "default");
  const [filtersOpen, setFiltersOpen] = useState<boolean>(saved?.filtersOpen ?? false);

  useEffect(() => {
    try {
      sessionStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({ search, category, selectedBrands, selectedQualities, priceRange, sortBy, filtersOpen })
      );
    } catch {}
  }, [search, category, selectedBrands, selectedQualities, priceRange, sortBy, filtersOpen]);

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "Tienda Jamón Ibérico Online | César Nieto, La Joya Jabugo, Epicum y Finura - Corvera Ibéricos";
    const meta = document.querySelector('meta[name="description"]');
    if (meta) meta.setAttribute("content", "Compra jamón ibérico de bellota y paleta ibérica online: César Nieto (Guijuelo), La Joya (Jabugo), Epicum y Finura. Bellota 100%, 75%, 50%, cebo y reserva familiar. Envío a toda España. Corte a cuchillo.");
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
    setSortBy("default");
  };

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    const list = products.filter((p) => {
      if (category !== "all" && p.category !== category) return false;
      if (selectedBrands.length > 0 && !selectedBrands.includes(p.brand)) return false;
      if (selectedQualities.length > 0 && !selectedQualities.includes(getQuality(p))) return false;
      const price = getMinPrice(p);
      if (price < priceRange[0] || price > priceRange[1]) return false;
      if (q && !`${p.name} ${p.description}`.toLowerCase().includes(q)) return false;
      return true;
    });

    if (sortBy === "price-asc") {
      return [...list].sort((a, b) => getMinPrice(a) - getMinPrice(b));
    }
    if (sortBy === "price-desc") {
      return [...list].sort((a, b) => getMinPrice(b) - getMinPrice(a));
    }
    return defaultSort(list);
  }, [search, category, selectedBrands, selectedQualities, priceRange, sortBy]);

  const renderProductCard = (product: Product) => {
    const isEightKgBrand = product.brand === "epicum" || product.brand === "finura";
    const eightKgOption = product.weightOptions.find((o) => o.weight === 8);
    const displayPrice = isEightKgBrand && eightKgOption
      ? eightKgOption.price
      : product.weightOptions.reduce(
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
            className="w-full h-56 md:h-64 object-contain p-2 md:p-4 transition-opacity duration-300 group-hover:opacity-0"
          />
          <img
            src={hoverImage}
            alt=""
            aria-hidden="true"
            className="absolute inset-0 w-full h-56 md:h-64 object-contain p-2 md:p-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          />
        </div>
        <div className="p-2 md:p-4 space-y-1 md:space-y-1.5 flex-1 flex flex-col items-center text-center">
          <span className="text-[9px] md:text-[10px] tracking-[0.2em] uppercase text-primary/80 font-medium">{brandName}</span>
          <h3 className="font-serif text-[11px] md:text-sm font-semibold text-foreground leading-tight line-clamp-2">{product.name}</h3>
          <p className="font-serif text-sm md:text-base font-bold text-primary mt-auto pt-1 md:pt-2">
            Desde {displayPrice.toFixed(2).replace('.', ',')} €
          </p>
          <span className="text-[9px] md:text-[10px] text-muted-foreground/60">*IVA incl.</span>
        </div>
      </Link>
    );
  };

  const hasActiveFilters = !!search || category !== "all" || selectedBrands.length > 0 || selectedQualities.length > 0 || priceRange[0] !== PRICE_MIN || priceRange[1] !== PRICE_MAX || sortBy !== "default";

  const searchInput = (
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
  );

  const filtersContent = (
    <>

      {/* Ordenar */}
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-xs tracking-widest uppercase text-muted-foreground mr-2">Ordenar:</span>
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value as SortOption)}
          className="px-3 py-1.5 text-xs tracking-widest uppercase border border-border bg-background text-foreground hover:border-primary outline-none cursor-pointer"
        >
          <option value="default">Recomendado</option>
          <option value="price-asc">Precio: menor a mayor</option>
          <option value="price-desc">Precio: mayor a menor</option>
        </select>
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

      {/* Calidad */}
      <div className="flex flex-wrap gap-2">
        <span className="text-xs tracking-widest uppercase text-muted-foreground self-center mr-2">Calidad:</span>
        {QUALITIES.map((q) => {
          const active = selectedQualities.includes(q.id);
          return (
            <button
              key={q.id}
              onClick={() => toggleQuality(q.id)}
              className={`px-4 py-1.5 text-xs tracking-widest uppercase border transition-colors ${
                active
                  ? "bg-primary text-primary-foreground border-primary"
                  : "bg-background border-border text-muted-foreground hover:border-primary"
              }`}
            >
              {q.label}
            </button>
          );
        })}
      </div>

      {/* Precio */}
      <div className="pt-2">
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs tracking-widest uppercase text-muted-foreground">Precio</span>
          <span className="text-xs text-foreground font-medium">
            {priceRange[0]} € — {priceRange[1]} €
          </span>
        </div>
        <Slider
          min={PRICE_MIN}
          max={PRICE_MAX}
          step={1}
          value={priceRange}
          onValueChange={(v) => setPriceRange([v[0], v[1]] as [number, number])}
          className="w-full"
        />
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
    </>
  );

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

          {/* Search above filters toggle (all viewports) */}
          <div className="mb-4 space-y-3">
            {searchInput}
            <button
              onClick={() => setFiltersOpen((v) => !v)}
              className="w-full flex items-center justify-between gap-2 px-4 py-3 bg-corvera-cream/30 border border-border text-sm tracking-widest uppercase text-foreground"
              aria-expanded={filtersOpen}
            >
              <span className="flex items-center gap-2">
                <SlidersHorizontal size={16} />
                Filtros
                {hasActiveFilters && (
                  <span className="ml-1 inline-block w-2 h-2 rounded-full bg-primary" />
                )}
              </span>
              <ChevronDown size={18} className={`transition-transform ${filtersOpen ? "rotate-180" : ""}`} />
            </button>
            {filtersOpen && (
              <div className="bg-corvera-cream/30 border border-border p-4 md:p-6 space-y-4">
                {filtersContent}
              </div>
            )}
          </div>

          {/* Resultados */}
          {filtered.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-6">
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
