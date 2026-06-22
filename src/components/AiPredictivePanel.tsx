// Sección destacada del Motor Predictivo de IA — gradiente futurista.
import { useEffect, useState } from "react";
import { Brain, Loader2, Sparkles, X, Zap } from "lucide-react";
import { toast } from "sonner";
import type { Product } from "@/data/products";

interface Props {
  criticos: Product[];
}

export function AiPredictivePanel({ criticos }: Props) {
  const top = criticos.slice(0, 3);
  const [analyzing, setAnalyzing] = useState(false);
  const [autoOpen, setAutoOpen] = useState(false);

  useEffect(() => {
    if (!autoOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setAutoOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [autoOpen]);

  const handlePredict = () => {
    if (analyzing) return;
    setAnalyzing(true);
    setTimeout(() => {
      setAnalyzing(false);
      toast.success("¡Predicción de demanda recalculada con éxito con IA para el mercado local!");
    }, 2500);
  };

  const recomendaciones = [
    { nombre: "Cemento Sol", unidades: 27 },
    { nombre: "Cable Indeco", unidades: 58 },
  ];

  const handleConfirmar = () => {
    setAutoOpen(false);
    toast.success("Órdenes de compra enviadas exitosamente a los proveedores");
  };

  return (
    <section
      data-testid="motor-predictivo-ia"
      className="relative overflow-hidden rounded-2xl border border-white/10 p-6 shadow-2xl shadow-orange-900/20"
    >
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
            <button
              type="button"
              onClick={handlePredict}
              disabled={analyzing}
              data-testid="btn-generar-prediccion"
              className="inline-flex items-center gap-2 rounded-xl bg-white px-4 py-2.5 text-sm font-semibold text-neutral-900 shadow-lg transition hover:shadow-xl disabled:cursor-wait disabled:opacity-80"
            >
              {analyzing ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Analizando históricos...
                </>
              ) : (
                <>
                  <Brain className="h-4 w-4" />
                  Generar Predicción
                </>
              )}
            </button>
            <button
              type="button"
              onClick={() => setAutoOpen(true)}
              data-testid="btn-auto-orden"
              className="inline-flex items-center gap-2 rounded-xl border border-white/30 bg-white/10 px-4 py-2.5 text-sm font-semibold text-white backdrop-blur transition hover:bg-white/20"
            >
              <Zap className="h-4 w-4" />
              Auto-Orden
            </button>
          </div>
        </div>

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
                const total = sugerido * p.precio;
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
                    <div className="flex shrink-0 flex-col items-end gap-1">
                      <span className="rounded-full bg-white/90 px-2.5 py-1 text-[11px] font-bold text-neutral-900">
                        +{sugerido} uds
                      </span>
                      <span className="text-[11px] font-semibold text-amber-300">
                        S/. {total.toFixed(2)}
                      </span>
                    </div>
                  </li>
                );
              })
            )}
          </ul>
        </div>
      </div>

      {/* Auto-Orden Modal (dark) */}
      {autoOpen && (
        <div
          data-testid="modal-auto-orden"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm"
          onClick={() => setAutoOpen(false)}
        >
          <div
            role="dialog"
            aria-modal="true"
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-md rounded-2xl border border-white/10 bg-[#0b1220] p-6 text-white shadow-2xl shadow-black/60 ring-1 ring-white/5"
          >
            <div className="mb-4 flex items-start justify-between gap-3">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-widest text-amber-300">
                  <Zap className="h-3 w-3" /> Auto-Orden
                </div>
                <h3 className="mt-2 text-lg font-bold">
                  ¿Confirmar generación automática de órdenes de compra?
                </h3>
                <p className="mt-1 text-xs text-white/60">
                  Se enviarán las siguientes órdenes a los proveedores aliados.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setAutoOpen(false)}
                aria-label="Cerrar"
                className="rounded-lg p-1.5 text-white/60 transition hover:bg-white/10 hover:text-white"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <ul className="space-y-2">
              {recomendaciones.map((r) => (
                <li
                  key={r.nombre}
                  className="flex items-center justify-between rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm"
                >
                  <span className="font-medium">{r.nombre}</span>
                  <span className="rounded-full bg-amber-400/90 px-2.5 py-0.5 text-xs font-bold text-neutral-900">
                    +{r.unidades} uds
                  </span>
                </li>
              ))}
            </ul>

            <div className="mt-5 flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setAutoOpen(false)}
                className="rounded-xl border border-white/15 bg-white/5 px-4 py-2 text-sm font-semibold text-white/80 transition hover:bg-white/10"
              >
                Cancelar
              </button>
              <button
                type="button"
                data-testid="btn-confirmar-auto-orden"
                onClick={handleConfirmar}
                className="rounded-xl bg-gradient-to-r from-amber-500 to-orange-600 px-4 py-2 text-sm font-semibold text-neutral-950 shadow-lg shadow-orange-900/40 transition hover:shadow-orange-500/40"
              >
                Confirmar Envío
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
