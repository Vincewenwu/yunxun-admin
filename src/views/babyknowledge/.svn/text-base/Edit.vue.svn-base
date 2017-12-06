<template>
<el-form ref="form" :model="form" label-width="80px" v-loading="loading2"
        element-loading-text="拼命加载中" style="width: 500px;margin-top: 20px;">
 
  <el-form-item label="育儿图片">
    <el-upload
    name="yuerImg"
    class="avatar-uploader"
    :action="uploadUrl + '/baby/uploadLogo'"
    :show-file-list="false"
    :on-success="handleAvatarSuccess"
    :before-upload="beforeAvatarUpload">
  <img v-if="imageUrl" :src="imageUrl" class="avatar">
  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
  </el-upload>
  <!--<el-dialog v-model="dialogVisible" size="tiny">
    <img width="100%" :src="dialogImageUrl" alt="">
  </el-dialog>-->
  </el-form-item>
  
  <el-form-item label="URL">
    <el-input type="text" v-model="linkurl" placeholder="http://"></el-input>
  </el-form-item>

  <el-form-item label="排列">
    <el-input type="text" v-model="serialNum"></el-input>
  </el-form-item>
  <el-form-item label="起始时间">
  <el-date-picker
  	@change="amSignTime"
      v-model="value4"
      type="datetimerange"
      placeholder="选择时间范围"
      align="right">
    </el-date-picker>
  </el-form-item>
  
  <el-form-item label="范围类型">
     <el-select v-model="rangevalue" placeholder="请选择类型">
     	<el-option
      v-for="item in options"
      :key="item.value"
      :label="item.label"
      :value="item.value">
    </el-option>
      </el-select>
  </el-form-item>
  <el-form-item label="标签选择">
  	<div >
     <el-select v-model="groupvalue"  placeholder="请选择标签">
            <el-option v-for="group in grouplist" 
        	@change=""
          :key="group.id"
          :label="group.lableName"
          :value="group.id">
        	{{group.lableName}}
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
     <el-form-item label="名称">
    <el-input type="textarea" v-model="name"></el-input>
  </el-form-item>
  <el-form-item label="标题">
    <el-input type="textarea" v-model="title"></el-input>
  </el-form-item>
  <el-form-item label="内容">
    <el-input type="textarea" v-model="content"></el-input>
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
        },
        shool: '',
        shoollist: [],
        group: '',
        grouplist: [],
        groupvalue: '',
        shoolvalue: '',
        rangevalue: '',
        imageUrl: '',
        isActive: true,
        disabled: true,
        content: '',
        intro: '',
        title: '',
        serial: 0,
        linkurl: '',
        value4: [],
        valuetime: [],
        amCheckInDeadline: [], // 时间
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
        name: '',
        loading2: true,
        serialNum: ''
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
        console.log(file, fileList)
      },
      handlePreview (file) {
        console.log(file)
      },
      onSubmit () {
        console.log('submit!')
      },
// 记载基础数据
      async getData () {
        let data0 = await http.post('/school/getCboSchool')
        this.shoollist = data0.data.obj
        let data1 = await http.post('/classquan/findClassBySchoolId')
        this.grouplist = data1.data.obj
        this.loading2 = false
      },
      amSignTime (val) {
        this.amCheckInDeadline = val // 时间处理
      },
// 初始化绑定数据
      async geteditData () {
        let r = {
          ids: this.$router.currentRoute.query.id
        }
        let result = await http.post('/baby/findOneBaseParentingKnowledgeDTO', r)
        this.serialNum = result.data.obj.serialNum
        this.title = result.data.obj.title
        this.name = result.data.obj.name
        this.linkurl = result.data.obj.url
        this.content = result.data.obj.content
        this.rangevalue = result.data.obj.rangeType
        this.valuetime[0] = result.data.obj.startTime
        this.valuetime[1] = result.data.obj.endTime
        this.shoolvalue = result.data.obj.schoolID
        this.groupvalue = result.data.obj.lebleID
        this.imageUrl = this.imgService + result.data.obj.image
        this.value4 = this.valuetime
      },
// 新增banner 两个if 的原因是if判断不能有太多的参数
      async submitForm () {
//      this.loading2 = true  || this.amCheckInDeadline.length < 1 || this.rangevalue.length < 1 || this.serialNum.length < 1
//      if (this.content.length < 1 || this.name.length < 1 || this.title.length < 1 || this.groupvalue.length < 1 || this.shoolvalue.length < 1 || this.linkur.length < 1 || this.imageUrl.length < 1) {
//        this.loading2 = false
//        this.$message({
//          message: '请填完整信息',
//          type: 'success'
//        })
//      } else {
        let BaseParentingKnowledge = {
          serialNum: this.serialNum,
          title: this.title,
          name: this.name,
          url: this.linkurl,
          content: this.content,
          rangeType: this.rangevalue,
          time: this.value4 = this.amCheckInDeadline,
          schoolId: this.shoolvalue,
          lebleId: this.groupvalue,
          imageUrl: this.imageUrl,
          ids: this.$router.currentRoute.query.id
        }
        if (this.$router.currentRoute.query.id !== '1') {
          let result = await http.post('/baby/editbaseParentingKnowledge', BaseParentingKnowledge)
          this.$message({
            message: result.data.obj,
            type: 'success'
          })
//          this.loading2 = false
        } else {
          let result = await http.post('/baby/addbaseParentingKnowledge', BaseParentingKnowledge)
          this.$message({
            message: result.data.obj,
            type: 'success'
          })
//          this.loading2 = false
//          this.$router.push({ path: '/baseparentingknowledgeEdit', query: {id: '1'} })
          this.resetForm()
        }
//      }
      }
    },
    resetForm () {
      this.content = ''
      this.intro = ''
      this.title = ''
      this.serial = ''
      this.linkurl = ''
      this.shoolvalue = ''
      this.rangevalue = ''
      this.groupvalue = ''
      this.imageUrl = ''
      this.name = ''
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
