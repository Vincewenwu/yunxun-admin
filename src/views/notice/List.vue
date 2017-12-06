<template>
  <el-row>
  <el-col :span="24">
  	<div style="font-size: 16px;margin-top: 10px;">公告列表 记录（{{total}}）</div> 
  </el-col>
  <el-col :span="24" class="border">  
	 <el-form :inline="true">

    <el-form-item label="园校" class="blist">
      <el-select clearable filterable v-model="cboSchoolId" placeholder="请选择园所">
      <el-option
      v-for="school in schools"
      :key="school.id"
      :label="school.name"
      :value="school.id">
     </el-option>
      </el-select>
    </el-form-item>
	  
	  
	  <el-form-item label="标题" class="blist">
      <el-input v-model="title" placeholder="请输入"></el-input>
    </el-form-item>
    <span class="wrapper">
      <el-button type="info" class="el-icon-search" @click="sel"> 查询</el-button>
      <el-button type="success" @click.native="add" class="el-icon-plus"> 新增</el-button>
      <el-button type="danger" class="el-icon-delete" @click.native.prevent="stop"> 下架</el-button>
      <el-button type="success" class="el-icon-check" @click.native.prevent="checkOk"> 审核通过</el-button>
      <el-button type="warning" class="el-icon-close" @click.native.prevent="checkNo"> 审核不通过</el-button>
    </span>
	</el-form>
  </el-col>
 <el-col :span="24" style="margin-top: 10px;">  
	  	<el-table
	  	v-loading="loading"
      element-loading-text="拼命加载中"
	    :data="tableData"
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
	      prop="title"
	      label="标题"
	      :show-overflow-tooltip =true>
	    </el-table-column>
	    <el-table-column
	      prop="content"
	      label="内容"
	      :show-overflow-tooltip =true
	      >
	    </el-table-column>
	    <el-table-column
        label="背景图">
        <template scope="scope">
              <img style="width: 100%;height: 80px;" :src="imgService+scope.row.coverImages" /> 
        </template> 
      </el-table-column>
	    <el-table-column
	      prop="rangeType"
	      label="推送范围">
	      <template scope="scope">
          <span v-if="scope.row.rangeType=== 0" style="color: blue">全平台</span>
          <span v-else-if="scope.row.rangeType=== 1" style="color: green">全园校</span>
          <span v-else-if="scope.row.rangeType=== 2" style="color: #20A0FF">会员组</span>
          <span v-else style="color: red">未知</span>
        </template>
	    </el-table-column>
	    <el-table-column
	      :formatter="formatCheckFlag"
	      prop="checkFlag"
	      label="审核状态">
	      <template scope="scope">
          <span v-if="scope.row.checkFlag=== 0" style="color: red">未审核</span>
          <span v-else-if="scope.row.checkFlag=== 1" style="color: green">已审核</span>
          <span v-else style="color: red">审核不通过</span>
        </template>
	    </el-table-column>
	    <el-table-column
	      prop="deleteFlag"
	      label="删除标记"
	      >
	    <template scope="scope">
          <span v-if="scope.row.deleteFlag=== 0">正常</span>
          <span v-else style="color: red">删除</span>
      </template>
	    </el-table-column>>
	  	<el-table-column
		      fixed="right"
		      label="操作"
		      width="150">
		      <template scope="scope">
		      	<el-button
		          @click.native.prevent="edit(scope.row.id)"
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
        tableData: [], // dgv公告数据
        total: 0, // 总记录数
        page: 1, // 当前页码
        size: 10, // 每页大小
        pageSizes: [5, 10, 20, 30], // 每页大小
        deleteFlag: '', // 删除 标记
        title: '', // 标题
        schoolInfoIds: '', // 主键ids
        strIds: [], // 主键id数组
        requestURL: '', // 请求地址
        flag: 0, // 1下架  2审核通过 3审核不通过
        loading: true, // 加载等待
        schools: [], // 园校下拉框数据
        cboSchoolId: '', // cbo园校id
        multipleSelection: []
      }
    },
    methods: {
      // 异步加载公告
      async gettableData () {
        let params = {
          startPage: this.page,
          pageSize: this.size,
          title: this.title,
          schoolId: this.cboSchoolId
        }
        let data = await http.post('/Inform/findAnnouncement', params)
        if (data.data.success) {
          this.tableData = data.data.obj.list
          this.total = data.data.obj.total
        } else {
          this.message(data.data.msg)
          this.tableData = []
          this.total = 0
        }
        this.loading = false
      },
      // 全选
      handleSelectionChange (row) {
        this.multipleSelection = row
      },
      // 查询按钮点击事件
      sel () {
        this.gettableData()
      },
      // 添加
      add () {
        this.$router.push({ path: '/noticeedit' })
      },
      // 下架公告
      stop () {
        if (this.schoolInfoIds.length > 0) {
          this.flag = 1
          this.$confirm('确定要下架此公告?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.delOrCheck()
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消操作'
            })
          })
        } else {
          this.message('请选择要下架的公告')
        }
      },
      // 审核通过
      checkOk () {
        if (this.schoolInfoIds.length > 0) {
          this.flag = 2
          this.$confirm('确定要审核通过?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.delOrCheck()
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消操作'
            })
          })
        } else {
          this.message('请选择要审核通过的公告')
        }
      },
      // 审核不通过
      checkNo () {
        if (this.schoolInfoIds.length > 0) {
          this.flag = 3
          this.$confirm('确定要审核不通过?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.delOrCheck()
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消操作'
            })
          })
        } else {
          this.message('请选择要审核不通过的公告')
        }
      },
      // 获取选中的行的主键id集合
      selectRow (row) {
        this.strIds = []
        this.schoolInfoIds = ''
        row.forEach(row => {
          this.strIds.push(row.id)
        })
        if (this.strIds.length > 0) {
          this.schoolInfoIds = this.strIds.join(',')
        }
      },
      // 下架\审核公告
      async delOrCheck () {
        let params = {
          flag: this.flag,
          schoolInfoIds: this.schoolInfoIds
        }
        let data = await http.post('/Inform/CheckAnnouncement.do', params)
        this.result = data.data.success
        if (this.result) {
          this.successResult()
        } else {
          this.message(data.data.msg)
        }
        this.gettableData()
      },
       // 编辑公告
      edit (id) {
        this.$router.push({path: '/noticeedit', query: { id: id }})
        // this.$router.push({path: '/schooledit?id=' + schoolId})
      },
      tableRowClassName (row, index) {
        return 'el-table-column1'
      },
      // 每页大小改变
      handleSizeChange (val) {
        this.size = val
        this.gettableData()
      },
      // 当前页码改变
      handleCurrentChange (val) {
        this.page = val
        this.gettableData()
      },
      // 格式化审核标记
      formatCheckFlag (row, column, cellValue) {
        if (row[column.property] === 0) {
          cellValue = '未审核'
        } else if (row[column.property] === 1) {
          cellValue = '已审核'
        } else if (row[column.property] === 2) {
          cellValue = '审核不通过'
        }
        return cellValue
      },
      // 绑定学校下拉框
      async getCboSchoolData () {
        let data = await http.post('/school/getCboSchool.do')
        if (data.data.obj.length > 0) {
          this.schools = data.data.obj
        } else {
          this.schools = []
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
      this.gettableData()
      this.getCboSchoolData()
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
  .el-table-column {
    color: #c9e5f5;
  }
  .el-table-column1 {
    color: red;
  }
</style>
