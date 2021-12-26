import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";

const routes: RouteRecordRaw[] = [
  {
    path: "/elem-tmpl",
    component: () => import("@/views/elem/define-tmpl.vue"),
  },
  {
    path: "/tsx",
    component: () => import("../views/antd/define-tsx.vue"),
  },
  {
    path: "/tmpl",
    component: () => import("@/views/antd/script-tmpl.vue"),
  },
  // {
  //   path: "/script-tsx",
  //   component: () => import("@/views/antd/script-tsx.vue"),
  // },
  {
    path: "/naive-tmpl",
    component: () => import("@/views/naive/define-tmpl.vue"),
  },
  {
    path: "/layui",
    component: () => import("@/views/layui/tmpl.vue"),
  }
];

export default createRouter({
  history: createWebHashHistory(),
  routes,
});
