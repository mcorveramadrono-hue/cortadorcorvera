ALTER TABLE public.orders
  ADD COLUMN IF NOT EXISTS shipping_carrier TEXT,
  ADD COLUMN IF NOT EXISTS tracking_number TEXT,
  ADD COLUMN IF NOT EXISTS tracking_url TEXT,
  ADD COLUMN IF NOT EXISTS shipped_at TIMESTAMPTZ,
  ADD COLUMN IF NOT EXISTS shipping_token TEXT;

CREATE UNIQUE INDEX IF NOT EXISTS orders_shipping_token_key ON public.orders(shipping_token) WHERE shipping_token IS NOT NULL;