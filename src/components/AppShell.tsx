// Layout principal con sidebar fija, navbar superior con carrito y contenido scrollable.
import { Link, Outlet, useRouterState } from "@tanstack/react-router";
import { LayoutDashboard, Menu, ShoppingCart, Store } from "lucide-react";
import { useState } from "react";
import { Toaster } from "@/components/ui/sonner";
import { CartProvider, useCartContext } from "@/context/cart-context";
import { Sidebar } from "./Sidebar";
import { CartDrawer } from "./CartDrawer";

export function AppShell() {
  return (
    <CartProvider>
      <div className="dark min-h-screen bg-background text-foreground">
        {/* Ambient glow */}
        <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
          <div className="absolute -top-40 -right-40 h-[480px] w-[480px] rounded-full bg-orange-500/10 blur-[120px]" />
          <div className="absolute top-1/2 -left-40 h-[420px] w-[420px] rounded-full bg-amber-400/5 blur-[120px]" />
        </div>

        <Sidebar />
        <MobileNav />

        <div className="md:pl-[240px]">
          <TopBar />
          <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-10">
            <Outlet />
          </main>
        </div>

        <CartDrawer />
        <Toaster richColors closeButton position="top-right" />
      </div>
    </CartProvider>
  );
}

/* Top utility bar — visible en desktop con icono de carrito. */
function TopBar() {
  const { count, openDrawer } = useCartContext();
  return (
    <header className="sticky top-0 z-20 hidden h-14 items-center justify-end gap-3 border-b border-border bg-card/70 px-6 backdrop-blur-xl md:flex">
      <button
        type="button"
        onClick={openDrawer}
        data-testid="btn-open-cart"
        aria-label="Abrir carrito"
        className="relative inline-flex items-center gap-2 rounded-xl border border-border bg-surface-2/60 px-3 py-2 text-xs font-semibold text-foreground transition hover:bg-accent"
      >
        <ShoppingCart className="h-4 w-4 text-primary" />
        <span>Carrito</span>
        {count > 0 && (
          <span
            data-testid="cart-count-badge"
            className="ml-1 inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-orange-500 px-1.5 text-[10px] font-bold text-white"
          >
            {count}
          </span>
        )}
      </button>
    </header>
  );
}

/* Compact top bar for mobile (sidebar is hidden < md). */
function MobileNav() {
  const [open, setOpen] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const { count, openDrawer } = useCartContext();
  return (
    <header className="sticky top-0 z-30 flex items-center justify-between border-b border-border bg-card/80 px-4 py-3 backdrop-blur-xl md:hidden">
      <Link to="/" className="flex items-center gap-2" data-testid="nav-home-mobile">
        <span className="rounded-lg bg-gradient-to-br from-amber-500 to-orange-600 px-2 py-1 text-xs font-bold text-neutral-950">
          FI
        </span>
        <span className="text-sm font-semibold">FerreInnova</span>
      </Link>
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={openDrawer}
          data-testid="btn-open-cart-mobile"
          aria-label="Abrir carrito"
          className="relative rounded-lg border border-border p-2"
        >
          <ShoppingCart className="h-4 w-4 text-primary" />
          {count > 0 && (
            <span className="absolute -right-1 -top-1 inline-flex h-4 min-w-4 items-center justify-center rounded-full bg-orange-500 px-1 text-[9px] font-bold text-white">
              {count}
            </span>
          )}
        </button>
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="rounded-lg border border-border p-2"
          aria-label="Menu"
        >
          <Menu className="h-4 w-4" />
        </button>
      </div>
      {open && (
        <div className="absolute left-0 right-0 top-full border-b border-border bg-card p-3 shadow-xl">
          <Link
            to="/admin"
            onClick={() => setOpen(false)}
            data-testid="nav-admin-mobile"
            className={`flex items-center gap-2 rounded-lg px-3 py-2 text-sm ${
              pathname === "/admin" ? "bg-primary/15 text-primary" : ""
            }`}
          >
            <LayoutDashboard className="h-4 w-4" /> Panel Admin
          </Link>
          <Link
            to="/tienda"
            onClick={() => setOpen(false)}
            data-testid="nav-tienda-mobile"
            className={`flex items-center gap-2 rounded-lg px-3 py-2 text-sm ${
              pathname === "/tienda" ? "bg-primary/15 text-primary" : ""
            }`}
          >
            <Store className="h-4 w-4" /> Tienda
          </Link>
        </div>
      )}
    </header>
  );
}
