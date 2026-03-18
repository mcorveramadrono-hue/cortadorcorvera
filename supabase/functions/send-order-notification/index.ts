import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "npm:@supabase/supabase-js@2.57.2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const FORMSPREE_ENDPOINT = "https://formspree.io/f/mlgwakaa";
const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

async function sendToFormspree(payload: Record<string, string>) {
  const response = await fetch(FORMSPREE_ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify(payload),
  });

  const responseText = await response.text();

  if (!response.ok) {
    throw new Error(`Formspree ${response.status}: ${responseText || "empty response"}`);
  }
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const { orderId } = await req.json();

    if (!orderId) {
      throw new Error("orderId is required");
    }

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
    );

    // Fetch order
    const { data: order, error: orderError } = await supabase
      .from("orders")
      .select("*")
      .eq("id", orderId)
      .single();

    if (orderError || !order) throw new Error("Order not found");

    // Fetch order items
    const { data: items, error: itemsError } = await supabase
      .from("order_items")
      .select("*")
      .eq("order_id", orderId);

    if (itemsError) throw itemsError;

    const itemsList = (items || [])
      .map((i: any) => `- ${i.product_name} (${i.weight}kg) x${i.quantity} = ${Number(i.price * i.quantity).toFixed(2)}€${i.knife_supplement ? " + cuchillo " + Number(i.knife_supplement_price).toFixed(2) + "€" : ""}`)
      .join("\n");

    const message = `
NUEVO PEDIDO - ${order.order_number}
================================
Método de pago: ${order.payment_method === "transfer" ? "Transferencia bancaria" : order.payment_method === "bizum" ? "Bizum" : order.payment_method}
Estado: ${order.status}

CLIENTE:
Nombre: ${order.first_name} ${order.last_name}
DNI: ${order.dni}
Email: ${order.email}
Teléfono: ${order.phone}

ENVÍO:
${order.address}
${order.postal_code} ${order.city}, ${order.province}

PRODUCTOS:
${itemsList}

TOTALES:
Subtotal: ${Number(order.subtotal).toFixed(2)}€
Envío: ${Number(order.shipping_cost) === 0 ? "Gratis" : Number(order.shipping_cost).toFixed(2) + "€"}
TOTAL: ${Number(order.total).toFixed(2)}€
Peso total: ${Number(order.total_weight).toFixed(1)}kg

Notas: ${order.notes || "Sin notas"}
    `.trim();

    const payload = {
      _subject: `Nuevo Pedido ${order.order_number} - ${order.first_name} ${order.last_name}`,
      nombre: `${order.first_name} ${order.last_name}`,
      email: order.email,
      telefono: order.phone,
      mensaje: message,
      origen: "pedido",
    };

    let lastError: Error | null = null;

    for (let attempt = 1; attempt <= 3; attempt++) {
      try {
        await sendToFormspree(payload);
        lastError = null;
        break;
      } catch (error) {
        lastError = error instanceof Error ? error : new Error("Unknown Formspree error");
        if (attempt < 3) {
          await sleep(200 * attempt);
        }
      }
    }

    if (lastError) {
      throw lastError;
    }

    return new Response(JSON.stringify({ success: true }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    console.error("Notification error:", message);
    return new Response(JSON.stringify({ error: message }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});
