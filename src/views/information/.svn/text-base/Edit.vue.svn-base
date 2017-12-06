<template>
<el-form ref="form" :model="form" v-loading="loading2"
    element-loading-text="拼命加载中" label-width="80px" style="max-width: 750px; margin-top: 20px;">
 <!--action="http://localhost:8080/yunxun_cms_web/banner/uploadLogo"-->
 <!--action="uploadUrl + 'banner/uploadLogo'"-->
   <el-form-item label="咨询图">
    <el-upload
    name="bannerImg"
    class="avatar-uploader"
 action="uploadUrl + 'banner/uploadLogo'"
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
 
 
 <el-form-item label="标题">
    <el-input type="text" v-model="title" placeholder="请输入标题"></el-input>
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
     <el-select v-model="shoolvalue"   placeholder="请选择院所">
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
<el-form-item label="简介">
  <el-input type="textarea" v-model="intro"></el-input>
</el-form-item>
<el-form-item  label="内容">
  <editor  ref="editortext"></editor>
</el-form-item>
<el-form-item label="排列">
	<el-input-number v-model="serial" :min="0" :max="100"></el-input-number>
</el-form-item>
 
<el-form-item>
    <el-button type="primary"  :plain="true" @click="submitForm('ruleForm2')">提交</el-button>
    <el-button @click="resetForm('ruleForm2')">重置</el-button>
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
      pickerOptions2: {
        shortcuts: [{
          text: '最近一周',
          onClick (picker) {
            const end = new Date()
            const start = new Date()
            end.setTime(start.getTime() + 3600 * 1000 * 24 * 7)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '最近一个月',
          onClick (picker) {
            const end = new Date()
            const start = new Date()
            end.setTime(start.getTime() + 3600 * 1000 * 24 * 30)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '最近三个月',
          onClick (picker) {
            const end = new Date()
            const start = new Date()
            end.setTime(start.getTime() + 3600 * 1000 * 24 * 90)
            picker.$emit('pick', [start, end])
          }
        }]
      },
      form: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: '',
        dialogImageUrl: '',
        dialogVisible: false,
        num1: 0,
        editorContent: '',
        amCheckInDeadline: '' // 上午签到截止时间
      },
      value4: [],
      valuetime: [],
      shoolvalue: '',
      title: '',
      intro: '',
      test: '11',
      serial: '',
      shoollist: [],
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
      rangevalue: '',
      disabled: true,
      grouplist: [],
      groupvalue: '',
      rangevalue1: '',
      imageUrl: '',
      content: '',
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
    getContent: function () {
      alert(this.editorContent)
    },
    amSignTime (val) {
      this.amCheckInDeadline = val // 上午签到截止时间
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
    // 新增banner
    async submitForm () {
      this.loading2 = true
      if (this.$refs.editortext.editorContent.length === 0) {
        this.$refs.editortext.editorContent = this.content
      }
      if (this.rangevalue1.length > 0 && this.title.length > 0 && this.imageUrl.length > 0 && this.rangevalue.length > 0 && this.shoolvalue.length > 0 && this.intro.length > 0 && this.amCheckInDeadline.length > 0) {
        let BaseSchoolInfo = {
          title: this.title,
          schoolId: this.shoolvalue,
          intro: this.intro,
          content: this.$refs.editortext.editorContent, // 获取富文本框的内容
          serialNum: this.serial,
          infoType: 1,
          group: this.groupvalue,
          rangeType: this.rangevalue,
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
          let result1 = await http.post('/banner/addBaseSchoolInfo', BaseSchoolInfo)
          this.$message({
            message: result1.data.obj,
            type: 'success'
          })
          this.loading2 = false
          this.resetForm()
          this.$router.push({ path: '/itedit', query: {id: '1'} })
        }
      } else {
        this.$message({
          message: '请填完整信息',
          type: 'success'
        })
        this.loading2 = false
        this.resetForm()
      }
    },
    resetForm () {
      this.content = ''
      this.intro = ''
      this.title = ''
      this.serial = ''
      this.shoolvalue = ''
      this.rangevalue = ''
      this.$refs.editortext.setHtml('')
      this.imageUrl = ''
    },
// 初始化绑定数据
    async geteditData () {
      let r = {
        baseSchoolInfo: this.$router.currentRoute.query.id
      }
      let data2 = await http.post('/banner/findOneShoolInFo', r)
      this.serial = data2.data.obj.serialNum
      this.shoolvalue = data2.data.obj.schoolId
      this.title = data2.data.obj.title
      this.valuetime[0] = data2.data.obj.startTime
      this.valuetime[1] = data2.data.obj.endTime
      this.intro = data2.data.obj.intro
      this.rangevalue = data2.data.obj.rangeType + ''
      this.groupvalue = data2.data.obj.baseGroupId
      this.$refs.editortext.setHtml(data2.data.obj.content)
      this.imageUrl = this.imgService + data2.data.obj.coverImages
      this.value4 = this.valuetime
      this.rangevalue1 = data2.data.obj.platformFlag
      this.content = data2.data.obj.content
    },
    async getData () {
      let data0 = await http.post('/school/getCboSchool')
      this.shoollist = data0.data.obj
      let data1 = await http.post('/banner/findBaseGroup')
      this.grouplist = data1.data.obj
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

<style>
   .uploadimg div{
   	  width:300px;
   	  height:120px;
   }
</style>
