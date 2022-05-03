import { useDelete } from "@/hooks/useDelete";
import { useTodo } from "@/hooks/useTodo";
import { DataItem } from "@/types/model";
import { Button, Divider } from "antd";
import { computed, designComponent, designPage, iHTMLInputElement, reactive, ref, unref } from "plain-design-composition";
import AddForm from "./components/AddForm";
import TodoTable from "./components/TodoTable";
import { observer } from "mobx-react-lite";
import { useTodoStore } from "@/store/modules/todo";
import { getUUID } from "@/utils";
import { StoreKey } from "@/enums/localStore";
import { StoreContext, stores } from '@/store'


export default designPage(() => {


  const { finishes, state, unfinish, addItem, total, clearData, deleteItem } = useTodoStore()

  console.log(finishes.value)
  return () => (
    <StoreContext.Provider value={stores}>
      <div>
        <Button danger onClick={clearData}>
          清除一切{" "}
        </Button>

        <AddForm
          {...{
            onFormSubmit: (item: DataItem) => {
              addItem(item)
            },
          }}
        />
        <Divider orientation="left">待完成</Divider>
        <TodoTable

          {
          ...{
            data: unfinish.value,
            onChange: (data: DataItem) => {
              total.forEach((item, index) => {
                if (item.id === data.id) {
                  total[index] = data
                }
              })
            },
            onDeleteItem: (item: DataItem) => {
              deleteItem(item)
            }
          }
          }


        />
        <Divider orientation="left">已完成</Divider>
        {/* 这里要迭代出来 否则丢失响应式 */}
        <TodoTable
          {
          ...{
            data: finishes.value,
            onChange: (data: DataItem) => {
              total.forEach((item, index) => {
                if (item.id === data.id) {
                  total[index] = data
                }
              })

            },
            onDeleteItem: deleteItem
          }
          }
        />
      </div>
    </StoreContext.Provider>
  )


})

