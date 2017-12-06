<!--
	作者：7778428589@qq.com
	时间：2017-07-13
	描述：餐谱详情
-->
<template>
	<el-row >
	<el-row style="text-align: center;" class="nutrutionDeta">
		<!-------------------------->
	  <el-col :span="6" :offset="2">
	  	 <span>
	  	 	<strong>发布人：</strong>{{ username }}
	  	 </span>
	  </el-col>
	  <el-col :span="6" :offset="2">
	  	 <span>
	  	 	<strong>餐谱名称：</strong>{{ name }}
	  	 </span>
	  </el-col>
	   <el-col :span="6" :offset="2">
	  	 <span>
	  	 	<strong>编号：</strong>{{ number }}
	  	 </span>
	  </el-col>
	  <!-------------------------->
	  </el-row>
	  
	  <el-row style="text-align: center;" class="nutrutionDeta">
	  <!-------------------------->
	  <el-col :span="6" :offset="2">
	  	 <span>
	  	 	<strong>浏览数：</strong>{{ number }}
	  	 </span>
	  </el-col>
	  
	  <el-col :span="6" :offset="2">
	  	 <span>
	  	 	<strong>点赞数：</strong>{{ number }}
	  	 </span>
	  </el-col>
	  
	    <el-col :span="6" :offset="2">
	  	 <span>
	  	 	<strong>使用数：</strong>{{ number }}
	  	 </span>
	  </el-col>
	  <!-------------------------->
	  </el-row>
	  
	 
	  
	
	 
	   <el-row style="text-align: center;" class="nutrutionDeta">
	  <!-------------------------->
	   <el-col :span="10" :offset="2">
	   	<div style="float: left;"><strong>食材：</strong></div>
	   	<div>
	   		  <div v-html="context" style="width: 80%; height: 100px; overflow: auto;"></div>
	   	</div>   
	   </el-col>
	    <el-col :span="11" :offset="1" >
	    	<div style="float: left;"><strong>营养成份：</strong></div>
	          <div v-html="apud" style="width: 80%; height: 100px; overflow: auto;"></div>
	                 	
	         </div>
	   </el-col>
	  <!-------------------------->
	  </el-row>
	   <el-row style="text-align: center;" class="nutrutionDeta">
	  <!-------------------------->
	   <el-col :span="10" :offset="2">
	   	<div style="float: left;"><strong>封面：</strong></div>
	   	<div>
	   		<img :src="img" style="width: 80%; height: 200px;"/>
	   	</div>   
	   </el-col>
	    <el-col :span="11" :offset="1" >
	    	<div style="float: left;"><strong>简介：</strong></div>
	        <div v-html="context" style="width: 80%; height: 200px; overflow: auto;">
	                 	
	         </div>
	   </el-col>
	  <!-------------------------->
	  </el-row>
	  
	  
	    <el-row style="text-align: center;" class="nutrutionDeta">
	  <!-------------------------->
	   <el-col :span="22" :offset="2">
	   	<div style="float: left;"><strong>图片集：</strong></div>
	   	<div style="float: left;margin-left: 10px;" v-for="item in imgs">
	   		<img :src="item"  style="width: 200px; height: 200px;"/>
	   	</div>   
	   </el-col>
	 <!-------------------------->
	 </el-row> 
	 <el-col :span="24" style="text-align: center;margin-top: 10px;">
     
    <el-button  >返回</el-button>
   	</el-col>
   </el-row> 
</template>

<script>
export default {
  data () {
    return {
      username: '永远晨',
      name: '蛋炒饭',
      img: 'https://ss0.baidu.com/73t1bjeh1BF3odCf/it/u=2535357350,720735513&fm=85&s=64985A954856C3C204BA386C0300F068',
      number: '123456',
      context: '蛋炒饭的版权归作者所有,没有作者本人的书面许可任何人不得转载或使用其中整体或任何部分内容。打印菜谱 蛋炒饭的讨论 最恋家的米酒: 青菜 最恋家的米酒: 菠萝蜜...',
      imgs: [
        'https://ss0.baidu.com/73t1bjeh1BF3odCf/it/u=2535357350,720735513&fm=85&s=64985A954856C3C204BA386C0300F068',
        'https://ss0.baidu.com/73t1bjeh1BF3odCf/it/u=2535357350,720735513&fm=85&s=64985A954856C3C204BA386C0300F068',
        'https://ss0.baidu.com/73t1bjeh1BF3odCf/it/u=2535357350,720735513&fm=85&s=64985A954856C3C204BA386C0300F068'
      ],
      apud: '米饭的主要成分是碳水化合物，米饭中的蛋白质主要是米精蛋白，氨基酸的组成比较完全，人体容易消化吸收；大米可提供丰富B族维生素；大米具有有补中益气、健脾养胃、益精强志、和五脏、通血脉、聪耳明目、止烦、止渴、止泻的功效。 '
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
    getContent: function () {
      alert(this.editorContent)
    },
    openparenedit () {
      this.$router.push({ path: '/parentedit' })
    },
    opensurrogateedit () {
      this.$router.push({ path: '/surrogateedit' })
    }
  }
}
</script>

<style>
.el-col {
    border-radius: 4px;
    margin-top: 10px;
  }
</style>
