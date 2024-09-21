import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// // https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [react()],
// })

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/login' : 'http://localhost:8080'
    }, // Specify the port for the dev server
    cors: true,  // Enable CORS
  },
  build: {
    outDir: 'dist', // Output directory for production build
  },
  resolve: {
    alias: {
      '@': '/src', // Create an alias for easier imports
    },
  },
});
