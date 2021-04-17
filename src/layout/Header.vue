<template>
  <div class="header clear">
    <!-- 折叠侧边栏按钮 -->
    <div
      class="collapseb-btn"
      @click="menuCollapse"
    >
      <i
        v-if="collapse"
        class="el-icon-s-unfold"
      ></i>
      <i
        v-if="!collapse"
        class="el-icon-s-fold"
      ></i>
    </div>
    <div class="logo">后台管理系统</div>

    <div class="header-right">
      <div class="header-icon rflex">
        <!-- 全屏按钮 -->
        <div class="fullscreen-btn">
          <i class="el-icon-full-screen"></i>
        </div>
        <!-- 消息中心   -->
        <div class="btn-bell">
          <i class="el-icon-bell"></i>
        </div>
        <!-- 国际化切换 -->
        <el-dropdown @command="handleLang">
          <span class="el-dropdown-link">
            {{chooseLang}}<i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command='zh'>中文</el-dropdown-item>
            <el-dropdown-item command='en'>英文</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>

        <!-- 用户头像   -->
        <div class="user-avatar">
          <img src="../assets/imgs/pig.png">
        </div>
        <!-- 用户名下拉菜单 -->
        <el-dropdown
          class="user-name"
          trigger="click"
        >
          <span class="el-dropdown-link">
            牛牛
            <i class="el-icon-caret-bottom"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <a
              href="https://github.com/lin-xin/vue-manage-system"
              target="_blank"
            >
              <el-dropdown-item>项目仓库</el-dropdown-item>
            </a>
            <el-dropdown-item
              divided
              command="loginout"
            >退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
import { setToken } from "@/utils/auth";
export default {
  name: "v-header",
  data() {
    return {
      chooseLang: "英文",
    };
  },
  computed: {
    ...mapGetters(["collapse"]),
  },
  methods: {
    ...mapMutations(["menuCollapse"]),
    handleLang(type) {
      setToken("lang", type);
      this.$i18n.locale = type;
      type === "en" ? (this.chooseLang = "英文") : (this.chooseLang = "中文");
    },
  },
};
</script>
<style lang='less' scoped>
.header {
  position: relative;
  box-sizing: border-box;
  width: 100%;
  height: 64px;
  font-size: 22px;
  color: #fff;
  .collapseb-btn {
    float: left;
    padding: 0 24px;
    cursor: pointer;
    line-height: 64px;
  }
  .logo {
    float: left;
    width: 240px;
    line-height: 64px;
  }
  .header-right {
    float: right;
    padding-right: 48px;
    .header-icon {
      height: 64px;
      align-items: center;
      .fullscreen-btn,
      .btn-bell {
        position: relative;
        cursor: pointer;
        width: 30px;
        height: 30px;
        text-align: center;
        padding-right: 20px;
      }
      .user-avatar {
        margin-left: 24px;
        img {
          display: block;
          width: 42px;
          height: 42px;
          border: 100%;
        }
      }
      .user-name {
        margin-left: 10px;
      }
    }
  }
  .el-dropdown-link {
    color: #fff;
    cursor: pointer;
  }
  .el-dropdown-menu__item {
    text-align: center;
  }
}
</style>