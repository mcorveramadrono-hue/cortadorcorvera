REVOKE EXECUTE ON FUNCTION public.cleanup_expired_coupons() FROM PUBLIC;
REVOKE EXECUTE ON FUNCTION public.cleanup_expired_coupons() FROM anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.cleanup_expired_shared_promos() FROM PUBLIC;
REVOKE EXECUTE ON FUNCTION public.cleanup_expired_shared_promos() FROM anon, authenticated;