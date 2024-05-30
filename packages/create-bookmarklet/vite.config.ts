import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    lib: {
      entry: 'src/index.ts',
      fileName: 'index',
      formats: ['es'],
    },
    minify: false,
    rollupOptions: {
      output: {
        exports: 'named',
      },
      external: [
        'prompts',
        'chalk',
        'node:path',
        'node:fs'
      ]
    }
  }
})