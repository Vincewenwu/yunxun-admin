<template>
  <el-row>
  <el-col :span="24">
  	<div style="font-size: 16px;margin-top: 10px;">园长信箱 记录（{{total}}）</div> 
  </el-col>
  <el-col :span="24" class="border">  
	 <el-form :inline="true">
	  <el-form-item label="所属学校" >
     <el-select   filterable clearable  v-model="cboSchoolId" placeholder="请选择园所">
     <el-option
      v-for="school in schools"
      :key="school.id"
      :label="school.name"
      :value="school.id">
     </el-option>
     </el-select>
    </el-form-item>
	 <el-form-item label="发件人" class="blist">
      <el-input v-model="vague" placeholder="请输入"></el-input>
   </el-form-item>
   <span class="wrapper">
      <el-button type="info" class="el-icon-search" @click.native.prevent="sel"> 查询</el-button>
      <el-button type="danger" class="el-icon-delete" @click.native.prevent="del"> 删除</el-button>
    </span>
	</el-form>
  </el-col>
 <el-col :span="24" style="margin-top: 10px;">  
	  	<el-table
	  	v-loading="loading"
	  	element-loading-text="拼命加载中"
	    :data="dgvData"
	    border
	    style="width: 100%"
	    :default-sort = "{prop: 'array'}"
	    @selection-change="handleSelectionChange"
      @select="selectRow"
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
	      prop="sender"
	      label="发件人">
	    </el-table-column>
	    <el-table-column
        prop="senderType"
        label="类型">
        <template scope="scope">
          <span v-if="scope.row.senderType=== 0">家长</span>
          <span v-else-if="scope.row.senderType=== 1">老师</span>
           <span v-else >未知</span>
        </template>
      </el-table-column>
	    <el-table-column
        prop="letterContent"
        label="发送内容">
      </el-table-column>
	    <el-table-column
        prop="schoolName"
        label="所属园所">
      </el-table-column>
	    <el-table-column
        prop="phoneNum"
        label="电话">
      </el-table-column>
      <el-table-column
        prop="address"
        label="地址">
      </el-table-column>
	    <el-table-column
	      prop="createTime"
	      label="创建时间">
	    </el-table-column>
	    <el-table-column
	      prop="state"
	      label="消息状态">
	      <template scope="scope">
          <span v-if="scope.row.state=== 0" style="color: red">未读</span>
          <span v-else-if="scope.row.state=== 1" style="color: green">已读</span>
           <span v-else style="color:#0082E6">已回复</span>
        </template>
	    </el-table-column>
	    <el-table-column
        prop="deleteFlag"
        label="删除标记">
      <template scope="scope">
          <span v-if="scope.row.deleteFlag=== 0">正常</span>
          <span v-else style="color: red">删除</span>
      </template>
      </el-table-column>
		<el-table-column
		      fixed="right"
		      label="操作"
		      width="150">
		      <template scope="scope">
		      	<el-button
		          @click.native.prevent="reply(scope.row.id)"
		          type="text">
		          回复
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
  </el-row>
</template>

<script>
  import http from '../../utils/http'
  export default {
    data () {
      return {
        dgvData: [], // dgv公告数据
        schools: [], // 学校下拉框数据
        total: 0, // 总记录数
        page: 1, // 当前页码
        size: 10, // 每页大小
        pageSizes: [5, 10, 20, 30], // 每页大小
        deleteFlag: '', // 删除 标记
        vague: '', // 发件人
        loading: false, // 加载
        mailIds: '', // 主键集合
        cboSchoolId: '',
        multipleSelection: []
      }
    },
    methods: {
      // 异步加载信箱
      async getdgvData () {
        this.loading = true
        let params = {
          startPage: this.page,
          pageSize: this.size,
          vague: this.vague,
          schoolId: this.cboSchoolId
        }
        let data = await http.post('/Inform/findPrincipalMail', params)
        if (data.data.success) {
          this.dgvData = data.data.obj.list
          this.total = data.data.obj.total
        } else {
          this.message(data.data.msg)
          this.dgvData = []
          this.total = 0
        }
        this.loading = false
      },
      // 根据id查询回复内容
      async checkMail (id) {
        let params = {
          id: id
        }
        let data = await http.post('/Inform/checkMail.do', params)
        if (data.data.success) {
          this.$router.push({path: '/mailboxedit', query: { id: id }})
        } else {
          this.message(data.data.msg)
        }
      },
      // 删除信件确认
      del () {
        if (this.mailIds.length > 0) {
          this.$confirm('确定要删除此消息?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.delMail()
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消操作'
            })
          })
        } else {
          this.message('请选择要删除的消息')
        }
      },
       // 删除信件
      async delMail () {
        let params = {
          mailIds: this.mailIds
        }
        let data = await http.post('/Inform/delMail.do', params)
        this.result = data.data.success
        if (this.result) {
          this.successResult()
        } else {
          this.failResult()
        }
        this.getdgvData()
      },
       // 查询按钮点击事件
      sel () {
        this.getdgvData()
      },
       // 回复
      reply (id) {
        this.checkMail(id)
      },
      // 获取选中的行的主键id集合
      selectRow (row) {
        this.strIds = []
        this.mailIds = ''
        row.forEach(row => {
          this.strIds.push(row.id)
        })
        if (this.strIds.length > 0) {
          this.mailIds = this.strIds.join(',')
        }
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
      // 每页大小改变
      handleSizeChange (val) {
        this.size = val
        this.getdgvData()
      },
      // 当前页码改变
      handleCurrentChange (val) {
        this.page = val
        this.getdgvData()
      },
      // 全选 选中的行的主键id集合
      handleSelectionChange (row) {
        this.strIds = []
        this.mailIds = ''
        row.forEach(row => {
          this.strIds.push(row.id)
        })
        if (this.strIds.length > 0) {
          this.mailIds = this.strIds.join(',')
        }
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
      }
    },
        // 初始化方法
    mounted () {
      this.getdgvData()
      this.getCboSchoolData()
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
</style>
