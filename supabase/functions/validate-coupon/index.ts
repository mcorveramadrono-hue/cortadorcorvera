import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "npm:@supabase/supabase-js@2.57.2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });
  try {
    const { code } = await req.json();
    if (!code) {
      return new Response(JSON.stringify({ valid: false, error: "Falta código" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
    const normalized = String(code).trim().toUpperCase();
    const supabase = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
    );

    // 1) Check shared promo codes (e.g. ANGEL5)
    const { data: shared } = await supabase
      .from("shared_promo_codes")
      .select("amount, min_order_total, brand_filter, max_uses, used_count, expires_at")
      .eq("code", normalized)
      .maybeSingle();

    if (shared) {
      if (new Date(shared.expires_at) < new Date()) {
        return new Response(JSON.stringify({ valid: false, error: "Cupón caducado" }), {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (shared.used_count >= shared.max_uses) {
        return new Response(JSON.stringify({ valid: false, error: "Cupón agotado" }), {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      return new Response(
        JSON.stringify({
          valid: true,
          shared: true,
          amount: Number(shared.amount),
          minOrderTotal: Number(shared.min_order_total),
          brandFilter: shared.brand_filter,
        }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // 2) Personal discount coupons
    const { data, error } = await supabase
      .from("discount_coupons")
      .select("amount, min_order_total, used, expires_at")
      .eq("code", normalized)
      .maybeSingle();
    if (error || !data) {
      return new Response(JSON.stringify({ valid: false, error: "Código no encontrado" }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
    if (data.used) {
      return new Response(JSON.stringify({ valid: false, error: "Cupón ya utilizado" }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
    if (new Date(data.expires_at) < new Date()) {
      return new Response(JSON.stringify({ valid: false, error: "Cupón caducado" }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
    return new Response(
      JSON.stringify({
        valid: true,
        amount: Number(data.amount),
        minOrderTotal: Number(data.min_order_total),
      }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (e) {
    return new Response(JSON.stringify({ valid: false, error: (e as Error).message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
