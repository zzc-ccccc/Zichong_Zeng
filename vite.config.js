import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  base: process.env.NODE_ENV === "production"
  ? '/Zichong_Zeng/'
  : '/',
  build: {
    rollupOptions: {
      input: {
        main: './index.html',
        404: './404.html'
      }
    }
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  }
})
