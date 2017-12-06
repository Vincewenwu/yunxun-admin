<!--
	作者：wuying
	时间：2017-07-16
	描述：家长对宝贝在家评价 
-->
<template>
  <el-row>
  <el-col :span="24">
    <div style="font-size: 16px;margin-top: 10px;">宝贝在家评价  记录（{{total}}）</div> 
  </el-col>
  <!--******************* 搜索输入的信息******************* -->
  <el-col :span="24" class="border">  
   <el-form :inline="true" :model="formInline">
     <el-form-item label="年级">
           <el-input v-model="gradeName1" :span="4" :on-icon-click="openGradeInformation" icon="search" style="width:220px"></el-input>
       </el-form-item>
     <el-form-item label="所属园所">
        <el-input :disabled="true" v-model="schoolName1"></el-input>
     </el-form-item> 
     <el-form-item label="班级">
        <el-input :disabled="true" v-model="className1"></el-input>
     </el-form-item> 
     <el-form-item label="宝贝">
        <el-input :disabled="true" v-model="babyName1"></el-input>
     </el-form-item> 
      <el-form-item label="学期">
      <el-select v-model="babyTeamId">
        <el-option v-for="item in treams":key="item.id":label="item.team" :value="item.id"></el-option>
      </el-select>
      </el-form-item>
      <span class="wrapper">
      <el-button type="info" @click="bindingData" class="el-icon-search">查询</el-button>
      <el-button type="danger" @click="deleteBathParentEvaluating" class="el-icon-delete">删除</el-button>
     </span>
  </el-form>
    <el-dialog title="年级信息" :visible.sync="dialogTableVisible">
      <el-col :span="24" class="border">  
        <el-form :inline="true" :model="formInline">
          <el-form-item label="年级">
            <el-input placeholder="请输入年级" v-model="gradeName"></el-input>
          </el-form-item>
          <el-form-item label="班级">
            <el-input placeholder="请输入班级" v-model="className"></el-input>
          </el-form-item>
            <el-form-item label="宝贝">
            <el-input placeholder="请输入宝贝" v-model="babyName"></el-input>
          </el-form-item>
          <el-button type="info" @click.native="openGradeInformation" class="el-icon-search">查询</el-button>
        </el-form>
      </el-col>
      <el-table :data="gridData" v-loading ="loading" element-loading-text="玩命加载中"  border style="width: 100%"  @row-dblclick="handledblclickChangeRow">
        <!--<el-table-column property="id" type="index"></el-table-column>-->
        <el-table-column property="schoolName" label="所属园所" width="150"></el-table-column>
        <el-table-column property="gradeName" label="年级" width="200"></el-table-column>
        <el-table-column property="className" label="班级" width="200"></el-table-column>
        <el-table-column property="name" label="宝贝名称"></el-table-column>
      </el-table>
    </el-dialog>
  </el-col>
   <!--******************* 搜索输入的信息******************* -->
    <el-col :span="24" style="margin-top: 10px;"> 
    <el-table :data="tableData" v-loading ="loading" element-loading-text="玩命加载中" border style="width: 100%" :default-sort = "{prop: 'array'}" @selection-change="handleSelectionChange">
          <el-table-column prop="id" type="selection" width="55"></el-table-column>
          <el-table-column prop="babyName" label="宝贝" sortable> </el-table-column>
          <el-table-column prop="schoolName" label="所属园所" sortable> </el-table-column>
          <el-table-column prop="gradeName" label="年级" sortable></el-table-column>
          <el-table-column prop="className" label="班级" sortable></el-table-column>
          <el-table-column prop="team" label="学期" sortable></el-table-column>
          <el-table-column prop="starNum" label="总得星数" sortable></el-table-column>
          </el-table-column> 
          <el-table-column label="操作">
            <template scope="scope">
              <el-button @click.native.prevent="findEdit(scope.row.gradeId,scope.row.babyTeamId)" type="text" size="small" >详情查看</el-button>
                  <el-button @click.native.prevent="deleteParentEvaluating(scope.row.babyTeamId)" type="text" size="small">删除</el-button>
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
      gradeName1: '',
      className1: '',
      schoolName1: '',
      babyName1: '',
      tream: '',
      gradeName: '',
      className: '',
      schoolName: '',
      babyName: '',
      gridData: [],
      dialogTableVisible: false,
      tableData: [],
      multipleSelection: [],
      treams: [],
      babyTeamIds: '',
      babyTeamId: '',
      total: 0, // 总记录数
      currentPage: 1, // 当前页码
      pageSize: 10, // 每页大小
      loading: false
    }
  },
  methods: {
    handledblclickChangeRow (val) {
      this.gradeName1 = val.gradeName
      this.schoolName1 = val.schoolName
      this.className1 = val.className
      this.babyName1 = val.name
      this.babyId = val.id
      this.dialogTableVisible = false
      let paramBabyId = {
        babyId: val.id
      }
      let the = this
      // 根据宝贝id查询宝贝学期表的学期
      http.post('evaluatingManage/findTreamByBabyId', paramBabyId).then(function (httpData) {
        the.treams = httpData.data.obj
      })
    },
    // 打开修改、编辑页面
    findEdit (gradeId, babyTeamId) {
      this.$router.push({name: 'parentEvalCheck', params: { gradeId: gradeId, babyTeamId: babyTeamId }})
    },
     // 选择行数据删除，根据宝贝学期id
    deleteParentEvaluating (babyTeamId) {
      let the = this
      this.$confirm('确认删除该记录吗?', '提示', {
        type: 'warning'
      }).then(() => {
        let param = {
          babyTeamId: babyTeamId
        }
        http.post('evaluatingManage/deleteParentEvaluating', param).then(function (data) {
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
    // 选中列表中行事件，获取选中行宝贝学期id，以“-”拼接
    handleSelectionChange (val) {
      this.babyTeamIds = ''
      for (var i = 0; i < val.length; i++) {
        this.babyTeamIds = this.babyTeamIds + val[i].babyTeamId + '-'
      }
      this.multipleSelection = val
    },
    // 批量删除
    deleteBathParentEvaluating () {
      let the = this
      if (this.babyTeamIds !== '' && this.babyTeamIds !== null) {
        this.$confirm('确认删除选中记录吗?', '提示', {
          type: 'warning'
        }).then(() => {
          let param = {
            ids: this.babyTeamIds
          }
          http.post('evaluatingManage/deleteBathParentEvaluating', param).then(function (data) {
            alert(data.data.success)
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
        babyName1: this.babyName1,
        babyTeamId: this.babyTeamId
      }
      http.post('evaluatingManage/findAtHomeEvaluating', params).then(function (httpData) {
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

