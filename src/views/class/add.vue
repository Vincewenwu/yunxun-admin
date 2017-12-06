<!--
	作者：7778428589@qq.com
	时间：2017-07-12
	描述：新增班级
-->
<template>
<el-form ref="form" :model="form" label-width="80px" style="max-width: 750px; margin-top: 20px;">
  <el-form-item label="班级名称">
    <el-input type="text" v-model="form.url" placeholder="请输入班级名称"></el-input>
  </el-form-item>
  
  <el-form-item label="班级描述">
    <el-input type="textarea" v-model="form.url" placeholder="请输入班级描述"></el-input>
  </el-form-item>
  
  <el-form-item label="班主任">
      <el-select v-model="classtacher" placeholder="请选择">
    <el-option
      v-for="item in tacherList"
      :key="item.value"
      :label="item.label"
      :value="item.value">
    </el-option>
  </el-select>
  </el-form-item>
   
  <el-form-item label="课程表">
    <el-upload
	  class="avatar-uploader"
	  action="https://jsonplaceholder.typicode.com/posts/"
	  :show-file-list="false"
	  :on-success="handleAvatarSuccess"
	  :before-upload="beforeAvatarUpload">
	  <img v-if="imageUrl" :src="imageUrl" class="class_add_avatar">
	  <i v-else class="el-icon-plus class_add_avatar-uploader-icon"></i>
    </el-upload>
  </el-form-item>

 
<el-form-item>
    <el-button type="primary" @click="submitForm('ruleForm2')">提交</el-button>
    <el-button @click="resetForm('ruleForm2')">重置</el-button>
</el-form-item>


</el-form>

</template>

<script>
import editor from '../../components/editor/editor'
export default {
  components: {
    'editor': editor
  },
  data () {
    return {
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
        imageUrl: ''
      },
      tacherList: [{
        value: 1,
        label: '永远晨'
      },
      {
        value: '1',
        label: '宋暖'
      }],
      classtacher: ''
    }
  },
  methods: {
    onSubmit () {
      console.log('submit!')
    },
    handleAvatarSuccess (res, file) {
      this.imageUrl = URL.createObjectURL(file.raw)
    },
    beforeAvatarUpload (file) {
      const isJPG = file.type === 'image/jpeg'
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isJPG) {
        this.$message.error('上传图片只能是 JPG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传图片大小不能超过 2MB!')
      }
      return isJPG && isLt2M
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
