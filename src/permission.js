import router from './router'
import store from './store'
import Nprogress from 'nprogress'
import {
    getToken
} from '@/utils/auth'
import {
    getUserInfo
} from '@/api'

import {
    setTitle
} from '@/utils/mUtils' // 设置浏览器头部标题

const hasPermission = (roles, routerRoles) => {
    if (roles.includes('admin')) {
        return true
    }
    if (!routerRoles) {
        return true
    }
    return roles.some(role => routerRoles.includes(role))
}

const whiteList = ['/login'] //不重定向白名单

router.beforeEach((to, from, next) => {
    Nprogress.start()
    //设置浏览器头部
    const browserTitle = to.meta.title;
    store.commit('setBrowserTitle', {
        browserTitle
    })
    //点击登录时，拿到了token并存入了cookie，保证页面刷新时，始终可以拿到token
    if (getToken('Token')) {
        if (to.path === '/login') {
            next({
                path: '/'
            })
            Nprogress.done()
        } else {
            //用户成功登录以后，每次点击路由都进行角色判断
            if (store.getters.roles.length === 0) {
                getUserInfo().then(res => {
                    const {
                        userInfo
                    } = res
                    store.commit('setRoles', userInfo.roles)
                    store.commit('setName', userInfo.username)
                    store.commit('setAvatar', userInfo.avatar)
                    store.dispatch('generateRoutes', {
                        "roles": userInfo.roles
                    }).then(() => {
                        router.addRoutes(store.getters.addRouters) //动态合并路由
                        next({
                            ...to,
                            replace: true
                        }) // hack方法 确保addRoutes已完成
                    })
                }).catch(err => {
                    store.dispatch('LogOut')
                    ELEMENT.Message.error('验证失败，请重新登录')
                    next(`/login?redirect=${to.path}`)
                })
            } else {
                if (hasPermission(store.getters.roles, to.meta.roles)) {
                    next()
                } else {
                    next({
                        path: '/401',
                        replace: true,
                        query: {
                            noGoBack: true
                        }
                    })
                }
            }
        }
    } else {
        if (whiteList.includes(to.path)) {
            next()
        } else {
            next(`/login?redirect=${to.path}`)
            Nprogress.done()
        }
    }
})

router.afterEach(() => {
    Nprogress.done()
    setTimeout(() => {
        const browserTitle = store.getters.browserTitle
        setTitle(browserTitle)
    }, 0);
})