<template>
  <el-row>
  <el-col :span="24">
  	<div style="font-size: 16px;margin-top: 10px;">学员列表 记录（）</div> 
  </el-col>
<el-col :span="5" style="margin-top: 15px;padding-right: 5px;">
<el-card class="box-card group">
	<div slot="header" class="clearfix">
		<span>分组列表</span>
	</div>
	<div>
		<el-tree
			style="min-height: 400px;"
			:data="groupData" 
			default-expand-all
			node-key="id"
			ref="tree"
      show-checkbox 
      :props="groupProps" 
      @node-click="handleNodeClick">
		</el-tree>
	</div>
	<div class="bottom clearfix" style="margin-top: 5px;">
		<el-button-group>
			<el-button type="primary" :plain="true"  @click="dialogFormVisible = true" class="el-icon-plus" style="width: 50%;"> 新增</el-button>
			<el-button type="danger"  :plain="true" @click="getCheckedNodes"  style="width: 50%;float: right;"> 删除</el-button>
		</el-button-group>
		
		<el-dialog title="分组管理" :visible.sync="dialogFormVisible" size="tiny">
			 <el-form :model="formgroup" label-width="80px">
          <el-form-item label="分组名称">
            <el-input v-model="groupname" placeholder="请输入"></el-input>
          </el-form-item>
        </el-form>
			  <div slot="footer" class="dialog-footer">
			    <el-button @click="dialogFormVisible = false">取 消</el-button>
			    <el-button type="primary" @click="addgroup">确 定</el-button>
			  </div>
	  </el-dialog>
  </div>
</el-card>
		
  </el-col>
  <el-col :span="19" class="border"> 
  <el-col :span="24" class="border">  
	 <el-form :inline="true" :model="formInline">
	  <el-form-item label="姓名" class="blist">
	    <el-input v-model="name" placeholder="请输入"></el-input>
	  </el-form-item>
	  <el-form-item label="学院名称" class="blist">
      <el-input v-model="shoolName" placeholder="可输入关键字筛选"></el-input>
    </el-form-item>
	  <el-form-item label="考勤编号" class="blist">
	     <el-input v-model="checkWorkAttendanceCar" placeholder="请输入"></el-input>
	  </el-form-item>
	  <span class="wrapper">
      <el-button type="info" @click="onSubmit" class="el-icon-search"> 查询</el-button>
      <el-button type="success" @click.native="openadd" class="el-icon-plus"> 新增</el-button>
      <el-button type="danger" :plain="true" @click="delbabay" class="el-icon-delete"> 删除</el-button>
      <el-button @click="dialogFormVisible2 = true" class="el-icon-more"> 分组</el-button>
      <el-button  class="el-icon-upload2"> 导出选中</el-button>
      <el-button  class="el-icon-upload2"> 导出全部</el-button>
    </span>
	</el-form>
  </el-col>
  <el-dialog title="学院分组" :visible.sync="dialogFormVisible2"  size="tiny">
       <el-form :model="formgroup" label-width="80px">
          <el-form-item label="与我关系">
     <el-select v-model="groupvalue"  placeholder="请选择类型">
      <el-option
      v-for="group in groupList"
      :key="group.id"
      :label="group.name"
      :value="group.id">
    </el-option>
      </el-select>
  </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible2 = false">取 消</el-button>
          <el-button type="primary" :plain="true" @click="addBabyGroup">确 定</el-button>
        </div>
    </el-dialog>
  
 <el-col :span="24" style="margin-top: 10px;">  
	  	<el-table
	  	v-loading="loading2"
      element-loading-text="拼命加载中"
	    :data="tableData"
	    style="width: 100%"
	    @selection-change="handleSelectionChange"
	    >
	    <el-table-column
       	 type="selection"
	      width="55">
	    </el-table-column>
	    <el-table-column
	      prop="headPortrait"
	      label="头像"
	     >
		       <template scope="scope">
          <img :src="imgService + scope.row.headPortrait" style="width: 80px;height: 80px;border-radius: 50%;margin-top: 5px;" />
        </template>
	    </el-table-column>
	    <el-table-column
	      prop="name"
	      label="姓名"
	      >
	    </el-table-column>
	    <el-table-column
	      prop="groupName"
	      label="所属分组"
	      :formatter="groupName">
	    </el-table-column>
	    <el-table-column
	      prop="sex"
	      label="性别"
	      :formatter="formatsex">
	    </el-table-column>
	    <el-table-column
	      prop="birthday"
	      label="出生日期"
	      >
	    </el-table-column>
	    <el-table-column
	      prop="schoolname"
	      label="所属园所"
	      >
	    </el-table-column>
	    <el-table-column
	      prop="createTime"
	      label="创建日期"
	     >
	    </el-table-column>
	    <el-table-column
	      prop="deleteFlag"
	      label="状态"
	      :formatter="formatstate">
	    </el-table-column>
	    <el-table-column
	      prop="relationship"
	      label="家长信息"
	      :formatter="formatparent">
	    </el-table-column>
		<el-table-column
		      fixed="right"
		      label="操作"
		      >
		      <template scope="scope">
		      	<!--<el-button
		          @click.native.prevent="deleteRow(scope.$index, tableData4)"
		          type="text"
		          size="small">
		          分享
		        </el-button>-->
		        <el-button
		          @click.native.prevent="editoppen(scope.row.id)"
		          type="text"
		          size="small">
		          编辑
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
   <el-col>
   	
    </el-col>
  </el-col>
  </el-row>

