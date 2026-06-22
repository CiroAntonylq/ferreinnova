// Modales legales y corporativos del cliente (FerreInnova).
import { useState } from "react";
import { toast } from "sonner";
import { BookOpen, Loader2, MapPin } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

interface ModalProps {
  open: boolean;
  onOpenChange: (v: boolean) => void;
}

/* ---------- ACERCA DE ---------- */
export function AboutModal({ open, onOpenChange }: ModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent data-testid="modal-about" className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-2xl">Acerca de FerreInnova</DialogTitle>
          <DialogDescription>Historia, misión y compromiso con el rubro ferretero.</DialogDescription>
        </DialogHeader>
        <div className="space-y-3 text-sm text-muted-foreground">
          <p>
            <strong className="text-foreground">FerreInnova</strong> nace en Junín con la misión
            de modernizar el abastecimiento ferretero del centro del país, integrando inteligencia
            predictiva de inventario con una experiencia de compra digital de alto nivel.
          </p>
          <p>
            <strong className="text-foreground">Misión:</strong> ofrecer materiales de construcción
            certificados con disponibilidad en tiempo real y precios justos.
          </p>
          <p>
            <strong className="text-foreground">Visión:</strong> ser el referente nacional en
            distribución ferretera inteligente para el 2030.
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}

/* ---------- POLÍTICAS DE PRIVACIDAD ---------- */
export function PrivacyModal({ open, onOpenChange }: ModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent data-testid="modal-privacy" className="max-h-[80vh] max-w-2xl overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">Política de Privacidad</DialogTitle>
          <DialogDescription>Ley N° 29733 - Protección de Datos Personales (Perú)</DialogDescription>
        </DialogHeader>
        <div className="space-y-3 text-sm text-muted-foreground">
          <p>
            FerreInnova trata sus datos personales conforme a la <strong className="text-foreground">Ley
            N° 29733</strong> y su Reglamento (D.S. N° 003-2013-JUS), garantizando confidencialidad y
            uso estrictamente comercial.
          </p>
          <p>
            <strong className="text-foreground">Derechos ARCO:</strong> usted puede ejercer sus
            derechos de Acceso, Rectificación, Cancelación y Oposición escribiendo a
            datos@ferreinnova.pe.
          </p>
          <p>
            <strong className="text-foreground">Finalidad:</strong> gestión de pedidos, facturación
            electrónica, atención post-venta y comunicaciones comerciales (opt-in).
          </p>
          <p>
            <strong className="text-foreground">Conservación:</strong> los datos se mantienen mientras
            exista relación comercial o por obligación legal (mín. 5 años SUNAT).
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}

/* ---------- CONTACTO ---------- */
export function ContactModal({ open, onOpenChange }: ModalProps) {
  const [loading, setLoading] = useState(false);
  const [accept, setAccept] = useState(false);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!accept) {
      toast.error("Debe aceptar el tratamiento de datos personales.");
      return;
    }
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1100));
    setLoading(false);
    toast.success("¡Mensaje enviado correctamente! Nos comunicaremos contigo a la brevedad.");
    onOpenChange(false);
    setAccept(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent data-testid="modal-contact" className="max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-2xl">Contáctanos</DialogTitle>
          <DialogDescription>Responderemos en menos de 24h hábiles.</DialogDescription>
        </DialogHeader>
        <form onSubmit={onSubmit} className="space-y-3" data-testid="form-contact">
          <Input required placeholder="Nombre completo" data-testid="contact-name" />
          <Input required type="email" placeholder="Correo electrónico" data-testid="contact-email" />
          <Input required type="tel" placeholder="Teléfono / Celular" data-testid="contact-phone" />
          <textarea
            required
            rows={4}
            placeholder="Mensaje / Consulta"
            data-testid="contact-message"
            className="flex w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
          />
          <label className="flex items-start gap-2 text-xs text-muted-foreground">
            <input
              type="checkbox"
              checked={accept}
              onChange={(e) => setAccept(e.target.checked)}
              data-testid="contact-accept-terms"
              className="mt-0.5 h-4 w-4 accent-orange-500"
            />
            <span>
              Acepto los términos y condiciones y el tratamiento de mis datos personales.
            </span>
          </label>
          <button
            type="submit"
            disabled={loading}
            data-testid="btn-send-contact"
            className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-orange-500 px-4 py-2.5 text-sm font-bold text-neutral-950 transition hover:bg-orange-400 disabled:opacity-60"
          >
            {loading && <Loader2 className="h-4 w-4 animate-spin" />}
            {loading ? "Enviando..." : "Enviar Mensaje"}
          </button>
        </form>
      </DialogContent>
    </Dialog>
  );
}

