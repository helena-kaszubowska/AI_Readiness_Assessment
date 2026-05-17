export type AnswerValue = 0 | 1 | 2

export type AnswerLabel = 'Nie' | 'Częściowo' | 'Tak'

export type CompanySize = 'mikro' | 'małe' | 'średnie' | 'duże'

export type AiGoal =
  | 'automatyzacja'
  | 'analiza'
  | 'obsługa'
  | 'decyzje'
  | 'inne'

export type AiUsage = 'nie' | 'częściowo' | 'tak'

export interface IntroData {
  companySize: CompanySize | ''
  industry: string
  aiGoal: AiGoal | ''
  /** Wypełniane, gdy aiGoal === 'inne' */
  aiGoalOther: string
  aiUsage: AiUsage | ''
  processName: string
}

export type DimensionId = 'technology' | 'organization' | 'environment' | 'process'

export interface Question {
  id: string
  dimension: DimensionId
  text: string
  helpText: string
}

export interface DimensionScore {
  id: DimensionId
  label: string
  points: number
  maxPoints: number
  percent: number
}

export type ReadinessLevel = 'low' | 'medium' | 'high'

export interface AssessmentScores {
  dimensions: DimensionScore[]
  totalPoints: number
  totalMax: number
  overallPercent: number
  level: ReadinessLevel
  levelLabel: string
  interpretation: string
}

export interface AssessmentState {
  intro: IntroData
  answers: Record<string, AnswerValue | undefined>
}

export type AppView = 'start' | 'form' | 'results'
