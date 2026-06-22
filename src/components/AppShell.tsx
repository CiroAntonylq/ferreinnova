// Layout principal con sidebar fija y contenido scrollable.
import { Link, Outlet, useRouterState } from "@tanstack/react-router";
import { LayoutDashboard, Menu, Store } from "lucide-react";
import { useState } from "react";
import { Sidebar } from "./Sidebar";

export function AppShell() {
  return (
    <div className="dark min-h-screen bg-background text-foreground">
      {/* Ambient glow */}
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-40 -right-40 h-[480px] w-[480px] rounded-full bg-orange-500/10 blur-[120px]" />
        <div className="absolute top-1/2 -left-40 h-[420px] w-[420px] rounded-full bg-amber-400/5 blur-[120px]" />
      </div>

      <Sidebar />
      <MobileNav />

      <div className="md:pl-[240px]">
        <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-10">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

/* Compact top bar for mobile (sidebar is hidden < md). */
function MobileNav() {
  const [open, setOpen] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  return (
    <header className="sticky top-0 z-30 flex items-center justify-between border-b border-border bg-card/80 px-4 py-3 backdrop-blur-xl md:hidden">
      <Link to="/" className="flex items-center gap-2" data-testid="nav-home-mobile">
        <span className="rounded-lg bg-gradient-to-br from-amber-500 to-orange-600 px-2 py-1 text-xs font-bold text-neutral-950">
          FI
        </span>
        <span className="text-sm font-semibold">FerreInnova</span>
      </Link>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="rounded-lg border border-border p-2"
        aria-label="Menu"
      >
        <Menu className="h-4 w-4" />
      </button>
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
