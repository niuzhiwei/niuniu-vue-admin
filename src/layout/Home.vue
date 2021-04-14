<template>
  <div class="wrapper">
    <v-header></v-header>
    <v-sidebar></v-sidebar>
    <div class="content-box">
      <v-tags></v-tags>
      <div class="content">
        <transition
          name="move"
          mode="out-in"
        >
          <router-view></router-view>
        </transition>
        <el-backtop target=".content"></el-backtop>
      </div>
    </div>
  </div>
</template>

<script>
import vHeader from "./Header";
import vSidebar from "./Sidebar";
import vTags from "./Tags";
export default {
  components: { vHeader, vSidebar, vTags },
};
</script>
<style lang='less' scoped>
</style>