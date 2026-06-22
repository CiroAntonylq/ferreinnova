// Navbar corporativo superior — logo + nav legal + menú hamburguesa + carrito.
import { useNavigate } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import {
  BookOpen,
  Info,
  LayoutDashboard,
  LogIn,
  Menu,
  ShieldCheck,
  ShoppingCart,
  Store,
  Wrench,
  X,
} from "lucide-react";
import { toast } from "sonner";
import { useCartContext } from "@/context/cart-context";
import {
  AboutModal,
  ComplaintsModal,
  ContactModal,
  PrivacyModal,
} from "./legal/LegalModals";

export function CorporateNavbar() {
  const [about, setAbout] = useState(false);
  const [privacy, setPrivacy] = useState(false);
  const [contact, setContact] = useState(false);
  const [complaints, setComplaints] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);
  const navigate = useNavigate();
  const { count, openDrawer } = useCartContext();

  // Cierra el menú al hacer click fuera o con Escape.
  useEffect(() => {
    if (!menuOpen) return;
    const onClick = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [menuOpen]);

  const close = () => setMenuOpen(false);

  const handleAdmin = () => {
    close();
    toast.info("Validando credenciales del personal…", {
      description: "Redirigiendo al Panel Predictivo de Inventario.",
    });
    setTimeout(() => navigate({ to: "/admin" }), 600);
  };

  const handleLogin = () => {
    close();
    toast.message("Inicio de sesión", {
      description: "Módulo de autenticación en preparación.",
    });
  };

  const navItem =
    "text-[11px] font-bold uppercase tracking-wider text-slate-200 transition hover:text-orange-400";

  const menuItem =
    "flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-semibold text-slate-200 transition hover:bg-orange-500/10 hover:text-orange-300";

  return (
    <>
      <header
        data-testid="corporate-navbar"
        className="sticky top-0 z-30 border-b border-border bg-[#0b1220]/95 backdrop-blur-xl"
      >
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3 px-4 py-3 sm:px-6 lg:px-10">
          {/* Logo */}
          <button
            type="button"
            onClick={() => navigate({ to: "/tienda" })}
            data-testid="nav-logo"
            className="flex items-center gap-3 text-left"
          >
            <div className="grid h-11 w-11 place-items-center rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 shadow-lg shadow-orange-500/30">
              <Wrench className="h-5 w-5 text-neutral-950" strokeWidth={2.6} />
            </div>
            <div className="leading-tight">
              <p className="text-lg font-extrabold tracking-tight">
                <span className="text-orange-500">Ferre</span>
                <span className="text-sky-300">Innova</span>
              </p>
              <p className="text-[9px] font-semibold uppercase tracking-[0.18em] text-slate-400">
                Digital Strategy &amp; Supply
              </p>
            </div>
          </button>

          {/* Nav links */}
          <nav className="order-3 flex w-full flex-wrap items-center gap-x-5 gap-y-2 border-t border-border pt-3 lg:order-2 lg:w-auto lg:border-0 lg:pt-0">
            <button type="button" onClick={() => navigate({ to: "/tienda" })} data-testid="nav-inicio" className={navItem}>
              Inicio
            </button>
            <button type="button" onClick={() => setAbout(true)} data-testid="nav-about" className={navItem}>
              Acerca de
            </button>
            <button type="button" onClick={() => setPrivacy(true)} data-testid="nav-privacy" className={navItem}>
              Políticas de Privacidad
            </button>
            <button type="button" onClick={() => setContact(true)} data-testid="nav-contact" className={navItem}>
              Contacto
            </button>
          </nav>

          {/* Right actions */}
          <div className="order-2 flex items-center gap-2 lg:order-3">
            <button
              type="button"
              onClick={() => setComplaints(true)}
              data-testid="btn-complaints"
              className="inline-flex items-center gap-1.5 rounded-lg border border-orange-500/40 bg-orange-500/10 px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider text-orange-300 transition hover:bg-orange-500/20"
            >
              <BookOpen className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">Reclamaciones</span>
            </button>

            <button
              type="button"
              onClick={openDrawer}
              data-testid="btn-open-cart-corp"
              aria-label="Abrir carrito"
              className="relative inline-flex items-center gap-1.5 rounded-lg bg-orange-500 px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider text-neutral-950 transition hover:bg-orange-400"
            >
              <ShoppingCart className="h-3.5 w-3.5" />
              Carrito
              {count > 0 && (
                <span
                  data-testid="cart-count-corp"
                  className="ml-1 inline-flex h-4 min-w-4 items-center justify-center rounded-full bg-neutral-950 px-1 text-[9px] text-white"
                >
                  {count}
                </span>
              )}
            </button>

            {/* Menú hamburguesa */}
            <div ref={menuRef} className="relative">
              <button
                type="button"
                onClick={() => setMenuOpen((v) => !v)}
                data-testid="btn-menu-principal"
                aria-label="Abrir menú principal"
                aria-expanded={menuOpen}
                className="inline-flex h-8 w-9 items-center justify-center rounded-lg border border-slate-700 bg-slate-900/60 text-slate-200 transition hover:border-orange-500/60 hover:text-orange-300"
              >
                {menuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
              </button>

              <div
                data-testid="menu-principal-panel"
                className={`absolute right-0 top-[calc(100%+8px)] w-64 origin-top-right rounded-xl border border-slate-700/80 bg-[#0b1220] p-2 shadow-2xl shadow-black/50 ring-1 ring-white/5 transition-all duration-200 ${
                  menuOpen
                    ? "pointer-events-auto translate-y-0 opacity-100 scale-100"
                    : "pointer-events-none -translate-y-1 opacity-0 scale-95"
                }`}
              >
                <p className="px-3 pb-1 pt-2 text-[10px] font-bold uppercase tracking-[0.18em] text-slate-500">
                  Navegación
                </p>
                <button
                  type="button"
                  onClick={() => {
                    close();
                    navigate({ to: "/tienda" });
                  }}
                  data-testid="link-nav-tienda"
                  className={menuItem}
                >
                  <Store className="h-4 w-4 text-orange-400" /> Tienda
                </button>
                <button
                  type="button"
                  onClick={handleLogin}
                  data-testid="link-nav-login"
                  className={menuItem}
                >
                  <LogIn className="h-4 w-4 text-sky-400" /> Iniciar sesión
                </button>
                <button
                  type="button"
                  onClick={handleAdmin}
                  data-testid="link-nav-admin"
                  className={menuItem}
                >
                  <LayoutDashboard className="h-4 w-4 text-amber-400" /> Panel administrativo
                </button>

                <div className="my-2 h-px bg-slate-800" />
                <p className="px-3 pb-1 text-[10px] font-bold uppercase tracking-[0.18em] text-slate-500">
                  Corporativo
                </p>
                <button
                  type="button"
                  onClick={() => {
                    close();
                    setAbout(true);
                  }}
                  data-testid="link-nav-about"
                  className={menuItem}
                >
                  <Info className="h-4 w-4 text-slate-400" /> Acerca de
                </button>
                <button
                  type="button"
                  onClick={() => {
                    close();
                    setPrivacy(true);
                  }}
                  data-testid="link-nav-privacy"
                  className={menuItem}
                >
                  <ShieldCheck className="h-4 w-4 text-slate-400" /> Políticas
                </button>
                <button
                  type="button"
                  onClick={() => {
                    close();
                    setComplaints(true);
                  }}
                  data-testid="link-nav-complaints"
                  className={menuItem}
                >
                  <BookOpen className="h-4 w-4 text-slate-400" /> Reclamaciones
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      <AboutModal open={about} onOpenChange={setAbout} />
      <PrivacyModal open={privacy} onOpenChange={setPrivacy} />
      <ContactModal open={contact} onOpenChange={setContact} />
      <ComplaintsModal open={complaints} onOpenChange={setComplaints} />
    </>
  );
}
