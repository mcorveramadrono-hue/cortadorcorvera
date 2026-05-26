
-- Shared promo codes (one code, multiple users)
CREATE TABLE public.shared_promo_codes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  code text NOT NULL UNIQUE,
  amount numeric NOT NULL,
  max_uses integer NOT NULL,
  used_count integer NOT NULL DEFAULT 0,
  brand_filter text,
  min_order_total numeric NOT NULL DEFAULT 0,
  expires_at timestamptz NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.shared_promo_codes ENABLE ROW LEVEL SECURITY;
CREATE POLICY "no_client_select" ON public.shared_promo_codes FOR SELECT USING (false);
CREATE POLICY "no_client_insert" ON public.shared_promo_codes FOR INSERT WITH CHECK (false);
CREATE POLICY "no_client_update" ON public.shared_promo_codes FOR UPDATE USING (false);
CREATE POLICY "no_client_delete" ON public.shared_promo_codes FOR DELETE USING (false);

-- Redemptions (one row per email/code)
CREATE TABLE public.shared_promo_redemptions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  code text NOT NULL,
  email text NOT NULL,
  order_id uuid,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (code, email)
);
CREATE INDEX idx_shared_promo_redemptions_code ON public.shared_promo_redemptions (code);

ALTER TABLE public.shared_promo_redemptions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "no_client_select" ON public.shared_promo_redemptions FOR SELECT USING (false);
CREATE POLICY "no_client_insert" ON public.shared_promo_redemptions FOR INSERT WITH CHECK (false);
CREATE POLICY "no_client_update" ON public.shared_promo_redemptions FOR UPDATE USING (false);
CREATE POLICY "no_client_delete" ON public.shared_promo_redemptions FOR DELETE USING (false);

-- Insert ANGEL5: 5€ off, 13 uses, only Angel Martin brand, expires in 1 month
INSERT INTO public.shared_promo_codes (code, amount, max_uses, brand_filter, expires_at)
VALUES ('ANGEL5', 5, 13, 'angel-martin', now() + interval '1 month');

-- Cleanup function for expired shared promos
CREATE OR REPLACE FUNCTION public.cleanup_expired_shared_promos()
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
BEGIN
  DELETE FROM public.shared_promo_redemptions
  WHERE code IN (SELECT code FROM public.shared_promo_codes WHERE expires_at < now());
  DELETE FROM public.shared_promo_codes WHERE expires_at < now();
END;
$$;

-- Schedule daily cleanup
CREATE EXTENSION IF NOT EXISTS pg_cron;

SELECT cron.schedule(
  'cleanup-expired-shared-promos',
  '0 3 * * *',
  $$SELECT public.cleanup_expired_shared_promos();$$
);
