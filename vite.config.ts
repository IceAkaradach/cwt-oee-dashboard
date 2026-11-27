import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    port: 5173,
    proxy: {
      '/cwt-proxy': {
        target: 'https://cwt.mtflows.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/cwt-proxy/, ''),
      },
    },
  },
})
