REVOKE EXECUTE ON FUNCTION public.claim_shared_promo_code(text) FROM anon, authenticated, PUBLIC;
GRANT EXECUTE ON FUNCTION public.claim_shared_promo_code(text) TO service_role;