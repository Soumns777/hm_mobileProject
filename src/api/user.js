// .FIXME: 处理用户相关的请求

//  TODO 导入请求基准地址
import request from '@/utils/request'

// console.dir(request)

// * 处理登录的请求 (ES6导出)
// 需要把结果 return 出来
export const login = data => {
  // *  请求配置
  return request({
    url: '/app/v1_0/authorizations',
    method: 'POST',
    // data:data  data是调用login方法传入的参数,指user数据
    data
  })
}

// * 处理发送验证码的请求
// 需要把结果 return 出来
export const sendSms = mobile => {
  // *  请求配置
  return request({
    url: `/app/v1_0/sms/codes/${mobile}`,
    method: 'GET'
  })
}
