<template>
  <n-form
    ref="formRef"
    label-placement="left"
    :model="formState"
    :rules="rules"
  >
    <n-form-item label="todo 名称" path="title">
      <n-input
        placeholder="这是必填项"
        v-model:value="formState.title"
      ></n-input>
    </n-form-item>
    <n-form-item>
      <n-space>
        <n-button type="primary" @click="onSubmit">提交</n-button>
        <n-button @click="reset">重置</n-button>
      </n-space>
    </n-form-item>
  </n-form>
</template>

<script lang="ts">
import { useForm } from "@/hooks/useForm";
import { defineComponent } from "vue";

export default defineComponent({
  setup(props, { emit }) {
    const { onSubmit, formRef, rules, formState, reset } = useForm();

    return {
      formState,
      formRef,
      rules,
      reset,

      onSubmit: () => {
        onSubmit()
          .then(() => {
            emit("formSubmit", formState);
          })
          .then(() => {
            console.log("reset");
            reset();
          });
      },
    };
  },
});
</script>

<style scoped></style>
