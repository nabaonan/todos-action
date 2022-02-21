import { Button, Table } from "antd";
import { computed, defineComponent, reactive, ref } from "reactivue";

export default defineComponent(() => {


  const count = ref(0)
  const state = reactive<{
    total: {
      title: string
    }[]


  }>({
    total: []
  })

  const total2 = ref<string[]>([])
  const add = () => {
    count.value++
    total2.value.push('23234')
    console.log('调用了')
    state.total.push({
      title: '23234'
    })
  }

  const comp = computed(() => count.value + 2)
  let columns = [
    {
      title: "todo名称",
      key: "title"
    }
  ];

  return {
    state,
    count,
    add,
    comp,
    total2,
    columns
  }

}, ({
  state, add, count, total2, comp, columns
}) => {
  console.log('渲染', state.total)
  const { total } = state
  return (
    <>
      {JSON.stringify(state.total)}
      {count}
      {comp}

      <Table
        columns={columns}
        bordered
        pagination={false}
        dataSource={total}
      ></Table>

      <Button onClick={add}>add</Button>
    </>

  )
})
