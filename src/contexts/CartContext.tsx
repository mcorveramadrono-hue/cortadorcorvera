import { createContext, useContext, useState, ReactNode } from "react";
import type { Product } from "@/data/products";

export interface CartItem {
  product: Product;
  selectedWeight: number;
  price: number;
  quantity: number;
  withKnife: boolean;
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
  total: number;
  promoCode: string;
  promoApplied: boolean;
  applyPromoCode: (code: string) => boolean;
  removePromoCode: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [items, setItems] = useState<CartItem[]>([]);
  const [promoCode, setPromoCode] = useState("");
  const [promoApplied, setPromoApplied] = useState(false);

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
  };

  const applyPromoCode = (code: string): boolean => {
    if (code.trim().toUpperCase() === "SEMANASANTA") {
      setPromoCode(code.trim().toUpperCase());
      setPromoApplied(true);
      return true;
    }
    return false;
  };

  const removePromoCode = () => {
    setPromoCode("");
    setPromoApplied(false);
  };

  const totalItems = items.reduce((sum, i) => sum + i.quantity, 0);

  const subtotal = items.reduce((sum, i) => {
    const itemPrice = i.price + (i.withKnife ? i.product.knifeSupplementPrice : 0);
    return sum + itemPrice * i.quantity;
  }, 0);

  const totalWeight = items.reduce((sum, i) => sum + i.selectedWeight * i.quantity, 0);

  const baseShippingCost = totalWeight >= 20 ? 0 : 5;
  const shippingCost = promoApplied ? 0 : baseShippingCost;

  const total = subtotal + shippingCost;

  return (
    <CartContext.Provider
      value={{ items, addItem, removeItem, updateQuantity, updateKnife, clearCart, totalItems, subtotal, totalWeight, shippingCost, total, promoCode, promoApplied, applyPromoCode, removePromoCode }}
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
