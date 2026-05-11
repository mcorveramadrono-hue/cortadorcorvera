import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "npm:@supabase/supabase-js@2.57.2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const AMOUNT = 5;
const MIN_ORDER_TOTAL = 0;

async function enqueueAppEmail(
  supabaseUrl: string,
  authKey: string,
  serviceKey: string,
  payload: { templateName: string; recipientEmail: string; idempotencyKey: string; templateData: Record<string, unknown> },
) {
  const response = await fetch(`${supabaseUrl}/functions/v1/send-transactional-email`, {
    method: "POST",
    headers: { Authorization: `Bearer ${authKey}`, apikey: serviceKey, "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!response.ok) {
    const t = await response.text();
    throw new Error(`Failed to enqueue welcome coupon email: ${response.status} ${t}`);
  }
}

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });

  try {
    const body = await req.json().catch(() => ({}));
    const rawEmail = typeof body?.email === "string" ? body.email.trim().toLowerCase() : "";
    if (!rawEmail || rawEmail.length > 255 || !EMAIL_RE.test(rawEmail)) {
      return new Response(JSON.stringify({ error: "Email no válido" }), {
        status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const serviceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const anonKey = Deno.env.get("SUPABASE_ANON_KEY")!;
    const supabase = createClient(supabaseUrl, serviceKey);

    // Comprueba si ya emitimos un cupón de bienvenida válido para este email
    const { data: existing } = await supabase
      .from("discount_coupons")
      .select("id")
      .eq("email", rawEmail)
      .is("source_order_id", null)
      .gt("expires_at", new Date().toISOString())
      .maybeSingle();

    if (existing) {
      return new Response(JSON.stringify({ ok: true, alreadyIssued: true }), {
        status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const code = `BIEN-${crypto.randomUUID().slice(0, 8).toUpperCase()}`;
    const { error: insertError } = await supabase.from("discount_coupons").insert({
      code, email: rawEmail, amount: AMOUNT, min_order_total: MIN_ORDER_TOTAL,
    });
    if (insertError) throw insertError;

    await enqueueAppEmail(supabaseUrl, anonKey, serviceKey, {
      templateName: "coupon-issued",
      recipientEmail: rawEmail,
      idempotencyKey: `welcome-coupon-${code}`,
      templateData: { code, amount: AMOUNT, minOrderTotal: MIN_ORDER_TOTAL, variant: "welcome" },
    });

    // Aviso interno al propietario con el email del cliente
    try {
      await enqueueAppEmail(supabaseUrl, anonKey, serviceKey, {
        templateName: "owner-welcome-coupon",
        recipientEmail: "corveraibericos@gmail.com",
        idempotencyKey: `owner-welcome-coupon-${code}`,
        templateData: { customerEmail: rawEmail, code, amount: AMOUNT },
      });
    } catch (notifyErr) {
      console.error("owner-welcome-coupon notify failed:", notifyErr);
    }

    return new Response(JSON.stringify({ ok: true }), {
      status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("request-welcome-coupon error:", err);
    return new Response(JSON.stringify({ error: "No se pudo generar el cupón. Inténtalo más tarde." }), {
      status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
