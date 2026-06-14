CREATE OR REPLACE FUNCTION public.claim_shared_promo_code(_code text)
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  updated_rows int;
BEGIN
  UPDATE public.shared_promo_codes
     SET used_count = used_count + 1
   WHERE code = _code
     AND used_count < max_uses
     AND expires_at > now();
  GET DIAGNOSTICS updated_rows = ROW_COUNT;
  RETURN updated_rows > 0;
END;
$$;

REVOKE ALL ON FUNCTION public.claim_shared_promo_code(text) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.claim_shared_promo_code(text) TO service_role;