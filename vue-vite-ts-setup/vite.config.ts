import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import path from "path";
import vueJsx from "@vitejs/plugin-vue-jsx";
import usePluginImport from "vite-plugin-importer";
import ViteComponents from "unplugin-vue-components/vite";
import {
  AntDesignVueResolver,
  ElementPlusResolver,
  NaiveUiResolver,
} from "unplugin-vue-components/resolvers";
import { generateModifyVars } from "./build/style/generateModifyVars";
// import { LayuiVueResolver } from "@layui/layui-vue";

export default defineConfig({
  // base: "/dist/",
  plugins: [
    vue(),
    vueJsx(),
    // ElementPlus({
    //   // options
    // }),
    ViteComponents({
      dirs: ["./", "./components", "src/components"],
      directoryAsNamespace: true,
      resolvers: [
        AntDesignVueResolver({
          resolveIcons: true,
        }),
        ElementPlusResolver({
          importStyle: "css",
        }),
        NaiveUiResolver(),
        // LayuiVueResolver(),
      ],
      // include: [/@layui/],
      //  extensions: ['vue'],
      // include: [/\.vue$/, /\.vue\?vue/,/[\\/]node_modules[\\/]/],
    }),
    //tsx用
    usePluginImport({
      libraryName: "ant-design-vue",
      libraryDirectory: "es",
      style: "css",
    }),
  ],
  resolve: {
    alias: [
      {
        find: "@",
        replacement: path.resolve(__dirname, "src"),
      },
    ],
  },
  // build: {
  //   rollupOptions: {
  //     output: {

  //       manualChunks(id) {
  //         if (id.includes('node_modules') && id.includes('element-plus')) {
  //           console.log(id)
  //           return id.toString().split('node_modules/')[1].split('/')[0].toString()
  //         }
  //       }
  //     }
  //   }
  // },
  css: {
    preprocessorOptions: {
      less: {
        modifyVars: generateModifyVars(),
        javascriptEnabled: true,
      },
    },
  },
});
