// Hook que expone el inventario simulado (futuro reemplazo: Supabase).
import { useState } from "react";
import { MOCK_PRODUCTS, type Product } from "@/data/products";
import { getCriticalProducts } from "@/lib/inventory";

export function useInventory() {
  const [products] = useState<Product[]>(MOCK_PRODUCTS);
  return {
    products,
    criticos: getCriticalProducts(products),
  };
}
