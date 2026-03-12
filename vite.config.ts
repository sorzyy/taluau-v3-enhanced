import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/taluau-v3-enhanced/',
  build: {
    outDir: 'dist',
    sourcemap: true,
  },
})
