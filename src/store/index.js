import Vue from 'vue'
import Vuex from 'vuex'

// .FIXME: 导入 storage.js 本地存储模块
import { getItem, setItem } from '@/utils/storage'

// *  定义一个常量保存这个字符串
const TOUTIAO_TOKEN = 'TOUTIAOTOKEN'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // *  将 Token 值存储在 vuex状态中
    user: getItem(TOUTIAO_TOKEN)
  },
  mutations: {
    //  TODO 将传递过来的参数赋值给 state中的Token
    setToken(state, data) {
      // 利用封装好的 storage.js 中封装好的模块 更新 state中的数据
      state.user = data

      // 并将获取的数据存储到本地
      setItem(TOUTIAO_TOKEN, data)
    }
  },
  actions: {},
  modules: {}
})
