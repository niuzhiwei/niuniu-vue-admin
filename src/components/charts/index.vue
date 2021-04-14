<template>
  <div>
    <without-data v-if="isSeriesEmpty" />
    <Echarts
      v-else
      v-bind="$props"
    />
  </div>
</template>

<script>
import { isEmpty } from "lodash";
import WithoutData from "../WithoutData";
import Echarts from "./Echarts";
export default {
  name: "echarts",
  components: {
    WithoutData,
    Echarts,
  },
  props: Echarts.props,
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