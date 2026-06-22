// Drawer lateral del carrito — accesible desde el icono del navbar.
import { Minus, Plus, ShoppingBag, Trash2, X } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { useCartContext } from "@/context/cart-context";
import { useInventoryContext } from "@/context/inventory-context";
import { CheckoutSuccessModal } from "./CheckoutSuccessModal";

export function CartDrawer() {
  const { items, count, subtotal, igv, total, setQty, remove, clear, drawerOpen, closeDrawer } =
    useCartContext();
  const { checkoutDecrement } = useInventoryContext();
  const [successOpen, setSuccessOpen] = useState(false);
  const [purchasedTotal, setPurchasedTotal] = useState(0);
  const [purchasedCount, setPurchasedCount] = useState(0);
  const [processing, setProcessing] = useState(false);

  const handleCheckout = async () => {
    if (items.length === 0) {
      toast.error("Tu carrito está vacío");
      return;
    }
    if (processing) return;
    setProcessing(true);
    const snapshotTotal = total;
    const snapshotCount = count;
    const payload = items.map((it) => ({ productId: it.productId, cantidad: it.cantidad }));

    const result = await checkoutDecrement(payload);
    setProcessing(false);

    if (!result.ok) {
      // Rollback: se restauró el stock local; el carrito permanece intacto.
      toast.error("No se pudo procesar la compra", {
        description: `PostgreSQL rechazó la operación: ${result.error}. Stock revertido.`,
      });
      return;
    }

    setPurchasedTotal(snapshotTotal);
    setPurchasedCount(snapshotCount);
    clear();
    setSuccessOpen(true);
  };

  const handleCloseSuccess = () => {
    setSuccessOpen(false);
    closeDrawer();
    toast.success("¡Pedido confirmado!", {
      description: "El stock fue actualizado en el inventario.",
    });
  };

  return (
    <>
      <Sheet open={drawerOpen} onOpenChange={(o) => (o ? null : closeDrawer())}>
        <SheetContent
          side="right"
          data-testid="cart-drawer"
          className="flex w-full flex-col gap-0 border-l border-slate-200 bg-white p-0 text-slate-900 sm:max-w-md"
        >
          <SheetHeader className="border-b border-slate-200 px-6 py-5 text-left">
            <div className="flex items-center gap-3">
              <div className="grid h-10 w-10 place-items-center rounded-xl bg-orange-500 text-white shadow-md shadow-orange-500/30">
                <ShoppingBag className="h-5 w-5" />
              </div>
              <div>
                <SheetTitle className="text-base font-bold text-slate-900">Tu Carrito</SheetTitle>
                <SheetDescription className="text-xs text-slate-500">
                  {count} {count === 1 ? "unidad" : "unidades"} • Precios en Soles (S/.)
                </SheetDescription>
              </div>
            </div>
          </SheetHeader>

          {/* Items */}
          <div className="flex-1 overflow-y-auto px-6 py-4">
            {items.length === 0 ? (
              <div
                data-testid="cart-empty"
                className="grid h-full place-items-center text-center"
              >
                <div>
                  <ShoppingBag className="mx-auto h-12 w-12 text-slate-300" />
                  <p className="mt-3 text-sm font-medium text-slate-700">
                    Aún no has agregado productos
                  </p>
                  <p className="mt-1 text-xs text-slate-500">
                    Explora el catálogo y suma tu primer ítem.
                  </p>
                </div>
              </div>
            ) : (
              <ul className="space-y-3">
                {items.map((it) => (
                  <li
                    key={it.productId}
                    data-testid={`cart-item-${it.productId}`}
                    className="flex gap-3 rounded-xl border border-slate-200 bg-slate-50/60 p-3"
                  >
                    <div className="h-16 w-16 shrink-0 overflow-hidden rounded-lg border border-slate-200 bg-white">
                      {it.imagen && (
                        <img
                          src={it.imagen}
                          alt={it.nombre}
                          className="h-full w-full object-cover"
                          loading="lazy"
                        />
                      )}
                    </div>
                    <div className="flex min-w-0 flex-1 flex-col">
                      <div className="flex items-start justify-between gap-2">
                        <p className="line-clamp-2 text-xs font-semibold text-slate-900">
                          {it.nombre}
                        </p>
                        <button
                          type="button"
                          onClick={() => remove(it.productId)}
                          data-testid={`btn-remove-${it.productId}`}
                          aria-label="Quitar"
                          className="rounded-md p-1 text-slate-400 transition hover:bg-red-50 hover:text-red-600"
                        >
                          <X className="h-3.5 w-3.5" />
                        </button>
                      </div>
                      <div className="mt-auto flex items-center justify-between pt-2">
                        <div className="inline-flex items-center rounded-lg border border-slate-200 bg-white">
                          <button
                            type="button"
                            onClick={() => setQty(it.productId, it.cantidad - 1)}
                            data-testid={`btn-decrease-${it.productId}`}
                            aria-label="Disminuir"
                            className="grid h-7 w-7 place-items-center text-slate-600 hover:bg-slate-100"
                          >
                            <Minus className="h-3 w-3" />
                          </button>
                          <span
                            data-testid={`qty-${it.productId}`}
                            className="min-w-7 px-1 text-center text-xs font-semibold tabular-nums"
                          >
                            {it.cantidad}
                          </span>
                          <button
                            type="button"
                            onClick={() => setQty(it.productId, it.cantidad + 1)}
                            data-testid={`btn-increase-${it.productId}`}
                            aria-label="Aumentar"
                            className="grid h-7 w-7 place-items-center text-slate-600 hover:bg-slate-100"
                          >
                            <Plus className="h-3 w-3" />
                          </button>
                        </div>
                        <span className="text-sm font-bold text-slate-900">
                          S/. {(it.precio * it.cantidad).toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Totals + Checkout */}
          <div className="space-y-3 border-t border-slate-200 bg-slate-50/70 px-6 py-5">
            <dl className="space-y-1.5 text-sm">
              <div className="flex justify-between text-slate-600">
                <dt>Subtotal</dt>
                <dd data-testid="cart-subtotal" className="font-medium tabular-nums">
                  S/. {subtotal.toFixed(2)}
                </dd>
              </div>
              <div className="flex justify-between text-slate-600">
                <dt>IGV (18%)</dt>
                <dd data-testid="cart-igv" className="font-medium tabular-nums">
                  S/. {igv.toFixed(2)}
                </dd>
              </div>
              <div className="flex justify-between border-t border-slate-200 pt-2 text-base">
                <dt className="font-semibold text-slate-900">Total</dt>
                <dd
                  data-testid="cart-total"
                  className="text-lg font-extrabold tabular-nums text-slate-900"
                >
                  S/. {total.toFixed(2)}
                </dd>
              </div>
            </dl>

            <button
              type="button"
              onClick={handleCheckout}
              data-testid="btn-checkout"
              className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-orange-500 px-4 py-3 text-sm font-bold text-white shadow-lg shadow-orange-500/30 transition hover:bg-orange-600 active:scale-[0.99] disabled:cursor-not-allowed disabled:bg-slate-300 disabled:shadow-none"
              disabled={items.length === 0}
            >
              Finalizar Compra
            </button>
            {items.length > 0 && (
              <button
                type="button"
                onClick={clear}
                data-testid="btn-clear-cart"
                className="inline-flex w-full items-center justify-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-medium text-slate-600 transition hover:bg-slate-100"
              >
                <Trash2 className="h-3.5 w-3.5" /> Vaciar carrito
              </button>
            )}
          </div>
        </SheetContent>
      </Sheet>

      <CheckoutSuccessModal
        open={successOpen}
        total={purchasedTotal}
        itemsCount={purchasedCount}
        onClose={handleCloseSuccess}
      />
    </>
  );
}
