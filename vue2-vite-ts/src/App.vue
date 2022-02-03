<template>
  <div>
    <el-header>
      <el-menu :default-active="activeKey" mode="horizontal" @select="choose">
        <template v-for="nav in navs" >
          <el-menu-item :index="nav.key">{{
            nav.displayName
          }}</el-menu-item>
        </template>
      </el-menu>
    </el-header>
    <el-main>
      <router-view></router-view>
    </el-main>

    <vs-navbar
      style="top: inherit; bottom: 0"
      hideScroll
      text-white
      fixed
      square
      color="#1e2023"
      center-collapsed
      v-model="activeKey"
    >
      <template v-for="nav in navs">
        <vs-navbar-item  :id="nav.key" @click="choose(nav.key)">
          {{ nav.displayName }}
        </vs-navbar-item>
      </template>
    </vs-navbar>
  </div>
</template>
<script lang="ts">
interface Nav {
  key: string;
  path: string;
  displayName: string;
}

interface MenuState {
  selectedKeys: string[];
}
import { defineComponent, ref, watchEffect } from "@vue/composition-api";

export default defineComponent({
  setup(props, { root }) {
    const navs: Nav[] = [
      {
        key: "/iview",
        path: "/iview",
        displayName: "iview",
      },
      {
        key: "/iview-tsx",
        path: "/iview-tsx",
        displayName: "iview-tsx",
      },
      {
        key: "/iview-setup",
        path: "/iview-setup",
        displayName: "iview-setup",
      },
      {
        key: "/element",
        path: "/element",
        displayName: "element",
      },
      {
        key: "/vuesax",
        path: "/vuesax",
        displayName: "vuesax",
      },
    ];

    const activeKey = ref("iview");
    return {
      activeKey,
      navs,
    };
  },
  mounted() {
    watchEffect(() => {
      this.activeKey = this.$route.path;
    });
  },
  methods: {
    choose(key: string) {
      this.activeKey = key;
      console.log(key);
      this.$router.push({
        path: key,
      });
    },
  },
});
</script>

<style scoped>
.el-header {
  width: 100%;
}
</style>
