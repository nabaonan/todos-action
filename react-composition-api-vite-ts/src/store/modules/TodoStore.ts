/*
 * @Author: 那宝楠 nabaonan@yunlizhihui.com
 * @Date: 2022-08-14 00:35:51
 * @LastEditors: 那宝楠 nabaonan@yunlizhihui.com
 * @LastEditTime: 2022-08-14 17:24:20
 * @FilePath: /react-composition-api-vite-ts/src/store/modules/TodoStore.ts
 * @Description: 
 */

import { StoreKey } from "@/enums/localStore";
import { DataItem } from "@/types/model"
import { getUUID } from "@/utils";
import { makeAutoObservable } from "mobx"

class TodoStore {

  constructor() {
    makeAutoObservable(this)
  }

  total: DataItem[] = []

  get unfinish(): DataItem[] {
    console.log('unfinish', this.total)
    return this.total.filter((item: DataItem) => item.finish != true)
  }

  get finishes(): DataItem[] {
    return this.total.filter((item: DataItem) => item.finish)
  }

  addItem(item: DataItem) {
    // this.total = [
    //   ...this.total,
    //   {
    //     id: getUUID(16),
    //     title: item.title,
    //     finish: false,
    //   }
    // ]
    this.total.push({
      id: getUUID(16),
      title: item.title,
      finish: false,
    });
  }

  deleteItem(item: DataItem) {
    const index = this.total.findIndex((item2: DataItem) => item2.id == item.id);
    if (index != -1) {
      console.log('delete')
      this.total.splice(index, 1);
    }
  }

  clearData() {
    this.total = []
  }


  restoreData() {
    const totalStr = localStorage.getItem(StoreKey.TODO_LIST);
    if (totalStr) {
      this.total = JSON.parse(totalStr);
    }
  }




}

export default TodoStore