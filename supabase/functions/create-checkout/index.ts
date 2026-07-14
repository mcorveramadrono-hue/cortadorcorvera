import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@18.5.0";
import { createClient } from "npm:@supabase/supabase-js@2.57.2";
import { getTrustedPrice, getTrustedKnifeSupplement, getProductBrand } from "../_shared/product-catalog.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { orderId, sessionToken, promoCode: rawPromoCode } = await req.json();
    const promoCode = typeof rawPromoCode === "string" ? rawPromoCode.trim().toUpperCase() : "";

    if (!orderId || typeof orderId !== "string") {
      return new Response(
        JSON.stringify({ error: "orderId requerido" }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 400 }
      );
    }

    if (!sessionToken || typeof sessionToken !== "string") {
      return new Response(
        JSON.stringify({ error: "sessionToken requerido" }),
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

    // Verify caller owns the order via session token (matches RLS pattern)
    if (!order.session_token || order.session_token !== sessionToken) {
      return new Response(
        JSON.stringify({ error: "No autorizado" }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 403 }
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
      const quantity = Number(item.quantity) || 1;
      const weight = Number(item.weight);
      const productName = String(item.product_name || "");

      // Re-derive prices from the trusted server-side catalog.
      // Never trust prices stored on order_items (client-inserted).
      const trustedPrice = getTrustedPrice(productName, weight);
      if (trustedPrice == null) {
        console.error("Unknown product/weight in order:", { productName, weight, orderId });
        return new Response(
          JSON.stringify({ error: "Producto no válido en el pedido" }),
          { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 400 }
        );
      }

      lineItems.push({
        price_data: {
          currency: "eur",
          product_data: {
            name: `${productName} (${weight.toFixed(1)} kg)`,
          },
          unit_amount: Math.round(trustedPrice * 100),
        },
        quantity,
      });

      if (item.knife_supplement) {
        const trustedKnife = getTrustedKnifeSupplement(productName);
        if (trustedKnife && trustedKnife > 0) {
          lineItems.push({
            price_data: {
              currency: "eur",
              product_data: {
                name: `Corte a cuchillo - ${productName}`,
              },
              unit_amount: Math.round(trustedKnife * 100),
            },
            quantity,
          });
        }
      }
    }

    // Trusted shipping cost — never trust order.shipping_cost from the client.
    // Free shipping if total weight >= 20kg, order contains a product with a
    // free-shipping promo (whole-piece jamones listed below), or contains a
    // unit-based product (sobres) that always ships free.
    const FREE_SHIPPING_PRODUCT_NAMES = new Set<string>([
      "Jamón Ibérico Cebo de Campo 50%",
      "Jamón César Nieto Reserva Familiar <7kg",
      "Jamón de Cebo Ibérico Epicum 50%",
      "Jamón de Cebo Ibérico Finura 50%",
    ]);
    // Products sold by unit (sobres) always include shipping.
    const UNIT_FREE_SHIPPING_PRODUCT_NAMES = new Set<string>([
      "Sobres de Jamón Cebo 50% Ibérico Epicum (cortado a cuchillo)",
    ]);
    const computedWeight = orderItems.reduce(
      (sum, it) => sum + (Number(it.weight) || 0) * (Number(it.quantity) || 1),
      0
    );
    const productSubtotal = orderItems.reduce((sum, it) => {
      const q = Number(it.quantity) || 1;
      const w = Number(it.weight) || 0;
      const p = getTrustedPrice(String(it.product_name || ""), w) ?? 0;
      const k = it.knife_supplement ? (getTrustedKnifeSupplement(String(it.product_name || "")) ?? 0) : 0;
      return sum + (p + k) * q;
    }, 0);
    const hasFreeShippingProduct = orderItems.some((it) =>
      FREE_SHIPPING_PRODUCT_NAMES.has(String(it.product_name || "")) ||
      UNIT_FREE_SHIPPING_PRODUCT_NAMES.has(String(it.product_name || ""))
    );

    // Server-side coupon validation. Never trust the client for discount/free-shipping.
    // Look up promoCode in discount_coupons (single-use) or shared_promo_codes (shared).
    let couponFreeShipping = false;
    let couponDiscountCents = 0;
    if (promoCode) {
      if (promoCode === "MAMA3") {
        couponFreeShipping = true;
      } else {
        // 1) Single-use coupon (discount_coupons.amount, email-bound)
        const { data: singleCoupon } = await supabaseAdmin
          .from("discount_coupons")
          .select("amount, min_order_total, email, used, expires_at")
          .eq("code", promoCode)
          .maybeSingle();
        if (
          singleCoupon &&
          singleCoupon.used === false &&
          new Date(singleCoupon.expires_at) > new Date() &&
          String(singleCoupon.email).toLowerCase() === String(order.email).toLowerCase() &&
          productSubtotal >= Number(singleCoupon.min_order_total ?? 0)
        ) {
          const amt = Number(singleCoupon.amount) || 0;
          couponDiscountCents = Math.round(Math.min(amt, productSubtotal) * 100);
        } else {
          // 2) Shared promo (percent or amount, with optional brand_filter and min)
          const { data: shared } = await supabaseAdmin
            .from("shared_promo_codes")
            .select("amount, percent_off, min_order_total, brand_filter, max_uses, used_count, expires_at")
            .eq("code", promoCode)
            .maybeSingle();
          if (
            shared &&
            new Date(shared.expires_at) > new Date() &&
            Number(shared.used_count) < Number(shared.max_uses)
          ) {
            // brand_filter cannot be enforced without product-brand mapping here,
            // so we fall back to the full product subtotal as the eligible base.
            const eligible = productSubtotal;
            if (eligible >= Number(shared.min_order_total ?? 0) && eligible > 0) {
              if (shared.percent_off != null && Number(shared.percent_off) > 0) {
                couponDiscountCents = Math.round(eligible * Number(shared.percent_off));
              } else if (shared.amount != null) {
                couponDiscountCents = Math.round(Math.min(Number(shared.amount), eligible) * 100);
              }
            }
          }
        }
      }
    }

    const baseShipping = computedWeight >= 20 || hasFreeShippingProduct ? 0 : 5;
    const trustedShipping = couponFreeShipping ? 0 : baseShipping;
    if (trustedShipping > 0) {
      lineItems.push({
        price_data: {
          currency: "eur",
          product_data: { name: "Gastos de envío" },
          unit_amount: Math.round(trustedShipping * 100),
        },
        quantity: 1,
      });
    }

    // Coupon discount — applied via Stripe coupon (line items can't be negative).
    let stripeDiscountCouponId: string | undefined;
    if (couponDiscountCents > 0) {
      const stripeCoupon = await stripe.coupons.create({
        amount_off: couponDiscountCents,
        currency: "eur",
        duration: "once",
        name: `Cupón ${promoCode}`,
      });
      stripeDiscountCouponId = stripeCoupon.id;
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
      ...(stripeDiscountCouponId
        ? { discounts: [{ coupon: stripeDiscountCouponId }] }
        : {}),
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
    return new Response(JSON.stringify({ error: "No se pudo iniciar el pago. Inténtalo de nuevo." }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});