/* ---------- LIBRO DE RECLAMACIONES ---------- */
export function ComplaintsModal({ open, onOpenChange }: ModalProps) {
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1200));
    setLoading(false);
    toast.success("Reclamación registrada. Hoja N° HR-" + Date.now().toString().slice(-6));
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent data-testid="modal-complaints" className="max-w-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-2xl">
            <BookOpen className="h-6 w-6 text-orange-500" />
            Libro de Reclamaciones Virtual
          </DialogTitle>
          <DialogDescription>
            Conforme al Código de Protección y Defensa del Consumidor — INDECOPI (Ley N° 29571).
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={onSubmit} className="space-y-3" data-testid="form-complaints">
          <Input required placeholder="Nombre y apellidos" data-testid="complaint-name" />
          <Input required placeholder="DNI / RUC" data-testid="complaint-doc" />
          <Input required type="email" placeholder="Correo electrónico" data-testid="complaint-email" />
          <select
            required
            data-testid="complaint-type"
            className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 text-sm"
          >
            <option value="">Tipo: Reclamo o Queja</option>
            <option value="reclamo">Reclamo (producto/servicio)</option>
            <option value="queja">Queja (atención)</option>
          </select>
          <textarea
            required
            rows={3}
            placeholder="Detalle del reclamo"
            data-testid="complaint-detail"
            className="flex w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm"
          />
          <button
            type="submit"
            disabled={loading}
            data-testid="btn-send-complaint"
            className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-orange-500 px-4 py-2.5 text-sm font-bold text-neutral-950 transition hover:bg-orange-400 disabled:opacity-60"
          >
            {loading && <Loader2 className="h-4 w-4 animate-spin" />}
            {loading ? "Registrando..." : "Registrar Reclamación"}
          </button>
        </form>
      </DialogContent>
    </Dialog>
  );
}

/* ---------- NUESTRAS SEDES ---------- */
const SEDES = [
  { nombre: "Sede Huancayo Centro", dir: "Jr. Real 1245 - Huancayo", tel: "(064) 234-567" },
  { nombre: "Sede El Tambo", dir: "Av. Mariscal Castilla 2890 - El Tambo", tel: "(064) 245-890" },
  { nombre: "Sede Chilca", dir: "Av. 9 de Diciembre 567 - Chilca", tel: "(064) 256-123" },
];

export function LocationsModal({ open, onOpenChange }: ModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent data-testid="modal-locations" className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-2xl">
            <MapPin className="h-6 w-6 text-orange-500" /> Nuestras Sedes
          </DialogTitle>
          <DialogDescription>Visítanos en cualquiera de nuestros locales en Junín.</DialogDescription>
        </DialogHeader>

        {/* Mapa simulado */}
        <div
          data-testid="mock-map"
          className="relative h-44 w-full overflow-hidden rounded-xl border border-border bg-gradient-to-br from-slate-800 via-slate-900 to-neutral-950"
        >
          <div className="absolute inset-0 bg-grid-faint opacity-40" />
          {[
            { top: "30%", left: "25%" },
            { top: "55%", left: "55%" },
            { top: "40%", left: "78%" },
          ].map((p, i) => (
            <div
              key={i}
              style={{ top: p.top, left: p.left }}
              className="absolute -translate-x-1/2 -translate-y-1/2"
            >
              <div className="grid h-8 w-8 place-items-center rounded-full bg-orange-500 text-neutral-950 shadow-lg shadow-orange-500/40">
                <MapPin className="h-4 w-4" strokeWidth={2.6} />
              </div>
            </div>
          ))}
          <div className="absolute bottom-2 right-3 rounded-md bg-card/80 px-2 py-1 text-[10px] uppercase tracking-widest text-muted-foreground backdrop-blur">
            Junín, Perú
          </div>
        </div>

        <div className="grid gap-2 sm:grid-cols-3" data-testid="sedes-list">
          {SEDES.map((s) => (
            <div
              key={s.nombre}
              className="rounded-xl border border-border bg-card/60 p-3 text-xs"
            >
              <p className="font-bold text-foreground">{s.nombre}</p>
              <p className="mt-1 text-muted-foreground">{s.dir}</p>
              <p className="mt-1 text-orange-400">{s.tel}</p>
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}
