// Vista E-commerce — estética industrial limpia (blanco/gris + naranja + azul marino).
import { createFileRoute } from "@tanstack/react-router";
import {
  Cable,
  Download,
  HardHat,
  Hammer,
  Layers,
  Minus,
  Plus,
  Search,
  ShoppingCart,
  Sparkles,
} from "lucide-react";
import { useMemo, useRef, useState, type ComponentType } from "react";
import { toast } from "sonner";
import { type CategoriaSlug, type Product } from "@/data/products";
import { useCartContext } from "@/context/cart-context";
import { useInventoryContext } from "@/context/inventory-context";

export const Route = createFileRoute("/tienda")({
  head: () => ({
    meta: [
      { title: "Tienda — FerreInnova | Materiales y Ferretería en Perú" },
      {
        name: "description",
        content:
          "Catálogo de tubos PVC, cemento Sol, fierro Arequipa, herramientas y eléctricos al mejor precio en Soles (S/.).",
      },
    ],
  }),
  component: TiendaPage,
});

type CatFilter = CategoriaSlug | "all";

interface CategoryCard {
  slug: CatFilter;
  label: string;
  desc: string;
  Icon: ComponentType<{ className?: string }>;
}

const CATEGORIES: CategoryCard[] = [
  {
    slug: "pvc",
    label: "Tuberías y Conexiones PVC",
    desc: "SAP, SAL y accesorios Pavco",
    Icon: Layers,
  },
  {
    slug: "herramientas",
    label: "Herramientas Manuales",
    desc: "Tramontina, Stanley y más",
    Icon: Hammer,
  },
  {
    slug: "construccion",
    label: "Materiales de Construcción",
    desc: "Cemento Sol, Fierro Arequipa",
    Icon: HardHat,
  },
  { slug: "electricidad", label: "Electricidad", desc: "Cables, llaves y tableros", Icon: Cable },
];

