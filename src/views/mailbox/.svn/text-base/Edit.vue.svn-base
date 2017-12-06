<template>
<el-form ref="form"   :model="form" label-width="120px" style="width: 500px;margin-top: 20px;">

  <el-form-item label="发件人">
    <div>{{form.sender}}</div>
  </el-form-item>
  <el-form-item label="内容">
     <el-input type="textarea"  v-model="form.letterContent"></el-input>
  </el-form-item>

  <el-form-item label="回复">
     <el-input type="textarea" v-model="form.replyContent"></el-input>
  </el-form-item>

<el-form-item>
    <el-button type="primary" :loading="loading" @click="send">发送</el-button>
    <el-button>返回</el-button>
</el-form-item>


</el-form>
</template>

<script>
  import http from '../../utils/http'
  export default {
    data () {
      return {
        form: {
          loading: false,
          sender: '',
          letterContent: '',
          replyContent: ''
        },
        id: ''
      }
    },
    methods: {
      // 根据id查询回复内容
      async getDataById (id) {
        let params = {
          id: id
        }
        let data = await http.post('/Inform/findMailById.do', params)
        if (data.data.success) {
          this.form = data.data.obj
        } else {
          this.message(data.data.msg)
          this.$router.push({path: '/mailboxlist'})
        }
      },
            // 添加公告
      async send () {
        this.loading = true
        let params = {
          content: this.form.replyContent, // 回复内容
          id: this.id // 主键
        }
        let data = await http.post('/Inform/addPrincipalMail.do', params)
        this.result = data.data.success
        if (this.result) {
          this.message(data.data.msg)
          this.$router.push({ path: '/mailboxlist' })
        } else {
          this.message(data.data.msg)
        }
        this.loading = false
      },
      // 自定义消息
      message (msg) {
        this.$message(msg)
      },
      // 成功消息
      successResult () {
        this.$message({
          message: '操作成功',
          type: 'success'
        })
      },
      // 失败消息
      failResult () {
        this.$message({
          message: '操作失败',
          type: 'warning'
        })
      }
    },
        // 初始化方法
    mounted () {
      if (this.$route.query.id.trim() !== '') {
        this.id = this.$route.query.id
        this.getDataById(this.id)
      }
    }
  }
</script>

<style>
   .uploadimg div{
   	  width:300px;
   	  height:120px;
   }
</style>
