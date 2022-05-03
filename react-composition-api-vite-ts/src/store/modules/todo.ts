
import { StoreKey } from '@/enums/localStore';
import { DataItem } from '@/types/model';
import { getUUID } from '@/utils';
import { ref, computed, reactive } from 'plain-design-composition';



export function useTodoStore() {
  const state = reactive<{
    total: DataItem[]
  }>({
    total: []
  })
  
  const unfinish = computed(() => state.total.filter((item: DataItem) => item.finish != true))
  const finishes = computed(() => state.total.filter((item: DataItem) => item.finish))


  const deleteItem = (item: DataItem) => {
    const index = state.total.findIndex((item2: DataItem) => item2.id == item.id);
    if (index != -1) {
      console.log('delete')
      state.total.splice(index, 1);
    }
  }

  const addItem = (item: DataItem) => {

    state.total.push({
      id: getUUID(16),
      title: item.title,
      finish: false,
    });
  }

  const clearData = () => {
    state.total = []
  }

  const restoreData = () => {
    const totalStr = localStorage.getItem(StoreKey.TODO_LIST);
    if (totalStr) {
      state.total = JSON.parse(totalStr);
    }
  }

  return {
    state,
    total: state.total,
    unfinish: unfinish,
    finishes: finishes,
    deleteItem,
    addItem,
    restoreData,
    clearData
  }
}


