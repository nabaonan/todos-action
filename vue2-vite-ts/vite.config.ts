import { createVuePlugin } from "vite-plugin-vue2";

import {
  ElementUiResolver,
  ViewUiResolver,
} from "unplugin-vue-components/resolvers";

import ViteComponents from "unplugin-vue-components/vite";
import { defineConfig } from "vite";
import { viteCommonjs } from "@originjs/vite-plugin-commonjs";
import ScriptSetup from "unplugin-vue2-script-setup/vite";

//-------vuesax  Resolver------------
const renameMatcher: Record<string, string> = {
  VsTr: "vsTableTr",
  VsTh: "vsTableTh",
  VsTd: "vsTableTd",
};
const renameDir = (compName: string): string => {
  const renameDir = renameMatcher[compName];
  return renameDir ?? `${compName[0].toLowerCase()}${compName.slice(1)}`;
};

const getPath: (compName: string) => string = compName => {
  return `vuesax/dist/${renameDir(compName)}`;
};
//-------vuesax  Resolver------------

import vitePluginImport from "vite-plugin-babel-import";
import path from "path";
export default defineConfig({
  // 配置别名
  resolve: {
    alias: [
      {
        find: /^~/,
        replacement: "",
      },
      {
        find: "@",
        replacement: path.resolve(__dirname, "src"),
      },
    ],
  },
  css: {
    preprocessorOptions: {
      less: {
        javascriptEnabled: true,
      },
    },
  },

  plugins: [
    //参考： https://juejin.cn/post/6973928601523585055
    createVuePlugin({
      jsx: true,
      // vueTemplateOptions: {
      //   compilerOptions: {
      //     whitespace: "condense",
      //   },
      // },
    }),

    ScriptSetup({
      /* options */
    }),

    viteCommonjs(),

    //jsx和render函数按需加载
    // vitePluginImport([
    //   {
    //     libraryName: "view-design",
    //     libraryDirectory: "src/components",
    //     style(name) {
    //       return `view-design/dist/styles/iview.css`;
    //     },
    //     ignoreStyles: [],
    //   },
    // ]),

    //template自动按需加载

    ViteComponents({
      dirs: ["src/views"],

      resolvers: [
        // VuesaxResolver(),
        ViewUiResolver(),
        ElementUiResolver(),
        // AntDesignVueResolver(),
        name => {
          if (name.match(/^Vs[A-Z]/)) {
            return {
              path: getPath(name),
              sideEffects: ["vuesax/dist/vuesax.css"],
            };
          }

          // else if (name.match(/^Ui[A-Z]/)) {
          //   // const compName = name.slice(2)
          //   // const partialName = kebabCase(compName)
          //   return {
          //     // importName: compName,
          //     path: `keen-ui/lib/${name}.js`,
          //     // sideEffects: `keen-ui/dist/keen-ui.css`

          //   }
          // }
          // else if (name.match(/^Mt[A-Z]/)) {
          //   const compName = name.slice(2);
          //   const partialName = kebabCase(compName);
          //   return {
          //     importName: compName,
          //     path: `mint-ui/lib/${partialName}`,
          //     sideEffects: `mint-ui/lib/${partialName}/${partialName}.scss`,
          //   };
          // }
          // else if (name.match(/^B[A-Z]/)) {
          //   const compName = name.slice(1)
          //   const partialName = kebabCase(compName)
          //   const camel =  camelCase(name)
          //   console.log(partialName, camel)

          //   return {
          //     path: `buefy/dist/components/button/index`,
          //     sideEffects: 'buefy/dist/buefy.min.css'

          //   }
          // }
          return null;
        },
      ],
    }),
  ],
});
