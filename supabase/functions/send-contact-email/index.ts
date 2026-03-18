import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const FORMSPREE_ENDPOINT = "https://formspree.io/f/mlgwakaa";

interface ContactRequest {
  nombre: string;
  apellidos?: string;
  email: string;
  telefono?: string;
  mensaje: string;
  asunto?: string;
  origen?: "contacto" | "servicio";
}

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

async function sendToFormspree(payload: Record<string, string>) {
  const response = await fetch(FORMSPREE_ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify(payload),
  });

  const responseText = await response.text();

  if (!response.ok) {
    throw new Error(`Formspree ${response.status}: ${responseText || "empty response"}`);
  }
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const { nombre, apellidos, email, telefono, mensaje, asunto, origen }: ContactRequest = await req.json();

    if (!nombre || !email || !mensaje) {
      throw new Error("Missing required fields");
    }

    const payload = {
      _subject: asunto?.trim() || "Nueva solicitud web",
      nombre: nombre.trim(),
      apellidos: (apellidos || "").trim(),
      email: email.trim(),
      telefono: (telefono || "").trim(),
      mensaje,
      origen: origen || "contacto",
    };

    let lastError: Error | null = null;
    for (let attempt = 1; attempt <= 3; attempt++) {
      try {
        await sendToFormspree(payload);
        lastError = null;
        break;
      } catch (error) {
        lastError = error instanceof Error ? error : new Error("Unknown Formspree error");
        if (attempt < 3) {
          await sleep(200 * attempt);
        }
      }
    }

    if (lastError) {
      throw lastError;
    }

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : "Unknown error";
    console.error("Error sending contact email:", msg);
    return new Response(JSON.stringify({ error: msg }), {
      status: 500,
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });
  }
});
