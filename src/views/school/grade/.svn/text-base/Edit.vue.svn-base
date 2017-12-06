<!--
	作者：wuying
	时间：2017-07-17
	描述：年级编辑
-->
<template>
	<el-row>
	  <el-col :span="24">
        <el-form ref="form" :rules="rules" :model="form" label-width="140px" style="max-width: 750px; margin-top: 20px;">
        <el-form-item label="id" v-show="false" prop="id">
          <el-input :span="4" v-model="form.id" ></el-input>
        </el-form-item>
        <el-form-item label="年级" prop="gradeName">
           <el-input v-model="form.gradeName" :span="4"></el-input>
        </el-form-item>
       </el-form>
      </el-col>
      <el-col :span="24" style="text-align: center;margin-top: 10px;">
        <el-button type="primary" @click="submitForm('form')">提交</el-button>
        <el-button @click="returnList()">取消</el-button>
   	  </el-col>
	</el-row>
</template>

<script>
import http from '../../../utils/http'
export default {
  data () {
    return {
      form: {
        id: '',
        gradeName: ''
      },
      rules: {
        gradeName: [
          { required: true, message: '请输入年级名称', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    submitForm (formName) {
      let the = this
      // 验证
      this.$refs[formName].validate((valid) => {
        if (valid) {
          http.post('gradeManage/addEditGrade', this.form).then(function (data) {
            if (data.data.success === true) {
              the.$message({
                message: '保存成功',
                type: 'success'
              })
              if (the.$route.params.id !== undefined && the.$route.params.id !== null && the.$route.params.id !== '') {
                the.$router.push({ path: '/gradeList' }) // 跳转到列表页面
              } else {
                the.$refs[formName].resetFields() // 重置
              }
            } else {
              the.$message.error('错了哦，保存失败')
            }
          })
        } else {
          return false
        }
      })
    },
    async bindingData () {
      if (this.$route.params.id !== undefined && this.$route.params.id !== null && this.$route.params.id !== '') {
        let param = {
          id: this.$route.params.id
        }
        let gradeList = await http.post('gradeManage/findGradeById', param)
        this.form = gradeList.data.obj
      }
    },
    returnList () {
      this.$router.push({ path: '/gradeList' })
    }
  },
  mounted () {
    this.bindingData()
  }
}
</script>

<style>
</style>
