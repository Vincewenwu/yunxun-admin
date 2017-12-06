<!--
  作者：7778428589@qq.com
  时间：2017-07-13
  描述：报名表管理列表 
-->
<template>
<el-row>
  <el-col :span="24">
    <div style="font-size: 16px;margin-top: 10px;">消息管理 记录（）</div> 
  </el-col>
  <!--******************* 搜索输入的信息******************* -->
  <el-col :span="24" class="border">  
   <el-form :inline="true" :model="formInline">
    <el-form-item label="姓名" class="blist">
         <el-input size="small" style="width: 10rem;" v-model="name" placeholder="请输入内容"> 
          </el-input>
    </el-form-item>
    <el-form-item label="所属园所" class="blist">
        <el-input size="small" style="width: 10rem;" v-model="schoolname" placeholder="请输入内容"> 
        </el-input>
    </el-form-item>
    <span class="wrapper">
      <el-button type="info" @click.active="onSubmit" class="el-icon-search"> 查询</el-button> 
     <el-button type="danger" @click.active="onedit"  class="el-icon-delete">确认标记</el-button> 
    </span>
  </el-form>
  </el-col>
  <!--******************* 搜索输入的信息******************* -->
  
   <el-col :span="24" style="margin-top: 10px;"> 
    <el-table
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
          prop="baseName"
          label="提醒人"
          >
        </el-table-column>
      <el-table-column
        prop="memberName"
        label="被提醒人"
       >
      </el-table-column>
      <el-table-column
        label="提醒内容"
        >
      <template scope="scope">
        <el-popover trigger="hover" placement="top">
           <p>详情链接: {{ scope.row.content }}</p>
          <div slot="reference" class="name-wrapper">
            <el-tag>{{ scope.row.content }}</el-tag>
          </div>
        </el-popover>
       </template>
       </el-table-column>
         <el-table-column
        label="详情链接"
        >
      <template scope="scope">
        <el-popover trigger="hover" placement="top">
           <p>详情链接: {{ scope.row.url }}</p>
          <div slot="reference" class="name-wrapper">
            <el-tag>{{ scope.row.url }}</el-tag>
          </div>
        </el-popover>
       </template>
       </el-table-column>
      <el-table-column
        prop="shoolName"
        label="所属院校"
        >
      </el-table-column>
          <el-table-column
        label="创建日期"
       >
      <template scope="scope">
        <el-popover trigger="hover" placement="top">
           <p>创建日期: {{ scope.row.createTime }}</p>
          <div slot="reference" class="name-wrapper">
            <el-tag>{{ scope.row.createTime }}</el-tag>
          </div>
        </el-popover>
      </template>
    </el-table-column>
      <el-table-column
        prop="confirmFlag"
        label="确认否"
        :formatter="formatterCheck">
      </el-table-column>
    <!--<el-table-column
          fixed="right"
          label="操作"
         >
          <template scope="scope">
            <el-button
              @click.native.prevent="deleteRow(scope.$index, tableData4)"
              type="text"
              size="small">
              分享
            </el-button>
            <el-button
              @click.native.prevent="editoppen(scope.row.id)"
              type="text"
              size="small">
              编辑
            </el-button>
          </template>
      </el-table-column>-->
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
      name: ''
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
// 条页
    handleSizeChange (val) {
      this.size = val
      this.onSubmit()
    },
    handleCurrentChange (val) {
      this.page = val
      this.onSubmit()
    },
    async onedit () {
      var ids = this.sels.map(item => item.id).toString()
      alert(ids)
      let r = {
        ids: ids
      }
      let data = await http.post('/baseData/editbaseCombo', r)
      this.$message({
        message: '确认成功' + data.data.obj,
        type: 'success'
      })
    },
// 条件查询
    async onSubmit () {
      let MemMessageDTO = {
        startPage: this.page,
        pageSise: this.size,
        baseName: this.name
      }
      let data = await http.post('/baseData/findSysRecipeBankDTO', MemMessageDTO)
      this.tableData = data.data.obj.memMessagelist
      this.total = data.data.obj.page.total
    },
    async getData () {
      let MemMessageDTO = {
        startPage: 1,
        pageSise: 5,
        baseName: ''
      }
      let data = await http.post('/baseData/findSysRecipeBankDTO', MemMessageDTO)
      console.log(data.data.obj)
      this.tableData = data.data.obj.memMessagelist
      this.total = data.data.obj.page.total
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
