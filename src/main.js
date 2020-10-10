import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// * 导入Vant 全部导入 (后面优化)
import Vant from 'vant'
import 'vant/lib/index.css'

// * 使用 lib-flexible 动态设置 rem 基准值 (html 标签的字体大小)
import 'amfe-flexible'

// * 导入全局样式
import '@/styles/index.scss'

// .TODO: 注册挂载 vant组件
Vue.use(Vant)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
