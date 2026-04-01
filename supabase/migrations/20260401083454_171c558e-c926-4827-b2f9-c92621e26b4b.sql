
DROP POLICY IF EXISTS "Anyone can create order items" ON public.order_items;

CREATE POLICY "Order items insert for own orders"
ON public.order_items
FOR INSERT
TO public
WITH CHECK (
  EXISTS (
    SELECT 1 FROM public.orders
    WHERE orders.id = order_items.order_id
      AND orders.session_token = (
        current_setting('request.headers', true)::json
        ->> 'x-session-token'
      )::uuid
  )
);
