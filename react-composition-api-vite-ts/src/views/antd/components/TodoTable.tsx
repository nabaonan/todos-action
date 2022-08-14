import { useEdit } from "@/hooks/useEdit";
// import { useTodoStore } from "@/store/modules/todo";

import { DataItem } from "@/types/model";
import { Button, Checkbox, Input, Popconfirm, Space, Table } from "antd";
import { ColumnProps, ColumnsType } from "antd/lib/table";
import { observer } from "mobx-react-lite";
import { MutableRefObject, useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { computed, defineComponent, designComponent, designPage, effect, reactive, ref, useHooksOnDesign, useReference, watchEffect } from "plain-design-composition";
import InfoDrawer from "./InfoDrawer";
import { useHookRef } from "@/utils";
import { useStore } from "@/store";



interface IProps {
  data: DataItem[]
  onDeleteItem: (item: DataItem) => void
  onChange: (data: Partial<DataItem> | undefined) => void
}



export default designPage((props: IProps) => {

  let drawer: MutableRefObject<{
    show: (data?: DataItem) => void
  } | undefined>
  useHooksOnDesign(() => {
    drawer = useRef<{
      show: (data?: DataItem) => void
    } | undefined>()

  })



  const data = ref<DataItem[]>(props.data)
  const old = ref('')
  effect(() => {
    console.log('effect', props.data)
    data.value = props.data
  })

  // watchEffect(() => {
  //   data.value = props.data
  // })


  //react里竟然改个属性需要重新整体赋值，这种方式很恶心！！！受不了,  vue才是yyds！！
  const loopData = (data: DataItem) => {
    props.onChange?.(data)
  }


  const edit = (item: DataItem, index: number) => {

    old.value = item.title
    loopData({
      ...item,
      editing: true,
    })
  }

  const finishEdit = (item: DataItem, index: number) => {
    loopData({
      ...item,
      editing: false
    })
  }

  const cancelEdit = (item: DataItem) => {
    loopData({
      ...item,
      title: old.value,
      editing: false
    })

  }


  let columns: ColumnsType<DataItem> = [
    {
      title: "完成",
      fixed: "left",
      width: 70,
      render: (text, record, index) => {

        return <Checkbox checked={record.finish} onChange={e => {

          loopData({
            ...record,
            finish: e.target.checked
          })

        }}  ></Checkbox>
      }
    },
    {
      title: "id",
      dataIndex: "id",
    },
    {
      title: "todo名称",
      dataIndex: "title",
      render: (text, record, index): React.ReactNode => {
        return (record.editing ? <Input
          value={record.title}
          onChange={e => {
            loopData({
              ...record,
              title: e.target.value
            })
          }}
        /> : <div onDoubleClick={() => {
          edit(record, index)
        }}>
          {`${record.title}`}
        </div>)
      }
    }, {
      title: '操作',
      key: 'action',
      width: 200,
      fixed: 'right',
      render: (text, record, index): React.ReactNode => {
        const item = record
        return (
          <Space>
            {
              record.editing && (
                <>
                  <Button onClick={() => {
                    finishEdit(item, index)
                  }} type="primary">保存</Button>
                  <Button onClick={() => {
                    cancelEdit(item)
                  }}>取消</Button>
                </>
              ) || (
                <>
                  <Popconfirm
                    cancelText="取消"
                    okText="确认"
                    title="确认删除吗？"
                    onConfirm={
                      () => {
                        props.onDeleteItem(item)
                      }
                    }
                  >
                    <Button danger ghost>删除</Button>
                  </Popconfirm>
                  <Button onClick={() => {
                    edit(item, index)
                  }} type="primary" ghost>编辑</Button>
                  <Button type="link" onClick={() => {
                    drawer.current?.show(item)
                  }}  >查看</Button>
                </>
              )
            }

          </Space>
        )
      }
    }
  ];

  return () => {
    return (

      <>

        <Table
          columns={columns}
          rowKey="id"
          bordered
          pagination={false}

          dataSource={data.value}
        ></Table>
        <InfoDrawer ref={drawer} ></InfoDrawer>
      </>

    )
  }

})