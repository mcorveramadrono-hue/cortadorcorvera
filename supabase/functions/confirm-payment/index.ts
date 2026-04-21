import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "npm:@supabase/supabase-js@2.57.2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const OWNER_EMAIL = "corveraibericos@gmail.com";
const SITE_URL = "https://cortadorcorvera.lovable.app";

function redirect(params: Record<string, string>) {
  const qs = new URLSearchParams(params).toString();
  return new Response(null, {
    status: 302,
    headers: { Location: `${SITE_URL}/confirmar-pago?${qs}` },
  });
}

async function enqueueAppEmail(
  supabaseUrl: string,
  anonKey: string,
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
      Authorization: `Bearer ${anonKey}`,
      apikey: anonKey,
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
    const url = new URL(req.url);
    const orderId = url.searchParams.get("orderId");
    const token = url.searchParams.get("token");

    if (!orderId || !token) {
      return redirect({ status: "invalid" });
    }

    const supabaseUrl = Deno.env.get("SUPABASE_URL") ?? "";
    const serviceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "";
    const anonKey = Deno.env.get("SUPABASE_ANON_KEY") ?? Deno.env.get("SUPABASE_PUBLISHABLE_KEY") ?? "";
    const supabase = createClient(supabaseUrl, serviceKey);

    // Verify order exists and token matches
    const { data: order, error: orderError } = await supabase
      .from("orders")
      .select("*")
      .eq("id", orderId)
      .eq("confirmation_token", token)
      .single();

    if (orderError || !order) {
      return redirect({ status: "invalid" });
    }

    if (order.status === "paid" || order.status === "confirmed") {
      return redirect({ status: "already", order: order.order_number });
    }

    // Generate shipping token if missing
    const shippingToken = order.shipping_token || crypto.randomUUID();

    // Update order status to paid + shipping token
    const { error: updateError } = await supabase
      .from("orders")
      .update({ status: "paid", shipping_token: shippingToken })
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

    const shippingUrl = `${SITE_URL}/marcar-envio/${orderId}?token=${shippingToken}`;

    await enqueueAppEmail(supabaseUrl, anonKey, {
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

    await enqueueAppEmail(supabaseUrl, anonKey, {
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

    await enqueueAppEmail(supabaseUrl, anonKey, {
      templateName: "owner-shipping-link",
      recipientEmail: OWNER_EMAIL,
      idempotencyKey: `owner-shipping-link-${orderId}`,
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

    return redirect({
      status: "success",
      order: order.order_number,
      name: `${order.first_name} ${order.last_name}`,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    console.error("Confirm payment error:", message);
    return redirect({ status: "error" });
  }
});
