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
  pascalCase,
} from "vite-plugin-components";
import { generateModifyVars } from "./build/style/generateModifyVars";
// https://vitejs.dev/config/
interface IMatcher {
  pattern: RegExp;
  styleDir: string;
}
const matchComponents: IMatcher[] = [
  {
    pattern: /^Menu/,
    styleDir: "menu",
  },
  {
    pattern: /^Layout/,
    styleDir: "menu",
  },
  {
    pattern: /^Form/,
    styleDir: "form",
  },
  {
    pattern: /^Table/,
    styleDir: "table",
  },
  {
    pattern: /^Radio/,
    styleDir: "radio",
  },
  {
    pattern: /^Dropdown/,
    styleDir: "dropdown",
  },
  {
    pattern: /^Button/,
    styleDir: "button",
  },
  {
    pattern: /^Checkbox/,
    styleDir: "checkbox",
  },
  {
    pattern: /^List/,
    styleDir: "list",
  },
  {
    pattern: /^Collapse/,
    styleDir: "collapse",
  },
  {
    pattern: /^Descriptions/,
    styleDir: "descriptions",
  },
  {
    pattern: /^Tabs/,
    styleDir: "tabs",
  },
  {
    pattern: /^Mentions/,
    styleDir: "mentions",
  },
  {
    pattern: /^Select/,
    styleDir: "select",
  },
  {
    pattern: /^Mentions/,
    styleDir: "mentions",
  },
  {
    pattern: /^Anchor/,
    styleDir: "anchor",
  },
  {
    pattern: /^Typography/,
    styleDir: "typography",
  },
  {
    pattern: /^TreeSelect/,
    styleDir: "tree-select",
  },
  {
    pattern: /^Tree/,
    styleDir: "tree",
  },
  {
    pattern: /^Step/,
    styleDir: "steps",
  },
  {
    pattern: /^RangePicker|^WeekPicker|^MonthPicker/,
    styleDir: "date-picker",
  },
];
export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),
    ViteComponents({
      customComponentResolvers: [
        // AntDesignVueResolver(),
        // ElementPlusResolver(),
        NaiveUiResolver(),
        name => {
          if (name.startsWith("El")) {
            // Element UI
            const partialName = kebabCase(name); //ElButton->el-button
            return {
              path: `element-plus/lib/${partialName}`,
              sideEffects: `element-plus/lib/theme-chalk/${partialName}.css`,
            };
          } else if (name.match(/^A[A-Z]/)) {
            //Ant-Design-Vue

            const importName = name.slice(1);
            let styleDir;
            const total = matchComponents.length;
            for (let i = 0; i < total; i++) {
              const matcher = matchComponents[i];
              if (importName.match(matcher.pattern)) {
                styleDir = matcher.styleDir;
                break;
              }
            }

            if (!styleDir) {
              styleDir = kebabCase(importName);
            }

            return {
              importName: importName,
              path: `ant-design-vue/es`,
              sideEffects: `ant-design-vue/es/${styleDir}/style`,
            };
          }
          return null;
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
