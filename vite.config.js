import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  preview: {
    host: true,
    port: 2622,
    allowedHosts: ['app.almadinait.com']
  },
  plugins: [react()],
})
