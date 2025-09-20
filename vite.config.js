import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // This line tells Vite to treat the index.html file as a static asset
  // and not try to parse it for JS imports, which fixes the CDN script error.
  assetsInclude: ['**/*.html'],
})

