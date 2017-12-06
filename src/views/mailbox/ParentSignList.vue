<template>
  <el-row>
  <el-col :span="24">
  	<div style="font-size: 16px;margin-top: 10px;">家长报名 记录（{{total}}）</div> 
  </el-col>
  <el-col :span="24" class="border">  
	 <el-form :inline="true">
	  <el-form-item label="姓名" class="blist">
	    <el-input v-model="name" placeholder="请输入"></el-input>
	  </el-form-item>
	  <span class="wrapper">
      <el-button type="info" class="el-icon-search" @click.native.prevent="sel"> 查询</el-button>
      <el-button type="danger" class="el-icon-delete" @click.native.prevent="del"> 删除</el-button>
      <el-button  class="el-icon-upload2"> 导出</el-button>
    </span>
	</el-form>
  </el-col>
 <el-col :span="24" style="margin-top: 10px;">  
	  	<el-table
	  	v-loading="loading"
	  	element-loading-text="拼命加载中"
	    :data="dgvData"
	    border
	    style="width: 100%"
	    :default-sort = "{prop: 'array'}"
	    @selection-change="handleSelectionChange"
      @select="selectRow"
	    >
	    <el-table-column
       	 type="selection"
	      width="55">
	    </el-table-column>
	     <el-table-column
	      prop="name"
	      label="姓名">
	    </el-table-column>
	      <el-table-column
        prop="phoneNum"
        label="手机号码">
      </el-table-column>
	    <el-table-column
	      prop="schoolName"
	      label="园校名称">
	    </el-table-column>
	    <el-table-column
	      prop="enterTime"
	      label="报名时间">
	    </el-table-column>
	    <el-table-column
        prop="deleteFlag"
        label="删除标记">
      <template scope="scope">
          <span v-if="scope.row.deleteFlag=== 0">正常</span>
          <span v-else style="color: red">删除</span>
      </template>
      </el-table-column>
		<el-table-column
		      fixed="right"
		      label="操作"
		      width="150">
		      <template scope="scope">
		      	<el-button
		          @click="message('测试按钮')"
		          type="text">
		          删除
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
        dgvData: [], // dgv数据
        total: 0, // 总记录数
        page: 1, // 当前页码
        size: 10, // 每页大小
        pageSizes: [5, 10, 20, 30], // 每页大小
        deleteFlag: '', // 删除 标记
        name: '', // 家长姓名
        loading: false, // 加载
        ids: '', // 主键集合
        multipleSelection: []
      }
    },
    methods: {
      // 异步加载预报名家长
      async getdgvData () {
        this.loading = true
        let params = {
          startPage: this.page,
          pageSize: this.size,
          name: this.name
        }
        let data = await http.post('/Inform/findSorecastRecord', params)
        if (data.data.success) {
          this.dgvData = data.data.obj.list
          this.total = data.data.obj.total
        } else {
          this.message(data.data.msg)
          this.dgvData = []
          this.total = 0
        }
        this.loading = false
      },
      // 删除预报名家长确认
      del () {
        if (this.ids.length > 0) {
          this.$confirm('确定要删除此报名信息?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.delSorecastRecord()
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消操作'
            })
          })
        } else {
          this.message('请选择要删除的预报名家长')
        }
      },
       // 删除预报名家长
      async delSorecastRecord () {
        let params = {
          ids: this.ids
        }
        let data = await http.post('/Inform/delSorecastRecord.do', params)
        this.result = data.data.success
        if (this.result) {
          this.successResult()
        } else {
          this.failResult()
        }
        this.getdgvData()
      },
       // 查询按钮点击事件
      sel () {
        this.getdgvData()
      },
      // 获取选中的行的主键id集合
      selectRow (row) {
        this.strIds = []
        this.ids = ''
        row.forEach(row => {
          this.strIds.push(row.id)
        })
        if (this.strIds.length > 0) {
          this.ids = this.strIds.join(',')
        }
      },
      // 每页大小改变
      handleSizeChange (val) {
        this.size = val
        this.getdgvData()
      },
      // 当前页码改变
      handleCurrentChange (val) {
        this.page = val
        this.getdgvData()
      },
      // 全选 选中的行的主键id集合
      handleSelectionChange (row) {
        this.strIds = []
        this.ids = ''
        row.forEach(row => {
          this.strIds.push(row.id)
        })
        if (this.strIds.length > 0) {
          this.ids = this.strIds.join(',')
        }
      },
      // 自定义消息
      message (msg) {
        this.$message(msg)
      },
      // 成功消息
      successResult () {
        this.$message({
          message: '操作成功',
          type: 'success'
        })
      },
      // 失败消息
      failResult () {
        this.$message({
          message: '操作失败',
          type: 'warning'
        })
      }
    },
        // 初始化方法
    mounted () {
      this.getdgvData()
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
