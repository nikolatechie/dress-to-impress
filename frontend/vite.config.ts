import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      '/api/v1': {
        target: "http://localhost:8000",
        // changeOrigin: true
      },
      '/api': {
        target: "http://localhost:9327",
        // changeOrigin: true
      },
    }
  },
  plugins: [react()],
})
