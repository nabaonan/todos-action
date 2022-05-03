import { DataItem } from "@/types/model";

export function useEdit(data: DataItem[]) {
  //返回编辑方法，使用泛型定义

  let oldText: string = "";


  const loopData = (id:string, other: Partial<DataItem>) => {
    data.forEach((item, i) => {
      if (item.id === id) {
        item = { ...item, ...other }
        // return { ...item, ...other }
      } else {
        // return false
        // return item
      }
    })
    // props.onChange(data.value)
  }

  const edit = (item: DataItem) => {
    console.log('走eidt', item)
    oldText = item.title;
    // item.editing = true;
    // item = { ...item, editing: true }
    loopData(item.id, {
      editing: true
    })
  };

  const finishEdit = (item: DataItem) => {
    item.editing = false;
    // loopData(item.id, {
    //   editing: false
    // })
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
