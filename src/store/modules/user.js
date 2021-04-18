import {
    getToken,
    setToken,
    removeToken
} from '@/utils/auth'
import {
    resolve
} from 'core-js/fn/promise'

const user = {
    state: {
        token: getToken('Token'),
        roles: [],
        avatar: '',
        name: '',
        browserTitle: '后台管理系统'
    },
    getters: {
        token: state => state.token,
        roles: state => state.roles,
        avatar: state => state.avatar,
        name: state => state.name,
        browserTitle: state => state.browserTitle
    },
    mutations: {
        setRoles: (state, roles) => {
            state.roles = roles
        },
        setName: (state, name) => {
            state.name = name
        },
        setAvatar: (state, avatar) => {
            state.avatar = avatar
        },
        setToken: (state, token) => {
            state.token = token
        },
        setBrowserTitle: (state, payload) => {
            state.browserTitle = payload.browserTitle
        },
    },
    actions: {
        //退出登录
        LogOut({
            commit
        }) {
            commit('setRoles', []);
            removeToken('Token')
            location.reload()
        },
    }
}

export default user