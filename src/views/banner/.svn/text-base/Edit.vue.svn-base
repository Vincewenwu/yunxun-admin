<template>
<el-form ref="form" :model="form" v-loading="loading2"
    element-loading-text="拼命加载中" label-width="80px" style="width: 500px;margin-top: 20px;">
     <!--action="uploadUrl + 'banner/uploadLogo'"-->
       <!--action="http://localhost:8080/yunxun_cms_web/banner/uploadLogo"-->
  <el-form-item label="banner图">
    <el-upload
    name="bannerImg"
    class="avatar-uploader"
    :action="uploadUrl + 'banner/uploadLogo'"
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
  

  <el-form-item label="URL">
    <el-input type="text" v-model="linkurl" placeholder="http://"></el-input>
  </el-form-item>

  <el-form-item label="排列">
    <el-input type="text" v-model="serial"></el-input>
  </el-form-item>
  <el-form-item label="起始时间">
  <el-date-picker
  	@change="amSignTime"
      v-model="value4"
      type="datetimerange"
      :picker-options="pickerOptions2"
      placeholder="选择时间范围"
      align="right">
    </el-date-picker>
  </el-form-item>
<!--<el-form-item label="分享封面">
    <el-upload
	  action="http://baidu.com"
	  list-type="picture-card"
	  :on-preview="handlePictureCardPreview"
	  :on-remove="handleRemove"
	  class="uploadimg"
	  >
	  <i class="el-icon-plus"></i>
	</el-upload>
	<el-dialog v-model="dialogVisible" size="tiny">
	  <img width="100%" :src="dialogImageUrl" alt="">
	</el-dialog>
  </el-form-item>-->
  
  <el-form-item label="范围类型">
     <el-select v-model="rangevalue" @change="chooseMedicine(value)" placeholder="请选择类型">
     	<el-option
      v-for="item in options"
      :key="item.value"
      :label="item.label"
      :value="item.value">
    </el-option>
      </el-select>
  </el-form-item>
  <el-form-item label="分组推送">
  	<div v-bind:class="classObject">
     <el-select v-model="groupvalue" :disabled="disabled"  placeholder="请选择分组">
            <el-option v-for="group in grouplist" 
        	@change=""
          :key="group.id"
          :label="group.name"
          :value="group.id">
        	{{group.name}}
        </el-option>
      </el-select>
   </div>
</el-form-item>
<el-form-item label="所属院所">
     <el-select v-model="shoolvalue" placeholder="请选择院所">
        <el-option v-for="shool in shoollist" 
        	@change=""
          :key="shool.id"
          :label="shool.name"
          :value="shool.id">
        	{{shool.name}}
        </el-option>
      </el-select>
  </el-form-item>
   <el-form-item label="平台标记">
     <el-select v-model="rangevalue1"  placeholder="请选择类型">
      <el-option
      v-for="item in options1"
      :key="item.value"
      :label="item.label"
      :value="item.value">
    </el-option>
      </el-select>
  </el-form-item>
  <el-form-item label="标题">
    <el-input type="textarea" v-model="title"></el-input>
  </el-form-item>
   <el-form-item label="简介">
    <el-input type="textarea" v-model="intro"></el-input>
  </el-form-item>
  <el-form-item label="内容">
    <el-input type="textarea" v-model="content"></el-input>
  </el-form-item>
  
<!--<el-upload
  class="upload-demo"
  action="https://jsonplaceholder.typicode.com/posts/"
  :on-preview="handlePreview"
  :on-remove="handleRemove"
  :file-list="fileList2"
  list-type="picture">
  <el-button size="small" type="primary">点击上传</el-button>
  <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
