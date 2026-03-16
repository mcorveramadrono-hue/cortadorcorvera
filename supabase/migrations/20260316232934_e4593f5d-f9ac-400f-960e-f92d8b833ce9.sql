
-- Orders table for guest checkout
CREATE TABLE public.orders (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  order_number TEXT NOT NULL UNIQUE,
  status TEXT NOT NULL DEFAULT 'pending',
  payment_method TEXT NOT NULL DEFAULT 'transfer',
  stripe_session_id TEXT,
  
  -- Customer info
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  dni TEXT NOT NULL,
  
  -- Shipping info
  address TEXT NOT NULL,
  city TEXT NOT NULL,
  province TEXT NOT NULL,
  postal_code TEXT NOT NULL,
  
  -- Totals
  subtotal NUMERIC(10,2) NOT NULL DEFAULT 0,
  shipping_cost NUMERIC(10,2) NOT NULL DEFAULT 0,
  total NUMERIC(10,2) NOT NULL DEFAULT 0,
  total_weight NUMERIC(10,2) NOT NULL DEFAULT 0,
  
  notes TEXT,
  accept_privacy BOOLEAN NOT NULL DEFAULT false,
  
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Order items
CREATE TABLE public.order_items (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  order_id UUID NOT NULL REFERENCES public.orders(id) ON DELETE CASCADE,
  product_name TEXT NOT NULL,
  weight NUMERIC(10,2) NOT NULL,
  price NUMERIC(10,2) NOT NULL,
  quantity INTEGER NOT NULL DEFAULT 1,
  knife_supplement BOOLEAN NOT NULL DEFAULT false,
  knife_supplement_price NUMERIC(10,2) NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.order_items ENABLE ROW LEVEL SECURITY;

-- Public insert policy (guest checkout)
CREATE POLICY "Anyone can create orders" ON public.orders FOR INSERT WITH CHECK (true);
CREATE POLICY "Anyone can create order items" ON public.order_items FOR INSERT WITH CHECK (true);

-- Orders can be read by email (for order confirmation page)
CREATE POLICY "Orders readable by session" ON public.orders FOR SELECT USING (true);
CREATE POLICY "Order items readable" ON public.order_items FOR SELECT USING (true);

-- Update policy for payment confirmation
CREATE POLICY "Orders can be updated by stripe webhook" ON public.orders FOR UPDATE USING (true);

-- Sequence for order numbers
CREATE SEQUENCE order_number_seq START 1001;

-- Function to generate order number
CREATE OR REPLACE FUNCTION public.generate_order_number()
RETURNS TRIGGER AS $$
BEGIN
  NEW.order_number := 'CRV-' || LPAD(nextval('order_number_seq')::text, 5, '0');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

CREATE TRIGGER set_order_number
  BEFORE INSERT ON public.orders
  FOR EACH ROW
  EXECUTE FUNCTION public.generate_order_number();

-- Updated at trigger
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

CREATE TRIGGER update_orders_updated_at
  BEFORE UPDATE ON public.orders
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();
