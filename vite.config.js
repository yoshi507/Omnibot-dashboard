import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

/**
 * Same-origin (OmniBot API) build uses base `/`.
 * GitHub Pages can override with VITE_BASE=/Omnibot-dashboard/
 */
export default defineConfig({
  plugins: [react()],
  base: process.env.VITE_BASE || '/',
})
