<!--
  作者：7778428589@qq.com
  时间：2017-07-13
  描述：报名表管理列表 
-->
<template>
<el-row>
  <el-col :span="24">
    <div style="font-size: 16px;margin-top: 10px;">标签管理 记录（）</div> 
  </el-col>
  <!--******************* 搜索输入的信息******************* -->
  <el-col :span="24" class="border">  
   <el-form :inline="true" :model="formInline">
    <el-form-item label="标题名称" class="blist">
         <el-input size="small" style="width: 10rem;" v-model="name" placeholder="请输入内容"> 
          </el-input>
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
   <span class="wrapper">
     <el-button type="info" @click.active="onSubmit" class="el-icon-search"> 查询</el-button> 
     <el-button type="success" @click.native="openadd" class="el-icon-plus"> 新增</el-button>
     <el-button type="danger" @click.active="onedit"  class="el-icon-delete">确认删除</el-button> 
    </span>
  </el-form>
  </el-col>
  <!--******************* 搜索输入的信息******************* -->
   <el-col :span="24" style="margin-top: 10px;"> 
    <el-table
        v-loading="loading2"
        element-loading-text="拼命加载中"
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
          prop="lableName"
          label="标题名称"
          width="290">
        </el-table-column>
      <el-table-column
        prop="lebleType"
        label="标题类型"
        >
      </el-table-column>
      <el-table-column
        prop="createMan"
        label="创建人"
         >
      </el-table-column>
       <el-table-column
        prop="createTime"
        label="创建时间"
       >
      </el-table-column>
      <el-table-column
        prop="deleteFlag"
        label="删除否"
        :formatter="formatstate">
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
  </el-row> 
</template> 
<script>
import http from '../../utils/http'
export default {
  data () {
    return {
      value6: '',
      tableData: [],
      classvalue: '',
      sels: [],
      total: '',
      page: 1,
      size: 5,
      pageSizes: [1, 2, 3, 4, 5],
      schoolname: '',
      name: '',
      lebleType: '',
      lableName: '',
      options: [{
        value: '0',
        label: '育儿知识'
      }],
      loading2: true
    }
  },
  methods: {
    handleSelectionChange (sels) {
      this.sels = sels
    },
    formatterCheck: function (row, column) {
      if (row.confirmFlag === '0') {
        return '未确认'
      }
      if (row.confirmFlag === '1') {
        return '已确认'
      }
      if (row.confirmFlag === '2') {
        return '确认不通过'
      }
    },
// 打开新增界面
    openadd () {
      this.$router.push({ path: '/baseLableEdit', query: {id: '1'} })
    },
// 编辑
    editoppen (id) {
      this.$router.push({ path: '/baseLableEdit', query: {id: id} })
    },
// 条页
    handleSizeChange (val) {
      this.size = val
      this.onSubmit()
    },
    handleCurrentChange (val) {
      this.page = val
      this.onSubmit()
    },
    formatstate: function (row, column) {
      if (row.deleteFlag === '0') {
        return '未删除'
      } else {
        return '已删除'
      }
    },
// 删除
    async onedit () {
      var ids = this.sels.map(item => item.id).toString()
      alert(ids)
      let r = {
        ids: ids
      }
      let data = await http.post('/baseData/delbaseLable', r)
      this.$message({
        message: '确认成功' + data.data.obj,
        type: 'success'
      })
    },
// 条件查询
    async onSubmit () {
      let BaseLableShoolDTO = {
        startPage: this.page,
        pageSise: this.size,
        lableName: this.name,
        lebleType: this.lebleType
      }
      let data = await http.post('/baseData/findBaseLableShoolDTO', BaseLableShoolDTO)
      this.tableData = data.data.obj.baseLableShoollist
      this.total = data.data.obj.page.total
    },
    async getData () {
      let BaseLableShoolDTO = {
        startPage: 1,
        pageSise: 5,
        lableName: '',
        lebleType: ''
      }
      let data = await http.post('/baseData/findBaseLableShoolDTO', BaseLableShoolDTO)
      this.tableData = data.data.obj.baseLableShoollist
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
</style>
