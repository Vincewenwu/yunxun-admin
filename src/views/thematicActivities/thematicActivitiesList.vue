<!--
	作者：7778428589@qq.com
	时间：2017-07-13
	描述：主题活动管理列表
-->
<template>
	<el-row>
  <el-col :span="24">
  	<div style="font-size: 16px;margin-top: 10px;">活动管理 记录（）</div> 
  </el-col>
  <!--******************* 搜索输入的信息******************* -->
  <el-col :span="24" class="border">  
	 <el-form :inline="true" :model="formInline">
	  <el-form-item label="日期" class="blist">
	    <el-date-picker
				      v-model="value6"
				      type="daterange"
				      placeholder="选择日期范围">
		</el-date-picker>
	  </el-form-item>
	  <el-form-item label="所属园所" class="blist">
	      <el-input size="small" style="width: 10rem;" v-model="school" placeholder="请输入内容"> 
	      </el-input>
	  </el-form-item> 
	  <span class="wrapper">
      <el-button type="info" class="el-icon-search"> 查询</el-button> 
      <el-button type="success" class="el-icon-check"> 发布</el-button>
      <el-button type="danger" class="el-icon-delete"> 删除</el-button> 
    </span>
	</el-form>
  </el-col>
  <!--******************* 搜索输入的信息******************* -->
   <el-col :span="24" style="margin-top: 10px;"> 
   	<el-table
			    ref="multipleTable"
			    :data="tableData3"
			    border
			    tooltip-effect="dark"
			    style="width: 100%"
			    @selection-change="handleSelectionChange">
			    <el-table-column
			      type="selection"
			      width="55">
			    </el-table-column>
			    <el-table-column 
			      prop="sort"
			      label="排序"
			      width="80">
			     
			    </el-table-column>
			    <el-table-column
			      prop="name"
			      label="活动标题"
			      width="120">
			    </el-table-column>
			    <el-table-column 
			      label="封面"
			      show-overflow-tooltip>
			      <template scope="scope">
			      	<img style="width: 80px;height: 80px;" :src="scope.row.eimage" /> 
			      </template> 
			    </el-table-column>
			     <el-table-column 
			      prop="cshcool"
			      label="所属园所"
			      show-overflow-tooltip>
			    </el-table-column> 
			     <el-table-column 
			      prop="introduce"
			      label="活动描述"
			      show-overflow-tooltip>
			    </el-table-column>  
			    <el-table-column 
			      prop="time"
			      label="活动时间"
			      show-overflow-tooltip>
			    </el-table-column>
			     <el-table-column 
			      prop="jstatic"
			      label="状态"
			      show-overflow-tooltip>
			    </el-table-column> 
			     </el-table-column> 
			      <el-table-column    label="操作" >
			      	<template scope="scope">
			       <el-button 
			       	size="small"
                   @click="handleEdit(scope.$index, scope.row)" >编辑</el-button>
                   <el-button 
			       	size="small"
                   @click="handleEdit(scope.$index, scope.row)" >详细</el-button>
                  </template>
			    </el-table-column> 
              </el-table> 
   </el-col>
   <el-col>
  	<div class="block" style="float: right;margin-right: 10px;margin-top: 10px;">
	    <el-pagination
	      @size-change="handleSizeChange"
	      @current-change="handleCurrentChange"
	      :current-page="currentPage4"
	      :page-sizes="[10, 20, 40, 60]"
	      :page-size="100"
	      layout="total, sizes, prev, pager, next, jumper"
	      :total="100">
	    </el-pagination>
	  </div>
  </el-col>
</el-row> 
</template> 

<script>
export default {
  data () {
    return {
      value6: '',
      classvalue: '',
      tableData3: []
    }
  },
  methods: {
    handleSelectionChange (val) {
      this.multipleSelection = val
    }
  }
}
</script>

<style>
	 .border{
    border: 1px solid #eef6f6;
    border-radius: 5px;
    margin-top: 15px;
    padding: 15px 20px;
  }
  .blist{
    margin:0;
  }
</style>
