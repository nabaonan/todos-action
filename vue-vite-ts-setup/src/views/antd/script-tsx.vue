<!--

<script lang="tsx" setup>
import { Divider, Button } from "ant-design-vue";

import { computed, defineComponent, unref } from "vue";

import TodoList from "./components/TodoList";
import AddForm from "./components/AddFormTsx.vue";
import { useDelete } from "@/hooks/useDelete";
import { useTodo } from "@/hooks/useTodo";
import type { DataItem } from "@/types/model";
import TodoTable from "./components/TodoTable.vue";

const { finishes, unfinish, add, total, clearAll } = useTodo();
const { deleteItem } = useDelete(total as DataItem[]);

console.log("script setup");

const list = () => (
  <>
    <Button danger onClick={() => clearAll()}>
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

//切换路由警告
// vue-router.esm-bundler.js:72 [Vue Router warn]: Component "default" in record with path "/script-tsx" is a function that does not return a Promise. If you were passing a functional component, make sure to add a "displayName" to the component. This will break in production if not fixed.

list.displayName = "ScriptTsx"; //解决上述警告需要加上这个
// issue https://github.com/vuejs/vue-router-next/issues/915
export default list;
</script>

<style scoped></style>


-->