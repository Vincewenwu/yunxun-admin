<template>
	<el-row>
	  <el-col :span="12">
       <el-form ref="form" :rules="rules" :model="form" label-width="140px" style="margin-top: 20px;">
        <el-form-item label="id" v-show="false" prop="id">
          <el-input :span="4" v-model="form.id" ></el-input>
        </el-form-item>
        <el-form-item label="名称" prop="name" required>
           <el-input :span="4" v-model="form.name" placeholder="请输入名称"></el-input>
        </el-form-item>
        <el-form-item label="链接" prop="url" required>
           <el-input :span="4" v-model="form.url" placeholder="请输入链接"></el-input>
        </el-form-item>
        <el-form-item label="类型" prop="muneType" required>
	      <el-radio-group v-model="form.muneType" @change="changeMenuTpye">
	        <el-radio label="1">模块</el-radio>
	        <el-radio label="2">页面</el-radio>
	        <el-radio label="3">按钮</el-radio>
	      </el-radio-group>
	    </el-form-item>
	    <el-form-item v-show="typeShow" prop="fatherId" label="模块" >
	      <el-select v-model="form.fatherId" clearable placeholder="请选择模块" @change="changeModular">
	        <el-option v-for='item in farData' :label="item.name" :value="item.id" :key="item.id"></el-option>
	      </el-select>
	    </el-form-item>
	    <el-form-item v-show="pageShow" prop="pageFatherId" label="页面" >
        <el-select v-model="form.pageFatherId" clearable placeholder="请选择页面">
          <el-option v-for='item in pageFarData' :label="item.name" :value="item.id" :key="item.id"></el-option>
        </el-select>
      </el-form-item>
	    <el-form-item>
	      <el-button type="primary" @click="submitForm('form')">保存</el-button>
        <el-button @click="returnList()">返回</el-button>
	    </el-form-item>
       </el-form>
     </el-col>
	</el-row>
</template>

<script>
import http from '../../utils/http'
export default {
  data () {
    return {
      typeShow: false,
      form: {
        id: '',
        url: '',
        name: '',
        fatherId: '',
        muneType: '1',
        pageFatherId: ''
      },
      rules: {
        name: [
          { required: true, message: '请输入名称', trigger: 'blur' }
        ],
        url: [
          { required: true, message: '请输入链接', trigger: 'blur' }
        ]
      },
      farData: [],
      pageFarData: [],
      pageShow: false
    }
  },
  methods: {
    submitForm (formName) {
      let the = this
      this.$refs[formName].validate((valid) => {
        if (valid) {
          http.post('sysModule/addEditSysModular', this.form).then(function (data) {
            if (data.data.success === true) {
              the.$message({
                message: '太帅了，保存成功',
                type: 'success'
              })
              if (the.$route.params.id !== undefined && the.$route.params.id !== null && the.$route.params.id !== '') {
                the.$router.push({ path: '/moduleList' })
              } else {
                the.$refs[formName].resetFields()
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
    changeMenuTpye (value) {
      if (value === '1') {
        this.form.fatherId = ''
        this.form.pageFatherId = ''
        this.typeShow = false
        this.pageShow = false
      } else if (value === '2') {
        this.form.pageFatherId = ''
        this.typeShow = true
        this.pageShow = false
      } else if (value === '3') {
        this.typeShow = true
        this.pageShow = true
      }
    },
    changeModular (val) {
      if (this.form.muneType === '3') {
        // this.form.pageFatherId = ''
        let params = {
          farId: val
        }
        let the = this
        http.post('sysModule/findSysModeularByFarId', params).then(function (data) {
          the.pageFarData = data.data.obj
        })
      }
    },
    async bindingData () {
      let params = {
        farId: 0
      }
      let httpData = await http.post('sysModule/findSysModeularByFarId', params)
      this.farData = httpData.data.obj
      if (this.$route.params.id !== undefined && this.$route.params.id !== null && this.$route.params.id !== '') {
        let param = {
          id: this.$route.params.id
        }
        let module = await http.post('sysModule/findSysModularById', param)
        this.form = module.data.obj
        this.form.muneType = module.data.obj.muneType.toString()
        if (module.data.obj.muneType === 1) {
          this.form.fatherId = ''
          this.form.pageFatherId = ''
        } else if (module.data.obj.muneType === 2) {
          this.form.pageFatherId = ''
          this.typeShow = true
        } else if (module.data.obj.muneType === 3) {
          this.typeShow = true
          this.pageShow = true
        } else {
          this.typeShow = false
          this.pageShow = false
        }
      }
    },
    returnList () {
      this.$router.push({ path: '/moduleList' })
    }
  },
  mounted () {
    this.bindingData()
  }
}
</script>

<style>
</style>
