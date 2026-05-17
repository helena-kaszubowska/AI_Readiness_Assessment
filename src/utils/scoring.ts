import {
  DIMENSION_LABELS,
  DIMENSION_MAX,
  environmentQuestions,
  organizationQuestions,
  processQuestions,
  technologyQuestions,
  TOTAL_MAX_POINTS,
} from '../data/questions'
import type {
  AnswerValue,
  AssessmentScores,
  DimensionId,
  DimensionScore,
  ReadinessLevel,
} from '../types'

const QUESTIONS_BY_DIMENSION: Record<DimensionId, { id: string }[]> = {
  technology: technologyQuestions,
  organization: organizationQuestions,
  environment: environmentQuestions,
  process: processQuestions,
}

function sumDimension(
  dimension: DimensionId,
  answers: Record<string, AnswerValue | undefined>,
): DimensionScore {
  const items = QUESTIONS_BY_DIMENSION[dimension]
  const points = items.reduce((sum, q) => {
    const v = answers[q.id]
    return sum + (v !== undefined ? v : 0)
  }, 0)
  const maxPoints = DIMENSION_MAX[dimension]
  const percent = maxPoints > 0 ? Math.round((points / maxPoints) * 100) : 0
  return {
    id: dimension,
    label: DIMENSION_LABELS[dimension],
    points,
    maxPoints,
    percent,
  }
}

function getLevel(percent: number): ReadinessLevel {
  if (percent <= 33) return 'low'
  if (percent <= 66) return 'medium'
  return 'high'
}

const LEVEL_LABELS: Record<ReadinessLevel, string> = {
  low: 'Niski poziom gotowości',
  medium: 'Średni poziom gotowości',
  high: 'Wysoki poziom gotowości',
}

const INTERPRETATIONS: Record<ReadinessLevel, string> = {
  low: 'Przedsiębiorstwo wymaga istotnego przygotowania przed rozpoczęciem wdrożenia rozwiązań AI. W pierwszej kolejności należy uporządkować dane, procesy oraz podstawowe zasoby organizacyjne.',
  medium:
    'Przedsiębiorstwo posiada częściowe podstawy do wdrożenia AI, jednak wybrane obszary wymagają dalszego rozwoju. Zalecane jest rozpoczęcie od ograniczonego pilotażu oraz wzmocnienie najsłabszych wymiarów.',
  high: 'Przedsiębiorstwo posiada dobre warunki do rozpoczęcia lub rozszerzenia wdrożeń AI. Rekomendowane jest wybranie konkretnego procesu pilotażowego oraz monitorowanie efektów wdrożenia.',
}

export function calculateScores(
  answers: Record<string, AnswerValue | undefined>,
): AssessmentScores {
  const dimensions: DimensionScore[] = (
    ['technology', 'organization', 'environment', 'process'] as DimensionId[]
  ).map((d) => sumDimension(d, answers))

  const totalPoints = dimensions.reduce((s, d) => s + d.points, 0)
  const overallPercent = Math.round((totalPoints / TOTAL_MAX_POINTS) * 100)
  const level = getLevel(overallPercent)

  return {
    dimensions,
    totalPoints,
    totalMax: TOTAL_MAX_POINTS,
    overallPercent,
    level,
    levelLabel: LEVEL_LABELS[level],
    interpretation: INTERPRETATIONS[level],
  }
}

export function getDimensionPercent(
  scores: AssessmentScores,
  id: DimensionId,
): number {
  return scores.dimensions.find((d) => d.id === id)?.percent ?? 0
}
