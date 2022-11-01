import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./', import.meta.url))
    }
  },build:
  {
    rollupOptions: {
      input: {
        blog: fileURLToPath(new URL('./blog.html', import.meta.url)),
        // cv: fileURLToPath(new URL('./cv.html', import.meta.url)),
        index: fileURLToPath(new URL('./index.html', import.meta.url)),
        // recruit_me: fileURLToPath(new URL('./recruit-me.html', import.meta.url)),
      },
    },
  }
  
})
