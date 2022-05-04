<template>
  <a-table :columns="columns" rowKey="id" bordered :pagination="false" :data-source="data"></a-table>

  <UpdateDrawer ref="drawer"></UpdateDrawer>
</template>

<script lang="tsx">
import { defineComponent, PropType, reactive, ref, toRaw } from 'vue'
import { Table, Checkbox, Input, Space, Popconfirm, Button } from 'ant-design-vue'
import { useComp } from '@/hooks/useAntd'
import { DataItem } from '@/types/model'
import { useEdit } from '@/hooks/useEdit'
import UpdateDrawer from './InfoDrawer.vue'
import { ColumnType } from 'ant-design-vue/lib/table/interface'
export default defineComponent({
  props: {
    data: {
      type: Array as PropType<DataItem[]>,
    },

    onDeleteItem: {
      type: Function as PropType<(item: DataItem) => void>
    }

  },
  emits: {
    deleteItem: (item: DataItem) => {
      console.log('调用deleteItem  emit方法')
      return toRaw(item)
    }
  },
  components: {
    UpdateDrawer
  },
  setup(props, { emit }) {
    // useComp(Table)
    const { edit, finishEdit, cancelEdit, toggle } = useEdit(props.data as DataItem[]);
    const drawer = ref()
    const renderActions = (item: DataItem): JSX.Element => (

      <Space>
        {
          item.editing && (
            <>
              <Button onClick={() => finishEdit(item)} type="primary">保存</Button>
              <Button onClick={() => cancelEdit(item)}>取消</Button>
            </>
          ) || (
            <>
              <Popconfirm
                cancel-text="取消"
                ok-text="确认"
                title="确认删除吗？"
                onConfirm={
                  () => {

                    emit('deleteItem', item);
                  }
                }
              >
                <Button danger ghost>删除</Button>
              </Popconfirm>
              <Button onClick={() => edit(item)} type="primary" ghost>编辑</Button>

              <Button type="link" onClick={() => {
                console.log(drawer)
                drawer.value.show(item)
              }} >详细</Button>
            </>
          )
        }

      </Space>
    )

    let columns: ColumnType[] = [
      {
        title: "完成",
        fixed: "left",
        width: 70,
        customRender: ({ record }: { record: DataItem }) => {
          return <Checkbox v-model={[record.finish, "checked"]}></Checkbox>
        }
      },
      {
        title: "id",
        dataIndex: "id",
      },
      {
        title: "todo名称",
        key: "title",
        customRender: ({ record }: { record: DataItem }): JSX.Element => {
          return record.editing ? <Input v-model={[record.title, "value"]}
          /> : <div onDblclick={() => edit(record)}>
            {`${record.title}`}
          </div>
        }
      }, {
        title: '操作',
        key: 'action',
        width: 200,
        fixed: 'right',
        customRender: ({ record }: { record: DataItem }): JSX.Element => {
          return renderActions(record)
        }
      }
    ];
    return {
      columns,

      drawer
    }
  }
})
</script>

<style scoped>
</style>