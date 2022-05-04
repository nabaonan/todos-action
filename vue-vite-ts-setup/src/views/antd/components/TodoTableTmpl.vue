<template>
  <a-table
    :columns="columns"
    rowKey="id"
    bordered
    :pagination="false"
    :data-source="data"
  >
    <template #bodyCell="{ record, column }">
      <template v-if="column.key == 'title'">
        <template v-if="record.editing">
          <a-input v-model:value="record.title"></a-input>
        </template>
        <template v-else>
          <div @dblclick="edit(record)">{{ record.title }}</div>
        </template>
      </template>
      <template v-else-if="column.key == 'finish'">
        <a-checkbox v-model:checked="record.finish"></a-checkbox>
      </template>
      <template v-else-if="column.key == 'action'">
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
              <a-button danger ghost>删除</a-button>
            </a-popconfirm>
            <a-button @click="edit(record)" ghost type="primary">编辑</a-button>

            <a-button type="link" @click="() => showDrawer(record)"
              >详细</a-button
            >
          </template>
        </a-space>
      </template>
    </template>
  </a-table>
  <InfoDrawer ref="drawer"></InfoDrawer>
</template>

<script lang="ts">
import { defineComponent, PropType, ref, toRaw } from "vue";
import { DataItem } from "@/types/model";
import { useEdit } from "@/hooks/useEdit";
import InfoDrawer from "./InfoDrawer.vue";
import { ColumnType } from "ant-design-vue/lib/table/interface";
export default defineComponent({
  props: {
    data: {
      type: Array as PropType<DataItem[]>,
    },

    onDeleteItem: {
      type: Function as PropType<() => void>,
    },
  },
  components: {
    InfoDrawer,
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

    const drawer = ref<typeof InfoDrawer | null>(null);
    const showDrawer = (item: DataItem) => {
      console.log("item", drawer.value);
      drawer.value?.show(item);
    };

    let columns: ColumnType[] = [
      {
        title: "完成",
        fixed: "left",
        key: "finish",
        width: 70,
      },
      {
        title: "id",
        dataIndex: "id",
      },
      {
        title: "todo名称",
        key: "title",
      },
      {
        title: "操作",
        key: "action",
        width: 200,
        fixed: "right",
      },
    ];

    return {
      edit,
      drawer,
      showDrawer,
      finishEdit,
      cancelEdit,
      toggle,
      columns,
    };
  },
});
</script>
