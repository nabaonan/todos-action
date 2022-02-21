import { useDelete } from "@/hooks/useDelete";
import { useTodo } from "@/hooks/useTodo";
import { DataItem } from "@/types/model";
import { Button, Divider } from "antd";
import { computed, designComponent, designPage, reactive, ref, unref } from "plain-design-composition";
import AddForm from "./components/AddForm";
import TodoTable from "./components/TodoTable";
import { observer } from "mobx-react-lite";
import { useTodoStore } from "@/store/modules/todo";
import { getUUID } from "@/utils";
import { StoreKey } from "@/enums/localStore";



export default designPage(() => {


  const { finishes, state, unfinish, addItem, total, clearData, deleteItem } = useTodoStore()

  return () => (
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
          onDeleteItem: deleteItem
        }
        }
      />
    </div>
  )


})

