<script lang="tsx">
import { defineComponent, toRaw } from "vue";

import { Form, Input, Button, Space } from "ant-design-vue";
import { DataItem } from "@/types/model";
import { useForm } from "@/hooks/useForm";

interface IProp {
  onFormSubmit?: (item: DataItem) => void; //增加类型推导
}

export default defineComponent({
  name: "AddFormTsx",
  emits: {
    formSubmit: formState => {
      return toRaw(formState);
    },
  },
  setup(props: IProp, { emit }) {
    const { onSubmit, formRef, rules, formState, reset, labelCol, wrapperCol } = useForm();

    return (): JSX.Element => (
      <Form
        ref={(r: any) => {
          formRef.value = r; //不采用这样，formRef实例获取不到
        }}
        model={formState}
        labelCol={labelCol}
        rules={rules}
        onFinish={() => {
          onSubmit().then(() => {
            emit("formSubmit", formState);
          }).then(() => {
            reset()
          });
        }}
        wrapperCol={wrapperCol}
      >
        <Form.Item label="todo 名称" name="title">
          {/** 由于antdv要求是写成 v-model:value
                            所以只能采用如下这种方式写，具体用法参考
                            https://github.com/vuejs/jsx-next */}

          <Input
            placeholder="这是必填项"
            v-model={[formState.title, "value"]}
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
  },
});
</script>

<style scoped>
</style>
