<template>
  <el-row>
  <el-col :span="24">
  	<div style="font-size: 16px;margin-top: 10px;">育儿列表 记录（）</div> 
  </el-col>
  <el-col :span="24" class="border">  
	 <el-form :inline="true" :model="formInline">
	  <el-form-item label="学院名称" class="blist">
	    <el-input v-model="shoolName" placeholder="可输入关键字筛选"></el-input>
	  </el-form-item>
	  <span class="wrapper">
      <el-button type="info" @click="onSubmit" class="el-icon-search"> 查询</el-button>
      <el-button type="success" @click.native="openadd" class="el-icon-plus"> 新增</el-button>
      <el-button type="danger" :plain="true" @click="delShoolinfo"  class="el-icon-delete"> 删除</el-button>
      <el-button type="success" :plain="true" @click="CheckTShoolinfo"  class="el-icon-check">下架</el-button>
    </span>
	</el-form>
  </el-col>
 <el-col :span="24" style="margin-top: 10px;">  
		  	<el-table
		  	v-loading="loading2"
		  	element-loading-text="拼命加载中"
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
		      prop="image"
		      label="Banner图"
		      >
		      <template scope="scope">
          <img :src="imgService + scope.row.image" style="width: 80px;height: 80px;border-radius: 50%;margin-top: 5px;" />
        </template>
		    </el-table-column>
		    <el-table-column
		      prop="shoolName"
		      label="所属园所"
		      >
		    </el-table-column>
		     <el-table-column
      label="所属标签"
      >
      <template scope="scope">
        <el-popover trigger="hover" placement="top">
           <p>{{ scope.row.lableName }}</p>
          <div slot="reference" class="name-wrapper">
            <el-tag>{{ scope.row.lableName }}</el-tag>
          </div>
        </el-popover>
      </template>
    </el-table-column>
      <el-table-column
      label="标题"
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
		      prop="serialNum"
		      label="排列"
		     >
		    </el-table-column>
		    <el-table-column
		      prop="createMam"
		      label="发布者"
		      >
		    </el-table-column>
		     <el-table-column
          prop="createTime"
          label="创建日期"
          >
        </el-table-column>
		    <el-table-column
		      prop="disableNo"
		      label="下架否"
		      :formatter="formatterCheck">
		    </el-table-column>
		    <el-table-column
		      prop="deleteFlag"
		      label="状态"
		      :formatter="formatstate">
		    </el-table-column>
			<el-table-column
			      fixed="right"
			      label="操作"
			      width="130">
			      <template scope="scope">
			      	<el-button
			          @click.native.prevent="deleteRow(scope.$index, tableData4)"
			          type="text"
			          size="small">
			          分享
			        </el-button>
			        <el-button
			          @click.native="editoppen(scope.row.id)"
			          type="text"
			          size="small">
			          编辑
			        </el-button>
			      </template>
			  </el-table-column>
		    
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
        formInline: {
          user: '',
          region: ''
        },
        tableData: [],
        sels: [],
        shoolName: '',
        total: 0,
        page: 1,
        size: 5,
        pageSizes: [1, 2, 3, 4, 5],
        loading2: true
      }
    },
    methods: {
      formattype: function (row, column) {
        if (row.infoType === 0) {
          return '公告'
        }
        if (row.infoType === 1) {
          return '咨询'
        }
        if (row.infoType === 2) {
          return '活动'
        }
        if (row.infoType === 3) {
          return 'Banner'
        }
      },
      formatterCheck: function (row, column) {
        if (row.disableNo === '0') {
          return '未下架'
        }
        if (row.disableNo === '1') {
          return '已下架'
        }
      },
      formatstate: function (row, column) {
        if (row.deleteFlag === '0') {
          return '未删除'
        } else {
          return '已删除'
        }
      },
// 条件查询
      async onSubmit () {
        let BaseParentingKnowledgeDTO = {
          name: this.shoolName,
          startPage: this.page,
          pageSise: this.size
        }
        let data = await http.post('/baby/findBaseParentingKnowledgeDTO', BaseParentingKnowledgeDTO)
        this.tableData = data.data.obj.baseParentingKnowledgelist
        this.total = data.data.obj.page.total
      },
// 删除
      async delShoolinfo () {
        var ids = this.sels.map(item => item.id).toString()
        let r = {ids: ids}
        let data = await http.post('/baby/delParentingKnowledge', r)
        this.$message({
          message: data.data.obj,
          type: 'warning'
        })
      },
// 下架
      async CheckTShoolinfo () {
        var ids = this.sels.map(item => item.id).toString()
        let r = {ids: ids}
        let data = await http.post('/baby/editParentingKnowledgedisableNo', r)
        this.$message({
          message: data.data.obj,
          type: 'warning'
        })
      },
      handleSelectionChange (sels) {
        this.sels = sels
      },
      deleteRow (index, rows) {
        rows.splice(index, 1)
      },
      openadd () {
        this.$router.push({ path: '/baseparentingknowledgeEdit', query: {id: '1'} })
      },
// 编辑
      editoppen (id) {
        this.$router.push({ path: '/baseparentingknowledgeEdit', query: {id: id} })
      },
// 条页
      handleCurrentChange (val) {
        this.page = val
        this.onSubmit()
      },
      handleSizeChange (val) {
        this.size = val
        this.onSubmit()
      },
      async getData () {
        this.loading2 = true
        let BaseParentingKnowledgeDTO = {
          name: this.shoolName,
          startPage: 1,
          pageSise: 5
        }
        let data = await http.post('/baby/findBaseParentingKnowledgeDTO', BaseParentingKnowledgeDTO)
        this.tableData = data.data.obj.baseParentingKnowledgelist
        this.total = data.data.obj.page.total
        this.loading2 = false
      }
    },
    mounted () {
      this.getData()
    }
  }

</script>

<style>
	.border{
		border: 1px solid #18c79c;
		border-radius: 5px;
		margin-top: 15px;
		padding: 15px 20px;
	}
	.blist{
		margin:0;
	}
</style>
