import { DataItem } from "@/types/model";
import { getUUID } from "@/utils";
import {
  reactive,
  ref,
  UnwrapRef,
} from "@vue/composition-api";

import { useTodo } from "./useTodo";

export function useForm() {
  const formRef = ref(); //引用页面的form实例

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
  type Emit = (event: string, ...args: any[]) => void;
  type SubmitType = (
    emit: Emit,
    validate: () => Promise<boolean>,
    reset: Function
  ) => Promise<void>;

  const onSubmit: SubmitType = (emit: (key: string, param) => void, validate, reset) => {
    return validate()
      .then(result => {
        if (result) {
          (formState.id = getUUID(16)),
            (formState.finish = false),
            emit("formSubmit", { ...formState }); //这里一定要重新克隆，不然重置操作会影响到list中的数据
          // toRaw不会取消依赖性，感觉是浅层clone
          reset();
        } else {
          console.error("提交失败");
        }
      })
      .catch(() => {
        console.error("出现异常");
      });
  };

  return {
    formRef,
    formState,
    rules,
    onSubmit,
  };
}
