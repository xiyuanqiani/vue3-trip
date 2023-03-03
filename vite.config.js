import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import Components from 'unplugin-vue-components/vite';
import { VantResolver } from 'unplugin-vue-components/resolvers';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    Components({
      resolvers: [VantResolver()],
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  server: {
    proxy: {
    '/api': {// 匹配所有以 '/api'开头的请求路径
      target: 'http://123.207.32.32:1888',// 代理目标的基础路径
      changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
    }
  }
}
})
