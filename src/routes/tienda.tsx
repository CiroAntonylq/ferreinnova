import { createFileRoute } from "@tanstack/react-router";
import { ShoppingCart } from "lucide-react";
import { CartSummary } from "@/components/CartSummary";
import { ProductCard } from "@/components/ProductCard";
import { useCart } from "@/hooks/use-cart";
import { useInventory } from "@/hooks/use-inventory";

export const Route = createFileRoute("/tienda")({
  head: () => ({
    meta: [
      { title: "Tienda — FerreInnova" },
      {
        name: "description",
        content:
          "Catálogo de productos ferreteros con carrito de compras: cemento, herramientas, pinturas y eléctricos.",
      },
    ],
  }),
  component: TiendaPage,
});

function TiendaPage() {
  const { products } = useInventory();
  const { items, add, remove, clear, total, count } = useCart();

  return (
    <section data-testid="vista-tienda" className="space-y-8">
      <header className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-widest text-primary">
            E-commerce
          </p>
          <h1 className="mt-1 text-3xl font-bold tracking-tight">Catálogo Ferretero</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Productos seleccionados, precios competitivos y entrega inmediata.
          </p>
        </div>
        <span
          className="inline-flex items-center gap-2 self-start rounded-full border border-primary/30 bg-primary/10 px-3 py-1.5 text-xs font-semibold text-primary backdrop-blur"
          data-testid="badge-carrito-count"
        >
          <ShoppingCart className="h-3.5 w-3.5" />
          {count} {count === 1 ? "unidad" : "unidades"} en carrito
        </span>
      </header>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_340px]">
        <div
          data-testid="catalogo-grid"
          className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3"
        >
          {products.map((p) => (
            <ProductCard key={p.id} product={p} onAdd={add} />
          ))}
        </div>
        <CartSummary items={items} total={total} onRemove={remove} onClear={clear} />
      </div>
    </section>
  );
}
