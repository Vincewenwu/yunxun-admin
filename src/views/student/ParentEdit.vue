<template>
<el-form ref="form" :model="form" label-width="120px" style="width: 500px;margin-top: 20px;">
  <!--action="uploadUrl + 'baby/uploadLogo'"-->
      <!--action="http://localhost:8080/yunxun_cms_web/baby/uploadLogo"-->
 <el-form-item label="banner图">
    <el-upload
    name="parentImg"
    class="avatar-uploader"
    action="http://localhost:8080/yunxun_cms_web/baby/uploadLogo"
    :show-file-list="false"
    :on-success="handleAvatarSuccess"
    :before-upload="beforeAvatarUpload">
  <img v-if="imageUrl" :src="imageUrl" class="avatar">
  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
  </el-upload>
  <el-dialog v-model="dialogVisible" size="tiny">
    <img width="100%" :src="dialogImageUrl" alt="">
  </el-dialog>
  </el-form-item>
  <el-form-item label="手机号">
    <el-input type="text" v-model="phone" v-on:blur="changeCount" placeholder="请输入"></el-input>
  </el-form-item>
    <el-form-item label="姓名">
    <el-input type="text" v-model="name" :disabled="disabled" placeholder="请输入"></el-input>
  </el-form-item>
    <el-input type="text" v-model="fphone" v-show="isShow" placeholder="请输入"></el-input>
  <el-form-item label="与我关系">
     <el-select v-model="relationship"  placeholder="请选择类型">
      <el-option
      v-for="item in options"
      :key="item.value"
      :label="item.label"
      :value="item.value">
    </el-option>
      </el-select>
  </el-form-item>
<el-form-item>
    <el-button type="primary" :plain="true" @click="submitForm('ruleForm2')">提交</el-button>
    <el-button @click="resetForm('ruleForm2')">重置</el-button>
</el-form-item>


</el-form>
</template>

<script>
import http from '../../utils/http'
export default {
  data () {
    return {
      form: {
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: '',
        dialogImageUrl: '',
        dialogVisible: false
      },
      name: '',
      phone: '',
      fphone: '111',
      relationship: '',
      imageUrl: '',
      options: [{
        value: '0',
        label: '父女'
      }, {
        value: '1',
        label: '父子'
      }, {
        value: '2',
        label: '母女'
      }, {
        value: '3',
        label: '母子'
      }, {
        value: '4',
        label: '祖孙'
      }, {
        value: '5',
        label: '亲属'
      }],
      disabled: false,
      baseMemberID: ''
    }
  },
  methods: {
    onSubmit () {
      console.log('submit!')
    },
    handleRemove (file, fileList) {
      console.log(file, fileList)
    },
    handlePictureCardPreview (file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    },
// 判断家长是否存在 焦点转移
    async changeCount () {
      this.name = ''
      this.disabled = false
      let r = {
        phone: this.phone
      }
      let result = await http.post('/baby/findBsememberByPhone', r)
      this.name = result.data.obj[0].name
      this.baseMemberID = result.data.obj[0].id
      this.imageUrl = this.imgService + result.data.obj[0].headPortrait
      if (this.name.length > 1) {
        this.disabled = true
      }
    },
// 第一个图片的
    handleAvatarSuccess (res, file) {
      this.imageUrl = URL.createObjectURL(file.raw)
      console.log(this.imageUrl)
    },
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
// 新增家长
    async submitForm () {
      if (!(/^1[3|4|5|8][0-9]\d{4,8}$/.test(this.phone))) {
        this.$message({
          message: '请填写正确的手机号码',
          type: 'error'
        })
        this.phone = ''
        return false
      }
      if (this.imageUrl.length < 1 || this.relationship.length < 1 || this.name.length < 1) {
        this.$message({
          message: '请填完整',
          type: 'error'
        })
      } else {
        let BaseMember = {
          name: this.name,
          phoneNum: this.phone,
          relationship: this.relationship,
          babyid: this.$router.currentRoute.query.id,
          fphone: this.fphone,
          parentid: this.$router.currentRoute.query.parentid,
          imageUrl: this.imageUrl,
          disabled: this.disabled,
          baseMemberID: this.baseMemberID
        }
        if (this.$router.currentRoute.query.tiao !== '1') {
          let result = await http.post('/baby/editParentInfonation', BaseMember)
          this.$message({
            message: result.data.obj,
            type: 'success'
          })
        } else {
          let result = await http.post('/baby/addParentbaby', BaseMember)
          this.$message({
            message: result.data.obj,
            type: 'success'
          })
          this.name = ''
          this.phone = ''
          this.fphone = ''
          this.relationship = ''
        }
      }
    },
// 加载基础数据
    async getData () {
      let r = {
        babyid: this.$router.currentRoute.query.id,
        parentid: this.$router.currentRoute.query.parentid // 根据家长ID查家长
      }
      let result = await http.post('/baby/findParentInfonation', r)
      this.name = result.data.obj.preantInfomationDTO[0].name
      this.phone = result.data.obj.preantInfomationDTO[0].phone_num
      this.fphone = result.data.obj.preantInfomationDTO[0].phone_num
      this.relationship = result.data.obj.preantInfomationDTO[0].relationship + ''
      this.imageUrl = this.imgService + result.data.obj.preantInfomationDTO[0].head_portrait
    }
  },
  mounted () {
    if (this.$router.currentRoute.query.tiao !== '1') { // 等于1就是新增了
      this.getData()
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
