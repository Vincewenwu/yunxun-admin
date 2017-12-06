<template>
  <el-row v-loading="bodyloading" element-loading-text="玩命保存中">
    <el-col :span="16">
       <el-form ref="form" :rules="rules" :model="form" label-width="140px" style="margin-top: 20px;" >
        <el-form-item label="id" v-show="false" prop="id">
          <el-input  v-model="form.id" ></el-input>
        </el-form-item>
        <el-form-item label="角色名称" prop="name" required>
           <el-input v-model="form.name" placeholder="请输入角色名称"></el-input>
        </el-form-item>
        <el-form-item label="角色描述" prop="description" >
          <el-input
            type="textarea"
            :rows="4"
            placeholder="请输入角色描述"
            v-model="form.description">
          </el-input>
        </el-form-item>
        <el-form-item label="角色类型" prop="roleType" required>
        <el-radio-group v-model="form.roleType" @change="changeMenuTpye">
          <el-radio label="0">平台</el-radio>
          <el-radio label="1">园校</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item v-show="typeShow" prop="schoolId" label="园校名称" required>
        <el-select v-model="form.schoolId" placeholder="请选择园校名称">
          <el-option v-for='item in schoolData' :label="item.name" :value="item.id" :key="item.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item  label="权限名称" prop="description" >
        <div v-loading="loading" element-loading-text="玩命加载中" style="max-height: 420px;min-height:180px;overflow-y: auto;border: 1px solid rgb(209, 229, 227);">
         <el-tree
            :data="treeData"
            show-checkbox
            node-key="id"
            ref="tree"
            default-expand-all
            :props="defaultProps">
          </el-tree>
        </div>
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
        description: '',
        name: '',
        schoolId: '',
        roleType: '0'
      },
      rules: {
        name: [
          { required: true, message: '请输入角色名称', trigger: 'blur' }
        ]
      },
      schoolData: [],
      treeData: [],
      loading: true,
      bodyloading: false
    }
  },
  methods: {
    submitForm (formName) {
      let the = this
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.bodyloading = true
          this.form.moduleIds = this.$refs.tree.getCheckedKeys().toString()
          http.post('sysRole/addSysRole', this.form).then(function (data) {
            the.bodyloading = false
            if (data.data.success === true) {
              the.$message({
                message: '太帅了，保存成功',
                type: 'success'
              })
              if (the.$route.params.id !== undefined && the.$route.params.id !== null && the.$route.params.id !== '') {
                the.$router.push({ path: '/roleModuleList' })
              } else {
                the.$refs[formName].resetFields()
                this.$refs.tree.setCheckedKeys([])
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
        this.typeShow = true
      } else {
        this.form.schoolId = ''
        this.typeShow = false
      }
    },
    async bindingData () {
      let httpData = await http.post('sysRole/toSysRoleEdit')
      this.schoolData = httpData.data.obj.schools
      this.treeData = httpData.data.obj.modules
      this.loading = false
      if (this.$route.params.id !== undefined && this.$route.params.id !== null && this.$route.params.id !== '') {
        let param = {
          id: this.$route.params.id
        }
        let module = await http.post('sysRole/findSysRoleById', param)
        this.form = module.data.obj.sysRole
        this.$refs.tree.setCheckedNodes(module.data.obj.ids)
        if (module.data.obj.sysRole.roleType === 0) {
          this.form.roleType = '0'
          this.form.schoolId = ''
        } else {
          this.typeShow = true
          this.form.roleType = '1'
        }
      }
    },
    returnList () {
      this.$router.push({ path: '/roleModuleList' })
    }
  },
  mounted () {
    this.bindingData()
  }
}
</script>

<style>
</style>
