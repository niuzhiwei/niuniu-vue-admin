import {
    getToken,
    setToken,
    removeToken
} from '@/utils/auth'
import {
    getUserInfo
} from '@/api'

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
        changeRoles({
            commit
        }, role) {
            return new Promise(resolve => {
                const token = role === 'admin' ? 'e10adc3949ba59abbe56e057f20f883e' : 'e10adc3949ba59abb3gse057f20f883e';
                commit('setToken', token)
                setToken('Token', token)
                getUserInfo().then(res => {
                    const {
                        userInfo
                    } = res;
                    commit('setRoles', userInfo.roles);
                    commit('setName', userInfo.username);
                    commit('setAvatar', userInfo.avatar);
                    resolve()
                })
            })
        }
    }
}

export default user