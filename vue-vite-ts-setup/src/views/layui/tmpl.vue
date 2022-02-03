<script setup lang="ts">
import { useTodo } from "@/hooks/useTodo";
import type { DataItem } from "@/types/model";
import AddFormLay from './components/AddFormLay.vue'
import TodoTableLay from './components/TodoTableLay.vue'
import { useDelete } from "@/hooks/useDelete";
let { finishes, unfinish, add, total, clearAll } = useTodo();
const { deleteItem } = useDelete(total as DataItem[]);
</script>

<template >
  <lay-button type="danger"  >清除一切</lay-button> 
 <AddFormLay @formSubmit="add"></AddFormLay>
  <lay-line content-position="left">未完成</lay-line>

  <TodoTableLay :data="unfinish" @delete-item="deleteItem"></TodoTableLay>
  <lay-line content-position="left">已完成</lay-line>

  <TodoTableLay :data="finishes" @delete-item="deleteItem"></TodoTableLay>
</template>
