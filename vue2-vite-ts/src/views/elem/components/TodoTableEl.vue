<template>
  <el-table :data="data" border>
    <el-table-column label="完成" width="70">
      <template #default="{ row }">
        <el-checkbox v-model="row.finish" />
      </template>
    </el-table-column>
    <el-table-column label="id" prop="id" width="200"> </el-table-column>
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
    <el-table-column title="操作" width="200">
      <template #default="{ row }">
        <template v-if="row.editing">
          <el-button type="success" @click="finishEdit(row)" size="small"
            >保存</el-button
          >
          <el-divider direction="vertical"></el-divider>
          <el-button @click="cancelEdit(row)" size="small">取消</el-button>
        </template>
        <template v-else>
          <el-popconfirm
            title="确认删除吗"
            confirmButtonText="确定"
            cancelButtonText="取消"
            @confirm="$emit('delete-item', row)"
          >
            <template #reference>
              <el-button type="danger" size="small" plain>删除</el-button>
            </template>
          </el-popconfirm>
          <el-divider direction="vertical"></el-divider>
          <el-button type="text" @click="edit(row)">编辑</el-button>
        </template>
      </template>
    </el-table-column>
  </el-table>
</template>

<script lang="ts">
  import { defineComponent, PropType, toRaw } from "@vue/composition-api";

  import { DataItem } from "@/types/model";
  import { useEdit } from "@/hooks/useEdit";

  import "element-ui/lib/theme-chalk/popover.css"; //解决按需加载漏掉的样式，这个是elem 的bug

  export default defineComponent({
    props: {
      data: {
        type: Array as PropType<DataItem[]>,
      },
      onDeleteItem: {
        type: Function as PropType<(item: DataItem) => void>,
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