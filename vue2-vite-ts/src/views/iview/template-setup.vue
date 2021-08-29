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

<script setup lang="ts">
import { useDelete } from "@/hooks/useDelete";
import { useTodo } from "@/hooks/useTodo";
let { finishes, unfinish, total, add, clearAll } = useTodo();

const { deleteItem } = useDelete(total);
</script>

<style lang="less" scoped></style>
