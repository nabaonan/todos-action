<template>
  <n-data-table
    :single-line="false"
    :row-key="rowKey"
    :columns="columns"
    :data="data"
  />
</template>

<script lang="tsx">
import { computed, defineComponent, h, PropType, VNodeChild } from "vue";
import {
  NSpace,
  NPopconfirm,
  NInput,
  NButton,
  NCheckbox
} from "naive-ui";
import { DataItem } from "@/types/model";
import { RowData } from "naive-ui/lib/data-table/src/interface";
import { useEdit } from "@/hooks/useEdit";
export default defineComponent({
  props: {
    data: {
      type: Array as PropType<DataItem[]>,
    },
    onDeleteItem: {
      type: Function as PropType<(item: DataItem) => void>
    }
  },
  setup(props) {

    const { edit, finishEdit, cancelEdit, toggle } = useEdit(props.data as DataItem[]);

    const renderActions = (item: DataItem): VNodeChild => (

      <NSpace>
        {
          item.editing && (
            <>
              <NButton onClick={() => finishEdit(item)} type="primary">保存</NButton>
              <NButton onClick={() => cancelEdit(item)}>取消</NButton>
            </>
          ) || (
            <>
              <NPopconfirm
                negative-text="取消"
                positive-text="确认"
                onPositiveClick={
                  () => {
                    props.onDeleteItem ? props.onDeleteItem(item) : undefined
                  }
                }
                v-slots={{
                  trigger: () => <NButton type='error' ghost>删除</NButton>
                }}
              >
                确认删除吗?
              </NPopconfirm>
              <NButton onClick={() => edit(item)} type="warning" ghost>编辑</NButton>
            </>
          )
        }

      </NSpace>
    )


    let columns = [
      {
        title: "完成",
        fixed: "left",
        width:70,
        render: (item: RowData) => {
          return <NCheckbox v-model={[(item as any as DataItem).finish, "checked"]}></NCheckbox>
        }
      },
      {
        title: "id",
        key: "id",
      },
      {
        title: "todo名称",
        key: "title",
        render: (item: RowData): VNodeChild => {
          return item.editing ? <NInput v-model={[item.title, "value"]}
          /> : <div onDblclick={() => edit(item as any as DataItem)}>
            {`${item.title}`}
          </div>
        }
      }, {
        title: '操作',
        key: 'action',
        width: 200,

        fixed: 'right',
        render: (rowData: RowData, rowIndex: number): VNodeChild => {
          return renderActions(rowData as any as DataItem)
        }
      }
    ];

    return {
      rowKey: (rowData: RowData): string => { return rowData.id as string },
      columns
    };
  },
});
</script>

<style scoped>
</style>