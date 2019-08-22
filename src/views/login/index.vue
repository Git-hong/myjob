<template>
  <div class="container">
    <van-nav-bar title="登录" />
    <van-cell-group>
      <van-field
        v-model="user.mobile"
        v-validate="'required|min:11'"
        name="mobile"
        :error-message="errors.first('mobile')"
        label="手机号"
        placeholder="请输入手机号"
        required
        clearable
      />

      <van-field
        v-model="user.code"
        v-validate="'required|min:6'"
        name="code"
        :error-message="errors.first('code')"
        label="验证码"
        placeholder="请输入验证码"
        required
      />
    </van-cell-group>

    <div class="login-btn">
      <van-button type="info" :loading="isLoginLoading" @click="onLogin">登录</van-button>
    </div>
  </div>
</template>

<script>
import { login } from '@/api/user.js'
export default {
  name: 'loginIndex',
  data () {
    return {
      user: {
        mobile: '18801185985',
        code: '246810'
      },
      isLoginLoading: false
    }
  },
  methods: {
    async onLogin () {
      try {
        this.$validator.validate().then(async valid => {
          if (!valid) {
            return
          }
          // 提交表单，让登陆按钮Loading
          this.isLoginLoading = true

          const { data } = await login(this.user)
          console.log(data)

          // 跳转到首页
          // this.$router.push({ name: 'home' })

          // 登录成功，关闭loading
          this.isLoginLoading = false
        })
      } catch (err) {
        if (err.response && err.response.status === 400) {
          this.$Toast.fail('手机号或验证码错误')
        }
        //   无论登录成功还是失败，都要把loading停止
        this.isLoginLoading = false
      }
    }
  }
}
</script>

<style scoped lang="less">
.login-btn {
  //   width: 100%;
  padding: 20px;
  .van-button {
    width: 100%;
  }
}
</style>
