import { defineConfig } from 'vite'
import bookmarklet from '@xiaohuohumax/vite-plugin-bookmarklet'
import { name, version } from './package.json'

const banner = `/**
 * ${name} v${version}
 * (c) 2021-${new Date().getFullYear()} ${name}
 * Released under the MIT License.
 * Date: ${new Date().toLocaleString()}
 */
`

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    bookmarklet({
      name: `${name} v${version}`,
      banner,
      entry: 'src/main.ts',
      bookmarkletFileName: 'index.html'
    })
  ]
})