<template>
  <el-row>
  <el-col :span="24">
    <div style="font-size: 16px;margin-top: 10px;">教师分班 记录（{{total}}）</div> 
  </el-col>
  <el-col :span="24" class="border">  
   <el-form :inline="true">
    
  <el-form-item label="查询类型">
     <el-select @change="ifShowCboClass" v-model="selType" >
       <el-option
      v-for="item in options"
      :key="item.value"
      :label="item.label"
      :value="item.value">
      </el-option>
    </el-select>
  </el-form-item>
    
    <el-form-item label="园校" class="blist">
      <el-select clearable filterable @clear="cboSchoolClear" @change="cboSchoolChange"  v-model="cboSchoolId" placeholder="请选择园所">
      <el-option
      v-for="school in schools"
      :key="school.id"
      :label="school.name"
      :value="school.id">
     </el-option>
      </el-select>
    </el-form-item>
    
     <el-form-item v-show="ShowCboClass"  label="班级" class="blist">
     <el-select v-model="cboClassId" clearable filterable placeholder="请选择">
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
    
    <el-form-item label="模糊" class="blist">
      <el-input v-model="vague" placeholder="输入关键字搜索"></el-input>
    </el-form-item>
    <span class="wrapper">
      <el-button type="info" class="el-icon-search" @click="sel"> 查询</el-button>
      <el-button  class="el-icon-edit" type="info" @click="fenban"> 分班</el-button>
      <el-button type="danger" icon="delete"  @click="remove">删除</el-button>
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
      >
      <el-table-column
         type="selection"
        width="55">
      </el-table-column>
      <el-table-column
        prop="headPortrait "
        label="头像"
        width="120">
          <template scope="scope">
              <img style="width: 80px;height: 80px;margin: 0px;" :src="imgService+scope.row.headPortrait" /> 
        </template>
      </el-table-column>
      <el-table-column
      label="姓名"
      align = "center">
      <template scope="scope">
        <el-popover trigger="hover" placement="top">
          <p>姓名: {{ scope.row.name }}</p>
          <p>性别: {{ scope.row.sex  == '0'?'男':'女 '}}</p>
          <p>地址: {{ scope.row.address}}</p>
          <p>电话: {{ scope.row.phoneNum}}</p>
          <p>签名: {{ scope.row.signature}}</p>
          <div slot="reference" class="name-wrapper">
            <el-tag>{{ scope.row.name }}</el-tag>
          </div>
        </el-popover>
      </template>
      </el-table-column>
      <el-table-column
        prop="className"
        label="班级"
        align = "center">
      </el-table-column>
      <el-table-column
        prop="gradeName"
        label="所属年级"
        align = "center">
      </el-table-column>
       <el-table-column
        prop="schoolName"
        label="所属学校"
        align = "center">
      </el-table-column>
      <el-table-column
        prop="deleteFlag"
        label="删除标记"
        align = "center">
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
              @click.native.prevent="toRemoveOne(scope.row.id, scope.row.memClassTeacherId, scope.row.schoolId)"
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
  <el-dialog
  title="分班"
  :visible.sync="dialogVisible"
  size="tiny">
  <el-select v-model="fenBanClassId" placeholder="请选择班级">
        <el-option
        v-for="cla in toClasses"
        :key="cla.id"
        :label="cla.className"
        :value="cla.id">
       </el-option>
  </el-select>
  <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="toFenBan">确 定</el-button>
  </span>
</el-dialog>
  </el-row>
