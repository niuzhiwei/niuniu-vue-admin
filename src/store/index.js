import Vue from 'vue'
import Vuex from 'vuex'
import tags from './modules/tags'
import menu from './modules/menu'
Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        tags,
        menu
    }
})