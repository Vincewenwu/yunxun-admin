<!--
	作者：wuying
	时间：2017-07-17
	描述：教师评测内容编辑
-->
<template>
	<el-row>
	  <el-col :span="24">
        <el-form ref="form" :rules="rules" :model="form" label-width="140px" style="max-width: 750px; margin-top: 20px;">
         <el-form-item label="id" v-show="false" prop="id">
          <el-input :span="4" v-model="form.id" ></el-input>
        </el-form-item>
       	<el-form-item label="年级" prop="gradeId">
	    <el-select v-model="form.gradeId" placeholder="请选择年级" @change="handGradeChange">
	      <el-option v-for="item in grades":key="item.id":label="item.gradeName" :value="item.id"></el-option>
	    </el-select>
	    </el-form-item>
	    <el-form-item label="学期" prop="team">
      <el-select  v-model="form.team" placeholder="请选择学期" >
        <el-option label="上学期" value="0"></el-option>
        <el-option label="下学期"  value="1"></el-option>
      </el-select>
      </el-form-item>
       	<el-form-item label="评测项目" prop="evalProjectId">
	    <el-select v-model="form.evalProjectId" placeholder="请选择项目" @change="handProjectChange">
	      <el-option v-for="item in projectNames":key="item.id":label="item.projectName" :value="item.id"></el-option>
	    </el-select>
	    </el-form-item>
        </el-form-item>
        <el-form-item label="观测内容" prop="contentName">
           <el-input  v-model="form.contentName"></el-input>
        </el-form-item>
         <el-form-item label="参考标准" prop="standradName">
           <el-input type="textarea" :rows="4" v-model="form.standradName" :span="6"></el-input>
        </el-form-item>
        <el-form-item label="得分范围" prop="scoringRange">
           <el-input  v-model="form.scoringRange"></el-input>
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
        gradeId: '',
        evalProjectId: '',
        contentName: '',
        standradName: '',
        scoringRange: '',
        team: ''
      },
      grades: [],
      projectNames: [],
      rules: {
        gradeId: [
          { required: true, message: '请选择年级', trigger: 'change' }
        ],
        evalProjectId: [
          { required: true, message: '请选择项目', trigger: 'change' }
        ],
        contentName: [
          { required: true, message: '请输入评测内容 格式：唱歌/腿部肌肉【行走】', trigger: 'blur' }
        ],
        standradName: [
          { required: true, message: '请输入评测标准', trigger: 'blur' }
        ],
        scoringRange: [
          { required: true, message: '请输入评测得分范围  格式：1,3,5', trigger: 'blur' }
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
          http.post('teacherEvalContent/addEditTeacherEvalContent', this.form).then(function (data) {
            if (data.data.success === true) {
              the.$message({
                message: '保存成功',
                type: 'success'
              })
              if (the.$route.params.id !== undefined && the.$route.params.id !== null && the.$route.params.id !== '') {
                the.$router.push({ path: '/teacherEvalContentList' }) // 跳转到列表页面
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
        let parentCrite = await http.post('teacherEvalContent/findTeacherEvalContentListById', param)
        this.form = parentCrite.data.obj
        this.form.team = parentCrite.data.obj.team.toString()
      }
    },
    returnList () {
      this.$router.push({ path: '/teacherEvalContentList' })
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
