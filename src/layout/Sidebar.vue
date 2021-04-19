<template>
  <div class="sidebar">
    <el-menu
      class="sidebar-el-menu"
      :default-active="$route.path"
      :collapse="collapse"
      background-color="#1c2b36"
      text-color="#bfcbd9"
      active-text-color="#20a0ff"
      unique-opened
      router
    >
      <template v-for="(item,index) in permission_routers">
        <!-- 没有子菜单的一级菜单 -->
        <el-menu-item
          :key="index"
          v-if="!item.hidden && item.noDropdown"
          :index="item.path+item.children[0].path"
        >
          <i :class="item.meta.icon"></i>
          <span
            v-if="item.meta.title"
            slot="title"
          >{{ $t(`commons.${item.name}`)}}</span>
        </el-menu-item>

        <!-- 二级菜单或者多级 -->
        <el-submenu
          v-if="item.children && item.children.length>=1  && !item.noDropdown"
          :index='index+item.path'
          :key="index+item.path"
        >
          <template slot="title">
            <i :class="item.meta.icon"></i>
            <span
              v-if="item.meta.title"
              slot="title"
            >{{ $t(`commons.${item.name}`)}}</span>
          </template>

          <template v-for='(citem,cindex) in item.children'>
            <el-menu-item
              v-if="!citem.meta.hasChildren"
              :key="cindex+citem.path"
              :index='item.path+citem.path'
            >
              <span v-if="citem.meta.title">{{$t(`commons.${citem.name}`)}}</span>
            </el-menu-item>
            <el-submenu
              v-if="citem.meta.hasChildren"
              :key="cindex"
              :index='item.path+citem.path'
            > <span
                slot="title"
                v-if="citem.meta.title"
              >{{$t(`commons.${citem.name}`)}}</span>
              <el-menu-item
                v-for="(thirditem,index) in citem.children"
                :key="index"
                :index='item.path+thirditem.path'
              >
                <span v-if="thirditem.meta.title">{{$t(`commons.${thirditem.name}`)}}</span>
              </el-menu-item>
            </el-submenu>
          </template>
        </el-submenu>
      </template>
      <!-- <template v-for="item in items">
        <template v-if="item.subs">
          <el-submenu
            :index='item.index'
            :key="item.index"
          >
            <template slot="title">
              <i :class="item.icon"></i>
              <span slot="title">{{ item.title }}</span>
            </template>
            <template v-for="subItem in item.subs">
              <el-submenu
                v-if="subItem.subs"
                :index='subItem.index'
                :key="subItem.index"
              >
                <template slot="title">
                  <span slot="title">{{ subItem.title }}</span>
                </template>
                <el-menu-item
                  v-for="(threeItem,i) in subItem.subs"
                  :key="i"
                  :index="threeItem.index"
                >{{ threeItem.title }}</el-menu-item>
              </el-submenu>
              <el-menu-item
                v-else
                :index="subItem.index"
                :key=subItem.index
              >
                {{subItem.title}}
              </el-menu-item>
            </template>
          </el-submenu>
        </template>
        <template v-else>
          <el-menu-item
            :index="item.index"
            :key="item.index"
          >
            <i :class="item.icon"></i>
            <span slot="title">{{ item.title }}</span>
          </el-menu-item>
        </template>
      </template> -->
    </el-menu>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
export default {
  data() {
    return {
      items: [
        {
          icon: "el-icon-s-home",
          index: "dashboard",
          title: `${this.$t("commons.dashboard")}`,
        },
        {
          icon: "el-icon-table-lamp",
          index: "table",
          title: "基础表格",
        },
        {
          icon: "el-icon-collection-tag",
          index: "tabs",
          title: "tab选项卡",
        },
        {
          icon: "el-icon-notebook-2",
          index: "3",
          title: "表单相关",
          subs: [
            {
              index: "form",
              title: "基本表单",
            },
            {
              index: "3-2",
              title: "三级菜单",
              subs: [
                {
                  index: "editor",
                  title: "富文本编辑器",
                },
              ],
            },
            {
              index: "upload",
              title: "文件上传",
            },
          ],
        },
        {
          icon: "el-icon-map-location",
          index: "map",
          title: "地图图表",
        },
        {
          icon: "el-icon-rank",
          index: "6",
          title: "拖拽组件",
          subs: [
            {
              index: "drag",
              title: "拖拽组件",
            },
            {
              index: "dialog",
              title: "拖拽弹框",
            },
          ],
        },
        {
          icon: "el-icon-error",
          index: "7",
          title: "错误处理",
          subs: [
            {
              index: "permission",
              title: "权限测试",
            },
            {
              index: "404",
              title: "404页面",
            },
          ],
        },
        {
          icon: "el-icon-setting",
          index: "8",
          title: "权限设置",
          subs: [
            {
              index: "permissionpage",
              title: "权限页面",
            },
            {
              index: "permissiondirective",
              title: "权限按钮",
            },
          ],
        },
      ],
    };
  },
  computed: {
    ...mapGetters(["collapse", "permission_routers"]),
    onRoutes() {
      return this.$route.path.replace("/", "");
    },
  },
};
</script>
<style lang='less' scoped>
.sidebar {
  display: block;
  position: absolute;
  left: 0;
  top: 64px;
  bottom: 0;
  overflow-y: scroll;
  &::-webkit-scrollbar {
    width: 0;
  }
  .sidebar-el-menu:not(.el-menu--collapse) {
    width: 250px;
  }
  ul {
    height: 100%;
  }
}
</style>