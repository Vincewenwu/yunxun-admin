<template>
<el-form ref="form" :model="form" label-width="80px" style="width: 700px;margin-top: 20px;">
 
 
     <!--action="http://localhost:8080/yunxun_cms_web/classquan/uploadLogo"-->
  <el-form-item label="class动态">
    <el-upload
    name="classRoomImg"
    class="avatar-uploader"
 action="uploadUrl + 'classquan/uploadLogo'"
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
  
  <el-form-item label="班级选择">
    <div v-bind:class="classObject">
     <el-select v-model="classvalue"  placeholder="请选择班级">
            <el-option v-for="group in classlist" 
          @change=""
          :key="group.id"
          :label="group.className"
          :value="group.id">
          {{group.className}}
        </el-option>
      </el-select>
   </div>
</el-form-item>

 <el-form-item label="标签">
    <div v-bind:class="classObject">
     <el-select v-model="lablevalue"  placeholder="请选择标签">
            <el-option v-for="lable in lablelist" 
          @change=""
          :key="lable.id"
          :label="lable.lableName"
          :value="lable.id">
          {{lable.lableName}}
        </el-option>
      </el-select>
   </div>
</el-form-item>

<el-form-item  label="内容">
  <editor  ref="editortext"  ></editor>
</el-form-item>

<el-form-item>
    <el-button type="primary" :plain="true" @click="submitForm('ruleForm2')">提交</el-button>
    <el-button @click="chonghi('ruleForm2')">重置</el-button>
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
        },
        shool: '',
        shoollist: [],
        group: '',
        lable: '',
        classlist: [],
        lablelist: [],
        lablevalue: '',
        shoolvalue: '',
        imageUrl: '',
        content: '',
        classvalue: ''
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
        this.classlist = data1.data.obj.list
        this.lablelist = data1.data.obj.list1
      },
      amSignTime (val) {
        this.amCheckInDeadline = val // 上午签到截止时间
      },
// 初始化绑定数据
      async geteditData () {
        let r = {
          id: this.$router.currentRoute.query.tiao
        }
        let data2 = await http.post('/classquan/findOneMemClassCircleDTO', r)
        this.shoolvalue = data2.data.obj.schoolId
        this.classvalue = data2.data.obj.classId
        this.$refs.editortext.setHtml(data2.data.obj.content)
        this.imageUrl = this.imgService + data2.data.obj.imgs
        this.content = data2.data.obj.content
      },
// 新增banner
      async submitForm () {
        if (this.$refs.editortext.editorContent.length === 0) {
          this.$refs.editortext.editorContent = this.content
        }
        alert(this.$refs.editortext.editorContent)
        alert(this.$refs.editortext.editorContent.Image)
        if (this.imageUrl.length && this.shoolvalue.length > 0 && this.classvalue.length > 0 && this.lablevalue.length > 0) {
          let MemClassCircle = {
            schoolId: this.shoolvalue,
            classId: this.classvalue,
            lableId: this.lablevalue,
            content: this.$refs.editortext.editorContent, // 获取富文本框的内容
            imageUrl: this.imageUrl,
            idd: this.$router.currentRoute.query.tiao // 因为新增不需要id值之所以在这传id给修改 一定要别名
          }
          if (this.$router.currentRoute.query.tiao !== '1') {
            let result = await http.post('/classquan/editMemClassCircle', MemClassCircle)
            this.$message({
              message: result.data.obj,
              type: 'success'
            })
          } else {
            let result = await http.post('/classquan/addMemClassCircle', MemClassCircle)
            this.$message({
              message: result.data.obj,
              type: 'success'
            })
            this.chonghi()
            this.$router.push({ path: '/campusInformationEdit/tiao?tiao=1' }) // 新增成功重新跳转页面
          }
        } else {
          this.$message({
            message: '请填完整信息',
            type: 'success'
          })
        }
      },
      chonghi () {
        this.content = ''
        this.intro = ''
        this.title = ''
        this.serial = ''
        this.linkurl = ''
        this.shoolvalue = ''
        this.rangevalue = ''
        this.classvalue = ''
        this.imageUrl = ''
        this.$refs.editortext.setHtml()
      }
    },
    mounted () {
      this.getData()
      if (this.$router.currentRoute.query.tiao !== '1') {
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
