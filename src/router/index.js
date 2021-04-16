import Vue from 'vue'
import Router from "vue-router"

Vue.use(Router)

//默认不需要权限的页面
export const constantRouterMap = [{
    path: '/',
    redirect: '/dashboard'
  },
  {
    path: '/',
    component: () => import('../layout/Home.vue'),
    children: [{
        path: '/dashboard',
        component: () => import('../pages/Dashboard.vue'),
        meta: {
          title: '系统首页',
          icon: 'el-icon-s-home'
        }
      }, {
        path: '/table',
        component: () => import('../pages/BaseTable.vue'),
        meta: {
          title: '基础表格',
          icon: 'el-icon-table-lamp'
        }
      }, {
        path: '/tabs',
        component: () => import('../pages/Tabs.vue'),
        meta: {
          title: 'tab选项卡',
          icon: 'el-icon-collection-tag'
        }
      },
      {
        path: '/form',
        component: () => import('../pages/BaseForm.vue'),
        meta: {
          title: '基本表单',
        }
      }, {
        path: '/editor',
        component: () => import('../pages/VueEditor.vue'),
        meta: {
          title: '富文本编辑器'
        }
      },
      {
        path: '/upload',
        component: () => import('../pages/Upload.vue'),
        meta: {
          title: '文件上传'
        }
      }, {
        path: '/map',
        component: () => import('../pages/Map.vue'),
        meta: {
          title: '地图图表',
          icon: 'el-icon-map-location'
        }
      }
    ]
  }
]

//注册路由
export default new Router({
  mode: 'history',
  routes: constantRouterMap
})