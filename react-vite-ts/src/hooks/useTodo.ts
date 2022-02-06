import { useStore } from './../store/index';
// import { useTodoStore } from "@/store/modules/todo";
import { DataItem } from "@/types/model";

import { useAdd } from "./useAdd";
import { useDelete } from "./useDelete";
import { useEdit } from "./useEdit";


import { StoreKey } from "@/enums/localStore";
import { autorun, reaction, when } from 'mobx';
import { useEffect } from 'react';

export function useTodo() {
  const { todoStore } = useStore()
  // const todoStore = useTodoStore();
  todoStore.restoreData();

  // const data: UnwrapRef<DataItem[]> = todoStore.total;



  // useEffect(() => { 
  //   console.log('!!!!')
    
  //   // reaction(()=>todoStore.total, total => {
  //   //   console.log("store拦截器");
  //   //   localStorage.setItem(StoreKey.TODO_LIST, JSON.stringify(total));
  //   // });
  // }, [todoStore.total])
  // autorun(() => { 
  //   console.log('执行')
  // })


  // const clearAll = () => {
  //   todoStore.$state.total.length = 0; // 如果使用$reset  不触发拦截器
  // };


  const data: DataItem[] = []
  const clearAll = () => {

    todoStore.clearData()
  }
  return {

    total: data,
    clearAll,
    ...useAdd(data),
    ...useEdit(data),
    ...useDelete(data),
  };
}
