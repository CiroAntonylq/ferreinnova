import { createFileRoute } from "@tanstack/react-router";
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
    <section data-testid="vista-tienda" className="space-y-6">
      <header className="flex items-end justify-between">
        <div>
          <h1 className="text-2xl font-bold">Catálogo Ferretero</h1>
          <p className="text-sm text-muted-foreground">
            Selecciona productos y agrégalos a tu carrito.
          </p>
        </div>
        <span
          className="rounded-full bg-primary px-3 py-1 text-xs font-semibold text-primary-foreground"
          data-testid="badge-carrito-count"
        >
          {count} en carrito
        </span>
      </header>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_320px]">
        <div
          data-testid="catalogo-grid"
          className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
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
