<template>
  <div>
    <without-data v-if="isSeriesEmpty" />
    <pie-chart
      v-else
      v-bind="$props"
    />
  </div>
</template>

<script>
import { isEmpty } from "lodash";
import WithoutData from "../WithoutData";
import PieChart from "./PieChart";
export default {
  name: "echarts",
  components: {
    WithoutData,
    PieChart,
  },
  props: PieChart.props,
  computed: {
    isSeriesEmpty() {
      return isEmpty(this.seriesData);
      // isEmpty(this.seriesData) || this.seriesData.every((item) => !item.value)
    },
  },
};
</script>
<style lang='less' scoped>
</style>