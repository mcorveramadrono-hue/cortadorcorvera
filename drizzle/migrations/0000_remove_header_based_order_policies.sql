-- Orders and order items are now created and read exclusively through edge
-- functions using the service role, which verify the session token server-side.
-- The old policies gated access on current_setting('request.headers'), which is
-- caller-supplied and spoofable, so they are removed entirely.

DROP POLICY IF EXISTS "Orders readable by session token" ON public.orders;
DROP POLICY IF EXISTS "Orders insert with safe defaults" ON public.orders;
DROP POLICY IF EXISTS "Order items readable by session token" ON public.order_items;
DROP POLICY IF EXISTS "Order items insert for own orders" ON public.order_items;

CREATE POLICY "No client select on orders" ON public.orders FOR SELECT USING (false);
CREATE POLICY "No client insert on orders" ON public.orders FOR INSERT WITH CHECK (false);
CREATE POLICY "No client select on order_items" ON public.order_items FOR SELECT USING (false);
CREATE POLICY "No client insert on order_items" ON public.order_items FOR INSERT WITH CHECK (false);

REVOKE ALL ON public.orders FROM anon, authenticated;
REVOKE ALL ON public.order_items FROM anon, authenticated;
GRANT ALL ON public.orders TO service_role;
GRANT ALL ON public.order_items TO service_role;