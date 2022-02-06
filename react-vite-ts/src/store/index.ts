
import { createContext, useContext } from 'react';
import TodoStore from './modules/todo';

export const storeContext = createContext({
  todoStore: new TodoStore()
});

export const useStore = () => useContext(storeContext);