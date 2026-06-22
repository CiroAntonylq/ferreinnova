import { createFileRoute } from "@tanstack/react-router";
import { InventoryTable } from "@/components/InventoryTable";
import { useInventory } from "@/hooks/use-inventory";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      { title: "Panel del Administrador — FerreInnova" },
      {
        name: "description",
        content:
          "Dashboard de inventario ferretero con alertas predictivas de reabastecimiento crítico.",
      },
    ],
  }),
  component: AdminPage,
});

function AdminPage() {
  const { products, criticos } = useInventory();

  return (
    <section data-testid="vista-admin" className="space-y-6">
      <header>
        <h1 className="text-2xl font-bold">Dashboard del Administrador</h1>
        <p className="text-sm text-muted-foreground">
          Monitoreo de inventario y alertas de reabastecimiento crítico.
        </p>
      </header>

      <div
        data-testid="resumen-alertas"
        className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-800"
      >
        <strong data-testid="conteo-criticos">{criticos.length}</strong> productos requieren
        reabastecimiento crítico.
      </div>

      <InventoryTable products={products} />
    </section>
  );
}
