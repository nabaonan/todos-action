import { FormInstance } from 'antd';
import { DataItem } from "@/types/model";
import { Form } from 'antd'
import { reactive, ref, UnwrapRef, useReference } from "plain-design-composition";
import { createRef, useState } from "react";
import { useHookRef } from '@/utils';
export function useForm() {


  const form = useHookRef(Form.useForm)
  // const [form] = Form.useForm()

  // const form =  useReference<FormInstance>()
  const formState = reactive({
    title: "",
    id: "",
    finish: false,
  })

  const rules = {
    title: {
      required: true,
      message: "请填写todo的title",
    },
  };

  type SubmitType = () => Promise<DataItem>;

  const onSubmit: any = () => {

    return form.value.validateFields()
    // return formRef.current.validate();
  };

  const labelCol = { span: 4 };
  const wrapperCol = { span: 14 };
  const reset = () => {
    form.value.resetFields()
  };

  return {
    form,
    formState,

    rules,
    labelCol,
    wrapperCol,
    reset,
    onSubmit,
  };
}
