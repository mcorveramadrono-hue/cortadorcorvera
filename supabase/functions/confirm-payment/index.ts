import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "npm:@supabase/supabase-js@2.57.2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const OWNER_EMAIL = "mcorveramadrono@gmail.com";

async function enqueueAppEmail(
  supabase: ReturnType<typeof createClient>,
  payload: {
    templateName: string;
    recipientEmail: string;
    idempotencyKey: string;
    templateData: Record<string, unknown>;
  },
) {
  const { error } = await supabase.functions.invoke("send-transactional-email", {
    body: payload,
  });

  if (error) {
    throw new Error(`Failed to enqueue '${payload.templateName}': ${error.message}`);
  }
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const url = new URL(req.url);
    const orderId = url.searchParams.get("orderId");
    const token = url.searchParams.get("token");

    if (!orderId || !token) {
      return new Response(JSON.stringify({ error: "orderId and token are required" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
    );

    // Verify order exists and token matches
    const { data: order, error: orderError } = await supabase
      .from("orders")
      .select("*")
      .eq("id", orderId)
      .eq("confirmation_token", token)
      .single();

    if (orderError || !order) {
      return new Response(
        `<!DOCTYPE html><html><head><meta charset="utf-8"><title>Error</title></head>
        <body style="font-family:Arial;text-align:center;padding:60px 20px;">
        <h1 style="color:#dc2626;">❌ Enlace inválido</h1>
        <p>Este enlace no es válido o el pedido no existe.</p></body></html>`,
        { status: 404, headers: { ...corsHeaders, "Content-Type": "text/html; charset=utf-8" } },
      );
    }

    if (order.status === "paid" || order.status === "confirmed") {
      return new Response(
        `<!DOCTYPE html><html><head><meta charset="utf-8"><title>Ya confirmado</title></head>
        <body style="font-family:Arial;text-align:center;padding:60px 20px;">
        <h1 style="color:#16a34a;">✅ Pago ya confirmado</h1>
        <p>El pedido <strong>${order.order_number}</strong> ya fue marcado como pagado.</p></body></html>`,
        { status: 200, headers: { ...corsHeaders, "Content-Type": "text/html; charset=utf-8" } },
      );
    }

    // Update order status to paid
    const { error: updateError } = await supabase
      .from("orders")
      .update({ status: "paid" })
      .eq("id", orderId)
      .eq("confirmation_token", token);

    if (updateError) {
      throw new Error("Failed to update order status: " + updateError.message);
    }

    // Fetch order items for the confirmation email
    const { data: items } = await supabase
      .from("order_items")
      .select("*")
      .eq("order_id", orderId);

    const emailItems = (items || []).map((item: any) => ({
      name: item.product_name,
      weight: Number(item.weight),
      quantity: item.quantity,
      price: Number(item.price),
      withKnife: item.knife_supplement,
      knifePrice: Number(item.knife_supplement_price),
    }));

    await enqueueAppEmail(supabase, {
      templateName: "payment-confirmed",
      recipientEmail: order.email,
      idempotencyKey: `payment-confirmed-${orderId}`,
      templateData: {
        firstName: order.first_name,
        orderNumber: order.order_number,
        items: emailItems,
        subtotal: Number(order.subtotal),
        shippingCost: Number(order.shipping_cost),
        total: Number(order.total),
      },
    });

    await enqueueAppEmail(supabase, {
      templateName: "owner-payment-confirmed",
      recipientEmail: OWNER_EMAIL,
      idempotencyKey: `owner-payment-confirmed-${orderId}`,
      templateData: {
        orderNumber: order.order_number,
        customerFirstName: order.first_name,
        customerLastName: order.last_name,
        customerEmail: order.email,
        paymentMethod: order.payment_method,
        items: emailItems,
        subtotal: Number(order.subtotal),
        shippingCost: Number(order.shipping_cost),
        total: Number(order.total),
      },
    });

    return new Response(
      `<!DOCTYPE html><html><head><meta charset="utf-8"><title>Pago confirmado</title></head>
      <body style="font-family:Arial;text-align:center;padding:60px 20px;">
      <h1 style="color:#16a34a;">✅ Pago confirmado</h1>
      <p>El pedido <strong>${order.order_number}</strong> de <strong>${order.first_name} ${order.last_name}</strong> ha sido marcado como pagado.</p>
      <p style="color:#666;margin-top:20px;">Se ha enviado un email de confirmación al cliente (${order.email}) y una notificación interna al administrador.</p></body></html>`,
      { status: 200, headers: { ...corsHeaders, "Content-Type": "text/html; charset=utf-8" } },
    );
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    console.error("Confirm payment error:", message);
    return new Response(
      `<!DOCTYPE html><html><head><meta charset="utf-8"><title>Error</title></head>
      <body style="font-family:Arial;text-align:center;padding:60px 20px;">
      <h1 style="color:#dc2626;">❌ Error</h1>
      <p>Hubo un problema al confirmar el pago. Inténtalo de nuevo.</p></body></html>`,
      { status: 500, headers: { ...corsHeaders, "Content-Type": "text/html; charset=utf-8" } },
    );
  }
});
