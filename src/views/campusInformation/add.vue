<!--
	作者：7778428589@qq.com
	时间：2017-07-12
	描述：发布园所动态
-->
<template>
	<div>
		<el-form  label-width="80px" style="max-width: 750px; margin-top: 20px;">
			<el-form-item >
			     内容：<editor></editor>
			</el-form-item >
			<el-form-item >
			    排序：  
				  <el-select v-model="value" placeholder="请选择">
				    <el-option
				      v-for="item in options"
				      :key="item.value"
				      :label="item.label"
				      :value="item.value">
				    </el-option>
				  </el-select>
			</el-form-item >
			<el-form-item>
			    <el-button type="primary" @click="submitForm('ruleForm2')">提交</el-button>
			    <el-button @click="resetForm('ruleForm2')">重置</el-button>
		   </el-form-item>
		</el-form >
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
      options: [{
        value: '1',
        label: '1'
      },
      {
        value: '2',
        label: '2'
      }],
      value: ''
    }
  }
}
</script>

<style>

</style>
