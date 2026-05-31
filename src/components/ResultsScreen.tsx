import { useState } from "react";
import { IconDownload, IconRotate } from "./Icons";
import { AI_USAGE_OPTIONS, COMPANY_SIZE_OPTIONS } from "../data/questions";
import { formatAiGoalDisplay } from "../utils/introDisplay";
import type { AssessmentScores, IntroData } from "../types";
import { RecommendationsList } from "./RecommendationsList";
import { ResultsChart } from "./ResultsChart";
import { ScoreCard } from "./ScoreCard";

interface ResultsScreenProps {
  intro: IntroData;
  scores: AssessmentScores;
  recommendations: string[];
  onRestart: () => void;
}

function levelStyles(level: AssessmentScores["level"]) {
  switch (level) {
    case "high":
      return "border-emerald-200 bg-emerald-50 text-emerald-900";
    case "medium":
      return "border-amber-200 bg-amber-50 text-amber-900";
    default:
      return "border-rose-200 bg-rose-50 text-rose-900";
  }
}

function labelFor<T extends string>(
  options: { value: T; label: string }[],
  value: string,
): string {
  return options.find((o) => o.value === value)?.label ?? "—";
}

export function ResultsScreen({
  intro,
  scores,
  recommendations,
  onRestart,
}: ResultsScreenProps) {
  const [pdfBusy, setPdfBusy] = useState(false);

  const handlePdf = async () => {
    if (pdfBusy) return;
    setPdfBusy(true);
    try {
      const { downloadReportPdf } = await import("../utils/downloadReportPdf");
      await downloadReportPdf({ intro, scores, recommendations });
    } catch (e) {
      console.error(e);
      window.alert("Nie udało się wygenerować PDF. Spróbuj ponownie.");
    } finally {
      setPdfBusy(false);
    }
  };

  return (
    <div className="mx-auto max-w-5xl px-4 py-8 sm:py-12">
      <header className="text-center">
        <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl lg:text-[2.75rem]">
          <span className="text-gradient-brand">Wyniki oceny gotowości</span>
        </h1>
      </header>

      <section
        className={`mx-auto mt-10 max-w-xl rounded-2xl border p-8 text-center shadow-lg ${levelStyles(scores.level)}`}
      >
        <p className="text-sm font-medium uppercase tracking-wide opacity-80">
          Wynik ogólny
        </p>
        <p className="mt-2 text-5xl font-bold tabular-nums">
          {scores.overallPercent}%
        </p>
        <p className="mt-3 text-lg font-semibold">{scores.levelLabel}</p>
        <p className="mt-4 text-sm leading-relaxed opacity-90">
          {scores.interpretation}
        </p>
      </section>

      <section className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {scores.dimensions.map((d) => (
          <ScoreCard
            key={d.id}
            label={d.label}
            percent={d.percent}
            points={d.points}
            maxPoints={d.maxPoints}
            compact
          />
        ))}
      </section>

      <div className="mt-10">
        <ResultsChart dimensions={scores.dimensions} />
      </div>

      <div className="mt-10">
        <RecommendationsList items={recommendations} />
      </div>

      <section className="card-surface mt-10 p-6">
        <h2 className="text-lg font-semibold text-slate-800">
          Dane wstępne firmy
        </h2>
        <dl className="mt-4 grid gap-3 text-sm sm:grid-cols-2">
          <div>
            <dt className="text-slate-500">Wielkość</dt>
            <dd className="font-medium text-slate-800">
              {labelFor(COMPANY_SIZE_OPTIONS, intro.companySize)}
            </dd>
          </div>
          <div>
            <dt className="text-slate-500">Branża</dt>
            <dd className="font-medium text-slate-800">{intro.industry}</dd>
          </div>
          <div>
            <dt className="text-slate-500">Cel wdrożenia AI</dt>
            <dd className="font-medium text-slate-800">
              {formatAiGoalDisplay(intro)}
            </dd>
          </div>
          <div>
            <dt className="text-slate-500">Korzystanie z AI</dt>
            <dd className="font-medium text-slate-800">
              {labelFor(AI_USAGE_OPTIONS, intro.aiUsage)}
            </dd>
          </div>
          <div className="sm:col-span-2">
            <dt className="text-slate-500">Proces biznesowy</dt>
            <dd className="font-medium text-slate-800">{intro.processName}</dd>
          </div>
        </dl>
      </section>

      <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:justify-center">
        <button
          type="button"
          onClick={handlePdf}
          disabled={pdfBusy}
          className="btn-primary px-6 py-3 disabled:cursor-wait disabled:opacity-70"
        >
          <IconDownload />
          {pdfBusy ? "Generowanie PDF…" : "Pobierz raport PDF"}
        </button>
        <button
          type="button"
          onClick={onRestart}
          className="btn-secondary px-6 py-3"
        >
          <IconRotate />
          Rozpocznij ponownie
        </button>
      </div>
    </div>
  );
}
