import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    // * 挂载登录路由
    {
      path: '/login',
      // name属性
      name: 'login',
      // 路由懒加载
      component: () => import('@/views/login')
    },

    // * 挂载布局路由
    {
      path: '/layout',
      name: 'layout',
      component: () => import('@/views/layout')
    }
  ]
})

export default router
