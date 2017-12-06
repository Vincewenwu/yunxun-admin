<template>
  <el-row>
  <el-col>
  	<div style="font-size: 16px;margin-top: 10px;">职务列表 记录（{{total}}）</div> 
  </el-col>
<el-col style="margin-top: 15px;padding-right: 5px;">	
  </el-col>
  <el-col class="border"> 
  <el-col class="border">  
	 <el-form :inline="true">
	  
	  <el-form-item label="所属园所" class="blist">
      <el-select clearable v-model="cboSchoolId" placeholder="请选择园所">
      <el-option
      v-for="school in schools"
      :key="school.id"
      :label="school.name"
      :value="school.id">
     </el-option>
      </el-select>
    </el-form-item>
	 
	 <el-form-item label="模糊搜索" class="blist">
	    <el-input v-model="vague" placeholder="请输入"></el-input>
	  </el-form-item>
	  <span class="wrapper">
      <el-button type="info"  @click="sel" class="el-icon-search"> 查询</el-button>
      <el-button type="success" @click="showAdd" class="el-icon-plus"> 新增</el-button>
      <el-button type="danger" @click="delTip" class="el-icon-delete"> 删除</el-button>
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
	    >
	    <el-table-column
       	 type="selection"
	      width="55">
	    </el-table-column>
	    <el-table-column
	      prop="dutiesName"
	      label="职务名称">
	    </el-table-column>
	    <el-table-column
	      prop="schoolName"
	      label="所属学校">
	    </el-table-column>
	    <el-table-column
	      prop="description"
	      label="描述">
	    </el-table-column>
	    <el-table-column
	      prop="deleteFlag2"
	      label="删除标记"
	      :formatter="formatDeleteFlag">
	    </el-table-column>
		<el-table-column
		      fixed="right"
		      label="操作"
		      width="150">
		      <template scope="scope">
		        <el-button
		          @click.native="findById(scope.row.id,scope.row.schoolId)"
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
  </el-col>
  <el-dialog title="职务" size="tiny" :visible.sync="showDialog">
  <el-form ref="form" label-width="80px">
    <el-form-item label="职务名称" >
      <el-input v-model="dutiesName"></el-input>
    </el-form-item>
    <el-form-item label="职务描述" >
      <el-input v-model="description"></el-input>
    </el-form-item>
    <el-form-item label="所属学校" >
     <el-select   filterable clearable  v-model="schoolId" placeholder="请选择园所">
     <el-option
      v-for="school in schools"
      :key="school.id"
      :label="school.name"
      :value="school.id">
     </el-option>
     </el-select>
    </el-form-item>
  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="showDialog = false">取 消</el-button>
    <el-button type="primary" v-show="!isEdit" @click="add">确定新增</el-button>
     <el-button type="primary" v-show="isEdit" @click="edit">确定修改</el-button>
  </div>
</el-dialog>
  </el-row>
