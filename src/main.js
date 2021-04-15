import Vue from 'vue'
import App from './App'
import router from "./router"
import store from './store'
import filters from './utils/filters'
import '@/plugins';

//注册全局过滤器
Object.keys(filters).forEach(key => {
    Vue.filter(key, filters[key])
})
import('element-ui/lib/theme-chalk/index.css')
import ElementUI from 'element-ui'
Vue.use(ElementUI);

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')