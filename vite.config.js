import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Project Pages path must match the GitHub repo name (case-sensitive).
// Repo: yoshi507/Omnibot-dashboard → https://yoshi507.github.io/Omnibot-dashboard/
export default defineConfig({
  plugins: [react()],
  base: process.env.VITE_BASE || '/Omnibot-dashboard/',
})
