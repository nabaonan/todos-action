<template>
  <div>
    <i-form ref="formRef" :model="formState" :label-width="100" :rules="rules">
      <i-form-item label="todo 名称" prop="title">
        <i-input placeholder="这是必填项" v-model="formState.title" />
      </i-form-item>

      <i-form-item>
        <i-button type="primary" @click="submit">提交</i-button>
        <i-button @click="reset">重置</i-button>
      </i-form-item>
    </i-form>
  </div>
</template>
<script lang="ts" setup>

import { useForm } from "@/hooks/useForm";
const { onSubmit, formRef, rules, formState } = useForm();


const emit: any = defineEmits()

const reset = () => {
  formRef.value.resetFields();
};

const submit = () => {
  onSubmit(
    emit,
    () => {
      return new Promise((resolve, reject) => {
        formRef.value.validate(valid => {
          if (valid) {
            resolve(true);
          } else {
            resolve(false);
          }
        });
      });
    },
    reset
  );
};
</script>
