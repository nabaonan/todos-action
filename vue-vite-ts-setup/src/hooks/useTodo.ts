import { useTodoStore } from "@/store/modules/todo";
import { DataItem } from "@/types/model";
import { unref, UnwrapRef, watch } from "vue";
import { computed, reactive, ref } from "vue";
import { useAdd } from "./useAdd";
import { useDelete } from "./useDelete";
import { useEdit } from "./useEdit";

import { mapState } from "pinia";
import { StoreKey } from "@/enums/localStore";

export function useTodo() {
  const todoStore = useTodoStore();
  todoStore.restoreData();

  const data: UnwrapRef<DataItem[]> = todoStore.total;

  const unfinish = computed(() =>
    data.filter((item: DataItem) => item.finish != true)
  );

  const finishes = computed(() => data.filter((item: DataItem) => item.finish));

  watch(todoStore.total, total => {
    console.log("store拦截器");
    localStorage.setItem(StoreKey.TODO_LIST, JSON.stringify(total));
  });

  const clearAll = () => {
    todoStore.$state.total.length = 0; // 如果使用$reset  不触发拦截器
  };

  return {
    unfinish,
    finishes,
    total: data,
    clearAll,
    ...useAdd(data),
    ...useEdit(data),
    ...useDelete(data),
  };
}
