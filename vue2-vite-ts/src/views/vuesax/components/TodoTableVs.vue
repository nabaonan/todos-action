  <template>
  <div class="center">
    <vs-table>
      <template #thead>
        <vs-tr>
          <template v-for="column in columns">
            <vs-th :key="column.title" 
            :style="{
              width:`${column.width}px`
            }"
           >
              {{ column.title }}
            </vs-th>
          </template>
        </vs-tr>
      </template>
      <template #tbody>
        <vs-tr :key="i" v-for="(row, i) in data" :data="row">
          <vs-td >
            <vs-checkbox :key="row.id" v-model="row.finish" />
          </vs-td>
          <vs-td>
            {{ row.id }}
          </vs-td>
          <vs-td>
            <vs-input v-if="row.editing" v-model="row.title" placeholder="" />
            <div v-else @dblclick="edit(row)">
              {{ row.title }}
            </div>
          </vs-td>
          <vs-td>
            <div style="display: flex">
              <template v-if="row.editing">
                <vs-button @click="finishEdit(row)" success>保存</vs-button>
                <vs-button @click="cancelEdit(row)" transparent dark
                  >取消</vs-button
                >
              </template>
              <template v-else>
                <vs-tooltip
                  bottom
                  shadow
                  not-hover
                  :key="row.id"
                  v-if="row"
                  v-model="row.showTooltip"
                >
                  <vs-button
                    danger
                    border
                    @click="
                      () => {
                        $set(row, 'showTooltip', false);
                        row.showTooltip = !row.showTooltip;
                      }
                    "
                  >
                    删除
                  </vs-button>
                  <template #tooltip>
                    <div class="content-tooltip">
                      <h4 class="center">确认</h4>
                      <p>确定删除 {{ row.title }} 数据吗？</p>
                      <footer style="display: flex">
                        <vs-button
                          @click="
                            () => {
                              $set(row, 'showTooltip', false);

                              $emit('deleteItem', row);
                            }
                          "
                          >确认</vs-button
                        >
                        <vs-button
                          @click="row.showTooltip = false"
                          transparent
                          dark
                        >
                          取消
                        </vs-button>
                      </footer>
                    </div>
                  </template>
                </vs-tooltip>
                <vs-button border transparent @click="edit(row)"
                  >编辑</vs-button
                >
              </template>
            </div>
          </vs-td>
        </vs-tr>
      </template>
    </vs-table>
  </div>
</template>


<script lang="ts">
  import { useEdit } from "@/hooks/useEdit";
  import { DataItem } from "@/types/model";
  import { defineComponent, PropType } from "@vue/composition-api";

  export default defineComponent({
    props: {
      data: {
        type: Array as PropType<DataItem[]>,
      },

      onDeleteItem: {
        type: Function as PropType<(item: DataItem) => void>,
      },
    },
    setup(props) {
      const { edit, finishEdit, cancelEdit, toggle } = useEdit(
        props.data as DataItem[]
      );
      let columns = [
        {
          title: "完成",
          fixed: "left",
          width: 70,
        },
        {
          title: "id",
          key: "id",
          width: 200
        },
        {
          title: "todo名称",
          key: "title",
        },
        {
          title: "操作",
          key: "action",
          width: 200,
        },
      ];
      return {
        columns,
        edit,
        finishEdit,
        cancelEdit,
      };
    },
  });
</script>

<style scoped>
</style>