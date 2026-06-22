// Modal de confirmación de compra exitosa.
import { CheckCircle2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface Props {
  open: boolean;
  total: number;
  itemsCount: number;
  onClose: () => void;
}

export function CheckoutSuccessModal({ open, total, itemsCount, onClose }: Props) {
  return (
    <Dialog open={open} onOpenChange={(o) => (o ? null : onClose())}>
      <DialogContent
        data-testid="checkout-success-modal"
        className="border-slate-200 bg-white text-slate-900 sm:max-w-md"
      >
        <DialogHeader className="items-center text-center">
          <div className="mb-3 grid h-16 w-16 place-items-center rounded-full bg-emerald-50 ring-8 ring-emerald-50/60">
            <CheckCircle2 className="h-9 w-9 text-emerald-600" strokeWidth={2.4} />
          </div>
          <DialogTitle className="text-xl font-bold text-slate-900">
            ¡Compra procesada con éxito!
          </DialogTitle>
          <DialogDescription className="text-sm text-slate-600">
            Tu pedido de {itemsCount} {itemsCount === 1 ? "unidad" : "unidades"} por{" "}
            <span className="font-semibold text-slate-900">S/. {total.toFixed(2)}</span> fue
            registrado correctamente.
          </DialogDescription>
        </DialogHeader>

        <div className="rounded-xl border border-slate-200 bg-slate-50/70 p-4 text-xs text-slate-600">
          Te enviaremos un correo con la guía de remisión y el comprobante electrónico SUNAT.
        </div>

        <DialogFooter>
          <button
            type="button"
            onClick={onClose}
            data-testid="btn-close-success"
            className="w-full rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-800"
          >
            Continuar comprando
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
