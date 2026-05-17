interface ProgressBarProps {
  currentStep: number
  totalSteps: number
}

export function ProgressBar({ currentStep, totalSteps }: ProgressBarProps) {
  const percent = totalSteps > 0 ? (currentStep / totalSteps) * 100 : 0

  return (
    <div className="w-full">
      <div className="mb-2 flex justify-between text-sm font-medium text-slate-800">
        <span>
          Sekcja {currentStep} z {totalSteps}
        </span>
        <span>{Math.round(percent)}%</span>
      </div>
      <div className="h-2 w-full overflow-hidden rounded-full bg-slate-300/50">
        <div
          className="bg-gradient-brand h-full rounded-full transition-all duration-300 ease-out"
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  )
}
