import { createClient } from 'npm:@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response(null, { headers: corsHeaders })
  const supabase = createClient(
    Deno.env.get('SUPABASE_URL')!,
    Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
  )
  const expires = new Date()
  expires.setMonth(expires.getMonth() + 4)
  const { data, error } = await supabase.functions.invoke('send-transactional-email', {
    body: {
      templateName: 'coupon-issued',
      recipientEmail: 'marcoscorvera2004@gmail.com',
      idempotencyKey: `preview-coupon-${Date.now()}`,
      templateData: {
        firstName: 'Marcos',
        code: 'CORV-PREVIEW',
        amount: 10,
        minOrderTotal: 150,
        expiresAt: expires.toISOString(),
      },
    },
  })
  return new Response(JSON.stringify({ data, error }), {
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
  })
})
