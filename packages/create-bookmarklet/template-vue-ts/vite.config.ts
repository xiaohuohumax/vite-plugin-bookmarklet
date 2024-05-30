import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import bookmarklet from '@xiaohuohumax/vite-plugin-bookmarklet'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    bookmarklet()
  ],
})
