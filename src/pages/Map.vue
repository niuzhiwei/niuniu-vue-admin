<template>
  <div>

    <el-card
      shadow="hover"
      :body-style="{ padding: '0' }"
    >
      <map-chart style="height:1200px"></map-chart>
    </el-card>
  </div>

</template>

<script>
import mapChart from "@/components/charts/MapChart.vue";
export default {
  components: { mapChart },
};
</script>
<style lang='less' scoped>
</style>