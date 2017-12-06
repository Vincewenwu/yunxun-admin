<template>
  <el-row>
  <el-col :span="24">
  	<div style="font-size: 16px;margin-top: 10px;">套餐列表 记录（）</div> 
  </el-col>
  <el-col :span="24" class="border">  
	 <el-form :inline="true" :model="formInline">
	  <!--<el-form-item label="分组" class="blist">
	    <el-select v-model="formInline.region" placeholder="请选择">
	      <el-option label="区域一" value="shanghai"></el-option>
	      <el-option label="区域二" value="beijing"></el-option>
	    </el-select>
	  </el-form-item>-->
	  <el-form-item label="学院名称" class="blist">
	    <el-input v-model="name" placeholder="可输入关键字筛选"></el-input>
	  </el-form-item>
	  <span class="wrapper">
      <el-button type="info" @click="onSubmit" class="el-icon-search"> 查询</el-button>
      <el-button type="success" @click.native="openadd" class="el-icon-plus"> 新增</el-button>
      <el-button type="danger" :plain="true" @click="delShoolinfo"  class="el-icon-delete"> 删除</el-button>
      <el-button type="success" :plain="true" @click="CheckTShoolinfo"  class="el-icon-check"> 审核通过</el-button>
      <el-button type="warning" :plain="true" @click="CheckFShoolinfo"  class="el-icon-close"> 审核不通过</el-button>
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
		    <!--<el-table-column
		      prop="id"
		      label="id"
		      sortable
		      width="180">
		    </el-table-column>-->
		    <el-table-column
		      prop="name"
		      label="套餐名称"
		      >
		    </el-table-column>
		    <el-table-column
		      prop="price"
		      label="套餐价格"
		      >
		    </el-table-column>
		    <el-table-column
		      prop="startTime"
		      label="开始时间"
		      >
		    </el-table-column>
		    <el-table-column
		      prop="endTime"
		      label="结束时间"
		     >
		    </el-table-column>
		    <el-table-column
		      prop="whenLong"
		      label="时长"
		      >
		    </el-table-column>
		    <el-table-column
		      prop="discount"
		      label="折扣"
		      >
		    </el-table-column>
		    <el-table-column
		      prop="createMam"
		      label="创建人"
		      >
		    </el-table-column>
		    <el-table-column
		      prop="deleteFlag"
		      label="状态"
		       :formatter="formatstate">
		    </el-table-column>
			<el-table-column
			      fixed="right"
			      label="操作"
			      >
			      <template scope="scope">
			      	<!--<el-button
			          @click.native.prevent="deleteRow(scope.$index, tableData4)"
			          type="text"
			          size="small">
			          分享
			        </el-button>-->
			        <el-button
			          @click.native="editoppen(scope.row)"
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
        name: '',
        total: '',
        page: 1,
        size: 5,
        pageSizes: [1, 2, 3, 4, 5],
        loading2: true,
        date: new Date(),
        date1: new Date(),
        yourtime: ''
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
        if (row.checkFlag === 0) {
          return '未审核'
        }
        if (row.checkFlag === 1) {
          return '已审核'
        }
        if (row.checkFlag === 2) {
          return '审核不通过'
        }
      },
      formatstate: function (row, column) {
        if (row.deleteFlag === 0) {
          return '未删除'
        } else {
          return '已删除'
        }
      },
// 条件查询
      async onSubmit () {
        let BaseCombo = {
          name: this.name,
          startPage: this.page,
          pageSise: this.size
        }
        let data = await http.post('/baseData/findBaseCombopage', BaseCombo)
        this.tableData = data.data.obj.baseCombolist
        this.total = data.data.obj.page.total
      },
// 删除shoolinof
      async delShoolinfo () {
        var ids = this.sels.map(item => item.id).toString()
        let shoolinfoIDs = {ids: ids}
        let data = await http.post('/banner/', shoolinfoIDs)
        this.$message({
          message: data.data.obj,
          type: 'warning'
        })
      },
// 审核通过
      async CheckTShoolinfo () {
        var ids = this.sels.map(item => item.id).toString()
        let shoolinfoIDs = {
          ids: ids,
          sentype: 1
        }
        let data = await http.post('/banner/', shoolinfoIDs)
        this.$message({
          message: '审核成功' + data.data.obj,
          type: 'success'
        })
      },
// 审核不通过
      async CheckFShoolinfo () {
        var ids = this.sels.map(item => item.id).toString()
        let shoolinfoIDs = {
          ids: ids,
          sentype: 2
        }
        let data = await http.post('/banner/ediCheckFlag', shoolinfoIDs)
        this.$message.error('审核不成功' + data.data.obj)
      },
      handleSelectionChange (sels) {
        this.sels = sels
      },
      deleteRow (index, rows) {
        rows.splice(index, 1)
      },
      openadd () {
        this.$router.push({ path: '/basecomboEdit', query: {id: '1'} })
      },
// 编辑
      editoppen (row) {
        if ((new Date(row.startTime)).getDate() > (new Date()).getDate()) {
          this.$router.push({path: '/basecomboEdit', query: {id: row.id}})
        } else {
          this.$message({
            message: '期间不能修改',
            type: 'warning'
          })
        }
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
        let BaseCombo = {
          name: '',
          startPage: 1,
          pageSise: 5
        }
        let data = await http.post('/baseData/findBaseCombopage', BaseCombo)
        this.tableData = data.data.obj.baseCombolist
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
    border: 1px solid #eef6f6;
    border-radius: 5px;
    margin-top: 15px;
    padding: 15px 20px;
  }
  .blist{
    margin:0;
  }
</style>
