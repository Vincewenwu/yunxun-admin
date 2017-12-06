<template>
  <el-row>
  <el-col :span="24">
    <div style="font-size: 16px;margin-top: 10px;">宝贝分班 记录（{{total}}）</div> 
  </el-col>
  <el-col :span="24" class="border">  
   <el-form :inline="true">
    <el-form-item label="查询类型">
     <el-select @change="ifShowCboClass" v-model="selType" >
       <el-option
      v-for="item in selTypes"
      :key="item.value"
      :label="item.label"
      :value="item.value">
      </el-option>
     </el-select>
    </el-form-item>
    
    <el-form-item label="园校" class="blist">
      <el-select clearable filterable @change="cboSchoolChange"  v-model="cboSchoolId" placeholder="请选择园所">
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
          <p>学校: {{ scope.row.schoolName }}</p>
          <p>班级: {{ scope.row.className}}</p>
          <div slot="reference" class="name-wrapper">
            <el-tag>{{ scope.row.name }}</el-tag>
          </div>
        </el-popover>
      </template>
    </el-table-column>
      <el-table-column
        prop="schoolName"
        label="所属学校"
        align = "center">
      </el-table-column>
      <el-table-column
        prop="className"
        label="所属班级"
        align = "center">
      </el-table-column>
      <el-table-column
        prop="entranceTime"
        label="注册时间"
        align = "center">
      </el-table-column>
      <el-table-column
        prop="state"
        label="状态"
        align = "center">
      <template scope="scope">
          <span v-if="scope.row.state=== 0">正常</span>
          <span v-else-if="scope.row.state=== 1" style="color: red">未付费</span>
           <span v-else-if="scope.row.state=== 2" style="color: red">已过期</span>
          <span v-else style="color: red">未知</span>
      </template>
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
              @click.native="removeOne(scope.row.id)"
              size="small"
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
  <el-row>
    班级：
  <el-select v-model="fenBanClassId" placeholder="请选择班级">
    <el-option
    v-for="cla in toClasses"
    :key="cla.id"
    :label="cla.className"
    :value="cla.id">
   </el-option>
  </el-select>
  </el-row>
  <br />
  <el-row>
   学期：
  <el-select v-model="teamValue" placeholder="请选择">
    <el-option
      v-for="team in teams"
      :key="team.value"
      :label="team.label"
      :value="team.value">
    </el-option>
  </el-select>
  </el-row>
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
        grades: [], // 年级班级下拉框集合
        cboSchoolId: '', // 园校下拉框园校id
        cboClassId: '', // 班级下拉框
        ShowCboClass: false, // 是否显示班级下拉
        vague: '', // 模糊搜索
        total: 0, // 总记录数
        page: 1, // 当前页码
        size: 10, // 每页大小
        pageSizes: [5, 10, 20, 30], // 每页大小
        name: '', // 班级名称
        schoolName: '', // 园校名称
        loading: false, // 加载
        multipleSelection: [],
        dialogVisible: false, // 分班
        selType: '2', // 查询类型
        fenBanClassId: '', // 把学生添加到的班级id
        babyIds: '', // 宝贝id集合
        schoolIds: '', // 学校id （一个或多个）
        toClasses: [], // 弹窗分班下拉框
        selTypes: [{
          value: '0',
          label: '全部'
        }, {
          value: '1',
          label: '已分班'
        }, {
          value: '2',
          label: '未分班'
        }],
        teamValue: '',
        teams: [{
          value: '0',
          label: '上学期'
        }, {
          value: '1',
          label: '下学期'
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
          selType: this.selType,
          classId: this.cboClassId,
          schoolId: this.cboSchoolId,
          vague: this.vague
        }
        let data = await http.post('/class/findBabyToFenBan', params)
        if (data.data.success > 0) {
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
          babyIds: this.babyIds,
          teamValue: this.teamValue
        }
        let data = await http.post('/class/toFenBan', params)
        if (data.data.success) {
          this.rightTip('宝贝分班成功')
          this.getdgvData()
          this.fenBanClassId = ''
        } else {
          this.message(data.data.msg)
        }
        this.dialogVisible = false
      },
      // 分班
      async fenban () {
        if (this.babyIds !== '' && this.schoolIds !== '') {
          let params = {
            schoolIds: this.schoolIds
          }
          let data = await http.post('/class/findCboClassBySchoolId', params)
          if (data.data.success) {
            this.dialogVisible = true
            var nowMonth = new Date().getMonth() + 1
            if (parseInt(nowMonth) >= 8) {
              this.teamValue = '1'
            } else {
              this.teamValue = '0'
            }
            this.toClasses = data.data.obj
          } else {
            this.message(data.data.msg)
          }
        } else {
          this.message('请选择要分班的学生')
        }
      },
      // 移除班级宝贝确认
      remove () {
        if (this.babyIds !== '' && this.schoolIds !== '') {
          this.$confirm('确定要从班级移除宝贝, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.toRemove()
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消删除'
            })
          })
        } else {
          this.message('请选择要从班级移除的宝贝')
        }
      },
      // 移除一个宝贝
      removeOne (id) {
        this.babyIds = id
        if (this.babyIds !== '') {
          this.$confirm('确定要从班级移除该宝贝吗, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.toRemove()
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消删除'
            })
          })
        } else {
          this.message('请选择要从班级移除的宝贝')
        }
      },
      // 移除班级宝贝
      async toRemove () {
        let params = {
          babyIds: this.babyIds
        }
        let data = await http.post('/class/toRemoveBaby', params)
        if (data.data.success) {
          if (data.data.obj.fail > 0 && data.data.obj.success >= 0) {
            this.tip1('移除了 ' + data.data.obj.success + ' 位宝贝   ' + '以下  ' + data.data.obj.fail + ' 位宝贝还没分班,无法进行移除        宝贝列表：' + data.data.obj.noClass)
          } else if (data.data.obj.fail === 0) {
            this.rightTip('移除了 ' + data.data.obj.success + ' 位宝贝')
          }
        } else {
          this.message(data.data.msg)
        }
        this.getdgvData()
      },
      // 选择查询条件
      ifShowCboClass (val) {
        this.cboClassId = ''
        this.selType = val
        if (val === '0' || val === '1') {
          this.ShowCboClass = true
        } else {
          this.ShowCboClass = false
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
      cboSchoolChange (id) {
        this.grades = []
        this.cboClassId = ''
        if (id !== null) {
          this.getCboClassData(id)
        }
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
      // 选中改变
      handleSelectionChange (val) {
        var strIds = []
        var strSchoolIds = []
        this.babyIds = ''
        this.schoolIds = ''
        val.forEach(row => {
          strIds.push(row.id)
          strSchoolIds.push(row.schoolId)
        })
        if (strIds.length > 0) {
          this.babyIds = strIds.join(',')
          this.schoolIds = strSchoolIds.join(',')
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
      tip1 (msg) {
        this.$notify({
          title: '警告',
          message: msg,
          type: 'warning'
        })
      },
      rightTip (msg) {
        this.$notify.info({
          title: '消息',
          message: msg
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
