<template >
  <lay-button type="danger" size="mini" @click="clearAll">清除一切</lay-button>
  <AddFormLay @formSubmit="add"></AddFormLay>
  <lay-line content-position="left">未完成</lay-line>

  <TodoTableLay :data="unfinish" @delete-item="deleteItem"></TodoTableLay>
  <lay-line content-position="left">已完成</lay-line>

  <TodoTableLay :data="finishes" @delete-item="deleteItem"></TodoTableLay>
</template>
<script setup lang="ts">
import { useTodo } from "@/hooks/useTodo";
import type { DataItem } from "@/types/model";
let { finishes, unfinish, add, total, clearAll } = useTodo();
import { useDelete } from "@/hooks/useDelete";
const { deleteItem } = useDelete(total as DataItem[]);
import AddFormLay from './components/AddFormLay.vue'
import TodoTableLay from './components/TodoTableLay.vue'
</script>
<style lang="">
  
</style>