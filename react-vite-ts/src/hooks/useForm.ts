
import { DataItem } from "@/types/model";
import { FormInstance } from "antd";
import {Form } from 'antd'
import { createRef, useRef, useState } from "react";


export function useForm() {
  const [form] = Form.useForm()
  const [formState,setFormState] = useState({
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
  
     return form.validateFields()
    // return formRef.current.validate();
  };

  const labelCol = { span: 4 };
  const wrapperCol = { span: 14 };
  const reset = () => {
    form.resetFields()
  };

  return {
    form,
    formState,
    setFormState,
    rules,
    labelCol,
    wrapperCol,
    reset,
    onSubmit,
  };
}
