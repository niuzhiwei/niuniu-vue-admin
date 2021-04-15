<template>
  <div class="crumbs">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item><i :class="$route.meta.icon"></i> {{$route.meta.title}}</el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>

<script>
export default {
  name: "breadCrumb",
  
};
</script>
<style lang='less' scoped>
</style>