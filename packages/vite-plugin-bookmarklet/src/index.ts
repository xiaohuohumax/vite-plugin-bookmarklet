import { Plugin, UserConfig, ConfigEnv } from 'vite'
import { Builder } from '@xiaohuohumax/bookmark';
import mime from 'mime-types';

import path from 'node:path';
import fs from 'node:fs';

/**
 * 插件选项
 */
export interface Options {
  /**
   * 书签名称
   * 
   * @default '入口文件名'
   */
  name?: string
  /**
   * 打包入口文件路径
   */
  entry?: string
  /**
   * 书签图标路径, 推荐 png 图片
   * 
   * @default 'logo.png'
   */
  icon?: string
  /**
   * banner
   * 
   * @default ''
   */
  banner?: string
  /**
   * 打包文件名称
   * 
   * @default 'index.js'
   */
  entryFileNames?: string
  /**
   * 书签HTML文件名称
   * 
   * @default 'bookmarklet.html'
   */
  bookmarkletFileName?: string
  /**
   * 书签HTML模板路径
   * 
   * 模板文件中使用 {{bookmark}} 替换书签代码, 其余样式等代码可自行控制
   * 
   * @example
   * ```html
   * <!DOCTYPE NETSCAPE-Bookmark-file-1>
   * <!-- This is an automatically generated file.
   *     It will be read and overwritten.
   *     DO NOT EDIT! -->
   * <META HTTP-EQUIV="Content-Type" CONTENT="text/html; charset=UTF-8">
   * <TITLE>Bookmarklet</TITLE>
   * <!-- {{bookmark}} 替换书签代码  -->
   * {{bookmark}}
   * 
   * ```
   * 
   * @default 'template.html'
   */
  template?: string
}

/**
 * 默认选项
 */
export const defaultOptions: Options = {
  entryFileNames: 'index.js',
  template: 'template.html',
  bookmarkletFileName: 'bookmarklet.html',
  icon: 'logo.png',
  banner: '',
}

/**
 * 合并选项
 * @param options 配置
 * @param defaultOptions 默认选项
 * @returns 
 */
function mergeOptions(options: Partial<Options>, defaultOptions: Options): Options {
  const mergedOptions = Object.assign({}, defaultOptions);

  Object.entries(options).forEach(([key, value]) => {
    if (value === undefined) {
      return
    }
    mergedOptions[key as keyof Options] = value;
  })

  return mergedOptions
}

/**
 * 读取文件内容并转为base64格式
 * @param file 文件路径
 * @returns 
 */
function file2base64(file?: string) {
  if (file && fs.existsSync(file)) {
    return `data:${mime.lookup(file)};base64,${fs.readFileSync(file).toString('base64')}`;
  }
  return file;
}


/**
 * bookmarklet 插件
 * @param options 插件选项
 * @returns 
 */
export default function (options: Options = defaultOptions): Plugin {
  const mergedOptions = mergeOptions(options, defaultOptions);

  const bookmarklets: { name: string, href: string, icon?: string }[] = [];

  return {
    name: 'vite-plugin-bookmarklet',
    enforce: 'post',
    config(_config: UserConfig, _env: ConfigEnv) {
      return {
        build: {
          assetsInlineLimit: () => true,
          rollupOptions: {
            input: mergedOptions.entry,
            output: {
              format: 'iife',
              entryFileNames: mergedOptions.entryFileNames,
            },
          },
        },
      };
    },

    generateBundle(_options, bundle) {

      for (const chunk of Object.values(bundle)) {
        if (chunk.type !== 'chunk') {
          continue;
        }

        // 书签代码
        const href = `javascript:${encodeURIComponent(chunk.code)}void(0);`
        // 可执行代码
        chunk.code = mergedOptions.banner + chunk.code;

        bookmarklets.push({
          name: mergedOptions.name ?? chunk.name,
          icon: file2base64(mergedOptions.icon),
          href,
        });

        this.emitFile({
          type: 'asset',
          fileName: chunk.fileName.substring(0, chunk.fileName.length - path.extname(chunk.fileName).length) + '.txt',
          source: mergedOptions.banner + href,
        })

      }

      const builder = new Builder({});

      const htmlString = builder.buildHTMLString(bookmarklets, ({ bookmark }) => {
        if (mergedOptions.template && fs.existsSync(mergedOptions.template)) {
          return fs.readFileSync(mergedOptions.template, 'utf-8').replace(/{{\s*bookmark\s*}}/, () => bookmark);
        }
      });

      this.emitFile({
        type: 'asset',
        fileName: mergedOptions.bookmarkletFileName,
        source: htmlString,
      })
    }
  }
}