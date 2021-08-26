

import { defineComponent, defineProps, PropType, toRaw, VNodeChild } from "vue";

import { Button, List, Avatar, Checkbox, Input, Popconfirm } from "ant-design-vue";
import { DataItem } from "@/types/model";
import { useEdit } from "@/hooks/useEdit";
import {
  CheckCircleOutlined,
  CheckSquareOutlined,
  BorderOutlined,
} from "@ant-design/icons-vue";

// import PropTypes from 'ant-design-vue/lib/_util/vue-types'
import '../../common/TodoList.less'

// import { DefineComponent } from "vue";
import { ExtractPropTypes } from "vue";



const todoProps = {
  data: {
    type: Array as PropType<DataItem[]>,
  },
  onDeleteItem: {
    type: Function as PropType<(item: DataItem) => void>
  }
};

// export type TodoProps = Partial<ExtractPropTypes<typeof todoProps>>;



export default defineComponent({
  name: 'TodoListTSX',

  props: todoProps,

  emits: ['deleteItem'],

  setup(props) {
    //操作逻辑写到setup中，这里的作用是和视图连接，


    const { edit, finishEdit, cancelEdit, toggle } = useEdit(props.data as DataItem[]);

    return {
      edit, finishEdit, cancelEdit, toggle
    };
  },

  render() {
    //渲染逻辑写这里，导入setup中的方法

    const { data, finishEdit, cancelEdit, edit, onDeleteItem, toggle } = this
    const getClass = (item: DataItem): string => {
      return item.finish ? 'checked' : 'unchecked'
    }

    const renderActions = (item: DataItem): JSX.Element => (
      item.editing && (
        <>
          <Button onClick={() => finishEdit(item)}>保存</Button>
          <Button onClick={() => cancelEdit(item)}>取消</Button>
        </>
      ) || (
        <>
          <Popconfirm
            title='确认删除吗'
            okText='确定'
            cancelText='取消'
            onConfirm={
              () => {
                onDeleteItem ? onDeleteItem(item) : undefined
              }
            }
          >
            <Button danger ghost>删除</Button>
          </Popconfirm>
          <Button onClick={() => edit(item)}>编辑</Button>
        </>
      )
    )



    return (
      <>
        <List itemLayout="horizontal" dataSource={data} size='small' bordered >

          {{
            renderItem: ({ item }: { item: DataItem }): JSX.Element => {
              return (
                <List.Item
                  v-slots={{
                    actions: () => renderActions(item)
                  }}
                >
                  <List.Item.Meta description={`id=${item.id}`}>
                    {{
                      title: (): JSX.Element => {
                        return item.editing ? <Input v-model={[item.title, "value"]}
                        /> : <div onDblclick={() => edit(item)}>
                          {`${item.title}`}
                        </div>
                      }

                      ,
                      avatar: (): JSX.Element => (

                        <Checkbox v-model={[item.finish, "checked"]}></Checkbox>

                      ),

                    }}
                  </List.Item.Meta>

                </List.Item>
              )
            },

          }}
        </List>
      </>
    );
  }
});




