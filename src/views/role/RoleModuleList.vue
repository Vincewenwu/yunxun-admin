<template>
  <el-row v-loading="delloading" element-loading-text="玩命删除中">
<el-col :span="5" style="margin-top: 15px;padding-right: 5px;min-height: 480px;">
<el-card class="box-card group">
  <div slot="header" class="clearfix">
    <span>园校列表</span>
  </div>
  <div>
    <el-tree
      style="min-height: 430px;"
      :data="treeData" 
      :props="props" 
      @node-click="handleNodeClick"
      highlight-current
      >
    </el-tree>
  </div>
</el-card>
</el-col>
<el-col :span="19" class="border" style="min-height: 480px;"> 
  <el-col :span="24" class="border">  
   <el-form :inline="true" :model="formInline">
    <el-form-item label="角色名称" class="blist">
      <el-input v-model="formInline.roleName" placeholder="请输入角色名称"></el-input>
    </el-form-item>
    <el-form-item  class="blist">
      <span class="wrapper">
      <el-button type="info" @click="bindingData" class="el-icon-search"> 查询</el-button>
      <el-button type="success" @click="openadd" class="el-icon-plus"> 新增</el-button>
      <el-button type="danger" @click="deleteBathRole" class="el-icon-delete"> 删除</el-button>
    </span>
    </el-form-item>
  </el-form>
  </el-col>
  <el-col :span="24" style="margin-top: 10px;">  
      <el-table :data="tableData" v-loading ="loading" element-loading-text="玩命加载中" border style="width: 100%" :default-sort = "{prop: 'array'}" @selection-change="handleSelectionChange">
      <el-table-column prop="id" type="selection" ></el-table-column>
      <el-table-column prop="name" label="角色名称" sortable></el-table-column>
      <el-table-column prop="description" label="角色描述" sortable></el-table-column>
      <el-table-column prop="createTime" label="创建时间" :formatter="formatterDate" sortable></el-table-column>
      <el-table-column prop="deleteFlag" label="状态" sortable></el-table-column>
      <el-table-column fixed="right" label="操作">
        <template scope="scope">
          <el-button @click.native.prevent="openEdit(scope.row.id)" type="text" size="small" >编辑</el-button>
          <el-button @click.native.prevent="deleteRole(scope.row.id)" type="text" size="small">删除</el-button>
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
        :page-sizes="[10, 20, 50, 100]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total">
      </el-pagination>
    </div>
  </el-col>
</el-col>
  </el-row>
</template>

<script>
  import http from '../../utils/http'
  export default {
    data () {
      return {
        formInline: {
          roleName: '',
          schoolId: ''
        },
        tableData: [],
        treeData: [],
        multipleSelection: [],
        roleIds: '',
        currentPage: 1,
        pageSize: 10,
        total: 0,
        loading: false,
        delloading: false
      }
    },
    methods: {
      openadd () {
        this.$router.push({ path: '/roleModuleEdit' })
      },
      openEdit (roleId) {
        this.$router.push({ name: 'roleModule', params: {id: roleId} })
      },
      handleSizeChange (val) {
        this.pageSize = val
        this.bindingData('No')
      },
      handleCurrentChange (val) {
        this.currentPage = val
        this.bindingData()
      },
      handleNodeClick (data, node) {
        this.formInline.schoolId = data.id
        this.bindingData()
      },
      handleSelectionChange (val) {
        this.roleIds = ''
        for (var i = 0; i < val.length; i++) {
          this.roleIds = this.roleIds + val[i].id + '-'
        }
        this.multipleSelection = val
      },
      deleteRole (roleId) {
        let the = this
        this.$confirm('确认删除该记录吗?', '提示', {
          type: 'warning'
        }).then(() => {
          the.delloading = true
          let param = {
            ids: roleId
          }
          http.post('sysRole/deleteSysRole', param).then(function (data) {
            the.delloading = false
            if (data.data.success === true) {
              the.$message({
                message: '太帅了，删除成功',
                type: 'success'
              })
              the.bindingData('No')
            } else {
              the.$message.error('错了哦，删除失败')
            }
          })
        }).catch(() => {})
      },
      deleteBathRole () {
        let the = this
        if (the.roleIds !== '' && the.roleIds !== null) {
          this.$confirm('确认删除选中记录吗?', '提示', {
            type: 'warning'
          }).then(() => {
            the.delloading = true
            let param = {
              ids: this.roleIds
            }
            http.post('sysRole/deleteSysRole', param).then(function (data) {
              the.delloading = false
              if (data.data.success === true) {
                the.$message({
                  message: '太帅了，删除成功',
                  type: 'success'
                })
                the.bindingData('No')
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
      bindingData (tpye) {
        let the = this
        the.loading = true
        let params = {
          currentPage: this.currentPage,
          pageSize: this.pageSize,
          roleName: this.formInline.roleName,
          schoolId: this.formInline.schoolId
        }
        http.post('sysRole/toSysRoleList', params).then(function (httpData) {
          the.tableData = httpData.data.obj.sysRoles.records
          the.total = httpData.data.obj.sysRoles.total
          if (tpye === 'No') {
            the.treeData = httpData.data.obj.schools
          }
          the.loading = false
        })
      },
      formatterDate (row, column) {
        let date = new Date(row.createTime)
        let year = date.getFullYear()
        let month = date.getMonth() + 1 > 9 ? date.getMonth() + 1 : '0' + (date.getMonth() + 1)
        let day = date.getDate() > 9 ? date.getDate() : '0' + date.getDate()
        return year + '-' + month + '-' + day
      }
    },
    mounted () {
      alert('111')
      this.bindingData('No')
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
  .group{
    border: 1px solid #eef6f6;
  }
  .group .el-card__body{
    padding: 0;
  }
  .group .el-card__header{
    padding: 10px 20px;
    border-bottom: 1px solid #eef6f6;
  }
  .group .el-card__body .el-tree{
    border:none
  }
  .clearfix .el-button-group{/*修改分组button width*/
    width: 100%;
  }
  .clearfix .el-button-group button{/*修改分组button 圆角 为 直角*/
    border-radius: 0;
  }
</style>
