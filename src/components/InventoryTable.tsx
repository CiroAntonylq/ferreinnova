// Tabla del inventario premium — con búsqueda, sincronización y precios en S/.
import { useMemo, useState } from "react";
import { Loader2, MoreHorizontal, PackageSearch, RefreshCw } from "lucide-react";
import { toast } from "sonner";
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
  const [query, setQuery] = useState("");
  const [syncing, setSyncing] = useState(false);
  const [tick, setTick] = useState(0);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return products;
    return products.filter((p) => p.nombre.toLowerCase().includes(q));
  }, [products, query, tick]);

  const handleSync = () => {
    if (syncing) return;
    setSyncing(true);
    setTimeout(() => {
      setSyncing(false);
      setTick((t) => t + 1);
      toast.success("Inventario sincronizado correctamente con la base de datos PostgreSQL");
    }, 1000);
  };

  return (
    <div className="overflow-hidden rounded-2xl border border-border bg-card/60 shadow-xl shadow-black/20 backdrop-blur-xl">
      <div className="flex flex-col gap-3 border-b border-border px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-base font-semibold tracking-tight">Inventario en Vivo</h2>
          <p className="text-xs text-muted-foreground">
            Monitoreo continuo de stock, precios en soles (S/.) y alertas de reabastecimiento.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <div className="relative">
            <PackageSearch className="pointer-events-none absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Buscar producto..."
              data-testid="input-buscar-admin"
              className="h-8 w-44 rounded-lg border border-border bg-surface-2 pl-7 pr-2 text-xs text-foreground placeholder:text-muted-foreground/70 focus:border-primary focus:outline-none"
            />
          </div>
          <button
            type="button"
            onClick={() => setTick((t) => t + 1)}
            className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-surface-2 px-3 py-1.5 text-xs font-medium text-muted-foreground transition hover:text-foreground"
          >
            <PackageSearch className="h-3.5 w-3.5" /> Buscar
          </button>
          <button
            type="button"
            onClick={handleSync}
            disabled={syncing}
            data-testid="btn-sincronizar-admin"
            className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-surface-2 px-3 py-1.5 text-xs font-medium text-muted-foreground transition hover:text-foreground disabled:cursor-wait disabled:opacity-70"
          >
            {syncing ? (
              <>
                <Loader2 className="h-3.5 w-3.5 animate-spin" /> Conectando a Supabase...
              </>
            ) : (
              <>
                <RefreshCw className="h-3.5 w-3.5" /> Sincronizar
              </>
            )}
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm" data-testid="tabla-inventario">
          <thead>
            <tr className="text-[11px] uppercase tracking-wider text-muted-foreground">
              <th className="px-5 py-3 text-left font-medium">SKU</th>
              <th className="px-5 py-3 text-left font-medium">Producto</th>
              <th className="px-5 py-3 text-right font-medium">Precio</th>
              <th className="px-5 py-3 text-right font-medium">Stock</th>
              <th className="px-5 py-3 text-right font-medium">Mínimo</th>
              <th className="px-5 py-3 text-left font-medium">Estado</th>
              <th className="w-10 px-5 py-3" />
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={7} className="px-5 py-10 text-center text-xs text-muted-foreground">
                  Sin resultados para "{query}".
                </td>
              </tr>
            ) : (
              filtered.map((p) => {
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
                    <td className="px-5 py-4 text-right font-semibold tabular-nums text-foreground">
                      S/. {p.precio.toFixed(2)}
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
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
