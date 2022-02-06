import { useForm } from "@/hooks/useForm";
import { DataItem } from "@/types/model";
import { Button, Form, Input, Space } from "antd";

const AddForm = ({ onFormSubmit }: { onFormSubmit: (data: DataItem) => void }) => {
  const { onSubmit, form, rules, formState, reset, labelCol, wrapperCol } = useForm();


  return (
    <Form

      form={form}
      initialValues={formState}

      labelCol={labelCol}

      onFinish={(values) => {
        onSubmit().then((values: DataItem) => {

          onFormSubmit(values)
        }).then(() => {
          reset()
        });
      }}
      wrapperCol={wrapperCol}
    >
      <Form.Item label="todo 名称" name="title" rules={[{ required: true, message: '请输入名称' }]}>


        <Input
          placeholder="这是必填项"

        />
      </Form.Item>
      <Form.Item wrapperCol={{ offset: 4 }}>
        <Space>
          <Button type="primary" htmlType="submit">
            提交
          </Button>
          <Button onClick={reset}>重置</Button>
        </Space>
      </Form.Item>
    </Form>
  );

}



export default AddForm