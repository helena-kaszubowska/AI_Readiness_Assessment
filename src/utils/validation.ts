import type { IntroData } from "../types";
import type { Question } from "../types";

export function validateIntro(intro: IntroData): string | null {
  if (!intro.companySize) return "Wybierz wielkość przedsiębiorstwa.";
  if (!intro.industry.trim()) return "Podaj branżę przedsiębiorstwa.";
  if (!intro.aiGoal) return "Wybierz główny cel potencjalnego wdrożenia AI.";
  if (intro.aiGoal === "inne" && !(intro.aiGoalOther ?? "").trim()) {
    return "Opisz główny cel wdrożenia AI (opcja „Inne”).";
  }
  if (!intro.aiUsage) return "Wskaż, czy firma korzysta z narzędzi AI.";
  if (!intro.processName.trim())
    return "Podaj nazwę ocenianego procesu biznesowego.";
  return null;
}

export function validateQuestions(
  questions: Question[],
  answers: Record<string, number | undefined>,
): string | null {
  const missing = questions.filter((q) => answers[q.id] === undefined);
  if (missing.length > 0) {
    return "Odpowiedz na wszystkie pytania w tej sekcji, aby przejść dalej.";
  }
  return null;
}
