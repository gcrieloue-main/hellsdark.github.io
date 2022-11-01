import { defineConfig } from 'vite'
import { resolve } from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        index: resolve(__dirname, 'index.html'),
        cv: resolve(__dirname, 'cv/index.html'),
        blog: resolve(__dirname, 'blog/index.html'),
        "recruit-me": resolve(__dirname, 'recruit-me.html')
      }
    }
  }
})
