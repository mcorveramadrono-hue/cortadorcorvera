ALTER TABLE public.shared_promo_codes ADD COLUMN IF NOT EXISTS percent_off numeric;
ALTER TABLE public.shared_promo_codes ALTER COLUMN amount DROP NOT NULL;
INSERT INTO public.shared_promo_codes (code, amount, percent_off, max_uses, brand_filter, min_order_total, expires_at)
VALUES ('BIENVENIDO5', 0, 5, 1000000, NULL, 0, now() + interval '7 days');