<template>
  <div class="wrapper">
    <v-header></v-header>
    <v-sidebar></v-sidebar>
    <div
      class="content-box"
      :class="{'content-collapse':collapse}"
    >
      <v-tags></v-tags>
      <div class="content">
        <bread-crumb></bread-crumb>
        <transition
          name="move"
          mode="out-in"
        >
          <keep-alive :include="activeRoutes">
            <router-view></router-view>
          </keep-alive>
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
import { mapGetters } from "vuex";
import breadCrumb from "@/components/breadCrumb";
export default {
  components: { vHeader, vSidebar, vTags, breadCrumb },
  computed: {
    ...mapGetters(["tagsList", "collapse"]),
    activeRoutes() {
      return this.tagsList.map((item) => item.name);
    },
  },
};
</script>
<style lang='less' scoped>
</style>