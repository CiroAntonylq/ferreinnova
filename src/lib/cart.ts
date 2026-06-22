// Lógica pura del carrito de compras. Testeable con Vitest.
import type { Product } from "@/data/products";

export interface CartItem {
  productId: string;
  nombre: string;
  precio: number;
  cantidad: number;
}

/** Agrega un producto al carrito, incrementando si ya existe. */
export function addToCart(items: CartItem[], product: Product, cantidad = 1): CartItem[] {
  const idx = items.findIndex((i) => i.productId === product.id);
  if (idx >= 0) {
    const copy = [...items];
    copy[idx] = { ...copy[idx], cantidad: copy[idx].cantidad + cantidad };
    return copy;
  }
  return [
    ...items,
    { productId: product.id, nombre: product.nombre, precio: product.precio, cantidad },
  ];
}

/** Elimina por completo un producto del carrito. */
export function removeFromCart(items: CartItem[], productId: string): CartItem[] {
  return items.filter((i) => i.productId !== productId);
}

/** Subtotal del carrito. */
export function getCartTotal(items: CartItem[]): number {
  return items.reduce((acc, i) => acc + i.precio * i.cantidad, 0);
}

/** Cantidad total de unidades en el carrito. */
export function getCartCount(items: CartItem[]): number {
  return items.reduce((acc, i) => acc + i.cantidad, 0);
}
