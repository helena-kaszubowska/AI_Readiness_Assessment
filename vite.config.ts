import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      'pako/lib/zlib/zstream.js': path.resolve(
        __dirname,
        'node_modules/pako/lib/zlib/zstream.js',
      ),
    },
  },
  optimizeDeps: {
    include: ['@react-pdf/renderer', 'pako'],
  },
})
