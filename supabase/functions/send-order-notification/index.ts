import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "npm:@supabase/supabase-js@2.57.2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const OWNER_EMAIL = "corveraibericos@gmail.com";

type OrderItem = {
  product_name: string;
  weight: number;
  price: number;
  quantity: number;
  knife_supplement: boolean;
  knife_supplement_price: number;
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
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const { orderId, sessionToken } = await req.json();

    if (!orderId || !sessionToken) {
      return new Response(JSON.stringify({ error: "orderId and sessionToken are required" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
    );

    // Internal calls to send-transactional-email require service_role auth.

    const { data: order, error: orderError } = await supabase
      .from("orders")
      .select("*")
      .eq("id", orderId)
      .single();

    if (orderError || !order) {
      return new Response(JSON.stringify({ error: "Order not found" }), {
        status: 404,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Verify session token matches the order — prevents unauthenticated callers
    // from triggering payment confirmations or spamming emails.
    if (order.session_token !== sessionToken) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 403,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const { data: items, error: itemsError } = await supabase
      .from("order_items")
      .select("*")
      .eq("order_id", orderId);

    if (itemsError) {
      throw itemsError;
    }

    const safeItems = (items || []) as OrderItem[];
    const isCard = order.payment_method === "card";

    let confirmationToken: string | null = order.confirmation_token;
    if (!isCard && !confirmationToken) {
      const generatedToken = crypto.randomUUID();
      const { error: tokenError } = await supabase
        .from("orders")
        .update({ confirmation_token: generatedToken })
        .eq("id", order.id);

      if (!tokenError) {
        confirmationToken = generatedToken;
      }
    }

    // Generate shipping token + mark card orders as paid (Stripe redirect)
    let shippingToken: string | null = order.shipping_token;
    const updates: Record<string, unknown> = {};
    if (!shippingToken) {
      shippingToken = crypto.randomUUID();
      updates.shipping_token = shippingToken;
    }
    if (isCard && order.status !== "paid" && order.status !== "shipped") {
      updates.status = "paid";
    }
    if (Object.keys(updates).length > 0) {
      await supabase.from("orders").update(updates).eq("id", order.id);
    }

    const supabaseUrl = Deno.env.get("SUPABASE_URL") ?? "";
    const confirmPaymentUrl = !isCard && confirmationToken
      ? `${supabaseUrl}/functions/v1/confirm-payment?orderId=${order.id}&token=${confirmationToken}`
      : null;

    const SITE_URL = "https://cortadorcorvera.lovable.app";
    const shippingUrl = `${SITE_URL}/marcar-envio/${order.id}?token=${shippingToken}`;

    const emailItems = safeItems.map((item) => ({
      name: item.product_name,
      weight: Number(item.weight),
      quantity: Number(item.quantity),
      price: Number(item.price),
      withKnife: Boolean(item.knife_supplement),
      knifePrice: Number(item.knife_supplement_price),
    }));

    await enqueueAppEmail(supabaseUrl, anonKey, {
      templateName: "owner-new-order",
      recipientEmail: OWNER_EMAIL,
      idempotencyKey: `owner-new-order-${order.id}`,
      templateData: {
        orderNumber: order.order_number,
        orderStatus: order.status,
        paymentMethod: order.payment_method,
        customerFirstName: order.first_name,
        customerLastName: order.last_name,
        customerEmail: order.email,
        customerPhone: order.phone,
        customerDni: order.dni,
        address: order.address,
        postalCode: order.postal_code,
        city: order.city,
        province: order.province,
        items: emailItems,
        subtotal: Number(order.subtotal),
        shippingCost: Number(order.shipping_cost),
        total: Number(order.total),
        totalWeight: Number(order.total_weight),
        notes: order.notes || "",
        confirmPaymentUrl,
      },
    });

    await enqueueAppEmail(supabaseUrl, anonKey, {
      templateName: "order-confirmation",
      recipientEmail: order.email,
      idempotencyKey: `customer-order-confirmation-${order.id}`,
      templateData: {
        firstName: order.first_name,
        orderNumber: order.order_number,
        items: emailItems,
        subtotal: Number(order.subtotal),
        shippingCost: Number(order.shipping_cost),
        total: Number(order.total),
        paymentMethod: order.payment_method,
      },
    });

    // For card payments, payment is already confirmed (Stripe). Send the
    // "ready to ship" email to the owner immediately.
    if (isCard) {
      await enqueueAppEmail(supabaseUrl, anonKey, {
        templateName: "owner-shipping-link",
        recipientEmail: OWNER_EMAIL,
        idempotencyKey: `owner-shipping-link-${order.id}`,
        templateData: {
          orderNumber: order.order_number,
          customerFirstName: order.first_name,
          customerLastName: order.last_name,
          customerEmail: order.email,
          address: order.address,
          postalCode: order.postal_code,
          city: order.city,
          province: order.province,
          shippingUrl,
        },
      });
    }

    return new Response(JSON.stringify({ success: true, ownerEmailSent: true, customerEmailSent: true }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
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