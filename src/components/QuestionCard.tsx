import { useId, useState } from 'react'
import { ANSWER_OPTIONS } from '../data/questions'
import type { AnswerValue } from '../types'
import { IconInfo } from './icons'

interface QuestionCardProps {
  index: number
  questionId: string
  text: string
  helpText: string
  value: AnswerValue | undefined
  onChange: (id: string, value: AnswerValue) => void
}

export function QuestionCard({
  index,
  questionId,
  text,
  helpText,
  value,
  onChange,
}: QuestionCardProps) {
  const [helpOpen, setHelpOpen] = useState(false)
  const helpPanelId = useId()
  const hasHelp = helpText.trim().length > 0

  return (
    <article className="card-surface p-5">
      <p className="text-sm font-medium text-slate-500">Pytanie {index}</p>
      <div className="mt-2 flex items-start gap-2">
        <h3 className="min-w-0 flex-1 text-base font-medium leading-snug text-slate-900">
          {text}
        </h3>
        {hasHelp && (
          <button
            type="button"
            onClick={() => setHelpOpen((open) => !open)}
            aria-expanded={helpOpen}
            aria-controls={helpPanelId}
            aria-label={helpOpen ? 'Ukryj wyjaśnienie pytania' : 'Pokaż wyjaśnienie pytania'}
            aria-pressed={helpOpen}
            className={`mt-0.5 shrink-0 rounded-full p-1.5 transition-colors outline-none focus:outline-none focus-visible:outline-none ${
              helpOpen
                ? 'text-slate-600'
                : 'text-slate-400 hover:text-slate-500'
            }`}
          >
            <IconInfo className="h-4 w-4" />
          </button>
        )}
      </div>

      {hasHelp && helpOpen && (
        <p
          id={helpPanelId}
          className="mt-3 rounded-lg border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm leading-relaxed text-slate-600"
        >
          {helpText}
        </p>
      )}

      <div className="mt-4 flex flex-wrap gap-2 sm:gap-3">
        {ANSWER_OPTIONS.map((opt) => {
          const selected = value === opt.value
          return (
            <button
              key={opt.value}
              type="button"
              onClick={() => onChange(questionId, opt.value)}
              className={`min-w-[5.5rem] flex-1 rounded-lg border px-4 py-2.5 text-sm font-medium transition sm:flex-none ${
                selected
                  ? 'chip-selected border-transparent shadow-sm'
                  : 'border-slate-200/90 bg-slate-50/80 text-slate-700 hover:border-[#3d3568]/30 hover:bg-white'
              }`}
            >
              {opt.label}
            </button>
          )
        })}
      </div>
    </article>
  )
}
