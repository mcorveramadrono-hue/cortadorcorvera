-- 1. Make session_token NOT NULL on orders to eliminate any NULL-bypass risk
-- (column already has DEFAULT gen_random_uuid(), so existing NULLs shouldn't exist,
-- but backfill defensively before applying the constraint)
UPDATE public.orders SET session_token = gen_random_uuid() WHERE session_token IS NULL;
ALTER TABLE public.orders ALTER COLUMN session_token SET NOT NULL;
ALTER TABLE public.orders ALTER COLUMN session_token SET DEFAULT gen_random_uuid();

-- 2. Harden the SELECT policy so an invalid/missing header cannot accidentally
-- match rows. We compare against the header value cast safely via a CASE.
DROP POLICY IF EXISTS "Orders readable by session token" ON public.orders;

CREATE POLICY "Orders readable by session token"
ON public.orders
FOR SELECT
TO public
USING (
  session_token IS NOT NULL
  AND session_token = NULLIF(
    current_setting('request.headers', true)::json ->> 'x-session-token',
    ''
  )::uuid
);

-- 3. Same hardening for order_items SELECT policy
DROP POLICY IF EXISTS "Order items readable by session token" ON public.order_items;

CREATE POLICY "Order items readable by session token"
ON public.order_items
FOR SELECT
TO public
USING (
  EXISTS (
    SELECT 1 FROM public.orders o
    WHERE o.id = order_items.order_id
      AND o.session_token IS NOT NULL
      AND o.session_token = NULLIF(
        current_setting('request.headers', true)::json ->> 'x-session-token',
        ''
      )::uuid
  )
);

-- 4. Tighten the INSERT policy on orders so the client cannot pre-set
-- privileged/server-managed fields (shipping_token, confirmation_token,
-- stripe_session_id, shipped_at, tracking info). Status & payment_method
-- restriction is preserved.
DROP POLICY IF EXISTS "Orders insert with safe defaults" ON public.orders;

CREATE POLICY "Orders insert with safe defaults"
ON public.orders
FOR INSERT
TO public
WITH CHECK (
  status = ANY (ARRAY['pending_payment'::text, 'pending_stripe'::text])
  AND payment_method = ANY (ARRAY['transfer'::text, 'bizum'::text, 'card'::text])
  AND shipping_token IS NULL
  AND stripe_session_id IS NULL
  AND shipped_at IS NULL
  AND shipping_carrier IS NULL
  AND tracking_number IS NULL
  AND tracking_url IS NULL
);

-- 5. Same for order_items: ensure inserted rows belong to an order owned
-- by the caller's session_token (already enforced) and the parent order
-- has a non-null session_token.
DROP POLICY IF EXISTS "Order items insert for own orders" ON public.order_items;

CREATE POLICY "Order items insert for own orders"
ON public.order_items
FOR INSERT
TO public
WITH CHECK (
  EXISTS (
    SELECT 1 FROM public.orders o
    WHERE o.id = order_items.order_id
      AND o.session_token IS NOT NULL
      AND o.session_token = NULLIF(
        current_setting('request.headers', true)::json ->> 'x-session-token',
        ''
      )::uuid
  )
);