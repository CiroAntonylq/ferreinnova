// Sección destacada del Motor Predictivo de IA — gradiente futurista.
import { Brain, Sparkles, Zap } from "lucide-react";
import type { Product } from "@/data/products";

interface Props {
  criticos: Product[];
}

export function AiPredictivePanel({ criticos }: Props) {
  const top = criticos.slice(0, 3);

  return (
    <section
      data-testid="motor-predictivo-ia"
      className="relative overflow-hidden rounded-2xl border border-white/10 p-6 shadow-2xl shadow-orange-900/20"
    >
      {/* Gradient backdrop */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-orange-600 via-fuchsia-700 to-indigo-700" />
      <div className="absolute inset-0 -z-10 opacity-30 bg-grid-faint" />
      <div className="absolute -top-20 -right-20 -z-10 h-72 w-72 rounded-full bg-amber-400/30 blur-3xl" />
      <div className="absolute -bottom-20 -left-20 -z-10 h-72 w-72 rounded-full bg-indigo-500/30 blur-3xl" />

      <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
        <div className="max-w-xl text-white">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-widest backdrop-blur">
            <Sparkles className="h-3 w-3" /> Motor Predictivo IA
          </div>
          <h2 className="mt-3 text-2xl font-bold tracking-tight sm:text-3xl">
            Predicciones inteligentes de reabastecimiento
          </h2>
          <p className="mt-2 text-sm text-white/80">
            Modelo entrenado con históricos de ventas, estacionalidad y comportamiento del cliente.
            Sugerimos órdenes de compra antes de que el stock se agote.
          </p>

          <div className="mt-5 flex flex-wrap gap-2">
            <button className="inline-flex items-center gap-2 rounded-xl bg-white px-4 py-2.5 text-sm font-semibold text-neutral-900 shadow-lg transition hover:shadow-xl">
              <Brain className="h-4 w-4" />
              Generar Predicción
            </button>
            <button className="inline-flex items-center gap-2 rounded-xl border border-white/30 bg-white/10 px-4 py-2.5 text-sm font-semibold text-white backdrop-blur transition hover:bg-white/20">
              <Zap className="h-4 w-4" />
              Auto-Orden
            </button>
          </div>
        </div>

        {/* Top recommendations */}
        <div className="w-full max-w-md">
          <p className="mb-2 text-[11px] font-semibold uppercase tracking-widest text-white/70">
            Recomendaciones del día
          </p>
          <ul className="space-y-2">
            {top.length === 0 ? (
              <li className="rounded-xl border border-white/15 bg-white/5 p-3 text-xs text-white/80 backdrop-blur">
                Sin alertas críticas. Inventario óptimo.
              </li>
            ) : (
              top.map((p) => {
                const sugerido = Math.max(p.stockMinimo * 2 - p.stockActual, p.stockMinimo);
                return (
                  <li
                    key={p.id}
                    className="flex items-center justify-between gap-3 rounded-xl border border-white/15 bg-white/5 p-3 backdrop-blur transition hover:bg-white/10"
                  >
                    <div className="min-w-0">
                      <p className="truncate text-xs font-semibold text-white">{p.nombre}</p>
                      <p className="text-[11px] text-white/70">
                        Stock {p.stockActual} · mínimo {p.stockMinimo}
                      </p>
                    </div>
                    <span className="shrink-0 rounded-full bg-white/90 px-2.5 py-1 text-[11px] font-bold text-neutral-900">
                      +{sugerido} uds
                    </span>
                  </li>
                );
              })
            )}
          </ul>
        </div>
      </div>
    </section>
  );
}
