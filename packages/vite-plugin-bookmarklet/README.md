# @xiaohuohumax/vite-plugin-bookmarklet

vite 插件，可以将项目打包构建成一个可以直接在浏览器书签栏中运行的 bookmarklet。

[中文](./README.md) | [English](./README_EN.md)

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

## 🌳 输出结构

```txt
dist
 ├── assets                 // 预览使用的静态资源
 │   └── logo-BH0Bg1we.png
 ├── bookmarklet.html       // 可导入书签的 html
 ├── index.html             // 预览
 ├── index.js               // 控制台可执行
 └── index.txt              // 浏览器书签
```