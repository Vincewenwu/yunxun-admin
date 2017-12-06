<!--
  作者：7778428589@qq.com
  时间：2017-07-14
  描述：考勤签到列表 
-->
<template>
  <el-row>
  <el-col :span="24">
    <div style="font-size: 16px;margin-top: 10px;">考勤统计 记录（{{total}}）</div> 
  </el-col>
  <el-col :span="24" class="border">  
   <el-form  :inline="true">
     <el-form-item  label="所属院所">
         <el-select @change="cboSchoolChange" v-model="schoolId" clearable filterable @clear="cboSchoolClear" placeholder="请选择院所">
            <el-option
            v-for="school in schools"
            :key="school.id"
            :label="school.name"
            :value="school.id">
           </el-option>
          </el-select>
        </el-form-item>
    <el-form-item  label="选择班级" class="blist">
     <el-select v-model="classId" clearable filterable @clear="cboClassClear" placeholder="请选择">
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
    <el-form-item label="时间范围">
    <el-date-picker
      v-model="timeSlot"
      :editable="false"
      type="daterange"
      align="right"
      placeholder="选择日期范围"
      :picker-options="pickerorderIds"
      @change="getTimeSlot">
    </el-date-picker>
    </el-form-item>
    <span class="wrapper">
      <el-button type="info"  @click="sel" class="el-icon-search"> 查询</el-button> 
       <el-button type="success"  class="el-icon-check"> 导出</el-button> 
    </span>
  </el-form>
  </el-col>
 <el-col :span="24" style="margin-top: 10px;">  
        <el-table
      v-loading="loading"
      element-loading-text="拼命加载中"
      :data="tableData"
      border>
    <el-table-column
      type="selection"
      width="55">
    </el-table-column>
    <el-table-column
      prop="babyName"
      label="学员"
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
      prop="schoolName"
      label="所属园所名称"
      align="center">
    </el-table-column>
     <el-table-column 
      prop="gradeName"
      label="年级"
      show-overflow-tooltip
      align="center">
    </el-table-column>
     <el-table-column 
      prop="className"
      label="班级"
      show-overflow-tooltip
      align="center">
    </el-table-column>
     <el-table-column 
      prop="signCount"
      label="签到次数"
      align="center"
      show-overflow-tooltip>
    </el-table-column>
       <el-table-column 
      prop="signDatas"
      label="签到天数"
      show-overflow-tooltip
      align="center">
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
      loading: false,
      schoolId: '',
      classId: '',
      schools: [],
      grades: [],
      tableData: [], // dgv签到列表数据
      total: 0, // 总记录数
      page: 1, // 当前页码
      size: 10, // 每页大小
      pageSizes: [5, 10, 20, 30], // 每页大小下拉框,
      endTime: '', // 结束时间
      starteTime: '', // 开始时间
      timeSlot: '', // 时间段
      pickerorderIds: {
        shortcuts: [{
          text: '最近一周',
          onClick (picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '最近一个月',
          onClick (picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '最近三个月',
          onClick (picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
            picker.$emit('pick', [start, end])
          }
        }]
      }
    }
  },
  methods: {
    // 异步加载统计记录
    async getTableData () {
      this.loading = true
      let params = {
        startPage: this.page,
        pageSize: this.size,
        schoolId: this.schoolId,
        classId: this.classId,
        endTime: this.endTime,
        starteTime: this.starteTime
      }
      let data = await http.post('/sign/kaoQinTongJi', params)
      if (data.data.success) {
        this.tableData = data.data.obj.list
        this.total = data.data.obj.total
      } else {
        this.message(data.data.msg)
        this.tableData = null
        this.total = 0
      }
      this.loading = false
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
      } else {
        this.grades = []
        this.classId = ''
        this.message('该园校还没有对应的班级')
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
    // 清空园校下拉框选择条件事件
    cboSchoolClear () {
      this.schoolId = ''
      this.classId = ''
      this.grades = []
    },
    // 清空班级下拉框
    cboClassClear () {
      this.classId = ''
    },
    // 查询按钮点击事件
    sel () {
      this.getTableData()
    },
    // 获取时间
    getTimeSlot (val) {
      var timeDuan = []
      timeDuan = val.split(' - ')
      if (timeDuan.length === 2) {
        this.endTime = timeDuan[1]
        this.starteTime = timeDuan[0]
      } else {
        this.endTime = ''
        this.starteTime = ''
      }
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
    border: 1px solid #eef6f6;
    border-radius: 5px;
    margin-top: 15px;
    padding: 15px 20px;
  }
  .blist{
    margin:0;
  }
</style>
