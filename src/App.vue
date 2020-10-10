<template>
  <div id="app">
    黑马头条

    <!-- 字体图标 -->
    <i class="toutiao toutiaoliumangxing"></i>

    <!-- vant -->

    <van-button type="default">默认按钮</van-button>

    <!-- 查看rem -->
    <div class="box">
      勇士总冠军
    </div>

    <!-- 路由入口 -->
    <router-view></router-view>
  </div>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
.box {
  width: 200px;
  height: 200px;
  background-color: #ff6100;
}
</style>
