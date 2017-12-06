<!--
	作者：7778428589@qq.com
	时间：2017-07-12
	描述：活动新增
-->
<template>
	<div> 
		<div  style="max-width: 750px;  border: 1px solid #18c79c; margin: 0px 10px;  padding: 10px;">
			<span>发布活动</span>
		</div>
		<el-form  label-width="100px" style=" max-width: 750px; border: 1px solid #18c79c;border-top: none;  margin: 0px 10px;  padding: 10px;">
		 
			 <el-form-item label="活动标题">
			 	<el-input type="text" v-model="day" placeholder="请输入" ></el-input> 
			 </el-form-item>
			  <el-form-item label="封面图"> 
			 	 <!-- **************上传组件************** -->
			 	<el-upload  style="float: left;margin-left: 10px;"
				  class="avatar-uploader"
				  action="https://jsonplaceholder.typicode.com/posts/"
				  :show-file-list="false"
				  :on-success="handleAvatarSuccess"
				  :before-upload="beforeAvatarUpload">
				  <img v-if="imageUrl" :src="imageUrl" class="avatar">
				  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
				</el-upload>
			 	 <!-- **************上传组件************** -->
			 	  <el-button style="float: left;margin-top: 40px;margin-left: 10px;" >确定上传</el-button> 
			 
			  </el-form-item>
			  
			 
			<el-form-item label="有效期"> 
			          <el-input ></el-input>
			 </el-form-item>
			 
			<el-form-item label="活动结束时间"> 
			         
			         <el-date-picker
				      v-model="day"
				      type="date"
				      placeholder="选择日期"
				      :picker-options="pickerOptions0">
				    </el-date-picker>
			 </el-form-item>
			 
			 <el-form-item label="描述内容">  
			         <editor></editor>
			</el-form-item>
			 
			 <el-form-item label="排序">  
			          <el-input  style="width: 10%;"></el-input> 
			 </el-form-item> 
			 
			  
			   <!--****************** 按钮 ************************ -->
			  
			  <div style="text-align: center;">
			  	<el-button   type="success" >新增</el-button>
			  	<el-button  >返回</el-button>
			  </div> 
			   <!--****************** 按钮 ************************ --> 
	    </el-form>
	</div>
</template>

<script>
import editor from '../../components/editor/editor'
export default {
  components: {
    'editor': editor
  },
  data () {
    return {
      classvalue: '',
      rstatic: '',
      imageUrl: '',
      day: ''
    }
  },
  methods: {
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
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 100px;
    height: 100px;
    line-height: 100px;
    text-align: center;
  }
  .avatar {
    width: 100px;
    height: 100px;
    display: block;
  } 
  
  .el-upload--picture-card {
    background-color: rgb(250, 254, 253);
    border: 1px dashed #c0ccda;
    border-radius: 6px;
    box-sizing: border-box;
    width: 100px;
    height: 100px;
    cursor: pointer;
    line-height: 100px;
    vertical-align: top;
}
.el-upload-list--picture-card .el-upload-list__item {
    overflow: hidden;
    background-color: #fff;
    border: 1px solid #c0ccda;
    border-radius: 6px;
    box-sizing: border-box;
    width: 100px;
    height: 100px;
    margin: 0 8px 8px 0;
    display: inline-block;
}

</style>
