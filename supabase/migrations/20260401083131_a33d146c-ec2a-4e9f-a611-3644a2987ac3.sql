
-- 1. Restrict orders INSERT to safe initial values only
DROP POLICY IF EXISTS "Anyone can create orders" ON public.orders;

CREATE POLICY "Orders insert with safe defaults"
ON public.orders
FOR INSERT
TO public
WITH CHECK (
  status IN ('pending_payment', 'pending_stripe') AND
  payment_method IN ('transfer', 'bizum', 'card')
);

-- 2. Add SELECT policy for order_items using session token from parent order
CREATE POLICY "Order items readable by session token"
ON public.order_items
FOR SELECT
TO public
USING (
  EXISTS (
    SELECT 1 FROM public.orders
    WHERE orders.id = order_items.order_id
      AND orders.session_token = (
        current_setting('request.headers', true)::json
        ->> 'x-session-token'
      )::uuid
  )
);
