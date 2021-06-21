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

function getCompPath(
  compName: string
): {
  dirName: string;
  compName: string;
  styleDir: string;
  importName?: string;
  sideEffects?: ImportInfo;
} {
  const hasSubComp = [
    "Menu",
    "Layout",
    "Form",
    "Table",
    "Modal",
    "Radio",
    "Button",
    "Checkbox",
    "List",
    "Collapse",
    "Descriptions",
    "Tabs",
    "Mentions",
    "Select",
    "Anchor",
    "Typography",
    // "TreeSelect",
  ]; //包含子组件的组件
  const keepSelf = [
    "MenuItem",
    "SubMenu",
    "FormItem",
    "RadioButton",
    "CollapsePanel",
    "TabPane",
    "AnchorLink",
  ]; //保留原子组件名称
  const keepFather = [
    "LayoutHeader",
    "LayoutContent",
    "LayoutFooter",
    "DescriptionsItem",
  ]; //需要使用父组件名称的子组件  LayoutFooter->''  之所以转成空是因为最后拼接的结果是dirName+compName，避免重复
  const rootName = hasSubComp.find((name: string) => compName.startsWith(name));
  const usePrevLevelName = ["ListItemMeta"]; //使用当前组件的上一级名称  ListItemMeta->Item
  const getPrevLevelName = () => {
    const split = kebabCase(compName).split("-");
    return pascalCase(split[split.length - 2]);
  };

  const fatherAlias = {
    TabPane: "vc-tabs/src",
    MentionsOption: "vc-mentions/src",
    SelectOption: "vc-select",
    TreeSelectNode: "vc-tree-select/src",
  };

  const compAlias = {
    TreeSelectNode: "SelectNode",
  };

  const styleMap = {
    TabPane: "tabs",
    MentionsOption: "mentions",
    SelectOption: "select",
    TreeSelectNode: "tree-select",
  };
  // const importNameMap = {
  //   LayoutContent: "Content",
  //   LayoutHeader: "Header",
  //   LayoutFooter: "Footer",
  // };

  let dirName = rootName?.toLowerCase() ?? kebabCase(compName);

  if (fatherAlias[compName]) {
    dirName = fatherAlias[compName];
  }

  let compNameStr = "";
  if (keepSelf.includes(compName)) {
    compNameStr = compName;
  } else if (keepFather.includes(compName)) {
    compNameStr = "";
  } else if (usePrevLevelName.includes(compName)) {
    compNameStr = getPrevLevelName();
  } else if (rootName) {
    compNameStr = compName.replace(rootName, "");
  }
  const compRequired = {
    TypographyTitle: "ant-design-vue/es/" + dirName + "/Base",
    TypographyText: "ant-design-vue/es/" + dirName + "/Base",
  };

  return {
    // importName: importNameMap[compName],
    dirName: fatherAlias[compName] ?? dirName,
    styleDir: `${styleMap[compName] ?? dirName}`,
    compName: compAlias[compName] ?? compNameStr,
    sideEffects: compRequired[compName]
      ? {
          path: compRequired[compName],
        }
      : undefined,
  };
}

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
            //ant-design-vue

            const importName = name.slice(1);
            const dirName = kebabCase(importName);
            const compName = pascalCase(importName); //AListItem->ListItem
            const compPath = getCompPath(compName);

            const sideEffects = [
              {
                path: `ant-design-vue/es/${compPath.styleDir}/style`,
              },
            ];
            if (compPath.sideEffects) {
              sideEffects.push(compPath.sideEffects);
            }
            return {
              path: `ant-design-vue/es/${compPath.dirName}/${compPath.compName}`,
              sideEffects,
            };
          }
          return null;
        },
      ],
      globalComponentsDeclaration: true,
    }),
    usePluginImport({
      libraryName: "ant-design-vue",
      libraryDirectory: "es",
      style: "css",
    }),

    // styleImport({
    //   libs: [
    //     {
    //       libraryName: "element-plus",
    //       esModule: true,
    //       ensureStyleFile: true,
    //       resolveStyle: name => {
    //         return `element-plus/lib/theme-chalk/${name}.css`;
    //       },
    //       resolveComponent: name => {
    //         return `element-plus/lib/${name}`;
    //       },
    //     },
    //   ],
    // }),
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
