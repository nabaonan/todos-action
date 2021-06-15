// const deleteItem = (item:any)=>void = (item)=> {

import { useTodoStore } from "@/store/modules/todo";
import { DataItem } from "@/types/model";

// }

//使用泛型定义对象，返回删除方法
export function useDelete(arr: DataItem[]) {
  const deleteItem = (item: DataItem) => {
    const todoStore = useTodoStore();
    todoStore.deleteItem(item);

    // const index = arr.findIndex((item2: DataItem) => item2.id == item.id);
    // if (index != -1) {
    //   arr.splice(index, 1);
    // }
  };

  return {
    deleteItem,
  };
}
