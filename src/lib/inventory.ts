// Lógica de negocio pura para inventario. 100% testeable con Vitest.
import type { Product } from "@/data/products";

export type RiskState = "ok" | "warning" | "critical";

/** Determina el estado de riesgo según stock actual vs mínimo. */
export function getRiskState(stockActual: number, stockMinimo: number): RiskState {
  if (stockActual <= stockMinimo) return "critical";
  if (stockActual <= stockMinimo * 1.5) return "warning";
  return "ok";
}

/** True si el producto requiere reabastecimiento. */
export function needsReorder(product: Pick<Product, "stockActual" | "stockMinimo">): boolean {
  return product.stockActual <= product.stockMinimo;
}

/** Filtra productos con alerta crítica. */
export function getCriticalProducts(products: Product[]): Product[] {
  return products.filter(needsReorder);
}

/** Etiqueta legible del estado de riesgo. */
export function getRiskLabel(state: RiskState): string {
  switch (state) {
    case "critical":
      return "Alerta: Reabastecimiento Crítico";
    case "warning":
      return "Stock Bajo";
    case "ok":
      return "Stock Saludable";
  }
}
