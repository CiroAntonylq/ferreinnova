// Tabla del inventario premium — lista moderna con iconos y hover elegante.
import { MoreHorizontal, PackageSearch, RefreshCw } from "lucide-react";
import type { Product } from "@/data/products";
import { getRiskState } from "@/lib/inventory";
import { RiskBadge } from "./RiskBadge";

interface Props {
  products: Product[];
}

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
    <div className="overflow-hidden rounded-2xl border border-border bg-card/60 shadow-xl shadow-black/20 backdrop-blur-xl">
      <div className="flex items-center justify-between border-b border-border px-5 py-4">
        <div>
          <h2 className="text-base font-semibold tracking-tight">Inventario en Vivo</h2>
          <p className="text-xs text-muted-foreground">
            Monitoreo continuo de stock y alertas de reabastecimiento.
          </p>
        </div>
        <div className="hidden items-center gap-2 sm:flex">
          <button className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-surface-2 px-3 py-1.5 text-xs font-medium text-muted-foreground transition hover:text-foreground">
            <PackageSearch className="h-3.5 w-3.5" /> Buscar
          </button>
          <button className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-surface-2 px-3 py-1.5 text-xs font-medium text-muted-foreground transition hover:text-foreground">
            <RefreshCw className="h-3.5 w-3.5" /> Sincronizar
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm" data-testid="tabla-inventario">
          <thead>
            <tr className="text-[11px] uppercase tracking-wider text-muted-foreground">
              <th className="px-5 py-3 text-left font-medium">SKU</th>
              <th className="px-5 py-3 text-left font-medium">Producto</th>
              <th className="px-5 py-3 text-right font-medium">Stock</th>
              <th className="px-5 py-3 text-right font-medium">Mínimo</th>
              <th className="px-5 py-3 text-left font-medium">Estado</th>
              <th className="w-10 px-5 py-3" />
            </tr>
          </thead>
          <tbody>
            {products.map((p) => {
              const risk = getRiskState(p.stockActual, p.stockMinimo);
              const productSlug = slug(p.nombre.split(" ")[0]);
              const ratio = Math.min(1, p.stockActual / Math.max(1, p.stockMinimo * 2));
              const bar =
                risk === "critical"
                  ? "bg-red-500"
                  : risk === "warning"
                    ? "bg-amber-400"
                    : "bg-emerald-400";
              return (
                <tr
                  key={p.id}
                  data-testid={`fila-producto-${p.id}`}
                  className="border-t border-border/60 transition-colors hover:bg-accent/40"
                >
                  <td className="px-5 py-4 font-mono text-[11px] text-muted-foreground">
                    {p.id}
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <div className="grid h-9 w-9 place-items-center rounded-lg bg-gradient-to-br from-zinc-700 to-zinc-900 text-sm font-bold text-amber-400 ring-1 ring-inset ring-white/5">
                        {p.nombre.charAt(0)}
                      </div>
                      <div className="min-w-0">
                        <p className="truncate font-medium text-foreground">{p.nombre}</p>
                        <p className="text-[11px] text-muted-foreground">{p.categoria}</p>
                      </div>
                    </div>
                  </td>
                  <td
                    className="px-5 py-4 text-right font-semibold tabular-nums"
                    data-testid={`stock-actual-${p.id}`}
                  >
                    <div className="inline-flex flex-col items-end gap-1">
                      <span>{p.stockActual}</span>
                      <span className="h-1 w-16 overflow-hidden rounded-full bg-white/5">
                        <span
                          className={`block h-full rounded-full ${bar}`}
                          style={{ width: `${Math.max(6, ratio * 100)}%` }}
                        />
                      </span>
                    </div>
                  </td>
                  <td className="px-5 py-4 text-right text-muted-foreground tabular-nums">
                    {p.stockMinimo}
                  </td>
                  <td className="px-5 py-4">
                    <RiskBadge
                      state={risk}
                      testId={
                        risk === "critical"
                          ? `alerta-reorden-${productSlug}`
                          : `estado-${productSlug}`
                      }
                    />
                  </td>
                  <td className="px-5 py-4 text-right">
                    <button
                      className="rounded-lg p-1.5 text-muted-foreground transition hover:bg-accent hover:text-foreground"
                      aria-label="Acciones"
                    >
                      <MoreHorizontal className="h-4 w-4" />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
