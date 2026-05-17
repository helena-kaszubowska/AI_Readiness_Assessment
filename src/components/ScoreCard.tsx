interface ScoreCardProps {
  label: string
  percent: number
  points: number
  maxPoints: number
  compact?: boolean
}

function barColor(percent: number): string {
  if (percent >= 67) return 'bg-emerald-500'
  if (percent >= 34) return 'bg-amber-500'
  return 'bg-rose-500'
}

export function ScoreCard({
  label,
  percent,
  points,
  maxPoints,
  compact = false,
}: ScoreCardProps) {
  return (
    <div
      className={`card-surface ${compact ? 'p-4' : 'p-5'}`}
    >
      <div className="flex items-end justify-between gap-2">
        <h3 className="text-sm font-medium text-slate-700">{label}</h3>
        <span className="text-gradient-brand text-2xl font-semibold">{percent}%</span>
      </div>
      <div className="mt-3 h-2 overflow-hidden rounded-full bg-slate-100">
        <div
          className={`h-full rounded-full transition-all ${barColor(percent)}`}
          style={{ width: `${percent}%` }}
        />
      </div>
      <p className="mt-2 text-xs text-slate-500">
        {points} / {maxPoints} pkt
      </p>
    </div>
  )
}
