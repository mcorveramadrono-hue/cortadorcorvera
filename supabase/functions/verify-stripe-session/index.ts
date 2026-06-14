import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@18.5.0";
import { createClient } from "npm:@supabase/supabase-js@2.57.2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { orderId, sessionToken } = await req.json();

    if (!orderId || typeof orderId !== "string" || !sessionToken || typeof sessionToken !== "string") {
      return new Response(JSON.stringify({ error: "Parámetros inválidos" }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 400,
      });
    }

    const supabaseAdmin = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
    );

    const { data: order, error: orderError } = await supabaseAdmin
      .from("orders")
      .select("*")
      .eq("id", orderId)
      .single();

    if (orderError || !order) {
      return new Response(JSON.stringify({ error: "Pedido no encontrado" }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 404,
      });
    }

    if (!order.session_token || order.session_token !== sessionToken) {
      return new Response(JSON.stringify({ error: "No autorizado" }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 403,
      });
    }

    // Already verified previously — idempotent success
    if (order.status === "paid" || order.payment_status === "paid") {
      return new Response(JSON.stringify({ paid: true, alreadyConfirmed: true }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      });
    }

    if (!order.stripe_session_id) {
      return new Response(JSON.stringify({ paid: false, error: "Pedido sin sesión de pago" }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 400,
      });
    }

    const stripe = new Stripe(Deno.env.get("STRIPE_SECRET_KEY") || "", {
      apiVersion: "2025-08-27.basil",
    });

    const session = await stripe.checkout.sessions.retrieve(order.stripe_session_id);

    // Verify session belongs to this order
    if (session.metadata?.order_id !== orderId) {
      console.error("Session/order mismatch", { orderId, sessionMeta: session.metadata });
      return new Response(JSON.stringify({ paid: false, error: "Sesión no corresponde al pedido" }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 403,
      });
    }

    const isPaid = session.payment_status === "paid";

    if (isPaid) {
      await supabaseAdmin
        .from("orders")
        .update({
          status: "paid",
          payment_status: "paid",
          paid_at: new Date().toISOString(),
        })
        .eq("id", orderId);
    }

    return new Response(JSON.stringify({ paid: isPaid, payment_status: session.payment_status }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    console.error("verify-stripe-session error:", message);
    return new Response(JSON.stringify({ error: "No se pudo verificar el pago" }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});
