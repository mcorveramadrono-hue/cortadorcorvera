import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import * as React from "npm:react@18.3.1";
import { renderAsync } from "npm:@react-email/components@0.0.22";
import { createClient } from "npm:@supabase/supabase-js@2.57.2";
import { TEMPLATES } from "../_shared/transactional-email-templates/registry.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const AMOUNT = 5;
const MIN_ORDER_TOTAL = 0;

const SITE_NAME = "Corvera Ibéricos";
const SENDER_DOMAIN = "notify.corveraibericos.com";
const FROM_DOMAIN = "corveraibericos.com";

function generateToken(): string {
  const bytes = new Uint8Array(32);
  crypto.getRandomValues(bytes);
  return Array.from(bytes).map((b) => b.toString(16).padStart(2, "0")).join("");
}

async function renderAndEnqueue(
  supabase: ReturnType<typeof createClient>,
  templateName: string,
  recipientEmail: string,
  idempotencyKey: string,
  templateData: Record<string, unknown>,
) {
  const template = TEMPLATES[templateName];
  if (!template) throw new Error(`Unknown template: ${templateName}`);

  const effectiveRecipient = (template.to as string | undefined) ?? recipientEmail;
  const normalized = effectiveRecipient.trim().toLowerCase();
  const messageId = crypto.randomUUID();

  // Suppression check
  const { data: suppressed } = await supabase
    .from("suppressed_emails")
    .select("email")
    .eq("email", normalized)
    .maybeSingle();
  if (suppressed) {
    console.log("Skipping suppressed recipient", normalized);
    return;
  }

  // Ensure unsubscribe token
  const { data: existingToken } = await supabase
    .from("email_unsubscribe_tokens")
    .select("token, used_at")
    .eq("email", normalized)
    .maybeSingle();

  let unsubscribeToken: string;
  if (!existingToken) {
    unsubscribeToken = generateToken();
    await supabase
      .from("email_unsubscribe_tokens")
      .insert({ email: normalized, token: unsubscribeToken });
  } else {
    unsubscribeToken = existingToken.token as string;
  }

  const html = await renderAsync(
    React.createElement(template.component as any, templateData),
  );
  const plainText = await renderAsync(
    React.createElement(template.component as any, templateData),
    { plainText: true },
  );

  const subject =
    typeof template.subject === "function"
      ? (template.subject as any)(templateData)
      : (template.subject as string);

  await supabase.from("email_send_log").insert({
    message_id: messageId,
    template_name: templateName,
    recipient_email: effectiveRecipient,
    status: "pending",
  });

  const { error: enqueueError } = await supabase.rpc("enqueue_email", {
    queue_name: "transactional_emails",
    payload: {
      message_id: messageId,
      to: effectiveRecipient,
      from: `${SITE_NAME} <noreply@${FROM_DOMAIN}>`,
      sender_domain: SENDER_DOMAIN,
      subject,
      html,
      text: plainText,
      purpose: "transactional",
      label: templateName,
      idempotency_key: idempotencyKey,
      unsubscribe_token: unsubscribeToken,
      queued_at: new Date().toISOString(),
    },
  });
  if (enqueueError) throw enqueueError;
}

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });

  try {
    const body = await req.json().catch(() => ({}));
    const rawEmail = typeof body?.email === "string" ? body.email.trim().toLowerCase() : "";
    if (!rawEmail || rawEmail.length > 255 || !EMAIL_RE.test(rawEmail)) {
      return new Response(JSON.stringify({ error: "Email no válido" }), {
        status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const serviceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, serviceKey);

    const { data: existing } = await supabase
      .from("discount_coupons")
      .select("id")
      .eq("email", rawEmail)
      .is("source_order_id", null)
      .gt("expires_at", new Date().toISOString())
      .maybeSingle();

    if (existing) {
      return new Response(JSON.stringify({ ok: true, alreadyIssued: true }), {
        status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const code = `BIEN-${crypto.randomUUID().slice(0, 8).toUpperCase()}`;
    const { error: insertError } = await supabase.from("discount_coupons").insert({
      code, email: rawEmail, amount: AMOUNT, min_order_total: MIN_ORDER_TOTAL,
    });
    if (insertError) throw insertError;

    await renderAndEnqueue(supabase, "coupon-issued", rawEmail, `welcome-coupon-${code}`, {
      code, amount: AMOUNT, minOrderTotal: MIN_ORDER_TOTAL, variant: "welcome",
    });

    try {
      await renderAndEnqueue(supabase, "owner-welcome-coupon", "corveraibericos@gmail.com", `owner-welcome-coupon-${code}`, {
        customerEmail: rawEmail, code, amount: AMOUNT,
      });
    } catch (notifyErr) {
      console.error("owner-welcome-coupon notify failed:", notifyErr);
    }

    return new Response(JSON.stringify({ ok: true }), {
      status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("request-welcome-coupon error:", err);
    return new Response(JSON.stringify({ error: "No se pudo generar el cupón. Inténtalo más tarde." }), {
      status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
