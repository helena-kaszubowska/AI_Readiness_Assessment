import roboto400Url from '@fontsource/roboto/files/roboto-latin-ext-400-normal.woff?url'
import roboto700Url from '@fontsource/roboto/files/roboto-latin-ext-700-normal.woff?url'
import { Font } from '@react-pdf/renderer'

let registered = false

/** Roboto with Latin Extended — Polish diacritics in PDF (browser). */
export function ensurePdfFontsRegistered(): void {
  if (registered) return
  Font.register({
    family: 'Roboto',
    fonts: [
      { src: roboto400Url, fontWeight: 400 },
      { src: roboto700Url, fontWeight: 700 },
    ],
  })
  registered = true
}
