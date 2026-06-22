// Resumen lateral del carrito — diseño glass moderno.
import { ShoppingBag, Trash2, X } from "lucide-react";
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
      className="sticky top-6 rounded-2xl border border-border bg-card/70 p-5 shadow-xl shadow-black/20 backdrop-blur-xl"
    >
      <header className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="grid h-9 w-9 place-items-center rounded-xl bg-primary/15 text-primary">
            <ShoppingBag className="h-4 w-4" />
          </div>
          <div>
            <h2 className="text-sm font-semibold text-card-foreground">Tu Carrito</h2>
            <p className="text-[11px] text-muted-foreground">
              {items.length} {items.length === 1 ? "producto" : "productos"}
            </p>
          </div>
        </div>
      </header>

      {items.length === 0 ? (
        <div
          data-testid="carrito-vacio"
          className="rounded-xl border border-dashed border-border bg-surface-2/50 p-6 text-center"
        >
          <ShoppingBag className="mx-auto h-8 w-8 text-muted-foreground/50" />
          <p className="mt-2 text-xs text-muted-foreground">Tu carrito está vacío.</p>
        </div>
      ) : (
        <ul className="space-y-2">
          {items.map((it) => (
            <li
              key={it.productId}
              data-testid={`carrito-item-${it.productId}`}
              className="group flex items-center gap-3 rounded-xl border border-border/60 bg-surface-2/60 p-3 transition hover:border-border"
            >
              <div className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-gradient-to-br from-zinc-700 to-zinc-900 text-xs font-bold text-amber-400 ring-1 ring-inset ring-white/5">
                {it.nombre.charAt(0)}
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-xs font-medium">{it.nombre}</p>
                <p className="text-[11px] text-muted-foreground">
                  {it.cantidad} × S/. {it.precio.toFixed(2)}
                </p>
              </div>
              <button
                type="button"
                onClick={() => onRemove(it.productId)}
                data-testid={`btn-eliminar-${it.productId}`}
                aria-label="Quitar"
                className="rounded-lg p-1.5 text-muted-foreground transition hover:bg-red-500/10 hover:text-red-400"
              >
                <X className="h-4 w-4" />
              </button>
            </li>
          ))}
        </ul>
      )}

      <div className="mt-5 space-y-3 border-t border-border pt-4">
        <div className="flex items-center justify-between">
          <span className="text-xs uppercase tracking-widest text-muted-foreground">Total</span>
          <span
            className="text-2xl font-bold tracking-tight text-foreground"
            data-testid="carrito-total"
          >
            S/. {total.toFixed(2)}
          </span>
        </div>

        {items.length > 0 && (
          <div className="flex flex-col gap-2">
            <button
              type="button"
              className="inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-amber-500 to-orange-600 px-3 py-2.5 text-sm font-semibold text-neutral-950 shadow-lg shadow-orange-600/20 transition hover:shadow-orange-500/40"
            >
              Finalizar Compra
            </button>
            <button
              type="button"
              onClick={onClear}
              data-testid="btn-vaciar-carrito"
              className="inline-flex items-center justify-center gap-1.5 rounded-xl border border-border bg-transparent px-3 py-2 text-xs font-medium text-muted-foreground transition hover:bg-accent hover:text-foreground"
            >
              <Trash2 className="h-3.5 w-3.5" /> Vaciar carrito
            </button>
          </div>
        )}
      </div>
    </aside>
  );
}