</template>
<script>
  import http from '../../utils/http'
  export default {
    data () {
      return {
        tableData: [], // table数据
        total: 0, // 总记录数
        page: 1, // 当前页码
        size: 10, // 每页大小
        pageSizes: [5, 10, 20, 30], // 每页大小
        vague: '', // 模糊查询参数
        showDialog: false, // 新增职务窗口
        loading: false, // 加载事件
        schools: [], // 学校下拉框
        schoolId: '', // 学校id
        cboSchoolId: '', // 查询页面园校下拉框园校id
        dutiesName: '', // 职务姓名
        description: '', // 描述
        isEdit: false,
        isAdd: true,
        dutiesId: ''
      }
    },
    methods: {
      // 查询
      sel () {
        this.getTableData()
      },
      // 异步加载教师数据
      async getTableData () {
        this.loading = true
        let params = {
          startPage: this.page,
          pageSize: this.size,
          vague: this.vague,
          schoolId: this.cboSchoolId
        }
        let data = await http.post('/duties/findDutiesByVague', params)
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
      // 异步加载下拉框数据
      async getcboSchoolData () {
        let data = await http.post('/school/getCboSchool')
        if (data.data.success) {
          this.schools = data.data.obj
        } else {
          this.message(data.data.msg)
          this.schools = []
        }
        this.loading = false
      },
      // 添加职务
      async add () {
        let params = {
          dutiesName: this.dutiesName,
          description: this.description,
          schoolId: this.schoolId
        }
        let data = await http.post('/duties/addDuities', params)
        if (data.data.success) {
          this.successResult()
          this.getTableData()
          this.schoolId = ''
          this.dutiesName = ''
          this.description = ''
          this.showDialog = false
        } else {
          this.message(data.data.msg)
        }
      },
      // 修改职务
      async edit () {
        let params = {
          dutiesName: this.dutiesName,
          description: this.description,
          schoolId: this.schoolId,
          dutiesId: this.dutiesId
        }
        let data = await http.post('/duties/editDuties', params)
        if (data.data.success) {
          this.successResult()
          this.getTableData()
          this.schoolId = ''
          this.dutiesName = ''
          this.description = ''
          this.showDialog = false
        } else {
          this.message(data.data.msg)
        }
      },
      async findById (dutiesId, schoolId) {
        this.isAdd = false
        this.isEdit = true
        let params = {
          dutiesId: dutiesId,
          schoolId: schoolId
        }
        let data = await http.post('/duties/findDuitiesById', params)
        if (data.data.success) {
          this.schoolId = data.data.obj[0].schoolId
          this.dutiesName = data.data.obj[0].dutiesName
          this.description = data.data.obj[0].description
          this.showDialog = true
          this.dutiesId = dutiesId
        } else {
          this.message(data.data.msg)
        }
      },
      // 获取选中的行的主键id集合
      handleSelectionChange (val) {
        var strIds = []
        var strSchoolIds = []
        val.forEach(row => {
          strIds.push(row.id)
          strSchoolIds.push(row.schoolId)
        })
        if (strIds.length > 0) {
          this.dutiesId = strIds.join(',')
          this.schoolId = strSchoolIds.join(',')
        }
      },
      // 下架公告
      delTip () {
        if (this.dutiesId.length > 0) {
          this.$confirm('确定要删除此职务?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.del()
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消操作'
            })
          })
        } else {
          this.message('请选择要删除此职务')
        }
      },
      // 删除
      async del () {
        let params = {
          dutiesId: this.dutiesId,
          schoolId: this.schoolId
        }
        let data = await http.post('/duties/delDuties.do', params)
        this.result = data.data.success
        if (this.result) {
          this.message(data.data.msg)
          this.getTableData()
          this.schoolId = ''
          this.dutiesId = ''
        } else {
          this.message(data.data.msg)
        }
        this.gettableData()
      },
      // 显示新增职务页面
      showAdd () {
        this.showDialog = true
        this.isAdd = true
        this.isEdit = false
      },
      // 每页大小改变
      handleSizeChange (val) {
        this.size = val
        this.getTableData()
      },
      // 当前页码改变
      handleCurrentChange (val) {
        this.page = val
        this.getTableData()
      },
      // 格式化删除标记
      formatDeleteFlag (row, column, cellValue) {
        if (row[column.property] === 0) {
          cellValue = '正常'
        }
        if (row[column.property] === 1) {
          cellValue = '删除'
        }
        return cellValue
      },
      message (msg) {
        this.$message(msg)
      },
      successResult () {
        this.$message({
          message: '操作成功',
          type: 'success'
        })
      },
      failResult () {
        this.$message({
          message: '操作失败',
          type: 'warning'
        })
      },
      handleClose (done) {
        this.$confirm('确认关闭？')
        .then(_ => {
          done()
        }).catch(_ => {})
      }
    },
    // 初始化方法
    mounted () {
      this.getTableData()
      this.getcboSchoolData()
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
	.group{
		border: 1px solid #18c79c;
	}
	.group .el-card__body{
		padding: 0;
	}
	.group .el-card__header{
		padding: 10px 20px;
		border-bottom: 1px solid #18c79c;
	}
	.group .el-card__body .el-tree{
		border:none
	}
	.clearfix .el-button-group{/*修改分组button width*/
		width: 100%;
	}
	.clearfix .el-button-group button{/*修改分组button 圆角 为 直角*/
		border-radius: 0;
	}
</style>
