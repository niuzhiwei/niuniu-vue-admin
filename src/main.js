import Vue from 'vue'
import App from './App'
import router from "./router"
import store from './store'
import '@/plugins';

import('element-ui/lib/theme-chalk/index.css')
import ElementUI from 'element-ui'
Vue.use(ElementUI);

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')