import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "FerreInnova — Tienda de Materiales y Ferretería" },
      {
        name: "description",
        content:
          "Catálogo de tubos PVC, cemento Sol, fierro Arequipa, herramientas y eléctricos al mejor precio en Soles (S/.).",
      },
      { property: "og:title", content: "FerreInnova — Tienda de Materiales y Ferretería" },
      {
        property: "og:description",
        content: "Catálogo de materiales de construcción y ferretería en Perú.",
      },
    ],
  }),
  beforeLoad: () => {
    throw redirect({ to: "/tienda" });
  },
});

