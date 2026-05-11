import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { X } from "lucide-react";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import heroImage from "@/assets/welcome-coupon-hero.jpg";
import logo from "@/assets/corvera-logo.webp";

const STORAGE_KEY = "corvera_welcome_coupon_v2";
const SHOW_DELAY_MS = 5000;
const HIDDEN_ROUTES = ["/checkout", "/confirmar-pago", "/marcar-envio", "/pedido-confirmado"];

const emailSchema = z
  .string()
  .trim()
  .toLowerCase()
  .email({ message: "Introduce un correo válido" })
  .max(255, { message: "El correo es demasiado largo" });

const WelcomeCouponDialog = () => {
  const { pathname } = useLocation();
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (HIDDEN_ROUTES.some((r) => pathname.startsWith(r))) return;
    if (typeof window === "undefined") return;
    if (localStorage.getItem(STORAGE_KEY)) return;

    const t = setTimeout(() => setOpen(true), SHOW_DELAY_MS);
    return () => clearTimeout(t);
  }, [pathname]);

  const close = () => {
    setOpen(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = emailSchema.safeParse(email);
    if (!parsed.success) {
      toast.error(parsed.error.issues[0]?.message ?? "Correo no válido");
      return;
    }
    setLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke("request-welcome-coupon", {
        body: { email: parsed.data },
      });
      if (error) throw error;
      if ((data as any)?.alreadyIssued) {
        toast.success("Ya te enviamos un soborno antes. Revisa tu correo.");
      } else {
        toast.success("¡Listo! Tu cupón vuela hacia tu bandeja de entrada.");
      }
      setDone(true);
      localStorage.setItem(STORAGE_KEY, new Date().toISOString());
      setTimeout(() => setOpen(false), 2500);
    } catch (err) {
      console.error(err);
      toast.error("No se pudo generar el cupón. Inténtalo de nuevo.");
    } finally {
      setLoading(false);
    }
  };

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 p-4 animate-in fade-in duration-300"
      onClick={() => close()}
    >
      <div
        className="relative w-full max-w-3xl overflow-hidden rounded-lg bg-white shadow-2xl animate-in zoom-in-95 duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={() => close()}
          aria-label="Cerrar"
          className="absolute right-3 top-3 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-gray-700 shadow transition hover:bg-white"
        >
          <X size={18} />
        </button>

        <div className="grid md:grid-cols-2">
          {/* LEFT — image with tagline */}
          <div
            className="relative hidden min-h-[420px] flex-col justify-between overflow-hidden p-8 text-white md:flex"
            style={{
              backgroundImage: `linear-gradient(135deg, rgba(139,32,32,0.55), rgba(60,10,10,0.85)), url(${heroImage})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <div className="font-serif text-4xl font-bold leading-none tracking-tight">
              SEAS<br />
              <span className="ml-6">QUIEN</span><br />
              <span className="ml-12">SEAS</span>
            </div>
            <div className="font-serif text-xl font-semibold leading-tight drop-shadow">
              hay un<br />
              <span className="text-3xl font-bold">JAMÓN</span><br />
              <span className="text-sm font-normal italic">esperándote</span>
            </div>
          </div>

          {/* RIGHT — form */}
          <div className="flex flex-col justify-center p-8 md:p-10">
            <div className="font-serif text-2xl font-bold text-[#8B2020] md:text-3xl">
              Te vamos a sobornar
            </div>
            <p className="mt-4 font-serif text-lg font-semibold text-gray-900">
              5€ para tu primera compra
            </p>
            <p className="font-serif text-sm text-gray-600">
              si nos dejas tu email. Sin pedido mínimo.
            </p>

            {done ? (
              <div className="mt-6 rounded bg-green-50 p-4 text-center text-sm text-green-700">
                ¡Soborno aceptado! 🐷 Revisa tu bandeja de entrada (y el spam, por si acaso).
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="mt-6 space-y-3">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Tu email"
                  maxLength={255}
                  disabled={loading}
                  className="w-full rounded-full border border-gray-300 px-5 py-3 text-sm font-serif outline-none transition focus:border-[#8B2020] focus:ring-2 focus:ring-[#8B2020]/20 disabled:opacity-50"
                />
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full rounded-full bg-[#8B2020] py-3.5 font-serif font-semibold text-white shadow-md transition hover:bg-[#6f1818] hover:shadow-lg disabled:opacity-60"
                >
                  {loading ? "Enviando…" : "Acepto el soborno"}
                </button>
                <button
                  type="button"
                  onClick={() => close()}
                  className="block w-full text-xs text-gray-500 underline underline-offset-4 hover:text-gray-700"
                >
                  No, prefiero pagar 5€ más
                </button>
              </form>
            )}

            <p className="mt-5 text-center text-[11px] italic text-gray-400">
              Sin spam. Solo ofertas que merecen la pena.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WelcomeCouponDialog;
