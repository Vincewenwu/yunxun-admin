<template>
 <el-form :inline="true" :model="form"  ref="form" label-width="130px" style="width: 500px;margin-top: 20px;">
  <el-form-item label="校园log" prop="imageUrl">
    <el-upload
    name="schoolLogo"
	  class="avatar-uploader"
    :action="uploadUrl + 'school/uploadLogo.do'"
    :show-file-list="false"
    :on-success="handleAvatarSuccess"
    :before-upload="beforeAvatarUpload">
  <img v-if="imageUrl" :src="imageUrl" class="avatar">
  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
	</el-upload>
  </el-form-item>
  </el-form-item>
  <el-form-item label="所属园所">
     <el-select filterable clearable  v-model="form.fatherId" placeholder="没有可以不选">
     <el-option
      v-for="school in schools"
      :key="school.id"
      :label="school.name"
      :value="school.id">
     </el-option>
     </el-select>
  </el-form-item>
  <el-form-item label="学校名称" prop="name" :rules="[
      { required: true, message: '请输入学校名称', trigger: 'blur' },
            { min: 5, max: 12, message: '长度在 5 到 12 个字符', trigger: 'blur' }
    ]">
     <el-input type="text" v-model="form.name"  placeholder="请输入"></el-input>
  </el-form-item>
    </el-form-item>
    <el-form-item label="联系电话" prop="telephone" :rules="[
      { required: true, message: '请输入联系电话', trigger: 'blur' },
            { min: 11, max: 11, message: '长度11个字符', trigger: 'blur' }
    ]">
    <el-input type="text" v-model="form.telephone" placeholder="请输入"></el-input>
  </el-form-item>
    <el-form-item label="邮箱" prop="email" :rules="[
      { required: true, message: '请输入邮箱地址', trigger: 'blur' },
      { type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur,change' }
    ]">
    <el-input type="text" v-model="form.email" placeholder="请输入"></el-input>
  </el-form-item>
  <el-form-item label="网址">
    <el-input type="text" v-model="form.website" placeholder="http://"></el-input>
  </el-form-item>
  <el-form-item v-show="add" label="省">
     <el-select  filterable clearable @change="cboProvinceChange"  v-model="form.provinceId" placeholder="请选择省">
     <el-option
      v-for="province in provinces"
      :key="province.id"
      :label="province.name"
      :value="province.id">
     </el-option>
     </el-select>
  </el-form-item>
    <el-form-item v-show="add" label="市">
     <el-select  filterable clearable  @change="cboCityChange"  v-model="form.cityId" placeholder="请选择市">
     <el-option
      v-for="city in citys"
      :key="city.id"
      :label="city.name"
      :value="city.id">
     </el-option>
     </el-select>
  </el-form-item >
    <el-form-item v-show="add" label="县">
     <el-select  filterable clearable  v-model="form.countyId" placeholder="请选择区">
     <el-option
      v-for="county in countys"
      :key="county.id"
      :label="county.name"
      :value="county.id">
     </el-option>
     </el-select>
  </el-form-item>
  <el-form-item label="地址">
    <el-input type="text" v-model="form.address" placeholder="请输入"></el-input>
  </el-form-item>
  <el-form-item label="描述">
    <el-input size="large" type="textarea"
  placeholder="请输入内容"
  v-model="form.intro"></el-input>
  </el-form-item>
  <el-form-item label="有效期">
   <el-date-picker
   	  @change="effectiveDate"
      v-model="effective"
      type="datetime"
      placeholder="选择日期时间">
    </el-date-picker>
  </el-form-item>
  <el-form-item label="上午签到截止时间">
    <el-time-picker
    @change="amSignTime"
    v-model="amSign"
    type="time"
    placeholder="任意时间点">
    </el-time-picker>
  </el-form-item>
  <el-form-item label="下午签到截止时间">
     <el-time-picker
    @change="pmSignTime"
    v-model="pmSign"
    type="time"
    placeholder="任意时间点">
  </el-time-picker>
  </el-form-item>
  <el-form-item label="上午接人开始时间">
    <el-time-picker
    @change="amJieRenTime"
    v-model="amJieRen"
    type="time"
    placeholder="任意时间点">
    </el-time-picker>
  </el-form-item>
    <el-form-item label="下午接人开始时间">
    <el-time-picker
    @change="pmJieRenTime"
    v-model="pmJieRen"
    type="time"
    placeholder="任意时间点">
    </el-time-picker>
  </el-form-item>
  <el-form-item label="食谱发布时间">
    <el-time-picker
    @change="recipeTimeChange"
    v-model="recipeTime"
    type="time"
    placeholder="任意时间点">
    </el-time-picker>
  </el-form-item>
