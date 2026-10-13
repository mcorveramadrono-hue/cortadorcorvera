import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { X } from "lucide-react";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import heroImage from "@/assets/welcome-coupon-hero.jpg";
import logo from "@/assets/corvera-logo.webp";

const STORAGE_KEY = "corvera_welcome_coupon_v2";
const SESSION_KEY = "corvera_welcome_coupon_shown";
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
  const [accepted, setAccepted] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (HIDDEN_ROUTES.some((r) => pathname.startsWith(r))) return;
    if (localStorage.getItem(STORAGE_KEY)) return;
    if (sessionStorage.getItem(SESSION_KEY)) return;

    const t = setTimeout(() => {
      sessionStorage.setItem(SESSION_KEY, "1");
      setOpen(true);
    }, SHOW_DELAY_MS);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
    if (!accepted) {
      toast.error("Debes aceptar recibir comunicaciones comerciales y la Política de Privacidad.");
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
        toast.success("¡Casi listo! Revisa tu correo y confirma para recibir tu cupón.");
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
        role="dialog"
        aria-modal="true"
        aria-label="Cupón de bienvenida"
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
            <div className="font-serif text-lg font-semibold leading-tight drop-shadow text-right whitespace-nowrap">
              hay un <span className="text-2xl font-bold">JAMÓN</span> <span className="text-sm font-normal italic">esperándote</span>
            </div>
          </div>

          {/* RIGHT — form */}
          <div className="flex flex-col justify-center p-8 md:p-10">
            <img
              src={logo}
              alt="Corvera Ibéricos"
              className="mx-auto mb-4 w-40 h-auto object-contain md:hidden"
            />
            <div className="font-serif text-2xl font-bold text-[#8B2020] text-center md:text-left md:text-3xl">
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
                <label htmlFor="welcome-email" className="sr-only">Tu email</label>
                <input
                  id="welcome-email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Tu email"
                  maxLength={255}
                  disabled={loading}
                  className="w-full rounded-full border border-gray-300 px-5 py-3 text-sm font-serif outline-none transition focus:border-[#8B2020] focus:ring-2 focus:ring-[#8B2020]/20 disabled:opacity-50"
                />
                <div className="flex items-start gap-2 text-left">
                  <input id="welcome-consent" type="checkbox" checked={accepted} onChange={(e) => setAccepted(e.target.checked)} required className="mt-0.5 h-4 w-4 accent-primary" />
                  <label htmlFor="welcome-consent" className="text-xs text-gray-700 leading-snug">
                    Acepto recibir el cupón y comunicaciones comerciales de Corvera Ibéricos por email, y la <a href="/politica-privacidad" target="_blank" rel="noopener noreferrer" className="underline">Política de Privacidad</a>. Puedes darte de baja en cualquier momento.
                  </label>
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full rounded-full bg-[#8B2020] py-3.5 font-serif font-semibold text-white shadow-md transition hover:bg-[#6f1818] hover:shadow-lg disabled:opacity-60"
                >
                  {loading ? "Enviando…" : "Recibir mi cupón de 5 €"}
                </button>
                <button
                  type="button"
                  onClick={() => close()}
                  className="block w-full text-xs text-gray-700 underline underline-offset-4 hover:text-gray-700"
                >
                  No, prefiero pagar 5€ más
                </button>
              </form>
            )}

            <p className="mt-5 text-center text-xs italic text-gray-600">
              Sin spam. Solo ofertas que merecen la pena.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WelcomeCouponDialog;
