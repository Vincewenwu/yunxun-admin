<template>
<el-form ref="form" :model="form" label-width="120px" style="width: 500px;margin-top: 20px;">
    <!--action="http://localhost:8080/yunxun_cms_web/baby/uploadLogo"-->
    <!--action="uploadUrl + 'baby/uploadLogo'"-->
 <el-form-item label="banner图">
    <el-upload
    name="SurrogateImg"
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
  
    <el-form-item label="姓名">
    <el-input type="text" v-model="name" placeholder="请输入"></el-input>
  </el-form-item>
  <el-form-item label="手机号">
    <el-input type="text" v-model="phone" placeholder="请输入"></el-input>
  </el-form-item>
  <el-form-item label="联系电话">
    <el-input type="text" v-model="telphone" placeholder="请输入"></el-input>
  </el-form-item>
    <el-form-item label="身份证号">
    <el-input type="text" v-model="idcard" placeholder="请输入"></el-input>
  </el-form-item>
   <el-form-item label="家庭地址">
     <el-input type="textarea" v-model="address" placeholder="请输入"></el-input>
  </el-form-item>
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
          type: [],
          dialogImageUrl: '',
          dialogVisible: false
        },
        name: '',
        headurl: '',
        phone: '',
        telphone: '',
        idcard: '',
        address: '',
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
        }]
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
// 新增 和修改联系人
      async submitForm () {
        let BaseSurrogate = {
          name: this.name,
          headurl: this.headurl,
          phone: this.phone,
          telphone: this.telphone,
          idcard: this.idcard,
          address: this.address,
          relationship: this.relationship,
          babyid: this.$router.currentRoute.query.id,
          id: this.$router.currentRoute.query.baseSurrogateid,
          imageUrl: this.imageUrl
        }
        if (this.$router.currentRoute.query.tiao !== '1') {
          let result = await http.post('/baby/editBaseSurrogate', BaseSurrogate)
          this.$message({
            message: result.data.obj,
            type: 'success'
          })
        } else {
          let result = await http.post('/baby/addSurrogate', BaseSurrogate)
          this.$message({
            message: result.data.obj,
            type: 'success'
          })
        }
        this.this.imageUrl = ''
        this.name = ''
        this.headurl = ''
        this.phone = ''
        this.telphone = ''
        this.idcard = ''
        this.address = ''
        this.relationship = ''
      },
// 加载基础数据
      async getData () {
        let r = {
          babyid: this.$router.currentRoute.query.id,
          baseSurrogateid: this.$router.currentRoute.query.baseSurrogateid // 根据家长ID查家长
        }
        let result = await http.post('/baby/findOneBabybaseSurrogate', r)
        console.log(result.data.obj)
        this.name = result.data.obj[0].name
//      this.headurl = result.data.obj[0].headurl
        this.phone = result.data.obj[0].phone
        this.telphone = result.data.obj[0].telphone
        this.idcard = result.data.obj[0].idcard
        this.address = result.data.obj[0].address
        this.relationship = result.data.obj[0].relationship + ''
        this.imageUrl = this.imgService + result.data.obj[0].headurl
      }
    },
    mounted () {
      if (this.$router.currentRoute.query.tiao !== '1') {
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
