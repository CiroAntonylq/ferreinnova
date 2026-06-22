import { createFileRoute } from "@tanstack/react-router";
import { AlertTriangle, Boxes, LineChart, ShieldCheck } from "lucide-react";
import { AiPredictivePanel } from "@/components/AiPredictivePanel";
import { InventoryTable } from "@/components/InventoryTable";
import { KpiCard } from "@/components/KpiCard";
import { useInventory } from "@/hooks/use-inventory";
import { getRiskState } from "@/lib/inventory";

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

  const totalUnits = products.reduce((a, p) => a + p.stockActual, 0);
  const totalMin = products.reduce((a, p) => a + p.stockMinimo, 0);
  const healthy = products.filter((p) => getRiskState(p.stockActual, p.stockMinimo) === "ok")
    .length;
  const efectividad = Math.round((healthy / products.length) * 100);
  const prediccionMes = Math.round(totalUnits * 1.18);

  return (
    <section data-testid="vista-admin" className="space-y-8">
      {/* Header */}
      <header className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-widest text-primary">
            Dashboard
          </p>
          <h1 className="mt-1 text-3xl font-bold tracking-tight">Panel del Administrador</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Vista general del inventario, alertas y predicciones del motor IA.
          </p>
        </div>
        <div className="flex items-center gap-2 rounded-full border border-border bg-card/60 px-3 py-1.5 text-xs text-muted-foreground backdrop-blur">
          <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-400" />
          Datos en tiempo real
        </div>
      </header>

      {/* KPIs */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <KpiCard
          label="Efectividad de Stock"
          value={`${efectividad}%`}
          icon={ShieldCheck}
          progress={efectividad}
          accent="emerald"
          testId="kpi-efectividad"
        />
        <KpiCard
          label="Productos Críticos"
          value={criticos.length}
          icon={AlertTriangle}
          trend={-12}
          accent="amber"
          spark={[4, 3, 5, 2, 3, 2, criticos.length]}
          testId="kpi-criticos"
        />
        <KpiCard
          label="Unidades en Inventario"
          value={totalUnits}
          icon={Boxes}
          trend={8}
          accent="sky"
          spark={[40, 52, 48, 60, 55, 62, totalUnits]}
          testId="kpi-unidades"
        />
        <KpiCard
          label="Predicción del Mes"
          value={prediccionMes}
          icon={LineChart}
          trend={18}
          accent="violet"
          spark={[20, 28, 32, 30, 38, 44, prediccionMes / 2]}
          testId="kpi-prediccion"
        />
      </div>

      {/* Critical alert summary (legacy testid kept) */}
      <div
        data-testid="resumen-alertas"
        className="flex items-center gap-3 rounded-2xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-300 backdrop-blur"
      >
        <AlertTriangle className="h-4 w-4 animate-alert-pulse" />
        <p>
          <strong data-testid="conteo-criticos" className="font-bold text-red-400">
            {criticos.length}
          </strong>{" "}
          productos requieren reabastecimiento crítico — revisa las recomendaciones del motor IA.
        </p>
      </div>

      {/* AI Predictive */}
      <AiPredictivePanel criticos={criticos} />

      {/* Inventory table */}
      <InventoryTable products={products} />

      <p className="text-center text-[11px] text-muted-foreground">
        Stock mínimo · análisis predictivo · {products.length} SKUs activos
      </p>
    </section>
  );
}
