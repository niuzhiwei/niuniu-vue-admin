import {
    getToken
} from '@/utils/auth'
import Vue from 'vue'
import VueI18n from 'vue-i18n'

Vue.use(VueI18n)

import enLocale from './en'
import zhLocale from './zh'


// 通过选项创建 VueI18n 实例
const i18n = new VueI18n({
    locale: getToken('lang') || 'en', // 设置地区
    messages: {
        zh: {
            ...zhLocale
        },
        en: {
            ...enLocale
        }
    } // 设置地区信息
})

export default i18n