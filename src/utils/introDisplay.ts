import { AI_GOAL_OPTIONS } from '../data/questions'
import type { IntroData } from '../types'

export function formatAiGoalDisplay(intro: IntroData): string {
  const opt = AI_GOAL_OPTIONS.find((o) => o.value === intro.aiGoal)
  if (!opt) return '—'
  if (intro.aiGoal === 'inne') {
    const detail = (intro.aiGoalOther ?? '').trim()
    return detail ? `Inne: ${detail}` : opt.label
  }
  return opt.label
}
