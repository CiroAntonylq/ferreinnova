// Tarjeta de producto del catálogo — estilo tech-store moderno.
import { Plus, Tag } from "lucide-react";
import type { Product } from "@/data/products";

interface Props {
  product: Product;
  onAdd: (product: Product) => void;
}

function slug(value: string): string {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

/** Deterministic "fake" discount derived from price for visual interest only. */
function fakeDiscount(price: number): number | null {
  const d = Math.round(price) % 4 === 0 ? 15 : Math.round(price) % 3 === 0 ? 10 : null;
  return d;
}

export function ProductCard({ product, onAdd }: Props) {
  const sl = slug(product.nombre.split(" ")[0]);
  const agotado = product.stockActual === 0;
  const discount = fakeDiscount(product.precio);
  const originalPrice = discount ? product.precio / (1 - discount / 100) : null;

  return (
    <article
      data-testid={`tarjeta-producto-${product.id}`}
      className="group relative flex flex-col overflow-hidden rounded-2xl border border-border bg-card/70 shadow-lg shadow-black/10 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-xl hover:shadow-orange-500/10"
    >
      {/* Discount badge */}
      {discount && (
        <span className="absolute right-3 top-3 z-10 inline-flex items-center gap-1 rounded-full bg-gradient-to-r from-orange-500 to-amber-500 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-neutral-950 shadow-lg shadow-orange-500/30">
          <Tag className="h-3 w-3" /> -{discount}%
        </span>
      )}

      {/* Image area */}
      <div className="relative flex h-40 items-center justify-center overflow-hidden bg-gradient-to-br from-zinc-800 via-zinc-900 to-neutral-950">
        <div className="absolute inset-0 bg-grid-faint opacity-40" />
        <span className="relative text-6xl font-black tracking-tighter text-transparent [-webkit-text-stroke:1.5px_theme(colors.amber.500)]">
          {product.nombre.charAt(0)}
        </span>
      </div>

      {/* Body */}
      <div className="flex flex-1 flex-col gap-3 p-4">
        <div>
          <p className="text-[10px] uppercase tracking-widest text-muted-foreground">
            {product.categoria}
          </p>
          <h3 className="mt-1 line-clamp-2 text-sm font-semibold leading-snug text-card-foreground">
            {product.nombre}
          </h3>
        </div>

        <div className="mt-auto flex items-end justify-between">
          <div className="flex flex-col">
            {originalPrice && (
              <span className="text-[11px] text-muted-foreground line-through">
                ${originalPrice.toFixed(2)}
              </span>
            )}
            <span
              className="text-xl font-bold tracking-tight text-foreground"
              data-testid={`precio-${product.id}`}
            >
              ${product.precio.toFixed(2)}
            </span>
          </div>
          <span
            className={`text-[10px] font-medium uppercase tracking-wider ${
              agotado ? "text-red-400" : "text-emerald-400"
            }`}
          >
            {agotado ? "Agotado" : `${product.stockActual} disp.`}
          </span>
        </div>

        <button
          type="button"
          disabled={agotado}
          onClick={() => onAdd(product)}
          data-testid={`btn-agregar-${sl}`}
          className="group/btn inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-amber-500 to-orange-600 px-3 py-2.5 text-sm font-semibold text-neutral-950 shadow-lg shadow-orange-600/20 transition-all hover:shadow-orange-500/40 active:scale-[0.98] disabled:cursor-not-allowed disabled:from-zinc-700 disabled:to-zinc-700 disabled:text-zinc-400 disabled:shadow-none"
        >
          <Plus className="h-4 w-4 transition-transform group-hover/btn:rotate-90" />
          {agotado ? "No disponible" : "Agregar al carrito"}
        </button>
      </div>
    </article>
  );
}
