import Vue from 'vue';
// import * as echarts from 'echarts'
const echarts = require('echarts/lib/echarts')
//引入折线图、柱状图等组件
require('echarts/lib/chart/line')
require('echarts/lib/chart/bar')
require('echarts/lib/chart/radar')
require('echarts/lib/chart/pie')
require('echarts/lib/chart/map')
require('echarts/lib/chart/effectScatter')

//引入提示框和title组件、图例
require('echarts/lib/component/tooltip')
require('echarts/lib/component/title')
require('echarts/lib/component/legend')
require('echarts/lib/component/legendScroll')
//vue全局注入echarts
Vue.prototype.$echarts = echarts;