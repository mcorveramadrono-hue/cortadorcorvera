import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "npm:@supabase/supabase-js@2.57.2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
};

async function enqueueAppEmail(
  supabaseUrl: string,
  serviceKey: string,
  payload: {
    templateName: string;
    recipientEmail: string;
    idempotencyKey: string;
    templateData: Record<string, unknown>;
  },
) {
  const response = await fetch(`${supabaseUrl}/functions/v1/send-transactional-email`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${serviceKey}`,
      apikey: serviceKey,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  const responseText = await response.text();
  if (!response.ok) {
    throw new Error(`Failed to enqueue '${payload.templateName}': HTTP ${response.status} ${responseText}`);
  }
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL") ?? "";
    const serviceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "";
    const supabase = createClient(supabaseUrl, serviceKey);

    // GET → fetch order info (for the page to show)
    if (req.method === "GET") {
      const url = new URL(req.url);
      const orderId = url.searchParams.get("orderId");
      const token = url.searchParams.get("token");

      if (!orderId || !token) {
        return new Response(JSON.stringify({ error: "Missing parameters" }), {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }

      const { data: order, error } = await supabase
        .from("orders")
        .select("id, order_number, first_name, last_name, email, status, shipping_carrier, tracking_number, tracking_url, shipped_at")
        .eq("id", orderId)
        .eq("shipping_token", token)
        .maybeSingle();

      if (error || !order) {
        return new Response(JSON.stringify({ error: "invalid" }), {
          status: 404,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }

      return new Response(JSON.stringify({ order }), {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // POST → mark as shipped
    const { orderId, token, shippingCarrier, trackingNumber, trackingUrl } = await req.json();

    if (!orderId || !token || !shippingCarrier || !trackingNumber) {
      return new Response(JSON.stringify({ error: "Faltan campos obligatorios" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    if (String(shippingCarrier).length > 100 || String(trackingNumber).length > 200 || (trackingUrl && String(trackingUrl).length > 500)) {
      return new Response(JSON.stringify({ error: "Datos demasiado largos" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const { data: order, error: fetchErr } = await supabase
      .from("orders")
      .select("*")
      .eq("id", orderId)
      .eq("shipping_token", token)
      .maybeSingle();

    if (fetchErr || !order) {
      return new Response(JSON.stringify({ error: "Pedido no encontrado o token inválido" }), {
        status: 404,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    if (order.shipped_at) {
      return new Response(JSON.stringify({ error: "Este pedido ya fue marcado como enviado", alreadyShipped: true }), {
        status: 409,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const shippedAt = new Date().toISOString();
    const { error: updateErr } = await supabase
      .from("orders")
      .update({
        shipping_carrier: shippingCarrier,
        tracking_number: trackingNumber,
        tracking_url: trackingUrl || null,
        shipped_at: shippedAt,
        status: "shipped",
      })
      .eq("id", orderId)
      .eq("shipping_token", token);

    if (updateErr) {
      console.error("mark-as-shipped update failed:", updateErr.message);
      throw new Error("No se pudo actualizar el pedido");
    }

    // Send email to customer
    await enqueueAppEmail(supabaseUrl, serviceKey, {
      templateName: "order-shipped",
      recipientEmail: order.email,
      idempotencyKey: `order-shipped-${orderId}`,
      templateData: {
        firstName: order.first_name,
        orderNumber: order.order_number,
        shippingCarrier,
        trackingNumber,
        trackingUrl: trackingUrl || "",
      },
    });

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    console.error("mark-as-shipped error:", message);
    return new Response(JSON.stringify({ error: "No se pudo procesar la solicitud. Inténtalo de nuevo." }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