function TiendaPage() {
  const [filter, setFilter] = useState<CatFilter>("all");
  const [query, setQuery] = useState("");
  const { add, count, openDrawer } = useCartContext();
  const { products } = useInventoryContext();
  const catalogRef = useRef<HTMLDivElement>(null);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return products.filter((p) => {
      const matchCat = filter === "all" || p.categoriaSlug === filter;
      const matchQ =
        q.length === 0 ||
        p.nombre.toLowerCase().includes(q) ||
        p.categoria.toLowerCase().includes(q);
      return matchCat && matchQ;
    });
  }, [filter, query, products]);

  const scrollToCatalog = () => {
    catalogRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const handleDownloadCatalog = () => {
    toast.success("Catálogo PDF descargado", {
      description: "Revisa tu carpeta de descargas (simulado).",
    });
  };

  const handleAdd = (p: Product) => {
    add(p, 1);
    toast.success("Añadido al carrito", { description: p.nombre });
  };

  return (
    <section
      data-testid="vista-tienda"
      className="-mx-4 -my-8 bg-slate-50 text-slate-900 sm:-mx-6 lg:-mx-10"
    >
      {/* HERO */}
      <div
        data-testid="hero-section"
        className="relative overflow-hidden bg-slate-900 text-white"
      >
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.08]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,.4) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.4) 1px,transparent 1px)",
            backgroundSize: "44px 44px",
          }}
        />
        <div className="pointer-events-none absolute -right-32 -top-32 h-[480px] w-[480px] rounded-full bg-orange-500/20 blur-[120px]" />
        <div className="pointer-events-none absolute -bottom-40 left-1/3 h-[420px] w-[420px] rounded-full bg-blue-500/10 blur-[120px]" />

        <div className="relative mx-auto grid max-w-7xl gap-10 px-6 py-16 lg:grid-cols-[1.3fr_1fr] lg:py-24">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-[11px] font-semibold uppercase tracking-widest text-orange-300 backdrop-blur">
              <Sparkles className="h-3.5 w-3.5" /> DISTRIBUIDOR AUTORIZADO - PERÚ
            </span>
            <h1 className="mt-5 text-4xl font-extrabold leading-[1.1] tracking-tight sm:text-5xl lg:text-6xl">
              Tu socio estratégico en{" "}
              <span className="text-orange-400">materiales de construcción</span> y ferretería.
            </h1>
            <p className="mt-5 max-w-xl text-base text-slate-300">
              Tuberías PVC certificadas, cemento Sol, fierro Aceros Arequipa y herramientas
              profesionales con entrega en obra a todo Lima Metropolitana.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <button
                type="button"
                onClick={scrollToCatalog}
                data-testid="btn-explorar-productos"
                className="inline-flex items-center gap-2 rounded-xl bg-orange-500 px-5 py-3 text-sm font-bold text-white shadow-xl shadow-orange-500/30 transition hover:bg-orange-600 active:scale-[0.98]"
              >
                Explorar Productos
              </button>
              <button
                type="button"
                onClick={handleDownloadCatalog}
                data-testid="btn-descargar-catalogo"
                className="inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/5 px-5 py-3 text-sm font-semibold text-white backdrop-blur transition hover:bg-white/10"
              >
                <Download className="h-4 w-4" /> Descargar Catálogo PDF
              </button>
            </div>

            <dl className="mt-10 grid max-w-lg grid-cols-3 gap-6 border-t border-white/10 pt-6 text-sm">
              <div>
                <dt className="text-[11px] uppercase tracking-widest text-slate-400">Productos</dt>
                <dd className="mt-1 text-2xl font-bold text-white">+500</dd>
              </div>
              <div>
                <dt className="text-[11px] uppercase tracking-widest text-slate-400">Marcas</dt>
                <dd className="mt-1 text-2xl font-bold text-white">35</dd>
              </div>
              <div>
                <dt className="text-[11px] uppercase tracking-widest text-slate-400">OBRAS 2026</dt>
                <dd className="mt-1 text-2xl font-bold text-white">320+</dd>
              </div>
            </dl>
          </div>

          {/* Floating hero card */}
          <div className="relative hidden lg:block">
            <div className="absolute right-0 top-1/2 w-full -translate-y-1/2 rounded-3xl border border-white/10 bg-gradient-to-br from-slate-800/80 to-slate-900/40 p-6 shadow-2xl backdrop-blur">
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span>OFERTA DE LA SEMANA</span>
                <span className="rounded-full bg-orange-500/20 px-2 py-0.5 text-orange-300">
                  -12%
                </span>
              </div>
              <p className="mt-3 text-lg font-bold text-white">
                Cemento Sol Portland Tipo I · Bolsa 42.5 kg
              </p>
              <p className="mt-1 text-xs text-slate-400">Mínimo 10 bolsas · entrega 24h</p>
              <div className="mt-5 flex items-end justify-between">
                <div>
                  <p className="text-xs text-slate-400 line-through">S/. 32.80</p>
                  <p className="text-3xl font-extrabold text-orange-400">S/. 28.90</p>
                </div>
                <button
                  type="button"
                  onClick={openDrawer}
                  className="inline-flex items-center gap-1.5 rounded-lg bg-white/10 px-3 py-2 text-xs font-semibold text-white hover:bg-white/15"
                >
                  <ShoppingCart className="h-3.5 w-3.5" /> Ver carrito ({count})
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CATEGORIES */}
      <div className="mx-auto max-w-7xl px-6 py-14">
        <div className="mb-8 flex items-end justify-between">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-widest text-orange-600">
              Líneas destacadas
            </p>
            <h2 className="mt-1 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
              Encuentra exactamente lo que tu obra necesita
            </h2>
          </div>
          {filter !== "all" && (
            <button
              type="button"
              onClick={() => setFilter("all")}
              data-testid="btn-clear-filter"
              className="hidden rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-xs font-medium text-slate-700 hover:bg-slate-100 sm:inline-block"
            >
              Ver todo
            </button>
          )}
        </div>

        <div
          data-testid="categorias-grid"
          className="grid grid-cols-2 gap-4 lg:grid-cols-4"
        >
          {CATEGORIES.map(({ slug, label, desc, Icon }) => {
            const active = filter === slug;
            return (
              <button
                key={slug}
                type="button"
                onClick={() => {
                  setFilter(active ? "all" : slug);
                  scrollToCatalog();
                }}
                data-testid={`btn-cat-${slug}`}
                aria-pressed={active}
                className={`group flex flex-col items-start gap-3 rounded-2xl border p-5 text-left shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-lg ${
                  active
                    ? "border-orange-500 bg-orange-50 ring-2 ring-orange-500/20"
                    : "border-slate-200 bg-white hover:border-orange-300"
                }`}
              >
                <span
                  className={`grid h-11 w-11 place-items-center rounded-xl transition ${
                    active
                      ? "bg-orange-500 text-white"
                      : "bg-slate-900 text-orange-400 group-hover:bg-orange-500 group-hover:text-white"
                  }`}
                >
                  <Icon className="h-5 w-5" />
                </span>
                <div>
                  <p className="text-sm font-bold leading-tight text-slate-900">{label}</p>
                  <p className="mt-1 text-xs text-slate-500">{desc}</p>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* CATALOG */}
      <div ref={catalogRef} className="mx-auto max-w-7xl px-6 pb-20">
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-slate-900">Catálogo</h2>
            <p className="mt-1 text-sm text-slate-500">
              {filtered.length} {filtered.length === 1 ? "producto encontrado" : "productos encontrados"}
              {filter !== "all" && (
                <>
                  {" "}
                  · filtro: <span className="font-semibold text-slate-700">{
                    CATEGORIES.find((c) => c.slug === filter)?.label
                  }</span>
                </>
              )}
            </p>
          </div>

          {/* Search */}
          <div className="flex w-full max-w-md items-center gap-2">
            <label className="relative flex-1">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Buscar: cemento, tubo PVC, fierro…"
                data-testid="input-search"
                className="w-full rounded-xl border border-slate-300 bg-white py-2.5 pl-10 pr-3 text-sm text-slate-900 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20"
              />
            </label>
            <button
              type="button"
              onClick={() => {
                setQuery("");
                setFilter("all");
                toast.success("Catálogo sincronizado", {
                  description: "Datos actualizados con inventario.",
                });
              }}
              data-testid="btn-sync"
              className="inline-flex items-center gap-1.5 rounded-xl bg-slate-900 px-3 py-2.5 text-xs font-semibold text-white transition hover:bg-slate-800"
            >
              Sincronizar
            </button>
          </div>
        </div>

        {filtered.length === 0 ? (
          <div
            data-testid="empty-state"
            className="rounded-2xl border border-dashed border-slate-300 bg-white p-12 text-center"
          >
            <p className="text-sm font-medium text-slate-700">No encontramos productos</p>
            <p className="mt-1 text-xs text-slate-500">
              Ajusta el filtro o intenta otro término de búsqueda.
            </p>
          </div>
        ) : (
          <div
            data-testid="catalogo-grid"
            className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
          >
            {filtered.map((p) => (
              <ProductCardLight key={p.id} product={p} onAdd={handleAdd} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

/* ───────────────── Product card (light, industrial) ───────────────── */

function slug(value: string): string {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function ProductCardLight({
  product,
  onAdd,
}: {
  product: Product;
  onAdd: (p: Product) => void;
}) {
  const [qty, setQty] = useState(1);
  const sl = slug(product.nombre.split(" ").slice(0, 2).join(" "));
  const agotado = product.stockActual === 0;

  return (
    <article
      data-testid={`tarjeta-producto-${product.id}`}
      className="group flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all hover:-translate-y-1 hover:border-orange-300 hover:shadow-xl"
    >
      <div className="relative aspect-[16/10] overflow-hidden rounded-t-2xl bg-slate-100">
        <img
          src={product.imagen}
          alt={product.nombre}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <span className="absolute left-3 top-3 rounded-full bg-white/95 px-2 py-0.5 text-[9px] font-semibold uppercase tracking-wider text-slate-700 shadow-sm">
          {product.categoria}
        </span>
        {product.stockActual <= product.stockMinimo && !agotado && (
          <span className="absolute right-3 top-3 rounded-full bg-amber-500 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-white shadow-md">
            Últimas {product.stockActual}
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-2 p-4">
        <h3 className="line-clamp-2 min-h-[2rem] text-xs font-bold leading-snug text-slate-900">
          {product.nombre}
        </h3>

        <div className="flex items-end justify-between">
          <div>
            <p className="text-[9px] font-medium uppercase tracking-wider text-slate-500">
              Precio
            </p>
            <p
              data-testid={`precio-${product.id}`}
              className="text-xl font-extrabold tracking-tight text-slate-900"
            >
              <span className="text-xs font-semibold text-slate-500">S/. </span>
              {product.precio.toFixed(2)}
            </p>
          </div>
          <span
            className={`text-[9px] font-semibold uppercase tracking-wider ${
              agotado ? "text-red-600" : "text-emerald-600"
            }`}
          >
            {agotado ? "Agotado" : `${product.stockActual} disp.`}
          </span>
        </div>

        <div className="mt-auto flex items-center gap-2">
          <div className="inline-flex items-center rounded-xl border border-slate-200 bg-slate-50">
            <button
              type="button"
              onClick={() => setQty((q) => Math.max(1, q - 1))}
              data-testid={`btn-qty-minus-${product.id}`}
              aria-label="Disminuir"
              className="grid h-8 w-8 place-items-center text-slate-600 hover:text-slate-900"
            >
              <Minus className="h-3.5 w-3.5" />
            </button>
            <span
              data-testid={`qty-input-${product.id}`}
              className="min-w-7 text-center text-sm font-semibold tabular-nums"
            >
              {qty}
            </span>
            <button
              type="button"
              onClick={() => setQty((q) => q + 1)}
              data-testid={`btn-qty-plus-${product.id}`}
              aria-label="Aumentar"
              className="grid h-8 w-8 place-items-center text-slate-600 hover:text-slate-900"
            >
              <Plus className="h-3.5 w-3.5" />
            </button>
          </div>
          <button
            type="button"
            disabled={agotado}
            onClick={() => {
              for (let i = 0; i < qty; i++) onAdd(product);
            }}
            data-testid={`btn-add-${sl}`}
            className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-orange-500 px-3 py-2 text-xs font-bold text-white shadow-md shadow-orange-500/30 transition hover:bg-orange-600 active:scale-[0.98] disabled:cursor-not-allowed disabled:bg-slate-300 disabled:shadow-none"
          >
            <ShoppingCart className="h-3.5 w-3.5" />
            {agotado ? "Sin stock" : "Añadir al carrito"}
          </button>
        </div>
      </div>
    </article>
  );
}
