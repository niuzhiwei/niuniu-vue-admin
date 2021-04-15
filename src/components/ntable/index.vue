<template>
  <div
    class="n-table"
    v-loading="showLoading"
  >
    <el-table
      ref='ntable'
      :data='tableData'
      v-bind="$attrs"
      v-on="$listeners"
    >
      <slot name="first" />
      <el-column
        v-for="(item, index) in columns"
        :key="index"
        :item="item"
      />
      <slot name='tag' />
      <slot name='operate' />
    </el-table>
  </div>
</template>

<script>
import ElColumn from "./el-column";
export default {
  name: "nTable",
  components: {
    ElColumn,
  },
  props: {
    showLoading: {
      type: Boolean,
      default: false,
    },
    columns: {
      //表格表头数据
      type: Array,
      default: () => [],
    },
    tableData: {
      //表格数据
      type: Array,
      default: () => [],
    },
  },
};
</script>
<style lang='less' >
.n-table {
  .el-table {
    margin-bottom: 20px;
  }
}
</style>