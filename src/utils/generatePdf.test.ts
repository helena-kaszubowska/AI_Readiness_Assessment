import { describe, expect, it } from 'vitest'
import { jsPDF } from 'jspdf'

describe('PDF generation', () => {
  it('jsPDF produces non-empty document', () => {
    const doc = new jsPDF()
    doc.text('Test', 20, 20)
    const buf = doc.output('arraybuffer') as ArrayBuffer
    expect(buf.byteLength).toBeGreaterThan(500)
  })
})
