import { useStore } from './../store/index';
// import { useTodoStore } from "@/store/modules/todo";
import { DataItem } from "@/types/model";
import { getUUID } from "@/utils";

export function useAdd(arr: DataItem[]) {
  const add = (item: DataItem) => {
    const { todoStore} = useStore()
    // const store = useTodoStore();
    todoStore.addItem(item);
    // arr.push({
    //   id: getUUID(16),
    //   title: item.title,
    //   finish: false,
    // });
  };

  return { add };
}
