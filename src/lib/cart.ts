// Lógica pura del carrito de compras. Testeable con Vitest.
import type { Product } from "@/data/products";

export interface CartItem {
  productId: string;
  nombre: string;
  precio: number;
  cantidad: number;
  imagen?: string;
}

/** IGV peruano (18%). */
export const IGV_RATE = 0.18;

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
    {
      productId: product.id,
      nombre: product.nombre,
      precio: product.precio,
      cantidad,
      imagen: product.imagen,
    },
  ];
}

/** Elimina por completo un producto del carrito. */
export function removeFromCart(items: CartItem[], productId: string): CartItem[] {
  return items.filter((i) => i.productId !== productId);
}

/** Ajusta la cantidad de un producto. Si <=0 lo elimina. */
export function setQuantity(items: CartItem[], productId: string, cantidad: number): CartItem[] {
  if (cantidad <= 0) return removeFromCart(items, productId);
  return items.map((i) => (i.productId === productId ? { ...i, cantidad } : i));
}

/** Subtotal del carrito (sin IGV). */
export function getCartTotal(items: CartItem[]): number {
  return items.reduce((acc, i) => acc + i.precio * i.cantidad, 0);
}

/** Cantidad total de unidades en el carrito. */
export function getCartCount(items: CartItem[]): number {
  return items.reduce((acc, i) => acc + i.cantidad, 0);
}

/** Desglose Subtotal / IGV / Total. */
export function getCartBreakdown(items: CartItem[]) {
  const subtotal = getCartTotal(items);
  const igv = subtotal * IGV_RATE;
  const total = subtotal + igv;
  return { subtotal, igv, total };
}
