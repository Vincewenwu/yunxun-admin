<template>
<el-form ref="form" :model="form" v-loading="loading2"
    element-loading-text="拼命加载中" label-width="80px" style="width: 500px;margin-top: 20px;">
  <el-form-item label="套餐名称">
    <el-input type="text" v-model="name"></el-input>
  </el-form-item>
  <el-form-item label="套餐价格">
      <el-input-number v-model="price" @change="handleChange" :min="1" ></el-input-number>

  </el-form-item>
  
     <el-form-item label="开始时间" >
    <el-col :span="11" style="width: 100%;">
      <el-date-picker type="date" placeholder="选择日期" @change="startTimec" v-model="startTime" style="width: 100%;"></el-date-picker>
    </el-col>
  </el-form-item>
  
       <el-form-item label="结束时间" >
    <el-col :span="11" style="width: 100%;">
      <el-date-picker type="date" placeholder="选择日期" @change="endTimec" v-model="endTime" style="width: 100%;"></el-date-picker>
    </el-col>
  </el-form-item>
  
   <el-form-item label="套餐时长">
    <el-input-number v-model="whenLong" @change="handleChange" :min="1" ></el-input-number>
  </el-form-item>
  
  <el-form-item label="折扣">
   <el-input-number v-model="discount" @change="handleChange" :min="1" :max="10"></el-input-number>
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
    <el-button type="primary"  :plain="true" @click="submitForm('ruleForm2')">提交</el-button>
    <el-button @click="resetForm('ruleForm2')">重置</el-button>
</el-form-item>

</el-form>
</template>

<script>
  import http from '../../utils/http'
  export default {
    data () {
      return {
        name: '',
        whenLong: '',
        discount: '',
        price: '',
        startTime: '',
        endTime: '',
        startTimechange: '',
        endTimechange: '',
        shoollist: [],
        shoolvalue: '',
        logman: '',
        updateMan: '',
        createMam: '',
        loading2: false
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
        let data2 = await http.post('/baseData/findOneBaseCombo', r)
        console.log(data2.data.obj)
        this.name = data2.data.obj[0].name
        this.whenLong = data2.data.obj[0].whenLong
        this.discount = data2.data.obj[0].discount
        this.price = data2.data.obj[0].price
        this.startTime = data2.data.obj[0].startTime
        this.endTime = data2.data.obj[0].endTime
        this.shoolvalue = data2.data.obj[0].shoolID + ''
      },
// 新增套餐表
      async submitForm () {
        this.loading2 = true
        if (this.whenLong.length !== '' && this.name.length > 0 && this.discount.length !== '' && this.price.length !== '' && this.startTimechange.length > 0 && this.endTimechange.length > 0 && this.shoolvalue.length > 0) {
          let BaseCombo = {
            name: this.name,
            whenLong: this.whenLong,
            discount: this.discount,
            price: this.price,
            kaishi: this.startTime = this.startTimechange,
            jieshu: this.endTime = this.endTimechange,
            shoolID: this.shoolvalue,
            ids: this.$router.currentRoute.query.id
          }
          if (this.$router.currentRoute.query.id !== '1') {
            let result = await http.post('/baseData/editBaseCombo', BaseCombo)
            this.$message({
              message: result.data.obj,
              type: 'success'
            })
            this.$router.push({ path: '/basecombo' })
            this.loading2 = false
          } else {
            let result = await http.post('/baseData/addBaseCombo', BaseCombo)
            this.$message({
              message: result.data.obj,
              type: 'success'
            })
            this.loading2 = false
            this.name = ''
            this.whenLong = ''
            this.discount = ''
            this.price = ''
            this.startTime = this.startTimechange = ''
            this.endTime = this.endTimechange = ''
            this.shoolvalue = ''
            this.$router.push({ path: '/basecomboEdit', query: {id: '1'} })
          }
        } else {
          this.$message({
            message: '请填完整数据',
            type: 'success'
          })
          this.loading2 = false
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
