<script setup lang="ts">
import { DataItem } from "@/types/model";
import { reactive, ref } from "vue";

const visible = ref(false);

const currentData = reactive<DataItem>({
  id: "",
  finish: false,
  title: "",
});
defineExpose({
  show: (data?: DataItem) => {
    console.log("show", data);
    visible.value = true;
    Object.assign(currentData, data);
  },
});
</script>

<template>
  <a-drawer
    title="查看"
    placement="right"
    :closable="false"
    v-model:visible="visible"
  >
    <a-typography>
      <a-typography-title>标题：{{ currentData.title }}</a-typography-title>
    </a-typography>
  </a-drawer>
</template>
