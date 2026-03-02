import { X } from "lucide-react";
import { Product } from "@/data/products";

interface ProductDetailDialogProps {
  isOpen: boolean;
  onClose: () => void;
  product: Product | null;
}

const ProductDetailDialog = ({ isOpen, onClose, product }: ProductDetailDialogProps) => {
  if (!isOpen || !product) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-foreground/60 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-background border border-border w-full max-w-2xl max-h-[90vh] overflow-y-auto z-10">
        <div className="flex items-center justify-between p-6 border-b border-border">
          <h3 className="font-serif text-xl md:text-2xl font-bold text-foreground">{product.name}</h3>
          <button onClick={onClose} className="text-muted-foreground hover:text-foreground transition-colors">
            <X size={20} />
          </button>
        </div>
        <div className="p-6 space-y-6">
          <img src={product.images[0]} alt={product.name} className="w-full h-64 md:h-80 object-contain bg-corvera-cream/30 p-4" />

          <p className="text-muted-foreground leading-relaxed">{product.description}</p>

          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 border border-border">
              <p className="text-xs tracking-widest uppercase text-muted-foreground mb-1">Precio *IVA incluido</p>
              <p className="font-serif text-lg font-semibold text-primary">{product.price}</p>
            </div>
            <div className="p-4 border border-border">
              <p className="text-xs tracking-widest uppercase text-muted-foreground mb-1">Peso</p>
              <p className="font-serif text-lg font-semibold text-foreground">{product.weight}</p>
            </div>
            {product.pricePerKg && (
              <div className="p-4 border border-border">
                <p className="text-xs tracking-widest uppercase text-muted-foreground mb-1">Precio por kg</p>
                <p className="font-serif text-lg font-semibold text-foreground">{product.pricePerKg}</p>
              </div>
            )}
            <div className="p-4 border border-border">
              <p className="text-xs tracking-widest uppercase text-muted-foreground mb-1">Curación</p>
              <p className="font-serif text-lg font-semibold text-foreground">{product.curing}</p>
            </div>
            {product.campaign && (
              <div className="p-4 border border-border">
                <p className="text-xs tracking-widest uppercase text-muted-foreground mb-1">Campaña</p>
                <p className="font-serif text-lg font-semibold text-foreground">{product.campaign}</p>
              </div>
            )}
            <div className="p-4 border border-border">
              <p className="text-xs tracking-widest uppercase text-muted-foreground mb-1">Corte a cuchillo</p>
              <p className="font-serif text-sm font-semibold text-foreground">{product.knifeSuplement}</p>
            </div>
          </div>

          <p className="text-xs text-muted-foreground/70 text-center">
            * Todos los precios incluyen IVA
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailDialog;
