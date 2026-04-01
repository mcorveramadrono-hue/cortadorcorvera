import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "npm:@supabase/supabase-js@2.57.2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const FORMSPREE_ENDPOINT = "https://formspree.io/f/mlgwakaa";
const RESEND_ENDPOINT = "https://api.resend.com/emails";
const OWNER_EMAIL = "mcorveramadrono@gmail.com";
const FROM_EMAIL = "Corvera Web <onboarding@resend.dev>";
const BIZUM_PHONE = "+34 676 703 034";
const TRANSFER_IBAN = "ES53 0182 1836 9502 0157 8384";
const TRANSFER_HOLDER = "Marcos Corvera Madroño";

type OrderItem = {
  product_name: string;
  weight: number;
  price: number;
  quantity: number;
  knife_supplement: boolean;
  knife_supplement_price: number;
};

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const formatEuro = (value: number) => `${value.toFixed(2).replace(".", ",")} €`;

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

async function sendToFormspreeWithRetry(payload: Record<string, string>) {
  let lastError: Error | null = null;

  for (let attempt = 1; attempt <= 3; attempt++) {
    try {
      await sendToFormspree(payload);
      return;
    } catch (error) {
      lastError = error instanceof Error ? error : new Error("Unknown Formspree error");
      if (attempt < 3) {
        await sleep(300 * attempt);
      }
    }
  }

  throw lastError ?? new Error("Unknown Formspree error");
}

async function sendWithResend(params: {
  to: string;
  subject: string;
  text: string;
  html: string;
}) {
  const apiKey = Deno.env.get("RESEND_API_KEY");

  if (!apiKey) {
    throw new Error("RESEND_API_KEY not configured");
  }

  const response = await fetch(RESEND_ENDPOINT, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: FROM_EMAIL,
      to: [params.to],
      subject: params.subject,
      text: params.text,
      html: params.html,
    }),
  });

  const responseText = await response.text();

  if (!response.ok) {
    throw new Error(`Resend ${response.status}: ${responseText || "empty response"}`);
  }
}

