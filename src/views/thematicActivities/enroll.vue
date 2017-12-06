<!--
	作者：7778428589@qq.com
	时间：2017-07-13
	描述：报名表管理列表 
-->
<template>
<el-row>
  <el-col :span="24">
  	<div style="font-size: 16px;margin-top: 10px;">报名表管理 记录（）</div> 
  </el-col>
  <!--******************* 搜索输入的信息******************* -->
  <el-col :span="24" class="border">  
	 <el-form :inline="true" :model="formInline">
	  <el-form-item label="姓名" class="blist">
	       <el-input size="small" style="width: 10rem;" v-model="name" placeholder="请输入内容"> 
	       	</el-input>
	  </el-form-item>
	  <el-form-item label="所属园所" class="blist">
	      <el-input size="small" style="width: 10rem;" v-model="schoolname" placeholder="请输入内容"> 
	      </el-input>
	  </el-form-item> 
	   <el-form-item label="所属园所" class="blist">
        <el-button type="info" @click.active="onSubmit" class="el-icon-search"> 查询</el-button> 
        </el-input>
    </el-form-item>
	        
	</el-form>
  </el-col>
   <el-col :span="24" style="margin-top: 10px;"> 
   	<el-table
      :data="tableData"
      border
      style="width: 100%"
      :default-sort = "{prop: 'array'}"
      @selection-change="handleSelectionChange"
      >
 <el-table-column
         type="selection"
        width="55">
      </el-table-column>
      <el-table-column
          prop="name"
          label="报名人"
         >
        </el-table-column>
      <el-table-column
        prop="serialNum"
        label="排序"
       >
      </el-table-column>   
      <el-table-column
      label="活动标题"
      >
      <template scope="scope">
        <el-popover trigger="hover" placement="top">
          <p>{{ scope.row.title }}</p>
          <div slot="reference" class="name-wrapper">
            <el-tag>{{ scope.row.title }}</el-tag>
          </div>
        </el-popover>
      </template>
    </el-table-column>   
      <el-table-column
        prop="coverImages"
        label="封面"
        >
          <template scope="scope">
          <img :src="imgService + scope.row.coverImages" style="width: 80px;height: 80px;border-radius: 50%;margin-top: 5px;" />
        </template>
      </el-table-column>
      <el-table-column
        prop="shoolName"
        label="所属院校"
         :formatter="formattype">
      </el-table-column>
      <el-table-column
        prop="createTime"
        label="创建日期"
        >
      </el-table-column>
      <el-table-column
        prop="deleteFlag"
        label="状态"
        :formatter="formatstate">
      </el-table-column>
    <!--<el-table-column
          fixed="right"
          label="操作"
          >
          <template scope="scope">
            <el-button
              @click.native.prevent="deleteRow(scope.$index, tableData4)"
              type="text"
              size="small">
              分享
            </el-button>
            <el-button
              @click.native.prevent="editoppen(scope.row.id)"
              type="text"
              size="small">
              编辑
            </el-button>
          </template>
      </el-table-column>-->
     </el-table> 
	</el-col>
  <el-col>
    <div class="block" style="float: right;margin-right: 10px;margin-top: 10px;">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="page"
        :page-sizes="pageSizes"
        :page-size="size"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total">
      </el-pagination>
    </div>
  </el-col>	
	</el-row> 
</template> 
<script>
import http from '../../utils/http'
export default {
  data () {
    return {
      value6: '',
      tableData: [],
      classvalue: '',
      sels: [],
      total: '',
      page: 1,
      size: 5,
      pageSizes: [1, 2, 3, 4, 5],
      schoolname: '',
      name: ''
    }
  },
  methods: {
    handleSelectionChange (sels) {
      this.sels = sels
    },
    formatstate: function (row, column) {
      if (row.deleteFlag === false) {
        return '未删除'
      } else {
        return '已删除'
      }
    },
// 条页
    handleSizeChange (val) {
      this.size = val
      this.onSubmit()
    },
    handleCurrentChange (val) {
      this.page = val
      this.onSubmit()
    },
// 条件查询
    async onSubmit () {
      let r = {
        name: this.name,
        startPage: this.page,
        pageSise: this.size,
        schooliId: '1',
        shoolName: this.schoolname
      }
      let data = await http.post('/banner/findMemApplyRecord', r)
      this.tableData = data.data.obj.memApplyRecord
      this.total = data.data.obj.page.total
    },
    async getData () {
      let r = {
        name: '',
        startPage: 1,
        pageSise: 5,
        shoolName: ''
      }
      let data = await http.post('/banner/findMemApplyRecord', r)
      this.tableData = data.data.obj.memApplyRecord
      this.total = data.data.obj.page.total
    }
  },
  mounted () {
    this.getData()
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
