<!--
	作者：7778428589@qq.com
	时间：2017-07-12
	描述：新增班级
-->
<template>
<el-form ref="form" :model="form" label-width="80px" style="max-width: 750px; margin-top: 20px;">
   <el-form-item label="所属园所">
     <el-select :disabled.sync="cboSchoolDisable" @change="cboSchoolChange" v-model="form.schoolId" clearable filterable @clear="cboSchoolClear" placeholder="请选择院所">
        <el-option
        v-for="school in schools"
        :key="school.id"
        :label="school.name"
        :value="school.id">
       </el-option>
     </el-select>
  </el-form-item>
  <el-form-item label="所属年级">
     <el-select @change="cboGradeChange" v-model="form.gradeId" clearable filterable placeholder="请选择院所">
        <el-option
        v-for="grade in grades"
        :key="grade.id"
        :label="grade.gradeName"
        :value="grade.id">
       </el-option>
     </el-select>
  </el-form-item>	
  <el-form-item label="班级名称">
    <el-input type="text" v-model="form.className" placeholder="请输入班级名称"></el-input>
  </el-form-item>
  <el-form-item label="班级描述">
    <el-input type="textarea" v-model="form.description" placeholder="请输入班级描述"></el-input>
  </el-form-item>
  <el-form-item label="班主任">
      <el-select :disabled="cboTeacherDisabled" clearable filterable  v-model="form.teacherId" @change="cboTeacherChange" placeholder="请选择班主任">
    <el-option
      v-for="teacher in teachers"
      :key="teacher.id"
      :label="teacher.name"
      :value="teacher.id">
    </el-option>
  </el-select>
  </el-form-item>
<el-form-item>
    <el-button  type="primary" :loading="showBtn" @click="addOrUpdClass()">保存</el-button>
    <el-button>重置</el-button>
</el-form-item>


</el-form>

</template>

<script>
import editor from '../../components/editor/editor'
import http from '../../utils/http'
export default {
  components: {
    'editor': editor
  },
  data () {
    return {
      form: {
        schoolId: '',
        gradeId: '',
        teacherId: '',
        className: '',
        description: ''
      },
      classId: '',
      classIdCopy: '',
      schools: [],
      grades: [],
      teachers: [],
      cboTeacherDisabled: true,
      cboSchoolDisable: false,
      Type: 0, // 0为新增  1为修改
      showBtn: false
    }
  },
  methods: {
    async addOrUpdClass () {
      this.showBtn = true
      let BaseClass = {
        id: this.classId,
        schoolId: this.form.schoolId, // 园校id
        gradeId: this.form.gradeId, // 年级id
        className: this.form.className, // 班级名称
        description: this.form.description, // 班级描述
        teacherId: this.form.teacherId // 教师id
      }
      let data = ''
      if (this.Type === 0) {
        data = await http.post('/class/addClass', BaseClass)
      }
      if (this.Type === 1) {
        data = await http.post('/class/editClass', BaseClass)
      }
      if (data.data.success) {
        this.successResult()
        this.$router.push({ path: '/classList' })
      } else {
        this.message(data.data.msg)
      }
      this.showBtn = false
    },
    // 根据主键查询班级信息
    async getClassById () {
      let params = {
        classId: this.classId
      }
      let data = await http.post('/class/findClassById.do', params)
      if (data.data.success) {
        this.form = data.data.obj
      } else {
        this.message(data.data.msg)
      }
    },
    // 绑定学校下拉框
    async getCboSchoolData () {
      let data = await http.post('/school/getCboSchool.do')
      if (data.data.obj.length > 0) {
        this.schools = data.data.obj
      } else {
        this.schools = []
      }
    },
    // 绑定年级下拉框
    async getCboGradeData () {
      let data = await http.post('/class/findGrade.do')
      if (data.data.success) {
        this.grades = data.data.obj
      } else {
        this.message(data.data.msg)
        this.grades = []
      }
    },
    // 绑定老师下拉框
    async getCboTeacherData () {
      if (this.Type !== 1) {
        this.classIdCopy = ''
      }
      let params = {
        schoolId: this.form.schoolId,
        classId: this.classIdCopy
      }
      let data = await http.post('/class/findTeacherBySchoolId.do', params)
      if (data.data.success) {
        this.teachers = data.data.obj
        this.cboTeacherDisabled = false // 启用班级下拉框
      } else {
        this.teachers = []
        this.form.teacherId = ''
        this.cboTeacherDisabled = true // 禁用班级下拉框
        this.message(data.data.msg)
      }
    },
    // 园校下拉框选择事件
    cboSchoolChange (id) {
      this.teachers = []
      if (id !== '') {
        this.form.schoolId = id
        this.getCboTeacherData()
      }
    },
    // 年级下拉框选择事件
    cboGradeChange (id) {
      this.form.gradeId = id
    },
    // 班级下拉框选择事件
    cboTeacherChange (id) {
      this.form.teacherId = id
    },
    // 清空学校下拉框事件
    cboSchoolClear () {
      this.teachers = []
      this.form.teacherId = ''
      this.cboTeacherDisabled = true // 禁用班级下拉框
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
    this.getCboSchoolData()
    this.getCboGradeData()
    if (this.$route.query.classId !== 'undefined' && this.$route.query.classId.trim() !== '') {
      this.classId = this.$route.query.classId
      this.classIdCopy = this.$route.query.classId
      this.Type = 1 // 0 是新增 1 是修改
      this.getClassById()
      this.cboSchoolDisable = true
    } else {
      this.Type = 0 // 0 是新增 1 是修改
    }
  }
}
</script>

<style>

 .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #20a0ff;
  }
  .class_add_avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 250px;
    height: 250px;
    line-height: 250px;
    text-align: center;
  }
  .class_add_avatar {
    width: 250px;
    height: 250px;
    display: block;
  }
</style>
