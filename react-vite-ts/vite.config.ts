import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from "path";
import vitePluginImp, { } from 'vite-plugin-imp'
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
    })
  ],
  resolve: {
    alias: [
      {
        find: "@",
        replacement: path.resolve(__dirname, "src"),
      },
    ],
  },
})