</template>

<script>
  import http from '../../utils/http'
  export default {
    data () {
      return {
        dialogFormVisible: false,
        dialogFormVisible2: false,
        shoolName: '',
        checkWorkAttendanceCar: '',
        total: '',
        page: 1,
        size: 5,
        pageSizes: [1, 2, 3, 4, 5],
        name: '',
        sels: [],
        selsgroup: [],
        groupname: '',
        formInline: {
          user: '',
          region: ''
        },
        multipleSelection: [],
        groupData: [],
        groupProps: {
          label: 'name' // 这里的意思是是讲label这个属性变成我要的字段的属性
        },
        groupList: [],
        groupvalue: '',
        group: '',
        groupId: '',
        loading2: true,
        groupdeitName: '',
        aa: [],
        babysid: ''
      }
    },
    methods: {
// 条件查询
      async onSubmit () {
        this.loading2 = true
        let BaseBabySchoolDTO = {
          schoolname: this.shoolName,
          startPage: this.page,
          pageSise: this.size,
          name: this.name,
          cardNums: this.checkWorkAttendanceCar
        }
        let data = await http.post('/baby/findBaby', BaseBabySchoolDTO)
        this.tableData = data.data.obj.baseBaby
        this.total = data.data.obj.page.total
        this.loading2 = false
      },
      deleteRow (index, rows) {
        rows.splice(index, 1)
      },
      openadd () {
        this.$router.push({ path: '/studentEdit', query: {id: '1'} })
      },
      handleSelectionChange (sels) {
        this.sels = sels
      },
      formatsex: function (row, column) {
        if (row.sex === 0) {
          return '男'
        } else {
          return '女'
        }
      },
      formatparent: function (row, column) {
        if (row.relationship !== '') {
          return '已绑定'
        } else {
          return '未绑定'
        }
      },
      formatstate: function (row, column) {
        if (row.deleteFlag === 0) {
          return '未删除'
        } else {
          return '已删除'
        }
      },
      groupName: function (row, column) {
        if (row.groupName === '') {
          return '---'
        } else {
          return row.groupName
        }
      },
// 新增group   宝贝的groupType是0
      async addgroup () {
        if (this.groupname !== '') {
          let BaseGroup = {
            name: this.groupname,
            groupType: 0
          }
          let data = await http.post('/baby/addbaseGroup', BaseGroup)
          this.$message({
            message: data.data.obj,
            type: 'success'
          })
          this.dialogFormVisible = false
        } else {
          this.$message({
            message: '请填写组名称',
            type: 'error'
          })
        }
      },
// 删除宝贝分组
      async getCheckedNodes () {
        var ids = this.$refs.tree.getCheckedNodes()
        for (var i = 0; i < ids.length; i++) {
          this.aa[i] = ids[i].id
        }
        this.babysid = this.aa.join(',')
        let r = {
          ids: this.babysid
        }
        let data = await http.post('/baby/delbaseGroup', r)
        this.$message({
          message: data.data.obj,
          type: 'success'
        })
        this.getData()
      },
// 删除baby
      async delbabay () {
        var count = 0
        var dels = this.sels.map(item => item.deleteFlag).toString()
        this.jiequ = dels.split(',')
        console.log(this.jiequ)
        for (var i = 0; i < this.jiequ.length; i++) {
          if (this.jiequ[i] === '1') { // 这里的状态是1是已删除的状态
            count = count + 1
            break // 判断有已标记就退出
          }
        }
        if (count !== 1) {
          var ids = this.sels.map(item => item.id).toString()
          let babyids = {ids: ids}
          let data = await http.post('/baby/delBaby', babyids)
          this.$message({
            message: data.data.obj,
            type: 'success'
          })
          this.onSubmit()
        } else {
          this.$message({
            message: '请选择未删除的',
            type: 'success'
          })
        }
      },
// baby分组
      async addBabyGroup () {
        var ids = this.sels.map(item => item.id).toString()
        let MemMemberGroup = {
          ids: ids,
          groupId: this.groupvalue,
          createMam: 'wenwu'
        }
        alert(this.groupvalue)
        alert(ids.length)
        if (this.groupvalue !== '' && ids.length > 0) {
          let data = await http.post('/baby/addMemMemberGroup', MemMemberGroup)
          this.$message({
            message: data.data.obj,
            type: 'success'
          })
          this.dialogFormVisible2 = false
        } else {
          this.$message({
            message: '请选择分组或者孩子',
            type: 'error'
          })
        }
      },
// 编辑
      editoppen (id) {
        this.$router.push({ path: '/studentEdit', query: {id: id} })
      },
// 条页
      handleCurrentChange (val) {
        this.page = val
        this.onSubmit()
      },
      handleSizeChange (val) {
        this.size = val
        this.onSubmit()
      },
// load加载数据
      async getData () {
        let BaseBabySchoolDTO = {
          schoolname: this.shoolName,
          startPage: 1,
          pageSise: 5,
          name: '',
          cardNums: ''
        }
        let data = await http.post('/baby/findBaby', BaseBabySchoolDTO)
        this.tableData = data.data.obj.baseBaby
        this.groupData = data.data.obj.grouplist
        this.groupList = data.data.obj.grouplist
        this.total = data.data.obj.page.total
        this.loading2 = false
      },
      // 分组节点点击事件获取分组id
      handleNodeClick (data, checked, indeterminate) {
        this.groupId = data.id
        this.groupdeitName = data.name
        this.onHandleNodeClick()
      },
      async onHandleNodeClick () {
        this.loading2 = true
        let baseBabySchoolgroupDTO = {
          schoolname: this.shoolName,
          startPage: this.page,
          pageSise: this.size,
//        name: this.name,
          groupID: this.groupId
//        cardNums: this.checkWorkAttendanceCar,
        }
        let data = await http.post('/baby/findBaseBabyPageAndGroup', baseBabySchoolgroupDTO)
        this.tableData = data.data.obj.baseBabySchoolgroupDTO
        this.total = data.data.obj.page.total
        this.loading2 = false
      }
    },
    mounted () {
      this.getData()
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
