<!--
	作者：7778428589@qq.com
	时间：2017-07-14
	描述：日餐谱新增
-->
<template >
	<div>
		<div style="border: 1px solid #18C79C; margin: 0px 10px; padding: 10px;">
			<span>新增餐谱</span>
		</div>
		<div v-loading="loading2"
    element-loading-text="煮菜中"  style=" border: 1px solid #18C79C;border-top: none;  margin: 0px 10px; padding: 10px;">
			<el-form label-width="100px">
          <el-form-item label="平台菜名:">
  <el-select v-model="syRecipeBank" @change="changesel" filterable placeholder="请选择菜谱">
    <el-option
      v-for="RecipeBank in syRecipeBanklist"
      :key="RecipeBank.id"
      :label="RecipeBank.name"
      :value="RecipeBank.id">
    </el-option>
  </el-select>
  </el-form-item>
   <!--action="uploadUrl + 'sysrecipebank/uploadLogo'"-->
			    <!--action="http://localhost:8080/yunxun_cms_web/sysrecipebank/uploadLogo"-->	
 <el-form-item label="菜谱图">
    <el-upload
    name="sysrecipebankImg"
    class="avatar-uploader"
 :action="uploadUrl + 'sysrecipebank/uploadLogo'" 
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
      <el-form-item label="菜名：">
          <el-input type="textarea" v-model="name" > </el-input>
        </el-form-item>
				<el-form-item label="简介：">
					<el-input type="textarea" v-model="intro" > </el-input>
				</el-form-item>
				<el-form-item label="食材">
					<el-input type="textarea" v-model="foodMaterial">
					</el-input>
				</el-form-item>
				<el-form-item label="营养成份">
					<el-input type="textarea" v-model="nutrient">
					</el-input>
				</el-form-item>
			<!--****************** 按钮 ************************ -->

			<div style="text-align: center;">
			<el-button type="primary" :plain="true" @click="submitForm('ruleForm2')">提交</el-button>
      <el-button @click="resetForm('ruleForm2')">重置</el-button>
			</div>
			<!--****************** 按钮 ************************ -->
           </el-form> 
		</div>
	</div>
</template>

<script>
import http from '../../utils/http'
export default {
  data () {
    return {
      syRecipeBank: '',
      imageUrl: '',
      syRecipeBanklist: [],
      sysRecipeBankId: '',
      schoolId: '',
      serialNum: '',
      name: '',
      coverImages: '',
      pictureSet: '',
      intro: '',
      foodMaterial: '',
      nutrient: '',
      loading2: false,
      shoollist: [],
      shoolvalue: ''
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
    handleRemove (file, fileList) {
      console.log(file, fileList)
    },
    handlePictureCardPreview (file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    },
// 选择平台菜谱绑定到现在
    async changesel () {
      let r = {
        id: this.syRecipeBank
      }
      let data2 = await http.post('/sysrecipebank/findOneSysRecipeBank', r)
      console.log(data2)
      this.serialNum = data2.data.obj.serialNum
      this.name = data2.data.obj.name
      this.coverImages = data2.data.obj.coverImages
      this.pictureSet = data2.data.obj.pictureSet
      this.intro = data2.data.obj.intro
      this.foodMaterial = data2.data.obj.foodMaterial
      this.nutrient = data2.data.obj.nutrient
      this.imageUrl = this.imgService + data2.data.obj.coverImages
    },
// 提交
    async submitForm () {
      this.loading2 = true
      if (this.shoolvalue.length < 1 || this.name.length < 1 || this.intro.length < 1 || this.foodMaterial.length < 1 || this.nutrient.length < 1 || this.imageUrl.length < 1) {
        this.$message({
          message: '请填完整数据',
          type: 'success'
        })
        this.loading2 = false
      } else {
        let BaseRecipeBank = {
          sysRecipeBankId: this.syRecipeBank,
          name: this.name,
          pictureSet: '',
          intro: this.intro,
          foodMaterial: this.foodMaterial,
          nutrient: this.nutrient,
          brbid: this.$router.currentRoute.query.id,
          imageUrl: this.imageUrl,
          pingtai: this.syRecipeBank,
          schoolId: this.shoolvalue
        }
        if (this.$router.currentRoute.query.id !== '1') {
          let result = await http.post('/sysrecipebank/editSysRecipeBank', BaseRecipeBank)
          this.$message({
            showClose: true,
            message: result.data.obj,
            type: 'success'
          })
          this.loading2 = false
        } else {
          let result = await http.post('/sysrecipebank/addSysRecipeBank', BaseRecipeBank)
          this.$message({
            showClose: true,
            message: result.data.obj,
            type: 'success'
          })
          this.loading2 = false
          this.resetForm()
        }
      }
    },
// 重置功能
    resetForm () {
      this.serialNum = ''
      this.name = ''
      this.coverImages = ''
      this.pictureSet = ''
      this.intro = ''
      this.foodMaterial = ''
      this.nutrient = ''
      this.imageUrl = ''
      this.shoolvalue = ''
      this.syRecipeBank = ''
    },
    async geteditData () {
      let BaseRecipeBank = {
        id: this.$router.currentRoute.query.id
      }
      let data2 = await http.post('/sysrecipebank/findOneBaseRecipeBank', BaseRecipeBank)
      console.log(data2)
      this.serialNum = data2.data.obj.serialNum
      this.name = data2.data.obj.name
      this.coverImages = data2.data.obj.coverImages
      this.pictureSet = data2.data.obj.pictureSet
      this.intro = data2.data.obj.intro
      this.foodMaterial = data2.data.obj.foodMaterial
      this.nutrient = data2.data.obj.nutrient
      this.imageUrl = this.imgService + data2.data.obj.coverImages
    },
    async getData () {
      let data2 = await http.post('/sysrecipebank/findsysRecipeBankName')
      this.syRecipeBanklist = data2.data.obj
      let data0 = await http.post('/school/getCboSchool')
      this.shoollist = data0.data.obj
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
	
	.nutritionrecipes_add_avatar-uploader-icon {
		font-size: 28px;
		color: #8c939d;
		width: 100px;
		height: 100px;
		line-height: 100px;
		text-align: center;
	}
	
	.nutritionrecipes_add_avatar {
		width: 100px;
		height: 100px;
		display: block;
	} 
	
	#nutritionrecipes_add_el-upload-list>div 
	{
	    width: 100px;
	    height: 100px;
	    line-height: 100px;
	}
	 #nutritionrecipes_add_el-upload-list>ul>li 
	 {
	 	width: 100px;
	    height: 100px;
	    line-height: 100px;
	 }
	 
	 #nutritionrecipes_add_el-upload-list>ul>li>label>i
	 {
		position: relative;
	    top: -33px;
	 }
	 
</style>
