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
    pattern: /^Avatar/,
    styleDir: "avatar",
  },
  {
    pattern: /^AutoComplete/,
    styleDir: "auto-complete",
  },
  {
    pattern: /^Anchor/,
    styleDir: "anchor",
  },

  {
    pattern: /^Badge/,
    styleDir: "badge",
  },
  {
    pattern: /^Breadcrumb/,
    styleDir: "breadcrumb",
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
    pattern: /^Card/,
    styleDir: "card",
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
    pattern: /^RangePicker|^WeekPicker|^MonthPicker/,
    styleDir: "date-picker",
  },
  {
    pattern: /^Dropdown/,
    styleDir: "dropdown",
  },

  {
    pattern: /^Form/,
    styleDir: "form",
  },
  {
    pattern: /^InputNumber/,
    styleDir: "input-number",
  },

  {
    pattern: /^Input|^Textarea/,
    styleDir: "input",
  },
  {
    pattern: /^Statistic/,
    styleDir: "statistic",
  },
  {
    pattern: /^CheckableTag/,
    styleDir: "tag",
  },
  {
    pattern: /^Layout/,
    styleDir: "layout",
  },
  {
    pattern: /^Menu|^SubMenu/,
    styleDir: "menu",
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
    pattern: /^Image/,
    styleDir: "image",
  },

  {
    pattern: /^List/,
    styleDir: "list",
  },

  {
    pattern: /^Tab/,
    styleDir: "tabs",
  },
  {
    pattern: /^Mentions/,
    styleDir: "mentions",
  },

  {
    pattern: /^Mentions/,
    styleDir: "mentions",
  },

  {
    pattern: /^Step/,
    styleDir: "steps",
  },
  {
    pattern: /^Skeleton/,
    styleDir: "skeleton",
  },

  {
    pattern: /^Select/,
    styleDir: "select",
  },
  {
    pattern: /^TreeSelect/,
    styleDir: "tree-select",
  },
  {
    pattern: /^Tree|^DirectoryTree/,
    styleDir: "tree",
  },
  {
    pattern: /^Typography/,
    styleDir: "typography",
  },
  {
    pattern: /^Timeline/,
    styleDir: "timeline",
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
            let importStyle = true;
            const importName = name.slice(1);
            let styleDir;
            if (importStyle) {
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
            }

            return {
              importName: importName,
              path: `ant-design-vue/es`,
              sideEffects: importStyle
                ? `ant-design-vue/es/${styleDir}/style`
                : undefined,
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
