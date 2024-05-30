import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    lib: {
      entry: 'src/index.ts',
      fileName: 'index',
      formats: ['es', 'cjs'],
    },
    minify: false,
    rollupOptions: {
      output: {
        exports: 'named',
      },
      external: [
        '@xiaohuohumax/bookmark',
        'mime-types',
        'node:path',
        'node:fs'
      ]
    }
  }
})