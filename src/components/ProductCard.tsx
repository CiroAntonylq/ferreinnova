// Tarjeta de producto del catálogo e-commerce.
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

export function ProductCard({ product, onAdd }: Props) {
  const sl = slug(product.nombre.split(" ")[0]);
  const agotado = product.stockActual === 0;
  return (
    <article
      data-testid={`tarjeta-producto-${product.id}`}
      className="flex flex-col rounded-lg border border-border bg-card p-4 shadow-sm transition hover:shadow-md"
    >
      <div className="mb-3 flex h-32 items-center justify-center rounded-md bg-muted text-3xl font-bold text-muted-foreground">
        {product.nombre.charAt(0)}
      </div>
      <h3 className="text-sm font-semibold text-card-foreground">{product.nombre}</h3>
      <p className="text-xs text-muted-foreground">{product.categoria}</p>
      <div className="mt-3 flex items-center justify-between">
        <span className="text-lg font-bold text-foreground" data-testid={`precio-${product.id}`}>
          ${product.precio.toFixed(2)}
        </span>
        <span className="text-xs text-muted-foreground">Stock: {product.stockActual}</span>
      </div>
      <button
        type="button"
        disabled={agotado}
        onClick={() => onAdd(product)}
        data-testid={`btn-agregar-${sl}`}
        className="mt-4 inline-flex items-center justify-center rounded-md bg-primary px-3 py-2 text-sm font-medium text-primary-foreground transition hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {agotado ? "Agotado" : "Agregar al carrito"}
      </button>
    </article>
  );
}
