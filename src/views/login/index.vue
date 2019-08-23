<template>
  <div class="container">
    <van-nav-bar title="登录" />
    <van-cell-group>
      <van-field
        v-model="user.mobile"
        v-validate="'required|min:11'"
        name="手机号"
        :error-message="errors.first('手机号')"
        label="手机号"
        placeholder="请输入手机号"
        required
        clearable
      />

      <van-field
        v-model="user.code"
        v-validate="'required|min:6'"
        name="验证码"
        :error-message="errors.first('验证码')"
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
import { mapMutations } from 'vuex'

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
  created () {
    this.customValidateMessages()
  },
  methods: {
    ...mapMutations(['setUser']),
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
          this.setUser(data.data)

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
    },

    customValidateMessages () {
      // 校验规则对象
      const dict = {
        custom: {
          手机号: {
            required: '手机号不能为空'
          }
        // 验证码: {
        //   required: () => 'Your name is empty'
        // }
        }
      }
      // 生效的api
      this.$validator.localize('zh_CN', dict)
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
