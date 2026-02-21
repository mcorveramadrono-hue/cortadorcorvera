import { X } from "lucide-react";

interface ProductInfoDialogProps {
  isOpen: boolean;
  onClose: () => void;
  product: {
    name: string;
    description: string;
    image: string;
    weight: string;
    longDescription?: string;
  } | null;
}

const ProductInfoDialog = ({ isOpen, onClose, product }: ProductInfoDialogProps) => {
  if (!isOpen || !product) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-foreground/60 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-background border border-border w-full max-w-2xl max-h-[90vh] overflow-y-auto z-10">
        <div className="flex items-center justify-between p-6 border-b border-border">
          <h3 className="font-serif text-2xl font-bold text-foreground">{product.name}</h3>
          <button onClick={onClose} className="text-muted-foreground hover:text-foreground transition-colors">
            <X size={20} />
          </button>
        </div>
        <div className="p-6 space-y-6">
          <img src={product.image} alt={product.name} className="w-full h-64 md:h-80 object-cover" />
          <div className="space-y-3">
            <span className="text-xs tracking-widest uppercase text-muted-foreground">{product.weight}</span>
            <p className="text-muted-foreground leading-relaxed text-lg">
              {product.longDescription || product.description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductInfoDialog;
