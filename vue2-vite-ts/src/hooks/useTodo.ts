import { useTodoStore } from "@/store/modules/todo";
import { DataItem } from "@/types/model";
import { computed, UnwrapRef, watch } from "@vue/composition-api";
import { useAdd } from "./useAdd";
import { useDelete } from "./useDelete";
import { useEdit } from "./useEdit";
import { StoreKey } from "@/enums/localStore";
import Vue from "vue";


export function useTodo() {
  const todoStore = useTodoStore();
  todoStore.restoreData();

  const unfinish = computed(() =>
  todoStore.total.filter((item: DataItem) => item.finish != true)
  );

  const finishes = computed(() =>  todoStore.total.filter((item: DataItem) => item.finish));

  watch(todoStore.total, total => {
    console.log("store拦截器");
  
    localStorage.setItem(StoreKey.TODO_LIST, JSON.stringify(total));
  });

  const clearAll = () => {
    // todoStore.$state.total=[]//可清空store
    // todoStore.$state.total.length = 0//没有作用
    // Vue.set(todoStore.$state.total,'length',0)//没有作用
    todoStore.$state.total.splice(0,todoStore.$state.total.length)//只能通过这种方式，触发全部删除，重置length为0 不管用
  
  };

  return {
    unfinish,
    finishes,
    total:  todoStore.total,
    clearAll,
    ...useAdd(todoStore.total),
    ...useEdit(todoStore.total),
    ...useDelete(todoStore.total),
  };
}
