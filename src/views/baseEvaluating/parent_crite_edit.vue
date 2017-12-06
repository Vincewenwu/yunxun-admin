<!--
	作者：wuying
	时间：2017-07-17
	描述：家长对孩子评价信息编辑
-->
<template>
	<el-row>
	  <el-col :span="24">
       <el-form ref="form" :rules="rules" :model="form" label-width="140px" style="max-width: 750px; margin-top: 20px;">
        <el-form-item label="id" v-show="false" prop="id">
          <el-input :span="4" v-model="form.id" ></el-input>
        </el-form-item>
        <el-form-item label="年级" prop="gradeId">
	    <el-select v-model="form.gradeId" placeholder="请选择年级">
	      <el-option v-for="item in grades":key="item.id":label="item.gradeName" :value="item.id"></el-option>
	    </el-select>
	    </el-form-item>
	    <el-form-item label="学期" prop="team">
      <el-select  v-model="form.team" placeholder="请选择学期" >
        <el-option label="上学期" value="0"></el-option>
        <el-option label="下学期"  value="1"></el-option>
      </el-select>
      </el-form-item>
        <el-form-item label="评测项目" prop="projectName">
           <el-input  :span="4" v-model="form.projectName" ></el-input>
        </el-form-item>
        <el-form-item label="评测标准" prop="evalCrite">
           <el-input type="textarea" :rows="3" :span="4" v-model="form.evalCrite"></el-input>
        </el-form-item>
       </el-form>
      </el-col>
      <el-col :span="24" style="text-align: center;margin-top: 10px;">
        <el-button type="primary" @click="submitForm('form')">保存</el-button>
        <el-button @click="returnList()">返回</el-button>
   	  </el-col>
	</el-row>
</template>

<script>
import http from '../../utils/http'
export default {
  data () {
    return {
      form: {
        id: '',
        projectName: '',
        evalCrite: '',
        gradeId: '',
        team: ''
      },
      grades: [],
      rules: {
        projectName: [
          { required: true, message: '请输入评测项目', trigger: 'blur' }
        ],
        evalCrite: [
          { required: true, message: '请输入评测标准', trigger: 'blur' }
        ],
        gradeId: [
          { required: true, message: '请选择年级', trigger: 'change' }
        ],
        team: [
          { required: true, message: '请选择学期', trigger: 'change' }
        ]
      }
    }
  },
  methods: {
    bindingComboBox () {
      let the = this
      http.post('teacherEvalContent/findGradeAndPro').then(function (httpData) {
        the.grades = httpData.data.obj.grades
        the.projectNames = httpData.data.obj.projectNames
      })
    },
    submitForm (formName) {
      let the = this
      // 验证
      this.$refs[formName].validate((valid) => {
        if (valid) {
          http.post('parentCrite/addEditParentCrite', this.form).then(function (data) {
            if (data.data.success === true) {
              the.$message({
                message: '保存成功',
                type: 'success'
              })
              if (the.$route.params.id !== undefined && the.$route.params.id !== null && the.$route.params.id !== '') {
                the.$router.push({ path: '/parentCriteList' }) // 跳转到列表页面
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
        let parentCrite = await http.post('parentCrite/findParentCriteById', param)
        this.form = parentCrite.data.obj
        this.form.team = parentCrite.data.obj.team.toString()
      }
    },
    returnList () {
      this.$router.push({ path: '/parentCriteList' })
    }
  },
  mounted () {
    this.bindingComboBox()
    this.bindingData()
  }
}
</script>

<style>
</style>
