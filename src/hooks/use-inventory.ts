// Hook que expone el inventario compartido a través del InventoryContext.
import { useInventoryContext } from "@/context/inventory-context";

export function useInventory() {
  const { products, criticos } = useInventoryContext();
  return { products, criticos };
}
