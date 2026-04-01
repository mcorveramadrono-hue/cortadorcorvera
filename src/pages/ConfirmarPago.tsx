import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";

const ConfirmarPago = () => {
  const [searchParams] = useSearchParams();
  const status = searchParams.get("status") as "success" | "already" | "error" | "invalid" | null;
  const orderNumber = searchParams.get("order") || "";
  const name = searchParams.get("name") || "";

  if (status === "success") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-muted/30 p-6">
        <div className="bg-background rounded-xl shadow-lg p-10 max-w-md text-center space-y-4">
          <div className="text-5xl">✅</div>
          <h1 className="text-2xl font-bold text-foreground">Pago confirmado</h1>
          <p className="text-muted-foreground">
            El pedido <strong>{orderNumber}</strong> de <strong>{name}</strong> ha sido marcado como pagado.
          </p>
          <p className="text-sm text-muted-foreground">
            Se ha enviado un email de confirmación al cliente.
          </p>
        </div>
      </div>
    );
  }

  if (status === "already") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-muted/30 p-6">
        <div className="bg-background rounded-xl shadow-lg p-10 max-w-md text-center space-y-4">
          <div className="text-5xl">✅</div>
          <h1 className="text-2xl font-bold text-foreground">Pago ya confirmado</h1>
          <p className="text-muted-foreground">
            El pedido <strong>{orderNumber}</strong> ya fue marcado como pagado anteriormente.
          </p>
        </div>
      </div>
    );
  }

  if (status === "invalid") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-muted/30 p-6">
        <div className="bg-background rounded-xl shadow-lg p-10 max-w-md text-center space-y-4">
          <div className="text-5xl">❌</div>
          <h1 className="text-2xl font-bold text-destructive">Enlace inválido</h1>
          <p className="text-muted-foreground">
            Este enlace no es válido o el pedido no existe.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/30 p-6">
      <div className="bg-background rounded-xl shadow-lg p-10 max-w-md text-center space-y-4">
        <div className="text-5xl">❌</div>
        <h1 className="text-2xl font-bold text-destructive">Error</h1>
        <p className="text-muted-foreground">
          Hubo un problema al confirmar el pago. Inténtalo de nuevo.
        </p>
      </div>
    </div>
  );
};

export default ConfirmarPago;