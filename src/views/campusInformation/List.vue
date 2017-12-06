<template>
  <el-row>
  <el-col :span="24">
    <div style="font-size: 16px;margin-top: 10px;">班级圈列表 记录（）</div> 
  </el-col>
  <el-col :span="24" class="border">  
   <el-form :inline="true" :model="formInline">
    <el-form-item label="所属园所" class="blist">
      <el-input v-model="shoolName" placeholder="请输入"></el-input>
    </el-form-item>
    <span class="wrapper">
      <el-button type="info"  @click="onSubmit"> 查询</el-button>
      <el-button type="success" @click.native="openadd" class="el-icon-plus"> 发布</el-button>
      <el-button type="danger" :plain="true" @click="delShoolinfo" class="el-icon-delete"> 下架</el-button>
    </span>
  </el-form>
  </el-col>
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
        prop="shoolName"
        label="所属校园"
        sortable
        width="180">
      </el-table-column>
      <el-table-column
        prop="className"
        label="所属班级"
        sortable
        width="180">
      </el-table-column>
      <el-table-column
        prop="lableName"
        label="标签"
        sortable
        width="180">
      </el-table-column>
      <el-table-column
        prop="imgs"
        label="图片"
        sortable
        width="180" >
         <template scope="scope">
          <img :src="imgService + scope.row.imgs" style="width: 80px;height: 80px;border-radius: 50%;margin-top: 5px;" />
        </template>
      </el-table-column>
      <!--<el-table-column
        prop="content"
        label="内容 "
        sortable
        width="100">
      </el-table-column>-->
      <el-table-column
        prop="commentNum"
        label="评论数"
        sortable
        width="180">
      </el-table-column>
      <el-table-column
        prop="pointCount"
        label="点赞数"
        sortable
        width="180">
      </el-table-column>
      <el-table-column
        prop="browseCount"
        label="浏览数"
        sortable
        width="180" >
      </el-table-column>
      <el-table-column
        prop="createTime"
        label="创建时间"
        sortable
        width="130" >
      </el-table-column>
      <el-table-column 
        prop="baseName"
        label="创建人"
        sortable
        width="130">
      </el-table-column>
      <el-table-column
        prop="deleteFlag"
        label="状态"
        sortable
        width="130" :formatter="formatstate">
      </el-table-column>
    <el-table-column
          fixed="right"
          label="操作"
          width="150">
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
        formInline: {
          user: '',
          region: ''
        },
        tableData: [],
        multipleSelection: [],
        total: '',
        page: 1,
        size: 5,
        pageSizes: [1, 2, 3, 4, 5],
        shoolName: '',
        sels: [],
        loading2: true
      }
    },
    methods: {
      formatstate: function (row, column) {
        if (row.deleteFlag === false) {
          return '未删除'
        } else {
          return '已删除'
        }
      },
      handleSelectionChange (sels) {
        this.sels = sels
      },
      deleteRow (index, rows) {
        rows.splice(index, 1)
      },
      openadd () {
        this.$router.push({ path: '/campusInformationEdit/tiao?tiao=1' })
      },
// 条件查询
      async onSubmit () {
        let MemClassCircleDTO = {
          startPage: this.page,
          pageSise: this.size,
          shoolName: this.shoolName
        }
        let data = await http.post('/classquan/findMemClassCircleDTO', MemClassCircleDTO)
        this.tableData = data.data.obj.memClassCircleList
        this.total = data.data.obj.page.total
      },
// 编辑
      editoppen (id) {
        this.$router.push({path: '/campusInformationEdit/tiao?tiao=' + id})
      },
// 删除shoolinof
      async delShoolinfo () {
        var ids = this.sels.map(item => item.id).toString()
        let shoolinfoIDs = {
          ids: ids
        }
        let data = await http.post('/classquan/delMemClassCircle', shoolinfoIDs)
        this.$message({
          message: data.data.obj,
          type: 'success'
        })
        this.onSubmit()
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
      async getData () {
        let MemClassCircleDTO = {
          startPage: 1,
          pageSise: 5,
          shoolName: ''
        }
        let data = await http.post('/classquan/findMemClassCircleDTO', MemClassCircleDTO)
        this.tableData = data.data.obj.memClassCircleList
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
