<template>
  <el-row>
  <el-col :span="24">
    <div style="font-size: 16px;margin-top: 10px;">发布周谱 记录（）</div> 
  </el-col>
  <el-col :span="24" class="border">  
   <el-form :inline="true" :model="formInline">
    <!--<el-form-item label="分组" class="blist">
      <el-select v-model="formInline.region" placeholder="请选择">
        <el-option label="区域一" value="shanghai"></el-option>
        <el-option label="区域二" value="beijing"></el-option> 
      </el-select>
    </el-form-item>-->
    <!--<el-form-item label="学院名称" class="blist">
      <el-input v-model="shoolName" placeholder="可输入关键字筛选"></el-input>
    </el-form-item>-->
    
     <el-form-item label="餐次" >
     <el-select v-model="canci" style="width: 100px;"  placeholder="餐次">
      <el-option
      v-for="item in options"
      :key="item.value"
      :label="item.label"
      :value="item.value">
    </el-option>
   </el-select>
  </el-form-item>
  
  <template>
    <el-form-item label="日期">
    <el-date-picker 
      @change="amSignTime" style="width: 120px;"
      v-model="pulshriqi"
      type="date"
      placeholder="选择日期"
      :picker-options="pickerOptions0">
    </el-date-picker>
      </el-form-item>
  </template>
  
   <template>
     <el-form-item label="周次">
     <el-input-number style="width: 120px;"  v-model="weekly"  :min="1" :max="30"></el-input-number>
     </el-form-item>
   </template>
    <el-form-item label="菜名">
    <el-input type="text" v-model="xycpName"></el-input>
  </el-form-item>
    <el-button-group>
      <el-button type="primary" @click="dialogFormVisible = true" class="el-icon-plus" style="width: 100%;"> 选择菜谱</el-button>
    </el-button-group>
    <el-dialog title="菜谱选择" :visible.sync="dialogFormVisible" >
       <el-form-item label="菜名">
    <el-input type="text" v-model="caiming"></el-input>
       </el-form-item>
       <el-button-group>
      <el-button type="primary"  class="button" style="width: 100%;"@click="findcaiming" >查询</el-button>
    </el-button-group>
    
       <el-form :model="formgroup" >
        <el-table
           v-loading="loading2"
        element-loading-text="美食加载中"
      :data="CaiPutableData"
      style="width: 100%"
      @select="handleSelectionChange"
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
      <el-table-column
        prop="coverImages "
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
    </el-table>
        </el-form>
      
      <!--//  分页-->
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
      <!--//  分页-->
    </el-dialog>
    
     <el-button type="primary" style="float: right;" :plain="true" @click="submitcaupu('ruleForm2')">发布</el-button>
    
   </el-form>
  </el-col>
 <el-col :span="24" style="margin-top: 10px;">  
   
<template>
  <el-table
    :data="tableData"
    border
    style="width: 100%"
    max-height="500">
    <!--<el-table-column
          prop="id"
          label="id"
          sortable
          width="180">
        </el-table-column>-->
      <el-table-column
        prop="coverImages "
        label="图片"
        >
      <template scope="scope">
          <img :src="imgService + scope.row.coverImages" style="width: 120px;height: 100px;border-radius: 50%;margin-top: 5px;" />
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
        <el-button
          @click.native.prevent="deleteRow(scope.$index, tableData)"
          type="button"
          size="small">
          移除
        </el-button>
      </template>
    </el-table-column>
  </el-table>
</template>
  </el-col>
  </el-row>
</template>
<script>
  import http from '../../utils/http'
  export default {
    data () {
      return {
        pu: {
          name: ''
        },
        formInline: {
          user: '',
          region: ''
        },
        sels: [],
        shoolName: '',
        total: '',
        page: 1,
        size: 5,
        pageSizes: [1, 2, 3, 4, 5],
        canci: '',
        options: [{
          value: '0',
          label: '早餐'
        }, {
          value: '1',
          label: '中餐'
        }, {
          value: '2',
          label: '晚餐'
        }],
        xycpName: '',
// 设置可选择的时间
        pickerOptions0: {
          disabledDate (time) {
            return time.getTime() < Date.now() - 8.64e7
          }
        },
        pulshriqi: '',
        pulshriqi1: '',
        tableData: [],
        dialogFormVisible: false,
        CaiPutableData: [],
        weekly: 1,
        caiming: '',
        loading2: ''
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
// 条件查询
      async onSubmit () {
        let r = {
          startPage: this.page,
          pageSise: this.size,
          name: ''
        }
        let data = await http.post('/sysrecipebank/findBaseRecipeBank', r)
        this.tableData = data.data.obj.baseSchoolInfo
        this.total = data.data.obj.page.total
      },
// 获取当前行绑定到另外一个tabledep下面的判断是防止重复
      handleSelectionChange (sels, row) {
        let j = this.tableData.length
        let z = 0
        for (var i = 0; i < j; i++) {
          if (this.tableData[i].id === row.id) {
            z = 1
            break
          } else {
            z = 0
          }
        }
        if (z === 0) {
          this.tableData.push(row)
        }
      },
      deleteRow (index, rows) {
        rows.splice(index, 1)
      },
      amSignTime (val) {
        this.pulshriqi1 = val // 发布时间处理
      },
      // 条页
      handleCurrentChange (val) {
        this.page = val
        this.getData()
      },
      handleSizeChange (val) {
        this.size = val
        this.getData()
      },
// 新增院校菜谱   遍历新增table
      async submitcaupu () {
        let result = ''
        let j = this.tableData.length
        if (this.canci !== '') {
          for (var i = 0; i < j; i++) {
            let MemSchoolRecipeDetail = {
              baseRecipeBankId: this.tableData[i].id,
              serialNum: this.tableData[i].serialNum,
              name: this.tableData[i].name,
              coverImages: this.tableData[i].coverImages,
              pictureSet: this.tableData[i].pictureSet,
              intro: this.tableData[i].intro,
              foodMaterial: this.tableData[i].foodMaterial,
              nutrient: this.tableData[i].nutrient,
              severalMeals: this.canci, // 餐次
              PublishTime: this.pulshriqi = this.pulshriqi1,
              weekly: this.weekly,
              xycpName: this.xycpName
            }
            result = await http.post('/sysrecipebank/addMemSchoolRecipe', MemSchoolRecipeDetail)
          }
        } else {
          this.$message({
            message: '请选择餐次或者日期',
            type: 'success'
          })
        }
        this.$message({
          message: result.data.obj,
          type: 'success'
        })
        this.canci = ''
        this.pulshriqi = ''
      },
// 编辑
      editoppen (id) {
        this.$router.push({ path: '/banneredit/' })
      },
      async findcaiming () {
        this.loading2 = true
        let BaseRecipeBank = {
          startPage: this.page,
          pageSise: this.size,
          name: this.caiming
        }
        let data = await http.post('/sysrecipebank/findBaseRecipeBank', BaseRecipeBank)
        this.CaiPutableData = data.data.obj.sysRecipeBankDTO
        this.total = data.data.obj.page.total
        this.loading2 = false
      },
      async getData () {
        this.loading2 = true
        let BaseRecipeBank = {
          startPage: this.page,
          pageSise: this.size,
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

