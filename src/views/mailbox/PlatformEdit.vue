<template>
<el-form ref="form" :model="form" label-width="120px" style="width: 800px;margin-top: 20px;">

  <el-form-item label="标题">
    <el-input type="text"  v-model="form.desc"></el-input>
  </el-form-item>
  <el-form-item label="连接">
    <el-input type="text"  v-model="form.desc"></el-input>
  </el-form-item>
   <el-form-item label="接收者">
    <el-input type="text"  v-model="form.ren" placeholder="默认发送全部，如需发送给个别用户，请用英文分号（;）隔开"></el-input>
  </el-form-item>
  <el-form-item label="内容">
     <el-input type="textarea"  v-model="form.desc"></el-input>
  </el-form-item>

<el-form-item>
    <el-button type="primary" @click="submitForm('ruleForm2')">发送</el-button>
    <el-button @click="resetForm('ruleForm2')">返回</el-button>
</el-form-item>


</el-form>
</template>

<script>
  export default {
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
          dialogVisible: false
        }
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
      selectChange () {
        this.$router.push({ path: '/push' })
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
