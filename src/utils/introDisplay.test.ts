import { describe, expect, it } from 'vitest'
import { formatAiGoalDisplay } from './introDisplay'
import type { IntroData } from '../types'

const baseIntro = (): IntroData => ({
  companySize: 'małe',
  industry: 'IT',
  aiGoal: 'analiza',
  aiGoalOther: '',
  aiUsage: 'nie',
  processName: 'X',
})

describe('formatAiGoalDisplay', () => {
  it('shows standard label for preset goal', () => {
    expect(formatAiGoalDisplay(baseIntro())).toBe('Analiza danych')
  })

  it('shows custom text for inne', () => {
    const intro = { ...baseIntro(), aiGoal: 'inne' as const, aiGoalOther: '  R&D  ' }
    expect(formatAiGoalDisplay(intro)).toBe('Inne: R&D')
  })
})
