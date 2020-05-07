<template>
  <div class="login">
    <div class="login-form">
      <div class="login-header">
        <!-- <img src="../../assets/images/logo.svg" width="350" height="116" alt> -->
        <p class="login-sitename">{{ $Config.siteName }}</p>
      </div>
      <el-input
        placeholder="请输入用户名"
        suffix-icon="fa fa-user"
        v-model="username"
        style="margin-bottom: 18px"
      ></el-input>

      <el-input
        placeholder="请输入密码"
        suffix-icon="fa fa-keyboard-o"
        v-model="password"
        type="password"
        style="margin-bottom: 18px"
        @keyup.native.enter="login"
      ></el-input>

      <el-button
        type="primary"
        :loading="loginLoading"
        style="width: 100%;margin-bottom: 18px"
        @click.native="login"
      >登录</el-button>
      <div>
        <el-checkbox v-model="Remenber">Remember</el-checkbox>
        <!-- <a href="javascript:;" style="float: right;color: #3C8DBC;font-size: 14px">Register</a> -->
      </div>
    </div>
  </div>
</template>

<script>
import { setToken, setUserInfo } from '../../utils/dataStorage'

import { login as loginApi } from '../../api/auth'

export default {
  data () {
    return {
      username: '',
      password: '',
      Remenber: true,
      loginLoading: false
    }
  },
  methods: {
    login () {
      this.loginLoading = true
      if (this.username === '') {
        this.$message('请您输入用户名喔~~')
      } else if (this.password === '') {
        this.$message('请您输入密码喔~~')
      } else if (this.username !== '' && this.password !== '') {
        loginApi({
          username: this.username,
          password: this.password
        })
          .then(res => {
            console.log('登陆res')
            console.log(res)
            setToken(res.result.id)
            setUserInfo(res.result)
            this.loginLoading = false
            this.$router.push({ path: '/' })
          })
          .catch(res => {
            console.log('res')
          })
      }
      this.loginLoading = false
    }
  },
  mounted () {
    const h = this.$createElement

    this.$notify({
      title: '账号提示',
      message: h(
        'i',
        { style: 'color: #e07373' },
        '账户：admin 密码：admin 超级管理员'
      ),
      duration: 3000,
      offset: 80
    })
    this.$notify({
      title: '账号提示',
      message: h(
        'i',
        { style: 'color: #e07373' },
        '账户：admin1 密码：111111 门诊医生'
      ),
      duration: 3000,
      offset: 180
    })
    this.$notify({
      title: '账号提示',
      message: h(
        'i',
        { style: 'color: #e07373' },
        'admin2 密码：222222 财务人员'
      ),
      duration: 3000,
      offset: 280
    })
    this.$notify({
      title: '账号提示',
      message: h(
        'i',
        { style: 'color: #e07373' },
        '账户：admin3 密码：333333 医技医生'
      ),
      duration: 3000,
      offset: 380
    })
  }
}
</script>

<style lang="scss">
@import "Login.scss";
</style>
