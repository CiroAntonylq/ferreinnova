import { createFileRoute, Link } from "@tanstack/react-router";

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

function Index() {
  return (
    <section className="mx-auto max-w-3xl py-12 text-center" data-testid="vista-home">
      <h1 className="text-4xl font-bold tracking-tight">FerreInnova</h1>
      <p className="mt-3 text-muted-foreground">
        Panel predictivo de inventario y e-commerce para ferreterías.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Link
          to="/admin"
          data-testid="cta-admin"
          className="rounded-md bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground hover:bg-primary/90"
        >
          Ir al Panel del Administrador
        </Link>
        <Link
          to="/tienda"
          data-testid="cta-tienda"
          className="rounded-md border border-border bg-background px-5 py-2.5 text-sm font-medium hover:bg-accent"
        >
          Visitar la Tienda
        </Link>
      </div>
    </section>
  );
}
