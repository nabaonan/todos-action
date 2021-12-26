import { DataItem } from "@/types/model";
import { reactive, ref, UnwrapRef } from "vue";

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

  type SubmitType = () => Promise<DataItem>;

  const onSubmit: SubmitType = () => {
    return formRef.value.validate();
  };

  const labelCol = { span: 4 };
  const wrapperCol = { span: 14 };
  const reset = () => {
    if (formRef.value.restoreValidation) {
      formRef.value.restoreValidation();
      formRef.value.model.title = "";
    }
    if (formRef.value.resetFields) {
      formRef.value.resetFields();
    }
    if (formRef.value.reset) { 
      //layui
     
      formRef.value.reset();
    }
  };

  return {
    formRef,
    formState,
    rules,
    labelCol,
    wrapperCol,
    reset,
    onSubmit,
  };
}
