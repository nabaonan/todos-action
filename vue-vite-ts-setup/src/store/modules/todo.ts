import { StoreKey } from "@/enums/localStore";
import { DataItem } from "@/types/model";
import { getUUID } from "@/utils";

import { defineStore } from 'pinia';

interface TodoState {
  total: DataItem[]; //总个数
  testName: string;
}

export const useTodoStore = defineStore('todo',{
  state: (): TodoState => {
    return {
      total: [],
      testName: "测试一下",
    };
  },
  actions: {
    deleteItem(item: DataItem) {
      const arr = this.total;
      const index = arr.findIndex((item2: DataItem) => item2.id == item.id);
      if (index != -1) {
        arr.splice(index, 1);
      }
    },
    addItem(item: DataItem) {
      const arr = this.total;

      arr.push({
        id: getUUID(16),
        title: item.title,
        finish: false,
      });
    },

    clearData() {
      this.$reset();
    },

    restoreData() {
      const totalStr = localStorage.getItem(StoreKey.TODO_LIST);
      if (totalStr) {
        this.total = JSON.parse(totalStr);
      }
    },
  },
});
