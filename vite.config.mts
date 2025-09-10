import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { tanstackRouter } from '@tanstack/router-plugin/vite'

// https://vite.dev/config/
export default defineConfig({
  base: '',
  plugins: [tanstackRouter(), react()],
  build: {
    outDir: './docs'
  },
})
