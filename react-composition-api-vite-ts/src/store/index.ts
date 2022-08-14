/*
 * @Author: 那宝楠 nabaonan@yunlizhihui.com
 * @Date: 2022-02-16 22:42:46
 * @LastEditors: 那宝楠 nabaonan@yunlizhihui.com
 * @LastEditTime: 2022-08-14 17:25:21
 * @FilePath: /react-composition-api-vite-ts/src/store/index.ts
 * @Description: 
 */

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