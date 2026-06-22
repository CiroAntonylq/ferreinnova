// Resumen lateral del carrito.
import type { CartItem } from "@/lib/cart";

interface Props {
  items: CartItem[];
  total: number;
  onRemove: (productId: string) => void;
  onClear: () => void;
}

export function CartSummary({ items, total, onRemove, onClear }: Props) {
  return (
    <aside
      data-testid="carrito-resumen"
      className="rounded-lg border border-border bg-card p-4 shadow-sm"
    >
      <h2 className="mb-3 text-base font-semibold text-card-foreground">
        Carrito ({items.length})
      </h2>

      {items.length === 0 ? (
        <p className="text-sm text-muted-foreground" data-testid="carrito-vacio">
          Tu carrito está vacío.
        </p>
      ) : (
        <ul className="space-y-2">
          {items.map((it) => (
            <li
              key={it.productId}
              data-testid={`carrito-item-${it.productId}`}
              className="flex items-center justify-between gap-2 border-b border-border pb-2 text-sm"
            >
              <div className="min-w-0 flex-1">
                <p className="truncate font-medium">{it.nombre}</p>
                <p className="text-xs text-muted-foreground">
                  {it.cantidad} × ${it.precio.toFixed(2)}
                </p>
              </div>
              <button
                type="button"
                onClick={() => onRemove(it.productId)}
                data-testid={`btn-eliminar-${it.productId}`}
                className="text-xs font-medium text-destructive hover:underline"
              >
                Quitar
              </button>
            </li>
          ))}
        </ul>
      )}

      <div className="mt-4 flex items-center justify-between border-t border-border pt-3">
        <span className="text-sm font-medium">Total</span>
        <span className="text-lg font-bold" data-testid="carrito-total">
          ${total.toFixed(2)}
        </span>
      </div>

      {items.length > 0 && (
        <button
          type="button"
          onClick={onClear}
          data-testid="btn-vaciar-carrito"
          className="mt-3 w-full rounded-md border border-border bg-background px-3 py-2 text-sm font-medium hover:bg-accent"
        >
          Vaciar carrito
        </button>
      )}
    </aside>
  );
}
