<!--
	作者：wuying
	时间：2017-07-17
	描述：年级管理
-->
<template>
	<el-row>
  <el-col :span="24">
  	<div style="font-size: 16px;margin-top: 10px;">年级管理列表  记录（{{total}}）</div> 
  </el-col>
  <!--******************* 搜索输入的信息******************* -->
  <el-col :span="24" class="border">  
	 <el-form :inline="true" :model="formInline">
	  <el-form-item label="年级" class="blist">
	    <el-input v-model="gradeName" > 
	    </el-input>
	  </el-form-item>
	  <span class="wrapper">
  		<el-button type="info" @click="bindingData" class="el-icon-search"> 查询</el-button> 
  		<el-button type="success" @click.native="openAdd" class="el-icon-plus"> 新增</el-button>
	    <el-button type="danger" @click="deleteBathGrade" class="el-icon-delete"> 删除</el-button> 
    </span>
	</el-form>
  </el-col>
   <!--******************* 搜索输入的信息******************* -->
  
    <el-col :span="24" style="margin-top: 10px;"> 
   	<el-table :data="tableData" v-loading ="loading" element-loading-text="玩命加载中" :default-sort = "{prop: 'array'}" border style="width: 100%"  @selection-change="handleSelectionChange">
	   <el-table-column prop="id" type="selection" width="55"></el-table-column>
	   <el-table-column prop="gradeName" label="年级" ></el-table-column> 
	   <el-table-column label="操作" width="600">
	     <template scope="scope">
		   <el-button @click.native.prevent="openEdit(scope.row.id)" type="text" size="small" >编辑</el-button>
	       <el-button @click.native.prevent="deleteGrade(scope.row.id)" type="text" size="small">删除</el-button>
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
import http from '../../../utils/http'
export default {
  data () {
    return {
      gradeName: '',
      tableData: [],
      multipleSelection: [],
      gradeIds: '',
      total: 0, // 总记录数
      currentPage: 1, // 当前页码
      pageSize: 10, // 每页大小
      loading: false
    }
  },
  methods: {
    openAdd () {
      this.$router.push({ path: '/gradeEdit' })
    },
    // 打开修改、编辑页面
    openEdit (gradeId) {
      this.$router.push({name: 'grade', params: { id: gradeId }})
    },
    // 选择行数据删除，根据主键id
    deleteGrade (gradeId) {
      let the = this
      this.$confirm('确认删除该记录吗?', '提示', {
        type: 'warning'
      }).then(() => {
        let param = {
          id: gradeId
        }
        http.post('gradeManage/deleteGradeById', param).then(function (data) {
          if (data.data.success === true) {
            the.$message({
              message: '删除成功',
              type: 'success'
            })
            the.bindingData()
          } else {
            the.$message.error('错了哦，删除失败')
          }
        })
      }).catch(() => {})
    },
    // 选中列表中行事件，获取选中行id，以“-”拼接
    handleSelectionChange (val) {
      this.gradeIds = ''
      for (var i = 0; i < val.length; i++) {
        this.gradeIds = this.gradeIds + val[i].id + '-'
      }
      this.multipleSelection = val
    },
    // 批量删除
    deleteBathGrade () {
      let the = this
      if (this.gradeIds !== '' && this.gradeIds !== null) {
        this.$confirm('确认删除选中记录吗?', '提示', {
          type: 'warning'
        }).then(() => {
          let param = {
            ids: this.gradeIds
          }
          http.post('gradeManage/deleteBathGrade', param).then(function (data) {
            if (data.data.success === true) {
              the.$message({
                message: '删除成功',
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
    // 数据绑定
    bindingData () {
      let the = this
      the.loading = true
      let params = {
        currentPage: this.currentPage,
        pageSize: this.pageSize,
        gradeName: this.gradeName
      }
      http.post('gradeManage/findAllGrade', params).then(function (httpData) {
        the.tableData = httpData.data.obj.records
        the.total = httpData.data.obj.total
        the.loading = false
      })
    },
    // 选择当前页数大小触发方法
    handleSizeChange (val) {
      this.pageSize = val
      this.bindingData()
    },
    // 选中当前页触发方法
    handleCurrentChange (val) {
      this.currentPage = val
      this.bindingData()
    }
  },
  // 相当于加载事件
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
