<template>
  <div>
    <div class="container">
      <div class="plugins-tips">
        Vue.Draggable：基于 Sortable.js 的 Vue 拖拽组件。
        访问地址：<a
          href="https://github.com/SortableJS/Vue.Draggable"
          target="_blank"
        >Vue.Draggable</a>
        （拖拽左侧组件库到右侧面板查看效果）
      </div>
      <div class="drag-box">
        <draggable
          class="drag-box-item"
          :list="list1"
          :group="{ name: 'people', pull: 'clone', put: false }"
          :clone="cloneDog"
          @change="log"
        >
          <div
            class="list-group-item"
            v-for="element in list1"
            :key="element.id"
          >
            {{ element.name }}
          </div>
        </draggable>

        <div
          class="drag-box-item"
          style="flex:1"
        >
          <draggable
            class="dragArea list-group"
            :list="list2"
            group="people"
            @change="log"
          >
            <template
              class="list-group-item"
              v-for="element in list2"
            >
              <component
                :key="element.id"
                :is='element.name'
                v-bind="{...element.attrs}"
              >
                {{element.value}}
              </component>
            </template>
          </draggable>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
import draggable from "vuedraggable";
let idGlobal = 8;
export default {
  name: "DragList",
  components: { draggable },
  data() {
    return {
      list1: [
        {
          name: "el-button",
          id: 1,
          value: "默认按钮",
          attrs: { value: "默认按钮" },
        },
        {
          name: "el-progress",
          id: 2,
          attrs: { percentage: 85, type: "circle" },
        },
        {
          name: "el-alert",
          id: 3,
          attrs: {
            title: "成功提示的文案",
            type: "success",
            "show-icon": true,
          },
        },
      ],
      list2: [],
    };
  },
  methods: {
    log: function (evt) {
      window.console.log(evt);
    },
    cloneDog(item) {
      return {
        id: idGlobal++,
        name: item.name,
        attrs: item.attrs,
        value: item.value,
      };
    },
  },
};
</script>
<style lang='less' scoped>
.drag-box {
  display: flex;
  user-select: none;
  .dragArea {
    width: 100%;
    height: 100%;
  }
  .drag-box-item {
    // flex: 1;
    min-width: 300px;
    background-color: #eff1f5;
    margin-right: 16px;
    border-radius: 6px;
    border: 1px #e1e4e8 solid;
    .item-title {
      padding: 8px 8px 8px 12px;
      font-size: 14px;
      line-height: 1.5;
      color: #24292e;
      font-weight: 600;
    }
    .list-group-item {
      border: 1px #e1e4e8 solid;
      padding: 10px;
      margin: 5px 0 10px;
      list-style: none;
      background-color: #fff;
      border-radius: 6px;
      cursor: pointer;
      -webkit-transition: border 0.3s ease-in;
      transition: border 0.3s ease-in;
      &:hover {
        border: 1px solid #20a0ff;
      }
    }
  }
}
</style>