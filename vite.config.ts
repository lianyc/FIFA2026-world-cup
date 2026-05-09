import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { fileURLToPath, URL } from 'node:url'

export default defineConfig({
  plugins: [vue()],
  base: './',
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  server: {
    host: '0.0.0.0',
    port: 5173,
    proxy: {
      '/api/fixtures': {
        target: 'https://fixturedownload.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/fixtures/, '/feed/json/fifa-world-cup-2026'),
        headers: { 'User-Agent': 'FIFA2026-App/1.0' },
      },
    },
  },
})
