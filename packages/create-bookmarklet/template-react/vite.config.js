import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import bookmarklet from '@xiaohuohumax/vite-plugin-bookmarklet'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    bookmarklet()
  ],
})
