// Pie de página corporativo del cliente — estilo smartSAGE.
import { useState } from "react";
import { BookOpen, Facebook, Instagram, Mail, MapPin, Phone, Wrench } from "lucide-react";
import { ComplaintsModal, PrivacyModal } from "./legal/LegalModals";

export function SiteFooter() {
  const [privacy, setPrivacy] = useState(false);
  const [complaints, setComplaints] = useState(false);

  return (
    <>
      <footer
        data-testid="site-footer"
        className="mt-16 border-t border-border bg-[#0b1220] text-slate-300"
      >
        <div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 sm:px-6 md:grid-cols-4 lg:px-10">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2">
              <div className="grid h-9 w-9 place-items-center rounded-lg bg-gradient-to-br from-amber-500 to-orange-600">
                <Wrench className="h-4 w-4 text-neutral-950" strokeWidth={2.6} />
              </div>
              <div>
                <p className="text-base font-extrabold">
                  <span className="text-orange-500">Ferre</span>
                  <span className="text-sky-300">Innova</span>
                </p>
                <p className="text-[9px] uppercase tracking-[0.18em] text-slate-500">
                  ESTRATEGIA DIGITAL &amp; SUMINISTRO
                </p>
              </div>
            </div>
            <p className="mt-4 text-xs leading-relaxed text-slate-400">
              Distribución ferretera inteligente con inventario predictivo en tiempo real.
              Huancayo, Junín — Perú.
            </p>
          </div>

          {/* Contacto */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-orange-400">
              Contacto
            </h4>
            <ul className="mt-4 space-y-2 text-xs">
              <li className="flex items-center gap-2">
                <Phone className="h-3.5 w-3.5 text-sky-400" /> (064) 234-567
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-3.5 w-3.5 text-sky-400" /> ventas@ferreinnova.pe
              </li>
              <li className="flex items-center gap-2">
                <MapPin className="h-3.5 w-3.5 text-sky-400" /> Jr. Real 1245, Huancayo
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-orange-400">Legal</h4>
            <ul className="mt-4 space-y-2 text-xs">
              <li>
                <button
                  onClick={() => setPrivacy(true)}
                  data-testid="footer-privacy"
                  className="hover:text-orange-400"
                >
                  Política de Privacidad
                </button>
              </li>
              <li>
                <button
                  onClick={() => setComplaints(true)}
                  data-testid="footer-complaints"
                  className="inline-flex items-center gap-1 hover:text-orange-400"
                >
                  <BookOpen className="h-3 w-3" /> Libro de Reclamaciones
                </button>
              </li>
              <li className="text-slate-500">Términos y Condiciones</li>
              <li className="text-slate-500">Política de Cookies</li>
            </ul>
          </div>

          {/* Redes */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-orange-400">Síguenos</h4>
            <div className="mt-4 flex gap-2">
              <a
                href="#"
                aria-label="Facebook"
                className="grid h-9 w-9 place-items-center rounded-lg border border-border hover:bg-orange-500/10 hover:text-orange-400"
              >
                <Facebook className="h-4 w-4" />
              </a>
              <a
                href="#"
                aria-label="Instagram"
                className="grid h-9 w-9 place-items-center rounded-lg border border-border hover:bg-orange-500/10 hover:text-orange-400"
              >
                <Instagram className="h-4 w-4" />
              </a>
            </div>
            <p className="mt-4 text-[10px] text-slate-500">
              Junín, Huancayo, Perú.
            </p>
          </div>
        </div>

        <div className="border-t border-border bg-[#070d18]">
          <div className="mx-auto max-w-7xl px-4 py-3 text-center text-[10px] uppercase tracking-widest text-slate-500 sm:px-6 lg:px-10">
            © {new Date().getFullYear()} FerreInnova S.A.C. — Todos los derechos reservados.
          </div>
        </div>
      </footer>

      <PrivacyModal open={privacy} onOpenChange={setPrivacy} />
      <ComplaintsModal open={complaints} onOpenChange={setComplaints} />
    </>
  );
}
