import { useEffect, useMemo, useState } from "react";
import { AssessmentForm } from "./components/AssessmentForm";
import { ResultsScreen } from "./components/ResultsScreen";
import { StartScreen } from "./components/StartScreen";
import type { AnswerValue, AppView, AssessmentState, IntroData } from "./types";
import { buildRecommendations } from "./utils/recommendations";
import { calculateScores } from "./utils/scoring";
import {
  clearSession,
  readSession,
  writeSession,
} from "./utils/sessionPersistence";

const emptyIntro = (): IntroData => ({
  companySize: "",
  industry: "",
  aiGoal: "",
  aiGoalOther: "",
  aiUsage: "",
  processName: "",
});

const initialState = (): AssessmentState => ({
  intro: emptyIntro(),
  answers: {},
});

function getInitial(): {
  view: AppView;
  assessment: AssessmentState;
  formStepIndex: number;
} {
  const stored = readSession();
  if (stored) {
    return {
      view: stored.view,
      assessment: stored.assessment,
      formStepIndex: stored.formStepIndex,
    };
  }
  return { view: "start", assessment: initialState(), formStepIndex: 0 };
}

function App() {
  const initial = getInitial();
  const [view, setView] = useState<AppView>(initial.view);
  const [assessment, setAssessment] = useState<AssessmentState>(
    initial.assessment,
  );
  const [formStepIndex, setFormStepIndex] = useState(initial.formStepIndex);

  useEffect(() => {
    writeSession({ view, assessment, formStepIndex });
  }, [view, assessment, formStepIndex]);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, [view, formStepIndex]);

  const scores = useMemo(
    () => calculateScores(assessment.answers),
    [assessment.answers],
  );

  const recommendations = useMemo(() => buildRecommendations(scores), [scores]);

  const handleIntroChange = (patch: Partial<IntroData>) => {
    setAssessment((prev) => ({
      ...prev,
      intro: { ...prev.intro, ...patch },
    }));
  };

  const handleAnswer = (id: string, value: AnswerValue) => {
    setAssessment((prev) => ({
      ...prev,
      answers: { ...prev.answers, [id]: value },
    }));
  };

  const restart = () => {
    clearSession();
    setAssessment(initialState());
    setFormStepIndex(0);
    setView("start");
  };

  const startAssessment = () => {
    setFormStepIndex(0);
    setView("form");
  };

  const completeAssessment = () => {
    setView("results");
  };

  const backToStart = () => {
    clearSession();
    setAssessment(initialState());
    setFormStepIndex(0);
    setView("start");
  };

  return (
    <div className="page-bg">
      <header className="app-header">
        <div className="mx-auto max-w-5xl px-4 py-4">
          <span className="text-gradient-brand text-base font-semibold tracking-tight sm:text-lg">
            AI Readiness Assessment
          </span>
        </div>
      </header>

      <main>
        {view === "start" && <StartScreen onStart={startAssessment} />}
        {view === "form" && (
          <AssessmentForm
            state={assessment}
            stepIndex={formStepIndex}
            onStepIndexChange={setFormStepIndex}
            onIntroChange={handleIntroChange}
            onAnswer={handleAnswer}
            onComplete={completeAssessment}
            onBackToStart={backToStart}
          />
        )}
        {view === "results" && (
          <ResultsScreen
            intro={assessment.intro}
            scores={scores}
            recommendations={recommendations}
            onRestart={restart}
          />
        )}
      </main>
    </div>
  );
}

export default App;
