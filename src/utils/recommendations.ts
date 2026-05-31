import type { AssessmentScores } from "../types";
import { getDimensionPercent } from "./scoring";

const THRESHOLD = 50;

export function buildRecommendations(scores: AssessmentScores): string[] {
  const recs: string[] = [];
  const tech = getDimensionPercent(scores, "technology");
  const org = getDimensionPercent(scores, "organization");
  const env = getDimensionPercent(scores, "environment");
  const proc = getDimensionPercent(scores, "process");
  const overall = scores.overallPercent;

  if (tech < THRESHOLD) {
    recs.push(
      "Należy uporządkować dane, poprawić ich jakość, zapewnić możliwość eksportu danych oraz zadbać o integrację systemów informatycznych.",
    );
  }
  if (org < THRESHOLD) {
    recs.push(
      "Należy zwiększyć wsparcie kadry zarządzającej, wyznaczyć osobę odpowiedzialną za inicjatywy AI oraz rozwijać kompetencje cyfrowe pracowników.",
    );
  }
  if (env < THRESHOLD) {
    recs.push(
      "Należy przeanalizować działania konkurencji, oczekiwania klientów, dostępność dostawców technologii oraz wymagania prawne związane z ochroną danych, prywatnością i odpowiedzialnym wykorzystaniem AI",
    );
  }
  if (proc < THRESHOLD) {
    recs.push(
      "Wybrany proces nie jest jeszcze dobrym kandydatem do automatyzacji. Warto najpierw opisać jego przebieg, określić dane wejściowe i wyjściowe oraz ustalić mierniki efektywności.",
    );
  }
  if (overall >= 67 && proc < THRESHOLD) {
    recs.push(
      "Organizacja wykazuje relatywnie wysoki poziom gotowości, jednak wybrany proces nie jest najlepszym obszarem do rozpoczęcia wdrożenia AI.",
    );
  }
  if (overall < 34 && proc >= 67) {
    recs.push(
      "Wybrany proces ma potencjał automatyzacji, ale organizacja powinna najpierw wzmocnić podstawy technologiczne i organizacyjne.",
    );
  }

  if (recs.length === 0) {
    recs.push(
      "Wyniki wskazują na zrównoważony poziom gotowości we wszystkich obszarach. Kontynuuj monitorowanie postępów i planuj wdrożenie pilotażowe z jasnymi miernikami sukcesu.",
    );
  }

  return recs;
}
