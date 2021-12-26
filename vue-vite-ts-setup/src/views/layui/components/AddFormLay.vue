<template>
  <lay-form ref="formRef" :model="formState" :rules="rules" label-width="80px" size="mini">
    <lay-form-item label="todo名称" prop="title">
      <lay-input v-model="formState.title" placeholder="这是必填项"></lay-input>
    </lay-form-item>

    <lay-form-item>
      <lay-button type="primary" @click="onSubmit">提交</lay-button>
      <lay-button @click="reset">重置</lay-button>
    </lay-form-item>
  </lay-form>
</template>

<script lang="ts" setup>

import { useForm } from "@/hooks/useForm";


const emit = defineEmits(['formSubmit'])


const { onSubmit: submit, formRef, rules, formState, reset } = useForm();

const onSubmit = () => {
  submit()
    .then(() => {
      emit("formSubmit", formState);
    })
    .then(() => {
      console.log("reset");
      reset();
    });
}

</script>

<style scoped>
</style>