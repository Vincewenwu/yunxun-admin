<!--
	作者：7778428589@qq.com
	时间：2017-07-14
	描述：考勤签到列表 
-->
<template>
	<el-row>
  <el-col :span="24">
  	<div style="font-size: 16px;margin-top: 10px;">签到表 记录（{{total}}）</div> 
  </el-col>
  <el-col :span="24" class="border">  
	 <el-form :inline="true">
	 
	  <el-form-item label="所属院所">
     <el-select clearable @change="cboSchoolChange" v-model="schoolId"  filterable  placeholder="请选择院所">
        <el-option
        v-for="school in schools"
        :key="school.id"
        :label="school.name"
        :value="school.id"
        :schoolId="school.id">
       </el-option>
      </el-select>
    </el-form-item>
	 
	  <el-form-item v-show="cboClassDisabled" label="班级" class="blist">
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

   <el-form-item label="签到状态">
	    <el-select clearable v-model="signState" placeholder="请选择">
    <el-option
      v-for="item in signStates"
      :key="item.value"
      :label="item.label"
      :value="item.value">
    </el-option>
  </el-select>
	  </el-form-item>
	 
	 <el-form-item label="关键字" class="blist">
      <el-input placeholder="输入关键字搜索" v-model="vague"></el-input>
    </el-form-item> 
    
	  
	</el-form>
  </el-col>
  <el-col :span="24" class="border">  
  	<span class="wrapper">
  		<el-button type="info" class="el-icon-search" @click="sel"> 查询</el-button>
	    <el-button type="success" @click.native="signInRecordEdit" class="el-icon-plus">补考勤</el-button>
	    <el-button type="danger" class="el-icon-delete" @click.native="del"> 删除</el-button>
	    <el-button type="success" class="el-icon-upload2"> 导出</el-button> 
    </span>
  </el-col>
 <el-col :span="24" style="margin-top: 10px;">  
        <el-table
	    ref="multipleTable"
	    :data="dgvSingRecordData"
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
	      header-align="center"
	      align="center">
	    </el-table-column>
	    <el-table-column
        prop="headPortrait "
        label="头像"
        align="center"
        width="125">
          <template scope="scope">
              <img style="width: 80px;height: 80px;margin: 0px;" :src="imgService+scope.row.headPortrait" /> 
        </template>
      </el-table-column>
	    <el-table-column
	      prop="babyName"
	      label="学员姓名"
	      show-overflow-tooltip
	      header-align="center"
	      align="center">
	    </el-table-column>
	     <el-table-column 
	      prop="className"
	      label="班级"
	      show-overflow-tooltip
	      header-align="center"
	      align="center">
	    </el-table-column>
	    <el-table-column 
        prop="gradeName"
        label="年级"
        show-overflow-tooltip
        header-align="center"
        align="center">
      </el-table-column>
	     <el-table-column 
	      prop="signTime"
	      label="签到时间"
	      show-overflow-tooltip
	      header-align="center"
	      align="center">
	    </el-table-column>
	    <el-table-column
	      prop="recordType"
	      label="签到类型"
	      show-overflow-tooltip
	      header-align="center"
	      align="center">
	      <template scope="scope">
          <span v-if="scope.row.recordType=== 1">入校</span>
          <span v-else-if="scope.row.recordType=== 2">出校</span>
          <span v-else-if="scope.row.recordType=== 3">上车</span>
          <span v-else-if="scope.row.recordType=== 4">下车</span>
          <span v-else style="color: red">未知</span>
        </template>
	    </el-table-column>
	     <el-table-column
	      prop="signStatus"
	      label="签到状态"
	      show-overflow-tooltip
	      header-align="center"
	      align="center">
	      <template scope="scope">
          <span v-if="scope.row.signStatus=== 0" style="color: red">待签</span>
          <span v-else-if="scope.row.signStatus=== 1" style="color: green">已签</span>
          <span v-else-if="scope.row.signStatus=== 2" style="color: blue">补签</span>
          <span v-else-if="scope.row.signStatus=== 3" style="color: red">缺勤</span>
          <span v-else-if="scope.row.signStatus=== 4" style="color: red">请假</span>
          <span v-else style="color: red">待签</span>
        </template>
	    </el-table-column> 
	    <el-table-column
        prop="deleteFlag"
        label="删除标记"
        show-overflow-tooltip
        header-align="center"
        align="center">
      <template scope="scope">
          <span v-if="scope.row.deleteFlag=== 0">正常</span>
          <span v-else style="color: red">删除</span>
      </template>
      </el-table-column>
      <el-table-column
          fixed="right"
          label="操作"
          width="150"
          align="center">
          <template scope="scope">
            <el-button
              @click.native.prevent=""
              type="text">
            查看详情
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
      vague: '',
      schoolId: '',
      classId: '',
      schools: [],
      grades: [],
      cboClassDisabled: false,
      dgvSingRecordData: [], // dgv签到列表数据
      ids: '', // 宝贝id集合
      babyIds: '', // 宝贝id集合
      total: 0, // 总记录数
      page: 1, // 当前页码
      size: 10, // 每页大小
      pageSizes: [5, 10, 20, 30], // 每页大小下拉框
      signId: '', // 签到id
      signState: '', // 签到状态
      signStates: [{
        value: 0,
        label: '待签'
      }, {
        value: 1,
        label: '已签'
      }, {
        value: 2,
        label: '补签'
      }, {
        value: 3,
        label: '缺勤'
      }, {
        value: 4,
        label: '请假'
      }],
      value: ''
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
        classId: this.classId,
        signState: this.signState
      }
      let data = await http.post('/sign/findSign', params)
      if (data.data.success) {
        this.dgvSingRecordData = data.data.obj.list
        this.total = data.data.obj.total
      } else {
        this.message(data.data.msg)
        this.dgvSingRecordData = []
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
    // 绑定班级下拉框
    async getCboClassData () {
      let params = {
        schoolId: this.schoolId
      }
      let data = await http.post('/sign/findCboClassBySchoolId.do', params)
      if (data.data.success) {
        this.grades = data.data.obj
        this.cboClassDisabled = true // 启用班级下拉框
      } else {
        this.grades = []
        this.classId = ''
        this.cboClassDisabled = false // 禁用班级下拉框
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
    // 班级下拉框清空
    cboClassClear () {
      this.classId = ''
    },
    // 查询按钮点击事件
    sel () {
      this.getTableData()
    },
    // 删除签到记录
    del () {
      if (this.signId.length > 0) {
        this.flag = 2
        this.$confirm('确定要删除?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.toDel()
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消操作'
          })
        })
      } else {
        this.message('请选择要删除的签到宝贝')
      }
    },
    // 删除签到宝贝
    async toDel () {
      let params = {
        signId: this.signId
      }
      let data = await http.post('/sign/delSignById.do', params)
      if (data.data.success) {
        this.successResult()
      } else {
        this.message(data.data.msg)
      }
      this.getTableData()
    },
    // 更新签到列表
    async update () {
      let data = await http.post('/sign/gengxinQianDao.do')
      if (data.data.success) {
        this.rightTip('提示', data.data.msg, 'success')
      }
      this.getTableData()
    },
    // 行选中
    handleSelectionChange (val) {
      var strIds = []
      this.signId = ''
      val.forEach(row => {
        strIds.push(row.id)
      })
      if (strIds.length > 0) {
        this.signId = strIds.join(',')
      }
    },
    // 补考勤
    signInRecordEdit () {
      this.$router.push({path: '/signInRecordEdit'})
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
    },
    rightTip (title, msg, type) {
      this.$notify({
        title: title,
        message: msg,
        type: type
      })
    }
  },
  // 初始化方法
  mounted () {
    this.getCboSchoolData()
    this.getTableData()
    this.update()
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
