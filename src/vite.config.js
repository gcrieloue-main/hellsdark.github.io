import { defineConfig } from 'vite'
import { resolve } from 'path'

// https://vitejs.dev/config/

// Warning ! Build is currently broken, see https://github.com/vitejs/vite/issues/4890
// https://github.com/vitejs/vite/issues/8992
// https://github.com/vitejs/vite/issues/6375
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
