// Layout principal de ancho completo con navbar superior unificado.
import { Outlet } from "@tanstack/react-router";
import { Toaster } from "@/components/ui/sonner";
import { CartProvider } from "@/context/cart-context";
import { CartDrawer } from "./CartDrawer";
import { CorporateNavbar } from "./CorporateNavbar";
import { SiteFooter } from "./SiteFooter";
import { CookieBanner } from "./CookieBanner";

export function AppShell() {
  return (
    <CartProvider>
      <div className="dark min-h-screen w-full bg-background text-foreground">
        {/* Ambient glow */}
        <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
          <div className="absolute -top-40 -right-40 h-[480px] w-[480px] rounded-full bg-orange-500/10 blur-[120px]" />
          <div className="absolute top-1/2 -left-40 h-[420px] w-[420px] rounded-full bg-amber-400/5 blur-[120px]" />
        </div>

        <CorporateNavbar />
        <main className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-10">
          <Outlet />
        </main>
        <SiteFooter />

        <CartDrawer />
        <CookieBanner />
        <Toaster richColors closeButton position="top-right" />
      </div>
    </CartProvider>
  );
}
