
-- Add session_token column to orders
ALTER TABLE public.orders ADD COLUMN session_token uuid DEFAULT gen_random_uuid();

-- Drop overly permissive policies
DROP POLICY IF EXISTS "Orders readable by session" ON public.orders;
DROP POLICY IF EXISTS "Orders can be updated by stripe webhook" ON public.orders;
DROP POLICY IF EXISTS "Order items readable" ON public.order_items;

-- Orders: only allow SELECT when the caller provides the matching session_token
CREATE POLICY "Orders readable by session token"
ON public.orders
FOR SELECT
TO public
USING (session_token = (current_setting('request.headers', true)::json->>'x-session-token')::uuid);

-- Order items: no public SELECT needed (edge functions use service_role)
-- Keep INSERT open for checkout

-- Orders UPDATE: no public UPDATE needed (edge functions use service_role)
