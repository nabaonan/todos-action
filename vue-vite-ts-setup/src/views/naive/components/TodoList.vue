<template>
  <n-list bordered>
    <template v-if="!data || !data.length">
      <n-empty> </n-empty>
    </template>

    <template v-else :key="item.id" v-for="item in data">
      <n-list-item>
        <n-thing>
          <template #header>
            <template v-if="item.editing">
              <n-input v-model:value="item.title"></n-input>
            </template>
            <template v-else>
              <div @dblclick="edit(item)">{{ item.title }}</div>
            </template>
          </template>
          <template #description> id= {{ item.id }} </template>
        </n-thing>
        <template #prefix>
          <n-checkbox v-model:checked="item.finish"></n-checkbox>
        </template>
        <template #suffix>
          <div style="width: 200px">
            <n-space>
              <template v-if="item.editing">
                <n-button @click="finishEdit(item)">保存</n-button>
                <n-button @click="cancelEdit(item)">取消</n-button>
              </template>
              <template v-else>
                <n-popconfirm @positive-click="$emit('onDeleteItem', item)">
                  确认删除吗?
                  <template #trigger>
                    <n-button type="error" ghost>删除</n-button>
                  </template>
                </n-popconfirm>
                <n-button @click="edit(item)" type="warning" ghost
                  >编辑</n-button
                >
              </template>
            </n-space>
          </div>
        </template>
      </n-list-item>
    </template>
  </n-list>
</template>

<script lang="ts">
import { defineComponent, toRaw, PropType } from "vue";
import { DataItem } from "@/types/model";
import { useEdit } from "@/hooks/useEdit";
import {
  Checkmark,
  CheckmarkCircle,
  CheckmarkDoneCircleOutline,
  CheckboxOutline,
  Checkbox,
} from "@vicons/ionicons5";

import { AppsAddIn20Filled } from "@vicons/fluent";
export default defineComponent({
  components: {
    Checkmark,
    Checkbox,
    CheckmarkCircle,
    CheckboxOutline,
    CheckmarkDoneCircleOutline,
    AppsAddIn20Filled,
  },
  props: {
    data: {
      type: Array as PropType<DataItem[]>,
    },
  },
  emits: {
    onDeleteItem: (item: DataItem) => toRaw(item),
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

<style scoped></style>
