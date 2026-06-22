// Contexto global de inventario — compartido entre Tienda (cliente) y Panel Admin.
// La reducción de stock se persiste en Supabase de forma atómica con rollback local en caso de error.
import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { MOCK_PRODUCTS, type Product, type CategoriaSlug } from "@/data/products";
import { getCriticalProducts } from "@/lib/inventory";
import { supabase } from "@/integrations/supabase/client";
import type { CartItem } from "@/lib/cart";

type CheckoutItem = Pick<CartItem, "productId" | "cantidad">;

interface InventoryContextValue {
  products: Product[];
  criticos: Product[];
  loading: boolean;
  /** Recarga el catálogo desde PostgreSQL. */
  refresh: () => Promise<void>;
  /** Aplica el descuento de stock contra PostgreSQL. Devuelve { ok } o lanza con mensaje. */
  checkoutDecrement: (items: CheckoutItem[]) => Promise<{ ok: true } | { ok: false; error: string }>;
}

const InventoryContext = createContext<InventoryContextValue | null>(null);

/** Mapea la categoría textual de la DB al slug usado por filtros del frontend. */
function slugFromCategoria(categoria: string): CategoriaSlug {
  const c = categoria.toLowerCase();
  if (c.includes("pvc") || c.includes("tuber")) return "pvc";
  if (c.includes("construc")) return "construccion";
  if (c.includes("herramient")) return "herramientas";
  if (c.includes("electric")) return "electricidad";
  if (c.includes("pintur")) return "pinturas";
  return "herramientas";
}

export function InventoryProvider({ children }: { children: ReactNode }) {
  const [products, setProducts] = useState<Product[]>(MOCK_PRODUCTS);
  const [loading, setLoading] = useState(true);

  const refresh = useCallback(async () => {
    const { data, error } = await supabase
      .from("products")
      .select("id, nombre, categoria, precio, stock_actual, stock_minimo, imagen")
      .order("id");
    if (error) {
      console.error("[Inventory] Error cargando productos desde PostgreSQL:", error.message);
      setLoading(false);
      return;
    }
    if (data) {
      setProducts(
        data.map((r) => ({
          id: r.id,
          nombre: r.nombre,
          categoria: r.categoria,
          categoriaSlug: slugFromCategoria(r.categoria),
          precio: Number(r.precio),
          stockActual: r.stock_actual,
          stockMinimo: r.stock_minimo,
          imagen: r.imagen ?? "",
        })),
      );
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const checkoutDecrement = useCallback(
    async (items: CheckoutItem[]): Promise<{ ok: true } | { ok: false; error: string }> => {
      if (items.length === 0) return { ok: false, error: "Carrito vacío" };

      // 1) Snapshot para rollback.
      const snapshot = products;

      // 2) Actualización optimista local.
      setProducts((prev) =>
        prev.map((p) => {
          const it = items.find((x) => x.productId === p.id);
          return it ? { ...p, stockActual: Math.max(0, p.stockActual - it.cantidad) } : p;
        }),
      );

      // 3) Llamada atómica a PostgreSQL (función SECURITY DEFINER con FOR UPDATE).
      try {
        const payload = items.map((it) => ({ product_id: it.productId, cantidad: it.cantidad }));
        const { data, error } = await supabase.rpc("decrement_product_stock", {
          _items: payload as never,
        });

        if (error) throw new Error(error.message);

        // 4) Reconcilia stock con los valores autoritativos de la DB.
        if (Array.isArray(data)) {
          setProducts((prev) =>
            prev.map((p) => {
              const row = (data as Array<{ id: string; stock_actual: number }>).find(
                (r) => r.id === p.id,
              );
              return row ? { ...p, stockActual: row.stock_actual } : p;
            }),
          );
        }
        return { ok: true };
      } catch (err) {
        // 5) Rollback: restaurar snapshot previo a la operación.
        setProducts(snapshot);
        const message = err instanceof Error ? err.message : "Error desconocido en PostgreSQL";
        return { ok: false, error: message };
      }
    },
    [products],
  );

  const value = useMemo<InventoryContextValue>(
    () => ({ products, criticos: getCriticalProducts(products), checkoutDecrement, loading, refresh }),
    [products, checkoutDecrement, loading, refresh],
  );

  return <InventoryContext.Provider value={value}>{children}</InventoryContext.Provider>;
}

export function useInventoryContext(): InventoryContextValue {
  const ctx = useContext(InventoryContext);
  if (!ctx) throw new Error("useInventoryContext debe usarse dentro de <InventoryProvider>");
  return ctx;
}
