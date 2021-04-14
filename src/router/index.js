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
        title: '系统首页'
      }
    }, {
      path: '/table',
      component: () => import('../pages/BaseTable.vue'),
      meta: {
        title: '基础表格'
      }
    }]
  }
]

//注册路由
export default new Router({
  mode: 'history',
  routes: constantRouterMap
})