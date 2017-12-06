<!--
	作者：7778428589@qq.com
	时间：2017-07-13
	描述：每天餐谱
-->
<template>
<el-row>
  <el-col :span="24">
  	<div style="font-size: 16px;margin-top: 10px;">每周食谱 记录（）</div> 
  </el-col>
  <el-col :span="24" class="border">  
	 <el-form :inline="true" :model="formInline">
	  <el-form-item label="所属园所" class="blist">
	   <el-input size="small" v-model="name" placeholder="请输入内容"></el-input>
	  </el-form-item>
	     <el-form-item label="年/月" class="blist">
	         <div class="block">
        <el-date-picker
       @change="amSignTime"
       v-model="value4"
       type="month"
       placeholder="选择月">
       </el-date-picker>
        </div>
       </el-form-item>
    <el-button type="info" :plain="true"  @click.native="onSubmit" class="el-icon-search"> 查询</el-button> 
	 <el-button type="primary" :plain="true" @click="newWeek('ruleForm2')">新增周谱</el-button>
	 </el-form>
  </el-col>
  
   <el-col :span="24" style="margin-top: 10px;"> 
   	  <el-table
        v-loading="loading2"
        element-loading-text="美食加载中"
        :data="tableData"
        border
        style="width: 100%"
        :default-sort = "{prop: 'array'}"
        >
        <el-table-column
           type="selection"
          width="55">
        </el-table-column>
        <el-table-column
          prop="weekly"
          label="周次"
          >
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
                @click.native="editoppen(scope.row)"
                type="text"
                size="small">
                 查看
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
    
   <el-dialog v-bind:title="str"  :visible.sync="dialogFormVisible" >
       <el-button type="danger" style="float: right;" :plain="true" @click="delcaipu"  class="el-icon-delete"> 删除</el-button>
      <el-button type="success" @click="caipuNew" style="float: right;" class="el-icon-plus">新菜谱</el-button>
    <el-table
    :data="CaiPutableData"
    v-loading="loading3"
   element-loading-text="美食需要等待"
    border
    @selection-change="handleSelectionChange"
    style="width: 100%">
      <el-table-column
           type="selection"
          >
        </el-table-column>
    <el-table-column
      label="发布时间"
      >
      <template scope="scope">
        <el-icon name="time"></el-icon>
        <span style="margin-left: 10px">{{ scope.row.publishTime }}</span>
      </template>
    </el-table-column>
      </el-table-column>
     <el-table-column
        prop="severalMeals"
        label="餐次"
        sortable
         :formatter="formatseveralMeals">
      </el-table-column>
    <el-table-column
      label="菜名"
      >
      <template scope="scope">
        <el-popover trigger="hover" placement="top">
           <p>菜名: {{ scope.row.name }}</p>
          <p>食材: {{ scope.row.foodMaterial }}</p>
          <p>营养成分: {{ scope.row.nutrient }}</p>
          <p>简介: {{ scope.row.intro }}</p>
          <div slot="reference" class="name-wrapper">
            <el-tag>{{ scope.row.name }}</el-tag>
          </div>
        </el-popover>
      </template>
    </el-table-column>
     <el-table-column
        prop="coverImages"
        label="图片"
        sortable
        >
         <template scope="scope">
          <img :src="imgService + scope.row.coverImages" style="width: 50px;height: 50px;border-radius: 50%;margin-top: 5px;" />
        </template>
      </el-table-column>
    <el-table-column label="操作">
      <template scope="scope">
        <el-button
          size="small"
          type="danger"
          @click="handleDelete(scope.row.id)">删除</el-button>
      </template>
    </el-table-column>
    </el-table>
      <el-col>
    <div class="block" style="float: right;margin-right: 10px;margin-top: 10px;">
      <el-pagination
        @size-change="handleSizeChange1"
        @current-change="handleCurrentChange1"
        :current-page="temp.page"
        :page-sizes="temp.pageSizes"
        :page-size="temp.size"
        layout="total, sizes, prev, pager, next, jumper"
        :total="temp.total">
      </el-pagination>
    </div>
  </el-col>
   </el-dialog>
   
  
</el-row> 
 
</template>



