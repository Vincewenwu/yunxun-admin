<!--
	作者：7778428589@qq.com
	时间：2017-07-14
	描述：请假管理
-->
<template>
<el-row>
  <el-col :span="24">
  	<div style="font-size: 16px;margin-top: 10px;">请假记录 记录（{{total}}）</div> 
  </el-col>
  <el-col :span="24" class="border">  
	 <el-form :inline="true">
	  
	   <el-form-item label="所属院所">
     <el-select @change="cboSchoolChange" v-model="schoolId" clearable filterable @clear="cboSchoolClear" placeholder="请选择院所">
        <el-option
        v-for="school in schools"
        :key="school.id"
        :label="school.name"
        :value="school.id"
        :schoolId="school.id">
       </el-option>
      </el-select>
    </el-form-item> 
	 
    <el-form-item v-show="showCboClass" label="班级" class="blist">
    <el-select v-model="classId" clearable filterable @clear="cboClassClear" placeholder="请选择班级">
    <el-option-group
      v-for="grade in grades"
      :key="grade.id"
      :label="grade.gradeName">
      <el-option
        v-for="clas in grade.children"
        :key="clas.id"
        :label="clas.className"
        :value="clas.id">
      </el-option>
    </el-option-group>
   </el-select>
    </el-form-item> 
     
     <el-form-item label="关键字" class="blist">
      <el-input v-model="vague"  placeholder="输入关键字搜索"></el-input>
    </el-form-item> 
     
	</el-form>
  </el-col>
  <el-col :span="24" class="border">  
  	<span class="wrapper">
  		<el-button type="info" class="el-icon-search" @click="sel"> 查询</el-button>
	    <el-button type="danger" class="el-icon-delete"> 删除</el-button> 
	    <el-button type="warning" class="el-icon-upload2 "> 导出选中</el-button>
      <el-button type="warning" class="el-icon-upload2 "> 导出全部</el-button>
    </span>
  </el-col>
 <el-col :span="24" style="margin-top: 10px;"> 
   <el-table
	    ref="multipleTable"
	    :data="dgvBabyLeaveRecord"
	    border
	    tooltip-effect="dark"
	    style="width: 100%"
	    @selection-change="handleSelectionChange">
	    <el-table-column
	      type="selection"
	      width="55">
	    </el-table-column>
	    <el-table-column
	      prop="schoolName"
	      label="所属园所"
	      width="120">
	    </el-table-column>
	    <el-table-column
	      prop="name"
	      label="姓名"
	      show-overflow-tooltip>
	    </el-table-column>
	     <el-table-column 
	      prop="className"
	      label="班级"
	      show-overflow-tooltip>
	    </el-table-column>
	     <el-table-column 
	      prop="startTime"
	      label="请假开始日期"
	      show-overflow-tooltip>
	    </el-table-column>
	    <el-table-column 
	      prop="endTime"
	      label="结束日期"
	      show-overflow-tooltip>
	    </el-table-column> 
	      <el-table-column 
	      prop="createTime"
	      label="申请时间"
	      show-overflow-tooltip>
	    </el-table-column> 
	      <el-table-column 
	      prop="whenLong"
	      label="请假时长"
	      show-overflow-tooltip>
	    </el-table-column> 
	     <el-table-column 
	      prop="checkFlag"
	      label="审核状态"
	      show-overflow-tooltip>
	      <template scope="scope">
          <span v-if="scope.row.checkFlag=== 1" style="color: green">已审核</span>
          <span v-else style="color: red">未审核</span>
        </template>
	    </el-table-column> 
	    <el-table-column
        prop="deleteFlag"
        label="删除标记"
        show-overflow-tooltip>
      <template scope="scope">
          <span v-if="scope.row.deleteFlag=== 0">正常</span>
          <span v-else style="color: red">删除</span>
      </template>
      </el-table-column>
	      <el-table-column    label="状操作态" >
	      	<template scope="scope">
	       <el-button 
	       	size="small"
           @click.native="check(scope.row.id)" > 审核通过</el-button>
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
      vague: '',
      schoolId: '',
      classId: '',
      schools: [],
      grades: [],
      showCboClass: false,
      dgvBabyLeaveRecord: [], // dgv签到列表数据
      ids: '', // 宝贝id集合
      babyIds: '', // 宝贝id集合
      total: 0, // 总记录数
      page: 1, // 当前页码
      size: 10, // 每页大小
      pageSizes: [5, 10, 20, 30] // 每页大小下拉框
    }
  },
  methods: {
    // 异步加载签到记录
    async getTableData () {
      let params = {
        startPage: this.page,
        pageSize: this.size,
        schoolId: this.schoolId,
        vague: this.vague,
        classId: this.classId
      }
      let data = await http.post('/sign/findLeaveRecord', params)
      if (data.data.success) {
        this.dgvBabyLeaveRecord = data.data.obj.list
        this.total = data.data.obj.total
      } else {
        this.message(data.data.msg)
        this.dgvBabyLeaveRecord = []
        this.total = 0
      }
    },
    // 绑定学校下拉框
    async getCboSchoolData () {
      let data = await http.post('/school/getCboSchool.do')
      if (data.data.success) {
        this.schools = data.data.obj
      } else {
        this.schools = []
      }
    },
    // 园校下拉框选择事件 查询该园校的班级
    cboSchoolChange (id) {
      this.grades = []
      this.classId = ''
      if (id !== null) {
        this.schoolId = id
        this.getCboClassData()
      }
    },
    // 绑定班级下拉框
    async getCboClassData () {
      let params = {
        schoolId: this.schoolId
      }
      let data = await http.post('/sign/findCboClassBySchoolId.do', params)
      if (data.data.success) {
        this.grades = data.data.obj
        this.showCboClass = true // 启用下拉框
      } else {
        this.grades = []
        this.classId = ''
        this.showCboClass = false // 隐藏下拉框
      }
    },
    // 班级下拉框清空
    cboClassClear () {
      this.classId = ''
    },
    // 查询按钮点击事件
    sel () {
      this.getTableData()
    },
    // 审核请假
    async check (id) {
      let params = {
        id: id
      }
      let data = await http.post('/sign/checkLeaveRecord', params)
      this.result = data.data.success
      if (this.result) {
        this.successResult()
        this.getTableData()
      } else {
        this.failResult()
      }
    },
    // 全选
    handleSelectionChange (val) {
      this.multipleSelection = val
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
    this.getTableData()
    this.getCboSchoolData()
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
