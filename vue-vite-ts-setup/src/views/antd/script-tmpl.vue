<template>
  <a-button type="danger" @click="clearAll">清除一切</a-button>
  <AddForm @formSubmit="add" />

  

  <a-divider orientation="left">待完成</a-divider>
  <!-- <TodoList :data="unfinish" @on-delete-item="deleteItem" /> -->
  <TodoTable :data="unfinish" @deleteItem="deleteItem" />
  <a-divider orientation="left">已完成</a-divider>
  <TodoList :data="finishes" @on-delete-item="deleteItem" />
  <!-- <TodoTable :data="finishes" @delete-item="deleteItem" /> -->
</template>

<script setup lang="ts">
  // import { Divider, Button } from "ant-design-vue";
  import { registeComp, regComp } from "@/utils/comp";
  import AddForm from "./components/AddForm.vue";
  import { reactive } from "@vue/reactivity";
  import TodoList from "./components/TodoList.vue";
  import type { DataItem } from "@/types/model";
  import { useTodo } from "@/hooks/useTodo";
  import { useDelete } from "@/hooks/useDelete";
  import { useTodoStore } from "@/store/modules/todo";

  import { mapState, mapActions } from "pinia";
  import { computed } from "@vue/runtime-core";
  import { unref } from "vue";
  import { formProps } from "ant-design-vue/lib/form";
  import { useComp } from "@/hooks/useAntd";
  import TodoTable from "./components/TodoTableTmpl.vue";

  // useComp(Button, Divider);

  let { finishes, unfinish, add, total, clearAll } = useTodo();

  const { deleteItem } = useDelete(total as DataItem[]);
</script>
