# @xiaohuohumax/vite-plugin-bookmarklet

vite 插件，可以将项目打包构建成一个可以直接在浏览器书签栏中运行的 bookmarklet。

## 📄 安装

```shell
npm i @xiaohuohumax/vite-plugin-bookmarklet -D
```

## 🔨 使用

```ts
// vite.config.ts
import { defineConfig } from 'vite'
import bookmarklet from '@xiaohuohumax/vite-plugin-bookmarklet'

export default defineConfig({
  plugins: [
    bookmarklet({
      // 配置项
    })
  ]
})
```