</template>
<script>
  import http from '../../utils/http'
  export default {
    data () {
      return {
        dgvData: [], // dgv公告数据
        total: 0, // 总记录数
        page: 1, // 当前页码
        size: 10, // 每页大小
        pageSizes: [5, 10, 20, 30], // 每页大小
        vague: '', // 教师姓名
        schoolName: '', // 园校名称
        loading: false, // 加载
        ShowCboClass: false, // 查询    班级下拉框
        dialogVisible: false, // 分班
        selType: '2', // 查询类型
        cboClassId: '', // 班级下拉框班级id
        cboSchoolId: '', // 园校下拉框
        grades: [], // 年级班级下拉框集合
        schools: [], // 园校下拉框集合
        memClassTeacherIds: '', // 班级id
        fenBanClassId: '', // 把教师添加到的班级id
        teacherIds: '', // 教师id集合
        schoolIds: '', // 学校id （一个或多个）
        toClasses: [], // 弹窗分班下拉框
        row: 0, // 行数
        options: [{
          value: '0',
          label: '全部'
        }, {
          value: '1',
          label: '已分班'
        }, {
          value: '2',
          label: '未分班'
        }]
      }
    },
    methods: {
      // 异步加载班级信息
      async getdgvData () {
        this.loading = true
        let params = {
          startPage: this.page,
          pageSize: this.size,
          vague: this.vague,
          selType: this.selType,
          classId: this.cboClassId,
          schoolId: this.cboSchoolId
        }
        let data = await http.post('/class/findClassTeacher', params)
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
      // 查询按钮点击事件
      sel () {
        this.getdgvData()
      },
      async toFenBan () {
        let params = {
          fenBanClassId: this.fenBanClassId,
          teacherIds: this.teacherIds
        }
        let data = await http.post('/class/selTeachersToFenBan', params)
        if (data.data.success) {
          this.rightTip('教师分班成功')
          this.getdgvData()
          this.fenBanClassId = ''
        } else {
          this.message(data.data.msg)
        }
        this.dialogVisible = false
        this.getdgvData()
      },
      // 分班
      async fenban () {
        if (this.teacherIds !== '' && this.schoolIds !== '') {
          let params = {
            schoolIds: this.schoolIds
          }
          let data = await http.post('/class/findCboClassBySchoolId', params)
          if (data.data.success) {
            this.dialogVisible = true
            this.toClasses = data.data.obj
          } else {
            this.message(data.data.msg)
          }
        } else {
          this.message('请选择要分班的教师')
        }
      },
      // 选择查询条件
      ifShowCboClass (val) {
        this.cboClassId = ''
        if (val === '2') {
          this.ShowCboClass = false
        } else {
          this.ShowCboClass = true
        }
      },
      remove () {
        if (this.memClassTeacherIds.trim() !== '') {
          this.$confirm('确定要从班级移除教师, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.toRemove()
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消移除'
            })
          })
        } else {
          this.message('请选择已分班的教师进行移除')
        }
      },
      // 移除班级教师
      async toRemove () {
        let params = {
          memClassTeacherIds: this.memClassTeacherIds,
          schoolIds: this.schoolIds,
          teacherIds: this.teacherIds
        }
        let data = await http.post('/class/toRemoveTeacher', params)
        if (data.data.success) {
          if (data.data.obj.banzhuren > 0) {
            this.rightTip('移除教师成功，其中为班主任的有 ' + data.data.obj.banzhuren + '位')
          } else {
            this.rightTip('移除教师成功')
          }
        } else {
          this.message(data.data.msg)
        }
        this.getdgvData()
      },
      toRemoveOne (val1, val2, val3) {
        if (val1 !== '' && val2 !== '' && val3 !== '') {
          this.$confirm('确定要从班级移除教师, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.toRemoveOneTeacher(val1, val2, val3)
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消移除'
            })
          })
        } else {
          this.message('请选择已分班的教师进行移除')
        }
      },
      // 移除以为老师
      async toRemoveOneTeacher (val1, val2, val3) {
        let params = {
          teacherIds: val1,
          memClassTeacherIds: val2,
          schoolIds: val3
        }
        let data = await http.post('/class/toRemoveTeacher', params)
        if (data.data.success) {
          if (data.data.obj.banzhuren > 0) {
            this.rightTip('移除教师成功，其中为班主任的有 ' + data.data.obj.banzhuren + '位')
          } else {
            this.rightTip('移除教师成功')
          }
        } else {
          this.message(data.data.msg)
        }
        this.getdgvData()
      },
      // 选中改变
      handleSelectionChange (val) {
        var strIds = [] // 教师id
        var strSchoolIds = [] // 园校id
        var strMemClassTeacherIds = [] // 班级教师id
        this.row = 0 // 计算行数
        this.teacherIds = ''
        this.schoolIds = ''
        this.memClassTeacherIds = ''
        val.forEach(row => {
          strIds.push(row.id)
          strSchoolIds.push(row.schoolId)
          this.row += 1
          if (row.memClassTeacherId !== '') {
            strMemClassTeacherIds.push(row.memClassTeacherId)
          }
        })
        if (strIds.length > 0) {
          this.teacherIds = strIds.join(',')
          this.schoolIds = strSchoolIds.join(',')
        }
        if (strMemClassTeacherIds.length > 0 && strMemClassTeacherIds.length === this.row) {
          this.memClassTeacherIds = strMemClassTeacherIds.join(',')
        }
      },
      // 绑定园校下拉框
      async getCboSchoolData () {
        let data = await http.post('/school/getCboSchool.do')
        if (data.data.success) {
          this.schools = data.data.obj
        } else {
          this.schools = []
        }
      },
      // 园校下拉框选择事件 查询该园校的班级
      cboSchoolChange () {
        this.grades = []
        this.cboClassId = ''
        this.getCboClassData(this.cboSchoolId)
      },
      // 园校下拉框清空事件
      cboSchoolClear () {
        this.grades = []
        this.cboClassId = ''
        this.cboSchoolId = ''
      },
      // 绑定班级下拉框
      async getCboClassData (id) {
        let params = {
          schoolId: id
        }
        let data = await http.post('/class/findCboClassBySidAndGid.do', params)
        if (data.data.success) {
          this.grades = data.data.obj
        } else {
          this.grades = []
          this.cboClassId = ''
          this.message('该园校还没有对应的班级')
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
      rightTip (msg) {
        this.$notify.info({
          title: '消息',
          message: msg
        })
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
