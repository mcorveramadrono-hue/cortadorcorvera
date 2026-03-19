import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const FORMSPREE_ENDPOINT = "https://formspree.io/f/mlgwakaa";
const RESEND_ENDPOINT = "https://api.resend.com/emails";
const OWNER_EMAIL = "mcorveramadrono@gmail.com";
const FROM_EMAIL = "Corvera Web <onboarding@resend.dev>";

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

async function sendToFormspreeWithRetry(payload: Record<string, string>) {
  let lastError: Error | null = null;

  for (let attempt = 1; attempt <= 3; attempt++) {
    try {
      await sendToFormspree(payload);
      return;
    } catch (error) {
      lastError = error instanceof Error ? error : new Error("Unknown Formspree error");
      if (attempt < 3) {
        await sleep(300 * attempt);
      }
    }
  }

  throw lastError ?? new Error("Unknown Formspree error");
}

async function sendWithResend(params: {
  to: string;
  subject: string;
  text: string;
  html: string;
}) {
  const apiKey = Deno.env.get("RESEND_API_KEY");

  if (!apiKey) {
    throw new Error("RESEND_API_KEY not configured");
  }

  const response = await fetch(RESEND_ENDPOINT, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: FROM_EMAIL,
      to: [params.to],
      subject: params.subject,
      text: params.text,
      html: params.html,
    }),
  });

  const responseText = await response.text();

  if (!response.ok) {
    throw new Error(`Resend ${response.status}: ${responseText || "empty response"}`);
  }
}

function buildOwnerText(data: ContactRequest) {
  return [
    `Origen: ${data.origen || "contacto"}`,
    `Nombre: ${data.nombre}`,
    `Apellidos: ${data.apellidos || ""}`,
    `Email: ${data.email}`,
    `Teléfono: ${data.telefono || ""}`,
    "",
    "Mensaje:",
    data.mensaje,
  ].join("\n");
}

function buildOwnerHtml(data: ContactRequest) {
  return `
    <h2>Nueva solicitud web</h2>
    <p><strong>Origen:</strong> ${data.origen || "contacto"}</p>
    <p><strong>Nombre:</strong> ${data.nombre}</p>
    <p><strong>Apellidos:</strong> ${data.apellidos || ""}</p>
    <p><strong>Email:</strong> ${data.email}</p>
    <p><strong>Teléfono:</strong> ${data.telefono || ""}</p>
    <p><strong>Mensaje:</strong></p>
    <p>${data.mensaje.replace(/\n/g, "<br />")}</p>
  `.trim();
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const body: ContactRequest = await req.json();

    const normalized: ContactRequest = {
      nombre: body.nombre?.trim(),
      apellidos: body.apellidos?.trim() || "",
      email: body.email?.trim(),
      telefono: body.telefono?.trim() || "",
      mensaje: body.mensaje?.trim(),
      asunto: body.asunto?.trim() || "Nueva solicitud web",
      origen: body.origen || "contacto",
    };

    if (!normalized.nombre || !normalized.email || !normalized.mensaje) {
      return new Response(JSON.stringify({ error: "Missing required fields" }), {
        status: 400,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      });
    }

    const formspreePayload = {
      _subject: normalized.asunto,
      nombre: normalized.nombre,
      apellidos: normalized.apellidos || "",
      email: normalized.email,
      telefono: normalized.telefono || "",
      mensaje: normalized.mensaje,
      origen: normalized.origen || "contacto",
    };

    let provider: "formspree" | "resend_fallback" = "formspree";

    try {
      await sendToFormspreeWithRetry(formspreePayload);
    } catch (formspreeError) {
      console.error("Formspree error, using fallback:", formspreeError);
      await sendWithResend({
        to: OWNER_EMAIL,
        subject: normalized.asunto || "Nueva solicitud web",
        text: buildOwnerText(normalized),
        html: buildOwnerHtml(normalized),
      });
      provider = "resend_fallback";
    }

    return new Response(JSON.stringify({ success: true, provider }), {
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