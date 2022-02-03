<template>
  <template v-if="data && data.length">
    <el-card
      style="margin-bottom: 10px"
      shadow="hover"
      :key="item.id"
      v-for="item in data"
    >
      <el-descriptions :column="3">
        <el-descriptions-item direction="horizontal">
          <el-checkbox v-model="item.finish"></el-checkbox>
        </el-descriptions-item>
        <el-descriptions-item>
          <el-space
            direction="vertical"
            alignment="left"
            style="max-width: 500px"
          >
            <el-row v-if="item.editing">
              <el-input v-model="item.title"></el-input>
            </el-row>
            <el-row v-else>{{ item.title }}</el-row>
            <el-row>id={{ item.id }}</el-row>
          </el-space>
        </el-descriptions-item>

        <el-descriptions-item>
          <el-space
            alignment="end"
            style="width: 100%; justify-content: flex-end"
          >
            <template v-if="item.editing">
              <el-button size="small" @click="finishEdit(item)">保存</el-button>
              <el-button size="small" @click="cancelEdit(item)">取消</el-button>
            </template>
            <template v-else>
              <el-button size="small" @click="edit(item)">编辑</el-button>

              <el-popconfirm
                title="确认删除吗"
                icon="el-icon-warning-outline"
                @confirm="$emit('deleteItem', item)"
              >
                <template #reference>
                  <el-button size="small" type="danger">删除</el-button>
                </template>
              </el-popconfirm>
            </template>
          </el-space>
        </el-descriptions-item>
      </el-descriptions>
    </el-card>
  </template>

  <el-empty description="没有数据" v-else></el-empty>
</template>

<script lang="ts">
  import { defineComponent, PropType, toRaw } from "vue";
  import { DataItem } from "@/types/model";
  import { useEdit } from "@/hooks/useEdit";


  const todoProps = {
    data: {
      type: Array as PropType<DataItem[]>,
    },
    onDeleteItem: {
      type: Function as PropType<(item: DataItem) => void>,
    },
  };
  export default defineComponent({
    name: "ElemTodo",
    props: todoProps,
    emits: {
      deleteItem: (item: DataItem) => toRaw(item),
    },
    setup(props) {
      const { edit, finishEdit, cancelEdit, toggle } = useEdit(
        props.data as DataItem[]
      );

      return {
        toggle,
        edit,
        finishEdit,
        cancelEdit,
        confirm,
      };
    },
  });
</script>

<style scoped lang="less">
  @import url("../../common/TodoList.less");
</style>
