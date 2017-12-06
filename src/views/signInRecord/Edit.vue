<!--
	作者：7778428589@qq.com
	时间：2017-07-14
	描述：补考勤
-->
<template>
	<div>
		<div  style="border: 1px solid #18C79D; margin: 0px 10px;  padding: 10px;">
			<span>补考勤</span>
		</div>
		<div style="border: 1px solid #18C79D; border-top:none; margin: 0px 10px;  padding: 10px;">
			<el-form  label-width="80px" >

    <el-form-item label="所属院所">
     <el-select @change="cboSchoolChange" v-model="schoolId"  filterable  placeholder="请选择院所">
        <el-option
        v-for="school in schools"
        :key="school.id"
        :label="school.name"
        :value="school.id"
        :schoolId="school.id">
       </el-option>
      </el-select>
    </el-form-item>
    
    <el-form-item  label="选择班级" class="blist">
     <el-select v-model="classId" clearable filterable @clear="cboClassClear" @change="cboClassChange" placeholder="请选择">
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
     
      <el-form-item label="签到类型">
        <el-radio-group v-model="signType">
          <el-radio :label="1">入校</el-radio>
          <el-radio :label="2">出校</el-radio>
          <el-radio :label="3">上车</el-radio>
          <el-radio :label="4">下车</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="签到状态">
        <el-radio-group v-model="signState">
          <el-radio :label="2">补签</el-radio>
          <el-radio :label="4">请假</el-radio>
        </el-radio-group>
      </el-form-item>
      
       <el-form-item label="选择宝贝">
        <el-transfer
        :titles="title"
        @change="babyChange"
        filterable
        filter-placeholder="请输入城市拼音"
        v-model="babyIds"
        :data="babyData">
        </el-transfer>
      </el-form-item>
      
    <el-row>
      <el-form-item>
      <el-button type="primary" v-show="loading" @click="buKaoQin">确定保存</el-button>
      <el-button type="primary" v-show="!loading" :loading="!loading">保存中...</el-button>
      <el-button type="primary" @click="cancel">取消</el-button>
       </el-form-item>
    </el-row>
			</el-form>
		</div> 
	</div>
</template>

<script>
    import http from '../../utils/http'
    export default {
      data () {
        return {
          babyData: [], // 穿梭框宝贝数据
          schoolId: '', // 园校id
          classId: '', // 班级id
          schools: [], // 学校集合
          grades: [], // 年级集合
          title: ['未选宝贝', '已选宝贝'],
          babyIds: [], // 宝贝id集合
          babyId: '', // 宝贝id集合
          signType: 1, // 签到类型
          signState: 2, // 签到状态
          loading: true
        }
      },
      methods: {
        getChangeVal () {
          console.log()
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
        // 园校下拉框选择事件 查询该园校的班级
        cboSchoolChange (id) {
          this.grades = []
          this.classId = ''
          if (id !== null) {
            this.schoolId = id
            this.getCboClassData()
          }
          this.getNoSignBaby()
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
        // 绑定穿梭框宝贝数据
        async getNoSignBaby () {
          let params = {
            schoolId: this.schoolId,
            classId: this.classId
          }
          let data = await http.post('/sign/findNoSignBaby.do', params)
          this.babyData = []
          if (data.data.success) {
            for (var i = 0; i < data.data.obj.list.length; i++) {
              this.babyData.push({
                label: data.data.obj.list[i].babyName,
                key: data.data.obj.list[i].babyId
              })
            }
          } else {
            this.message(data.data.msg)
            this.babyData = []
          }
        },
        // 补考勤
        async buKaoQin () {
          this.loading = false
          let params = {
            babyId: this.babyId,
            signType: this.signType,
            signState: this.signState
          }
          let data = await http.post('/sign/buKaoQin.do', params)
          if (data.data.success) {
            this.message('保存成功')
            this.babyId = ''
            this.signType = 1
            this.signState = 2
            this.loading = true
            this.$router.push({ path: '/signInRecordList' })
          } else {
            this.message(data.data.msg)
            this.loading = true
          }
        },
        // 取消
        cancel () {
          this.$router.push({ path: '/signInRecordList' })
        },
        // 班级下拉框清空事件
        cboClassClear () {
          this.classId = ''
          this.getNoSignBaby()
        },
        // 班级下拉框选择事件
        cboClassChange (val) {
          this.classId = val
          this.getNoSignBaby()
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
        // 选择补签宝贝
        babyChange (val) {
          if (val.length > 0) {
            this.babyId = val.join(',')
          }
        }
      },
      // 初始化方法
      mounted () {
        this.getCboSchoolData()
      }
    }
</script>
