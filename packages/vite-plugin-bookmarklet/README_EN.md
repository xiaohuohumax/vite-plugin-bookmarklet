# @xiaohuohumax/vite-plugin-bookmarklet

A Vite plugin that packages your project into a bookmarklet which can directly run from the browser's bookmarks bar.

[中文](./README.md) | [English](./README_EN.md)

## 📄 Installation

```shell
npm i @xiaohuohumax/vite-plugin-bookmarklet -D
```

## 🔨 Usage

```ts
// vite.config.ts
import { defineConfig } from 'vite';
import bookmarklet from '@xiaohuohumax/vite-plugin-bookmarklet'

export default defineConfig({
  plugins: [
    bookmarklet({
      // plugin options
    })
  ]
});
```

## 🌳 Output Structure

```txt
dist
 ├── assets                 // Static assets for preview
 │   └── logo-BH0Bg1we.png
 ├── bookmarklet.html       // Bookmarklet HTML file
 ├── index.html             // Preview
 ├── index.js               // Executable in console
 └── index.txt              // Browser bookmark
```