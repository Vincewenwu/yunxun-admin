<template>
  <el-row>
  <el-col :span="24">
    <div style="font-size: 16px;margin-top: 10px;">菜谱列表 记录（）</div> 
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
    <el-form-item label="菜名" class="blist">
      <el-input v-model="name" placeholder="请输入"></el-input>
    </el-form-item>
   
  </el-form>
  </el-col>
  <el-col :span="24" class="border">  
    <span class="wrapper">
      <el-button type="info"  @click="onSubmit"> 查询</el-button>
      <el-button type="success" @click.native="openadd" class="el-icon-plus"> 发布</el-button>
      <el-button type="danger" :plain="true" @click="delShoolinfo" class="el-icon-delete"> 下架</el-button>
       </span>
  </el-col>
 <el-col :span="24" style="margin-top: 10px;">  
        <el-table
      :data="CaiPutableData"
      v-loading="loading2"
      element-loading-text="美食加载中"
      style="width: 100%"
      @selection-change="handleSelectionChange"
      @current-change="caipuhandleCurrentChange"
      >
      <el-table-column
         type="selection"
        width="55">
      </el-table-column>
      <!--<el-table-column
          prop="id"
          label="id"
          sortable
          width="60">
        </el-table-column>-->
        <!--<el-table-column
          prop="serialNum"
          label="编号"
          sortable
          width="60">
        </el-table-column>-->
      <el-table-column
        prop="coverImages"
        label="图片"
        >
        <template scope="scope">
          <img :src="imgService + scope.row.coverImages" style="width: 80px;height: 80px;border-radius: 50%;margin-top: 5px;" />
        </template>
      </el-table-column>
      
      <el-table-column
        prop="name"
        label="菜名"
        >
      </el-table-column>
      <el-table-column
      label="简介"
      >
      <template scope="scope">
        <el-popover trigger="hover" placement="top">
          <p>简介: {{ scope.row.intro }}</p>
          <p>食材: {{ scope.row.foodMaterial }}</p>
          <p>营养成分: {{ scope.row.nutrient }}</p>
          <div slot="reference" class="name-wrapper">
            <el-tag>{{ scope.row.intro }}</el-tag>
          </div>
        </el-popover>
      </template>
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
        formInline: {
          user: '',
          region: ''
        },
        tableData: [],
        total: '',
        page: 1,
        size: 5,
        pageSizes: [1, 2, 3, 4, 5],
        shoolName: '',
        sels: [],
        name: '',
        CaiPutableData: [],
        loading2: true
      }
    },
    methods: {
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
      openadd () {
        this.$router.push({ path: '/nutritionrecipesEveryDayEdit', query: {id: '1'} })
      },
// 条件查询
      async onSubmit () {
        let BaseRecipeBank = {
          name: this.name,
          startPage: this.page,
          pageSise: this.size
        }
        let data = await http.post('/sysrecipebank/findBaseRecipeBank', BaseRecipeBank)
        this.CaiPutableData = data.data.obj.sysRecipeBankDTO
        this.total = data.data.obj.page.total
      },
// 编辑
      editoppen (id) {
        this.$router.push({ path: '/nutritionrecipesEveryDayEdit', query: {id: id} })
      },
// 删除shoolinof
      async delShoolinfo () {
        var ids = this.sels.map(item => item.id).toString()
        let baseRecipeBank = {ids: ids}
        let data = await http.post('/sysrecipebank/delSysRecipeBank', baseRecipeBank)
        this.$message({
          message: data.data.obj,
          type: 'success'
        })
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
      async getData () {
        this.loading2 = true
        let BaseRecipeBank = {
          startPage: 1,
          pageSise: 5,
          name: ''
        }
        let data = await http.post('/sysrecipebank/findBaseRecipeBank', BaseRecipeBank)
        this.CaiPutableData = data.data.obj.sysRecipeBankDTO
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
    border: 1px solid #18c79c;
    border-radius: 5px;
    margin-top: 15px;
    padding: 15px 20px;
  }
  .blist{
    margin:0;
  }
</style>
