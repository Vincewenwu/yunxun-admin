<template>
  <el-row>
    <el-col>
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" class="login-container">
        <h3 class="title">云贝贝登录</h3>
        <el-form-item prop="account">
          <el-input type="text" v-model="ruleForm.account" auto-complete="off" placeholder="账号"></el-input>
        </el-form-item>
        <el-form-item prop="checkPass">
          <el-input type="password" v-model="ruleForm.checkPass" auto-complete="off" placeholder="密码"></el-input>
        </el-form-item>
        <el-checkbox v-model="checked" checked class="remember">记住密码</el-checkbox>
        <el-form-item style="width:100%;">
          <el-button type="primary" style="width:100%;" @click.native.prevent="handleSubmit" :loading="logining">登录</el-button>
        </el-form-item>
      </el-form>
    </el-col>
  </el-row>
</template>

<script>
import http from '../../utils/http'
import { mapMutations } from 'vuex'
import { setStore } from '../../utils/utils'
export default {
  data () {
    return {
      logining: false,
      ruleForm: {
        account: '',
        checkPass: ''
      },
      rules: {
        account: [
          { required: true, message: '请输入您的账号', trigger: 'blur' }
        ],
        checkPass: [
          { required: true, message: '请输入您的密码', trigger: 'blur' }
        ]
      },
      checked: true
    }
  },
  methods: {
    ...mapMutations([
      'SAVE_USERINFO', 'SAVE_USERRESOUCE'
    ]),
    handleSubmit (ev) {
      let the = this
      this.$refs.ruleForm.validate((valid) => {
        this.logining = true
        if (valid) {
          let params = {
            username: this.ruleForm.account,
            password: this.ruleForm.checkPass
          }
          http.post('/login', params).then(function (data) {
            if (data.data !== null) {
              if (data.data.success === true) {
                the.$message({
                  message: '登录成功',
                  type: 'success'
                })
                setStore('userInfo', data.data.obj.sysUser)
                setStore('userResouce', data.data.obj.sysRoleModulars)
                the.SAVE_USERINFO(data.data.obj.sysUser)
                the.SAVE_USERRESOUCE(data.data.obj.sysRoleModulars)
                the.$router.push({ path: '/index' })
              } else {
                the.logining = false
                the.ruleForm.checkPass = ''
                the.$message.error(data.data.msg)
              }
            } else {
              the.logining = false
              the.$message.error('登录失败')
            }
          }).catch(function (e) {
            console.log(e)
          })
        } else {
          this.logining = false
          the.$message.error('提交失败')
        }
      })
    }
  }
}
</script>

<style scoped>
  .login-container {
    /*box-shadow: 0 0px 8px 0 rgba(0, 0, 0, 0.06), 0 1px 0px 0 rgba(0, 0, 0, 0.02);*/
    -webkit-border-radius: 5px;
    border-radius: 5px;
    -moz-border-radius: 5px;
    background-clip: padding-box;
    padding: 35px 35px 15px 35px;
    background: #fff;
    margin: 130px auto;
    width: 350px;
    border: 1px solid #eaeaea;
    box-shadow: 0 0 5px #cac6c6;
  }
  .title {
    margin: 0px auto 40px auto;
    text-align: center;
    color: #505458;
  }
  .remember {
    margin: 0px 0px 35px 0px;
  }
</style>
