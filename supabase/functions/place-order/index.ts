import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "npm:@supabase/supabase-js@2.57.2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const ALLOWED_PAYMENT = new Set(["transfer", "bizum", "card"]);

const str = (v: unknown, max = 255) =>
  typeof v === "string" ? v.trim().slice(0, max) : "";
const num = (v: unknown) => {
  const n = Number(v);
  return Number.isFinite(n) && n >= 0 ? n : 0;
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const body = await req.json().catch(() => ({}));
    const order = body?.order ?? {};
    const items = Array.isArray(body?.items) ? body.items : [];

    const paymentMethod = str(order.payment_method, 20);
    if (!ALLOWED_PAYMENT.has(paymentMethod)) {
      return new Response(JSON.stringify({ error: "Método de pago no válido" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const email = str(order.email).toLowerCase();
    if (!EMAIL_RE.test(email)) {
      return new Response(JSON.stringify({ error: "Email no válido" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const required = ["first_name", "last_name", "phone", "dni", "address", "city", "province", "postal_code"];
    for (const field of required) {
      if (!str(order[field])) {
        return new Response(JSON.stringify({ error: "Faltan datos de envío" }), {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
    }

    if (order.accept_privacy !== true) {
      return new Response(JSON.stringify({ error: "Debes aceptar la política de privacidad" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    if (items.length === 0 || items.length > 50) {
      return new Response(JSON.stringify({ error: "Pedido sin productos válidos" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const supabaseAdmin = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
    );

    const sessionToken = crypto.randomUUID();

    // Server controls every sensitive column. Client-supplied status, tokens,
    // stripe/shipping fields are ignored entirely.
    const { data: inserted, error: orderError } = await supabaseAdmin
      .from("orders")
      .insert({
        order_number: `TMP-${Date.now()}`,
        session_token: sessionToken,
        status: paymentMethod === "card" ? "pending_stripe" : "pending_payment",
        payment_method: paymentMethod,
        first_name: str(order.first_name, 100),
        last_name: str(order.last_name, 100),
        email,
        phone: str(order.phone, 40),
        dni: str(order.dni, 40),
        address: str(order.address, 300),
        city: str(order.city, 120),
        province: str(order.province, 120),
        postal_code: str(order.postal_code, 20),
        subtotal: num(order.subtotal),
        shipping_cost: num(order.shipping_cost),
        total: num(order.total),
        total_weight: num(order.total_weight),
        notes: str(order.notes, 2000) || null,
        accept_privacy: true,
      })
      .select("id, order_number")
      .single();

    if (orderError || !inserted) throw orderError ?? new Error("insert failed");

    const rows = items.map((it: Record<string, unknown>) => ({
      order_id: inserted.id,
      product_name: str(it.product_name, 200),
      weight: num(it.weight),
      price: num(it.price),
      quantity: Math.max(1, Math.min(99, Math.floor(Number(it.quantity) || 1))),
      knife_supplement: it.knife_supplement === true,
      knife_supplement_price: num(it.knife_supplement_price),
    }));

    const { error: itemsError } = await supabaseAdmin.from("order_items").insert(rows);
    if (itemsError) {
      await supabaseAdmin.from("orders").delete().eq("id", inserted.id);
      throw itemsError;
    }

    return new Response(
      JSON.stringify({
        orderId: inserted.id,
        orderNumber: inserted.order_number,
        sessionToken,
      }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("place-order error:", error instanceof Error ? error.message : error);
    return new Response(JSON.stringify({ error: "No se pudo registrar el pedido" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
