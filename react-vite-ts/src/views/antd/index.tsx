
import AddForm from "./components/AddForm";
import { useDelete } from "@/hooks/useDelete";
import { useTodo } from "@/hooks/useTodo";
import { DataItem } from "@/types/model";
import TodoTable from "./components/TodoTable";
import { Button, Divider } from "antd";
import { useStore } from "@/store";
import { observer } from "mobx-react-lite";
import { useCallback, useEffect, useState } from "react";
import { autorun, when } from "mobx";
import { StoreKey } from "@/enums/localStore";


function index() {



  const store = useStore()

  const { todoStore } = store

  useEffect(() => {
    todoStore.restoreData();


    //相当于vue3的effct函数，也有点想watch函数，收集依赖，依赖的属性变化自动触发
    autorun(() => {

      localStorage.setItem(StoreKey.TODO_LIST, JSON.stringify(todoStore.total));
    })
  }, [])



  return (
    <>
      <Button danger onClick={() => {
        todoStore.clearData()
      }}>
        清除一切{" "}
      </Button>
      <AddForm
        {...{
          onFormSubmit: (data) => {
            todoStore.addItem(data)
          }
        }}
      />
      <Divider orientation="left">待完成</Divider>

      <TodoTable
        data={todoStore.unfinish}
        onDeleteItem={(item: DataItem) => {
          todoStore.deleteItem(item)
        }}

      />
      <Divider orientation="left">已完成</Divider>
      <TodoTable data={todoStore.finishes} onDeleteItem={(item) => {
        todoStore.deleteItem(item)
      }} />
    </>
  );
}

export default observer(index)