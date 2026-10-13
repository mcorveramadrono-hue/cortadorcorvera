CREATE TABLE public.welcome_coupon_requests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text NOT NULL,
  token text NOT NULL UNIQUE,
  confirmed_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT ALL ON public.welcome_coupon_requests TO service_role;
ALTER TABLE public.welcome_coupon_requests ENABLE ROW LEVEL SECURITY;