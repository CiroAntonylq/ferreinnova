// Insignia visual de estado de riesgo de stock con icono y fondo sutil.
import { AlertTriangle, CheckCircle2, TriangleAlert } from "lucide-react";
import { getRiskLabel, type RiskState } from "@/lib/inventory";

interface Props {
  state: RiskState;
  testId?: string;
}

const CONFIG: Record<RiskState, { cls: string; icon: typeof CheckCircle2; pulse: boolean }> = {
  ok: {
    cls: "bg-emerald-500/10 text-emerald-400 ring-emerald-500/20",
    icon: CheckCircle2,
    pulse: false,
  },
  warning: {
    cls: "bg-amber-500/10 text-amber-400 ring-amber-500/25",
    icon: TriangleAlert,
    pulse: false,
  },
  critical: {
    cls: "bg-red-500/10 text-red-400 ring-red-500/25",
    icon: AlertTriangle,
    pulse: true,
  },
};

export function RiskBadge({ state, testId }: Props) {
  const { cls, icon: Icon, pulse } = CONFIG[state];
  return (
    <span
      data-testid={testId ?? `risk-badge-${state}`}
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold ring-1 ring-inset ${cls}`}
    >
      <Icon className={`h-3.5 w-3.5 ${pulse ? "animate-alert-pulse" : ""}`} strokeWidth={2.4} />
      <span className="whitespace-nowrap">{getRiskLabel(state)}</span>
    </span>
  );
}
