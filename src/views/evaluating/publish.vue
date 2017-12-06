<template>
	<el-row>
	  <el-col :span="24">
      <el-form ref="form" :model="form" :rules="rules" :inline="true"  style="margin-top: 20px;">
       <el-form-item label="年级">
           <el-input  v-model="gradeName1" :span="4" :on-icon-click="openGradeInformation" icon="search" style="width:220px"></el-input>
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
	   <el-form-item label="babyId" v-show="false"   prop="id">
          <el-input :span="4" v-model="babyId" ></el-input>
      </el-form-item>
      <el-form-item label="id" v-show="false"  prop="id">
          <el-input :span="4" v-model="id" ></el-input>
      </el-form-item>
	    <el-form-item label="学期">
	    <el-select :disabled='teamDisable' v-model="babyTeamId"  @change="handTreamChange">
	      <el-option v-for="item in treams":key="item.id":label="item.team" :value="item.id"></el-option>
	    </el-select>
	    </el-form-item>
        <el-col :span="24" style="margin-top: 10px;"> 
   	    <el-table :data="tableData" v-loading ="loading" element-loading-text="玩命加载中"  border style="width: 100%"  @selection-change="handleSelectionChange">
			    <el-table-column prop="id" type="index" label="序号" width="80"></el-table-column>
			    <el-table-column prop="projectName" label="评测项目" sortable></el-table-column> 
			    <el-table-column prop="contentName" label="评测内容" show-overflow-tooltip></el-table-column>  
			    <el-table-column prop="standradName" label="评测标准" show-overflow-tooltip></el-table-column> 
			    </el-table-column> 
			    <el-table-column label="评价" prop="score">
			      <template scope="scope">
			        <el-radio-group v-model="scope.row.scoring" >
			            <el-radio v-for="item in scope.row.scoringRange.split(',')" :key="item"  :label="item" :value="item"></el-radio>
	            </el-radio-group>
            </template>
			    </el-table-column> 
        </el-table> 
         </el-col>    
      </el-form>
      </el-col>
       <el-col :span="24" style="text-align: right;margin-top: 10px;">
        <el-button type="primary" @click="submitForm('form')">保存</el-button>
        <el-button @click="returnList()">返回</el-button>
   	  </el-col>
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
	  	    <el-button type="info" @click="openGradeInformation" class="el-icon-search">查询</el-button>
	  	  </el-form>
	  	</el-col>
      <el-table :data="gridData" v-loading ="loading" element-loading-text="玩命加载中"  border style="width: 100%"  @row-dblclick="handledblclickChangeRow">
        <el-table-column property="id" type="index"></el-table-column>
        <el-table-column property="schoolName" label="所属园所" width="150"></el-table-column>
        <el-table-column property="gradeName" label="年级" width="200"></el-table-column>
        <el-table-column property="className" label="班级" width="200"></el-table-column>
        <el-table-column property="name" label="宝贝名称"></el-table-column>
      </el-table>
    </el-dialog>
	</el-row>
</template>

<script>
import http from '../../utils/http'
export default {
  data () {
    return {
      teamDisable: '',
      gradeName1: '',
      className1: '',
      schoolName1: '',
      babyName1: '',
      gradeName: '',
      className: '',
      schoolName: '',
      babyName: '',
      gridData: [],
      tableData: [],
      treams: [],
      babyTeamId: '',
      dialogTableVisible: false,
      gradeId: '',
      babyId: '',
      id: '',
      gradeDisable: '',
      rules: {
        babyTeamId: [
          { required: true, message: '请选择年份、学期', trigger: 'change' }
        ]
      }
    }
  },
  methods: {
    openGradeInformation () {
      let the = this
      this.dialogTableVisible = true
      let param = {
        gradeName: this.gradeName,
        babyName: this.babyName,
        className: this.className
      }
      http.post('evaluatingManage/findGradeAndClass', param).then(function (httpData) {
        the.gridData = httpData.data.obj
      })
    },
    handTreamChange () {
      let the = this
      let param = {
        babyTeamId: this.babyTeamId
      }
      http.post('evaluatingManage/findEvaluatingById', param).then(function (httpData) {
        the.gradeName1 = httpData.data.obj[0].gradeName
        the.schoolName1 = httpData.data.obj[0].schoolName
        the.babyName1 = httpData.data.obj[0].babyName
        the.className1 = httpData.data.obj[0].className
        the.babyTeamId = httpData.data.obj[0].team
        the.id = httpData.data.obj[0].id
        the.tableData = httpData.data.obj
      })
    },
    findEvaluatingByid () {
      let the = this
      if (the.$route.params.babyTeamId !== undefined && the.$route.params.babyTeamId !== null && the.$route.params.babyTeamId !== '') {
        let param = {
          babyTeamId: the.$route.params.babyTeamId
        }
        http.post('evaluatingManage/findEvaluatingById', param).then(function (httpData) {
          the.gradeName1 = httpData.data.obj[0].gradeName
          the.schoolName1 = httpData.data.obj[0].schoolName
          the.babyName1 = httpData.data.obj[0].babyName
          the.className1 = httpData.data.obj[0].className
          the.babyTeamId = httpData.data.obj[0].team
          the.id = httpData.data.obj[0].id
          the.tableData = httpData.data.obj
        })
      }
    },
    bindingData () {
      let the = this
      the.loading = true
      let param = {
        gradeName: this.gradeName1
      }
      http.post('evaluatingManage/findTeacherEvalContentInfo', param).then(function (httpData) {
        the.tableData = httpData.data.obj
        the.loading = false
      })
      // 新增时控件开启
      this.teamDisable = false
      // this.gradeDisable = false
      // 修改时控件关闭
      if (the.$route.params.id !== undefined && the.$route.params.id !== null && the.$route.params.id !== '') {
        this.teamDisable = true
        // this.gradeDisable = true
      }
    },
    handledblclickChangeRow (val) {
      this.gradeName1 = val.gradeName
      this.schoolName1 = val.schoolName
      this.className1 = val.className
      this.babyName1 = val.name
      this.babyId = val.id
      this.dialogTableVisible = false
      this.bindingData()
      let paramBabyId = {
        babyId: val.id
      }
      let the = this
      // 根据宝贝id查询宝贝学期表的学期
      http.post('evaluatingManage/findTreamByBabyId', paramBabyId).then(function (httpData) {
        the.treams = httpData.data.obj
      })
    },
    submitForm (formName) {
      let the = this
      // 验证
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let params = {}
          params.gradeName = this.gradeName1
          params.babyTeamId = this.babyTeamId
          params.babyId = this.babyId
          params.id = this.id
          params.score = this.score
          params.tableData = JSON.stringify(this.tableData)
          http.post('evaluatingManage/addEditTeacherEvaluating', params).then(function (data) {
            if (data.data.success === true) {
              the.$message({
                message: '保存成功',
                type: 'success'
              })
              if (the.$route.params.id !== undefined && the.$route.params.id !== null && the.$route.params.id !== '') {
                the.$router.push({ path: '/teacherEvlList' }) // 跳转到列表页面
              } else {
                the.$refs[formName].resetFields() // 重置
              }
            } else {
              the.$message.error('错了哦，保存失败')
            }
          })
        } else {
          return false
        }
      })
    },
    returnList () {
      this.$router.push({ path: '/teacherEvlList' })
    }
  },
  mounted () {
    this.findEvaluatingByid()
  }
}
</script>

<style>
	.el-input.is-disabled .el-input__inner {
    background-color: rgb(238, 246, 246);
    border-color: rgb(209, 229, 227);
    color: #bbb;
    cursor: not-allowed;
    width: 220px;
}
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
