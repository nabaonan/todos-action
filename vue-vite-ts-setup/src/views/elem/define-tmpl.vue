<template>
  <el-button type="danger"  @click="clearAll">清除一切</el-button>
  <add-form @formSubmit="add"></add-form>
  <el-divider content-position="left">未完成</el-divider>
  <!-- <todo-list :data="unfinish" @delete-item="deleteItem"></todo-list> -->
  <TodoTable :data="unfinish" @delete-item="deleteItem"></TodoTable>
  <el-divider content-position="left">已完成</el-divider>
  <!-- <todo-list :data="finishes" @delete-item="deleteItem"></todo-list> -->
  <TodoTable :data="finishes" @delete-item="deleteItem"></TodoTable>
</template>

<script lang="ts">
import { useDelete } from "@/hooks/useDelete";
import { useTodo } from "@/hooks/useTodo";
import { defineComponent } from "vue";
import type { DataItem } from "@/types/model";
import AddForm from "./components/AddForm.vue";

import TodoList from "./components/TodoList.vue";
// import { ElDivider, ElButton } from "element-plus";
import TodoTable from "./components/TodoTable.vue";
// import { ElButton, ElDivider } from "element-plus";
export default defineComponent({
  components: {
    TodoList,
    AddForm,
    // ElDivider,
    // ElButton,
    TodoTable,
  },
  setup() {
    const { finishes, unfinish, add, total, clearAll } = useTodo();
    const { deleteItem } = useDelete(total as DataItem[]);

    return {
      finishes,
      unfinish,
      add,
      total,
      deleteItem,
      clearAll,
    };
  },
});
</script>

<style scoped></style>
