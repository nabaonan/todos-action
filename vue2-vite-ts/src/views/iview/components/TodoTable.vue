<template>
  <i-Table row-key="id" border :columns="columns" :data="data"></i-Table>
</template>
<script lang="tsx">
import { defineComponent, PropType, Ref, ref, toRaw } from "@vue/composition-api";
import { Button,Poptip,Input,Checkbox,Divider } from "view-design";
import { DataItem } from "@/types/model";
import { useEdit } from "@/hooks/useEdit";
import { CreateElement, VNode } from "vue";
import type{TableColumn,TableColumnRenderParams} from 'view-design/types'
export default defineComponent({

  props: {
    data: {
      type: Array as PropType<DataItem[]>,
    },

    onDeleteItem: {
      type: Function as PropType<(item: DataItem) => void>,
    },
  },
  // emits:['deleteItem'],
  data() {

   const { edit, finishEdit, cancelEdit, toggle } = useEdit(
      this.data as DataItem[]
    );

  const renderActions = (item: DataItem,index?:number): VNode =>{
    if(index!=undefined && this.data){
      item = this.data[index]
    }


      return  (item.editing && (
        <div>
          <Button onClick={() => finishEdit(item)} type="success">
            保存
          </Button>
           <Divider type="vertical" />
          <Button onClick={() => cancelEdit(item)}>取消</Button>
        </div>
      )) || (
        <div>
          <Poptip
            confirm
            cancel-text="取消"
            ok-text="确认"
            title="确认删除吗?"
            onOn-ok={() => {
              // if(this.onDeleteItem){
              //   console.log('44444')
              //   this.onDeleteItem(item)
              // }
              this.$emit("deleteItem", item);
            }}
          >
            <Button type="error" ghost>
              删除
            </Button>
          </Poptip>
           <Divider type="vertical" />
          <Button onClick={() =>{
            this.$set(item,'editing',!!item.editing)
             edit(item)
          }} type="text" >
            编辑
          </Button>
        </div>
      );
  }


      let columns: TableColumn[] = [
      {
        title: "完成",
        fixed: "left",
        width:70,
        render: (h?: CreateElement, params?: TableColumnRenderParams):VNode => {

           let record =  params?.row as DataItem
           if(params?.index!=undefined && this.data){
              record = this.data[params.index]
            }
        
          return <Checkbox vModel={record.finish}  ></Checkbox>
        }
      },
      {
        title: "id",
        key: "id",
        width: 200
      },
      {
        title: "todo名称",
        key: "title",
        render: (h?: CreateElement, params?: TableColumnRenderParams):VNode => {
         let record =  params?.row as DataItem
          if(params?.index!=undefined && this.data){
            record = this.data[params.index]
          }
          return record.editing ? <Input vModel={record.title} /> : <div onDblclick={() => edit(record)}>
            {`${record.title}`}
          </div>
        }
      }, {
        title: '操作',
        key: 'action',
        width: 200,

         render: (h?: CreateElement, params?: TableColumnRenderParams):VNode => {

          // const record =  params?.row as DataItem
          let record: DataItem  = params?.row as DataItem
          const index = params?.index
          return renderActions(record,index)
        }
      }
    ];
    return {columns}
  },

});
</script>
