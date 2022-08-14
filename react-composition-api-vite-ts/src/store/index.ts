

import { createContext, useContext } from 'react';
import { useTodoStore } from './modules/todo';
import TodoStore from './modules/TodoStore';

export const stores = {
  todoStore: useTodoStore()
}

export const StoreContext = createContext(stores);

export const useStore = (storeName: string) => {

  const storeContext = useContext<typeof stores>(StoreContext);
  return (storeContext as any)[storeName]
}


export default {
  todoStore: new TodoStore()
}