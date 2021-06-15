import { DataItem } from "@/types/model";
import {
  defineEmit,
  onMounted,
  reactive,
  ref,
  Ref,
  toRaw,
  UnwrapRef,
  useContext,
  watchEffect,
} from "vue";

import { useTodo } from "./useTodo";

export function useForm() {
  const formRef = ref(); //引用页面的form实例
  // const { add } = useTodo();
  let formState: UnwrapRef<DataItem> = reactive({
    title: "",
    id: "",
    finish: false,
  });

  const rules = {
    title: {
      required: true,
      message: "请填写todo的title",
    },
  };

  // defineEmit({
  //   formSubmit: (item: DataItem) => toRaw(item), //增加类型推导
  // });

  const { emit } = useContext();

  type SubmitType = () => Promise<DataItem>;

  const onSubmit: SubmitType = () => {
    return formRef.value
      .validate()
      .then(() => {
        emit("formSubmit", formState);
      })
      .then(() => {
        reset();
      });
  };

  const reset = () => {
    if (formRef.value.restoreValidation) {
      formRef.value.restoreValidation();
      formRef.value.model.title = "";
    }
    if (formRef.value.resetFields) {
      formRef.value.resetFields();
    }
  };

  return {
    formRef,
    formState,
    rules,
    reset,
    onSubmit,
  };
}
