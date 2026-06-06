import { describe, expect, it } from 'vitest'
import { technologyQuestions } from '../data/questions'
import type { IntroData } from '../types'
import { validateIntro, validateQuestions } from './validation'

const validIntro = (): IntroData => ({
  companySize: 'małe',
  industry: 'Produkcja',
  aiGoal: 'automatyzacja',
  aiGoalOther: '',
  aiUsage: 'częściowo',
  processName: 'Obsługa zamówień',
})

describe('validateIntro', () => {
  it('returns null when all required intro fields are filled', () => {
    expect(validateIntro(validIntro())).toBeNull()
  })

  it('requires company size', () => {
    const intro = { ...validIntro(), companySize: '' as const }
    expect(validateIntro(intro)).toBe('Wybierz wielkość przedsiębiorstwa.')
  })

  it('requires non-empty industry', () => {
    const intro = { ...validIntro(), industry: '   ' }
    expect(validateIntro(intro)).toBe('Podaj branżę przedsiębiorstwa.')
  })

  it('requires ai goal', () => {
    const intro = { ...validIntro(), aiGoal: '' as const }
    expect(validateIntro(intro)).toBe(
      'Wybierz główny cel potencjalnego wdrożenia AI.',
    )
  })

  it('requires description when goal is "inne"', () => {
    const intro = {
      ...validIntro(),
      aiGoal: 'inne' as const,
      aiGoalOther: '  ',
    }
    expect(validateIntro(intro)).toBe(
      'Opisz główny cel wdrożenia AI (opcja „Inne”).',
    )
  })

  it('accepts "inne" with custom text', () => {
    const intro = {
      ...validIntro(),
      aiGoal: 'inne' as const,
      aiGoalOther: 'Optymalizacja magazynu',
    }
    expect(validateIntro(intro)).toBeNull()
  })

  it('requires ai usage', () => {
    const intro = { ...validIntro(), aiUsage: '' as const }
    expect(validateIntro(intro)).toBe('Wskaż, czy firma korzysta z narzędzi AI.')
  })

  it('requires process name', () => {
    const intro = { ...validIntro(), processName: '' }
    expect(validateIntro(intro)).toBe(
      'Podaj nazwę ocenianego procesu biznesowego.',
    )
  })
})

describe('validateQuestions', () => {
  const section = technologyQuestions

  it('returns error when at least one answer is missing', () => {
    const answers = Object.fromEntries(
      section.map((q, i) => [q.id, i === 0 ? undefined : 2]),
    )
    expect(validateQuestions(section, answers)).toBe(
      'Odpowiedz na wszystkie pytania w tej sekcji, aby przejść dalej.',
    )
  })

  it('returns error when no answers are provided', () => {
    expect(validateQuestions(section, {})).toBe(
      'Odpowiedz na wszystkie pytania w tej sekcji, aby przejść dalej.',
    )
  })

  it('returns null when every question in the section is answered', () => {
    const answers = Object.fromEntries(section.map((q) => [q.id, 1]))
    expect(validateQuestions(section, answers)).toBeNull()
  })
})
