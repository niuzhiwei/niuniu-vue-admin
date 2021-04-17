import {
    resolve
} from 'core-js/fn/promise';
import {
    asyncRouterMap,
    constantRouterMap
} from '../../router'

//通过meta.role以及当前用户roles做权限匹配
const hasPermission = (roles, route) => {
    if (route.meta && route.meta.roles) {
        return roles.some(role => route.meta.roles.includes(role))
    } else {
        return true
    }
}
//递归过滤异步权限路由，返回符合用户角色权限的路由表
const filterAsyncRouter = (asyncRouterMap, roles) => {
    const accessedRouters = asyncRouterMap.filter(route => {
        if (hasPermission(roles, route)) {
            if (route.children && route.children.length) {
                route.children = filterAsyncRouter(route.children, roles)
            }
            return true
        } else {
            return false
        }
    })
    return accessedRouters
}

const permission = {
    state: {
        routers: constantRouterMap,
        addRouters: []
    },
    getters: {
        permission_routers: state => state.routers, //所有路由
        addRouters: state => state.addRouters, //权限过滤路由
    },
    mutations: {
        setRouters: (state, routers) => {
            state.addRouters = routers //异步权限路由
            state.routers = constantRouterMap.concat(routers) //路由合并
        }
    },
    actions: {
        //根据角色，重新设置权限路由
        generateRoutes({
            commit
        }, data) {
            return new Promise(resolve => {
                const {
                    roles
                } = data;
                let accessedRouters = []
                if (roles.includes('admin')) {
                    //如果是管理员，直接将权限路由赋值过去
                    accessedRouters = asyncRouterMap
                } else {
                    //如果是非管理员，需要过滤权限路由数据
                    accessedRouters = filterAsyncRouter(asyncRouterMap, roles)
                }
                commit('setRouters', accessedRouters)
                resolve()
            })
        }
    }
}

export default permission