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
      .select("code, expires_at")
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

    // Atomically claim a slot for this code. Prevents race conditions where
    // concurrent callers could exceed max_uses by reading and updating
    // used_count separately.
    const { data: claimed, error: claimError } = await supabase.rpc(
      "claim_shared_promo_code",
      { _code: normalized }
    );
    if (claimError) throw claimError;
    if (!claimed) {
      return new Response(JSON.stringify({ ok: false, error: "Cupón agotado" }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Record the redemption. Unique constraint on (code, email) blocks
    // the same user from redeeming twice. If insert fails, release the
    // slot we just claimed so it doesn't leak.
    const { error: insertError } = await supabase
      .from("shared_promo_redemptions")
      .insert({ code: normalized, email: normalizedEmail, order_id: orderId ?? null });

    if (insertError) {
      // Release the slot we optimistically claimed.
      await supabase
        .from("shared_promo_codes")
        .update({ used_count: (await supabase
          .from("shared_promo_codes")
          .select("used_count")
          .eq("code", normalized)
          .maybeSingle()).data?.used_count ?? 1 })
        .eq("code", normalized);
      if ((insertError as any).code === "23505") {
        return new Response(JSON.stringify({ ok: false, error: "Ya has usado este cupón anteriormente" }), {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      throw insertError;
    }

    return new Response(JSON.stringify({ ok: true }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("redeem-shared-promo error:", e);
    return new Response(JSON.stringify({ ok: false, error: "No se pudo procesar la solicitud" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
