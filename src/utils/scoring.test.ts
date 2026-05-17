import { describe, expect, it } from 'vitest'
import {
  environmentQuestions,
  organizationQuestions,
  processQuestions,
  technologyQuestions,
  TOTAL_MAX_POINTS,
  FORM_STEPS,
} from '../data/questions'
import { calculateScores } from './scoring'
import type { AnswerValue } from '../types'

const ALL_QUESTION_IDS = [
  ...technologyQuestions,
  ...organizationQuestions,
  ...environmentQuestions,
  ...processQuestions,
].map((q) => q.id)

function answersWith(value: AnswerValue): Record<string, AnswerValue> {
  return Object.fromEntries(ALL_QUESTION_IDS.map((id) => [id, value]))
}

describe('questions data', () => {
  it('has 28 scored questions (8+8+6+6)', () => {
    expect(technologyQuestions).toHaveLength(8)
    expect(organizationQuestions).toHaveLength(8)
    expect(environmentQuestions).toHaveLength(6)
    expect(processQuestions).toHaveLength(6)
    expect(ALL_QUESTION_IDS).toHaveLength(28)
  })

  it('exposes all questions in form steps', () => {
    const inForm = FORM_STEPS.flatMap((s) => s.questions)
    expect(inForm).toHaveLength(28)
    expect(inForm.map((q) => q.id).sort()).toEqual([...ALL_QUESTION_IDS].sort())
  })

  it('has non-empty helpText for every scored question', () => {
    const all = [
      ...technologyQuestions,
      ...organizationQuestions,
      ...environmentQuestions,
      ...processQuestions,
    ]
    for (const q of all) {
      expect(q.helpText.trim().length, q.id).toBeGreaterThan(0)
    }
  })
})

describe('calculateScores', () => {
  it('max score: all Tak = 56 pkt, 100%, wysoki poziom', () => {
    const s = calculateScores(answersWith(2))
    expect(s.totalPoints).toBe(56)
    expect(s.totalMax).toBe(TOTAL_MAX_POINTS)
    expect(s.overallPercent).toBe(100)
    expect(s.level).toBe('high')
    s.dimensions.forEach((d) => {
      expect(d.percent).toBe(100)
      expect(d.points).toBe(d.maxPoints)
    })
  })

  it('min score: all Nie = 0 pkt, 0%, niski poziom', () => {
    const s = calculateScores(answersWith(0))
    expect(s.totalPoints).toBe(0)
    expect(s.overallPercent).toBe(0)
    expect(s.level).toBe('low')
  })

  it('total points equal sum of dimension points', () => {
    const partial: Record<string, AnswerValue> = {}
    ALL_QUESTION_IDS.forEach((id, i) => {
      partial[id] = (i % 3) as AnswerValue
    })
    const s = calculateScores(partial)
    const dimSum = s.dimensions.reduce((a, d) => a + d.points, 0)
    expect(s.totalPoints).toBe(dimSum)
    expect(s.overallPercent).toBe(Math.round((dimSum / TOTAL_MAX_POINTS) * 100))
  })

  it('dimension percent matches points/max', () => {
    const s = calculateScores({
      T1: 2,
      T2: 2,
      T3: 2,
      T4: 2,
      T5: 0,
      T6: 0,
      T7: 0,
      T8: 0,
    })
    const tech = s.dimensions.find((d) => d.id === 'technology')!
    expect(tech.points).toBe(8)
    expect(tech.maxPoints).toBe(16)
    expect(tech.percent).toBe(50)
  })

  it('readiness levels at boundaries', () => {
    expect(calculateScores(answersWith(0)).level).toBe('low')
    const medium = calculateScores(answersWith(1))
    expect(medium.totalPoints).toBe(28)
    expect(medium.overallPercent).toBe(50)
    expect(medium.level).toBe('medium')
  })
})
