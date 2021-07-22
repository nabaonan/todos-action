import { useDelete } from "@/hooks/useDelete";
import {
  defineComponent,
} from "@vue/composition-api";

import AddForm from "./components/AddForm.vue";
import TodoTable from "./components/TodoTable.vue";
import { Divider, Button } from "view-design";
import { useTodo } from "@/hooks/useTodo";
export default defineComponent({
  components: {
    AddForm,
    TodoTable,
  },
  setup() {
    let { finishes, unfinish, total, add, clearAll } = useTodo();

    const { deleteItem } = useDelete(total);

    return {
      unfinish,
      finishes,
      add,
      clearAll,
      deleteItem,
    };
  },

  render() {
    const {
      unfinish,
      finishes,
      clearAll,
      add,
      deleteItem,
    } = this
    return (
      <div>
        <Button type="error" onClick={clearAll}>清除一切</Button>
        <add-form onFormSubmit={add} />
        <Divider> 未完成 </Divider>
        <todo-table data={unfinish} onDeleteItem={deleteItem} />
        <Divider> 已完成 </Divider>
        <todo-table data={finishes} onDeleteItem={deleteItem} />
      </div>
    )
  }
});

