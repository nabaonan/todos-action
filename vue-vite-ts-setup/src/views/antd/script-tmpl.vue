<template>
  <a-button danger @click="clearAll">清除一切</a-button>
  <AddForm @formSubmit="add" />
  <!-- <ATest /> -->
  <!-- <BTest /> -->
  <a-divider orientation="left">待完成</a-divider>

  <!-- <TodoList :data="unfinish" @on-delete-item="deleteItem" /> -->
  <TodoTable :data="unfinish" @deleteItem="deleteItem" />
  <a-divider orientation="left">已完成</a-divider>
  <!-- <TodoList :data="finishes" @on-delete-item="deleteItem" /> -->
  <TodoTable :data="finishes" @delete-item="deleteItem" />
</template>

<script setup lang="ts">
import AddForm from "./components/AddForm.vue";


import type { DataItem } from "@/types/model";
import { useTodo } from "@/hooks/useTodo";
import { useDelete } from "@/hooks/useDelete";
import TodoTable from "./components/TodoTableTmpl.vue";

let { finishes, unfinish, add, total, clearAll } = useTodo();
const { deleteItem } = useDelete(total as DataItem[]);
</script>
