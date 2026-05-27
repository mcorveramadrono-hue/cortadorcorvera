import { createContext, useContext, useState, useEffect, ReactNode } from "react";
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
  type: "free-shipping" | "amount-off" | "percent-off";
  amount?: number; // si amount-off
  percentOff?: number; // si percent-off
  minOrderTotal?: number;
  brandFilter?: string; // si presente, descuento solo aplica a items de esa marca
  shared?: boolean; // si es un cupón compartido (ANGEL5)
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

const CART_STORAGE_KEY = "corvera-cart-v1";

type PersistedCart = {
  items: CartItem[];
  promoCode: string;
  promoApplied: boolean;
  appliedCoupon: AppliedCoupon | null;
};

const loadPersisted = (): PersistedCart => {
  if (typeof window === "undefined") {
    return { items: [], promoCode: "", promoApplied: false, appliedCoupon: null };
  }
  try {
    const raw = window.localStorage.getItem(CART_STORAGE_KEY);
    if (!raw) return { items: [], promoCode: "", promoApplied: false, appliedCoupon: null };
    const parsed = JSON.parse(raw) as Partial<PersistedCart>;
    return {
      items: Array.isArray(parsed.items) ? parsed.items : [],
      promoCode: parsed.promoCode ?? "",
      promoApplied: parsed.promoApplied ?? false,
      appliedCoupon: parsed.appliedCoupon ?? null,
    };
  } catch {
    return { items: [], promoCode: "", promoApplied: false, appliedCoupon: null };
  }
};

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const initial = loadPersisted();
  const [items, setItems] = useState<CartItem[]>(initial.items);
  const [promoCode, setPromoCode] = useState(initial.promoCode);
  const [promoApplied, setPromoApplied] = useState(initial.promoApplied);
  const [appliedCoupon, setAppliedCoupon] = useState<AppliedCoupon | null>(initial.appliedCoupon);

  useEffect(() => {
    try {
      window.localStorage.setItem(
        CART_STORAGE_KEY,
        JSON.stringify({ items, promoCode, promoApplied, appliedCoupon }),
      );
    } catch {
      // ignore quota errors
    }
  }, [items, promoCode, promoApplied, appliedCoupon]);

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
        brandFilter: data.brandFilter ?? undefined,
        shared: data.shared === true,
      });
      const msg = data.brandFilter
        ? `Descuento de ${data.amount}€ aplicable a productos de esa marca.`
        : `Descuento de ${data.amount}€ listo para aplicar.`;
      return { ok: true, message: msg };
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

  // Cupón de importe: solo si subtotal (filtrado por marca si aplica) >= mínimo
  const couponEligibleSubtotal =
    appliedCoupon?.type === "amount-off" && appliedCoupon.brandFilter
      ? items.reduce((sum, i) => {
          if (i.product.brand !== appliedCoupon.brandFilter) return sum;
          const promo = getPromotion(i.product.id);
          const knifeFree = promo?.type === "free-knife";
          const knifeCost = i.withKnife && !knifeFree ? i.product.knifeSupplementPrice : 0;
          return sum + (i.price + knifeCost) * i.quantity;
        }, 0)
      : subtotal;

  const discountAmount =
    appliedCoupon?.type === "amount-off" &&
    appliedCoupon.amount &&
    couponEligibleSubtotal >= (appliedCoupon.minOrderTotal ?? 0) &&
    couponEligibleSubtotal > 0
      ? Math.min(appliedCoupon.amount, couponEligibleSubtotal)
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
