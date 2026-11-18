import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    sourcemap: true,
    // three.js is ~530 kB but loads lazily after first paint (see SceneCanvas)
    chunkSizeWarningLimit: 600,
  },
  server: {
        watch: {
            usePolling: true,
        },
    },
});
