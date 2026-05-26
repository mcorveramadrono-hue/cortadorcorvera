import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "npm:@supabase/supabase-js@2.57.2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });
  try {
    const { code, email, orderId } = await req.json();
    if (!code || !email) {
      return new Response(JSON.stringify({ ok: false, error: "Faltan datos" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
    const normalized = String(code).trim().toUpperCase();
    const normalizedEmail = String(email).trim().toLowerCase();

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
    );

    const { data: promo } = await supabase
      .from("shared_promo_codes")
      .select("code, max_uses, used_count, expires_at")
      .eq("code", normalized)
      .maybeSingle();

    if (!promo) {
      return new Response(JSON.stringify({ ok: false, error: "Cupón no encontrado" }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
    if (new Date(promo.expires_at) < new Date()) {
      return new Response(JSON.stringify({ ok: false, error: "Cupón caducado" }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
    if (promo.used_count >= promo.max_uses) {
      return new Response(JSON.stringify({ ok: false, error: "Cupón agotado" }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Insert redemption (unique constraint on code+email blocks reuse)
    const { error: insertError } = await supabase
      .from("shared_promo_redemptions")
      .insert({ code: normalized, email: normalizedEmail, order_id: orderId ?? null });

    if (insertError) {
      if ((insertError as any).code === "23505") {
        return new Response(JSON.stringify({ ok: false, error: "Ya has usado este cupón anteriormente" }), {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      throw insertError;
    }

    // Increment used_count
    await supabase
      .from("shared_promo_codes")
      .update({ used_count: promo.used_count + 1 })
      .eq("code", normalized);

    return new Response(JSON.stringify({ ok: true }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    return new Response(JSON.stringify({ ok: false, error: (e as Error).message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
