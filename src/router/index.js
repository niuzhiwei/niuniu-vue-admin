import Vue from 'vue'
import Router from "vue-router"
import Home from '../layout/Home.vue'
Vue.use(Router)

//默认不需要权限的页面
export const constantRouterMap = [{
    path: '/',
    component: Home,
    redirect: '/dashboard',
    hidden: true
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../pages/Login.vue'),
    hidden: true,
    meta: {
      title: '登录'
    }
  },
  {
    path: '/404',
    name: '404',
    component: () => import('../pages/404.vue'),
    meta: {
      title: '404'
    },
    hidden: true
  },
  {
    path: '/',
    name: 'dashboard',
    component: Home,
    meta: {
      title: '系统首页',
      icon: 'el-icon-s-home'
    },
    noDropdown: true,
    children: [{
      path: 'dashboard',
      name: 'dashboard',
      meta: {
        title: '系统首页',
        icon: 'el-icon-s-home',
      },
      component: () => import('../pages/Dashboard.vue'),
    }]
  },
]
//异步路由（需要权限的页面）
export const asyncRouterMap = [{
    path: '/',
    name: 'baseTable',
    component: Home,
    meta: {
      title: '基础表格',
      icon: 'el-icon-table-lamp'
    },
    noDropdown: true,
    children: [{
      path: 'table',
      name: 'baseTable',
      meta: {
        title: '基础表格',
        icon: 'el-icon-table-lamp',
      },
      component: () => import('../pages/BaseTable.vue')
    }]
  }, {
    path: '/',
    name: 'tabs',
    component: Home,
    meta: {
      title: 'tab选项卡',
      icon: 'el-icon-collection-tag'
    },
    noDropdown: true,
    children: [{
      path: 'tabs',
      name: 'tabs',
      meta: {
        title: 'tab选项卡',
        icon: 'el-icon-collection-tag',
      },
      component: () => import('../pages/Tabs.vue')
    }]
  },
  {
    path: '/',
    name: 'forms',
    component: Home,
    meta: {
      title: '表单相关',
      icon: 'el-icon-tickets'
    },
    redirect: '/form',
    children: [{
        path: 'form',
        name: 'baseform',
        meta: {
          title: '基本表单',
        },
        component: () => import('../pages/BaseForm.vue')
      }, {
        path: 'upload',
        name: 'upload',
        meta: {
          title: '文件上传'
        },
        component: () => import('../pages/Upload.vue')
      },
      {
        path: '/',
        name: 'thirdmenu',
        meta: {
          title: '三级菜单',
          hasChildren: true
        },
        component: {
          render: (e) => e('router-view')
        },
        redirect: '/editor',
        children: [{
          path: 'editor',
          name: 'editor',
          meta: {
            title: '富文本编辑器'
          },
          component: () => import('../pages/VueEditor.vue')
        }]
      },
    ]
  },
  {
    path: '/',
    name: 'map',
    component: Home,
    meta: {
      title: '地图图表',
      icon: 'el-icon-map-location'
    },
    noDropdown: true,
    children: [{
      name: 'map',
      path: 'map',
      meta: {
        title: '地图图表',
        icon: 'el-icon-map-location'
      },
      component: () => import('../pages/Map.vue')
    }]
  }, {
    path: '/',
    name: 'drag',
    component: Home,
    meta: {
      title: '拖拽组件',
      icon: 'el-icon-thumb'
    },
    children: [{
      path: 'drag',
      name: 'dragcomponent',
      meta: {
        title: '拖拽组件'
      },
      component: () => import('../pages/DragList.vue')
    }, {
      path: 'dialog',
      name: 'dragdialog',
      meta: {
        title: '拖拽弹框'
      },
      component: () => import('../pages/DragDialog.vue')
    }]
  }, {
    path: '/',
    name: 'permission',
    component: Home,
    meta: {
      title: '权限设置',
      icon: 'el-icon-setting',
      roles: ['admin', 'editor']
    },
    children: [{
      path: 'permissionpage',
      name: 'permissionpage',
      meta: {
        title: '权限页面',
        roles: ['admin']
      },
      component: () => import('../pages/PermissionPage.vue')
    }, {
      path: 'permissiondirective',
      name: 'permissiondirective',
      meta: {
        title: '权限按钮',
        roles: ['editor']
      },
      component: () => import('../pages/PermissionDirective.vue')
    }]
  }, {
    path: '/',
    name: 'error',
    component: Home,
    meta: {
      title: '404',
      icon: 'el-icon-warning-outline'
    },
    children: [{
      path: '404',
      name: '404',
      meta: {
        title: '404'
      },
      component: () => import('../pages/404.vue')
    }]
  },
  // {
  //   path: '*',
  //   redirect: '/404',
  //   hidden: true
  // }
]

//注册路由
const router = new Router({
  // mode: 'history',
  routes: constantRouterMap
})

export default router