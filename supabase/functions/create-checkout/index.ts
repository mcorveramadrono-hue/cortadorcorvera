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
    const { orderId } = await req.json();

    if (!orderId || typeof orderId !== "string") {
      return new Response(
        JSON.stringify({ error: "orderId requerido" }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 400 }
      );
    }

    const supabaseAdmin = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
    );

    // Fetch order from DB — never trust client-supplied prices
    const { data: order, error: orderError } = await supabaseAdmin
      .from("orders")
      .select("*")
      .eq("id", orderId)
      .single();

    if (orderError || !order) {
      return new Response(
        JSON.stringify({ error: "Pedido no encontrado" }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 404 }
      );
    }

    // Only allow checkout for orders awaiting Stripe payment
    if (order.status !== "pending_stripe" && order.status !== "pending_payment") {
      return new Response(
        JSON.stringify({ error: "El pedido no está disponible para pago" }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 400 }
      );
    }

    const customerEmail = order.email;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!customerEmail || !emailRegex.test(customerEmail)) {
      return new Response(
        JSON.stringify({ error: "Email del pedido inválido" }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 400 }
      );
    }

    const { data: orderItems, error: itemsError } = await supabaseAdmin
      .from("order_items")
      .select("*")
      .eq("order_id", orderId);

    if (itemsError || !orderItems || orderItems.length === 0) {
      return new Response(
        JSON.stringify({ error: "El pedido no tiene productos" }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 400 }
      );
    }

    const stripe = new Stripe(Deno.env.get("STRIPE_SECRET_KEY") || "", {
      apiVersion: "2025-08-27.basil",
    });

    const lineItems: Stripe.Checkout.SessionCreateParams.LineItem[] = [];

    for (const item of orderItems) {
      const price = Number(item.price);
      const quantity = Number(item.quantity) || 1;
      const weight = Number(item.weight);

      if (!Number.isFinite(price) || price <= 0) continue;

      lineItems.push({
        price_data: {
          currency: "eur",
          product_data: {
            name: `${item.product_name} (${weight.toFixed(1)} kg)`,
          },
          unit_amount: Math.round(price * 100),
        },
        quantity,
      });

      if (item.knife_supplement && Number(item.knife_supplement_price) > 0) {
        lineItems.push({
          price_data: {
            currency: "eur",
            product_data: {
              name: `Corte a cuchillo - ${item.product_name}`,
            },
            unit_amount: Math.round(Number(item.knife_supplement_price) * 100),
          },
          quantity,
        });
      }
    }

    const shippingCost = Number(order.shipping_cost) || 0;
    if (shippingCost > 0) {
      lineItems.push({
        price_data: {
          currency: "eur",
          product_data: { name: "Gastos de envío" },
          unit_amount: Math.round(shippingCost * 100),
        },
        quantity: 1,
      });
    }

    if (lineItems.length === 0) {
      return new Response(
        JSON.stringify({ error: "No hay productos válidos en el pedido" }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 400 }
      );
    }

    const origin = req.headers.get("origin") || "https://cortadorcorvera.lovable.app";

    const session = await stripe.checkout.sessions.create({
      customer_email: customerEmail,
      line_items: lineItems,
      mode: "payment",
      payment_method_types: ["card", "link"],
      ui_mode: "embedded",
      return_url: `${origin}/pedido-confirmado/${orderId}?payment=success&session_id={CHECKOUT_SESSION_ID}`,
      metadata: {
        order_id: orderId,
      },
    });

    await supabaseAdmin
      .from("orders")
      .update({ stripe_session_id: session.id })
      .eq("id", orderId);

    return new Response(JSON.stringify({ clientSecret: session.client_secret }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    console.error("Checkout error:", message);
    return new Response(JSON.stringify({ error: message }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});
