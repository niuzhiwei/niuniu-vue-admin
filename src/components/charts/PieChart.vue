<template>
  <div class="chart"></div>
</template>

<script>
import { merge } from "lodash";
import BASIC_OPTION from "./default_option";
import COLORS from "./colors";
import { chartMixin } from "./mixin";

export default {
  name: "chart",
  mixins: [chartMixin],
  props: {
    seriesData: {
      type: Array,
      required: true,
      default: () => [],
    },
    extraOption: {
      type: Object,
      default: () => ({}),
    },
  },
  watch: {
    seriesData: {
      deep: true,
      handler() {
        this.updateChartView();
      },
    },
  },
  mounted() {
    this.chart = this.$echarts.init(this.$el, "light");
    this.updateChartView();
  },
  methods: {
    /**
     * 将业务数据加入到基础样式配置中
     * @returns {Object} 完整的echart配置
     */
    assembleDataToOption() {
      const formatter = (name) => {
        const total = this.seriesData.reduce((acc, cur) => acc + cur.value, 0);
        const data = this.seriesData.find((item) => item.name === name) || {};
        const percent = data.value
          ? `${Math.round((data.value / total) * 100)}%`
          : "0%";
        return `${name}${percent}`;
      };

      return merge(
        {},
        BASIC_OPTION,
        { color: COLORS },
        {
          legend: { formatter },
          series: [{ data: this.seriesData }],
        },
        this.extraOption
      );
    },
    /**
     * 更新echart视图
     */
    updateChartView() {
      if (!this.chart) return;
      const fullOption = this.assembleDataToOption();
      this.chart.setOption(fullOption, true);
    },
  },
};
</script>

<style scoped>
.chart {
  width: 100%;
  height: 100%;
}
</style>
