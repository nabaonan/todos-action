import Router, { RawLocation, Route } from "vue-router";
import Vue from 'vue'
import { ErrorHandler } from "vue-router/types/router";
import { component } from "vue/types/umd";
Vue.use(Router);

// 解决导航菜单的时候，重复点击报错的问题
// https://my.oschina.net/u/4256357/blog/4304073
const originalPush = Router.prototype.push
Router.prototype.push = function push(location:any) {
  return (originalPush.call(this, location) as any).catch((err:any) => err)
}



export default new Router({
  // mode:'history',
  routes: [
    {
      path: '/',
      component: ()=>  import("@/views/index.vue"),
    },

    {
      path: "/iview",
      
      component: () => import("@/views/iview/template.vue"),
    },
    {
      path: "/iview-tsx",
      
      component: () => import("@/views/iview/tsx"),
    },
    {
      path: "/iview-setup",
      
      component: () => import("@/views/iview/template-setup.vue"),
    },
    {
      path: "/element",
      
      component: () => import("@/views/elem/template-el.vue"),
    },
    {
      path: "/vuesax",
      
      component: () => import("@/views/vuesax/template-vs.vue"),
    },
  ],
});