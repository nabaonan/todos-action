<template>
  <div id="components-affix-demo-target" ref="containerRef" class="scrollable-container">
    <div class="background">
      <a-affix :target="() => containerRef">
        <a-button type="primary">Fixed at the top of container</a-button>
      </a-affix>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref, VNode } from 'vue';

export default defineComponent({
  setup() {
    const containerRef = ref<VNode>();
    return {
      containerRef,
    };
  },
});
</script>
<style>
#components-affix-demo-target.scrollable-container {
  height: 100px;
  overflow-y: scroll;
}
#components-affix-demo-target .background {
  padding-top: 60px;
  height: 300px;
  background-image: url('https://zos.alipayobjects.com/rmsportal/RmjwQiJorKyobvI.jpg');
}
</style>
