// Navbar corporativo superior — estilo "smartSAGE": logo + nav legal + acciones.
import { useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { BookOpen, ShieldCheck, ShoppingCart, Wrench } from "lucide-react";
import { useCartContext } from "@/context/cart-context";
import {
  AboutModal,
  ComplaintsModal,
  ContactModal,
  LocationsModal,
  PrivacyModal,
} from "./legal/LegalModals";

export function CorporateNavbar() {
  const [about, setAbout] = useState(false);
  const [privacy, setPrivacy] = useState(false);
  const [contact, setContact] = useState(false);
  const [complaints, setComplaints] = useState(false);
  const [locations, setLocations] = useState(false);
  const navigate = useNavigate();
  const { count, openDrawer } = useCartContext();

  const navItem =
    "text-[11px] font-bold uppercase tracking-wider text-slate-200 transition hover:text-orange-400";

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
            <button
              type="button"
              onClick={() => navigate({ to: "/tienda" })}
              data-testid="nav-inicio"
              className={navItem}
            >
              Inicio
            </button>
            <button
              type="button"
              onClick={() => setAbout(true)}
              data-testid="nav-about"
              className={navItem}
            >
              Acerca de
            </button>
            <button
              type="button"
              onClick={() => setPrivacy(true)}
              data-testid="nav-privacy"
              className={navItem}
            >
              Políticas de Privacidad
            </button>
            <button
              type="button"
              onClick={() => setContact(true)}
              data-testid="nav-contact"
              className={navItem}
            >
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
          </div>
        </div>

        {/* Trust bar */}
        <div className="border-t border-border bg-[#0a101c]">
          <div className="mx-auto flex max-w-7xl items-center justify-center gap-2 px-4 py-1.5 text-[10px] uppercase tracking-[0.2em] text-slate-500 sm:justify-start sm:px-6 lg:px-10">
          </div>
        </div>
      </header>

      <AboutModal open={about} onOpenChange={setAbout} />
      <PrivacyModal open={privacy} onOpenChange={setPrivacy} />
      <ContactModal open={contact} onOpenChange={setContact} />
      <ComplaintsModal open={complaints} onOpenChange={setComplaints} />
      <LocationsModal open={locations} onOpenChange={setLocations} />
    </>
  );
}
