<template>
  <div class="login_box">
    <!-- TODO 导航栏 -->
    <van-nav-bar title="登录" class="page_nav_bar">
      <!-- 通过 icon 插槽自定义图标  -->
      <!-- <i slot="icon" class="toutiao"></i> -->
    </van-nav-bar>

    <!-- 登录表单 -->
    <van-form @submit="onSubmit" ref="loginFormRef" class="loginForm">
      <!-- 手机号 -->
      <van-field name="mobile" placeholder="请输入手机号" v-model="user.mobile" type="number" :rules="userRules.mobile">
        <!-- 左侧图标名称或图片链接 利用图标的作用域插槽放入自己导入的图标 -->
        <i slot="left-icon" class="toutiao toutiaoliumangxing"> </i>
      </van-field>
      <!-- 验证码 -->
      <van-field name="code" placeholder="请输入验证码" v-model="user.code" type="number " :rules="userRules.code">
        <!-- 左侧图标名称或图片链接 利用图标的作用域插槽放入自己导入的图标 -->
        <i slot="left-icon" class="toutiao toutiaoyanzhengma"> </i>

        <!-- 按钮的作用域插槽  发送短信验证码按钮 -->
        <template #button>
          <!-- 倒计时 -->
          <van-count-down :time="1000 * 5" format="ss 秒" v-if="isShowCountDown" @finish="isShowCountDown = false" />

          <!-- 发送验证码按钮 -->
          <!-- native-type="button" 去掉之前的默认事件,如表单提交事件 -->
          <van-button size="big" type="primary" round @click="sendSms" native-type="button" v-else>发送验证码</van-button>
        </template>
      </van-field>
      <div style="margin: 16px;">
        <van-button block type="info" native-type="submit">提交</van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
// .TODO:  按需加载封装在  发送请求的模块 的方法
import { login, sendSms } from '@/api/user'
// import { login } from '@/api/user'

export default {
  name: '',
  data() {
    return {
      //  *  用户登录表单
      user: {
        // 手机号
        mobile: '',
        // 验证码
        code: ''
      },

      // * 用户表单验证规则 (一个对象)
      userRules: {
        // 手机号规则 (数组)
        mobile: [
          { required: true, message: '请输入手机号' },
          { pattern: /^1[3|5|7|8|9]\d{9}$/, message: '手机号不符合规则' }
        ],
        // 验证码规则 (数组)
        code: [
          { required: true, message: '请填写验证码' },
          { pattern: /^\d{6}$/, message: '请填写正确的验证码' }
        ]
      },

      // * 控制倒计时
      isShowCountDown: false
    }
  },
  mounted() {},
  methods: {
    //  TODO 表单提交事件
    async onSubmit() {
      // console.log(this.user.mobile, this.user.code)
      // *  1.获取参数
      const user = this.user
      // console.log(user)

      // *  2.验证参数 (轻提示)
      this.$toast.loading({
        message: '加载中...',
        // 禁止背景点击
        forbidClick: true,
        // 设置为0,在发送下一次请求前会一直转
        duration: 0
      })

      // * 3.发送登录请求
      try {
        const { data: res } = await login(user)
        // console.log(res.data)
        // 提示成功
        this.$toast.success('登录成功')

        // ! 使用容器存储 Token 的思路
        // 1.登录成功,将 Token 存储到Vuex容器中
        //     获取方便;响应式
        // 2.为了持久化,还需要把 Token 放到本地存储
        //     持久化
        this.$store.commit('setToken', res.data)

        // 编程式导航 跳转到布局页面 layout
        this.$router.push('/layout')
      } catch (err) {
        console.dir(err.response.status)

        // 返回的 err.response.status 是400,表示参数丢失,手机号格式不正确、验证码失效
        if (err.response.status === 400) return this.$toast.fail('手机号格式不正确或验证码失效')
        else this.$toast.fail('其他未知错误')
      }
    },

    //  TODO 发送验证码
    async sendSms() {
      // * 1.校验手机号
      try {
        // 根据 name 值校验单个输入框
        await this.$refs.loginFormRef.validate('mobile')
        // this.$toast.success('预校验成功')

        //  发送验证码
        const { data: res } = await sendSms(this.user.mobile)
        console.log(res)
        this.$toast.success('验证码发送成功')

        // 开启倒计时
        this.isShowCountDown = true
      } catch (err) {
        return console.dir(err)
      }
    }
  }
}
</script>

<style scoped lang="scss">
// * 导航栏
.page_nav_bar {
  background-color: #b4eeb4;
  // !   /deep/ 深层次选择器,可以在父组件中修改子组件的样式
  /deep/ .van-nav-bar__title {
    color: #fff;
  }
}

// * 表单
.loginForm {
  .toutiao {
    font-size: 40px;
    color: aquamarine;
    margin-right: 15px;
  }
  /deep/ .van-button--primary {
    width: 152px;
    height: 46px;
    line-height: 46px;
    font-size: 22px;
    background-color: #66cdaa;
    color: #fff;
  }

  /deep/ .van-button--info {
    background-color: #66cdaa;
    color: #fff;
    border-radius: 20px;
  }
}
</style>
