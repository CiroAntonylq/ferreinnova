
-- Seed catalog (idempotent)
INSERT INTO public.products (id, nombre, categoria, precio, stock_actual, stock_minimo, imagen) VALUES
  ('FERR-001','Tubo PVC SAP Eléctrico 3/4"','Tuberías y Conexiones PVC',8.5,45,20,'https://images.unsplash.com/photo-1558354798-3699f781ac6c?w=600&h=400&fit=crop&q=80'),
  ('FERR-002','Cemento Sol Portland Tipo I (Bolsa 42.5 kg)','Materiales de Construcción',28.9,3,15,'https://images.unsplash.com/photo-1773394089934-3e29f2a3d6a9?w=600&h=400&fit=crop&q=80'),
  ('FERR-003','Fierro de Construcción Arequipa 1/2"','Materiales de Construcción',43.2,18,10,'https://images.unsplash.com/photo-1763771420551-18bc44399f0c?w=600&h=400&fit=crop&q=80'),
  ('FERR-004','Tubo PVC SAL 4" Pavco (Desagüe)','Tuberías y Conexiones PVC',34.0,12,8,'https://images.unsplash.com/photo-1558354798-3699f781ac6c?w=600&h=400&fit=crop&q=80'),
  ('FERR-005','Martillo de Uña Tramontina 29mm','Herramientas Manuales',24.5,25,5,'https://images.unsplash.com/flagged/photo-1586864388090-d599b2dcc2f8?w=600&h=400&fit=crop&q=80'),
  ('FERR-006','Cable Eléctrico THW 12 AWG Indeco (m)','Electricidad',2.8,2,30,'https://images.unsplash.com/photo-1758965364875-e090e5423d2d?w=600&h=400&fit=crop&q=80'),
  ('FERR-007','Pintura Látex CPP Blanco Hueso 1 gal','Pinturas',65.9,9,6,'https://images.unsplash.com/photo-1691874076923-98ed46666dc3?w=600&h=400&fit=crop&q=80')
ON CONFLICT (id) DO NOTHING;

-- Atomic stock decrement; rolls back the whole call on any failure.
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

    UPDATE public.products
       SET stock_actual = stock_actual - item.cantidad,
           updated_at = now()
     WHERE products.id = item.product_id;
  END LOOP;

  RETURN QUERY
    SELECT p.id, p.stock_actual
    FROM public.products p
    WHERE p.id IN (
      SELECT (e->>'product_id')::text FROM jsonb_array_elements(_items) e
    );
END;
$$;

REVOKE ALL ON FUNCTION public.decrement_product_stock(jsonb) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.decrement_product_stock(jsonb) TO anon, authenticated, service_role;
