<template>
  <el-row>
  <el-col :span="24">
  	<div style="font-size: 16px;margin-top: 10px;">通知信息 记录（）</div> 
  </el-col>
  <el-col :span="24" class="border">  
	 <el-form :inline="true" :model="formInline">
	  <el-form-item label="标题" class="blist">
	    <el-input v-model="formInline.user" placeholder="请输入"></el-input>
	  </el-form-item>
	  <el-form-item label="消息关键字" class="blist">
      <el-input v-model="formInline.infor" placeholder="请输入"></el-input>
    </el-form-item>
    <span class="wrapper">
      <el-button type="info" class="el-icon-search"> 查询</el-button>
      <el-button type="success"  @click.native="openadd" class="el-icon-plus"> 发送消息</el-button>
      <el-button type="danger" class="el-icon-delete"> 删除</el-button>
    </span>
	</el-form>
  </el-col>
 <el-col :span="24" style="margin-top: 10px;">  
	  	<el-table :data="tableData" border style="width: 100%" :default-sort = "{prop: 'array'}" @selection-change="handleSelectionChange">
	    <el-table-column  type="selection" width="55"></el-table-column>
	    <el-table-column  prop="publisher" label="发送人"></el-table-column>
	    <el-table-column  prop="title" label="标题"></el-table-column>
	    <el-table-column prop="content" label="消息内容"></el-table-column>
	    <el-table-column prop="date" label="发送时间"></el-table-column>
	    <el-table-column prop="status" label="状态"></el-table-column>
	  </el-table>
  </el-col>
  <el-col>
  	<div class="block" style="float: right;margin-right: 10px;margin-top: 10px;">
	    <el-pagination
	      :page-sizes="[10, 20, 40, 60]"
	      :page-size="100"
	      layout="total, sizes, prev, pager, next, jumper"
	      :total="100">
	    </el-pagination>
	  </div>
  </el-col>
  </el-row>
</template>

<script>
  export default {
    data () {
      return {
        formInline: {
          user: '',
          region: ''
        },
        tableData: [{
          title: '测试',
          is: '是',
          content: '暑假放假通告XXXX',
          publisher: '陶西格',
          date: '2017-10-01',
          status: '正常'
        }, {
          title: '测试数据',
          is: '否',
          content: '台风放假通告XXXXX',
          publisher: '陶西格',
          date: '2017-10-01',
          status: '正常'
        }],
        multipleSelection: []
      }
    },
    methods: {
      onSubmit () {
        console.log('')
      },
      handleSelectionChange (val) {
        this.multipleSelection = val
      },
      deleteRow (index, rows) {
        rows.splice(index, 1)
      },
      openadd () {
        this.$router.push({ path: '/platformedit' })
      }
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
