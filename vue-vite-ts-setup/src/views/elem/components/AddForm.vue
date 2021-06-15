<template>
  <el-form
    ref="formRef"
    :model="formState"
    :rules="rules"
    label-width="80px"
    size="mini"
  >
    <el-form-item label="todo名称" prop="title">
      <el-input placeholder="这是必填项" v-model="formState.title"></el-input>
    </el-form-item>

    <el-form-item>
      <el-button type="primary" @click="onSubmit">提交</el-button>
      <el-button @click="reset">重置</el-button>
    </el-form-item>
  </el-form>
</template>

<script lang="ts">
  import { defineComponent, toRaw } from "vue";

  import { ElForm, ElButton, ElFormItem, ElInput } from "element-plus";
  import { useForm } from "@/hooks/useForm";
  import { DataItem } from "@/types/model";

  export default defineComponent({
    components: {
      ElForm,
      ElButton,
      ElInput,
      ElFormItem,
    },
    emits: {
      formSubmit: formState => {
        return toRaw(formState);
      },
    },

    setup(props, { emit }) {
      const { onSubmit, formRef, rules, formState, reset } = useForm();

      return {
        formState,
        formRef,
        rules,
        onSubmit,
        reset,
        // submitForm
      };
    },
  });
</script>

<style scoped>
</style>