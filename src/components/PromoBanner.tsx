import { useState, useEffect } from "react";
import { Gift } from "lucide-react";
import { useNavigate } from "react-router-dom";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const PROMO_DISMISSED_KEY = "corvera_promo_dismissed";
// Promotion ends Monday April 6, 2026 at 23:59:59 Spanish time (UTC+2)
const PROMO_END = new Date("2026-04-06T23:59:59+02:00").getTime();

const PromoBanner = () => {
  const navigate = useNavigate();
  const [visible, setVisible] = useState(false);
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const dismissed = sessionStorage.getItem(PROMO_DISMISSED_KEY);
    if (dismissed) return;

    if (Date.now() >= PROMO_END) return;

    setVisible(true);

    const tick = () => {
      const diff = PROMO_END - Date.now();
      if (diff <= 0) {
        setVisible(false);
        return;
      }
      setTimeLeft({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((diff / (1000 * 60)) % 60),
        seconds: Math.floor((diff / 1000) % 60),
      });
    };

    tick();
    const interval = setInterval(tick, 1000);
    return () => clearInterval(interval);
  }, []);

  const close = () => {
    sessionStorage.setItem(PROMO_DISMISSED_KEY, "true");
    setVisible(false);
  };

  const handleShopNow = () => {
    close();
    navigate("/tienda");
  };

  const pad = (n: number) => n.toString().padStart(2, "0");

  return (
    <Dialog open={visible} onOpenChange={(open) => { if (!open) close(); }}>
      <DialogContent className="max-w-md text-center">
        <DialogHeader>
          <DialogTitle className="font-serif text-2xl flex items-center justify-center gap-2">
            <Gift className="text-primary" size={28} />
            ¡Envío GRATIS!
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-2">
          <p className="text-muted-foreground text-sm leading-relaxed">
            Disfruta de <strong className="text-foreground">envío gratuito</strong> en todos tus pedidos hasta el <strong className="text-foreground">lunes 6 de abril</strong>. ¡No dejes pasar esta oportunidad!
          </p>
          <div className="flex justify-center gap-3">
            {[
              { value: timeLeft.days, label: "Días" },
              { value: timeLeft.hours, label: "Horas" },
              { value: timeLeft.minutes, label: "Min" },
              { value: timeLeft.seconds, label: "Seg" },
            ].map((unit) => (
              <div key={unit.label} className="bg-primary/10 rounded-lg px-3 py-2 min-w-[60px]">
                <span className="font-mono text-2xl font-bold text-primary">{pad(unit.value)}</span>
                <p className="text-[10px] text-muted-foreground uppercase tracking-widest">{unit.label}</p>
              </div>
            ))}
          </div>
          <div className="bg-accent/50 border border-border rounded-lg p-3">
            <p className="text-xs text-muted-foreground mb-1">Usa el código en tu carrito:</p>
            <span className="font-mono text-lg font-bold text-primary tracking-wider">SEMANASANTA</span>
          </div>
          <button
            onClick={handleShopNow}
            className="w-full px-6 py-3 bg-primary text-primary-foreground text-sm tracking-widest uppercase hover:bg-primary/90 transition-colors rounded"
          >
            ¡Comprar Ahora!
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PromoBanner;
