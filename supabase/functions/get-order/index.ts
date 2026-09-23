import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "npm:@supabase/supabase-js@2.57.2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { orderId, sessionToken } = await req.json().catch(() => ({}));

    if (
      typeof orderId !== "string" || !UUID_RE.test(orderId) ||
      typeof sessionToken !== "string" || !UUID_RE.test(sessionToken)
    ) {
      return new Response(JSON.stringify({ error: "Parámetros inválidos" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const supabaseAdmin = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
    );

    const { data: order } = await supabaseAdmin
      .from("orders")
      .select("*")
      .eq("id", orderId)
      .maybeSingle();

    if (!order || !order.session_token || order.session_token !== sessionToken) {
      return new Response(JSON.stringify({ error: "No autorizado" }), {
        status: 403,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const { data: items } = await supabaseAdmin
      .from("order_items")
      .select("product_name, weight, price, quantity, knife_supplement, knife_supplement_price")
      .eq("order_id", orderId);

    // Never return internal tokens or payment-provider identifiers to the client.
    const {
      session_token: _s,
      confirmation_token: _c,
      shipping_token: _sh,
      stripe_session_id: _st,
      ...safeOrder
    } = order as Record<string, unknown>;

    return new Response(JSON.stringify({ order: safeOrder, items: items ?? [] }), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("get-order error:", error instanceof Error ? error.message : error);
    return new Response(JSON.stringify({ error: "No se pudo cargar el pedido" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
