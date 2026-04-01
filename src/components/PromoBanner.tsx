import { useState, useEffect } from "react";
import { X } from "lucide-react";

const PROMO_END_KEY = "corvera_promo_end";
const PROMO_DISMISSED_KEY = "corvera_promo_dismissed";
const PROMO_DURATION_MS = 5 * 24 * 60 * 60 * 1000; // 5 days

const PromoBanner = () => {
  const [visible, setVisible] = useState(false);
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const dismissed = sessionStorage.getItem(PROMO_DISMISSED_KEY);
    if (dismissed) return;

    let endTime = localStorage.getItem(PROMO_END_KEY);
    if (!endTime) {
      const end = Date.now() + PROMO_DURATION_MS;
      localStorage.setItem(PROMO_END_KEY, end.toString());
      endTime = end.toString();
    }

    const end = Number(endTime);
    if (Date.now() >= end) return;

    setVisible(true);

    const interval = setInterval(() => {
      const diff = end - Date.now();
      if (diff <= 0) {
        clearInterval(interval);
        setVisible(false);
        return;
      }
      setTimeLeft({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((diff / (1000 * 60)) % 60),
        seconds: Math.floor((diff / 1000) % 60),
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  if (!visible) return null;

  const close = () => {
    sessionStorage.setItem(PROMO_DISMISSED_KEY, "true");
    setVisible(false);
  };

  const pad = (n: number) => n.toString().padStart(2, "0");

  return (
    <div className="fixed top-0 left-0 right-0 z-[60] bg-primary text-primary-foreground">
      <div className="max-w-7xl mx-auto px-4 py-2.5 flex items-center justify-center gap-3 text-center relative">
        <p className="text-xs sm:text-sm font-medium">
          🎉 <strong>¡Envío GRATIS!</strong> en todos los pedidos durante{" "}
          <span className="font-mono font-bold">
            {timeLeft.days}d {pad(timeLeft.hours)}:{pad(timeLeft.minutes)}:{pad(timeLeft.seconds)}
          </span>
        </p>
        <button
          onClick={close}
          className="absolute right-3 top-1/2 -translate-y-1/2 p-1 hover:bg-primary-foreground/20 rounded transition-colors"
          aria-label="Cerrar"
        >
          <X size={16} />
        </button>
      </div>
    </div>
  );
};

export default PromoBanner;
