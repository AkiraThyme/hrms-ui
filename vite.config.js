import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

//libs
import Components from 'unplugin-vue-components/vite'
import AutoImport from 'unplugin-auto-import/vite'
import Icons from 'unplugin-icons/vite'
import IconsResolver from 'unplugin-icons/resolver'

import postcss from './postcss.config.js'

// https://vite.dev/config/
export default defineConfig({
  clearScreen: true,
  plugins: [
    vue(),
    Icons({
      autoInstall: true,
    }),
    Components({
      dirs: ['src/components', 'src'],
      dts: 'components.d.ts',
      resolvers: [
        IconsResolver({
          prefix: 'icon',
        }),
      ],
    }),
    AutoImport({
      imports: [
        'vue',
        'vue-router',
        'pinia',
        'vue/macros',
        '@vueuse/head',
        '@vueuse/core',
      ],
      dts: 'auto-imports.d.ts',
      dirs: ['src/composables', 'src/stores', 'src'],
      vueTemplate: true,

      eslintrc: {
        enabled: true
      }
    })
  ],

  css: {
    postcss
  },

  server: {
    port: 4444
  },

  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
})
