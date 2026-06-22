// Hook personalizado que encapsula el estado del carrito sobre la lógica pura.
import { useCallback, useState } from "react";
import type { Product } from "@/data/products";
import {
  addToCart,
  getCartCount,
  getCartTotal,
  removeFromCart,
  type CartItem,
} from "@/lib/cart";

export function useCart(initial: CartItem[] = []) {
  const [items, setItems] = useState<CartItem[]>(initial);

  const add = useCallback((product: Product, cantidad = 1) => {
    setItems((prev) => addToCart(prev, product, cantidad));
  }, []);

  const remove = useCallback((productId: string) => {
    setItems((prev) => removeFromCart(prev, productId));
  }, []);

  const clear = useCallback(() => setItems([]), []);

  return {
    items,
    add,
    remove,
    clear,
    total: getCartTotal(items),
    count: getCartCount(items),
  };
}
