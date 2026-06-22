// Layout principal con navegación entre módulos.
import { Link, Outlet } from "@tanstack/react-router";

export function AppShell() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="border-b border-border bg-card">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
          <Link to="/" className="flex items-center gap-2" data-testid="nav-home">
            <span className="rounded-md bg-primary px-2 py-1 text-sm font-bold text-primary-foreground">
              FI
            </span>
            <span className="font-semibold">FerreInnova</span>
          </Link>
          <nav className="flex items-center gap-1 text-sm">
            <Link
              to="/admin"
              data-testid="nav-admin"
              activeProps={{ className: "bg-accent text-accent-foreground" }}
              className="rounded-md px-3 py-1.5 font-medium hover:bg-accent"
            >
              Panel Admin
            </Link>
            <Link
              to="/tienda"
              data-testid="nav-tienda"
              activeProps={{ className: "bg-accent text-accent-foreground" }}
              className="rounded-md px-3 py-1.5 font-medium hover:bg-accent"
            >
              Tienda
            </Link>
          </nav>
        </div>
      </header>
      <main className="mx-auto max-w-7xl px-4 py-6">
        <Outlet />
      </main>
    </div>
  );
}
