import type { AppView, AssessmentState } from '../types'

const STORAGE_KEY = 'ai-readiness-v1'

export interface PersistedSession {
  view: AppView
  assessment: AssessmentState
  formStepIndex: number
}

export function readSession(): PersistedSession | null {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY)
    if (!raw) return null
    const data = JSON.parse(raw) as PersistedSession
    if (!data || !['start', 'form', 'results'].includes(data.view)) return null
    if (!data.assessment?.intro || typeof data.assessment.answers !== 'object') return null
    const step = Number(data.formStepIndex)
    data.formStepIndex = Number.isFinite(step) ? Math.max(0, Math.min(4, step)) : 0
    const answers = data.assessment.answers
    for (let i = 1; i <= 6; i++) {
      const oldKey = `S${i}`
      const newKey = `E${i}`
      if (oldKey in answers && !(newKey in answers)) {
        answers[newKey] = answers[oldKey]
        delete answers[oldKey]
      }
    }
    return data
  } catch {
    return null
  }
}

export function writeSession(session: PersistedSession): void {
  try {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(session))
  } catch {
    /* quota / private mode */
  }
}

export function clearSession(): void {
  try {
    sessionStorage.removeItem(STORAGE_KEY)
  } catch {
    /* ignore */
  }
}
