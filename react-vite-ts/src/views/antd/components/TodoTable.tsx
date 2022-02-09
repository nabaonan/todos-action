import { useEdit } from "@/hooks/useEdit";
import { useStore } from "@/store";
import { DataItem } from "@/types/model";
import { Button, Checkbox, Input, Popconfirm, Space, Table } from "antd";
import { ColumnProps, ColumnsType } from "antd/lib/table";
import { observer } from "mobx-react-lite";
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import InfoDrawer from "./InfoDrawer";


interface IProps {
  data: DataItem[]
  onDeleteItem: (item: DataItem) => void
}

const TodoTable = (props: IProps) => {

  const { edit, finishEdit, cancelEdit, toggle } = useEdit(props.data);

  const [currentEdit, setCurrentEdit] = useState('')

  const { todoStore } = useStore()

  const drawer = useRef<{
    show: (data?: DataItem) => void
  }>()

  let columns: ColumnsType<DataItem> = [
    {
      title: "完成",
      fixed: "left",
      width: 70,
      render: (text, record, index) => {

        return <Checkbox checked={record.finish} onChange={(e) => {
          todoStore.toggleFinish(record.id, e.target.checked)
        }}></Checkbox>
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

        const [title, setTitle] = useState(record.title)

        return (record.editing ? <Input
          value={record.title}
          onChange={(e) => {

            record.title = e.target.value
            setTitle(e.target.value)//这里必须设置一下title即使没用到也得设置，否则输入框不会变化，暂时不明原因，按理说可以去掉
          }}

        /> : <div onDoubleClick={() => {
          setCurrentEdit(record.id)
          edit(record)
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
                    setCurrentEdit('')
                    finishEdit(item)
                  }} type="primary">保存</Button>
                  <Button onClick={() => {
                    setCurrentEdit('')
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
                    setCurrentEdit(item.id)
                    edit(item)
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

  return (
    <>
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

}


export default observer(TodoTable) 