
import { StoreKey } from '@/enums/localStore';
import { DataItem } from '@/types/model';
import { getUUID } from '@/utils';
import { observable, action, computed, makeObservable, autorun } from 'mobx';
import { runInAction } from 'mobx'

class TodoStore {

  total: DataItem[] = []
  testName = "测试一下"

  get unfinish(): DataItem[] {
    return this.total.filter((item: DataItem) => item.finish != true)
  }
  get finishes(): DataItem[] {
    return this.total.filter((item: DataItem) => item.finish)
  };


  constructor() {
    makeObservable(this, {
      total: observable,
      unfinish: computed,
      finishes: computed,
      addItem: action,
      restoreData: action,
      deleteItem: action,
      toggleFinish: action
    });

 
  }

  deleteItem(item: DataItem) {
    const index = this.total.findIndex((item2: DataItem) => item2.id == item.id);
    if (index != -1) {
      this.total.splice(index, 1);
    }
  }

  toggleFinish(id: string, finish: boolean) {
    const find = this.total.find(item => item.id == id)
    if (find) {
      find.finish = finish
    }
  }

  changeEditValue(data: DataItem) {
    let find = this.total.find(item => data.id === item.id)
    if (find) {

      find.title = data.title
    }
  }


  addItem(item: DataItem) {


    this.total.push({
      id: getUUID(16),
      title: item.title,
      finish: false,
    });
  }

  clearData() {
    //这里必须加在runInaction否则会报错
    // Error: [mobx] Since strict-mode is enabled, changing observed observable values outside actions is not allowed. Please wrap the code in an `action` if this change is intended.
    runInAction(() => {
      this.total = []
    })
  }

  restoreData() {
    const totalStr = localStorage.getItem(StoreKey.TODO_LIST);
    if (totalStr) {
      this.total = JSON.parse(totalStr);
    }
  }
}

export default TodoStore