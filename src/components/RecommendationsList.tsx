import { IconLightbulb } from './Icons'

interface RecommendationsListProps {
  items: string[]
}

export function RecommendationsList({ items }: RecommendationsListProps) {
  return (
    <section className="card-surface p-6">
      <div className="text-gradient-brand mb-4 flex items-center gap-2">
        <IconLightbulb />
        <h2 className="text-lg font-semibold text-slate-900">Rekomendacje</h2>
      </div>
      <ul className="space-y-3">
        {items.map((item, i) => (
          <li
            key={i}
            className="flex gap-3 rounded-lg border border-slate-200/70 bg-slate-50/90 px-4 py-3 text-sm font-medium leading-relaxed text-slate-900"
          >
            <span className="brand-badge mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full">
              {i + 1}
            </span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </section>
  )
}
