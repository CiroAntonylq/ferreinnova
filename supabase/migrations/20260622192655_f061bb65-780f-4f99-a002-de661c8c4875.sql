
CREATE OR REPLACE FUNCTION public.decrement_product_stock(_items jsonb)
RETURNS TABLE (id text, stock_actual integer)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  item record;
  current_stock integer;
BEGIN
  IF _items IS NULL OR jsonb_typeof(_items) <> 'array' THEN
    RAISE EXCEPTION 'items must be a JSON array';
  END IF;

  FOR item IN
    SELECT (e->>'product_id')::text AS product_id,
           (e->>'cantidad')::int   AS cantidad
    FROM jsonb_array_elements(_items) e
  LOOP
    IF item.cantidad IS NULL OR item.cantidad <= 0 THEN
      RAISE EXCEPTION 'Cantidad inválida para %', item.product_id;
    END IF;

    SELECT p.stock_actual INTO current_stock
    FROM public.products p
    WHERE p.id = item.product_id
    FOR UPDATE;

    IF NOT FOUND THEN
      RAISE EXCEPTION 'Producto % no existe', item.product_id;
    END IF;

    IF current_stock < item.cantidad THEN
      RAISE EXCEPTION 'Stock insuficiente para % (disponible %, requerido %)',
        item.product_id, current_stock, item.cantidad;
    END IF;

    UPDATE public.products AS p
       SET stock_actual = p.stock_actual - item.cantidad,
           updated_at = now()
     WHERE p.id = item.product_id;
  END LOOP;

  RETURN QUERY
    SELECT p.id, p.stock_actual
    FROM public.products p
    WHERE p.id IN (
      SELECT (e->>'product_id')::text FROM jsonb_array_elements(_items) e
    );
END;
$$;
