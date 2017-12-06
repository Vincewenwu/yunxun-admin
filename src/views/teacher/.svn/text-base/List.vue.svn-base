<template>
  <el-row>
  <el-col :span="24">
  	<div style="font-size: 16px;margin-top: 10px;">老师列表 记录（{{total}}）</div> 
  </el-col>
<el-col :span="5" style="margin-top: 15px;padding-right: 5px;">
<el-card class="box-card group">
	<div slot="header" class="clearfix">
		<span>分组列表</span>
	</div>
	<div>
	  <el-tree
      class="filter-tree"
      :data="groupData"
      :props="groupProps"
      accordion
      :highlight-current="true"
      style="min-height: 400px;"
      node-key="id"
      @node-click="handleNodeClick"
      ref="tree">
    </el-tree>
	</div>
	<div class="bottom clearfix" style="margin-top: 5px;">
		<el-button-group>
			<el-button type="primary" class="el-icon-plus" @click="ShowAddGroup" style="width: 50%;"> 新增</el-button>
			<el-button type="danger" class="el-icon-delete2" style="width: 50%;float: right;"> 删除</el-button>
		</el-button-group>
  </div>
</el-card>
  </el-col>
  <el-col :span="19" class="border"> 
  <el-col :span="24" class="border">  
	 <el-form :inline="true">
	 
	 <el-form-item label="所属园所" class="blist">
	    <el-select clearable v-model="schoolId" placeholder="请选择园所">
	    <el-option
     	v-for="school in schools"
     	:key="school.id"
     	:label="school.name"
     	:value="school.id">
     </el-option>
	    </el-select>
	  </el-form-item>
	   <el-form-item label="模糊搜索" class="blist">
      <el-input v-model="vague" placeholder="请输入"></el-input>
    </el-form-item>
	  <span class="wrapper">
      <el-button type="info"  @click="sel" class="el-icon-search"> 查询</el-button>
      <el-button type="success" @click.native="add" class="el-icon-plus"> 新增</el-button>
      <el-button type="danger" @click.native="stop" class="el-icon-circle-close"> 停用</el-button>
      <el-button type="danger" @click.native="del" class="el-icon-delete"> 删除</el-button>
      <el-button  class="el-icon-upload2"> 批量导入</el-button>
      <el-button  class="el-icon-more" @click="fenZu"> 分组</el-button>
    </span>
	</el-form>
  </el-col>
 <el-col :span="24" style="margin-top: 10px;">  
	  	<el-table
	    :data="tableData"
	    border
	    style="width: 100%"
	    :default-sort = "{prop: 'array'}"
	    @selection-change="handleSelectionChange"
	    v-loading="loading"
      element-loading-text="拼命加载中"
	    >
	    <el-table-column
       	 type="selection"
	      width="55">
	    </el-table-column>
	    <el-table-column
	      prop="headPortrait "
	      label="头像">
		      <template scope="scope">
              <img style="width: 100%;height: 80px;" :src="imgService+scope.row.headPortrait" /> 
        </template>
	    </el-table-column>
	    <el-table-column
	      prop="name"
	      label="姓名">
	    </el-table-column>
	    <el-table-column
	      prop="dutiesName"
	      label="职务">
	    </el-table-column>
	    <el-table-column
	      prop="phoneNum"
	      label="手机号"
	      width="150">
	    </el-table-column>
	    <el-table-column
        prop="bindingCode"
        label="绑定码">
      </el-table-column>
      <el-table-column
        prop="bindingState"
        label="绑定状态">
        <template scope="scope">
          <span v-if="scope.row.bindingState=== '0'" style="color: red">未绑定</span>
          <span v-if="scope.row.bindingState=== '1'" style="color: green">已绑定</span>
        </template>
      </el-table-column>
	    <el-table-column
	      prop="schoolName"
	      label="所属园所"
	      :show-overflow-tooltip="true">
	    </el-table-column>
	    <el-table-column
        prop="groupName"
        label="所属组"
        :show-overflow-tooltip="true">
      </el-table-column>
      <el-table-column
        prop="disableNo"
        label="账号状态">
        <template scope="scope">
          <span v-if="scope.row.disableNo=== 0">正常</span>
          <span v-else style="color: red">停用</span>
        </template>
      </el-table-column>
	    <el-table-column
	      prop="deleteFlag"
	      label="删除状态">
	      <template scope="scope">
          <span v-if="scope.row.deleteFlag=== 0">正常</span>
          <span v-else style="color: red">删除</span>
       </template>
	    </el-table-column>
		<el-table-column
		      fixed="right"
		      label="操作"
		      width="200"
		      header-align="center"
		      align="center">
		      <template scope="scope">
		        <el-button
		          @click.native="edit(scope.row.id)"
		          type="text"
		          size="small">
		          编辑
		        </el-button>
		        <el-button
              @click.native="getRemoveGroupData(scope.row.id)"
              type="text"
              size="small">
              从组移除
            </el-button>
            <el-button
              @click.native="delOrStop(scope.row.id, '/teacher/delSysUser.do')"
              type="text"
              size="small">
              删除
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
  </el-col>
  <el-dialog  title="选择分组" :visible.sync="dialogGroupVisible" size="tiny">
  <el-select @change="cboGroupChange" size="large" v-model="cboGroupId" filterable placeholder="请选择分组">
    <el-option
      v-for="group in groups"
      :key="group.id"
      :label="group.name"
      :value="group.id">
    </el-option>
  </el-select>
  <div slot="footer" class="dialog-footer">
    <el-button @click="dialogGroupVisible = false">取 消</el-button>
    <el-button type="primary" @click="toGroup">确 定</el-button>
  </div>
  </el-dialog>
  <el-dialog  title="添加分组" :visible.sync="addGroupVisible" size="tiny">
     <el-form ref="form" label-width="80px">
    <el-form-item label="分组名称" >
      <el-input v-model="groupName"></el-input>
    </el-form-item>
    <el-form-item label="分组说明" >
      <el-input v-model="groupExplain"></el-input>
    </el-form-item>
    <el-form-item label="所属学校" >
     <el-select   filterable clearable  v-model="addSchoolId" placeholder="请选择园所">
     <el-option
      v-for="school in schools"
      :key="school.id"
      :label="school.name"
      :value="school.id">
     </el-option>
     </el-select>
    </el-form-item>
  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="addGroupVisible = false">取 消</el-button>
    <el-button type="primary"  @click="addGroup">确定新增</el-button>
  </div>
  </el-dialog>
  
  <el-dialog
  title="您要从哪个分组移除该教师"
  :visible.sync="dialogVisible"
  size="tiny">
  <el-row>
    <el-tree
      class="filter-tree"
      :data="removeGroupData"
      :props="removeGroupProps"
      show-checkbox
      :highlight-current="true"
      node-key="id"
      @check-change="handleRevoveGroupChange"
      ref="tree1">
    </el-tree>
  </el-row>
  <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="removeGroupTeacher">移除</el-button>
  </span>
