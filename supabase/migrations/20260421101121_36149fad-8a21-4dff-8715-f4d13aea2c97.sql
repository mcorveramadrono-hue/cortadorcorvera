-- 1. Convert PERMISSIVE deny policies to RESTRICTIVE so they cannot be bypassed
DROP POLICY IF EXISTS "Deny all updates on orders" ON public.orders;
DROP POLICY IF EXISTS "Deny all deletes on orders" ON public.orders;
DROP POLICY IF EXISTS "Deny all updates on order_items" ON public.order_items;
DROP POLICY IF EXISTS "Deny all deletes on order_items" ON public.order_items;

CREATE POLICY "Restrict updates on orders"
ON public.orders
AS RESTRICTIVE
FOR UPDATE
TO public
USING (false);

CREATE POLICY "Restrict deletes on orders"
ON public.orders
AS RESTRICTIVE
FOR DELETE
TO public
USING (false);

CREATE POLICY "Restrict updates on order_items"
ON public.order_items
AS RESTRICTIVE
FOR UPDATE
TO public
USING (false);

CREATE POLICY "Restrict deletes on order_items"
ON public.order_items
AS RESTRICTIVE
FOR DELETE
TO public
USING (false);

-- 2. Fix mutable search_path on functions that lack it
CREATE OR REPLACE FUNCTION public.move_to_dlq(source_queue text, dlq_name text, message_id bigint, payload jsonb)
 RETURNS bigint
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
DECLARE new_id BIGINT;
BEGIN
  SELECT pgmq.send(dlq_name, payload) INTO new_id;
  PERFORM pgmq.delete(source_queue, message_id);
  RETURN new_id;
EXCEPTION WHEN undefined_table THEN
  BEGIN
    PERFORM pgmq.create(dlq_name);
  EXCEPTION WHEN OTHERS THEN
    NULL;
  END;
  SELECT pgmq.send(dlq_name, payload) INTO new_id;
  BEGIN
    PERFORM pgmq.delete(source_queue, message_id);
  EXCEPTION WHEN undefined_table THEN
    NULL;
  END;
  RETURN new_id;
END;
$function$;

CREATE OR REPLACE FUNCTION public.enqueue_email(queue_name text, payload jsonb)
 RETURNS bigint
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
BEGIN
  RETURN pgmq.send(queue_name, payload);
EXCEPTION WHEN undefined_table THEN
  PERFORM pgmq.create(queue_name);
  RETURN pgmq.send(queue_name, payload);
END;
$function$;

CREATE OR REPLACE FUNCTION public.read_email_batch(queue_name text, batch_size integer, vt integer)
 RETURNS TABLE(msg_id bigint, read_ct integer, message jsonb)
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
BEGIN
  RETURN QUERY SELECT r.msg_id, r.read_ct, r.message FROM pgmq.read(queue_name, vt, batch_size) r;
EXCEPTION WHEN undefined_table THEN
  PERFORM pgmq.create(queue_name);
  RETURN;
END;
$function$;

CREATE OR REPLACE FUNCTION public.delete_email(queue_name text, message_id bigint)
 RETURNS boolean
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
BEGIN
  RETURN pgmq.delete(queue_name, message_id);
EXCEPTION WHEN undefined_table THEN
  RETURN FALSE;
END;
$function$;

-- 3. Lock down the email-assets storage bucket: only service_role may write
DROP POLICY IF EXISTS "Service role manages email-assets" ON storage.objects;

CREATE POLICY "Service role manages email-assets"
ON storage.objects
FOR ALL
TO public
USING (bucket_id = 'email-assets' AND auth.role() = 'service_role')
WITH CHECK (bucket_id = 'email-assets' AND auth.role() = 'service_role');