import { describe, expect, it } from 'vitest'
import { buildRecommendations } from './recommendations'
import { calculateScores } from './scoring'
import type { AnswerValue, DimensionId } from '../types'
import {
  environmentQuestions,
  organizationQuestions,
  processQuestions,
  technologyQuestions,
} from '../data/questions'

const BY_DIM: Record<DimensionId, string[]> = {
  technology: technologyQuestions.map((q) => q.id),
  organization: organizationQuestions.map((q) => q.id),
  environment: environmentQuestions.map((q) => q.id),
  process: processQuestions.map((q) => q.id),
}

function fillDimension(dim: DimensionId, value: AnswerValue): Record<string, AnswerValue> {
  return Object.fromEntries(BY_DIM[dim].map((id) => [id, value]))
}

const TECH_REC =
  'Należy uporządkować dane, poprawić ich jakość, zapewnić możliwość eksportu danych oraz zadbać o integrację systemów informatycznych.'
const PROC_REC =
  'Wybrany proces nie jest jeszcze dobrym kandydatem do automatyzacji. Warto najpierw opisać jego przebieg, określić dane wejściowe i wyjściowe oraz ustalić mierniki efektywności.'
const HIGH_ORG_LOW_PROC =
  'Organizacja wykazuje relatywnie wysoki poziom gotowości, jednak wybrany proces nie jest najlepszym obszarem do rozpoczęcia wdrożenia AI.'
const LOW_ORG_HIGH_PROC =
  'Wybrany proces ma potencjał automatyzacji, ale organizacja powinna najpierw wzmocnić podstawy technologiczne i organizacyjne.'

describe('buildRecommendations', () => {
  it('adds technology rec when tech < 50%', () => {
    const answers = {
      ...fillDimension('technology', 0),
      ...fillDimension('organization', 2),
      ...fillDimension('environment', 2),
      ...fillDimension('process', 2),
    }
    const recs = buildRecommendations(calculateScores(answers))
    expect(recs).toContain(TECH_REC)
  })

  it('adds special rule when overall >= 67% and process < 50%', () => {
    const answers = {
      ...fillDimension('technology', 2),
      ...fillDimension('organization', 2),
      ...fillDimension('environment', 2),
      ...fillDimension('process', 0),
    }
    const scores = calculateScores(answers)
    expect(scores.overallPercent).toBeGreaterThanOrEqual(67)
    const proc = scores.dimensions.find((d) => d.id === 'process')!
    expect(proc.percent).toBeLessThan(50)
    const recs = buildRecommendations(scores)
    expect(recs).toContain(PROC_REC)
    expect(recs).toContain(HIGH_ORG_LOW_PROC)
  })

  it('adds special rule when overall < 34% and process >= 67%', () => {
    const answers = {
      ...fillDimension('technology', 0),
      ...fillDimension('organization', 0),
      ...fillDimension('environment', 0),
      ...fillDimension('process', 2),
    }
    const scores = calculateScores(answers)
    expect(scores.overallPercent).toBeLessThan(34)
    const proc = scores.dimensions.find((d) => d.id === 'process')!
    expect(proc.percent).toBeGreaterThanOrEqual(67)
    const recs = buildRecommendations(scores)
    expect(recs).toContain(LOW_ORG_HIGH_PROC)
  })
})
