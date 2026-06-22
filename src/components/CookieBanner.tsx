// Banner de cookies — Ley N° 29733 (Perú). Persistencia en localStorage.
import { useEffect, useState } from "react";
import { Cookie, X } from "lucide-react";

const STORAGE_KEY = "ferreinnova.cookies.accepted";

export function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!localStorage.getItem(STORAGE_KEY)) setVisible(true);
  }, []);

  if (!visible) return null;

  const accept = () => {
    localStorage.setItem(STORAGE_KEY, "true");
    setVisible(false);
  };

  return (
    <div
      data-testid="cookie-banner"
      className="fixed inset-x-3 bottom-3 z-50 mx-auto max-w-4xl rounded-2xl border border-border bg-card/95 p-4 shadow-2xl backdrop-blur-xl md:inset-x-auto md:left-1/2 md:-translate-x-1/2"
    >
      <div className="flex flex-col items-start gap-3 sm:flex-row sm:items-center">
        <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-orange-500/15 text-orange-400">
          <Cookie className="h-5 w-5" />
        </div>
        <p className="flex-1 text-xs leading-relaxed text-muted-foreground sm:text-sm">
          Utilizamos cookies propias y de terceros para mejorar su experiencia de compra. Al
          continuar navegando, acepta nuestra Política de Cookies.
        </p>
        <div className="flex gap-2 self-end sm:self-auto">
          <button
            type="button"
            onClick={accept}
            data-testid="btn-accept-cookies"
            className="rounded-lg bg-orange-500 px-4 py-2 text-xs font-bold text-neutral-950 transition hover:bg-orange-400"
          >
            Aceptar
          </button>
          <button
            type="button"
            onClick={() => setVisible(false)}
            data-testid="btn-close-cookies"
            aria-label="Cerrar"
            className="rounded-lg border border-border p-2 text-muted-foreground hover:text-foreground"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
