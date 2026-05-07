
CREATE TABLE public.discount_coupons (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  code text NOT NULL UNIQUE,
  email text NOT NULL,
  amount numeric NOT NULL DEFAULT 10,
  min_order_total numeric NOT NULL DEFAULT 150,
  source_order_id uuid REFERENCES public.orders(id) ON DELETE SET NULL,
  used boolean NOT NULL DEFAULT false,
  used_at timestamptz,
  used_order_id uuid REFERENCES public.orders(id) ON DELETE SET NULL,
  expires_at timestamptz NOT NULL DEFAULT (now() + interval '365 days'),
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX idx_discount_coupons_code ON public.discount_coupons(code);
CREATE INDEX idx_discount_coupons_email ON public.discount_coupons(email);

ALTER TABLE public.discount_coupons ENABLE ROW LEVEL SECURITY;

-- No client access; only edge functions (service role) manage these.
CREATE POLICY "no_client_select" ON public.discount_coupons FOR SELECT USING (false);
CREATE POLICY "no_client_insert" ON public.discount_coupons FOR INSERT WITH CHECK (false);
CREATE POLICY "no_client_update" ON public.discount_coupons FOR UPDATE USING (false);
CREATE POLICY "no_client_delete" ON public.discount_coupons FOR DELETE USING (false);
