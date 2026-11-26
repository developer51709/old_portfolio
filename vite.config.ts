import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// GitHub Pages serves project sites from https://<user>.github.io/<repo>/, so
// production asset URLs need that prefix. Dev stays on / so the local preview
// and same-origin paths keep working. Set BASE_PATH=/ for a custom domain or a
// <user>.github.io repository.
export default defineConfig(({ mode }) => ({
  base: process.env.BASE_PATH ?? (mode === 'production' ? '/old_portfolio/' : '/'),
  plugins: [react()],
  server: {
    host: '0.0.0.0',
    hmr: false,
  },
}))
