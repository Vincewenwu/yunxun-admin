<!--
	作者：7778428589@qq.com
	时间：2017-07-14
	描述：动态详细
-->
<template>
<el-row> 
	<el-row>
		<el-col  >
			<div class="cade_strong">
				<strong > 开布人：</strong>
			</div>
			{{ usernaem }}
		</el-col>  
	</el-row>
	<el-row>
		<el-col>
			<div class="cade_strong">
			  <strong > 开布时间：</strong>
			</div>
			{{ time }}
		</el-col>  
	</el-row> 
	<el-row>
		 <el-col>
		 <div class="cade_strong">
			  <strong > 内容：</strong>
			</div>
		 	<div v-html="context" style="  width: 604px; float: left;" > 
		 	</div>
		 </el-col>
	</el-row>
	<el-row>
		 <el-col>
		 	<div class="cade_strong">
			  <strong > 浏览数：</strong>
			</div>
			{{ pnumber }}
		 </el-col>
	</el-row>
	<el-row>
		 <el-col>
		 	<div class="cade_strong">
			  <strong > 点赞数：</strong>
			</div>
		 	{{ pnumber }}
		 </el-col>
	</el-row>
		
	<el-row>
		 <el-col>
		 	<div class="cade_strong">
			  <strong > 点赞用户：</strong>
			</div>
		 	{{ usernaem }}
		 </el-col>
	</el-row>
	<el-row>
		 <el-col>
		 	<div class="cade_strong">
			  <strong > 评论：</strong>
			</div>
		 	 <div>
		 	 	{{ usernaem }}:{{ ucontext }}
		 	 </div>
		 </el-col>
	</el-row>
	
	<el-row>
		 <el-col style="text-align: center;" :span="24">
		 	 <el-button @click.native="returnpage">返回 </el-button>
		 </el-col>
	</el-row>
	
</el-row>
</template>

<script>
export default{
  data () {
    return {
      pnumber: '30',
      usernaem: '永远晨',
      time: '2017/07/14',
      context: '佛山市学辰教育科技有限公司位于佛山市顺德区乐从镇腾冲罗卜围商业开发区德华路V座二楼B号交通便利。佛山市学辰教育科技有限公司本着“客户第一，诚信至上”的原则，欢迎国内外企业/公司/机构与本单位建立长期的合作关系。热诚欢迎各界朋友前来参观、考察、洽谈业务。吴潇代表佛山市学辰教育科技有限公司欢迎新老客户来电咨询。',
      ucontext: '不错'
    }
  },
  methods: {
    returnpage () {
      this.$router.push({ path: '/campusInformationList' })
    }
  }
}
</script>

<style>
	.cade_strong
	{
		width: 100px;
	    display: block;
	    float: left;
	} 
	.cade_strong strong
	{
	    float: right;
	} 
	.el-row
	{
		margin-top: 10px;
	}
</style>
