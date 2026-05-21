import { describe, expect, it } from 'vitest'
import { renderToBuffer } from '@react-pdf/renderer'
import { PdfReportDocument } from '../components/PdfReportDocument'
import type { AssessmentScores, IntroData } from '../types'

const sampleIntro: IntroData = {
  companySize: 'małe',
  industry: 'IT',
  aiGoal: 'automatyzacja',
  aiGoalOther: '',
  aiUsage: 'częściowo',
  processName: 'Obsługa klienta',
}

const sampleScores: AssessmentScores = {
  overallPercent: 55,
  totalPoints: 22,
  totalMax: 40,
  level: 'medium',
  levelLabel: 'Średnia gotowość',
  interpretation: 'Interpretacja testowa.',
  dimensions: [
    {
      id: 'technology',
      label: 'Technologia',
      percent: 60,
      points: 6,
      maxPoints: 10,
    },
  ],
}

describe('downloadReportPdf document', () => {
  it('renders a non-empty PDF buffer', async () => {
    const buf = await renderToBuffer(
      <PdfReportDocument
        intro={sampleIntro}
        scores={sampleScores}
        recommendations={['Rekomendacja testowa.']}
      />,
    )
    expect(buf.byteLength).toBeGreaterThan(500)
    const header = String.fromCharCode(...new Uint8Array(buf.slice(0, 5)))
    expect(header).toBe('%PDF-')
  })
})
