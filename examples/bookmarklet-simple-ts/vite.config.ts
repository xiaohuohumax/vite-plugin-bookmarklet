import { defineConfig } from 'vite'
import bookmarklet from '@xiaohuohumax/vite-plugin-bookmarklet'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    bookmarklet({
      entry: 'src/main.ts',
    })
  ]
})