import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import * as path from 'path'; 

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  css: {
    postcss: './postcss.config.mjs',
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src/"),
      "@i":path.resolve(__dirname, "./src/assets/images/"),
    },
  },
  server: {
    port: 3000
  }
})
