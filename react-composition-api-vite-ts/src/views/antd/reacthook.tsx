/*
 * @Author: 那宝楠 nabaonan@yunlizhihui.com
 * @Date: 2022-08-14 17:39:47
 * @LastEditors: 那宝楠 nabaonan@yunlizhihui.com
 * @LastEditTime: 2022-08-14 17:44:43
 * @FilePath: /react-composition-api-vite-ts/src/views/antd/reacthook.tsx
 * @Description: 
 */
import { observer } from "mobx-react-lite";
import { Button, Divider } from "antd";
import { DataItem } from "@/types/model";
import stores from '@/store'
import AddForm from "./components/AddForm";
import TodoTable from "./components/TodoTable";
export default observer((props) => {

  const { todoStore } = stores
  const { total, unfinish, finishes, } = todoStore
  return (

    <div>
      <Button danger onClick={() => todoStore.clearData}>
        清除一切{" "}
      </Button>

      <AddForm
        {...{
          onFormSubmit: (item: DataItem) => {
            todoStore.addItem(item)
          },
        }}
      />
      <Divider orientation="left">待完成</Divider>
      <TodoTable
        {
        ...{
          data: [...unfinish],
          onChange: (data: DataItem) => {
            total.forEach((item, index) => {
              if (item.id === data.id) {
                total[index] = data
              }
            })
          },
          onDeleteItem: (item: DataItem) => {
            todoStore.deleteItem(item)
          }
        }
        }


      />
      <Divider orientation="left">已完成</Divider>
      {/* 这里要迭代出来 否则丢失响应式 */}
      <TodoTable
        {
        ...{
          data: finishes,
          onChange: (data: DataItem) => {
            total.forEach((item, index) => {
              if (item.id === data.id) {
                total[index] = data
              }
            })

          },
          onDeleteItem: todoStore.deleteItem
        }
        }
      />
    </div>
  )



})