<template>
  <a-list item-layout="horizontal" size="small" bordered :data-source="data">
    <template #renderItem="{ item }">
      <a-list-item>
        <a-list-item-meta :description="`id=${item.id}`">
          <template #title>
            <template v-if="item.editing">
              <a-input v-model:value="item.title"></a-input>
            </template>
            <template v-else>
              <div @dblclick="edit(item)">{{ item.title }}</div>
            </template>
          </template>
          <template #avatar>
            <a-checkbox v-model:checked="item.finish"></a-checkbox>
          </template>
        </a-list-item-meta>

        <template #actions>
          <template v-if="item.editing">
            <a-button @click="finishEdit(item)">保存</a-button>
            <a-button @click="cancelEdit(item)">取消</a-button>
          </template>
          <template v-else>
            <a-popconfirm
              title="确认删除吗"
              ok-text="确定"
              cancel-text="取消"
              @confirm="$emit('onDeleteItem', item)"
            >
              <a-button danger ghost>删除</a-button>
            </a-popconfirm>
            <a-button @click="edit(item)">编辑</a-button>
          </template>
          <!-- <a>edit</a>
          <a>more</a>-->
        </template>
      </a-list-item>
    </template>
  </a-list>
</template>

<script lang="ts">
import { defineComponent, toRaw } from "vue";

import { DataItem } from "@/types/model";
import { useEdit } from "@/hooks/useEdit";

export default defineComponent({
  name: "TodoList",
  props: {
    data: {
      type: Array,
    },
  },
  emits: {
    onDeleteItem: (item: DataItem) => toRaw(item),
  },
  components: {
    // [Checkbox.name]: Checkbox,
    // [Input.name]: Input,
    // [List.name]: List,
    // [List.Item.name]: List.Item,
    // AListItemMeta: List.Item.Meta, //这里用框架List.Item.Meta.name注册不上只能写死
    // [Button.name]: Button,
    // [Popconfirm.name]: Popconfirm,
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
<style lang="less" scoped>
@import url("../../common/TodoList.less");
</style>
