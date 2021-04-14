<template>
  <div
    class="tags"
    v-if="showTags"
  >
    <ul>
      <li
        class="tags-li"
        :class="{'active':isActive(item.path)}"
        v-for="(item,index) in tagsList"
        :key="index"
      >
        <router-link
          :to="item.path"
          class="tags-li-title"
        >
          {{item.title}}
        </router-link>
        <span
          class="tags-li-icon"
          @click="closeTag(index)"
        >
          <i class="el-icon-close"></i>
        </span>
      </li>
    </ul>

    <div class="tags-close-box">
      <el-dropdown
        split-button
        type="primary"
        size="mini"
        @command="handleTags"
      >
        标签选项
        <el-dropdown-menu
          size="mini"
          slot="dropdown"
        >
          <el-dropdown-item command='other'>关闭其他</el-dropdown-item>
          <el-dropdown-item command='all'>关闭所有</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
export default {
  watch: {
    $route(val) {
      this.setTags(val);
    },
  },
  created() {
    this.setTags(this.$route);
  },
  computed: {
    ...mapGetters(["tagsList"]),
    showTags() {
      return this.tagsList.length > 0;
    },
  },
  methods: {
    ...mapMutations([
      "clearAllTags",
      "pushTags",
      "shiftTags",
      "closeOneTag",
      "clearAllTags",
      "closeOtherTags",
    ]),
    isActive(path) {
      return path === this.$route.fullPath;
    },
    //判断关闭全部标签状态
    isOnlyHome() {
      return (
        this.tagsList.length === 1 && this.tagsList[0].path === "/dashboard"
      );
    },
    returnHome() {},
    //关闭单个标签
    closeTag(index) {
      if (this.isOnlyHome()) {
        return;
      }
      const delItem = this.tagsList[index];
      this.closeOneTag(index);
      const item = this.tagsList[index]
        ? this.tagsList[index]
        : this.tagsList[index - 1];
      if (item) {
        delItem.path === this.$route.fullPath && this.$router.push(item.path);
      } else {
        this.$router.push("/");
      }
    },
    //关闭其他标签
    closeOthers() {
      const curItem = this.tagsList.filter((item) => {
        return item.path === this.$route.fullPath;
      });
      this.closeOtherTags(curItem);
    },
    //关闭全部标签
    closeAll() {
      if (this.isOnlyHome()) {
        return;
      }
      this.clearAllTags();
      this.$router.push("/");
    },
    //设置路由标签
    setTags(route) {
      const existRoute = this.tagsList.find(
        (item) => item.path === route.fullPath
      );
      if (!existRoute) {
        if (this.tagsList.length >= 8) {
          this.shiftTags();
        }
        this.pushTags({
          title: route.meta.title,
          path: route.fullPath,
          name: route.matched[1].components.default.name,
        });
      }
    },
    handleTags(command) {
      switch (command) {
        case "other":
          this.closeOthers();
          break;
        case "all":
          this.closeAll();
          break;
        default:
          break;
      }
    },
  },
};
</script>
<style lang='less' scoped>
.tags {
  position: relative;
  height: 32px;
  overflow: hidden;
  background-color: #fff;
  padding-right: 120px;
  box-shadow: 0 5px 10px #ccc;
  ul {
    width: 100%;
    height: 100%;
    .tags-li {
      float: left;
      height: 24px;
      line-height: 24px;
      margin: 3px 5px 2px 3px;
      border-radius: 3px;
      font-size: 12px;
      overflow: hidden;
      cursor: pointer;
      border: 1px solid #e9eaec;
      background: #fff;
      padding: 0 5px 0 12px;
      vertical-align: middle;
      color: #666;
      transition: all 0.3s ease-in;

      &:not(.active):hover {
        background: #f8f8f8;
      }

      &.active {
        color: #fff;
        border: 1px solid #409eff;
        background-color: #409eff;

        .tags-li-title {
          color: #fff;
        }
      }

      .tags-li-title {
        color: #666;
      }
    }
  }
  .tags-close-box {
    position: absolute;
    right: 4px;
    top: 2px;
    width: 110px;
    height: 30px;
  }
}
</style>