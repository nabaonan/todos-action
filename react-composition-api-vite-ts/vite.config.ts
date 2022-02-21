import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import reactRefresh from '@vitejs/plugin-react-refresh'
import path from 'path'
import vitePluginImp, { } from 'vite-plugin-imp'
// @ts-ignore
import JsxModelTransform from 'plain-design-composition/plugins/vite-plugin-react-jsx-model'


// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),


  vitePluginImp({
    libList: [

      {
        libName: 'antd',
        style(name) {
          // use less
          return `antd/es/${name}/style/css.js`
        }
      },
    ]
  }),

  JsxModelTransform(),
  reactRefresh()

  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
      vue: 'plain-design-composition',
      '@vue/composition-api': 'plain-design-composition',
      '@vue/runtime-dom': 'plain-design-composition',
    },
  },
})
