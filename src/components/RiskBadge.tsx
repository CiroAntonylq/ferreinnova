// Insignia visual de estado de riesgo de stock.
import { getRiskLabel, type RiskState } from "@/lib/inventory";

interface Props {
  state: RiskState;
  testId?: string;
}

const STYLES: Record<RiskState, string> = {
  ok: "bg-emerald-100 text-emerald-800 border-emerald-200",
  warning: "bg-amber-100 text-amber-800 border-amber-200",
  critical: "bg-red-100 text-red-800 border-red-300",
};

export function RiskBadge({ state, testId }: Props) {
  return (
    <span
      data-testid={testId ?? `risk-badge-${state}`}
      className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold ${STYLES[state]}`}
    >
      {getRiskLabel(state)}
    </span>
  );
}