</el-upload>-->

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
        },
        shool: '',
        shoollist: [],
        group: '',
        grouplist: [],
        groupvalue: '',
        shoolvalue: '',
        rangevalue: '',
        rangevalue1: '',
        imageUrl: '',
        imageUrls: [],
        isActive: true,
        disabled: true,
        content: '',
        intro: '',
        title: '',
        serial: 0,
        linkurl: '',
        value4: [],
        valuetime: [],
        amCheckInDeadline: '', // 时间
        options: [{
          value: '0',
          label: '群平台'
        }, {
          value: '1',
          label: '全院校'
        }, {
          value: '2',
          label: '分组推送'
        }],
        options1: [{
          value: '0',
          label: '群平台'
        }, {
          value: '1',
          label: '全院校'
        }],
        loading2: false
      }
    },
    methods: {
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
// 第二个图片
      handleRemove (file, fileList) {
//      this.imageUrls = URL.createObjectURL(file.raw)
//      alert(this.imageUrls.this.imageUrls)
        console.log(file, fileList)
      },
      handlePreview (file) {
        alert(file)
        console.log(file)
      },
// 分组功能
      chooseMedicine: function (rowItem) {
        if (this.rangevalue === '2') {
          this.disabled = false
        } else {
          this.disabled = true
          this.groupvalue = ''
        }
      },
      onSubmit () {
        console.log('submit!')
      },
// 记载基础数据
      async getData () {
        let data0 = await http.post('/school/getCboSchool')
        this.shoollist = data0.data.obj
        let data1 = await http.post('/banner/findBaseGroup')
        this.grouplist = data1.data.obj
      },
      amSignTime (val) {
        this.amCheckInDeadline = val // 上午签到截止时间
      },
// 初始化绑定数据
      async geteditData () {
        let r = {
          baseSchoolInfo: this.$router.currentRoute.query.id
        }
        let data2 = await http.post('/banner/findOneShoolInFo', r)
        this.linkurl = data2.data.obj.link
        this.serial = data2.data.obj.serialNum
        this.rangevalue = data2.data.obj.rangeType + ''
        this.shoolvalue = data2.data.obj.schoolId
        this.title = data2.data.obj.title
        this.valuetime[0] = data2.data.obj.startTime
        this.valuetime[1] = data2.data.obj.endTime
        this.intro = data2.data.obj.intro
        this.content = data2.data.obj.content
        this.groupvalue = data2.data.obj.baseGroupId
        this.imageUrl = this.imgService + data2.data.obj.coverImages
        this.value4 = this.valuetime
        this.rangevalue1 = data2.data.obj.platformFlag
      },
// 新增banner
      async submitForm () {
        this.loading2 = true
        if (this.rangevalue1.length && this.linkurl.length && this.imageUrl.length > 0 && this.rangevalue.length > 0 && this.shoolvalue.length > 0 && this.intro.length > 0 && this.content.length > 0 && this.amCheckInDeadline.length > 0) {
          let BaseSchoolInfo = {
            content: this.content,
            intro: this.intro,
            title: this.title,
            serialNum: this.serial,
            link: this.linkurl,
            schoolId: this.shoolvalue,
            infoType: 3,
            rangeType: this.rangevalue,
            group: this.groupvalue,
            time: this.value4 = this.amCheckInDeadline,
            shoolinofid: this.$router.currentRoute.query.id,
            imageUrl: this.imageUrl,
            platformFlag: this.rangevalue1
          }
          if (this.$router.currentRoute.query.id !== '1') {
            let result = await http.post('/banner/editBaseSchoolInfo', BaseSchoolInfo)
            this.$message({
              message: result.data.obj,
              type: 'success'
            })
            this.loading2 = false
          } else {
            let result = await http.post('/banner/addBaseSchoolInfo', BaseSchoolInfo)
            this.$message({
              message: result.data.obj,
              type: 'success'
            })
            this.resetForm()
            this.$router.push({ path: '/banneredit', query: {id: '1'} })
          }
        } else {
          this.$message({
            message: '请填完整信息',
            type: 'success'
          })
          this.resetForm()
          this.loading2 = false
        }
      },
      resetForm () {
        this.loading2 = false
        this.content = ''
        this.intro = ''
        this.title = ''
        this.serial = ''
        this.linkurl = ''
        this.shoolvalue = ''
        this.rangevalue = ''
        this.groupvalue = ''
        this.imageUrl = ''
        this.rangevalue1 = ''
      }
    },
    mounted () {
      this.getData()
      if (this.$router.currentRoute.query.id !== '1') {
        this.geteditData()
      }
    }
  }
</script>

<!--<style>
   .uploadimg div{
   	  width:300px;
   	  height:120px;
   }
</style>-->
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
