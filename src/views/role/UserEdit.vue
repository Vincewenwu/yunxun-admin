<template>
  <el-row v-loading="bodyloading" element-loading-text="玩命保存中">
    <el-col :span="16">
       <el-form ref="form" :rules="rules" :model="form" label-width="140px" style="margin-top: 20px;" >
        <el-form-item label="用户头像" prop="name">
          <el-upload
            name="headImg"
            class="avatar-uploader"
            :action="uploadUrl + '/sysUser/uploadHeadImg'"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload">
            <img v-if="imageUrl" :src="imageUrl" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <el-form-item label="真实姓名" prop="name" required>
           <el-input v-model="form.name" placeholder="请输入真实姓名"></el-input>
        </el-form-item>
        <el-form-item label="手机号码" prop="phoneNum" required>
           <el-input v-model="form.phoneNum" placeholder="请输入手机号码"></el-input>
        </el-form-item>
        <el-form-item label="用户账号" prop="account" required>
           <el-input v-model="form.account" placeholder="请输入用户账号"></el-input>
        </el-form-item>
        <el-form-item label="用户密码" prop="password" required>
          <el-input type="password" v-model="form.password" placeholder="请输入角用户密码"></el-input>
        </el-form-item>
        <el-form-item label="用户类型" prop="memberType" required>
          <el-radio-group v-model="form.memberType" @change="changeMenuTpye">
            <el-radio label="4">平台</el-radio>
            <el-radio label="3">园长</el-radio>
            <el-radio label="1">老师</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item v-show="typeShow" prop="schoolId" label="园校名称">
          <el-select v-model="form.schoolId" placeholder="请选择园校名称" @change="changeSchool">
            <el-option v-for='item in schoolData' :label="item.name" :value="item.id" :key="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="roleId" label="角色名称" required>
          <el-select v-model="form.roleId" placeholder="请选择角色名称">
            <el-option v-for='item in roleData' :label="item.name" :value="item.id" :key="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('form')">保存</el-button>
          <el-button @click="returnList()">返回</el-button>
        </el-form-item>
       </el-form>
     </el-col>
  </el-row>
</template>

<script>
import http from '../../utils/http'
export default {
  data () {
    return {
      typeShow: false,
      form: {
        account: '',
        password: '',
        name: '',
        phoneNum: '',
        memberType: '4',
        schoolId: '',
        roleId: ''
      },
      rules: {
        account: [
          { required: true, message: '请输入用户账号', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入用户密码', trigger: 'blur' }
        ],
        name: [
          { required: true, message: '请输入真实姓名', trigger: 'blur' }
        ],
        phoneNum: [
          { required: true, message: '请输入手机号码', trigger: 'blur' }
        ],
        roleId: [
          { required: true, message: '请选择角色名称', trigger: 'blur' }
        ]
      },
      schoolData: [],
      roleData: [],
      loading: true,
      bodyloading: false,
      imageUrl: ''
    }
  },
  methods: {
    changeSchool (val) {
      let params = {}
      let the = this
      // the.form.roleId = ''
      if (this.form.memberType !== '4') {
        params.schoolId = val
      } else {
        params.schoolId = ''
      }
      http.post('/sysUser/findRoleNames', params).then(function (data) {
        if (data.data !== null && data.data !== undefined) {
          if (data.data.success === true) {
            the.roleData = data.data.obj
          }
        }
      })
    },
    handleAvatarSuccess (res, file) {
      this.imageUrl = URL.createObjectURL(file.raw)
    },
    beforeAvatarUpload (file) {
      const isJPG = file.type === 'image/jpeg'
      const isLt2M = file.size / 1024 / 1024 < 2
      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isJPG && isLt2M
    },
    submitForm (formName) {
      let the = this
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.bodyloading = true
          http.post('sysUser/addEditUser', this.form).then(function (data) {
            the.bodyloading = false
            if (data.data.success === true) {
              the.$message({
                message: '太帅了，保存成功',
                type: 'success'
              })
              if (the.$route.params.id !== undefined && the.$route.params.id !== null && the.$route.params.id !== '') {
                the.$router.push({ path: '/userList' })
              } else {
                the.$refs[formName].resetFields()
                the.$refs.tree.setCheckedKeys([])
              }
            } else {
              the.$message.error(data.data.msg)
            }
          })
        } else {
          return false
        }
      })
    },
    changeMenuTpye (value) {
      // this.form.roleId = ''
      if (value === '4') {
        this.form.schoolId = ''
        this.typeShow = false
      } else {
        this.typeShow = true
      }
    },
    async bindingData () {
      let httpData = await http.post('sysUser/toAddUser')
      this.schoolData = httpData.data.obj.schools
      this.roleData = httpData.data.obj.roles
      this.loading = false
      if (this.$route.params.id !== undefined && this.$route.params.id !== null && this.$route.params.id !== '') {
        let param = {
          id: this.$route.params.id
        }
        let sysUser = await http.post('sysUser/findUserByUserId', param)
        console.log(sysUser)
        let schoolId = {
          schoolId: sysUser.data.obj.schoolId
        }
        let sysRole = await http.post('/sysUser/findRoleNames', schoolId)
        this.roleData = sysRole.data.obj
        this.imageUrl = this.imgService + sysUser.data.obj.imageUrl
        this.form = sysUser.data.obj
        if (sysUser.data.obj.memberType === '4') {
          this.form.schoolId = ''
        } else {
          this.typeShow = true
        }
      }
    },
    returnList () {
      this.$router.push({ path: '/userList' })
    }
  },
  mounted () {
    this.bindingData()
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
