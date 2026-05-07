import { getPromotion } from "@/data/promotions";

interface PromoBadgeProps {
  productId: string;
  className?: string;
  size?: "sm" | "md";
}

const PromoBadge = ({ productId, className = "", size = "sm" }: PromoBadgeProps) => {
  const promo = getPromotion(productId);
  if (!promo) return null;
  const sizeClass = size === "md" ? "text-[10px] md:text-xs px-2.5 py-1.5" : "text-[9px] md:text-[10px] px-2 py-1";
  return (
    <span
      className={`inline-block bg-primary text-primary-foreground font-bold tracking-wider uppercase ${sizeClass} ${className}`}
    >
      {promo.badge}
    </span>
  );
};

export default PromoBadge;
