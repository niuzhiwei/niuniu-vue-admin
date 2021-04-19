import Vue from 'vue'
import Vuex from 'vuex'
import tags from './modules/tags'
import menu from './modules/menu'
import user from './modules/user'
import permission from './modules/permission'
import message from './modules/message'

Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        tags,
        menu,
        user,
        permission,
        message
    }
})