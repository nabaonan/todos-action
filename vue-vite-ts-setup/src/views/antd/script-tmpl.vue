<template>
  <a-button type="danger" @click="clearAll">清除一切</a-button>
  <AddForm @formSubmit="add" />

  <a-typography>
    <a-typography-title>Introduction</a-typography-title>
    <a-typography-paragraph>
      In the process of internal desktop applications development, many
      different design specs and implementations would be involved, which might
      cause designers and developers difficulties and duplication and reduce the
      efficiency of development.
    </a-typography-paragraph>
    <a-typography-paragraph>
      After massive project practice and summaries, Ant Design, a design
      language for background applications, is refined by Ant UED Team, which
      aims to
      <a-typography-text strong>
        uniform the user interface specs for internal background projects, lower
        the unnecessary cost of design differences and implementation and
        liberate the resources of design and front-end development.
      </a-typography-text>
    </a-typography-paragraph>
    <a-typography-title :level="2">Guidelines and Resources</a-typography-title>
    <a-typography-paragraph>
      We supply a series of design principles, practical patterns and high
      quality design resources (
      <a-typography-text code>Sketch</a-typography-text>
      and
      <a-typography-text code>Axure</a-typography-text>
      ), to help people create their product prototypes beautifully and
      efficiently.
    </a-typography-paragraph>
  </a-typography>

  <a-divider orientation="left">待完成</a-divider>
  <!-- <TodoList :data="unfinish" @on-delete-item="deleteItem" /> -->
  <TodoTable :data="unfinish" @deleteItem="deleteItem" />
  <a-divider orientation="left">已完成</a-divider>
  <TodoList :data="finishes" @on-delete-item="deleteItem" />
  <!-- <TodoTable :data="finishes" @delete-item="deleteItem" /> -->
</template>

<script setup lang="ts">
  // import { Divider, Button } from "ant-design-vue";
  import { registeComp, regComp } from "@/utils/comp";
  import AddForm from "./components/AddForm.vue";
  import { reactive } from "@vue/reactivity";
  import TodoList from "./components/TodoList.vue";
  import type { DataItem } from "@/types/model";
  import { useTodo } from "@/hooks/useTodo";
  import { useDelete } from "@/hooks/useDelete";
  import { useTodoStore } from "@/store/modules/todo";

  import { mapState, mapActions } from "pinia";
  import { computed } from "@vue/runtime-core";
  import { unref } from "vue";
  import { formProps } from "ant-design-vue/lib/form";
  import { useComp } from "@/hooks/useAntd";
  import TodoTable from "./components/TodoTableTmpl.vue";

  // useComp(Button, Divider);

  let { finishes, unfinish, add, total, clearAll } = useTodo();

  const { deleteItem } = useDelete(total as DataItem[]);
</script>
