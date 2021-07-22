

<template>
  <div>
    <i-button type="error" @click="clearAll">清除一切</i-button>
    <add-form @formSubmit="add" />
    <i-Divider> 未完成 </i-Divider>
    <todo-table :data="unfinish" @deleteItem="deleteItem" />
    <i-Divider> 已完成 </i-Divider>
    <todo-table :data="finishes" @deleteItem="deleteItem" />
  </div>
</template>

<script lang="ts">
  import { useDelete } from "@/hooks/useDelete";
  import { defineComponent } from "@vue/composition-api";

  import { useTodo } from "@/hooks/useTodo";
  export default defineComponent({
    setup() {
      let { finishes, unfinish, total, add, clearAll } = useTodo();

      const { deleteItem } = useDelete(total);

      return {
        unfinish,
        finishes,
        add,
        clearAll,
        deleteItem,
      };
    },
  });
</script>