</el-dialog>
  
  
  </el-row>
</template>
<script>
  import http from '../../utils/http'
  export default {
    data () {
      return {
        loading: false,
        vague: '', // 模糊查询参数
        schoolId: '', // 查询 园校下拉框选中值_园校id
        schools: [], // 园校下拉框数据
        tableData: [], // dgv数据
        total: 0, // 总记录数
        page: 1, // 当前页码
        size: 10, // 每页大小
        pageSizes: [10, 1, 20, 30], // 每页大小下拉框
        groupData: [], // 分组数据
        removeGroupData: [],
        groups: '', // 分组下拉框数据
        groupId: '', // 分组id
        cboGroupId: '', // 分组下拉框分组id
        sysUserIds: '', // 后台用户id集合
        schoolIds: '', // 行选中的schoolId集合
        result: false, // 操作结果
        dialogGroupVisible: false, // 分组弹窗
        addGroupVisible: false, // 添加分组弹框
        groupName: '', // 分组名称
        groupExplain: '', // 分组描述
        addSchoolId: '', // 添加分组时的学校id
        dialogVisible: false,
        groupProps: {
          children: 'children',
          label: 'name',
          id: 'id'
        },
        removeGroupProps: {
          label: 'name',
          id: 'id'
        }
      }
    },
    methods: {
      // 查询按钮点击事件
      sel () {
        this.groupId = ''
        this.getTableData()
      },
      // 异步加载教师数据
      async getTableData () {
        this.loading = true
        let params = {
          startPage: this.page,
          pageSize: this.size,
          groupId: this.groupId,
          vague: this.vague,
          schoolId: this.schoolId
        }
        let data = await http.post('/teacher/findTeacherByDynamic.do', params)
        if (data.data.success) {
          this.tableData = data.data.obj.list
          this.total = data.data.obj.total
        } else {
          this.message(data.data.msg)
          this.tableData = []
          this.total = 0
        }
        this.loading = false
      },
      // 绑定学校下拉框
      async getCboSchoolData () {
        let data = await http.post('/school/getCboSchool.do')
        if (data.data.obj.length > 0) {
          this.schools = data.data.obj
        } else {
          this.schools = []
        }
      },
      // 绑定分组树形
      async getTreeGroupData () {
        let data = await http.post('/teacher/findTeacherGroup.do')
        if (data.data.success) {
          this.groupData = data.data.obj
        } else {
          this.message(data.data.msg)
        }
      },
       // 绑定分组下拉框
      async getCboGroupData () {
        let params = {
          schoolIds: this.schoolIds
        }
        let data = await http.post('/teacher/findTeacherGroupById.do', params)
        if (data.data.success) {
          this.groups = data.data.obj
          this.dialogGroupVisible = true
        } else {
          this.message(data.data.msg)
        }
      },
      // 绑定要移除的分组树形
      async getRemoveGroupData (id) {
        let params = {
          teacherId: id
        }
        let data = await http.post('/teacher/findRemoveGroup.do', params)
        if (data.data.success) {
          this.removeGroupData = data.data.obj
          this.dialogVisible = true
        } else {
          this.message(data.data.msg)
        }
      },
      // 移除分组里面的teacher
      removeGroupTeacher () {
        if (this.$refs.tree1.getCheckedKeys().join(',').trim() !== '') {
          this.toRemoveGroupTeacher()
        } else {
          this.message('请选择要从哪个组移除教师')
        }
      },
      // 移除组里面的教师
      async toRemoveGroupTeacher () {
        let params = {
          memberGroupIds: this.$refs.tree1.getCheckedKeys().join(',').trim()
        }
        let data = await http.post('/teacher/toRemoveGroupTeacher.do', params)
        if (data.data.success) {
          this.message(data.data.msg)
          this.getTableData()
          this.dialogVisible = false
        } else {
          this.message(data.data.msg)
        }
      },
      // 每页大小改变
      handleSizeChange (val) {
        this.size = val
        this.getTableData()
      },
      // 当前页码改变
      handleCurrentChange (val) {
        this.page = val
        this.getTableData()
      },
      handleSelectionChange (val) {
        var strIds = []
        var strSchoolIds = []
        this.sysUserIds = ''
        this.schoolIds = ''
        val.forEach(row => {
          strIds.push(row.id)
          strSchoolIds.push(row.schoolId)
        })
        if (strIds.length > 0) {
          this.sysUserIds = strIds.join(',')
          this.schoolIds = strSchoolIds.join(',')
        }
      },
      // 显示新增教师页面
      add () {
        this.$router.push({ path: '/teacheredit' })
      },
        // 停用教师账号
      stop () {
        if (this.sysUserIds.length > 0) {
          this.delOrStop(this.sysUserIds, '/teacher/stopSysUser.do')
          // alert(this.ids)
        } else {
          this.message('请选择要停用的教师')
        }
      },
      // 删除教师
      del () {
        if (this.sysUserIds.length > 0) {
          this.delOrStop(this.sysUserIds, '/teacher/delSysUser.do')
          // alert(this.ids)
        } else {
          this.message('请选择要删除的教师')
        }
      },
      // 编辑教师
      edit (id) {
        this.$router.push({path: '/teacheredit', query: { sysUserId: id }})
        // this.$router.push({path: '/schooledit?id=' + schoolId})
      },
      // 节点点击事件获取分组id
      handleNodeClick (data, checked, indeterminate) {
        this.groupId = data.id
        this.vague = ''
        this.getTableData()
        // findTeacherByGroupId
      },
      // 停用教师
      async delOrStop (ids, resqURL) {
        let params = {
          sysUserIds: ids
        }
        let data = await http.post(resqURL, params)
        this.result = data.data.success
        if (this.result) {
          this.successResult()
        } else {
          this.failResult()
        }
        this.getTableData()
      },
      // 分组按钮显示分组页面
      fenZu () {
        if (this.sysUserIds.length > 0) {
          this.getCboGroupData()
        } else {
          this.message('请选择要分组的教师')
        }
      },
      // 下拉框选择事件获取分组id
      cboGroupChange (val) {
        this.cboGroupId = val
      },
      // 分组页面确认分组
      async toGroup () {
        let params = {
          sysUserIds: this.sysUserIds,
          groupId: this.cboGroupId
        }
        let data = await http.post('/teacher/addToOrEditTeacherGroup.do', params)
        this.result = data.data.success
        if (this.result) {
          this.successResult()
          this.sysUserIds = ''
          this.cboGroupId = ''
        } else {
          this.message(data.data.msg)
        }
        this.dialogGroupVisible = false
        this.getTableData()
      },
      // 新增分组
      async addGroup () {
        let params = {
          groupName: this.groupName,
          groupExplain: this.groupExplain,
          schoolId: this.addSchoolId
        }
        let data = await http.post('/teacher/addGroup.do', params)
        this.result = data.data.success
        if (this.result) {
          this.addGroupVisible = false
          this.message('添加分组成功')
          this.getTreeGroupData()
          this.groupName = ''
          this.groupExplain = ''
          this.addSchoolId = ''
        } else {
          this.message(data.data.msg)
        }
      },
      // 显示添加分组页面
      ShowAddGroup () {
        this.addGroupVisible = true
      },
      message (msg) {
        this.$message(msg)
      },
      successResult () {
        this.$message({
          message: '操作成功',
          type: 'success'
        })
      },
      failResult () {
        this.$message({
          message: '操作失败',
          type: 'warning'
        })
      },
      handleClose (done) {
        this.$confirm('确认关闭？')
        .then(_ => {
          done()
        }).catch(_ => {})
      }
    },
    // 初始化方法
    mounted () {
      this.getCboSchoolData()
      this.getTableData()
      this.getTreeGroupData()
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