<el-form-item>
    <el-button v-show="add" type="primary" @click="submitAdd('form')">确定新增</el-button>
    <el-button v-show="update" type="primary" @click="UpdSchool('ruleForm')">确定修改</el-button>
    <el-button>重置</el-button>
</el-form-item>
</el-form>
</template>

<script>
  import http from '../../utils/http'
  export default {
    data () {
      return {
        form: {
          name: '', // 园校
          telephone: '', // 园校联系电话
          email: '', // 学校电子邮箱
          website: '', // 园校网址
          address: '', // 园校地址
          logo: '', // 园校logo
          warningDays: '', // 预警天数
          intro: '', // 预警天数
          provinceId: '', // 省id
          cityId: '', // 市id
          countyId: '', // 县id
          effectiveTime: '', // 过期时间
          amCheckInDeadline: '', // 上午签到截止时间
          pmCheckInDeadline: '', // 下午签到截止时间
          amCheckOutDeadline: '', // 上午接送截止时间
          pmCheckOutDeadline: '', // 下午接送截止时间
          recipePublishTime: '', // 餐普发布时间
          id: '', // 主键
          fatherId: '' // 父id
        },
        effective: '', // 过期时间
        amSign: '',
        pmSign: '',
        amJieRen: '',
        pmJieRen: '',
        recipeTime: '',
        schools: [], // 园校下拉框
        provinces: [],
        citys: [],
        countys: [],
        result: false,
        add: true,
        update: false,
        imageUrl: ''
      }
    },
    methods: {
      submitAdd (formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.addSchool()
          } else {
            console.log('error submit!!')
            return false
          }
        })
      },
      // 添加
      async addSchool () {
        let BaseSchool = {
          name: this.form.name, // 园校
          telephone: this.form.telephone, // 园校联系电话
          email: this.form.email, // 学校电子邮箱
          website: this.form.website, // 园校网址
          address: this.form.address, // 园校地址
          warningDays: this.form.warningDays, // 预警天数
          intro: this.form.intro, // 预警天数
          provinceId: this.form.provinceId, // 省id
          cityId: this.form.cityId, // 市id
          countyId: this.form.countyId, // 县id
          effectiveTime: this.form.effectiveTime, // 过期时间
          amCheckInDeadline: this.form.amCheckInDeadline, // 上午签到截止时间
          pmCheckInDeadline: this.form.pmCheckInDeadline, // 下午签到截止时间
          amCheckOutDeadline: this.form.amCheckOutDeadline, // 上午接送截止时间
          pmCheckOutDeadline: this.form.pmCheckOutDeadline, // 下午接送截止时间
          recipePublishTime: this.form.recipePublishTime,
          fatherId: this.form.fatherId,
          id: this.form.id
        }
        let data = await http.post('/school/addSchoool.do', BaseSchool)
        this.result = data.data.success
        if (this.result) {
          this.successResult()
          this.$router.push({ path: '/schoollist' })
        } else {
          this.message(data.data.msg)
        }
      },
      // 修改园校
      async UpdSchool (formName) {
        let BaseSchool = {
          name: this.form.name, // 园校名称
          telephone: this.form.telephone, // 园校联系电话
          email: this.form.email, // 学校电子邮箱
          website: this.form.website, // 园校网址
          address: this.form.address, // 园校地址
          warningDays: this.form.warningDays, // 预警天数
          intro: this.form.intro, // 预警天数
          effectiveTime: this.form.effectiveTime, // 过期时间
          amCheckInDeadline: this.form.amCheckInDeadline, // 上午签到截止时间
          pmCheckInDeadline: this.form.pmCheckInDeadline, // 下午签到截止时间
          amCheckOutDeadline: this.form.amCheckOutDeadline, // 上午接送截止时间
          pmCheckOutDeadline: this.form.pmCheckOutDeadline, // 下午接送截止时间
          recipePublishTime: this.form.recipePublishTime,
          fatherId: this.form.fatherId,
          id: this.form.id
        }
        let data = await http.post('/school/editSchool.do', BaseSchool)
        this.result = data.data.success
        if (this.result) {
          this.successResult()
          this.$router.push({ path: '/schoollist' })
        } else {
          this.message(data.data.msg)
        }
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
      // 绑定学校下拉框
      async cboSchoolDate () {
        let data = await http.post('/school/findCboSchool.do')
        this.schools = data.data.obj
      },
      // 绑定省、市、区下拉框  id:主键 （上级主键作为下级的父id）  cboType: 1--》省下拉框  2--》市下拉框  3--》区下拉框
      async cboDistrictDate (id, cboType) {
        let thi = this
        let params = {
          pid: id
        }
        http.post('/school/findDistrict.do', params).then(function (data) {
          if (data.data.success) {
            switch (cboType) {
              case 1:
                thi.provinces = data.data.obj
                break
              case 2:
                thi.citys = data.data.obj
                break
              case 3:
                thi.countys = data.data.obj
                break
            }
          }
        })
      },
      // 省下拉框选择时触发 查询市下拉框的数据
      cboProvinceChange (id) {
        this.form.cityId = ''
        this.form.countyId = ''
        this.cboDistrictDate(id, 2)
      },
      // 市下拉框选择时触发 查询区下拉框的数据
      cboCityChange (id) {
        this.form.countyId = ''
        this.cboDistrictDate(id, 3)
      },
      // 根据园校id查询院校信息绑定在编辑页面
      async getSchoolById (schoolId) {
        let params = {
          schoolId: schoolId
        }
        let data = await http.post('/school/findSchoolById.do', params)
        if (data.data.obj.length > 0) {
          this.form = data.data.obj[0]
          this.effective = data.data.obj[0].effectiveTime
          this.amSign = data.data.obj[0].amCheckInDeadline
          this.pmSign = data.data.obj[0].pmCheckInDeadline
          this.amJieRen = data.data.obj[0].amCheckOutDeadline
          this.pmJieRen = data.data.obj[0].pmCheckOutDeadline
          this.recipeTime = data.data.obj[0].recipePublishTime
          this.imageUrl = this.imgService + data.data.obj[0].logo
          if (data.data.obj[0].fatherId !== '' && data.data.obj[0].fatherId.trim() !== '0') {
            this.form.fatherId = data.data.obj[0].fatherId
          }
        }
      },
      effectiveDate (val) {
        this.form.effectiveTime = val // 过期时间
      },
      amSignTime (val) {
        this.form.amCheckInDeadline = val // 上午签到截止时间
      },
      pmSignTime (val) {
        this.form.pmCheckInDeadline = val // 下午签到截止时间
      },
      amJieRenTime (val) {
        this.form.amCheckOutDeadline = val // 上午接送截止时间
      },
      pmJieRenTime (val) {
        this.form.pmCheckOutDeadline = val // 下午接送截止时间
      },
      recipeTimeChange (val) {
        this.form.recipePublishTime = val // 发布餐普时间
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
      this.cboSchoolDate()
      this.cboDistrictDate(1, 1)
      if (this.$route.query.id !== undefined && this.$route.query.id.trim() !== '') {
        this.getSchoolById(this.$route.query.id)
        this.update = true
        this.add = false
        this.form.id = this.$route.query.id
      } else {
        this.update = false
        this.add = true
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
    width: 500px;
    height: 200px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 500px;
    height: 200px;
    display: block;
  }
</style>
