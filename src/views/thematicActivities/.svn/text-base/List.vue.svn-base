<template>
  <el-row>
  <el-col :span="24">
    <div style="font-size: 16px;margin-top: 10px;">活动管理列表 记录（）</div> 
  </el-col>
  <el-col :span="24" class="border">  
   <el-form :inline="true" :model="formInline">
    <!--<el-form-item label="标题" class="blist">
      <el-input v-model="formInline.user" placeholder="请输入"></el-input>
    </el-form-item>-->
    <!--<el-form-item label="所属园所" class="blist">
      <el-select v-model="formInline.region" placeholder="请选择园所">
        <el-option label="区域一" value="shanghai"></el-option>
        <el-option label="区域二" value="beijing"></el-option>
      </el-select>
    </el-form-item>-->
    <!--<el-form-item label="所属标签" class="blist">
      <el-select v-model="formInline.region" placeholder="请选择标签">
        <el-option label="公告" value="shanghai"></el-option>
        <el-option label="广告" value="beijing"></el-option>
      </el-select>
    </el-form-item>-->
    <el-form-item label="所属园所" class="blist">
      <el-input v-model="shoolName" placeholder="请输入"></el-input>
    </el-form-item>
    <span class="wrapper">
      <el-button type="info"  @click="onSubmit"> 查询</el-button>
      <el-button type="success" @click.native="openadd" class="el-icon-plus"> 发布</el-button>
      <el-button type="danger" :plain="true" @click="delShoolinfo" class="el-icon-delete"> 下架</el-button>
      <el-button type="success" :plain="true" @click="CheckTShoolinfo" class="el-icon-check"> 审核通过</el-button>
      <el-button type="warning" :plain="true" @click="CheckFShoolinfo" class="el-icon-close"> 审核不通过</el-button>
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
      label="标题"
      >
      <template scope="scope">
        <el-popover trigger="hover" placement="top">
          <p>{{ scope.row.title }}</p>
          <div slot="reference" class="name-wrapper">
            <el-tag>{{ scope.row.title }}</el-tag>
          </div>
        </el-popover>
      </template>
    </el-table-column>   
      <el-table-column
      label="简介"
      >
      <template scope="scope">
        <el-popover trigger="hover" placement="top">
          <p>{{ scope.row.intro }}</p>
          <div slot="reference" class="name-wrapper">
            <el-tag>{{ scope.row.intro }}</el-tag>
          </div>
        </el-popover>
      </template>
    </el-table-column>   
      <el-table-column
        prop="coverImages"
        label="封面"
        >
           <template scope="scope">
          <img :src="imgService+ scope.row.coverImages" style="width: 80px;height: 80px;border-radius: 50%;margin-top: 5px;" />
        </template>
      </el-table-column>
      <!--<el-table-column
        prop="shool_name"
        label="所属园所"
        sortable
        width="150">
      </el-table-column>-->
      <!--<el-table-column
        prop="infoType"
        label="所属标签"
        sortable
        width="80" :formatter="formattype">
      </el-table-column>-->
      <el-table-column
        prop="serialNum"
        label="排列"
        >
      </el-table-column>
      <el-table-column
        prop="createMam"
        label="发布者"
        >
      </el-table-column>
      <el-table-column
        prop="createTime"
        label="创建日期"
        >
      </el-table-column>
      <el-table-column
        prop="checkFlag"
        label="审核状态"
        :formatter="formatterCheck">
      </el-table-column>
      <el-table-column
        prop="deleteFlag"
        label="状态"
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
              type="button"
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
      formattype: function (row, column) {
        if (row.infoType === 0) {
          return '公告'
        }
        if (row.infoType === 1) {
          return '咨询'
        }
        if (row.infoType === 2) {
          return '活动'
        }
        if (row.infoType === 3) {
          return 'Banner'
        }
      },
      formatterCheck: function (row, column) {
        if (row.checkFlag === 0) {
          return '未审核'
        }
        if (row.checkFlag === 1) {
          return '已审核'
        }
        if (row.checkFlag === 2) {
          return '审核不通过'
        }
      },
      formatstate: function (row, column) {
        if (row.deleteFlag === 0) {
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
// 发布活动
      openadd () {
        this.$router.push({ path: '/thematicActivitiesEdit', query: {tiao: '1'} })
      },
// 条件查询
      async onSubmit () {
        let r = {
          schoolname: this.shoolName,
          startPage: this.page,
          pageSise: this.size,
          infotype: '2' // 这是活动管理
        }
        let data = await http.post('/banner/findShoolInfofoPage', r)
        this.tableData = data.data.obj.baseSchoolInfo
        this.total = data.data.obj.page.total
      },
// 编辑
      editoppen (id) {
        this.$router.push({ path: '/thematicActivitiesEdit', query: {tiao: id} })
      },
// 删除shoolinof
      async delShoolinfo () {
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
          let shoolinfoIDs = {ids: ids}
          let data = await http.post('/banner/delBaseSchoolInfo', shoolinfoIDs)
          this.$message({
            message: data.data.obj,
            type: 'warning'
          })
        } else {
          this.$message({
            message: '请选择未删除的',
            type: 'success'
          })
        }
      },
      // 审核通过
      async CheckTShoolinfo () {
        var count = 0
        var dels = this.sels.map(item => item.checkFlag).toString()
        this.jiequ = dels.split(',')
        console.log(this.jiequ)
        for (var i = 0; i < this.jiequ.length; i++) {
          if (this.jiequ[i] === '1' || this.jiequ[i] === '2') { // 这里的状态是1是审核的状态
            count = count + 1
            break // 判断有已标记就退出
          }
        }
        if (count !== 1) {
          var ids = this.sels.map(item => item.id).toString()
          let shoolinfoIDs = {
            ids: ids,
            sentype: 1
          }
          let data = await http.post('/banner/ediCheckFlag', shoolinfoIDs)
          this.$message({
            message: '审核通过' + data.data.obj,
            type: 'success'
          })
        } else {
          this.$message({
            message: '请选择未审核的的',
            type: 'success'
          })
        }
      },
// 审核不通过
      async CheckFShoolinfo () {
        var count = 0
        var dels = this.sels.map(item => item.checkFlag).toString()
        this.jiequ = dels.split(',')
        console.log(this.jiequ)
        for (var i = 0; i < this.jiequ.length; i++) {
          if (this.jiequ[i] === '0' || this.jiequ[i] === '2') { // 这里的状态是1是审核的状态
            count = count + 1
            break // 判断有已标记就退出
          }
        }
        if (count !== 1) {
          var ids = this.sels.map(item => item.id).toString()
          let shoolinfoIDs = {
            ids: ids,
            sentype: 2
          }
          let data = await http.post('/banner/ediCheckFlag', shoolinfoIDs)
          this.$message.error('审核不通过' + data.data.obj)
        } else {
          this.$message({
            message: '请选择已审核的',
            type: 'success'
          })
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
      async getData () {
        let r = {
          schoolname: this.shoolName,
          startPage: 1,
          pageSise: 5,
          infotype: '2' // 这是活动管理
        }
        let data = await http.post('/banner/findShoolInfofoPage', r)
        this.tableData = data.data.obj.baseSchoolInfo
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
