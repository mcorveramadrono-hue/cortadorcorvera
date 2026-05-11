import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { X, Gift } from "lucide-react";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const STORAGE_KEY = "corvera_welcome_coupon_v1";
const SHOW_DELAY_MS = 8000;
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

  const close = (markSeen = true) => {
    setOpen(false);
    if (markSeen) localStorage.setItem(STORAGE_KEY, new Date().toISOString());
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
        toast.success("Ya te enviamos un cupón antes. Revisa tu correo.");
      } else {
        toast.success("¡Listo! Revisa tu correo, te hemos enviado el código.");
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
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 p-4 animate-in fade-in duration-300"
      onClick={() => close(true)}
    >
      <div
        className="relative w-full max-w-md rounded-lg bg-white p-8 shadow-2xl animate-in zoom-in-95 duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={() => close(true)}
          aria-label="Cerrar"
          className="absolute right-3 top-3 text-gray-400 transition hover:text-gray-700"
        >
          <X size={20} />
        </button>

        <div className="text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-[#8B2020]/10">
            <Gift className="h-7 w-7 text-[#8B2020]" />
          </div>
          <h2 className="font-serif text-2xl font-bold text-[#8B2020]">
            10€ de regalo para ti
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Déjanos tu correo y te enviamos un código de <strong>10€ de descuento</strong> para
            tu primera compra superior a <strong>160€</strong>.
          </p>

          {done ? (
            <p className="mt-6 rounded bg-green-50 p-4 text-sm text-green-700">
              ¡Cupón enviado! Revisa tu bandeja de entrada (y la carpeta de spam).
            </p>
          ) : (
            <form onSubmit={handleSubmit} className="mt-6 space-y-3">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="tu@correo.com"
                maxLength={255}
                disabled={loading}
                className="w-full rounded border border-gray-300 px-4 py-3 text-sm font-serif outline-none focus:border-[#8B2020] disabled:opacity-50"
              />
              <button
                type="submit"
                disabled={loading}
                className="w-full rounded bg-[#8B2020] py-3 font-serif font-semibold text-white transition hover:bg-[#6f1818] disabled:opacity-60"
              >
                {loading ? "Enviando…" : "Quiero mi cupón de 10€"}
              </button>
              <button
                type="button"
                onClick={() => close(true)}
                className="block w-full text-xs text-gray-500 underline-offset-4 hover:underline"
              >
                No, gracias
              </button>
            </form>
          )}

          <p className="mt-4 text-[11px] text-gray-400">
            Válido 4 meses. Un solo uso por cliente. Pedido mínimo 160€.
          </p>
        </div>
      </div>
    </div>
  );
};

export default WelcomeCouponDialog;
