<template>
  <el-row>
    <el-col :span="24">
      <el-form :inline="true"  style="margin-top: 20px;">
       <el-form-item label="宝贝">
        <el-input :disabled="true" v-model="babyName1"></el-input>
     </el-form-item> 
       <el-form-item label="所属园所">
        <el-input :disabled="true" v-model="schoolName1"></el-input>
     </el-form-item>
       <el-form-item label="年级">
           <el-input :disabled="true" v-model="gradeName1" style="width:220px"></el-input>
       </el-form-item>
     <el-form-item label="班级">
        <el-input :disabled="true" v-model="className1"></el-input>
     </el-form-item> 
     <el-form-item label="gradeId" v-show="false"  prop="gradeId">
          <el-input :span="4" v-model="gradeId" ></el-input>
      </el-form-item>
      <el-form-item label="babyTeamId" v-show="false"  prop="babyTeamId">
          <el-input :span="4" v-model="babyTeamId" ></el-input>
      </el-form-item>
       <el-form-item label="学期" >
          <el-input :disabled="true" :span="4" v-model="team" ></el-input>
      </el-form-item>
      <!--<el-form-item label="学期">
      <el-select v-model="babyTeamId"  @change="handTreamChange">
        <el-option v-for="item in treams":key="item.id":label="item.team" :value="item.id"></el-option>
      </el-select>
      </el-form-item>-->
        <el-col :span="24" style="margin-top: 10px;"> 
        <el-table :data="tableData" v-loading ="loading" element-loading-text="玩命加载中"  border style="width: 100%"  @selection-change="handleSelectionChange">
          <el-table-column prop="id" type="index" label="序号" width="80"></el-table-column>
          <el-table-column prop="projectName" label="项目" sortable></el-table-column> 
          <el-table-column prop="evalCrite" label="评测标准" width="400" show-overflow-tooltip></el-table-column> 
          <el-table-column prop="第2周" label="第2周" show-overflow-tooltip></el-table-column> 
          <el-table-column prop="第4周" label="第4周" show-overflow-tooltip></el-table-column> 
          <el-table-column prop="第6周" label="第6周" show-overflow-tooltip></el-table-column> 
          <el-table-column prop="第8周" label="第8周" show-overflow-tooltip></el-table-column> 
          <el-table-column prop="第10周" label="第10周" show-overflow-tooltip></el-table-column> 
          <el-table-column prop="第12周" label="第12周" show-overflow-tooltip></el-table-column> 
          <el-table-column prop="第14周" label="第14周" show-overflow-tooltip></el-table-column> 
          <el-table-column prop="第16周" label="第16周" show-overflow-tooltip></el-table-column> 
          <el-table-column prop="第18周" label="第18周" show-overflow-tooltip></el-table-column> 
          <el-table-column prop="第20周" label="第20周" show-overflow-tooltip></el-table-column> 
          </el-table-column> 
        </el-table> 
         </el-col> 
          <hr class="hr" />
         <div class="outer">
      <div class="head">
          <span>请爸爸妈妈说一说:</span>
         <!--<div>
           <button class="button-blue" @click="parentCommentsSave">修改一下</button>
         </div>-->
      </div>
      <hr class="hr" />
      <div style="color: #666;font-size: 16px;">
        <div class="pj">我这半年在家有<input disabled class="input" style="width: 50px;background-color: #Ffffff;" v-model="dayHome" />天，表现<input disabled v-model="behave" class="input"  style="width: 2rem;background-color: #Ffffff;"/>。</div>
        <div class="pj">最棒的方面是<input disabled v-model="bestWay"  class="input"  style="width: 66%;background-color: #Ffffff;"/>。</div>
        <div class="pj">最大的进步是<input disabled v-model="bestProgress"  class="input" style="width: 66%;background-color: #Ffffff;"/>。</div>
      </div>
    </div>
      </el-form>
      </el-col>
       <el-col :span="24" style="text-align: right;margin-top: 10px;">
        <el-button @click="returnList()">返回</el-button>
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
      tableData: [],
      treams: [],
      babyTeamId: '',
      gradeId: '',
      babyId: '',
      id: '',
      dayHome: '',
      bestWay: '',
      bestProgress: '',
      behave: ''
    }
  },
  methods: {
    findPanrentEvaluatingByBabyTeamId () {
      let the = this
      if (the.$route.params.babyTeamId !== undefined && the.$route.params.babyTeamId !== null && the.$route.params.babyTeamId !== '') {
        let param = {
          babyTeamId: the.$route.params.babyTeamId
        }
        http.post('evaluatingManage/findPanrentEvaluatingByBabyTeamId', param).then(function (httpData) {
          the.gradeName1 = httpData.data.obj[0].gradeName
          the.schoolName1 = httpData.data.obj[0].schoolName
          the.babyName1 = httpData.data.obj[0].babyName
          the.className1 = httpData.data.obj[0].className
          the.team = httpData.data.obj[0].team
          the.id = httpData.data.obj[0].id
          the.gradeId = httpData.data.obj[0].gradeId
          the.babyTeamId = httpData.data.obj[0].babyTeamId
          the.dayHome = httpData.data.obj[0].dayHome
          the.behave = httpData.data.obj[0].behave
          the.bestWay = httpData.data.obj[0].bestWay
          the.bestProgress = httpData.data.obj[0].bestProgress
          the.tableData = httpData.data.obj
          the.bindingData()
        })
      } else {
        this.bindingData()
      }
    },
    bindingData () {
      let the = this
      the.loading = true
      let params = {
        babyTeamId: this.babyTeamId
      }
      http.post('evaluatingManage/findParentEvalContent', params).then(function (httpData) {
        the.tableData = httpData.data.obj
        the.loading = false
      })
    },
    returnList () {
      this.$router.push({ path: '/parentEvlList' })
    }
  },
  mounted () {
    this.findPanrentEvaluatingByBabyTeamId()
  }
}
</script>

<style>
  .outer{
    margin-top: 0.32rem;
    padding:0.45rem 0.56rem;
    background-color: #FFFFFF;
  }
  .head{
    font-size: 16px;
    color: #666666;  
    display: flex;
    justify-content: space-between;
  }
  .hr{
    opacity: 0.3;
    margin: 0.27rem 0;
  }
  .fs{
    display: flex;
    align-items: center;
    margin-top: 0.34rem;
  }
  .fs-name{
    font-size: 16px;
    font-weight: bold;
    color: #666;
  }
  .input{
    margin-left: 10px;
    font-size: 16px;
    border: none;
    border-bottom: 1px solid #6E7176;
  }
  .pj{
    width: 100%;margin-top: 0.87rem;
  }
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
