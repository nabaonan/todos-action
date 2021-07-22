<template>
  <div>
    <vs-input
  
      placeholder="todo名称 这是必填项"
      v-model="formState.title"
      class="input"
    >
      <template #message-danger v-if="showError">
        {{ errMsg }}
      </template>
    </vs-input>

    <div class="center">
      <vs-button @click="submit"> 提交 </vs-button>

      <vs-button @click="reset" color="#c0c0c0"> 重置 </vs-button>
    </div>
  </div>
</template>

<script lang="ts">
  import { useForm } from "@/hooks/useForm";
  import { computed, defineComponent, ref, watch } from "@vue/composition-api";

  export default defineComponent({
    setup(props, { emit }) {
      const { onSubmit, formRef, rules, formState } = useForm();

      const reset = () => {
        formState.title = "";
        showError.value = false;
      };

      const isEmpty = computed(() => formState.title == "");

      let errMsg = ref("");
      let showError = ref(false);

      // watch(()=>formState.title,()=>{

      //   validateField()
      // })

      const validateField = () => {
        if (rules.title.required && formState.title == "") {
          errMsg.value = rules.title.message;
          showError.value = true;
          return false;
        } else {
          showError.value = false;
          errMsg.value = "";
          return true;
        }
      };
      const submit = () => {
        onSubmit(
          emit,
          () => {
            return new Promise((resolve, reject) => {
              const valid = validateField();

              if (valid) {
                resolve(true);
              } else {
                resolve(false);
              }
            });
          },
          reset
        );
      };

      return {
        submit,
        errMsg,
        showError,
        isEmpty,
        formRef,
        formState,
        rules,
        reset,
      };
    },
  });
</script>

<style scoped lang="less">
  .center {
    display: flex;
  }
  .input /deep/ input {
    width: 100%;
  }
</style>