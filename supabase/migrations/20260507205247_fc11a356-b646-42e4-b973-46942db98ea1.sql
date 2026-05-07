
REVOKE EXECUTE ON FUNCTION public.cleanup_expired_coupons() FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.cleanup_expired_coupons() TO postgres, service_role;
