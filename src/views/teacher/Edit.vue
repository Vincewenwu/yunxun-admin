<template>
	<el-row>
  <el-col :span="24">
<el-form ref="form" v-model="form.headPortrait" label-width="140px" style="max-width: 750px; margin-top: 20px;">
  <el-form-item label="教师头像" prop="imageUrl">
    <el-upload
    name="teacherImg"
    class="avatar-uploader"
    :action="uploadUrl + 'teacher/uploadImg.do'"
    :show-file-list="false"
    :on-success="handleAvatarSuccess"
    :before-upload="beforeAvatarUpload">
  <img v-if="imageUrl" :src="imageUrl" class="avatar">
  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
  </el-upload>
  </el-form-item>
  <el-form-item label="姓名">
    <el-input type="text" v-model="form.name" placeholder="请输入姓名"></el-input>
  </el-form-item>
  <el-form-item label="性别">
     <el-select v-model="form.sex" placeholder="请选择性别">
        <el-option  label="男" value='0'></el-option>
        <el-option  label="女" value='1'></el-option>
     </el-select>
  </el-form-item>
   <el-form-item label="生日">
  <el-date-picker
      @change="birthChange"
      v-model="tbirth"
      type="date"
      placeholder="选择日期">
  </el-date-picker>
  </el-form-item>
  <el-form-item label="身份证号">
    <el-input type="text" v-model="form.idCardNum" placeholder="请输入身份证号"></el-input>
  </el-form-item>
  <el-form-item label="手机号码">
    <el-input type="text" v-model="form.phoneNum" placeholder="请输入手机号"></el-input>
  </el-form-item>
  <el-form-item label="QQ">
    <el-input type="text" v-model="form.qq" placeholder="请输入QQ"></el-input>
  </el-form-item>
   <el-form-item label="邮箱">
    <el-input type="text" v-model="form.email" placeholder="请输入邮箱"></el-input>
  </el-form-item>
  <el-form-item label="地址">
    <el-input type="text" v-model="form.address" placeholder="请输入地址"></el-input>
  </el-form-item>
  <el-form-item label="家庭电话">
    <el-input type="text" v-model="form.homePhone" placeholder="请输入家庭电话"></el-input>
  </el-form-item>
  <el-form-item label="所属院所">
     <el-select @change="cboSchoolChange" v-model="form.schoolId" @clear="cboSchoolClear" placeholder="请选择院所">
        <el-option
        v-for="school in schools"
        :key="school.id"
        :label="school.name"
        :value="school.id">
       </el-option>
      </el-select>
  </el-form-item>
   <el-form-item label="职务">
     <el-select :disabled="cboDutiesDisabled" clearable v-model="form.dutiesId" placeholder="请选择职务">
       <el-option
        v-for="dts in duties"
        :key="dts.id"
        :label="dts.dutiesName"
        :value="dts.id">
       </el-option>
      </el-select>
  </el-form-item>
<el-form-item label="个人简介">
  <editor ref="editortext"></editor>
</el-form-item>
<el-form-item label="个性签名">
    <el-input type="text" v-model="form.signature" placeholder="请输入个性签名"></el-input>
  </el-form-item>
</el-form>
</el-col>
   <el-col :span="24" style="text-align: center;margin-top: 10px;">
     <el-button v-show="add" type="primary" @click="addOrUpdTeacher(1)">确认新增</el-button>
     <el-button v-show="update" type="primary" @click="addOrUpdTeacher(2)">确定修改</el-button>
    <el-button @click="resetForm">取消</el-button>
   	</el-col>
</el-row>

</template>

