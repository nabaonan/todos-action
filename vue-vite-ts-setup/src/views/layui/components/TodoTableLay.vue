<template>
  <lay-table :columns="columns" :dataSource="data" size="lg">
    <template #finish="{ data }">
      <lay-checkbox v-model="data.finish" skin="primary" label="1"></lay-checkbox>
    </template>

    <template v-slot:title="{ data }">
      <template v-if="data.editing">
        <lay-input v-model="data.title"></lay-input>
      </template>
      <template v-else>
        <div @dblclick="edit(data)">{{ data.title }}</div>
      </template>
    </template>

    <template v-slot:operator="{ data }">
      <template v-if="data.editing">
        <lay-button type="success" @click="finishEdit(data)" size="small">保存</lay-button>
        <lay-button type="primary" @click="cancelEdit(data)" size="small">取消</lay-button>
      </template>
      <template v-else>
        <lay-button type="warning" size="small" @click="edit(data)">编辑</lay-button>

        <lay-button type="danger" size="small" @click="$emit('deleteItem', data)">删除</lay-button>
      </template>
    </template>
  </lay-table>
</template>

<script lang="ts" setup>
import {  PropType, toRaw } from "vue";
import { DataItem } from "@/types/model";
import { useEdit } from "@/hooks/useEdit";

const columns = [
  {
    title: "完成",
    width: '50px',
    customSlot: "finish",
    key: "finish"
  }, {
    title: "todo名称",
      width: "180px",
    customSlot: "title",
    key: "title"
  }, {
    title: "操作",
  width: "100px",
    customSlot: "operator",
    key: "operator"
  }
]

const props = defineProps({
  data: {
    type: Array as PropType<DataItem[]>,
  },
  onDeleteItem: {
    type: Function as PropType<(item: DataItem) => void>,
  },
})

defineEmits({
  deleteItem: (item: DataItem) => {
    return toRaw(item);
  }
})


const { edit, finishEdit, cancelEdit } = useEdit(
  props.data as DataItem[]
);




</script>

<style scoped>
</style>