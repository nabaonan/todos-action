<template>
  <div>
    <vs-button danger @click="clearAll"> 清除一切 </vs-button>
    <add-form-vs @formSubmit="add" />
    <todo-table-vs :data="unfinish" @deleteItem="deleteItem" />
    <todo-table-vs :data="finishes" @deleteItem="deleteItem" />
  </div>
</template>

<script lang="ts">
  import { defineComponent } from "@vue/composition-api";

  import { useDelete } from "@/hooks/useDelete";

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

<style scoped>
</style>