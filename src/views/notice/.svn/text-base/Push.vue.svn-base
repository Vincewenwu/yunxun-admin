<template>
	<el-row>
		<el-col :span="24">

			<el-card class="box-card group">
				<div slot="header" class="clearfix">
					<span>选择推送对象</span>
				</div>
				<el-col :span="5">
					<el-card class="box-card group">
						<div slot="header" class="clearfix">
							<el-checkbox v-model="checked" style="margin-left: 5px;"> 全选</el-checkbox>
						</div>
						<div>
							<el-tree style="min-height: 400px;" :data="data2" show-checkbox :props="props" @check-change="handleCheckChange">
							</el-tree>
						</div>
					</el-card>

				</el-col>
				<el-col :span="19">
                      <div style="padding:13px 20px;border-bottom: 1px solid #18C79C;">家长信息</div>
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
	      prop="bannerimg"
	      label="头像"
	      sortable
	      width="130">
	    </el-table-column>
	    <el-table-column
	      prop="name"
	      label="姓名"
	      sortable
	      width="130">
	    </el-table-column>
	    <el-table-column
	      prop="与学员关系"
	      label="类型"
	      sortable
	      width="180">
	    </el-table-column>
	    <el-table-column
	      prop="array"
	      label="手机号"
	      sortable
	      width="150">
	    </el-table-column>
	    <el-table-column
	      prop="publisher"
	      label="考勤编号"
	      sortable
	      width="130">
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
		          移除
		        </el-button>
		      </template>
		  </el-table-column>
	    
	  </el-table>
		  <span class="wrapper" style="float: right;margin-right: 20px;margin-top: 20px;">
				    <el-button type="success">保存</el-button>
				    <el-button >返回</el-button>
	  	   </span>
				</el-col>
			</el-card>
		</el-col>
	</el-row>
</template>

<script>
  export default {
    data () {
      return {
        data2: [{
          id: 1,
          label: '分组1',
          children: []
        }, {
          id: 2,
          label: '分组2',
          children: []
        }, {
          id: 3,
          label: '分组3',
          children: []
        }, {
          id: 4,
          label: '分组4',
          children: []
        }, {
          id: 5,
          label: '分组5',
          children: []
        }],
        props: {
          children: 'children',
          label: 'label'
        }
      }
    },
    methods: {
      handleCheckChange (data, checked, indeterminate) {
        console.log(data, checked, indeterminate)
      }
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
	.group{
		border: 1px solid #18c79c;
		border-radius:0;
	}
	.group .el-card__body{
		padding: 0;
	}
	.group .el-card__header{
		padding: 10px 20px;
		border-bottom: 1px solid #18c79c;
		border-top: none;
	}
	.group .el-card__body .el-tree{
		border:none
	}
	.clearfix .el-button-group{/*修改分组button width*/
		width: 100%;
	}
	.clearfix .el-button-group button{/*修改分组button 圆角 为 直角*/
		border-radius: 0;
	}
</style>
