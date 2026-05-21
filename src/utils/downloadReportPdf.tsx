import { pdf } from '@react-pdf/renderer'
import {
  PdfReportDocument,
  type PdfReportDocumentProps,
} from '../components/PdfReportDocument'
import { ensurePdfFontsRegistered } from '../pdf/registerFonts'

const PDF_FILE_NAME = 'raport-gotowosci-ai.pdf'

export async function downloadReportPdf(
  props: PdfReportDocumentProps,
): Promise<void> {
  ensurePdfFontsRegistered()
  const blob = await pdf(<PdfReportDocument {...props} />).toBlob()
  if (!blob.size) {
    throw new Error('Pusty dokument PDF.')
  }
  const url = URL.createObjectURL(blob)
  try {
    const link = document.createElement('a')
    link.href = url
    link.download = PDF_FILE_NAME
    link.rel = 'noopener'
    link.click()
  } finally {
    URL.revokeObjectURL(url)
  }
}
