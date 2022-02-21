import { useTodoStore } from "@/store/modules/todo";
import { DataItem } from "@/types/model";
import { getUUID } from "@/utils";
import { Button, Form, Input } from "antd";
import { FormInstance, useForm } from "antd/lib/form/Form";
import FormItem from "antd/lib/form/FormItem";
import { computed, defineComponent, designComponent, designPage, onUnmounted, PropType, reactive, ref, useRefs, } from "plain-design-composition";
import { createRef, useRef } from "react";
import AddForm from "./antd/components/AddForm";


const Child = designComponent({
  props: {
    data: {
      type: Array as PropType<DataItem[]>
    }
  },
  setup({
    props, slots
  }) {

    return {
      render: () => {
        return (<div>{props.data?.map((item, index) => {
          return <div key={index}>
            <div >

              {item.title}
              {item.id}
              {item.finish}
            </div>
          </div>
        })}</div>)
      }
    }
  }
})




const useStore2 = () => {
  const total2 = reactive<{
    total: DataItem[]
  }>({
    total: []
  })
  const add2 = (item: DataItem) => {
    console.log('vlaue')
    total2.total.push({
      title: '345',
      id: getUUID(10),
      finish: false,
      editing: false
    })
  }
  const result = computed(() => total2.total.filter(item => item))

  return {
    total: total2.total,
    finish: result,
    add: add2
  }
}


export default designPage(() => {
  const counter = ref(0);
  const doubled = computed(() => counter.value * 2);
  const inc = () => (counter.value += 1);

  const { total, add, finish } = useStore2()
  console.log('redner')




  const formState = reactive(
    {
      title: ''
    })

  const form = createRef<FormInstance>()
  return () => (
    <div>
      <Form ref={form} initialValues={formState}>
        <Form.Item name={'title'} rules={[{
          required: true,
          message: '不为空'
        }]}>
          <Input ></Input>
        </Form.Item>
        <Form.Item>
          <Button onClick={() => {
            form.current?.validateFields().then(values => {
              add({
                title: formState.title,
                id: getUUID(16),
                finish: false,
                editing: false
              })
            })

          }}>add</Button>
        </Form.Item>
      </Form>
      <Input ></Input>

      <Button type="primary" onClick={() => {

        add({
          title: formState.title,
          id: getUUID(16),
          finish: false,
          editing: false
        })

      }}>
        提交
      </Button>
      <div>
        {counter.value} x 2 = {doubled.value}
      </div>
      {total.map(item => <h1 key={item.id}>{item.title}</h1>)}
      <br />
      ----------
      {finish.value.map(item => <h1 key={item.id}>{item.title}</h1>)}
      <button onClick={inc}>Increase</button>
      {/* <button onClick={add}>add</button> */}
    </div>
  );
})   
