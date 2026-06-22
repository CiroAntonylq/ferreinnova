// Contexto global de inventario — compartido entre Tienda (cliente) y Panel Admin.
import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from "react";
import { MOCK_PRODUCTS, type Product } from "@/data/products";
import { getCriticalProducts } from "@/lib/inventory";
import type { CartItem } from "@/lib/cart";

interface InventoryContextValue {
  products: Product[];
  criticos: Product[];
  decreaseStock: (items: Pick<CartItem, "productId" | "cantidad">[]) => void;
}

const InventoryContext = createContext<InventoryContextValue | null>(null);

export function InventoryProvider({ children }: { children: ReactNode }) {
  const [products, setProducts] = useState<Product[]>(MOCK_PRODUCTS);

  const decreaseStock = useCallback(
    (items: Pick<CartItem, "productId" | "cantidad">[]) => {
      setProducts((prev) =>
        prev.map((p) => {
          const item = items.find((it) => it.productId === p.id);
          if (!item) return p;
          return { ...p, stockActual: Math.max(0, p.stockActual - item.cantidad) };
        }),
      );
    },
    [],
  );

  const value = useMemo<InventoryContextValue>(
    () => ({ products, criticos: getCriticalProducts(products), decreaseStock }),
    [products, decreaseStock],
  );

  return <InventoryContext.Provider value={value}>{children}</InventoryContext.Provider>;
}

export function useInventoryContext(): InventoryContextValue {
  const ctx = useContext(InventoryContext);
  if (!ctx) throw new Error("useInventoryContext debe usarse dentro de <InventoryProvider>");
  return ctx;
}
