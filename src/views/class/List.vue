<template>
  <el-row>
  <el-col :span="24">
    <div style="font-size: 16px;margin-top: 10px;">班级列表 记录（{{total}}）</div> 
  </el-col>
  <el-col :span="24" class="border">  
   <el-form :inline="true">
    
    <el-form-item label="园校" class="blist">
      <el-select clearable filterable  v-model="cboSchoolId" placeholder="请选择园所">
      <el-option
      v-for="school in schools"
      :key="school.id"
      :label="school.name"
      :value="school.id">
     </el-option>
      </el-select>
    </el-form-item>
    
    <el-form-item label="年级" class="blist">
      <el-select clearable filterable  v-model="cboGradeId" placeholder="请选择园所">
      <el-option
      v-for="grade in grades"
      :key="grade.id"
      :label="grade.gradeName"
      :value="grade.id">
     </el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="模糊" class="blist">
      <el-input v-model="vague" placeholder="输入关键字搜索"></el-input>
    </el-form-item>
    <span class="wrapper">
      <el-button type="info" class="el-icon-search" @click="sel"> 查询</el-button>
      <el-button type="success" @click.native="add" class="el-icon-plus"> 新增</el-button>
      <el-button type="danger" class="el-icon-delete" @click="deleteClass"> 删除</el-button>
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
      @selection-change="handleSelectionChange">
      <el-table-column
         type="selection"
        width="55">
      </el-table-column>
      <el-table-column
        prop="className"
        label="班级名称">
      </el-table-column>
      <el-table-column
        prop="peopleNum"
        label="宝贝数">
      </el-table-column>
      <el-table-column
        prop="gradeName"
        label="所属年级">
      </el-table-column>
      <el-table-column
        prop="description"
        label="班级描述">
      </el-table-column>
      <el-table-column
        prop="teacherName"
        label="班主任">
      </el-table-column>
      <el-table-column
        prop="schoolName"
        label="所属园所">
      </el-table-column>
      <el-table-column
        prop="createTime"
        label="创建时间">
      </el-table-column>
      <el-table-column
        prop="deleteFlag"
        label="删除标记">
      <template scope="scope">
          <span v-if="scope.row.deleteFlag=== 0" style="color: green">正常</span>
          <span v-else style="color: red">删除</span>
      </template>
      </el-table-column>
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
        dgvData: [], // dgv公告数据
        total: 0, // 总记录数
        page: 1, // 当前页码
        size: 10, // 每页大小
        pageSizes: [5, 10, 20, 30], // 每页大小
        className: '', // 班级名称
        strIds: [], // 主键id数组
        loading: false,
        classIds: '', // 班级id
        schools: [], // 园校下拉框数据
        grades: [], // 年级下拉框数据
        cboGradeId: '', // 下拉框年级id
        cboSchoolId: '', // 下拉框学校id
        vague: '' // 模糊搜索
      }
    },
    methods: {
         // 异步加载班级信息
      async getdgvData () {
        this.loading = true
        let params = {
          startPage: this.page,
          pageSize: this.size,
          gradeId: this.cboGradeId,
          schoolId: this.cboSchoolId,
          vague: this.vague
        }
        let data = await http.post('/class/findClassByDynamic', params)
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
      // 添加
      add () {
        this.$router.push({ path: '/classEdit' })
      },
      // 删除班级
      deleteClass () {
        if (this.classIds.length > 0) {
          this.$confirm('确定要删除此班级?', '提示', {
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
          this.message('请选择要删除的班级')
        }
      },
      // 选中改变
      handleSelectionChange (val) {
        var strIds = []
        this.classIds = ''
        val.forEach(row => {
          strIds.push(row.id)
        })
        if (strIds.length > 0) {
          this.classIds = strIds.join(',')
        }
      },
      // 删除班级
      async del () {
        let params = {
          classIds: this.classIds
        }
        let data = await http.post('/class/delClassById.do', params)
        if (data.data.success) {
          this.successResult()
        } else {
          this.message(data.data.msg)
        }
        this.getdgvData()
        this.classIds = ''
      },
       // 编辑班级
      edit (id) {
        this.$router.push({path: '/classEdit', query: { classId: id, Type: 1 }})
      },
      // 刷新班级人数
      async refreshBabyNum () {
        let data = await http.post('/class/refreshBabyNum.do')
        if (!data.data.success) {
          this.message(data.data.msg)
        }
        this.getdgvData()
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
      // 绑定年级下拉框
      async getCboGradeData () {
        let data = await http.post('/class/findGrade.do')
        if (data.data.success) {
          this.grades = data.data.obj
        } else {
          this.grades = []
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
      }
    },
      // 初始化方法
    mounted () {
      this.refreshBabyNum()
      this.getCboSchoolData()
      this.getCboGradeData()
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
