import { useEdit } from "@/hooks/useEdit";
// import { useTodoStore } from "@/store/modules/todo";

import { DataItem } from "@/types/model";
import { Button, Checkbox, Input, Popconfirm, Space, Table } from "antd";
import { ColumnProps, ColumnsType } from "antd/lib/table";
import { observer } from "mobx-react-lite";
import { MutableRefObject, useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { defineComponent, designComponent, designPage, useHooksOnDesign, useReference } from "plain-design-composition";
import InfoDrawer from "./InfoDrawer";
import { useHookRef } from "@/utils";



interface IProps {
  data: DataItem[]
  onDeleteItem: (item: DataItem) => void
}



export default designPage((props) => {

  let drawer: MutableRefObject<{
    show: (data?: DataItem) => void
  } | undefined>
  useHooksOnDesign(() => {
    drawer = useRef<{
      show: (data?: DataItem) => void
    } | undefined>()

  })

  let columns: ColumnsType<DataItem> = [
    {
      title: "完成",
      fixed: "left",
      width: 70,
      render: (text, record, index) => {
        console.log(record)

        return <Checkbox checked={record.finish} onChange={e => {

          record.finish = e.target.checked

        }}  ></Checkbox>
      }
    },
    {
      title: "id",
      dataIndex: "id",
    },
    {
      title: "todo名称",
      key: "title",


      render: (text, record, index): React.ReactNode => {



        return (record.editing ? <Input
          v-model={record.title}
        /> : <div onDoubleClick={() => {
          record.editing = true

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
                    record.editing = false
                  }} type="primary">保存</Button>
                  <Button onClick={() => {
                    record.editing = false
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
                    record.editing = true
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

  return () => (

    <>
      {console.log('render', props)}
      <Table
        columns={columns}
        rowKey="id"
        bordered
        pagination={false}

        dataSource={props.data}
      ></Table>
      <InfoDrawer ref={drawer} ></InfoDrawer>
    </>

  )

})