import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, BarChart3, Brain, ShoppingBag, Wrench } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "FerreInnova — Panel Predictivo Ferretero" },
      {
        name: "description",
        content:
          "Sistema predictivo de inventario y e-commerce para ferreterías. Alertas de reabastecimiento y catálogo en tiempo real.",
      },
      { property: "og:title", content: "FerreInnova" },
      {
        property: "og:description",
        content: "Panel predictivo de inventario y e-commerce ferretero.",
      },
    ],
  }),
  component: Index,
});

const FEATURES = [
  {
    icon: BarChart3,
    title: "Inventario Inteligente",
    desc: "Monitorea stock en tiempo real con semaforización automática y alertas críticas.",
  },
  {
    icon: Brain,
    title: "Motor Predictivo IA",
    desc: "Predicciones de reabastecimiento basadas en históricos, estacionalidad y demanda.",
  },
  {
    icon: ShoppingBag,
    title: "E-commerce Integrado",
    desc: "Tienda moderna con catálogo, carrito y experiencia de compra premium.",
  },
];

function Index() {
  return (
    <section className="space-y-12 py-6" data-testid="vista-home">
      {/* Hero */}
      <div className="relative overflow-hidden rounded-3xl border border-border bg-card/60 p-8 shadow-2xl shadow-black/30 backdrop-blur-xl sm:p-12">
        <div className="absolute inset-0 -z-10 bg-grid-faint opacity-40" />
        <div className="absolute -top-32 -right-32 -z-10 h-96 w-96 rounded-full bg-orange-500/20 blur-3xl" />

        <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-widest text-primary">
          <Wrench className="h-3 w-3" /> Predictive Ferretería Suite
        </div>
        <h1 className="mt-4 max-w-3xl text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
          FerreInnova — el panel{" "}
          <span className="bg-gradient-to-r from-amber-400 via-orange-500 to-fuchsia-500 bg-clip-text text-transparent">
            predictivo
          </span>{" "}
          que tu ferretería necesita.
        </h1>
        <p className="mt-4 max-w-2xl text-base text-muted-foreground sm:text-lg">
          Inventario inteligente, alertas de reabastecimiento y e-commerce de nivel premium en un
          solo lugar.
        </p>

        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            to="/admin"
            data-testid="cta-admin"
            className="group inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-amber-500 to-orange-600 px-5 py-3 text-sm font-semibold text-neutral-950 shadow-lg shadow-orange-600/30 transition hover:shadow-orange-500/50"
          >
            Ir al Panel del Administrador
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
          <Link
            to="/tienda"
            data-testid="cta-tienda"
            className="inline-flex items-center gap-2 rounded-xl border border-border bg-card/80 px-5 py-3 text-sm font-semibold backdrop-blur transition hover:bg-accent"
          >
            Visitar la Tienda
          </Link>
        </div>
      </div>

      {/* Features */}
      <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
        {FEATURES.map(({ icon: Icon, title, desc }) => (
          <div
            key={title}
            className="rounded-2xl border border-border bg-card/60 p-6 shadow-xl shadow-black/10 backdrop-blur-xl transition hover:-translate-y-0.5 hover:border-primary/40"
          >
            <div className="grid h-11 w-11 place-items-center rounded-xl bg-primary/15 text-primary">
              <Icon className="h-5 w-5" />
            </div>
            <h3 className="mt-4 text-base font-semibold">{title}</h3>
            <p className="mt-1.5 text-sm text-muted-foreground">{desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