<script>
import http from '../../utils/http'
export default {
  data () {
    return {
      Mealtime: [{
        value: '1',
        label: '早餐'
      },
      {
        value: '2',
        label: '午餐'
      }],
      classvalue: '晚餐',
      loading2: true,
      loading3: false,
      value4: '',
      newDate: new Date(),
      dialogFormVisible: false,
      CaiPutableData: [],
      YeareMoth: '',
      tableData: [],
      str: '',
      total: '',
      page: 1,
      size: 5,
      pageSizes: [1, 2, 3, 4, 5],
      sels: [],
      temp: {
        total: '',
        page: 1,
        size: 5,
        pageSizes: [1, 2, 3, 4, 5]
      },
      weekely: ''
    }
  },
  methods: {
    handleSelectionChange (sels) {
      this.sels = sels
    },
    handleEdit (index, row) {
      console.log(index, row)
    },
    async handleDelete (ids) {
      let caupu = {ids: ids}
      let data = await http.post('/sysrecipebank/delMemSchoolRecipeDetail', caupu)
      this.$message({
        message: data.data.obj,
        type: 'warning'
      })
    },
    formatseveralMeals: function (row, column) {
      if (row.severalMeals === '0') {
        return '早餐'
      }
      if (row.severalMeals === '1') {
        return '中餐'
      }
      if (row.severalMeals === '2') {
        return '晚餐'
      }
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
    newWeek () {
      this.$router.push({ path: '/nutritionrecipesEdit', query: {id: '1'} })
//    this.$router.push({ path: '/nutritionrecipesEdit', query: {id: '1'} })
    },
// 删除周谱
    async delcaipu () {
      var ids = this.sels.map(item => item.id).toString()
      if (ids.length > 0) {
        let caupu = {ids: ids}
        let data = await http.post('/sysrecipebank/delMemSchoolRecipeDetail', caupu)
        this.$message({
          message: data.data.obj,
          type: 'warning'
        })
      } else {
        this.$message({
          message: '请选择',
          type: 'warning'
        })
      }
    },
 //  周谱详情分页条页
    handleCurrentChange1 (val) {
      this.temp.page = val
      this.oppenzhoupu(this.weekely)
    },
    handleSizeChange1 (val) {
      this.temp.size = val
      this.oppenzhoupu(this.weekely)
    },
// 新增菜谱按钮
    caipuNew () {
      this.$router.push({ path: '/nutritionrecipesEveryDayEdit', query: {id: '1'} })
    },
// 时间格式化
    amSignTime (val) {
      this.YeareMoth = val
    },
// 查看
    async editoppen (row) {
      this.oppenzhoupu(row.weekly)
      this.weekely = row.weekly
    },
// 间接查看查看 为了解决两个分页参数
    async oppenzhoupu (weekly) {
      this.dialogFormVisible = true
      this.loading3 = true
      let MemSchoolRecipeDetailDTO = {
        startPage: this.temp.page,
        pageSise: this.temp.size,
        year: this.YeareMoth.substring(0, 4),
        month: parseInt(this.YeareMoth.substring(6, 10) - 1),
        weekly: weekly
      }
      let data = await http.post('/sysrecipebank/findMemSchoolRecipeDetails', MemSchoolRecipeDetailDTO)
      this.CaiPutableData = data.data.obj.memSchoolRecipeDetailList
      this.str = '第' + weekly + '周菜谱'
      this.temp.total = data.data.obj.page.total
      this.loading3 = false
    },
    async onSubmit () {
      this.tableData = []
      let MemSchoolRecipeDetailDTO = {
        startPage: this.page,
        pageSise: this.size,
        year: this.YeareMoth.substring(0, 4),
        month: parseInt(this.YeareMoth.substring(6, 10) - 1)
      }
      let data = await http.post('/sysrecipebank/findzhouandyears', MemSchoolRecipeDetailDTO)
      this.tableData = data.data.obj.memSchoolRecipe
      this.total = data.data.obj.page.total
    },
// 一开始查询默认为登录人身份和当前月份的周谱
    async getData () {
      let MemSchoolRecipeDetailDTO = {
        startPage: 1,
        pageSise: 5,
        year: this.newDate.getFullYear(),
        month: this.newDate.getMonth()
      }
      let data = await http.post('/sysrecipebank/findzhouandyears', MemSchoolRecipeDetailDTO)
      this.tableData = data.data.obj.memSchoolRecipe
      this.value4 = this.newDate
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
