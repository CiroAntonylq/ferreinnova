// Barra lateral fija y colapsable para navegación principal.
import { Link, useRouterState } from "@tanstack/react-router";
import {
  ChevronsLeft,
  ChevronsRight,
  LayoutDashboard,
  Store,
  Wrench,
  Sparkles,
} from "lucide-react";
import { useState } from "react";

const NAV = [
  { to: "/", label: "Inicio", icon: Sparkles, testId: "nav-home" },
  { to: "/admin", label: "Panel Admin", icon: LayoutDashboard, testId: "nav-admin" },
  { to: "/tienda", label: "Tienda", icon: Store, testId: "nav-tienda" },
] as const;

export function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  return (
    <aside
      data-testid="sidebar"
      data-collapsed={collapsed}
      className={`fixed inset-y-0 left-0 z-40 hidden border-r border-border bg-card/80 backdrop-blur-xl transition-all duration-300 md:flex md:flex-col ${
        collapsed ? "w-[72px]" : "w-[240px]"
      }`}
    >
      {/* Brand */}
      <div className="flex h-16 items-center gap-3 border-b border-border px-4">
        <div className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 text-neutral-950 shadow-lg shadow-orange-500/20">
          <Wrench className="h-5 w-5" strokeWidth={2.4} />
        </div>
        {!collapsed && (
          <div className="min-w-0">
            <p className="truncate text-sm font-bold tracking-tight">FerreInnova</p>
            <p className="truncate text-[10px] uppercase tracking-widest text-muted-foreground">
              Predictive Panel
            </p>
          </div>
        )}
      </div>

      {/* Nav */}
      <nav className="flex-1 space-y-1 p-3">
        {NAV.map(({ to, label, icon: Icon, testId }) => {
          const active = pathname === to;
          return (
            <Link
              key={to}
              to={to}
              data-testid={testId}
              title={collapsed ? label : undefined}
              className={`group relative flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all ${
                active
                  ? "bg-primary/15 text-primary"
                  : "text-muted-foreground hover:bg-accent hover:text-foreground"
              }`}
            >
              {active && (
                <span className="absolute inset-y-2 left-0 w-0.5 rounded-r-full bg-primary" />
              )}
              <Icon className="h-5 w-5 shrink-0" strokeWidth={active ? 2.4 : 2} />
              {!collapsed && <span className="truncate">{label}</span>}
            </Link>
          );
        })}
      </nav>

      {/* Footer / Collapse */}
      <div className="border-t border-border p-3">
        <button
          type="button"
          onClick={() => setCollapsed((v) => !v)}
          data-testid="btn-toggle-sidebar"
          className="flex w-full items-center justify-center gap-2 rounded-xl border border-border bg-surface-2 px-3 py-2 text-xs font-medium text-muted-foreground transition hover:text-foreground"
        >
          {collapsed ? (
            <ChevronsRight className="h-4 w-4" />
          ) : (
            <>
              <ChevronsLeft className="h-4 w-4" />
              <span>Colapsar</span>
            </>
          )}
        </button>
      </div>
    </aside>
  );
}
