// Tarjeta KPI con número grande, sparkline y barra de progreso opcional.
import type { LucideIcon } from "lucide-react";
import { TrendingDown, TrendingUp } from "lucide-react";

interface Props {
  label: string;
  value: string | number;
  icon: LucideIcon;
  trend?: number; // pct, positive or negative
  progress?: number; // 0..100
  accent?: "amber" | "emerald" | "violet" | "sky";
  spark?: number[];
  testId?: string;
}

const ACCENTS: Record<NonNullable<Props["accent"]>, { ring: string; text: string; bar: string }> = {
  amber: { ring: "ring-amber-500/20", text: "text-amber-400", bar: "from-amber-500 to-orange-600" },
  emerald: {
    ring: "ring-emerald-500/20",
    text: "text-emerald-400",
    bar: "from-emerald-500 to-teal-500",
  },
  violet: {
    ring: "ring-violet-500/20",
    text: "text-violet-400",
    bar: "from-violet-500 to-fuchsia-500",
  },
  sky: { ring: "ring-sky-500/20", text: "text-sky-400", bar: "from-sky-500 to-indigo-500" },
};

export function KpiCard({
  label,
  value,
  icon: Icon,
  trend,
  progress,
  accent = "amber",
  spark,
  testId,
}: Props) {
  const a = ACCENTS[accent];
  const positive = (trend ?? 0) >= 0;
  return (
    <div
      data-testid={testId}
      className={`group relative overflow-hidden rounded-2xl border border-border bg-card/70 p-5 shadow-xl shadow-black/10 backdrop-blur-xl ring-1 ring-inset ${a.ring} transition hover:-translate-y-0.5`}
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-[11px] uppercase tracking-widest text-muted-foreground">{label}</p>
          <p className="mt-2 text-3xl font-bold tracking-tight text-foreground tabular-nums">
            {value}
          </p>
        </div>
        <div className={`grid h-10 w-10 place-items-center rounded-xl bg-white/5 ${a.text}`}>
          <Icon className="h-5 w-5" />
        </div>
      </div>

      {spark && <Sparkline points={spark} color={a.text} />}

      <div className="mt-3 flex items-center justify-between gap-3">
        {trend !== undefined && (
          <span
            className={`inline-flex items-center gap-1 text-xs font-semibold ${
              positive ? "text-emerald-400" : "text-red-400"
            }`}
          >
            {positive ? (
              <TrendingUp className="h-3.5 w-3.5" />
            ) : (
              <TrendingDown className="h-3.5 w-3.5" />
            )}
            {positive ? "+" : ""}
            {trend}%
          </span>
        )}
        {progress !== undefined && (
          <div className="flex flex-1 items-center gap-2">
            <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-white/5">
              <div
                className={`h-full rounded-full bg-gradient-to-r ${a.bar}`}
                style={{ width: `${Math.min(100, Math.max(0, progress))}%` }}
              />
            </div>
            <span className="text-[11px] font-medium text-muted-foreground tabular-nums">
              {Math.round(progress)}%
            </span>
          </div>
        )}
      </div>
    </div>
  );
}

function Sparkline({ points, color }: { points: number[]; color: string }) {
  if (points.length === 0) return null;
  const w = 100;
  const h = 28;
  const max = Math.max(...points);
  const min = Math.min(...points);
  const range = max - min || 1;
  const step = w / (points.length - 1);
  const path = points
    .map((p, i) => {
      const x = i * step;
      const y = h - ((p - min) / range) * h;
      return `${i === 0 ? "M" : "L"}${x.toFixed(1)},${y.toFixed(1)}`;
    })
    .join(" ");
  return (
    <svg viewBox={`0 0 ${w} ${h}`} className={`mt-3 h-7 w-full ${color}`} preserveAspectRatio="none">
      <path d={path} fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}
