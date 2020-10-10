// .TODO: 封装axios请求模块

import axios from 'axios'

export const request = axios.create({
  // 基地址
  baseURL: 'http://ttapi.research.itcast.cn/'
})
