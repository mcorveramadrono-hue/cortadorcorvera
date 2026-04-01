
-- Explicitly deny UPDATE and DELETE on orders
CREATE POLICY "Deny all updates on orders"
  ON public.orders FOR UPDATE
  USING (false);

CREATE POLICY "Deny all deletes on orders"
  ON public.orders FOR DELETE
  USING (false);

-- Explicitly deny UPDATE and DELETE on order_items
CREATE POLICY "Deny all updates on order_items"
  ON public.order_items FOR UPDATE
  USING (false);

CREATE POLICY "Deny all deletes on order_items"
  ON public.order_items FOR DELETE
  USING (false);