<script>
import http from '../../utils/http'
import editor from '../../components/editor/editor'
export default {
  components: {
    'editor': editor
  },
  data () {
    return {
      form: {
        headPortrait: '', // 头像
        name: '', // 姓名
        sex: '0', // 性别
        birth: '',
        idCardNum: '', // 身份证号
        phoneNum: '', // 手机号码
        qq: '',
        email: '',
        address: '',
        homePhone: '',
        schoolId: '',
        intro: '',
        dutiesId: '',
        signature: ''
      },
      tbirth: '',
      add: true,
      update: false,
      schools: [], // 园校下拉框
      duties: [], // 职务下拉框
      sysUserId: '', // 后台用户id集合
      cboDutiesDisabled: true, // 禁用职务下拉框
      imageUrl: ''// 头像
    }
  },
  methods: {
    testClick () {
      alert(this.sysUserId)
    },
    async addOrUpdTeacher (val) {
      if (this.$refs.editortext.editorContent === '') {
        this.$refs.editortext.editorContent = this.intro
      }
      let BaseMember = {
        headPortrait: this.form.headPortrait, // 头像
        name: this.form.name, // 姓名
        sex: this.form.sex, // 性别
        birth: this.form.birth,
        idCardNum: this.form.idCardNum, // 身份证号
        phoneNum: this.form.phoneNum, // 手机号码
        qq: this.form.qq,
        email: this.form.email,
        address: this.form.address,
        homePhone: this.form.homePhone,
        schoolId: this.form.schoolId,
        intro: this.$refs.editortext.editorContent,
        dutiesId: this.form.dutiesId,
        signature: this.form.signature,
        sysUserId: this.sysUserId
      }
      let data = ''
      if (val === 1) {
        data = await http.post('/teacher/addTeacher.do', BaseMember)
      }
      if (val === 2) {
        data = await http.post('/teacher/editTeacher.do', BaseMember)
      }
      this.result = data.data.success
      if (this.result) {
        this.successResult()
        this.$router.push({ path: '/teacherList' })
      } else {
        this.message(data.data.msg)
      }
    },
    // 异步加载园校下拉框数据
    async getCboSchoolData () {
      let data = await http.post('/school/getCboSchool.do')
      this.schools = data.data.obj
      // this.total = data.data.obj.total
    },
    // 园校下拉框选择事件 查询该园校的职务
    cboSchoolChange (id) {
      this.duties = []
      if (id !== null) {
        this.schoolId = id
        this.getCboDutiesData()
      }
    },
    cboSchoolClear () {
      this.duties = []
      this.schoolId = ''
      this.dutiesId = ''
      this.cboDutiesDisabled = true
    },
    // 根据园校id查询职务
    async getCboDutiesData () {
      let params = {
        schoolId: this.schoolId
      }
      let data = await http.post('/teacher/findDuties.do', params)
      if (data.data.obj.length > 0) {
        this.duties = data.data.obj
        this.cboDutiesDisabled = false // 启用职务下拉框
      } else {
        this.duties = []
        this.form.dutiesId = ''
        this.cboDutiesDisabled = true // 禁用职务下拉框
        this.message('该园校还没有对应的职务')
      }
    },
    // 根据教师id(后台用户id) 查询教师
    async getTeacherById (teacherId) {
      let params = {
        teacherId: teacherId
      }
      let data = await http.post('/teacher/findTeacherById.do', params)
      this.form = data.data.obj
      this.form.sex = data.data.obj.sex.toString()
      this.tbirth = data.data.obj.birth
      this.$refs.editortext.setHtml(data.data.obj.intro)
      this.intro = data.data.obj.intro
      this.imageUrl = this.imgService + data.data.obj.headPortrait
    },
    // 上传成功
    handleAvatarSuccess (res, file) {
      this.imageUrl = URL.createObjectURL(file.raw)
    },
    // 上传前验证
    beforeAvatarUpload (file) {
      const isJPG = file.type === 'image/jpeg'
      const isLt2M = file.size / 1024 / 1024 < 2
      if (!isJPG) {
        alert('上传头像图片只能是 JPG 格式!')
      }
      if (!isLt2M) {
        alert('上传头像图片大小不能超过 2MB!')
      }
      return isJPG && isLt2M
    },
    // 取消操作
    resetForm () {
      this.$router.push({ path: '/teacherList' })
    },
    // 生日
    birthChange (val) {
      this.form.birth = val.toString()
    },
    message (msg) {
      this.$message(msg)
    },
    failResult () {
      this.$message('操作失败')
    },
    successResult () {
      this.$message({
        message: '操作成功',
        type: 'success'
      })
    }
  },
   // 初始化方法
  mounted () {
    this.getCboSchoolData()
    if (this.$route.query.sysUserId.trim() !== '') {
      this.getTeacherById(this.$route.query.sysUserId)
      this.update = true
      this.add = false
      this.sysUserId = this.$route.query.sysUserId
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
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>
