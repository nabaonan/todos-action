import { DataItem } from "@/types/model";

export function useEdit(arr: DataItem[]) {
  //返回编辑方法，使用泛型定义

  let oldText: string = "";

  const edit = (item: DataItem) => {
    oldText = item.title;
    item.editing = true;
  };

  const finishEdit = (item: DataItem) => {
    item.editing = false;
  };

  const cancelEdit = (item: DataItem) => {
    item.title = oldText;
    item.editing = false;
  };

  const toggle = (item: DataItem) => {
    if (item.finish) {
      item.finish = false;
    } else {
      item.finish = true;
    }
  };

  return {
    edit,
    toggle,
    finishEdit,
    cancelEdit,
  };
}
