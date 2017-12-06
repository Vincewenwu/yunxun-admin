<!--
	作者：wuying
	时间：2017-07-17
	描述：教师评测内容
-->
<template>
	<el-row>
  <el-col :span="24">
  	<div style="font-size: 16px;margin-top: 10px;">教师评测内容  记录（{{total}}）</div> 
  </el-col>
  <!--******************* 搜索输入的信息******************* -->
  <el-col :span="24" class="border">  
	 <el-form :inline="true" :model="formInline">
	  <el-form-item label="年级" class="blist">
	    <el-select v-model="gradeId" placeholder="请选择年级" @change="handGradeChange">
	      <el-option label="全部" value=""></el-option>
	      <el-option v-for="item in grades" :key="item.id" :label="item.gradeName" :value="item.id"></el-option>
	    </el-select>
	  </el-form-item>
	  <el-form-item label="学期">
      <el-select  v-model="team">
        <el-option label="全部" value=""></el-option>
        <el-option label="上学期" value="0"></el-option>
        <el-option label="下学期"  value="1"></el-option>
      </el-select>
      </el-form-item>
	   <el-form-item label="项目" class="blist">
	    <el-select v-model="evalProjectId" placeholder="请选择项目" @change="handProjectChange">
	      <el-option label="全部" value=""></el-option>
	      <el-option v-for="item in projectNames" :key="item.id" :label="item.projectName" :value="item.id"></el-option>
	    </el-select>
	  </el-form-item>
	  <el-form-item label="观测内容" class="blist">
	    <el-input  style="width: 20rem;" v-model="contentName" > 
	    </el-input>
	  </el-form-item>
	  <span class="wrapper">
  		<el-button type="info" @click="bindingData" class="el-icon-search"> 查询</el-button> 
  		<el-button type="success" @click.native="openAdd" class="el-icon-plus"> 新增</el-button>
	    <el-button type="danger" @click="deleteBathTeacherEvalContent" class="el-icon-delete"> 删除</el-button> 
      </span>
	</el-form>
  </el-col>
   <!--******************* 搜索输入的信息******************* -->
     <el-col :span="24" style="margin-top: 10px;"> 
   	 	<el-table :data="tableData" v-loading ="loading" element-loading-text="玩命加载中" :default-sort = "{prop: 'array'}" border style="width: 100%"  @selection-change="handleSelectionChange">
			    <el-table-column prop="id" type="selection" width="55"></el-table-column>
			    <el-table-column  prop="gradeName" label="年级" ></el-table-column>
			    <el-table-column  prop="strteam" label="学期" ></el-table-column>
			    <el-table-column  prop="projectName" label="项目" ></el-table-column>
			    <el-table-column  prop="contentName" label="观测内容" show-overflow-tooltip></el-table-column>
			    <el-table-column  prop="standradName" label="参考标准" show-overflow-tooltip></el-table-column>
			    <el-table-column  prop="scoringRange" label="得分范围" show-overflow-tooltip></el-table-column>
			    <el-table-column  label="操作">
			       <template scope="scope">
			       <el-button  @click.native.prevent="openEdit(scope.row.id)" type="text" size="small">编辑</el-button>
                   <el-button  @click.native.prevent="deleteTeacherEvalContent(scope.row.id)" type="text" size="small">删除</el-button>
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
      gradeId: '',
      evalProjectId: '',
      contentName: '',
      tableData: [],
      grades: [],
      projectNames: [],
      multipleSelection: [],
      teacherEvalContentIds: '',
      team: ''
    }
  },
  methods: {
    openAdd () {
      this.$router.push({ path: '/teacherEvalContentEdit' })
    },
     // 打开修改、编辑页面
    openEdit (teacherEvalContentId) {
      this.$router.push({name: 'teacherEvalContent', params: { id: teacherEvalContentId }})
    },
    // 选择行数据删除，根据主键id
    deleteTeacherEvalContent (teacherEvalContentId) {
      let the = this
      this.$confirm('确认删除该记录吗?', '提示', {
        type: 'warning'
      }).then(() => {
        let param = {
          id: teacherEvalContentId
        }
        http.post('teacherEvalContent/deleteBathTeacherEvalContent', param).then(function (data) {
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
      this.teacherEvalContentIds = ''
      for (var i = 0; i < val.length; i++) {
        this.teacherEvalContentIds = this.teacherEvalContentIds + val[i].id + '-'
      }
      this.multipleSelection = val
    },
    // 批量删除
    deleteBathTeacherEvalContent () {
      let the = this
      if (this.teacherEvalContentIds !== '' && this.teacherEvalContentIds !== null) {
        this.$confirm('确认删除选中记录吗?', '提示', {
          type: 'warning'
        }).then(() => {
          let param = {
            ids: this.teacherEvalContentIds
          }
          http.post('teacherEvalContent/deleteBathTeacherEvalContent', param).then(function (data) {
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
    // 绑定下拉框【年级、项目】
    bindingComboBox () {
      let the = this
      http.post('teacherEvalContent/findGradeAndPro').then(function (httpData) {
        the.grades = httpData.data.obj.grades
        the.projectNames = httpData.data.obj.projectNames
      })
    },
    handGradeChange (val) {
      this.bindingData()
    },
    handProjectChange (val) {
      this.bindingData()
    },
     // 数据绑定
    bindingData () {
      let the = this
      the.loading = true
      let params = {
        currentPage: this.currentPage,
        pageSize: this.pageSize,
        gradeId: this.gradeId,
        evalProjectId: this.evalProjectId,
        contentName: this.contentName,
        team: this.team
      }
      http.post('teacherEvalContent/findAllTeacherEvalContent', params).then(function (httpData) {
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
    this.bindingComboBox()
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
