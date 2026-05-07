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
    if (!code) return new Response(JSON.stringify({ valid: false, error: "Falta código" }), { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } });
    const supabase = createClient(Deno.env.get("SUPABASE_URL") ?? "", Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "");
    const { data, error } = await supabase
      .from("discount_coupons")
      .select("amount, min_order_total, used, expires_at")
      .eq("code", String(code).trim().toUpperCase())
      .maybeSingle();
    if (error || !data) return new Response(JSON.stringify({ valid: false, error: "Código no encontrado" }), { headers: { ...corsHeaders, "Content-Type": "application/json" } });
    if (data.used) return new Response(JSON.stringify({ valid: false, error: "Cupón ya utilizado" }), { headers: { ...corsHeaders, "Content-Type": "application/json" } });
    if (new Date(data.expires_at) < new Date()) return new Response(JSON.stringify({ valid: false, error: "Cupón caducado" }), { headers: { ...corsHeaders, "Content-Type": "application/json" } });
    return new Response(JSON.stringify({ valid: true, amount: Number(data.amount), minOrderTotal: Number(data.min_order_total) }), { headers: { ...corsHeaders, "Content-Type": "application/json" } });
  } catch (e) {
    return new Response(JSON.stringify({ valid: false, error: (e as Error).message }), { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } });
  }
});
