import { createContext, useContext, useState, ReactNode } from "react";
import type { Product } from "@/data/products";
import { getPromotion } from "@/data/promotions";
import { supabase } from "@/integrations/supabase/client";

export interface CartItem {
  product: Product;
  selectedWeight: number;
  price: number;
  quantity: number;
  withKnife: boolean;
}

export interface AppliedCoupon {
  code: string;
  type: "free-shipping" | "amount-off";
  amount?: number; // si amount-off
  minOrderTotal?: number;
}

interface CartContextType {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (index: number) => void;
  updateQuantity: (index: number, quantity: number) => void;
  updateKnife: (index: number, withKnife: boolean) => void;
  clearCart: () => void;
  totalItems: number;
  subtotal: number;
  totalWeight: number;
  shippingCost: number;
  discountAmount: number;
  total: number;
  promoCode: string;
  promoApplied: boolean;
  appliedCoupon: AppliedCoupon | null;
  applyPromoCode: (code: string) => Promise<{ ok: boolean; message: string }>;
  removePromoCode: () => void;
  hasPromoFreeShipping: boolean;
  hasPromoFreeKnife: boolean;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [items, setItems] = useState<CartItem[]>([]);
  const [promoCode, setPromoCode] = useState("");
  const [promoApplied, setPromoApplied] = useState(false);
  const [appliedCoupon, setAppliedCoupon] = useState<AppliedCoupon | null>(null);

  const addItem = (newItem: CartItem) => {
    setItems((prev) => {
      const existingIdx = prev.findIndex(
        (i) =>
          i.product.id === newItem.product.id &&
          i.selectedWeight === newItem.selectedWeight,
      );
      if (existingIdx >= 0) {
        const updated = [...prev];
        updated[existingIdx] = {
          ...updated[existingIdx],
          quantity: updated[existingIdx].quantity + newItem.quantity,
          withKnife: updated[existingIdx].withKnife || newItem.withKnife,
        };
        return updated;
      }
      return [...prev, newItem];
    });
  };

  const removeItem = (index: number) => {
    setItems((prev) => prev.filter((_, i) => i !== index));
  };

  const updateQuantity = (index: number, quantity: number) => {
    if (quantity < 1) return;
    setItems((prev) => {
      const updated = [...prev];
      updated[index] = { ...updated[index], quantity };
      return updated;
    });
  };

  const updateKnife = (index: number, withKnife: boolean) => {
    setItems((prev) => {
      const updated = [...prev];
      updated[index] = { ...updated[index], withKnife };
      return updated;
    });
  };

  const clearCart = () => {
    setItems([]);
    setPromoCode("");
    setPromoApplied(false);
    setAppliedCoupon(null);
  };

  const applyPromoCode = async (code: string): Promise<{ ok: boolean; message: string }> => {
    const normalized = code.trim().toUpperCase();
    if (!normalized) return { ok: false, message: "Introduce un código." };

    if (normalized === "MAMA3") {
      setPromoCode(normalized);
      setPromoApplied(true);
      setAppliedCoupon({ code: normalized, type: "free-shipping" });
      return { ok: true, message: "Envío gratuito aplicado." };
    }

    // Validar contra el backend (cupones 10€)
    try {
      const { data, error } = await supabase.functions.invoke("validate-coupon", {
        body: { code: normalized },
      });
      if (error || !data?.valid) {
        return { ok: false, message: data?.error || "Código no válido." };
      }
      setPromoCode(normalized);
      setPromoApplied(true);
      setAppliedCoupon({
        code: normalized,
        type: "amount-off",
        amount: Number(data.amount),
        minOrderTotal: Number(data.minOrderTotal),
      });
      return { ok: true, message: `Descuento de ${data.amount}€ listo para aplicar.` };
    } catch {
      return { ok: false, message: "No se pudo validar el código." };
    }
  };

  const removePromoCode = () => {
    setPromoCode("");
    setPromoApplied(false);
    setAppliedCoupon(null);
  };

  const totalItems = items.reduce((sum, i) => sum + i.quantity, 0);

  const subtotal = items.reduce((sum, i) => {
    // El corte a cuchillo es gratis si el producto tiene promo "free-knife"
    const promo = getPromotion(i.product.id);
    const knifeFree = promo?.type === "free-knife";
    const knifeCost = i.withKnife && !knifeFree ? i.product.knifeSupplementPrice : 0;
    return sum + (i.price + knifeCost) * i.quantity;
  }, 0);

  const totalWeight = items.reduce((sum, i) => sum + i.selectedWeight * i.quantity, 0);

  // Envío gratis si hay producto con promo de envío gratis, peso >= 20, o cupón free-shipping
  const hasPromoFreeShipping = items.some((i) => getPromotion(i.product.id)?.type === "free-shipping");
  const hasPromoFreeKnife = items.some((i) => getPromotion(i.product.id)?.type === "free-knife");

  const baseShippingCost = totalWeight >= 20 || hasPromoFreeShipping ? 0 : 5;
  const couponFreeShipping = appliedCoupon?.type === "free-shipping";
  const shippingCost = couponFreeShipping ? 0 : baseShippingCost;

  // Cupón de importe: solo si subtotal >= mínimo
  const discountAmount =
    appliedCoupon?.type === "amount-off" &&
    appliedCoupon.amount &&
    subtotal >= (appliedCoupon.minOrderTotal ?? 0)
      ? Math.min(appliedCoupon.amount, subtotal)
      : 0;

  const total = Math.max(0, subtotal + shippingCost - discountAmount);

  return (
    <CartContext.Provider
      value={{
        items, addItem, removeItem, updateQuantity, updateKnife, clearCart,
        totalItems, subtotal, totalWeight, shippingCost, discountAmount, total,
        promoCode, promoApplied, appliedCoupon,
        applyPromoCode, removePromoCode,
        hasPromoFreeShipping, hasPromoFreeKnife,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within CartProvider");
  return context;
};
