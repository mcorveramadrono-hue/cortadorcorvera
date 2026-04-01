import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const Unsubscribe = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const [status, setStatus] = useState<"loading" | "valid" | "already" | "invalid" | "success" | "error">("loading");
  const [processing, setProcessing] = useState(false);

  useEffect(() => {
    if (!token) {
      setStatus("invalid");
      return;
    }

    const validate = async () => {
      try {
        const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
        const anonKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;
        const res = await fetch(
          `${supabaseUrl}/functions/v1/handle-email-unsubscribe?token=${token}`,
          { headers: { apikey: anonKey } }
        );
        const data = await res.json();
        if (data.valid === true) setStatus("valid");
        else if (data.reason === "already_unsubscribed") setStatus("already");
        else setStatus("invalid");
      } catch {
        setStatus("invalid");
      }
    };
    validate();
  }, [token]);

  const handleUnsubscribe = async () => {
    setProcessing(true);
    try {
      const { data } = await supabase.functions.invoke("handle-email-unsubscribe", {
        body: { token },
      });
      if (data?.success) setStatus("success");
      else if (data?.reason === "already_unsubscribed") setStatus("already");
      else setStatus("error");
    } catch {
      setStatus("error");
    } finally {
      setProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-28 pb-16">
        <div className="max-w-md mx-auto px-4 text-center">
          {status === "loading" && <p className="text-muted-foreground">Verificando...</p>}
          {status === "valid" && (
            <>
              <h1 className="text-2xl font-serif font-bold text-foreground mb-4">Cancelar suscripción</h1>
              <p className="text-muted-foreground mb-6">¿Estás seguro de que quieres dejar de recibir nuestros correos electrónicos?</p>
              <button
                onClick={handleUnsubscribe}
                disabled={processing}
                className="px-6 py-3 bg-primary text-primary-foreground text-sm tracking-widest uppercase hover:bg-primary/90 transition-colors disabled:opacity-50"
              >
                {processing ? "Procesando..." : "Confirmar cancelación"}
              </button>
            </>
          )}
          {status === "success" && (
            <>
              <h1 className="text-2xl font-serif font-bold text-foreground mb-4">Suscripción cancelada</h1>
              <p className="text-muted-foreground">Ya no recibirás más correos electrónicos nuestros.</p>
            </>
          )}
          {status === "already" && (
            <>
              <h1 className="text-2xl font-serif font-bold text-foreground mb-4">Ya cancelada</h1>
              <p className="text-muted-foreground">Tu suscripción ya fue cancelada anteriormente.</p>
            </>
          )}
          {status === "invalid" && (
            <>
              <h1 className="text-2xl font-serif font-bold text-foreground mb-4">Enlace inválido</h1>
              <p className="text-muted-foreground">Este enlace no es válido o ha expirado.</p>
            </>
          )}
          {status === "error" && (
            <>
              <h1 className="text-2xl font-serif font-bold text-foreground mb-4">Error</h1>
              <p className="text-muted-foreground">Hubo un problema al procesar tu solicitud. Inténtalo de nuevo más tarde.</p>
            </>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Unsubscribe;
