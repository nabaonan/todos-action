<script lang="tsx">
import { defineComponent } from "vue";

import { Divider, Button } from "ant-design-vue";

import { unref } from "vue";

import TodoList from "./components/TodoList";
import AddForm from "./components/AddFormTsx.vue";
import { useDelete } from "@/hooks/useDelete";
import { useTodo } from "@/hooks/useTodo";
import { DataItem } from "@/types/model";
import TodoTable from "./components/TodoTable.vue";


export default defineComponent({
  name: "DefineTsx",
  setup() {
    const { finishes, unfinish, add, total, clearAll } = useTodo();
    const { deleteItem } = useDelete(total as DataItem[]);
    console.log("define setup");
    return (): JSX.Element => {
      //这里on-delete-item只能使用这种方式，
      return (
        <>
          <Button danger onClick={clearAll}>
            清除一切{" "}
          </Button>
          <AddForm
            {...{
              onFormSubmit: (item: DataItem) => {
                add(item);
              },
            }}
          />
          <Divider orientation="left">待完成</Divider>

          <TodoTable
            data={unref(unfinish)}
            onDeleteItem={(item: DataItem) => {
              deleteItem(item);
            }}

            // {
            //   ...{
            //     // 此种解决方案参考：https://juejin.cn/post/6920939733983969294  可以实现ts推导
            //     onDeleteItem: (item: DataItem): void => {
            //       deleteItem(item);
            //     },
            //   }
            // }
          />
          <Divider orientation="left">已完成</Divider>
          <TodoTable data={unref(finishes)} onDeleteItem={deleteItem} />
        </>
      );
    };
  },
});
</script>

<style scoped></style>
