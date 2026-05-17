import html2canvas from 'html2canvas'
import { jsPDF } from 'jspdf'

const PDF_FILE_NAME = 'raport-gotowosci-ai.pdf'

/**
 * Renders a DOM fragment (Polish UTF-8 via browser fonts) to a multi-page A4 PDF.
 */
export async function generatePdfFromElement(element: HTMLElement): Promise<void> {
  await new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r)))

  const canvas = await html2canvas(element, {
    scale: 2,
    backgroundColor: '#ffffff',
    logging: false,
    useCORS: true,
    foreignObjectRendering: false,
    scrollX: 0,
    scrollY: 0,
    onclone: (doc) => {
      const node = doc.querySelector('[data-pdf-capture]') as HTMLElement | null
      if (node) {
        node.style.opacity = '1'
        node.style.color = '#1e293b'
        node.style.backgroundColor = '#ffffff'
        node.style.minHeight = ''
      }
    },
  })

  if (!canvas.width || !canvas.height) {
    throw new Error('Pusty podgląd raportu — sprawdź szablon PDF.')
  }

  const pdf = new jsPDF({ orientation: 'p', unit: 'mm', format: 'a4' })
  const pageWidth = pdf.internal.pageSize.getWidth()
  const pageHeight = pdf.internal.pageSize.getHeight()
  const imgWidth = pageWidth
  let imgHeight = (canvas.height * imgWidth) / canvas.width
  const imgData = canvas.toDataURL('image/png')

  const PAGE_SLACK_MM = 4

  if (imgHeight <= pageHeight + PAGE_SLACK_MM) {
    if (imgHeight > pageHeight) {
      imgHeight = pageHeight
    }
    pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight)
  } else {
    let heightLeft = imgHeight
    let position = 0

    pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight)
    heightLeft -= pageHeight

    while (heightLeft > PAGE_SLACK_MM) {
      position = heightLeft - imgHeight
      pdf.addPage()
      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight)
      heightLeft -= pageHeight
    }
  }

  pdf.save(PDF_FILE_NAME)
}
