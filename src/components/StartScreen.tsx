import { IconBrain, IconChevronRight } from "./Icons";

interface StartScreenProps {
  onStart: () => void;
}

export function StartScreen({ onStart }: StartScreenProps) {
  return (
    <div className="flex min-h-[calc(100dvh-4.25rem)] flex-col items-center justify-center px-4 py-4 sm:py-6">
      <div className="card-surface flex w-full max-w-3xl max-h-[calc(100dvh-5.5rem)] flex-col justify-center px-6 py-8 text-center sm:px-10 sm:py-9">
        <div className="brand-icon-box mx-auto mb-5 flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl sm:mb-6 sm:h-16 sm:w-16">
          <IconBrain className="h-8 w-8 sm:h-9 sm:w-9" />
        </div>
        <h1 className="text-gradient-brand shrink-0 text-2xl font-semibold leading-tight tracking-tight sm:text-3xl lg:text-4xl">
          Ocena gotowości przedsiębiorstwa do wdrożenia AI
        </h1>
        <p className="mt-4 shrink-0 text-sm leading-relaxed text-slate-800 sm:mt-5 sm:text-base">
          Narzędzie umożliwia wstępną ocenę gotowości przedsiębiorstwa do
          wdrożenia rozwiązań sztucznej inteligencji na podstawie wymiarów:
          technologicznego, organizacyjnego, środowiskowego oraz procesowego.
        </p>
        <button
          type="button"
          onClick={onStart}
          className="btn-primary-lg mx-auto mt-6 shrink-0 sm:mt-8"
        >
          Rozpocznij ocenę
          <IconChevronRight />
        </button>
      </div>
    </div>
  );
}
