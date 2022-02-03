<template>
  <el-table :data="data" border>
    <el-table-column label="完成" width="70">
      <template #default="{ row }">
        <el-checkbox v-model="row.finish" />
      </template>
    </el-table-column>
    <el-table-column label="id" prop="id"> </el-table-column>
    <el-table-column label="todo名称" prop="title">
      <template #default="{ row }">
        <template v-if="row.editing">
          <el-input v-model="row.title"></el-input>
        </template>
        <template v-else>
          <div @dblclick="edit(row)">{{ row.title }}</div>
        </template>
      </template>
    </el-table-column>
    <el-table-column title="操作">
      <template #default="{ row }">
        <template v-if="row.editing">
          <el-button type="success" @click="finishEdit(row)" size="small"
            >保存</el-button
          >
          <el-button @click="cancelEdit(row)" size="small">取消</el-button>
        </template>
        <template v-else>
          <el-popconfirm
            title="确认删除吗"
            confirmButtonText="确定"
            cancelButtonText="取消"
            @confirm="$emit('deleteItem', row)"
          >
            <template #reference>
              <el-button type="danger" size="small">删除</el-button>
            </template>
          </el-popconfirm>
          <el-button type="warning" size="small" @click="edit(row)"
            >编辑</el-button
          >
        </template>
      </template>
    </el-table-column>
  </el-table>
</template>

<script lang="ts">
  import { defineComponent, PropType, toRaw } from "vue";
  import { DataItem } from "@/types/model";
  import { useEdit } from "@/hooks/useEdit";
  export default defineComponent({
    props: {
      data: {
        type: Array as PropType<DataItem[]>,
      },
      onDeleteItem: {
        type: Function as PropType<(item: DataItem) => void>,
      },
    },
    emits: {
      deleteItem: (item: DataItem) => {
        return toRaw(item);
      },
    },

    setup(props) {
    
      const { edit, finishEdit, cancelEdit, toggle } = useEdit(
        props.data as DataItem[]
      );

      return {
        edit,
        finishEdit,
        cancelEdit,
        toggle,
      };
    },
  });
</script>

<style scoped>
</style>