<template>
  <el-row>
  <el-col :span="24">
  	<div style="font-size: 16px;margin-top: 10px;">园所列表 记录（{{total}}）</div> 
  </el-col>
  <el-col :span="24" class="border">  
	 <el-form :inline="true">
    <el-form-item label="所属园所" class="blist">
      <el-select clearable filterable  v-model="schoolId" placeholder="请选择园所">
      <el-option
      v-for="school in schools"
      :key="school.id"
      :label="school.name"
      :value="school.id">
     </el-option>
      </el-select>
    </el-form-item>
	  <el-form-item label="状态" class="blist">
	    <el-select clearable v-model="deleteFlag" placeholder="请选择状态">
	      <el-option
	      	v-for="item in flags"
	      	:key="item.value"
	      	:label="item.label"
	      	:value="item.value">
	      </el-option>
	    </el-select>
	  </el-form-item>
	  <span class="wrapper">
      <el-button type="info" @click='sel' class="el-icon-search"> 查询</el-button>
      <el-button type="success" @click.native="add" class="el-icon-plus"> 新增</el-button>
      <el-button type="danger" class="el-icon-delete"  @click="deleteSchool()"> 删除</el-button>
      <el-button type="success" class="el-icon-circle-close"  @click="stopSchool()"> 停用</el-button>
      <el-button type="warning" class="el-icon-upload2 "> 导出选中</el-button>
      <el-button type="warning" class="el-icon-upload2 "> 导出全部</el-button>
    </span>
	</el-form>
  </el-col>
 <el-col :span="24" style="margin-top: 10px;">  
	  	<el-table
	  	 v-loading="loading"
       element-loading-text="拼命加载中"
	  	 ref="multipleTable"
	    :data="tableData"
	    border
	    style="width: 100%"
	    :default-sort = "{prop: 'array'}"
	    @selection-change="handleSelectionChange"
	    >
	    <el-table-column
       	 type="selection"
	      width="55">
	    </el-table-column>
	    <el-table-column
	      label="校园logo">
	      <template scope="scope">
              <img style="width: 80px;height: 80px;" :src="imgService+scope.row.logo" /> 
        </template> 
	    </el-table-column>
	    <el-table-column
        prop="code"
        label="园校编号">
      </el-table-column>
	     <el-table-column
	      prop="name"
	      label="园校名称">
	    </el-table-column>
	    <el-table-column
        prop="yzName"
        label="园长">
      </el-table-column>
	    <el-table-column
	      prop="intro"
	      label="校园简介"
	      :show-overflow-tooltip = "true">
	    </el-table-column>
	    <el-table-column
	      prop="address"
	      label="地址">
	    </el-table-column>
	    <el-table-column
	      prop="telephone"
	      label="联系电话">
	    </el-table-column>
	    <el-table-column
	      prop="email"
	      label="邮箱">
	    </el-table-column>
	    <el-table-column
	      prop="website"
	      label="网址">
	    </el-table-column>
	    <el-table-column
	      prop="state"
	      label="状态">
	    <template scope="scope">
          <span v-if="scope.row.state=== 0">正常</span>
          <span v-else-if="scope.row.state=== 1" style="color: red">过期</span>
          <span v-else style="color: red">未开通</span>
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
		      label="操作">
		      <template scope="scope">
		      	<el-button
		          type="text"
		          size="small">
		          分享
		        </el-button>
		        <el-button
		          @click.native="editSchool(scope.row.id)"
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
  </el-row>
</template>

<script>
  import http from '../../utils/http'
  export default {
    data () {
      return {
        loading: true,
        schools: [], // 园校下拉框数据
        schoolId: '', // 园校id
        // 删除标记
        flags: [{
          value: 3,
          label: '全部'
        }, {
          value: 0,
          label: '正常'
        }, {
          value: 1,
          label: '删除'
        }],
        deleteFlag: '', // 删除标记值
        tableData: [], // dgv数据
        total: 0, // 总记录数
        page: 1, // 当前页码
        size: 10, // 每页大小
        pageSizes: [10, 20, 30, 40], // 每页大小下拉框
        strIds: [], // 园校id集合
        ids: '', // 园校id集合
        requestURL: ''// 请求地址
      }
    },
    methods: {
      // 查询时触发
      sel () {
        this.getData()
      },
      // 新增时触发
      add () {
        this.$router.push({ path: '/schooledit' })
      },
      // 每页大小改变时触发
      handleSizeChange (val) {
        this.size = val
        this.getData()
      },
      // 当前页码改变时触发
      handleCurrentChange (val) {
        this.page = val
        this.getData()
      },
      // 异步加载园校数据
      async getData () {
        let thi = this
        let params = {
          startPage: thi.page,
          pageSise: thi.size,
          deleteFlag: thi.deleteFlag,
          schoolId: thi.schoolId
        }
        await http.post('/school/findSchoolByDynamic.do', params).then(function (data) {
          if (data.data.success) {
            thi.tableData = data.data.obj.school
            thi.total = data.data.obj.total
          } else {
            thi.message(data.data.msg)
            thi.tableData = []
          }
        })
        this.loading = false
      },
      // 逻辑删除园校
      deleteSchool () {
        let the = this
        let leng = the.strIds.length
        if (leng > 0) {
          the.requestURL = '/school/delSchool.do'
          the.delOrStopSchool(the.strIds.join(','), '确定要删除这 ' + leng + ' 条数据吗？', '删除提示', 0)
        } else {
          the.message('请选择要删除的园校')
        }
      },
      // 停用园校
      stopSchool () {
        let the = this
        let leng = the.strIds.length
        if (leng > 0) {
          this.requestURL = '/school/stopSchool.do'
          the.delOrStopSchool(the.strIds.join(','), '确定要停用这 ' + leng + ' 个园校吗？', '停用提示', 1)
        } else {
          this.message('请选择要停用的园校')
        }
      },
      // 逻辑删除选中的园校、停用选中的的园校 时调用
      delOrStopSchool (ids, titleContent, title, type) {
        let the = this
        this.$confirm(titleContent, title, {
          type: 'warning'
        }).then(() => {
          let param = {
            schoolIds: ids,
            type: type
          }
          http.post(the.requestURL, param).then(function (data) {
            if (data.data.success === true) {
              the.$message({
                message: '操作成功',
                type: 'success'
              })
              the.getData()
            } else {
              the.$message.error(data.data.msg)
            }
          })
        }).catch(() => {})
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
      // 选中行时触发
      handleSelectionChange (selection) {
        this.strIds = []
        this.ids = ''
        selection.forEach(sel => {
          this.strIds.push(sel.id)
        })
      },
      // 编辑园校
      editSchool (schoolId) {
        this.$router.push({path: '/schooledit', query: { id: schoolId }})
      },
      // 自定义内容消息
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
      this.getData()
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
