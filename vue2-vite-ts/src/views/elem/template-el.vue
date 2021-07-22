<template>
  <div>
    <el-button type="danger" size="mini" @click="clearAll">清除一切</el-button>
    <add-form @formSubmit="add"></add-form>
    <el-divider content-position="left">未完成</el-divider>

    <todo-table-el :data="unfinish" @delete-item="deleteItem"></todo-table-el>
    <el-divider content-position="left">已完成</el-divider>

    <todo-table-el :data="finishes" @delete-item="deleteItem"></todo-table-el>
  </div>
</template>

<script lang="ts">
  import { useDelete } from "@/hooks/useDelete";
  import { useTodo } from "@/hooks/useTodo";
  import { defineComponent } from "@vue/composition-api";
  import type { DataItem } from "@/types/model";
  export default defineComponent({
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
