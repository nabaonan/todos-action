<template>
  <a-layout class="layout" style="min-height: 100vh">
    <a-layout-header>
      <a-menu
        theme="dark"
        v-model:selectedKeys="selectedKeys"
        mode="horizontal"
        :style="{ lineHeight: '64px' }"
        @select="choose"
      >
        <template :key="nav.key" v-for="nav in navs">
          <a-menu-item>
            {{ nav.displayName }}
          </a-menu-item>
        </template>
      </a-menu>
    </a-layout-header>
    <a-layout-content style="padding: 0 50px; background-color: white">
      <router-view />
    </a-layout-content>
    <a-layout-footer style="text-align: center">
      todo list 实战应用，用于测试vue3，和组件库新特性
    </a-layout-footer>
  </a-layout>
</template>

<script lang="ts">
  import {
    defineComponent,
    reactive,
    ref,
    toRefs,
    unref,
    watch,
    watchEffect,
  } from "vue";

  import { Menu, Layout } from "ant-design-vue";
  import { useRouter } from "vue-router";
  import { registeComp } from "./utils/comp";

  registeComp(Layout);

  interface Nav {
    key: string;
    path: string;
    displayName: string;
  }

  interface MenuState {
    selectedKeys: string[];
  }

  export default defineComponent({
    name: "App",
    components: {
      // [Menu.name]: Menu,
      // [Menu.Item.name]: Menu.Item,
      // [Layout.name]: Layout,
      // [Layout.Header.name]: Layout.Header,
      // [Layout.Content.name]: Layout.Content,
      // [Layout.Footer.name]: Layout.Footer,
    },
    setup() {
      const navs: Nav[] = [
        {
          key: "/tsx",
          path: "/todo-tsx",
          displayName: "antd-define-tsx",
        },
        {
          key: "/tmpl",
          path: "/tmpl",
          displayName: "antd-script-tmpl",
        },
        // {
        //   key: "/script-tsx",
        //   path: "/script-tsx",
        //   displayName: "antd-script-tsx(回显有问题)",
        // },
        {
          key: "/elem-tmpl",
          path: "/elem-tmpl",
          displayName: "elem-tmpl",
        },
        {
          key: "/naive-tmpl",
          path: "/naive-tmpl",
          displayName: "naive-tmpl",
        },
        {
          key: "/layui",
          path: "/layui",
          displayName: "layui",
        },
      ];
      const router = useRouter();
      const state = reactive<MenuState>({
        selectedKeys: [],
      });

      //等路由变了之后激活
      watchEffect(() => {
        state.selectedKeys = [router.currentRoute.value.path];
      });

      const choose = ({
        key,
        item,
        selectedKeys,
      }: {
        item: Nav;
        key: string;
        selectedKeys: string[];
      }): void => {
        state.selectedKeys = [key];
        router.push(key);
      };

      return {
        ...toRefs(state),
        navs,
        choose,
      };
    },
  });
</script>
