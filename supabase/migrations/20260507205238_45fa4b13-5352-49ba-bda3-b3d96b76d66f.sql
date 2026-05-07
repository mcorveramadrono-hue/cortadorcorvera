
-- Cambiar caducidad por defecto a 4 meses
ALTER TABLE public.discount_coupons
  ALTER COLUMN expires_at SET DEFAULT (now() + interval '4 months');

-- Función limpieza diaria: borrar cupones expirados no usados
CREATE OR REPLACE FUNCTION public.cleanup_expired_coupons()
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  DELETE FROM public.discount_coupons
  WHERE used = false AND expires_at < now();
END;
$$;

-- Programar ejecución diaria
SELECT cron.schedule(
  'cleanup-expired-coupons',
  '0 3 * * *',
  $$ SELECT public.cleanup_expired_coupons(); $$
);