function buildPaymentInstructions(paymentMethod: string, concept: string, total: number) {
  if (paymentMethod === "card") {
    return {
      text: `Pago con tarjeta: Completado correctamente.`,
      html: `<p><strong>Pago con tarjeta:</strong> ✅ Completado correctamente.</p>`,
    };
  }

  if (paymentMethod === "bizum") {
    return {
      text: `Bizum\nTeléfono: ${BIZUM_PHONE}\nConcepto: ${concept}\nImporte: ${formatEuro(total)}`,
      html: `
        <p><strong>Pago por Bizum</strong></p>
        <p><strong>Teléfono:</strong> ${BIZUM_PHONE}</p>
        <p><strong>Concepto:</strong> ${concept}</p>
        <p><strong>Importe:</strong> ${formatEuro(total)}</p>
      `.trim(),
    };
  }

  return {
    text: `Transferencia bancaria\nTitular: ${TRANSFER_HOLDER}\nIBAN: ${TRANSFER_IBAN}\nConcepto: ${concept}\nImporte: ${formatEuro(total)}`,
    html: `
      <p><strong>Pago por transferencia bancaria</strong></p>
      <p><strong>Titular:</strong> ${TRANSFER_HOLDER}</p>
      <p><strong>IBAN:</strong> ${TRANSFER_IBAN}</p>
      <p><strong>Concepto:</strong> ${concept}</p>
      <p><strong>Importe:</strong> ${formatEuro(total)}</p>
    `.trim(),
  };
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const { orderId } = await req.json();

    if (!orderId) {
      return new Response(JSON.stringify({ error: "orderId is required" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
    );

    const { data: order, error: orderError } = await supabase
      .from("orders")
      .select("*")
      .eq("id", orderId)
      .single();

    if (orderError || !order) {
      throw new Error("Order not found");
    }

    const { data: items, error: itemsError } = await supabase
      .from("order_items")
      .select("*")
      .eq("order_id", orderId);

    if (itemsError) {
      throw itemsError;
    }

    const safeItems = (items || []) as OrderItem[];
    const concept = `${order.first_name} ${order.last_name} - ${order.order_number}`;
    const paymentInstructions = buildPaymentInstructions(order.payment_method, concept, Number(order.total));

    // Build confirmation link for bizum/transfer payments
    const supabaseUrl = Deno.env.get("SUPABASE_URL") ?? "";
    const confirmPaymentUrl = `${supabaseUrl}/functions/v1/confirm-payment?orderId=${order.id}&token=${order.confirmation_token}`;

    const itemsListText = safeItems
      .map((item) => {
        const lineBase = Number(item.price) * Number(item.quantity);
        const lineKnife = item.knife_supplement ? Number(item.knife_supplement_price) * Number(item.quantity) : 0;
        const lineTotal = lineBase + lineKnife;
        const knifeLabel = item.knife_supplement ? ` + corte a cuchillo (${formatEuro(Number(item.knife_supplement_price))} x ${item.quantity})` : "";
        return `- ${item.product_name} (${Number(item.weight).toFixed(1)}kg) x${item.quantity}${knifeLabel} = ${formatEuro(lineTotal)}`;
      })
      .join("\n");

    const paymentMethodLabel = order.payment_method === "transfer" ? "Transferencia bancaria" : order.payment_method === "bizum" ? "Bizum" : order.payment_method === "card" ? "Tarjeta (Stripe)" : order.payment_method;
    const isCard = order.payment_method === "card";

    const ownerSubject = `Nuevo Pedido ${order.order_number} - ${order.first_name} ${order.last_name}`;
    const ownerText = `
NUEVO PEDIDO - ${order.order_number}
================================
Método de pago: ${paymentMethodLabel}
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
${itemsListText}

TOTALES:
Subtotal: ${formatEuro(Number(order.subtotal))}
Envío: ${Number(order.shipping_cost) === 0 ? "Gratis" : formatEuro(Number(order.shipping_cost))}
TOTAL: ${formatEuro(Number(order.total))}
Peso total: ${Number(order.total_weight).toFixed(1)}kg

INSTRUCCIONES DE PAGO:
${paymentInstructions.text}

${!isCard ? `CONFIRMAR PAGO RECIBIDO:\n${confirmPaymentUrl}\n` : ""}Notas: ${order.notes || "Sin notas"}
    `.trim();

    const formspreePayload = {
      _subject: ownerSubject,
      nombre: `${order.first_name} ${order.last_name}`,
      email: order.email,
      telefono: order.phone,
      mensaje: ownerText,
      origen: "pedido",
    };

    let ownerProvider: "formspree" | "resend_fallback" = "formspree";

    try {
      await sendToFormspreeWithRetry(formspreePayload);
    } catch (formspreeError) {
      console.error("Formspree order notification failed, using fallback:", formspreeError);
      await sendWithResend({
        to: OWNER_EMAIL,
        subject: ownerSubject,
        text: ownerText,
        html: `<pre>${ownerText}</pre>`,
      });
      ownerProvider = "resend_fallback";
    }

    const customerItemsHtml = safeItems
      .map((item) => {
        const lineBase = Number(item.price) * Number(item.quantity);
        const lineKnife = item.knife_supplement ? Number(item.knife_supplement_price) * Number(item.quantity) : 0;
        const lineTotal = lineBase + lineKnife;

        return `
          <li style="margin-bottom:8px;">
            ${item.product_name} (${Number(item.weight).toFixed(1)} kg) x${item.quantity}
            ${item.knife_supplement ? ` + corte a cuchillo (${formatEuro(Number(item.knife_supplement_price))} x ${item.quantity})` : ""}
            — <strong>${formatEuro(lineTotal)}</strong>
          </li>
        `.trim();
      })
      .join("");

    const customerSubject = isCard
      ? `Pedido confirmado ${order.order_number}`
      : `Confirmación de tu pedido ${order.order_number}`;
    const customerStatusText = isCard
      ? "Tu pago con tarjeta ha sido procesado correctamente. Prepararemos tu pedido en breve."
      : "Hemos recibido tu pedido y está pendiente de pago.";
    const customerFooterText = isCard
      ? "Gracias por tu compra. Prepararemos tu pedido y te avisaremos cuando sea enviado."
      : "Tu pedido no se preparará hasta confirmar el ingreso.\nGracias por confiar en nosotros.";
    const customerText = `
Hola ${order.first_name},

${customerStatusText}

Pedido: ${order.order_number}

Resumen del pedido:
${itemsListText}

Subtotal: ${formatEuro(Number(order.subtotal))}
Envío: ${Number(order.shipping_cost) === 0 ? "Gratis" : formatEuro(Number(order.shipping_cost))}
Total: ${formatEuro(Number(order.total))}

${paymentInstructions.text}

${customerFooterText}
    `.trim();

    const customerStatusHtml = isCard
      ? `<p>Tu pago con tarjeta ha sido <strong>procesado correctamente</strong>. Prepararemos tu pedido en breve.</p>`
      : `<p>Hemos recibido tu pedido <strong>${order.order_number}</strong> y está <strong>pendiente de pago</strong>.</p>`;
    const customerFooterHtml = isCard
      ? `<p style="margin-top: 20px;">Gracias por tu compra. Prepararemos tu pedido y te avisaremos cuando sea enviado.</p>`
      : `<p style="margin-top: 20px;">Tu pedido no se preparará hasta confirmar el ingreso.<br />Gracias por confiar en nosotros.</p>`;

    const customerHtml = `
      <div style="font-family: Arial, sans-serif; line-height: 1.5; color: #111827;">
        <h2>Gracias por tu pedido, ${order.first_name}</h2>
        ${customerStatusHtml}

        <h3>Resumen del pedido (${order.order_number})</h3>
        <ul style="padding-left: 20px;">
          ${customerItemsHtml}
        </ul>

        <p><strong>Subtotal:</strong> ${formatEuro(Number(order.subtotal))}</p>
        <p><strong>Envío:</strong> ${Number(order.shipping_cost) === 0 ? "Gratis" : formatEuro(Number(order.shipping_cost))}</p>
        <p><strong>Total:</strong> ${formatEuro(Number(order.total))}</p>

        ${!isCard ? `<h3>Cómo realizar el pago</h3>` : ""}
        ${paymentInstructions.html}

        ${customerFooterHtml}
      </div>
    `.trim();

    await sendWithResend({
      to: order.email,
      subject: customerSubject,
      text: customerText,
      html: customerHtml,
    });

    return new Response(JSON.stringify({ success: true, ownerProvider, customerEmailSent: true }), {
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