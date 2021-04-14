<template>
  <div class="tags">
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
        <span class="tags-li-icon">
          <i class="el-icon-close"></i>
        </span>
      </li>
    </ul>

    <div class="tags-close-box">
      <el-dropdown
        split-button
        type="primary"
        size="mini"
      >
        标签选项
        <el-dropdown-menu
          size="mini"
          slot="dropdown"
        >
          <el-dropdown-item>关闭其他</el-dropdown-item>
          <el-dropdown-item>关闭所有</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tagsList: [{ path: "/dashboard", title: "系统首页" }],
    };
  },
  methods: {
    isActive(path) {
      return path === this.$route.path;
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