<template>
  <n-button type="error" @click="clearAll"> 清除一切 </n-button>

  <AddForm @formSubmit="add" />

  <n-divider title-placement="left">待完成</n-divider>
  <!-- <TodoList :data="unfinish" @on-delete-item="deleteItem" /> -->
  <TodoTable :data="unfinish" @delete-item="deleteItem" />
  <n-divider title-placement="left">已完成</n-divider>
  <!-- <TodoList :data="finishes" @on-delete-item="deleteItem" /> -->
  <TodoTable :data="finishes" @delete-item="deleteItem" />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useTodo } from "@/hooks/useTodo";
import { useDelete } from "@/hooks/useDelete";
import { DataItem } from "@/types/model";
// import TodoList from "./components/TodoList.vue";
import AddForm from "./components/AddForm.vue";
import TodoTable from "./components/TodoTable.vue";
export default defineComponent({
  components: {
    // TodoList,
    AddForm, //自动按需的重名的组件通过手动注册可以不警告报错
    TodoTable,
  },
  setup() {
    let { finishes, unfinish, add, total, clearAll } = useTodo();

    const { deleteItem } = useDelete(total as DataItem[]);
    return {
      clearAll,
      finishes,
      unfinish,
      add,
      total,
      deleteItem,
    };
  },
});
</script>

<style scoped></style>
