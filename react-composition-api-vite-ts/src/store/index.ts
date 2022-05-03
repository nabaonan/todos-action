
import { createContext, useContext } from 'react';
import { useTodoStore } from './modules/todo';


export const stores = {
  todoStore: useTodoStore()
}

export const StoreContext = createContext(stores);

export const useStore = (storeName: string) => {

  const storeContext = useContext<typeof stores>(StoreContext);
  return (storeContext as any)[storeName]
}