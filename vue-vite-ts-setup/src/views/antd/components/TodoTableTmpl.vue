<template>
  <a-table
    :columns="columns"
    rowKey="id"
    bordered
    :pagination="false"
    :data-source="data"
  >
    <template #finish="{ record }">
      <a-checkbox v-model:checked="record.finish"></a-checkbox>
    </template>

    <template #columnTitle="{ record }">
      <template v-if="record.editing">
        <a-input v-model:value="record.title"></a-input>
      </template>
      <template v-else>
        <div @dblclick="edit(record)">{{ record.title }}</div>
      </template>
    </template>

    <template #actions="{ record }">
      <a-space>
        <template v-if="record.editing">
          <a-button type="primary" @click="finishEdit(record)">保存</a-button>
          <a-button @click="cancelEdit(record)">取消</a-button>
        </template>
        <template v-else>
          <a-popconfirm
            title="确认删除吗"
            ok-text="确定"
            cancel-text="取消"
            @confirm="$emit('deleteItem', record)"
          >
            <a-button type="danger" ghost>删除</a-button>
          </a-popconfirm>
          <a-button @click="edit(record)">编辑</a-button>
        </template>
      </a-space>
    </template>
  </a-table>
</template>

<script lang="ts">
  import { defineComponent, PropType, toRaw } from "vue";
  import {
    Table,
    Checkbox,
    Input,
    Space,
    Popconfirm,
    Button,
  } from "ant-design-vue";
  import { useComp } from "@/hooks/useAntd";
  import { DataItem } from "@/types/model";
  import { useEdit } from "@/hooks/useEdit";
  import { ColumnProps } from "ant-design-vue/lib/table/interface";
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
      useComp(Table, Checkbox, Input, Space, Popconfirm, Button);
      const { edit, finishEdit, cancelEdit, toggle } = useEdit(
        props.data as DataItem[]
      );

      let columns: ColumnProps[] = [
        {
          title: "完成",
          fixed: "left",
          width: 70,
          slots: {
            customRender: "finish",
          },
        },
        {
          title: "id",
          dataIndex: "id",
        },
        {
          title: "todo名称",
          key: "title",
          slots: {
            customRender: "columnTitle",
          },
        },
        {
          title: "操作",
          key: "action",
          width: 200,
          fixed: "right",
          slots: {
            customRender: "actions",
          },
        },
      ];

      return {
        edit,
        finishEdit,
        cancelEdit,
        toggle,
        columns,
      };
    },
  });
</script>

<style scoped>
</style>