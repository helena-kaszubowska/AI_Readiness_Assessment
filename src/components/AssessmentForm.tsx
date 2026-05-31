import { useState } from 'react'
import { IconChevronLeft, IconChevronRight } from './Icons'
import { FORM_STEPS } from '../data/questions'
import type { AnswerValue, AssessmentState, IntroData } from '../types'
import { validateIntro, validateQuestions } from '../utils/validation'
import { IntroStep } from './IntroStep'
import { ProgressBar } from './ProgressBar'
import { QuestionCard } from './QuestionCard'

interface AssessmentFormProps {
  state: AssessmentState
  stepIndex: number
  onStepIndexChange: (index: number) => void
  onIntroChange: (patch: Partial<IntroData>) => void
  onAnswer: (id: string, value: AnswerValue) => void
  onComplete: () => void
  onBackToStart: () => void
}

export function AssessmentForm({
  state,
  stepIndex,
  onStepIndexChange,
  onIntroChange,
  onAnswer,
  onComplete,
  onBackToStart,
}: AssessmentFormProps) {
  const [error, setError] = useState<string | null>(null)

  const step = FORM_STEPS[stepIndex]
  const totalSteps = FORM_STEPS.length
  const isLast = stepIndex === totalSteps - 1

  const goNext = () => {
    if (step.key === 'intro') {
      const err = validateIntro(state.intro)
      if (err) {
        setError(err)
        return
      }
    } else {
      const err = validateQuestions(step.questions, state.answers)
      if (err) {
        setError(err)
        return
      }
    }
    setError(null)
    if (isLast) {
      onComplete()
    } else {
      onStepIndexChange(stepIndex + 1)
    }
  }

  const goBack = () => {
    setError(null)
    if (stepIndex === 0) {
      onBackToStart()
    } else {
      onStepIndexChange(stepIndex - 1)
    }
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-8 sm:py-12">
      <div className="panel-surface p-4">
        <ProgressBar currentStep={stepIndex + 1} totalSteps={totalSteps} />
      </div>

      <div className="panel-surface mt-6 p-6 sm:p-8">
        <header className="mt-2">
        <p className="text-gradient-brand text-sm font-medium uppercase tracking-wide">
          {step.subtitle}
        </p>
        <h2 className="mt-1 text-2xl font-semibold text-slate-900">{step.title}</h2>
      </header>

      <div className="mt-8 space-y-4">
        {step.key === 'intro' ? (
          <IntroStep intro={state.intro} onChange={onIntroChange} />
        ) : (
          step.questions.map((q, i) => (
            <QuestionCard
              key={q.id}
              index={i + 1}
              questionId={q.id}
              text={q.text}
              helpText={q.helpText}
              value={state.answers[q.id]}
              onChange={onAnswer}
            />
          ))
        )}
      </div>

      {error && (
        <p
          className="mt-4 rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900"
          role="alert"
        >
          {error}
        </p>
      )}

      <div className="mt-10 flex flex-col-reverse gap-3 sm:flex-row sm:justify-between">
        <button
          type="button"
          onClick={goBack}
          className="btn-secondary"
        >
          <IconChevronLeft />
          Wstecz
        </button>
        <button
          type="button"
          onClick={goNext}
          className="btn-primary"
        >
          {isLast ? 'Zobacz wynik' : 'Dalej'}
          {!isLast && <IconChevronRight className="h-4 w-4" />}
        </button>
      </div>
      </div>
    </div>
  )
}
