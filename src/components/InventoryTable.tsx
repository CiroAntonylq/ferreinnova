// Tabla del inventario para el panel del administrador.
import type { Product } from "@/data/products";
import { getRiskState } from "@/lib/inventory";
import { RiskBadge } from "./RiskBadge";

interface Props {
  products: Product[];
}

/** Convierte un nombre de producto a un slug seguro para data-testid. */
function slug(value: string): string {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export function InventoryTable({ products }: Props) {
  return (
    <div className="overflow-x-auto rounded-lg border border-border bg-card">
      <table className="w-full text-sm" data-testid="tabla-inventario">
        <thead className="bg-muted text-muted-foreground">
          <tr>
            <th className="px-4 py-3 text-left font-medium">ID</th>
            <th className="px-4 py-3 text-left font-medium">Producto</th>
            <th className="px-4 py-3 text-right font-medium">Stock Actual</th>
            <th className="px-4 py-3 text-right font-medium">Stock Mínimo</th>
            <th className="px-4 py-3 text-left font-medium">Estado de Riesgo</th>
          </tr>
        </thead>
        <tbody>
          {products.map((p) => {
            const risk = getRiskState(p.stockActual, p.stockMinimo);
            const productSlug = slug(p.nombre.split(" ")[0]);
            return (
              <tr
                key={p.id}
                className="border-t border-border"
                data-testid={`fila-producto-${p.id}`}
              >
                <td className="px-4 py-3 font-mono text-xs">{p.id}</td>
                <td className="px-4 py-3 font-medium">{p.nombre}</td>
                <td className="px-4 py-3 text-right" data-testid={`stock-actual-${p.id}`}>
                  {p.stockActual}
                </td>
                <td className="px-4 py-3 text-right">{p.stockMinimo}</td>
                <td className="px-4 py-3">
                  <RiskBadge
                    state={risk}
                    testId={
                      risk === "critical"
                        ? `alerta-reorden-${productSlug}`
                        : `estado-${productSlug}`
                    }
                  />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
