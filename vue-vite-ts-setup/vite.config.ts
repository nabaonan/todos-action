import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import styleImport from "vite-plugin-style-import";
import path from "path";
import vueJsx from "@vitejs/plugin-vue-jsx";
import usePluginImport from "vite-plugin-importer";
import ViteComponents, {
  AntDesignVueResolver,
  ElementPlusResolver,
  ImportInfo,
  kebabCase,
  NaiveUiResolver,
} from "vite-plugin-components";
import { generateModifyVars } from "./build/style/generateModifyVars";
// https://vitejs.dev/config/
interface IMatcher {
  pattern: RegExp;
  styleDir: string;
}

export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),
    ViteComponents({
      customComponentResolvers: [
        AntDesignVueResolver(),
        NaiveUiResolver(),
        // ElementPlusResolver()
        name => {
          if (name.match(/^El[A-Z]/)) {
            //element-plus resolver
            const dirName = kebabCase(name.slice(2));

            return {
              importName: name,
              path: `element-plus/es`,
              sideEffects: `element-plus/es/components/${dirName}/style/css`,
            };
          }
        },
      ],
      globalComponentsDeclaration: true,
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
  css: {
    preprocessorOptions: {
      less: {
        modifyVars: generateModifyVars(),
        javascriptEnabled: true,
      },
    },
  },
});
