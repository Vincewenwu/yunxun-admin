<template>
<el-row>
  <el-col :span="24" class="border">  
	 <el-form :inline="true">
	  <el-form-item label="菜单名称" class="blist">
	    <el-input v-model="moduleName" placeholder="请输入菜单名称"></el-input>
	  </el-form-item>
	  <el-form-item label="菜单类型" class="blist">
	    <el-select v-model="moduleType" placeholder="请选择菜单类型" @change="handModuleChange">
	      <el-option label="全部" value="0"></el-option>
	      <el-option label="模块" value="1"></el-option>
	      <el-option label="页面" value="2"></el-option>
	      <el-option label="按钮" value="3"></el-option>
	    </el-select>
	  </el-form-item>
	  <span class="wrapper">
      <el-button type="info" @click="bindingData" class="el-icon-search">查询</el-button>
      <el-button type="success" @click="openAdd" class="el-icon-plus">新增</el-button>
      <el-button type="danger" @click="deleteBathModule" class="el-icon-delete">删除</el-button>
    </span>
	</el-form>
  </el-col>
 <el-col :span="24" style="margin-top: 10px;">  
	  	<el-table :data="tableData" v-loading ="loading" element-loading-text="玩命加载中" border style="width: 100%" :default-sort = "{prop: 'array'}" @selection-change="handleSelectionChange">
	    <el-table-column prop="id" type="selection" ></el-table-column>
	    <el-table-column prop="name" label="菜单名称" sortable></el-table-column>
	    <el-table-column prop="moduleType" label="菜单类型" sortable></el-table-column>
	    <el-table-column prop="url" label="菜单链接" sortable></el-table-column>
	    <el-table-column prop="farName" label="父菜单" sortable></el-table-column>
	    <el-table-column prop="status" label="状态" sortable></el-table-column>
		<el-table-column fixed="right" label="操作">
	      <template scope="scope">
	      	<el-button @click.native.prevent="openEdit(scope.row.id)" type="text" size="small" >编辑</el-button>
	        <el-button @click.native.prevent="deleteModule(scope.row.id)" type="text" size="small">删除</el-button>
	      </template>
		 </el-table-column>
	  </el-table>
  </el-col>
  <el-col>
  	<div class="block" style="float: right;margin-right: 10px;margin-top: 10px;">
	    <el-pagination
	      @size-change="handleSizeChange"
	      @current-change="handleCurrentChange"
	      :current-page="currentPage"
	      :page-sizes="[10, 20, 30, 40]"
	      :page-size="pageSize"
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
      moduleName: '',
      moduleType: '0',
      tableData: [],
      multipleSelection: [],
      moduleIds: '',
      currentPage: 1,
      pageSize: 10,
      total: 0,
      loading: false
    }
  },
  methods: {
    handleSelectionChange (val) {
      this.moduleIds = ''
      for (var i = 0; i < val.length; i++) {
        this.moduleIds = this.moduleIds + val[i].id + '-'
      }
      this.multipleSelection = val
    },
    handleSizeChange (val) {
      this.pageSize = val
      this.bindingData()
    },
    handleCurrentChange (val) {
      this.currentPage = val
      this.bindingData()
    },
    handModuleChange (val) {
      this.bindingData()
    },
    deleteRow (index, rows) {
      rows.splice(index, 1)
    },
    openAdd () {
      this.$router.push({ path: '/moduleEdit' })
    },
    openEdit (moduleId) {
      this.$router.push({name: 'module', params: { id: moduleId }})
    },
    deleteModule (moduleId) {
      let the = this
      this.$confirm('确认删除该记录吗?', '提示', {
        type: 'warning'
      }).then(() => {
        let param = {
          id: moduleId
        }
        http.post('sysModule/deleteSysModularById', param).then(function (data) {
          if (data.data.success === true) {
            the.$message({
              message: '太帅了，删除成功',
              type: 'success'
            })
            the.bindingData()
          } else {
            the.$message.error('错了哦，删除失败')
          }
        })
      }).catch(() => {})
    },
    deleteBathModule () {
      let the = this
      if (this.moduleIds !== '' && this.moduleIds !== null) {
        this.$confirm('确认删除选中记录吗?', '提示', {
          type: 'warning'
        }).then(() => {
          let param = {
            ids: this.moduleIds
          }
          http.post('sysModule/deleteBathSysModularById', param).then(function (data) {
            if (data.data.success === true) {
              the.$message({
                message: '太帅了，删除成功',
                type: 'success'
              })
              the.bindingData()
            } else {
              the.$message.error('错了哦，删除失败')
            }
          })
        }).catch(() => {})
      } else {
        this.$message({
          message: '警告哦，请先选择需要删除的数据',
          type: 'warning'
        })
      }
    },
    bindingData () {
      let the = this
      the.loading = true
      let params = {
        currentPage: this.currentPage,
        pageSize: this.pageSize,
        moduleName: this.moduleName,
        moduleType: this.moduleType
      }
      http.post('/sysModule/findAllSysModule', params).then(function (httpData) {
        the.tableData = httpData.data.obj.records
        the.total = httpData.data.obj.total
        the.loading = false
      })
    }
  },
  mounted () {
    this.bindingData()
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
