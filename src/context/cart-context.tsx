// Contexto global del carrito — comparte estado entre Navbar (drawer) y Tienda.
import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from "react";
import type { Product } from "@/data/products";
import {
  addToCart,
  getCartBreakdown,
  getCartCount,
  removeFromCart,
  setQuantity,
  type CartItem,
} from "@/lib/cart";

interface CartContextValue {
  items: CartItem[];
  add: (product: Product, cantidad?: number) => void;
  remove: (productId: string) => void;
  setQty: (productId: string, cantidad: number) => void;
  clear: () => void;
  count: number;
  subtotal: number;
  igv: number;
  total: number;
  // UI: control del drawer.
  drawerOpen: boolean;
  openDrawer: () => void;
  closeDrawer: () => void;
}

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const add = useCallback((product: Product, cantidad = 1) => {
    setItems((prev) => addToCart(prev, product, cantidad));
  }, []);
  const remove = useCallback((id: string) => setItems((prev) => removeFromCart(prev, id)), []);
  const setQty = useCallback(
    (id: string, q: number) => setItems((prev) => setQuantity(prev, id, q)),
    [],
  );
  const clear = useCallback(() => setItems([]), []);

  const value = useMemo<CartContextValue>(() => {
    const { subtotal, igv, total } = getCartBreakdown(items);
    return {
      items,
      add,
      remove,
      setQty,
      clear,
      count: getCartCount(items),
      subtotal,
      igv,
      total,
      drawerOpen,
      openDrawer: () => setDrawerOpen(true),
      closeDrawer: () => setDrawerOpen(false),
    };
  }, [items, add, remove, setQty, clear, drawerOpen]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCartContext(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCartContext debe usarse dentro de <CartProvider>");
  return ctx;
}
