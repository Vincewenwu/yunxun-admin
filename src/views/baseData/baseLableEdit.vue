<template>
<el-form ref="form" :model="form" label-width="80px" style="width: 500px;margin-top: 20px;">
  <el-form-item label="标签名称">
    <el-input type="text" v-model="lableName"></el-input>
  </el-form-item>
  
    <el-form-item label="范围类型">
     <el-select v-model="lebleType" @change="chooseMedicine(value)" placeholder="请选择类型">
      <el-option
      v-for="item in options"
      :key="item.value"
      :label="item.label"
      :value="item.value">
    </el-option>
      </el-select>
  </el-form-item>
  <el-form-item label="所属院所">
     <el-select v-model="shoolvalue" placeholder="请选择院所">
        <el-option v-for="shool in shoollist" 
          @change=""
          :key="shool.id"
          :label="shool.name"
          :value="shool.id">
          {{shool.name}}
        </el-option>
      </el-select>
  </el-form-item>
<el-form-item>
    <el-button type="primary" v-loading="loading2"
    element-loading-text="拼命加载中" :plain="true" @click="submitForm('ruleForm2')">提交</el-button>
    <el-button @click="resetForm('ruleForm2')">重置</el-button>
</el-form-item>

</el-form>
</template>

<script>
  import http from '../../utils/http'
  export default {
    data () {
      return {
        options: [{
          value: '0',
          label: '育儿知识'
        }],
        lebleType: '',
        lableName: '',
        shoollist: [],
        shoolvalue: ''
      }
    },
    methods: {
      startTimec (val) {
        this.startTimechange = val // 上午签到截止时间
      },
      endTimec (val) {
        this.endTimechange = val // 上午签到截止时间
      },
// 初始化绑定数据
      async geteditData () {
        let r = {
          id: this.$router.currentRoute.query.id
        }
        let data2 = await http.post('/baseData/findOneBaseLableShool', r)
        this.lableName = data2.data.obj[0].lableName
        this.lebleType = data2.data.obj[0].lebleType + ''
        this.shoolvalue = data2.data.obj[0].schoolId + ''
      },
// 新增标签表
      async submitForm () {
        this.loading2 = true
        if (this.lableName.length < 1 || this.lebleType.length < 1 || this.shoolvalue.length < 1) {
          this.loading2 = false
          this.$message({
            message: '请填完整信息',
            type: 'success'
          })
        } else {
          let BaseLable = {
            lableName: this.lableName,
            lebleType: this.lebleType,
            schoolId: this.shoolvalue,
            ids: this.$router.currentRoute.query.id
          }
          if (this.$router.currentRoute.query.id !== '1') {
            let result = await http.post('/baseData/editbaseLable', BaseLable)
            this.$message({
              message: result.data.obj,
              type: 'success'
            })
            this.loading2 = false
            this.$router.push({ path: '/baseLable' })
          } else {
            let result = await http.post('/baseData/addbaseLable', BaseLable)
            this.$message({
              message: result.data.obj,
              type: 'success'
            })
            this.loading2 = false
            this.$router.push({ path: '/baseLable' })
          }
        }
      },
      async getData () {
        let data0 = await http.post('/school/getCboSchool')
        this.shoollist = data0.data.obj
      }
    },
    mounted () {
      this.getData()
      if (this.$router.currentRoute.query.id !== '1') {
        this.geteditData()
      }
    }
  }
</script>

<!--<style>
   .uploadimg div{
   	  width:300px;
   	  height:120px;
   }
</style>-->
<style>
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #20a0ff;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>
