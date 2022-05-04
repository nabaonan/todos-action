<template>
  <a-form
    ref="formRef"
    :model="formState"
    :label-col="labelCol"
    :rules="rules"
    @finish="onSubmit"
    :wrapper-col="wrapperCol"
  >
    <a-form-item label="todo 名称" name="title">
      <a-input placeholder="这是必填项" v-model:value="formState.title" />
    </a-form-item>

    <a-form-item :wrapperCol="{ offset: 4 }">
      <a-space>
        <a-button type="primary" html-type="submit">提交</a-button>
        <a-button @click="reset">重置</a-button>
      </a-space>
    </a-form-item>
  </a-form>
</template>
<script lang="ts">
import { defineComponent, toRaw } from "vue";
// import { Form, Input, Button, Space } from "ant-design-vue";
import { useForm } from "@/hooks/useForm";

export default defineComponent({
  name: "AddForm",
  emits: {
    formSubmit: formState => {
      return toRaw(formState);
    },
  },
  setup(props, { emit }) {
    const { onSubmit, formRef, rules, formState, reset, labelCol, wrapperCol } =
      useForm();

    return {
      formState,
      formRef,
      rules,
      reset,
      labelCol,
      wrapperCol,
      onSubmit: () => {
        onSubmit()
          .then(() => {
            emit("formSubmit", formState);
          })
          .then(() => {
            // console.log("reset");
            reset();
          });
      },
    };
  },
});
</script>
